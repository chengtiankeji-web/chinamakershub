# P0 SEO 优化 — Kimi 执行 Prompt

## 任务概览
给所有工厂页和主要页面添加：
1. OG 标签（Open Graph，用于社交分享和 SEO）
2. Schema.org 结构化数据（帮助 Google 理解页面内容）
3. 检查并补全缺失的 meta description

---

## 执行方式
逐个文件处理，每个文件在 `</head>` 标签前插入 OG 标签和 Schema，不要修改文件其他任何内容。

---

## 需要处理的文件列表（按优先级）

### 第一批：真实工厂（最重要）
1. `web/factories/yixinheng-acrylic/index.html`
2. `web/factories/huihexin-technology/index.html`
3. `web/factories/gostoo-furniture/index.html`

### 第二批：Verified 虚拟工厂
4. `web/factories/gaosi-furniture/index.html`
5. `web/factories/mingde-office-furniture/index.html`
6. `web/factories/tianlong-outdoor/index.html`
7. `web/factories/ruijin-metal-furniture/index.html`
8. `web/factories/chengtai-upholstery/index.html`
9. `web/factories/dahua-door-hardware/index.html`
10. `web/factories/xinglong-fasteners/index.html`
11. `web/factories/boshi-lock/index.html`
12. `web/factories/weichuang-sheet-metal/index.html`
13. `web/factories/haoguang-led/index.html`
14. `web/factories/junhui-outdoor-lighting/index.html`
15. `web/factories/yimei-decorative-lighting/index.html`
16. `web/factories/longda-packaging/index.html`
17. `web/factories/kaiwei-sanitary/index.html`
18. `web/factories/xinte-electronics/index.html`

### 第三批：核心页面
19. `web/index.html`
20. `web/factories/index.html`
21. `web/categories/index.html`

---

## 每个文件的插入内容模板

在每个文件的 `</head>` 前插入以下两块内容，根据每个工厂替换变量。

### OG 标签块
```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="ChinaMakersHub">
<meta property="og:title" content="{页面的 <title> 标签内容}">
<meta property="og:description" content="{页面的 meta description 内容}">
<meta property="og:url" content="https://chinamakershub.com/factories/{工厂slug}/">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{页面的 <title> 标签内容}">
<meta name="twitter:description" content="{页面的 meta description 内容}">
```

### Schema.org 块（工厂页用 LocalBusiness）
```html
<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{工厂英文名}",
  "description": "{meta description 内容}",
  "url": "https://chinamakershub.com/factories/{工厂slug}/",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "{城市}",
    "addressRegion": "Guangdong",
    "addressCountry": "CN"
  },
  "areaServed": "Worldwide",
  "knowsAbout": "{品类关键词，如 door hardware, hinges, handles}"
}
</script>
```

---

## 各工厂具体数据

每个文件处理时，先读取文件获取现有的 `<title>` 和 `<meta name="description">` 内容，然后用于填充 OG 标签。Schema 数据参考下表：

| 文件 | 工厂名 | 城市 | slug | 品类关键词 |
|---|---|---|---|---|
| yixinheng-acrylic | Yixinheng Acrylic | Shenzhen | yixinheng-acrylic | acrylic display, cosmetic packaging, OEM display stands |
| huihexin-technology | Huihexin Technology | Shenzhen | huihexin-technology | IC distribution, semiconductors, MCU, power IC |
| gostoo-furniture | Gostoo Furniture | Foshan | gostoo-furniture | custom sofa, upholstered furniture, OEM furniture |
| gaosi-furniture | Gaosi Furniture | Foshan | gaosi-furniture | solid wood furniture, OEM furniture, FSC certified |
| mingde-office-furniture | Mingde Office Furniture | Foshan | mingde-office-furniture | office furniture, sit-stand desks, BIFMA certified |
| tianlong-outdoor | Tianlong Outdoor | Zhongshan | tianlong-outdoor | outdoor furniture, teak furniture, aluminium furniture |
| ruijin-metal-furniture | Ruijin Metal Furniture | Guangzhou | ruijin-metal-furniture | metal furniture, retail fixtures, powder coat |
| chengtai-upholstery | Chengtai Upholstery | Foshan | chengtai-upholstery | upholstered furniture, sofas, FR fabric, hospitality seating |
| dahua-door-hardware | Dahua Door Hardware | Foshan | dahua-door-hardware | door hardware, hinges, handles, door closers, ANSI certified |
| xinglong-fasteners | Xinglong Fasteners | Dongguan | xinglong-fasteners | industrial fasteners, bolts, nuts, IATF 16949 |
| boshi-lock | Boshi Lock | Zhongshan | boshi-lock | security locks, deadbolts, smart locks |
| weichuang-sheet-metal | Weichuang Sheet Metal | Shenzhen | weichuang-sheet-metal | sheet metal fabrication, laser cutting, CNC punching |
| haoguang-led | Haoguang LED | Zhongshan | haoguang-led | commercial LED lighting, high-bay lights, UL DLC certified |
| junhui-outdoor-lighting | Junhui Outdoor Lighting | Guangzhou | junhui-outdoor-lighting | outdoor lighting, street lights, flood lights |
| yimei-decorative-lighting | Yimei Decorative Lighting | Zhongshan | yimei-decorative-lighting | decorative lighting, pendants, chandeliers, UL CE certified |
| longda-packaging | Longda Packaging | Dongguan | longda-packaging | custom packaging, corrugated boxes, rigid boxes, FSC |
| kaiwei-sanitary | Kaiwei Sanitary | Foshan | kaiwei-sanitary | sanitary ware, toilets, basins, CUPC CE certified |
| xinte-electronics | Xinte Electronics | Shenzhen | xinte-electronics | PCB assembly, PCBA, SMT, DIP, IPC certified |

---

## 主页和列表页的 Schema（不同类型）

### `web/index.html` 用 Organization 类型
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ChinaMakersHub",
  "description": "A curated B2B sourcing platform connecting global buyers with verified manufacturers across China's Greater Bay Area.",
  "url": "https://chinamakershub.com/",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hong Kong",
    "addressCountry": "HK"
  },
  "areaServed": "Worldwide",
  "knowsAbout": "Manufacturing, B2B sourcing, China factories, Greater Bay Area"
}
</script>
```

### `web/factories/index.html` 用 CollectionPage 类型
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Verified Factories — ChinaMakersHub",
  "description": "Browse 16 verified manufacturers from China's Greater Bay Area. Every factory audited on the ground by our Foshan team.",
  "url": "https://chinamakershub.com/factories/",
  "publisher": {
    "@type": "Organization",
    "name": "ChinaMakersHub",
    "url": "https://chinamakershub.com/"
  }
}
</script>
```

### `web/categories/index.html` 用 CollectionPage 类型
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Browse by Category — ChinaMakersHub",
  "description": "Browse verified manufacturers by product category. Furniture, hardware, lighting, electronics, and more from China's Greater Bay Area.",
  "url": "https://chinamakershub.com/categories/",
  "publisher": {
    "@type": "Organization",
    "name": "ChinaMakersHub",
    "url": "https://chinamakershub.com/"
  }
}
</script>
```

---

## 注意事项

1. **先读取每个文件**，获取现有 `<title>` 和 `<meta name="description">` 的实际内容，用于填充 OG 标签，不要自己编造
2. **插入位置**：在 `</head>` 标签的前一行插入，不要插入到 `<body>` 里
3. **不要修改**文件其他任何内容，只添加这两块
4. **逐个文件处理**，处理完一个确认再处理下一个
5. 如果某个文件缺少 `<meta name="description">`，先告知，不要自动添加
