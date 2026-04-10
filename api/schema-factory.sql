-- ChinaMakersHub - 工厂申请表 schema
-- 在已有的 cmh-inquiries 数据库基础上追加
-- 部署: wrangler d1 execute cmh-inquiries --remote --file=./schema-factory.sql

CREATE TABLE IF NOT EXISTS factory_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_id TEXT UNIQUE NOT NULL,

  -- Step 1: 基础信息
  company_cn TEXT NOT NULL,
  company_en TEXT,
  business_id TEXT NOT NULL,           -- 统一社会信用代码
  founded_year INTEGER,
  city TEXT,
  district TEXT,
  address TEXT,
  facility_size INTEGER,                -- 厂房面积 m²
  headcount TEXT,                       -- 员工区间

  -- Step 2: 工厂能力
  categories TEXT,                      -- JSON array
  capabilities TEXT,                    -- 长文本描述
  moq TEXT,
  sample_lead INTEGER,                  -- 天
  production_lead INTEGER,              -- 天
  annual_capacity TEXT,
  export_markets TEXT,

  -- Step 3: 产品与认证
  certs TEXT,                           -- JSON array
  product_images TEXT,                  -- JSON array of file URLs (后续 R2 上传)
  factory_images TEXT,                  -- JSON array
  website TEXT,
  references_text TEXT,                 -- 已有客户案例

  -- Step 4: 联系人
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  phone TEXT NOT NULL,
  wechat TEXT,
  email TEXT NOT NULL,
  english_level TEXT,
  services TEXT,                        -- JSON array - 期望服务
  notes TEXT,

  -- 审核流程
  status TEXT DEFAULT 'submitted',     -- submitted / reviewing / site_visit / approved / rejected
  reviewer TEXT,
  review_notes TEXT,
  site_visit_date TEXT,
  approved_at TEXT,
  rejected_reason TEXT,

  -- 激活后的数据
  factory_slug TEXT UNIQUE,             -- URL slug,如 gaosi-furniture
  factory_id TEXT UNIQUE,               -- 内部 ID,如 F-001
  published_at TEXT,
  is_featured INTEGER DEFAULT 0,

  -- 元数据
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_factory_ref ON factory_applications(reference_id);
CREATE INDEX IF NOT EXISTS idx_factory_status ON factory_applications(status);
CREATE INDEX IF NOT EXISTS idx_factory_city ON factory_applications(city);
CREATE INDEX IF NOT EXISTS idx_factory_business_id ON factory_applications(business_id);
CREATE INDEX IF NOT EXISTS idx_factory_slug ON factory_applications(factory_slug);
CREATE INDEX IF NOT EXISTS idx_factory_created ON factory_applications(created_at DESC);
