# Journal 文章 Meta 优化 Prompt

## 任务
优化 `web/journal/` 下12篇文章的 `<title>` 和 `<meta name="description">`，同时添加 OG 标签和 Schema.org 结构化数据。

---

## 执行方式
逐个文件处理，每个文件：
1. 读取现有 title 和 description
2. 按规则优化 title 和 description
3. 在 `</head>` 前插入 OG 标签和 Schema
4. 不修改文件其他任何内容

---

## Title 优化规则

**当前格式：** `文章标题 | ChinaMakersHub Journal`
**目标格式：** `文章标题 | ChinaMakersHub`（去掉 "Journal" 二字，更简洁）

只需把 `| ChinaMakersHub Journal` 改成 `| ChinaMakersHub`，标题本身不改。

---

## Description 优化规则

每篇 description 需满足：
- 长度 **120–155 字符**（含空格）
- 包含文章核心关键词
- 结尾加 `— ChinaMakersHub` 品牌标识

现有 description 如果已经满足长度和关键词要求，只在结尾加 `— ChinaMakersHub` 即可，不用大改。

---

## 每篇文章插入的 OG 标签（在 </head> 前插入）

```html
<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="ChinaMakersHub">
<meta property="og:title" content="{优化后的 title 内容}">
<meta property="og:description" content="{优化后的 description 内容}">
<meta property="og:url" content="https://chinamakershub.com/journal/{文章slug}.html">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{优化后的 title 内容}">
<meta name="twitter:description" content="{优化后的 description 内容}">

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{文章 h1 标题}",
  "description": "{优化后的 description}",
  "url": "https://chinamakershub.com/journal/{文章slug}.html",
  "publisher": {
    "@type": "Organization",
    "name": "ChinaMakersHub",
    "url": "https://chinamakershub.com/"
  },
  "author": {
    "@type": "Organization",
    "name": "ChinaMakersHub"
  }
}
</script>
```

---

## 12篇文章数据

| 文件名 | slug（用于 og:url） | 核心关键词（description 必须包含） |
|---|---|---|
| china-factory-audit-checklist.html | china-factory-audit-checklist | factory audit, China manufacturer verification |
| china-sourcing-agent-vs-direct-factory.html | china-sourcing-agent-vs-direct-factory | sourcing agent, direct factory, China sourcing |
| foshan-furniture-manufacturing-hub-guide.html | foshan-furniture-manufacturing-hub-guide | Foshan furniture, furniture manufacturer, Greater Bay Area |
| how-to-find-verified-manufacturers-greater-bay-area.html | how-to-find-verified-manufacturers-greater-bay-area | verified manufacturers, Greater Bay Area, China factory |
| incoterms-explained-fob-cif-exw-china.html | incoterms-explained-fob-cif-exw-china | Incoterms, FOB, CIF, EXW, China shipping |
| iso-certifications-china-manufacturers-explained.html | iso-certifications-china-manufacturers-explained | ISO certification, China manufacturer, quality standards |
| minimum-order-quantity-negotiation-china.html | minimum-order-quantity-negotiation-china | MOQ, minimum order quantity, China factory negotiation |
| oem-vs-odm-manufacturing-china-explained.html | oem-vs-odm-manufacturing-china-explained | OEM, ODM, China manufacturing |
| payment-terms-china-factory-tt-lc-guide.html | payment-terms-china-factory-tt-lc-guide | payment terms, T/T, LC, China factory |
| product-inspection-china-before-shipment.html | product-inspection-china-before-shipment | product inspection, China quality control, pre-shipment |
| sample-order-china-factory-process.html | sample-order-china-factory-process | sample order, China factory, prototype |
| shenzhen-electronics-manufacturing-sourcing-guide.html | shenzhen-electronics-manufacturing-sourcing-guide | Shenzhen electronics, electronics manufacturer, sourcing |

---

## 注意事项

1. **先读取每个文件**，获取实际的 title、description 和 h1 内容
2. **og:url 格式** 带 `.html` 后缀，如 `https://chinamakershub.com/journal/china-factory-audit-checklist.html`
3. **Schema headline** 用文章的 `<h1>` 内容，不是 `<title>`
4. **逐个文件处理**，一次处理3篇，确认后再继续
5. **不要修改**文章正文内容，只改 head 区域
