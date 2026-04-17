/**
 * ChinaMakersHub - Unified API Worker
 *
 * 扩展自 cmh-inquiry-api,新增工厂申请功能
 * 部署: 替换原 src/index.js,执行 wrangler deploy
 *
 * Endpoints:
 *   POST /api/inquiry              买家询盘
 *   POST /api/factory-application  工厂入驻申请
 *   GET  /api/inquiry/:id          查询询盘 (admin)
 *   GET  /api/factory/:id          查询工厂申请 (admin)
 *   GET  /api/health               健康检查
 *
 *   --- Admin (受 Cloudflare Access 保护) ---
 *   GET   /api/admin/inquiries          询盘列表（分页+筛选）
 *   PATCH /api/admin/inquiries/:id      更新询盘状态
 *   GET   /api/admin/inquiries/export   导出 CSV
 *   GET   /api/admin/factories          工厂申请列表（分页+筛选）
 *   PATCH /api/admin/factories/:id      更新工厂申请状态
 */

// ============ CONFIG ============
const CONFIG = {
  FEISHU_WEBHOOK: 'https://open.feishu.cn/open-apis/bot/v2/hook/8dddb2cb-a95a-47cf-8a00-d1c235988d95',
  WECOM_WEBHOOK: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=50497df9-0602-486b-938f-1a6641bcd4fc',
  ADMIN_EMAIL: 'info@chinamakershub.com',
  ALLOWED_ORIGINS: [
    'https://chinamakershub.com',
    'https://www.chinamakershub.com',
    'http://localhost:8788',
    'http://localhost:8000',
  ],
  RATE_LIMIT_PER_HOUR: 5,
  MIN_INQUIRY_LENGTH: 20,
  ADMIN_PAGE_SIZE: 20,
};

// ============ MAIN HANDLER ============
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') return handleCORS(origin);

    // ---- Public routes ----
    if (url.pathname === '/api/inquiry' && request.method === 'POST') {
      return handleInquiry(request, env, ctx, origin);
    }
    if (url.pathname === '/api/factory-application' && request.method === 'POST') {
      return handleFactoryApplication(request, env, ctx, origin);
    }
    if (url.pathname.startsWith('/api/inquiry/') && request.method === 'GET') {
      return handleGetInquiry(request, env, url, origin);
    }
    if (url.pathname.startsWith('/api/factory/') && request.method === 'GET') {
      return handleGetFactory(request, env, url, origin);
    }
    if (url.pathname === '/api/health') {
      return jsonResponse({ status: 'ok', service: 'cmh-api', version: '0.3' }, 200, origin);
    }

    // ---- Admin routes（由 Cloudflare Access 在边缘鉴权，Worker 只做身份确认） ----
    if (url.pathname.startsWith('/api/admin/')) {
      return handleAdmin(request, env, url, origin);
    }

    return jsonResponse({ error: 'Not found' }, 404, origin);
  },
};

// ============ CLOUDFLARE ACCESS JWT 验证 ============
const CF_ACCESS_AUD = 'cd69f936ac5a240bff8bb96232fa02b844aaaca226dfc9a66ab9912287bfd79c';
const CF_CERTS_URL = 'https://chengtiankeji.cloudflareaccess.com/cdn-cgi/access/certs';

async function verifyAccessJWT(request) {
  // 本地开发跳过
  const skipCheck = false; // 上线后保持 false

  const token = request.headers.get('Cf-Access-Jwt-Assertion')
    || getCookieValue(request.headers.get('Cookie') || '', 'CF_Authorization');

  if (!token) return null;

  try {
    // 拉取 Cloudflare 公钥
    const certsRes = await fetch(CF_CERTS_URL);
    const { keys } = await certsRes.json();

    // 解析 JWT header 找 kid
    const [headerB64] = token.split('.');
    const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
    const jwk = keys.find(k => k.kid === header.kid);
    if (!jwk) return null;

    // 导入公钥并验证
    const key = await crypto.subtle.importKey(
      'jwk', jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false, ['verify']
    );

    const [, payloadB64, sigB64] = token.split('.');
    const data = new TextEncoder().encode(`${token.split('.')[0]}.${payloadB64}`);
    const sig = Uint8Array.from(atob(sigB64.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sig, data);
    if (!valid) return null;

    // 验证 aud 和过期时间
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    const audOk = Array.isArray(payload.aud) ? payload.aud.includes(CF_ACCESS_AUD) : payload.aud === CF_ACCESS_AUD;
    if (!audOk) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload.email || payload.sub || 'authenticated';
  } catch (e) {
    console.error('JWT verify error:', e);
    return null;
  }
}

function getCookieValue(cookieHeader, name) {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

// ============ ADMIN ROUTER ============
async function handleAdmin(request, env, url, origin) {
  // 本地开发跳过鉴权
  if (env.SKIP_ACCESS_CHECK === 'true') {
    // skip
  } else {
    const userEmail = await verifyAccessJWT(request);
    if (!userEmail) {
      return jsonResponse({ error: 'Forbidden: Cloudflare Access required' }, 403, origin);
    }
  }

  const path = url.pathname;
  const method = request.method;

  // GET /api/admin/inquiries/export  （必须在 /api/admin/inquiries/:id 之前匹配）
  if (path === '/api/admin/inquiries/export' && method === 'GET') {
    return handleAdminExportInquiries(request, env, url);
  }
  // GET /api/admin/inquiries
  if (path === '/api/admin/inquiries' && method === 'GET') {
    return handleAdminListInquiries(request, env, url, origin);
  }
  // GET /api/admin/inquiries/:id  单条详情
  if (path.startsWith('/api/admin/inquiries/') && method === 'GET') {
    return handleAdminGetInquiry(request, env, url, origin);
  }
  // PATCH /api/admin/inquiries/:id
  if (path.startsWith('/api/admin/inquiries/') && method === 'PATCH') {
    return handleAdminUpdateInquiry(request, env, url, origin);
  }
  // GET /api/admin/factories
  if (path === '/api/admin/factories' && method === 'GET') {
    return handleAdminListFactories(request, env, url, origin);
  }
  // GET /api/admin/factories/:id  单条详情
  if (path.startsWith('/api/admin/factories/') && method === 'GET') {
    return handleAdminGetFactory(request, env, url, origin);
  }
  // GET /api/admin/factories/export
  if (path === '/api/admin/factories/export' && method === 'GET') {
    return handleAdminExportFactories(request, env, url);
  }
  // PATCH /api/admin/factories/:id
  if (path.startsWith('/api/admin/factories/') && method === 'PATCH') {
    return handleAdminUpdateFactory(request, env, url, origin);
  }

  return jsonResponse({ error: 'Admin route not found' }, 404, origin);
}

// ============ ADMIN: 询盘列表 ============
async function handleAdminListInquiries(request, env, url, origin) {
  try {
    const params = url.searchParams;
    const page   = Math.max(1, parseInt(params.get('page') || '1'));
    const size   = CONFIG.ADMIN_PAGE_SIZE;
    const offset = (page - 1) * size;
    const status  = params.get('status') || '';   // new | read | following | closed
    const country = params.get('country') || '';
    const q       = params.get('q') || '';         // 关键词搜索 name/company/email

    let where = '1=1';
    const binds = [];
    if (status)  { where += ' AND status = ?';  binds.push(status); }
    if (country) { where += ' AND country = ?'; binds.push(country); }
    if (q) {
      where += ' AND (name LIKE ? OR company LIKE ? OR email LIKE ?)';
      const like = `%${q}%`;
      binds.push(like, like, like);
    }

    const countRow = await env.DB.prepare(
      `SELECT COUNT(*) as total FROM inquiries WHERE ${where}`
    ).bind(...binds).first();

    const rows = await env.DB.prepare(
      `SELECT reference_id, name, company, email, country, category,
              quantity, timeline, status, created_at, utm_source
       FROM inquiries WHERE ${where}
       ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(...binds, size, offset).all();

    return jsonResponse({
      data: rows.results,
      total: countRow.total,
      page,
      page_size: size,
      total_pages: Math.ceil(countRow.total / size),
    }, 200, origin);
  } catch (err) {
    console.error('handleAdminListInquiries error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ ADMIN: 询盘单条详情 ============
async function handleAdminGetInquiry(request, env, url, origin) {
  try {
    const id = url.pathname.split('/').pop();
    const row = await env.DB.prepare(
      `SELECT * FROM inquiries WHERE reference_id = ?`
    ).bind(id).first();
    if (!row) return jsonResponse({ error: 'Not found' }, 404, origin);
    return jsonResponse(row, 200, origin);
  } catch (err) {
    console.error('handleAdminGetInquiry error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ ADMIN: 工厂申请单条详情 ============
async function handleAdminGetFactory(request, env, url, origin) {
  try {
    const id = url.pathname.split('/').pop();
    const row = await env.DB.prepare(
      `SELECT * FROM factory_applications WHERE reference_id = ?`
    ).bind(id).first();
    if (!row) return jsonResponse({ error: 'Not found' }, 404, origin);
    return jsonResponse(row, 200, origin);
  } catch (err) {
    console.error('handleAdminGetFactory error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ ADMIN: 更新询盘状态 ============
async function handleAdminUpdateInquiry(request, env, url, origin) {
  try {
    const id = url.pathname.split('/').pop();
    let body;
    try { body = await request.json(); }
    catch (e) { return jsonResponse({ error: 'Invalid JSON' }, 400, origin); }

    const VALID_STATUSES = ['new', 'read', 'following', 'closed'];
    if (!body.status || !VALID_STATUSES.includes(body.status)) {
      return jsonResponse({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` }, 400, origin);
    }

    const result = await env.DB.prepare(
      `UPDATE inquiries SET status = ? WHERE reference_id = ?`
    ).bind(body.status, id).run();

    if (result.meta.changes === 0) {
      return jsonResponse({ error: 'Not found' }, 404, origin);
    }
    return jsonResponse({ success: true, reference_id: id, status: body.status }, 200, origin);
  } catch (err) {
    console.error('handleAdminUpdateInquiry error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ ADMIN: 导出询盘 CSV ============
async function handleAdminExportInquiries(request, env, url) {
  try {
    const params = url.searchParams;
    const status  = params.get('status') || '';
    const country = params.get('country') || '';

    let where = '1=1';
    const binds = [];
    if (status)  { where += ' AND status = ?';  binds.push(status); }
    if (country) { where += ' AND country = ?'; binds.push(country); }

    const rows = await env.DB.prepare(
      `SELECT reference_id, name, company, email, country, category,
              quantity, timeline, whatsapp, phone_code, inquiry, status,
              utm_source, utm_medium, created_at
       FROM inquiries WHERE ${where}
       ORDER BY created_at DESC LIMIT 5000`
    ).bind(...binds).all();

    const headers = [
      'reference_id','name','company','email','country','category',
      'quantity','timeline','whatsapp','phone_code','inquiry','status',
      'utm_source','utm_medium','created_at'
    ];
    const escape = v => {
      if (v == null) return '';
      const s = String(v).replace(/"/g, '""');
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s}"` : s;
    };
    const csv = [
      headers.join(','),
      ...rows.results.map(r => headers.map(h => escape(r[h])).join(','))
    ].join('\r\n');

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="inquiries-${new Date().toISOString().slice(0,10)}.csv"`,
      }
    });
  } catch (err) {
    console.error('handleAdminExportInquiries error:', err);
    return new Response('Export failed', { status: 500 });
  }
}

// ============ ADMIN: 工厂申请列表 ============
async function handleAdminListFactories(request, env, url, origin) {
  try {
    const params = url.searchParams;
    const page   = Math.max(1, parseInt(params.get('page') || '1'));
    const size   = CONFIG.ADMIN_PAGE_SIZE;
    const offset = (page - 1) * size;
    const status = params.get('status') || '';  // submitted | reviewing | approved | rejected
    const q      = params.get('q') || '';

    let where = '1=1';
    const binds = [];
    if (status) { where += ' AND status = ?'; binds.push(status); }
    if (q) {
      where += ' AND (company_cn LIKE ? OR company_en LIKE ? OR contact_name LIKE ? OR email LIKE ?)';
      const like = `%${q}%`;
      binds.push(like, like, like, like);
    }

    const countRow = await env.DB.prepare(
      `SELECT COUNT(*) as total FROM factory_applications WHERE ${where}`
    ).bind(...binds).first();

    const rows = await env.DB.prepare(
      `SELECT reference_id, company_cn, company_en, city, categories,
              contact_name, phone, email, status, created_at
       FROM factory_applications WHERE ${where}
       ORDER BY created_at DESC LIMIT ? OFFSET ?`
    ).bind(...binds, size, offset).all();

    return jsonResponse({
      data: rows.results,
      total: countRow.total,
      page,
      page_size: size,
      total_pages: Math.ceil(countRow.total / size),
    }, 200, origin);
  } catch (err) {
    console.error('handleAdminListFactories error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}


// ============ ADMIN: 导出工厂申请 CSV ============
async function handleAdminExportFactories(request, env, url) {
  try {
    const params = url.searchParams;
    const status = params.get('status') || '';

    let where = '1=1';
    const binds = [];
    if (status) { where += ' AND status = ?'; binds.push(status); }

    const rows = await env.DB.prepare(
      `SELECT reference_id, company_cn, company_en, business_id, founded_year,
              city, district, address, facility_size, headcount,
              categories, capabilities, moq, sample_lead, production_lead,
              annual_capacity, export_markets, certs, website, references_text,
              contact_name, contact_title, phone, wechat, email,
              english_level, services, notes, status, created_at
       FROM factory_applications WHERE ${where}
       ORDER BY created_at DESC LIMIT 5000`
    ).bind(...binds).all();

    const headers = [
      'reference_id','company_cn','company_en','business_id','founded_year',
      'city','district','address','facility_size','headcount',
      'categories','capabilities','moq','sample_lead','production_lead',
      'annual_capacity','export_markets','certs','website','references_text',
      'contact_name','contact_title','phone','wechat','email',
      'english_level','services','notes','status','created_at'
    ];
    const escape = v => {
      if (v == null) return '';
      const s = String(v).replace(/"/g, '""');
      return s.includes(',') || s.includes('"') || s.includes('') ? `"${s}"` : s;
    };
    const csv = [
      headers.join(','),
      ...rows.results.map(r => headers.map(h => escape(r[h])).join(','))
    ].join('');

    return new Response('﻿' + csv, {  // BOM 让 Excel 正确识别 UTF-8
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="factories-${new Date().toISOString().slice(0,10)}.csv"`,
      }
    });
  } catch (err) {
    console.error('handleAdminExportFactories error:', err);
    return new Response('Export failed', { status: 500 });
  }
}

// ============ ADMIN: 更新工厂申请状态 ============
async function handleAdminUpdateFactory(request, env, url, origin) {
  try {
    const id = url.pathname.split('/').pop();
    let body;
    try { body = await request.json(); }
    catch (e) { return jsonResponse({ error: 'Invalid JSON' }, 400, origin); }

    const VALID_STATUSES = ['submitted', 'reviewing', 'approved', 'rejected'];
    if (!body.status || !VALID_STATUSES.includes(body.status)) {
      return jsonResponse({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` }, 400, origin);
    }

    const result = await env.DB.prepare(
      `UPDATE factory_applications SET status = ?, updated_at = ? WHERE reference_id = ?`
    ).bind(body.status, new Date().toISOString(), id).run();

    if (result.meta.changes === 0) {
      return jsonResponse({ error: 'Not found' }, 404, origin);
    }
    return jsonResponse({ success: true, reference_id: id, status: body.status }, 200, origin);
  } catch (err) {
    console.error('handleAdminUpdateFactory error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ INQUIRY (买家询盘) ============
async function handleInquiry(request, env, ctx, origin) {
  try {
    let body;
    try { body = await request.json(); }
    catch (e) { return jsonResponse({ error: 'Invalid JSON' }, 400, origin); }

    const validation = validateInquiry(body);
    if (!validation.valid) return jsonResponse({ error: validation.error }, 400, origin);

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!await checkRateLimit(env, clientIP, 'inquiries')) {
      return jsonResponse({ error: 'Too many requests. Please try again later.' }, 429, origin);
    }

    if (isSpam(body.inquiry) || isSpam(body.name) || isSpam(body.company)) {
      return jsonResponse({ success: true, reference_id: 'CMH-XXXXXX' }, 200, origin);
    }

    const referenceId = generateReferenceId('CMH-');
    const cfCountry = request.headers.get('CF-IPCountry') || 'unknown';
    const cfCity = request.headers.get('CF-IPCity') || '';

    const inquiryRecord = {
      reference_id: referenceId,
      name: sanitize(body.name),
      company: sanitize(body.company),
      email: sanitize(body.email).toLowerCase(),
      country: body.country || cfCountry,
      phone_code: body.phone_code || '',
      whatsapp: sanitize(body.whatsapp || ''),
      category: body.category || '',
      quantity: body.quantity || '',
      timeline: body.timeline || '',
      inquiry: sanitize(body.inquiry),
      utm_source: body.tracking?.utm_source || 'direct',
      utm_medium: body.tracking?.utm_medium || '',
      utm_campaign: body.tracking?.utm_campaign || '',
      utm_term: body.tracking?.utm_term || '',
      utm_content: body.tracking?.utm_content || '',
      referrer: body.tracking?.referrer || '',
      landing_page: body.tracking?.landing_page || '',
      user_agent: body.tracking?.user_agent || '',
      language: body.tracking?.language || '',
      timezone: body.tracking?.timezone || '',
      ip_address: clientIP,
      ip_country: cfCountry,
      ip_city: cfCity,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    await env.DB.prepare(`
      INSERT INTO inquiries (
        reference_id, name, company, email, country,
        phone_code, whatsapp, category, quantity, timeline, inquiry,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        referrer, landing_page, user_agent, language, timezone,
        ip_address, ip_country, ip_city, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      inquiryRecord.reference_id, inquiryRecord.name, inquiryRecord.company,
      inquiryRecord.email, inquiryRecord.country, inquiryRecord.phone_code,
      inquiryRecord.whatsapp, inquiryRecord.category, inquiryRecord.quantity,
      inquiryRecord.timeline, inquiryRecord.inquiry,
      inquiryRecord.utm_source, inquiryRecord.utm_medium, inquiryRecord.utm_campaign,
      inquiryRecord.utm_term, inquiryRecord.utm_content,
      inquiryRecord.referrer, inquiryRecord.landing_page, inquiryRecord.user_agent,
      inquiryRecord.language, inquiryRecord.timezone,
      inquiryRecord.ip_address, inquiryRecord.ip_country, inquiryRecord.ip_city,
      inquiryRecord.status, inquiryRecord.created_at
    ).run();

    ctx.waitUntil(Promise.all([
      sendInquiryFeishu(inquiryRecord),
      sendInquiryWecom(inquiryRecord),
    ]).catch(err => console.error('Notification error:', err)));

    return jsonResponse({
      success: true,
      reference_id: referenceId,
      message: 'Inquiry received. We will respond within 48 hours.'
    }, 200, origin);

  } catch (err) {
    console.error('handleInquiry error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ FACTORY APPLICATION (工厂入驻) ============
async function handleFactoryApplication(request, env, ctx, origin) {
  try {
    let body;
    try { body = await request.json(); }
    catch (e) { return jsonResponse({ error: 'Invalid JSON' }, 400, origin); }

    // Validate required fields
    const required = ['company_cn', 'business_id', 'contact_name', 'phone', 'email'];
    for (const f of required) {
      if (!body[f] || !String(body[f]).trim()) {
        return jsonResponse({ error: `Missing required field: ${f}` }, 400, origin);
      }
    }
    if (!isValidEmail(body.email)) {
      return jsonResponse({ error: 'Invalid email' }, 400, origin);
    }
    // 统一社会信用代码 18 位校验
    if (!/^[0-9A-HJ-NPQRTUWXY]{18}$/.test(body.business_id)) {
      return jsonResponse({ error: '统一社会信用代码格式不正确' }, 400, origin);
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!await checkRateLimit(env, clientIP, 'factory_applications')) {
      return jsonResponse({ error: 'Too many requests. Please try again later.' }, 429, origin);
    }

    // Check duplicate by business_id
    const existing = await env.DB.prepare(
      'SELECT reference_id, status FROM factory_applications WHERE business_id = ?'
    ).bind(body.business_id).first();
    if (existing) {
      return jsonResponse({
        error: '该统一社会信用代码已提交过申请',
        reference_id: existing.reference_id,
        status: existing.status
      }, 409, origin);
    }

    const referenceId = generateReferenceId('CMH-F-');
    const now = new Date().toISOString();

    // Normalize array fields (multi-checkbox can come as array or string)
    const normalizeArray = v => {
      if (!v) return '[]';
      if (Array.isArray(v)) return JSON.stringify(v);
      return JSON.stringify([v]);
    };

    const record = {
      reference_id: referenceId,
      company_cn: sanitize(body.company_cn),
      company_en: sanitize(body.company_en || ''),
      business_id: sanitize(body.business_id),
      founded_year: parseInt(body.founded_year) || null,
      city: sanitize(body.city || ''),
      district: sanitize(body.district || ''),
      address: sanitize(body.address || ''),
      facility_size: parseInt(body.facility_size) || null,
      headcount: sanitize(body.headcount || ''),
      categories: normalizeArray(body.categories),
      capabilities: sanitize(body.capabilities || ''),
      moq: sanitize(body.moq || ''),
      sample_lead: parseInt(body.sample_lead) || null,
      production_lead: parseInt(body.production_lead) || null,
      annual_capacity: sanitize(body.annual_capacity || ''),
      export_markets: sanitize(body.export_markets || ''),
      certs: normalizeArray(body.certs),
      product_images: '[]',
      factory_images: '[]',
      website: sanitize(body.website || ''),
      references_text: sanitize(body.references || ''),
      contact_name: sanitize(body.contact_name),
      contact_title: sanitize(body.contact_title || ''),
      phone: sanitize(body.phone),
      wechat: sanitize(body.wechat || ''),
      email: sanitize(body.email).toLowerCase(),
      english_level: sanitize(body.english_level || ''),
      services: normalizeArray(body.services),
      notes: sanitize(body.notes || ''),
      status: 'submitted',
      ip_address: clientIP,
      user_agent: request.headers.get('User-Agent') || '',
      created_at: now,
      updated_at: now,
    };

    await env.DB.prepare(`
      INSERT INTO factory_applications (
        reference_id, company_cn, company_en, business_id, founded_year,
        city, district, address, facility_size, headcount,
        categories, capabilities, moq, sample_lead, production_lead, annual_capacity, export_markets,
        certs, product_images, factory_images, website, references_text,
        contact_name, contact_title, phone, wechat, email, english_level, services, notes,
        status, ip_address, user_agent, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      record.reference_id, record.company_cn, record.company_en, record.business_id, record.founded_year,
      record.city, record.district, record.address, record.facility_size, record.headcount,
      record.categories, record.capabilities, record.moq, record.sample_lead, record.production_lead, record.annual_capacity, record.export_markets,
      record.certs, record.product_images, record.factory_images, record.website, record.references_text,
      record.contact_name, record.contact_title, record.phone, record.wechat, record.email, record.english_level, record.services, record.notes,
      record.status, record.ip_address, record.user_agent, record.created_at, record.updated_at
    ).run();

    ctx.waitUntil(Promise.all([
      sendFactoryFeishu(record),
      sendFactoryWecom(record),
      sendConfirmationEmail(env, record.email, referenceId, record.company_cn),
    ]).catch(err => console.error('Notification error:', err)));

    return jsonResponse({
      success: true,
      reference_id: referenceId,
      message: '申请已收到。我们的佛山团队会在 3 个工作日内完成审核并联系您。'
    }, 200, origin);

  } catch (err) {
    console.error('handleFactoryApplication error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500, origin);
  }
}

// ============ RESEND 确认邮件 ============
async function sendConfirmationEmail(env, to, referenceId, companyName) {
  if (!env.RESEND_API_KEY) return;
  try {
    const html = `<!DOCTYPE html>
<html lang="zh">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4EFE6;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FAF7F0;border:1px solid rgba(15,14,12,0.12)">
        <tr><td style="padding:32px 40px;border-bottom:1px solid rgba(15,14,12,0.12)">
          <span style="background:#0F0E0C;color:#F4EFE6;padding:4px 10px;font-size:11px;letter-spacing:1px;font-family:monospace">CMH</span>
          <span style="margin-left:10px;font-size:16px;font-weight:500;color:#0F0E0C">ChinaMakersHub</span>
        </td></tr>
        <tr><td style="padding:40px">
          <h1 style="margin:0 0 16px;font-size:24px;font-weight:500;color:#0F0E0C;letter-spacing:-0.02em">申请已收到</h1>
          <p style="margin:0 0 24px;color:#2A2825;font-size:15px;line-height:1.7">您好，${companyName ? companyName + ' 的' : ''}工厂入驻申请已成功提交。我们的佛山团队将在 <strong>3 个工作日</strong>内完成初步审核并与您联系。</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBE4D6;border-left:3px solid #B83A26;padding:20px 24px;margin-bottom:28px">
            <tr><td>
              <div style="font-size:11px;color:#6B6862;letter-spacing:1px;font-family:monospace;text-transform:uppercase;margin-bottom:6px">Reference ID</div>
              <div style="font-size:22px;font-weight:600;color:#B83A26;font-family:monospace;letter-spacing:1px">${referenceId}</div>
            </td></tr>
          </table>
          <p style="margin:0 0 8px;color:#2A2825;font-size:14px;line-height:1.7">审核通过后，我们将安排佛山团队实地走访工厂，完成 <strong>CMH Verified</strong> 认证。</p>
          <p style="margin:0 0 28px;color:#6B6862;font-size:13px;line-height:1.7">如有任何问题，请回复此邮件或发送邮件至 <a href="mailto:info@chinamakershub.com" style="color:#B83A26">info@chinamakershub.com</a></p>
          <a href="https://chinamakershub.com" style="display:inline-block;background:#0F0E0C;color:#F4EFE6;padding:12px 24px;font-size:13px;font-weight:600;letter-spacing:1px;text-decoration:none;text-transform:uppercase">访问平台 →</a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid rgba(15,14,12,0.12);font-size:12px;color:#6B6862">
          © 2026 ChinaMakersHub · Qingxuan International Trading Limited · Hong Kong
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ChinaMakersHub <info@chinamakershub.com>',
        to: [to],
        subject: `工厂入驻申请已收到 — ${referenceId}`,
        html,
      })
    });
  } catch(e) {
    console.error('Resend error:', e);
  }
}

// ============ FEISHU NOTIFICATIONS ============
async function sendInquiryFeishu(inquiry) {
  const card = {
    msg_type: 'interactive',
    card: {
      config: { wide_screen_mode: true },
      header: {
        title: { tag: 'plain_text', content: `🎯 新询盘 ${inquiry.reference_id}` },
        template: 'red'
      },
      elements: [
        {
          tag: 'div',
          fields: [
            { is_short: true, text: { tag: 'lark_md', content: `**👤 姓名**\n${inquiry.name}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**🏢 公司**\n${inquiry.company}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**📧 邮箱**\n${inquiry.email}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**🌍 国家**\n${inquiry.country} (IP: ${inquiry.ip_country})` } },
          ]
        },
        { tag: 'hr' },
        {
          tag: 'div',
          fields: [
            { is_short: true, text: { tag: 'lark_md', content: `**📱 WhatsApp**\n${inquiry.phone_code} ${inquiry.whatsapp || '未填'}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**📦 品类**\n${inquiry.category || '未指定'}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**🔢 数量**\n${inquiry.quantity || '未指定'}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**⏰ 时间**\n${inquiry.timeline || '未指定'}` } },
          ]
        },
        { tag: 'hr' },
        { tag: 'div', text: { tag: 'lark_md', content: `**📝 询盘内容:**\n${inquiry.inquiry}` } },
        { tag: 'hr' },
        {
          tag: 'note',
          elements: [
            { tag: 'plain_text', content: `来源: ${inquiry.utm_source} / ${inquiry.utm_medium || 'organic'} · ${inquiry.created_at}` }
          ]
        },
        {
          tag: 'action',
          actions: [
            {
              tag: 'button',
              text: { tag: 'plain_text', content: '📧 回复邮件' },
              url: `mailto:${inquiry.email}?subject=Re:%20Your%20inquiry%20to%20ChinaMakersHub%20[${inquiry.reference_id}]`,
              type: 'primary'
            },
            ...(inquiry.whatsapp ? [{
              tag: 'button',
              text: { tag: 'plain_text', content: '💬 WhatsApp' },
              url: `https://wa.me/${(inquiry.phone_code + inquiry.whatsapp).replace(/[^0-9]/g, '')}`,
              type: 'default'
            }] : [])
          ]
        }
      ]
    }
  };
  return postWebhook(CONFIG.FEISHU_WEBHOOK, card);
}

async function sendFactoryFeishu(record) {
  const categories = JSON.parse(record.categories || '[]').join('、');
  const certs = JSON.parse(record.certs || '[]').join('、') || '无';
  const services = JSON.parse(record.services || '[]').join('、') || '无';

  const card = {
    msg_type: 'interactive',
    card: {
      config: { wide_screen_mode: true },
      header: {
        title: { tag: 'plain_text', content: `🏭 新工厂入驻申请 ${record.reference_id}` },
        template: 'green'
      },
      elements: [
        {
          tag: 'div',
          text: { tag: 'lark_md', content: `**${record.company_cn}**\n${record.company_en || ''}` }
        },
        { tag: 'hr' },
        {
          tag: 'div',
          fields: [
            { is_short: true, text: { tag: 'lark_md', content: `**📍 城市**\n${record.city} ${record.district}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**📅 成立**\n${record.founded_year || '未填'} 年` } },
            { is_short: true, text: { tag: 'lark_md', content: `**🏗️ 厂房**\n${record.facility_size || '?'} ㎡` } },
            { is_short: true, text: { tag: 'lark_md', content: `**👥 人员**\n${record.headcount || '未填'}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**📦 品类**\n${categories || '未填'}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**🏅 认证**\n${certs}` } },
          ]
        },
        { tag: 'hr' },
        {
          tag: 'div',
          text: { tag: 'lark_md', content: `**🛠️ 工厂能力:**\n${record.capabilities || '未填'}` }
        },
        { tag: 'hr' },
        {
          tag: 'div',
          fields: [
            { is_short: true, text: { tag: 'lark_md', content: `**👤 联系人**\n${record.contact_name} (${record.contact_title})` } },
            { is_short: true, text: { tag: 'lark_md', content: `**📞 电话**\n${record.phone}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**💬 微信**\n${record.wechat || '未填'}` } },
            { is_short: true, text: { tag: 'lark_md', content: `**📧 邮箱**\n${record.email}` } },
          ]
        },
        { tag: 'hr' },
        {
          tag: 'div',
          text: { tag: 'lark_md', content: `**🤝 期望服务:** ${services}\n**🌐 英语能力:** ${record.english_level || '未填'}` }
        },
        ...(record.notes ? [
          { tag: 'hr' },
          { tag: 'div', text: { tag: 'lark_md', content: `**📝 备注:**\n${record.notes}` } }
        ] : []),
        { tag: 'hr' },
        {
          tag: 'note',
          elements: [
            { tag: 'plain_text', content: `统一社会信用代码: ${record.business_id} · ${record.created_at}` }
          ]
        },
        {
          tag: 'action',
          actions: [
            {
              tag: 'button',
              text: { tag: 'plain_text', content: '📞 立即拨打' },
              url: `tel:${record.phone}`,
              type: 'primary'
            },
            {
              tag: 'button',
              text: { tag: 'plain_text', content: '📧 发邮件' },
              url: `mailto:${record.email}?subject=Re:%20您的%20ChinaMakersHub%20入驻申请%20[${record.reference_id}]`,
              type: 'default'
            }
          ]
        }
      ]
    }
  };
  return postWebhook(CONFIG.FEISHU_WEBHOOK, card);
}

// ============ WECOM NOTIFICATIONS ============
async function sendInquiryWecom(inquiry) {
  const content = `## 🎯 新询盘 ${inquiry.reference_id}

**联系人**: ${inquiry.name} / ${inquiry.company}
**邮箱**: ${inquiry.email}
**WhatsApp**: ${inquiry.phone_code} ${inquiry.whatsapp || '未填'}
**国家**: ${inquiry.country}

**品类**: ${inquiry.category || '未指定'}
**数量**: ${inquiry.quantity || '未指定'}
**时间**: ${inquiry.timeline || '未指定'}

**询盘内容**:
> ${inquiry.inquiry.replace(/\n/g, '\n> ')}

**来源**: ${inquiry.utm_source} / ${inquiry.utm_medium || 'organic'}
**时间**: ${inquiry.created_at}`;
  return postWebhook(CONFIG.WECOM_WEBHOOK, {
    msgtype: 'markdown',
    markdown: { content }
  });
}

async function sendFactoryWecom(record) {
  const categories = JSON.parse(record.categories || '[]').join('、');
  const certs = JSON.parse(record.certs || '[]').join('、') || '无';
  const services = JSON.parse(record.services || '[]').join('、') || '无';

  const content = `## 🏭 新工厂入驻申请 ${record.reference_id}

**${record.company_cn}**
${record.company_en || ''}

**城市**: ${record.city} ${record.district}
**成立**: ${record.founded_year || '未填'} 年
**厂房**: ${record.facility_size || '?'} ㎡ · ${record.headcount || '未填'}
**品类**: ${categories || '未填'}
**认证**: ${certs}

**工厂能力**:
> ${(record.capabilities || '未填').replace(/\n/g, '\n> ')}

**联系人**: ${record.contact_name} (${record.contact_title})
**电话**: ${record.phone}
**微信**: ${record.wechat || '未填'}
**邮箱**: ${record.email}

**期望服务**: ${services}
**英语能力**: ${record.english_level || '未填'}

${record.notes ? `**备注**: ${record.notes}\n` : ''}
统一社会信用代码: ${record.business_id}
${record.created_at}`;

  return postWebhook(CONFIG.WECOM_WEBHOOK, {
    msgtype: 'markdown',
    markdown: { content }
  });
}

async function postWebhook(url, payload) {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error('Webhook failed:', url, e);
  }
}

// ============ ADMIN GET (legacy single-record endpoints) ============
async function handleGetInquiry(request, env, url, origin) {
  const auth = request.headers.get('Authorization');
  if (!auth || auth !== `Bearer ${env.ADMIN_TOKEN}`) {
    return jsonResponse({ error: 'Unauthorized' }, 401, origin);
  }
  const id = url.pathname.split('/').pop();
  const inquiry = await env.DB.prepare(
    'SELECT * FROM inquiries WHERE reference_id = ?'
  ).bind(id).first();
  if (!inquiry) return jsonResponse({ error: 'Not found' }, 404, origin);
  return jsonResponse(inquiry, 200, origin);
}

async function handleGetFactory(request, env, url, origin) {
  const auth = request.headers.get('Authorization');
  if (!auth || auth !== `Bearer ${env.ADMIN_TOKEN}`) {
    return jsonResponse({ error: 'Unauthorized' }, 401, origin);
  }
  const id = url.pathname.split('/').pop();
  const factory = await env.DB.prepare(
    'SELECT * FROM factory_applications WHERE reference_id = ?'
  ).bind(id).first();
  if (!factory) return jsonResponse({ error: 'Not found' }, 404, origin);
  return jsonResponse(factory, 200, origin);
}

// ============ VALIDATION HELPERS ============
function validateInquiry(body) {
  if (!body.name || body.name.trim().length < 2) return { valid: false, error: 'Name is required' };
  if (!body.company || body.company.trim().length < 2) return { valid: false, error: 'Company is required' };
  if (!body.email || !isValidEmail(body.email)) return { valid: false, error: 'Valid email is required' };
  if (!body.country) return { valid: false, error: 'Country is required' };
  if (!body.inquiry || body.inquiry.trim().length < CONFIG.MIN_INQUIRY_LENGTH) {
    return { valid: false, error: `Inquiry must be at least ${CONFIG.MIN_INQUIRY_LENGTH} characters` };
  }
  if (body.inquiry.length > 5000) return { valid: false, error: 'Inquiry too long' };
  return { valid: true };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSpam(text) {
  if (!text) return false;
  const spamPatterns = [
    /\b(seo services|backlinks|cheap viagra|crypto|forex|casino)\b/i,
    /(.)\1{10,}/,
    /[А-я]{20,}/,
  ];
  const urlCount = (text.match(/(http|https):\/\//gi) || []).length;
  if (urlCount > 2) return true;
  return spamPatterns.some(p => p.test(text));
}

function sanitize(str) {
  if (!str) return '';
  return String(str).trim().slice(0, 5000).replace(/[\x00-\x1F\x7F]/g, '');
}

async function checkRateLimit(env, ip, table) {
  if (!ip || ip === 'unknown') return true;
  try {
    const since = new Date(Date.now() - 3600 * 1000).toISOString();
    const result = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM ${table} WHERE ip_address = ? AND created_at > ?`
    ).bind(ip, since).first();
    return (result?.count || 0) < CONFIG.RATE_LIMIT_PER_HOUR;
  } catch (e) {
    console.error('Rate limit check failed:', e);
    return true;
  }
}

function generateReferenceId(prefix = 'CMH-') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = prefix;
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function jsonResponse(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
  });
}

function corsHeaders(origin) {
  const allowed = CONFIG.ALLOWED_ORIGINS.includes(origin) ? origin : CONFIG.ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function handleCORS(origin) {
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}