# ChinaMakersHub — 批量生成工厂页面 Prompt

## 任务
为以下 9 个虚拟工厂生成独立的 HTML 页面，每个工厂生成一个文件，放入对应文件夹。

## 文件结构
```
web/factories/
  factory.css          ← 已存在，所有页面共用
  factory.js           ← 已存在，所有页面共用
  xinglong-fasteners/index.html
  boshi-lock/index.html
  weichuang-sheet-metal/index.html
  haoguang-led/index.html
  junhui-outdoor-lighting/index.html
  yimei-decorative-lighting/index.html
  longda-packaging/index.html
  kaiwei-sanitary/index.html
  xinte-electronics/index.html
```

---

## HTML 模板结构（每个页面必须严格遵守）

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{工厂英文名} — {品类} Manufacturer in {城市} | ChinaMakersHub</title>
<meta name="description" content="{150字以内的SEO描述}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Inter+Tight:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../factory.css">
</head>
<body>

<!-- NAV（固定，不要改） -->
<header class="nav">
  <div class="container nav-inner">
    <a href="/" class="logo"><span class="logo-mark">CMH</span>ChinaMakersHub</a>
    <nav><ul class="nav-links">
      <li><a href="/categories/">Categories</a></li>
      <li><a href="/factories/">Factories</a></li>
      <li><a href="/#how">How It Works</a></li>
      <li><a href="/journal/">Journal</a></li>
      <li><a href="/#about">About</a></li>
    </ul></nav>
    <a href="#inquiry" class="btn-primary">Request a Quote <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5h10m0 0L7 1m4 4L7 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/></svg></a>
  </div>
</header>

<main>
  <!-- BREADCRUMB -->
  <div class="container">
    <nav class="breadcrumb">
      <a href="/">Home</a><span class="sep">/</span>
      <a href="/factories/">Factories</a><span class="sep">/</span>
      <span>{工厂英文名}</span>
    </nav>
  </div>

  <!-- ① FACTORY HEADER -->
  <section><div class="container"><div class="f-header"><div class="f-header-grid">
    <div>
      <div class="f-eyebrow">/ {品类描述，如 Industrial Fastener Manufacturer} <span class="f-id">{ID}</span></div>
      <h1 class="f-title">{名字第一个词}<br>{名字剩余部分}</h1>
      <p class="f-tagline">{2-3句介绍，含年限、品类、目标市场、核心卖点}</p>
      <div class="f-quick">
        <span class="f-quick-item">{城市}, Guangdong</span>
        <span class="f-quick-item">Est. {年份}</span>
        <span class="f-quick-item">{面积} m² facility</span>
        <span class="f-quick-item">{人数} staff</span>
      </div>
      <!-- 有 Verified 标签的工厂才加这个按钮 -->
      <button class="verified-badge-chip" onclick="openVerifiedModal()">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
        CMH Verified
      </button>
    </div>
    <aside class="trust-card"><div class="trust-card-cta" style="border-top:none;">
      <div class="video-placeholder" onclick="alert('Factory video coming soon.')">
        <div class="video-play-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" opacity="0.4"/><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
        <div class="video-placeholder-label">Factory Video Tour</div>
        <div class="video-placeholder-sub">Coming Soon</div>
      </div>
      <a href="#inquiry" class="btn-block">Request a Quote <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5h10m0 0L7 1m4 4L7 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/></svg></a>
      <a href="https://wa.me/{whatsapp号}" class="btn-block outline">Chat on WhatsApp</a>
    </div></aside>
  </div></div></div></section>

  <!-- ② GALLERY（4格，第1格竖跨2行） -->
  <div class="gallery"><div class="container"><div class="gallery-grid">
    <!-- 4个 .gallery-item，每个里面放 SVG 占位图 + .gallery-label -->
    <!-- SVG 规格：第1格 viewBox="0 0 600 600"，后3格 viewBox="0 0 400 300" -->
    <!-- SVG 背景色：用深色调（#0F0E0C / #101010 / #0A0F1A / #1A0F0A 等），线条用 #F4EFE6 opacity 0.2-0.3 -->
    <!-- 第1格必须有工厂所在地文字：font-family="JetBrains Mono" 城市·广东·中国 -->
    <!-- 每格必须有一个用 Instrument Serif italic 写的品类关键词，颜色 #B83A26 -->
  </div></div></div>

  <!-- ③ TRUST BAND（5格数据栏） -->
  <div class="trust-band"><div class="container"><div class="trust-band-grid">
    <!-- 5个 .trust-item，包含 icon + num + label + desc -->
    <!-- 数据项：年限 / 面积 / 打样天数 / 年产能 / 出口比例 -->
  </div></div></div>

  <!-- ④ RATINGS BAR -->
  <div class="ratings-bar"><div class="container"><div class="ratings-inner">
    <div class="rating-score">
      <div class="score">{4.6-4.9之间}</div>
      <div class="stars">★★★★★</div>
      <div class="count">CMH Verified Score</div>
    </div>
    <div class="rating-divider"></div>
    <div class="rating-bars">
      <!-- 4行：Quality / Delivery / Response / OEM Skill，宽度用 % 表示 -->
    </div>
    <div class="rating-divider"></div>
    <div class="certs-strip">
      <!-- 4个 .cert-badge：OEM Ready / {打样天数}d Sample / Export Docs / T/T -->
    </div>
  </div></div></div>

  <!-- ⑤ PRODUCTS（8张产品卡，3个分类 filter） -->
  <section class="section"><div class="container">
    <div class="section-header">
      <div class="section-num"><strong>01</strong>Products</div>
      <h2 class="section-title">{产品标题，含 <em>斜体关键词</em>}</h2>
    </div>
    <!-- cat-filter-wrap：All + 3个分类按钮 + cat-pager -->
    <!-- products-grid：8个 .product[data-cat]，每个含 SVG 占位图 + product-info -->
    <!-- 产品卡 onclick="openLightbox(...)" 8个参数：img路径/标题/分类/描述/材料/尺寸/特点/MOQ -->
    <!-- SVG 占位图：viewBox="0 0 400 400"，深色背景，线条图案表示产品形态 -->
    <!-- pagination：page-prev / page-info / page-next -->
  </div></section>

  <!-- ⑥ VERIFIED MODAL（有 Verified 的工厂才加） -->
  <div class="verified-modal" id="verified-modal" onclick="closeVerifiedOnBg(event)">
    <div class="verified-modal-inner">
      <!-- header：badge icon + 标题 + 审核日期 + 关闭按钮 -->
      <!-- body：6条 verified-item，每条含标题和子标题 -->
      <!-- footer：Factory ID + 审核日期 -->
    </div>
  </div>

  <!-- ⑦ LIGHTBOX（固定结构，只换 factory ID 和 WhatsApp 号） -->
  <div class="lightbox" id="lightbox" onclick="closeLightboxOnBg(event)">
    <div class="lightbox-inner">
      <button class="lightbox-close" onclick="closeLightbox()">✕</button>
      <div class="lightbox-img" id="lb-img-wrap">
        <img id="lb-img" src="" alt="">
        <div class="zoom-lens" id="zoom-lens"></div>
        <div class="zoom-preview" id="zoom-preview"></div>
      </div>
      <div class="lightbox-body">
        <div class="lightbox-cat" id="lb-cat"></div>
        <h3 class="lightbox-title" id="lb-title"></h3>
        <p class="lightbox-desc" id="lb-desc"></p>
        <table class="lightbox-table">
          <tr><td>Material</td><td id="lb-material"></td></tr>
          <tr><td>Size / Type</td><td id="lb-size"></td></tr>
          <tr><td>Feature</td><td id="lb-feature"></td></tr>
          <tr><td>MOQ</td><td id="lb-moq"></td></tr>
          <tr><td>Sample Lead</td><td>{打样天数} days</td></tr>
          <tr><td>Production Lead</td><td>{生产周期}</td></tr>
          <tr><td>Incoterms</td><td>FOB · CIF · DDP</td></tr>
        </table>
        <div class="lightbox-cta">
          <a href="/inquiry?factory={ID}" class="btn-inquire">Request a Quote →</a>
          <a href="https://wa.me/{whatsapp}" class="btn-wa">WhatsApp</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ⑧ CAPABILITIES（8格） -->
  <section class="section capabilities"><div class="container">
    <div class="section-header">
      <div class="section-num"><strong>02</strong>Capabilities</div>
      <h2 class="section-title">{标题含 <em>斜体</em>}</h2>
    </div>
    <div class="cap-grid">
      <!-- 8个 .cap，每个含 .cap-num(/ 00X) + h4 + p -->
      <!-- 注意：h4 必须用 </h4> 关闭，不能写成 </div> -->
    </div>
  </div></section>

  <!-- ⑨ CERTIFICATIONS（6格） -->
  <section class="section certs"><div class="container">
    <div class="section-header">
      <div class="section-num"><strong>03</strong>Certifications</div>
      <h2 class="section-title">{标题}</h2>
    </div>
    <div class="certs-grid">
      <!-- 6个 .cert-card，每个含 .cert-mark + .cert-name + .cert-desc -->
    </div>
  </div></section>

  <!-- ⑩ ABOUT（左侧4段文字 + 右侧数据侧边栏） -->
  <section class="section"><div class="container">
    <div class="section-header">
      <div class="section-num"><strong>04</strong>About</div>
      <h2 class="section-title">{标题}</h2>
    </div>
    <div class="about-grid">
      <div class="about-prose">
        <!-- 4个 p 标签，第一个 p 的首字母会自动放大（CSS ::first-letter） -->
      </div>
      <aside class="about-side">
        <h4>At a glance</h4>
        <ul><!-- 8个 li：Founded/Location/Facility/Headcount/Annual output/Export ratio/Main markets/FOB port --></ul>
        <h4 style="margin-top:2rem">Trade terms</h4>
        <ul><!-- 5个 li：MOQ/Sample lead/Production/Payment/Incoterms --></ul>
      </aside>
    </div>
  </div></section>

  <!-- ⑪ TIMELINE（6个节点） -->
  <section class="section timeline"><div class="container">
    <div class="section-header">
      <div class="section-num"><strong>05</strong>Story</div>
      <h2 class="section-title">{标题}</h2>
    </div>
    <div class="timeline-list">
      <!-- 6个 .timeline-item，每个含 .timeline-year + .timeline-content(h4+p) -->
    </div>
  </div></section>

  <!-- ⑫ REVIEWS + INQUIRY -->
  <section class="section reviews" id="inquiry"><div class="container">
    <div class="section-header">
      <div class="section-num"><strong>06</strong>Inquire</div>
      <h2 class="section-title">Buyer reviews &amp; <em>direct inquiry.</em></h2>
    </div>
    <div class="reviews-grid">
      <div class="review-list">
        <!-- 3个 .review-card，每个含 reviewer-info(h5+span) + stars + body + tag + date -->
      </div>
      <div class="inquiry-form-wrap">
        <!-- h3 + p + 表单字段（name/company/email/country/category/qty/message） + btn-submit -->
      </div>
    </div>
  </div></section>

  <!-- ⑬ CTA BAND -->
  <section class="cta-band"><div class="container cta-band-inner">
    <h2>Talk to <em>{工厂简称}</em> directly.</h2>
    <p>{一句话含打样天数和 MOQ}</p>
    <div class="cta-buttons">
      <a href="#inquiry" class="btn-light">Request a Quote ...</a>
      <a href="https://wa.me/{whatsapp}" class="btn-outline">Chat on WhatsApp</a>
    </div>
  </div></section>
</main>

<!-- FOOTER（固定结构） -->
<footer><div class="container">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="/" class="logo" style="color:var(--paper);margin-bottom:1rem;display:flex"><span class="logo-mark">CMH</span>ChinaMakersHub</a>
      <p>A curated B2B sourcing platform connecting global buyers with verified manufacturers across China's Greater Bay Area.</p>
    </div>
    <div class="footer-col">
      <h5>{工厂名} · Contact</h5>
      <!-- 3个 .footer-contact-item：email / 电话 / 地址 -->
    </div>
    <div class="footer-col">
      <h5>Platform</h5>
      <ul>
        <li><a href="/categories/">Browse Categories</a></li>
        <li><a href="/factories/">All Factories</a></li>
        <li><a href="/inquiry/">Submit Inquiry</a></li>
        <li><a href="/factory-apply/">Apply as Factory</a></li>
        <li><a href="/privacy/">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div><strong>Qingxuan International Trading Limited</strong>Hong Kong CR No. 79771658<br>Unit 1618A, 16/F, Pioneer Centre, 750 Nathan Road, Mong Kok, Hong Kong<br>© 2026 ChinaMakersHub. All rights reserved.</div>
    <div class="footer-bank"><strong>Banking Partner</strong>DBS Bank (Hong Kong) Limited · SWIFT: DHBKHKHH<br>Multi-currency T/T accepted · info@chinamakershub.com</div>
  </div>
</div></footer>

<script src="../factory.js"></script>
</body>
</html>
```

---

## 9个工厂的数据规格

### 1. Xinglong Fasteners
- **ID**: CMH-F-XLF007
- **城市**: Dongguan
- **品类**: Industrial Fastener Manufacturer
- **Est.**: 2008 · 28,000 m² · 420 staff
- **Verified**: ✅
- **Tagline**: 17 years manufacturing industrial fasteners for automotive, aerospace, and construction buyers. Bolts, nuts, screws, and specialty fasteners — IATF 16949 and ISO 9001 certified, cold forging and thread rolling on 200+ machines.
- **Trust Band**: 17年 / 28K m² / 10天打样 / 500M pieces/yr / 70% export
- **评分**: 4.8 (Q4.9/D4.7/R4.8/OEM4.8)
- **产品分类**: Bolts / Nuts / Screws / Specialty
- **产品 8张**:
  1. (bolts) Hex Head Bolt — Grade 8.8/10.9 · M6–M36 · ISO 4014
  2. (bolts) Flange Bolt — Serrated flange · M8–M24 · DIN 6921
  3. (bolts) Socket Cap Screw — Alloy steel · M3–M24 · ISO 4762
  4. (nuts) Hex Nut — Grade 8 · M6–M36 · ISO 4032
  5. (nuts) Flange Nut — Serrated · M6–M20 · DIN 6923
  6. (screws) Self-Drilling Screw — Zn/Cr3+ coated · #8–#14 · ISO 15480
  7. (screws) Thread-Forming Screw — Case hardened · M3–M8
  8. (specialty) Anchor Bolt — Wedge type · M8–M30 · ASTM F1554
- **认证 6格**: IATF 16949 / ISO 9001 / ISO 9001 / DIN · ISO / ASTM F1554 / RoHS
- **About 要点**: 2008年东莞创立，冷锻和搓牙工艺，汽车行业IATF 16949，年产5亿件，主要市场DE/US/JP/KR
- **Timeline**: 2008创立 / 2012 IATF认证 / 2015航空级钛紧固件 / 2018全自动检测线 / 2022激光打标 / 2026加入CMH
- **Reviews**: 德国汽车Tier1供应商 / 美国建筑五金分销商 / 日本精密机械采购
- **MOQ**: 10,000 pcs · Sample 10 days · Production 15–35 days

---

### 2. Boshi Lock
- **ID**: CMH-F-BSL008
- **城市**: Zhongshan
- **品类**: Security Lock Manufacturer
- **Est.**: 2012 · 12,000 m² · 180 staff
- **Verified**: ❌（无 verified-badge-chip 和 verified-modal）
- **Tagline**: 13 years manufacturing residential and commercial security locks in Zhongshan. Deadbolts, padlocks, and smart locks — ANSI Grade 2, EN 12209 certified. OEM for European hardware brands.
- **Trust Band**: 13年 / 12K m² / 18天打样 / 3M pcs/yr / 60% export
- **评分**: 4.6 (Q4.7/D4.5/R4.6/OEM4.6)
- **产品分类**: Deadbolts / Padlocks / Smart
- **产品 8张**:
  1. (deadbolts) Single Cylinder Deadbolt — ANSI Grade 2 · Zinc alloy · 6-pin
  2. (deadbolts) Double Cylinder Deadbolt — ANSI Grade 2 · Brass cylinder
  3. (deadbolts) Euro Profile Cylinder — EN 1303 · Brass · Anti-bump
  4. (padlocks) Laminated Padlock — 60mm · Hardened steel shackle
  5. (padlocks) Combination Padlock — 4-dial · Zinc alloy body
  6. (padlocks) Weatherproof Padlock — IP55 · SS316 shackle
  7. (smart) Fingerprint Smart Lock — Bluetooth · 100 fingerprint capacity
  8. (smart) Keypad Smart Lock — Backlit keypad · 50 code capacity
- **认证**: ANSI Grade 2 / EN 12209 / CE / UL Listed / ISO 9001 / BSCI
- **About 要点**: 中山创立，机械锁起家，2019年进入智能锁赛道，欧洲OEM品牌代工
- **MOQ**: 500 pcs · Sample 18 days · Production 25–40 days

---

### 3. Weichuang Sheet Metal
- **ID**: CMH-F-WCS009
- **城市**: Shenzhen
- **品类**: Sheet Metal Fabrication Manufacturer
- **Est.**: 2011 · 15,000 m² · 200 staff
- **Verified**: ✅
- **Tagline**: 14 years providing precision sheet metal fabrication for electronics, telecoms, and industrial equipment manufacturers in Shenzhen. Laser cutting, CNC punching, welding, and powder coat — from prototype to 50,000-piece runs.
- **Trust Band**: 14年 / 15K m² / 7天打样 / 2M pcs/yr / 85% export
- **评分**: 4.8 (Q4.9/D4.8/R4.7/OEM4.8)
- **产品分类**: Enclosures / Brackets / Panels
- **产品 8张**:
  1. (enclosures) 19" Server Rack Enclosure — 1U–4U · SGCC · powder coat
  2. (enclosures) Electronic Control Box — Custom · IP54 · SGCC/SS304
  3. (enclosures) Junction Box — IP65 · powder coat · DIN rail mount
  4. (brackets) L-Bracket & Angle — SGCC · M4–M8 · custom punch
  5. (brackets) Equipment Mounting Bracket — SS304 · laser cut · custom
  6. (panels) Front Panel — Aluminium · laser etch · anodised
  7. (panels) Perforated Mesh Panel — SGCC · custom pattern · powder coat
  8. (panels) Chassis Base Plate — SGCC · CNC punch · custom
- **认证**: ISO 9001 / ISO 14001 / RoHS / CE / IATF 16949 / SGS
- **About 要点**: 深圳福田，服务电子制造商，7天快速打样，激光+冲压+折弯+焊接全流程
- **MOQ**: 200 pcs · Sample 7 days · Production 20–30 days

---

### 4. Haoguang LED
- **ID**: CMH-F-HGL010
- **城市**: Zhongshan
- **品类**: Commercial LED Lighting Manufacturer
- **Est.**: 2010 · 20,000 m² · 260 staff
- **Verified**: ✅
- **Tagline**: 15 years manufacturing commercial LED lighting for retail, warehouse, and outdoor applications. High-bay, linear, and panel luminaires — UL, DLC, CE, and SAA certified, LM-80 tested LED sources.
- **Trust Band**: 15年 / 20K m² / 14天打样 / 500K units/yr / 80% export
- **评分**: 4.8 (Q4.9/D4.7/R4.8/OEM4.7)
- **产品分类**: High-Bay / Linear / Outdoor
- **产品 8张**:
  1. (high-bay) UFO High-Bay Light — 100W–300W · UL/DLC · IP65
  2. (high-bay) Linear High-Bay — 150W–200W · UL · 5000K/4000K
  3. (high-bay) Low-Bay Light — 40W–80W · CE · retail/warehouse
  4. (linear) LED Troffer — 2×4ft · DLC · recessed/surface
  5. (linear) LED Batten — 4ft/8ft · IP65 · IK08 · industrial
  6. (linear) LED Panel Light — 600×600mm · CE · UGR<19
  7. (outdoor) LED Flood Light — 50W–400W · IP66 · IK10 · CE
  8. (outdoor) LED Street Light — 60W–240W · IP66 · CE · ENEC
- **认证**: UL 1598 / DLC Premium / CE / SAA / LM-80 / ISO 9001
- **About 要点**: 中山古镇（中国灯都），三防灯和工矿灯专家，LM-80光衰测试，北美DLC认证主力品类
- **MOQ**: 200 pcs · Sample 14 days · Production 28–40 days

---

### 5. Junhui Outdoor Lighting
- **ID**: CMH-F-JHL011
- **城市**: Guangzhou
- **品类**: Outdoor Lighting Manufacturer
- **Est.**: 2013 · 18,000 m² · 230 staff
- **Verified**: ❌
- **Tagline**: 12 years manufacturing outdoor LED lighting for municipal, commercial, and landscape applications. Street lights, flood lights, and garden luminaires — IP66, IK10, and CE/ENEC certified.
- **Trust Band**: 12年 / 18K m² / 16天打样 / 300K units/yr / 72% export
- **评分**: 4.6 (Q4.7/D4.5/R4.6/OEM4.6)
- **产品分类**: Street / Flood / Garden
- **产品 8张**:
  1. (street) LED Street Light — 30W–250W · IP66 · CE · ENEC
  2. (street) Solar Street Light — All-in-one · 40W–120W · IP65
  3. (street) High-Mast Light — 400W–1000W · IP66 · wind rated
  4. (flood) LED Flood Light — 20W–500W · IP66 · IK10
  5. (flood) Stadium Flood Light — 500W–2000W · IP66 · asymmetric
  6. (flood) RGB Flood Light — Full colour · DMX512 · IP65
  7. (garden) Bollard Light — 6W–15W · IP65 · SS304 or aluminium
  8. (garden) Spike Garden Light — 3W–10W · IP65 · warm white
- **认证**: CE / ENEC / IP66 · IK10 / SAA / RoHS / ISO 9001
- **About 要点**: 广州番禺，市政路灯和景观灯专家，太阳能路灯增长快，出口中东和东南亚为主
- **MOQ**: 100 pcs · Sample 16 days · Production 30–45 days

---

### 6. Yimei Decorative Lighting
- **ID**: CMH-F-YML012
- **城市**: Zhongshan
- **品类**: Decorative Lighting Manufacturer
- **Est.**: 2014 · 14,000 m² · 200 staff
- **Verified**: ✅
- **Tagline**: 11 years crafting decorative lighting for residential, hospitality, and retail buyers. Pendants, chandeliers, and wall sconces — UL, CE, and SAA listed, custom glass and metalwork in-house.
- **Trust Band**: 11年 / 14K m² / 21天打样 / 120K units/yr / 76% export
- **评分**: 4.7 (Q4.8/D4.6/R4.7/OEM4.7)
- **产品分类**: Pendants / Chandeliers / Wall
- **产品 8张**:
  1. (pendants) Glass Globe Pendant — Hand-blown glass · E27 · UL/CE
  2. (pendants) Rattan Woven Pendant — Natural rattan · E27 · CE
  3. (pendants) Metal Industrial Pendant — Powder coat · E26/E27 · UL
  4. (chandeliers) Crystal Chandelier — K9 crystal · G9 · CE · custom size
  5. (chandeliers) Modern Ring Chandelier — Brushed gold · LED · CE/UL
  6. (chandeliers) Branch Chandelier — Antique brass · E14 · CE
  7. (wall) Bedside Wall Sconce — Fabric shade · E27 · CE · hotel spec
  8. (wall) Exterior Wall Light — IP44 · E27 · aluminium · CE
- **认证**: UL 1598 / CE / SAA / IP44 · IP65 / ETL / ISO 9001
- **About 要点**: 中山古镇，定制玻璃和金属工艺，酒店工程灯专项，北美UL认证
- **MOQ**: 50 pcs · Sample 21 days · Production 30–45 days

---

### 7. Longda Packaging
- **ID**: CMH-F-LDP013
- **城市**: Dongguan
- **品类**: Custom Packaging Manufacturer
- **Est.**: 2009 · 18,000 m² · 180 staff
- **Verified**: ❌
- **Tagline**: 16 years manufacturing custom packaging for consumer goods, cosmetics, and electronics brands. Corrugated boxes, rigid gift boxes, and paper bags — FSC certified board, full offset printing, and embossing.
- **Trust Band**: 16年 / 18K m² / 7天打样 / 50M pcs/yr / 68% export
- **评分**: 4.6 (Q4.6/D4.7/R4.5/OEM4.6)
- **产品分类**: Corrugated / Rigid / Bags
- **产品 8张**:
  1. (corrugated) Regular Slotted Carton — E/B/C flute · custom print
  2. (corrugated) Die-Cut Display Box — SRP · FSDU · custom
  3. (corrugated) Heavy-Duty Shipping Box — Double-wall · 40kg rated
  4. (rigid) Magnetic Closure Gift Box — 2mm greyboard · spot UV
  5. (rigid) Drawer Slide Box — Ribbon pull · custom foam insert
  6. (rigid) Hinged Lid Box — Linen or paper wrap · custom size
  7. (bags) Paper Shopping Bag — FSC kraft · twisted handle · custom print
  8. (bags) Luxury Rope Handle Bag — Art paper · hot stamp · ribbon
- **认证**: FSC / ISO 9001 / SGS / BSCI / Sedex / RoHS
- **About 要点**: 东莞，FSC认证板材，服务美妆和消费电子，7天打样，全套后加工（烫金/UV/压纹）
- **MOQ**: 1,000 pcs · Sample 7 days · Production 15–25 days

---

### 8. Kaiwei Sanitary
- **ID**: CMH-F-KWS014
- **城市**: Foshan
- **品类**: Sanitary Ware Manufacturer
- **Est.**: 2008 · 20,000 m² · 240 staff
- **Verified**: ✅
- **Tagline**: 17 years manufacturing bathroom sanitary ware for residential and hotel buyers. Toilets, basins, and shower enclosures — CUPC, CE, and WELS certified, vitreous china and tempered glass production in-house.
- **Trust Band**: 17年 / 20K m² / 20天打样 / 200K units/yr / 75% export
- **评分**: 4.7 (Q4.8/D4.6/R4.7/OEM4.7)
- **产品分类**: Toilets / Basins / Showers
- **产品 8张**:
  1. (toilets) Wall-Hung Toilet — Rimless · CUPC/CE · dual flush
  2. (toilets) Back-to-Wall Toilet — Soft-close seat · WELS 4-star
  3. (toilets) Smart Toilet — Auto flush · heated seat · CE
  4. (basins) Counter-Top Basin — Vitreous china · 450–600mm · CE
  5. (basins) Under-Counter Basin — Vitreous china · CUPC · oval/rect
  6. (basins) Wall-Hung Basin — Vitreous china · CE · WELS
  7. (showers) Frameless Shower Enclosure — 8mm toughened glass · CE
  8. (showers) Shower Tray — Acrylic or stone resin · custom size · CE
- **认证**: CUPC / CE / WELS / ISO 9001 / BSCI / SGS
- **About 要点**: 佛山（中国陶瓷卫浴之都），自有窑炉，酒店工程批量，北美CUPC+澳洲WELS双认证
- **MOQ**: 100 pcs · Sample 20 days · Production 30–45 days

---

### 9. Xinte Electronics
- **ID**: CMH-F-XTE015
- **城市**: Shenzhen
- **品类**: PCB Assembly (PCBA) Manufacturer
- **Est.**: 2015 · 12,000 m² · 160 staff
- **Verified**: ✅
- **Tagline**: 10 years providing PCB assembly services for consumer electronics, industrial controls, and IoT device manufacturers. SMT, DIP, and box-build — IPC Class 2/3, IATF 16949, and ISO 13485 certified.
- **Trust Band**: 10年 / 12K m² / 5天打样 / 5M pcs/yr / 82% export
- **评分**: 4.8 (Q4.9/D4.7/R4.8/OEM4.9)
- **产品分类**: SMT / DIP / Box-Build
- **产品 8张**:
  1. (smt) SMT PCB Assembly — 0201 capable · AOI · X-ray · IPC Class 2/3
  2. (smt) Rigid-Flex PCB Assembly — HDI · BGA · fine-pitch · IPC Class 3
  3. (smt) LED PCB Assembly — Aluminium PCB · thermal mgmt · AXI
  4. (dip) Through-Hole Assembly — Manual + selective soldering · IPC Class 2
  5. (dip) Mixed Technology Assembly — SMT + DIP · conformal coat option
  6. (dip) Cable & Harness Assembly — UL listed wire · IPC/WHMA-A-620
  7. (box-build) Box-Build Assembly — Mechanical + PCB + cable · full test
  8. (box-build) Turnkey Electronics — BOM sourcing + PCBA + test + pack
- **认证**: IPC-A-610 Class 2/3 / IATF 16949 / ISO 13485 / ISO 9001 / RoHS / UL
- **About 要点**: 深圳，SMT+DIP混装，ISO 13485医疗级认证，AOI+X-ray+ICT全检，5天快速打样
- **MOQ**: 100 pcs · Sample 5 days · Production 20–35 days

---

## 设计规范（严格遵守）

### CSS 变量（直接用，不要重新定义）
```
--cinnabar: #B83A26  ← 红色，用于 Verified badge、accent、em 文字
--ink: #0F0E0C       ← 几乎黑
--paper: #F4EFE6     ← 米白背景
```

### SVG 占位图规范
- **Gallery 主图**（600×600）：深色背景，细线条（stroke-width 0.4-0.6，opacity 0.2-0.3），代表工厂车间/产品形态的抽象线图，顶部用 `font-family="Instrument Serif, serif"` 写品类关键词（颜色 #B83A26），底部用 JetBrains Mono 写城市名
- **Gallery 副图**（400×300）：背景颜色交替用 #B83A26 / #EBE4D6 / #0F0E0C，线条图案
- **产品卡图**（400×400）：背景交替深浅，线条代表产品轮廓，底部用 `Instrument Serif italic` 写产品名（#B83A26 或 #F4EFE6）

### 字体
- 大标题 `font-family="Fraunces, serif"` ← display
- 斜体强调 `font-family="Instrument Serif, serif" font-style="italic"`
- 数据/标签 `font-family="JetBrains Mono, monospace"`

### 重要细节
- `<h4>` 必须用 `</h4>` 关闭，不能写成 `</div>`
- 产品卡 `onclick="openLightbox(...)"` 必须有8个参数，顺序：img, title, cat, desc, material, size, feature, moq
- Lightbox 表中的 Sample Lead 和 Production Lead 要和工厂数据一致
- Verified modal 中 Factory ID 要和 data-factory-id 一致
- WhatsApp 号用虚构的，格式：`8613800XXX000`（X 对应工厂编号）

---

## 执行方式

**一次只生成一个工厂**，等确认后再生成下一个。每个文件保存到对应路径：
```
web/factories/{文件夹名}/index.html
```

从第1个 **Xinglong Fasteners** 开始。
