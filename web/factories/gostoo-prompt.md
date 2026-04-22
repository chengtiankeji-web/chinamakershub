# 高思图家具（Gostoo）工厂页生成 Prompt

## 任务
为高思图家具生成一个 ChinaMakersHub 工厂详情页，文件保存到：
```
web/factories/gostoo-furniture/index.html
```

---

## 文件依赖
页面引用两个共享文件（已存在，不需要生成）：
```html
<link rel="stylesheet" href="../factory.css">
<script src="../factory.js"></script>
```

`factory.css` 包含所有样式，`factory.js` 包含 lightbox、verified modal、产品分页等所有交互逻辑。
不需要在页面内写任何 `<style>` 或 `<script>` 内容，只写 HTML 结构。

---

## 工厂基础数据

| 字段 | 值 |
|---|---|
| 工厂中文名 | 高思图家具 |
| 品牌英文名 | Gostoo |
| CMH ID | CMH-F-GST017 |
| 城市 | Foshan, Guangdong |
| 注册号 | 91440605MA53U20G9U |
| 成立年份 | 2019 |
| 展示面积 | 8,000 m²（虚构，合理范围） |
| 展示人数 | 120 staff（虚构，合理范围） |
| 联系人 | 张富成 / Zhang Fucheng |
| 手机 | +86 136 1085 3741 |
| 邮箱 | gostoo@chinamakershub.com |
| WhatsApp | https://wa.me/8613610853741 |
| Verified | ✅ 有（显示 CMH Verified 按钮和 Modal） |
| data-added | 2026-04-21（用于工厂列表页 NEW 标签） |

---

## 品牌定位（写 tagline 和 about 时用）

**真实卖点（来自表单）：**
1. 技术成熟，拥有完整的生产线
2. 品类丰富，各种大牌家具复刻（designer replica）
3. 支持私人家具定制（OEM，客户提供设计）
4. 价格有优势

**目标市场：** 澳大利亚、新加坡、马来西亚、印尼、菲律宾、港澳台

**风格偏好：** Minimalist + Premium/Luxury（简约现代 + 高端奢华）

**英文 Tagline（写入页面）：**
> "7 years crafting premium-spec sofas and beds for Southeast Asian and Antipodean buyers. Designer-inspired silhouettes, full custom OEM, and competitive FOB pricing — from Foshan's furniture heartland."

---

## 页面完整 HTML 结构

### HEAD
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gostoo Furniture — Custom Sofa & Bed Manufacturer in Foshan | ChinaMakersHub</title>
<meta name="description" content="Gostoo Furniture: custom sofa and bed manufacturer in Foshan. Designer-inspired upholstered furniture, full OEM service, and competitive FOB pricing for Southeast Asia and Australia. Verified by ChinaMakersHub.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Inter+Tight:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../factory.css">
</head>
```

### NAV（固定，直接复制）
```html
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
```

---

## ① FACTORY HEADER

```html
<section><div class="container"><div class="f-header"><div class="f-header-grid">
  <div>
    <div class="f-eyebrow">/ Custom Upholstered Furniture Manufacturer <span class="f-id">CMH-F-GST017</span></div>
    <h1 class="f-title">Gostoo<br>Furniture</h1>
    <p class="f-tagline">7 years crafting premium-spec sofas and beds for Southeast Asian and Antipodean buyers. Designer-inspired silhouettes, full OEM custom service, and competitive FOB pricing — built in Foshan's furniture heartland.</p>
    <div class="f-quick">
      <span class="f-quick-item">Foshan, Guangdong</span>
      <span class="f-quick-item">Est. 2019</span>
      <span class="f-quick-item">8,000 m² facility</span>
      <span class="f-quick-item">120 staff</span>
    </div>
    <button class="verified-badge-chip" onclick="openVerifiedModal()">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
      CMH Verified
    </button>
  </div>
  <aside class="trust-card"><div class="trust-card-cta" style="border-top:none;">
    <div class="video-placeholder" onclick="alert('Factory video coming soon. Contact the Gostoo team for a live walkthrough via WhatsApp.')">
      <div class="video-play-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" opacity="0.4"/><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
      <div class="video-placeholder-label">Factory Video Tour</div>
      <div class="video-placeholder-sub">Coming Soon</div>
    </div>
    <a href="#inquiry" class="btn-block">Request a Quote <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5h10m0 0L7 1m4 4L7 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/></svg></a>
    <a href="https://wa.me/8613610853741" class="btn-block outline">Chat on WhatsApp</a>
  </div></aside>
</div></div></div></section>
```

---

## ② GALLERY（4格 SVG 占位图）

**规格：**
- 第1格：`viewBox="0 0 600 600"`，背景 `#1A0F0A`（暖棕深色），线条表现沙发/家具车间形态，顶部 Instrument Serif italic 写 "living room" 颜色 #B83A26，底部 JetBrains Mono 写 "FOSHAN · GUANGDONG · CHINA"
- 第2格：`viewBox="0 0 400 300"`，背景 `#B83A26`，线条表现沙发剖面/框架
- 第3格：`viewBox="0 0 400 300"`，背景 `#EBE4D6`，线条表现床架结构
- 第4格：`viewBox="0 0 400 300"`，背景 `#0F0E0C`，线条表现面料/upholstery 纹理

Gallery 标签（.gallery-label）依次：
1. "Production Floor · 8,000 m²"
2. "Sofa frame workshop"
3. "Bed frame & upholstery"
4. "Fabric selection · 200+ refs"

---

## ③ TRUST BAND（5项）

| num | label | desc |
|---|---|---|
| 7 | Years Experience | Est. 2019, Foshan — premium sofas and beds for export |
| 8K | m² Facility | Frame, foam, upholstery, and finishing lines integrated |
| 25 | Day Sampling | From approved drawing or reference image to finished sample |
| 30K | Units / Year | Annual capacity across sofas, beds, and occasional chairs |
| 80% | Export Ratio | AU · SG · MY · ID · PH · HK — residential and hospitality |

每项需要一个 SVG icon（从以下选择，用 `stroke="currentColor" stroke-width="1.5" fill="none"`）：
1. 年限 → 层叠菱形（path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"）
2. 面积 → 方格（rect x="3" y="3" width="18" height="18" rx="1" + path d="M3 9h18M9 21V9"）
3. 打样 → 时钟（circle cx="12" cy="12" r="10" + path d="M12 6v6l4 2"）
4. 产能 → 仓库（path d="M20 7H4a2 2 0 00-2 2v6...M16 21V5..."）
5. 出口 → 房子（path d="M3 12l2-2m0 0l7-7 7 7M5 10v10..."）

---

## ④ RATINGS BAR

- 综合分：**4.7**
- Quality: 4.8（96%）
- Delivery: 4.6（92%）
- Response: 4.8（96%）
- OEM Skill: 4.7（94%）

右侧 4个 cert-badge：
- OEM / OEM Ready
- 25d / Sample Lead
- Docs / Export Docs
- T/T / Secure Payment

---

## ⑤ PRODUCTS（8张产品卡）

**Section 标题：** `Designer-inspired sofas and beds built for <em>premium living.</em>`

**分类 filter 3个：** Sofas / Beds / Occasional

**产品数据（8张）：**

| # | data-cat | 产品名 | SVG背景 | 材料 | 尺寸 | 特点 | MOQ | Lightbox desc |
|---|---|---|---|---|---|---|---|---|
| 1 | sofas | Italian Bouclé Sofa | #EBE4D6 深色线 | Solid oak frame + bouclé | 3-seat · 240cm | Down-wrapped cushions | 10 units | Designer-inspired 3-seat sofa with solid oak legs, bouclé upholstery, and down-wrapped seat cushions. COM fabric accepted. |
| 2 | sofas | Modular Cloud Sofa | #0F0E0C 浅色线 | Hardwood frame + velvet | Modular · 2–6 pcs | COM fabric · linkable | 10 units | Fully modular deep-seated sofa with feather-fibre back cushions. 2 to 6 modules. OEM fabric and custom dimensions accepted. |
| 3 | sofas | Curved Boucle Sofa | #B83A26 浅色线 | Beech frame + boucle | 2-seat · 180cm | Curved silhouette | 20 units | Curved two-seat sofa with organic silhouette, solid beech legs, and textured bouclé upholstery. Popular in AU and SG market. |
| 4 | sofas | Chesterfield Sofa | #EBE4D6 深色线 | Solid wood + PU leather | 3-seat · 220cm | Button tufted · PU/leather | 10 units | Classic Chesterfield sofa with button-tufted back and arms. PU leather or genuine leather options. Custom stain on legs. |
| 5 | beds | Upholstered Platform Bed | #101010 浅色线 | Hardwood + fabric | Queen / King | Headboard height custom | 10 units | Fabric-upholstered platform bed with solid hardwood slat base. Headboard height and fabric customisable per order. COM welcome. |
| 6 | beds | Curved Headboard Bed | #EBE4D6 深色线 | Solid pine + linen | Queen / King | Arched headboard | 10 units | Arched headboard bed with linen or boucle upholstery. Solid pine slat base. Matching bedside table available as set. |
| 7 | beds | Rattan Bed Frame | #0F0E0C 浅色线 | Solid wood + rattan | Queen · 160cm | Natural rattan weave | 20 units | Solid wood bed frame with hand-woven rattan headboard. Boho-luxury aesthetic. Popular for Airbnb and boutique hotel projects. |
| 8 | occasional | Accent Lounge Chair | #B83A26 浅色线 | Solid oak + boucle | W76 × D82 × H86cm | Swivel or fixed base | 20 units | Upholstered accent chair with solid oak or metal base option. Swivel mechanism available. COM or standard fabric. |

每张产品卡的 onclick 格式：
```
onclick="openLightbox('images/p-{slug}.jpg','{名称}','{分类}','{描述}','{材料}','{尺寸}','{特点}','{MOQ} units')"
```

产品卡 SVG 样式：
- 背景色按上表
- 线条用 `stroke="#F4EFE6"` (深色背景) 或 `stroke="#0F0E0C"` (浅色背景)，`stroke-width="0.5"` `opacity="0.45"`
- 用简单几何线条表现产品形态（沙发：横矩形+弧形靠背；床：长矩形+竖矩形headboard）
- 底部写产品名，`font-family="Instrument Serif, serif" font-style="italic" font-size="17" text-anchor="middle"` 颜色 #B83A26 或 #F4EFE6

Lightbox 表中：
- Sample Lead: 25 days
- Production Lead: 45–60 days
- Incoterms: FOB · CIF · DDP

---

## ⑥ VERIFIED MODAL

```
审核日期：April 2026
6条验证项：
1. Business License verified — 营业执照 · 91440605MA53U20G9U · Foshan, Guangdong
2. On-site factory audit completed — CMH Foshan team · 8,000 m² · Foshan
3. Full production line confirmed — Frame fabrication, foam cutting, upholstery, and finishing
4. OEM capability verified — Custom design service from reference image or drawing
5. Sample production confirmed — 25-day lead from approved reference or drawing
6. Export documentation capability confirmed — CO, packing list, commercial invoice
```

---

## ⑦ CAPABILITIES（8格，注意 h4 必须用 </h4> 关闭）

| 编号 | 标题 | 内容 |
|---|---|---|
| 001 | Frame Production | Solid hardwood (oak, beech, pine, rubberwood) and engineered wood frames. Kiln-dried timber used throughout. Mortise-and-tenon joinery on premium lines. |
| 002 | Foam & Comfort | High-resilience foam in 28D, 32D, and 36D densities. Down-wrapped and feather-fibre cushion inserts available. Pocket spring seat options for beds and sofas. |
| 003 | Fabric & Upholstery | 200+ fabric references including bouclé, velvet, linen, and performance weave. COM fabric accepted across all product lines. No surcharge on orders over 20 units. |
| 004 | Designer OEM | Full OEM service — send a reference image, Pinterest link, or technical drawing and Gostoo produces a sample for approval. No design fee on orders over 50 units. |
| 005 | Leather & PU | Genuine leather and high-grade PU leather options. Chesterfield tufting, channel stitching, and piping in-house. Custom colour matching available. |
| 006 | Beds & Case Goods | Platform beds, storage beds, and bedside tables produced to matching finish. Complete bedroom set capability. Slat base, box spring, and storage drawer options. |
| 007 | Sampling | 25-day sample lead from approved reference or drawing. Reference image accepted as starting point — no technical drawing required. DHL tracked shipping. |
| 008 | Packaging | 5-layer corrugated carton with foam corner protection. Blanket wrap for high-gloss finishes. Assembly instructions in English. Custom labelling at 50+ unit orders. |

---

## ⑧ CERTIFICATIONS（6格）

| cert-mark | cert-name | cert-desc |
|---|---|---|
| 营业 | Business Lic. | 91440605MA53U20G9U |
| BSCI | BSCI | Social audit · in progress |
| SGS | SGS | On-request inspection |
| Oeko | Oeko-Tex 100 | Standard fabric range |
| ISO | ISO 9001 | In application |
| CO | Cert of Origin | FORM E · ASEAN |

**Section 标题：** `Compliance documentation your <em>buyers and agents will need.</em>`

---

## ⑨ ABOUT（4段）

**Section 标题：** `Born in Foshan's furniture cluster — built for the <em>premium export market.</em>`

**段落内容：**

段落1（首字母会自动放大）：
> Gostoo Furniture (高思图家具) was founded in 2019 in Foshan — the city responsible for more than a third of China's furniture production. The company was established by a team with deep roots in the Lecong and Longjiang furniture manufacturing clusters, and from the outset focused on a specific niche: premium-spec upholstered sofas and beds designed to match or closely reference the aesthetic of international designer brands, at a price point accessible to Southeast Asian residential buyers, interior designers, and hospitality operators.

段落2：
> The 8,000 m² facility integrates hardwood frame production, foam processing, upholstery, and finishing under one roof. Kiln-dried solid timber is used throughout the frame lines, and the upholstery team works with over 200 fabric references including bouclé, velvet, performance linen, and textured weaves. COM fabric is accepted across all product lines, which makes Gostoo a practical partner for interior designers and brand buyers who work with their own specified materials.

段落3：
> Gostoo's primary markets are Australia, Singapore, Malaysia, Indonesia, the Philippines, and Hong Kong. The company operates as an OEM manufacturer — buyers send a reference image, a Pinterest board, or a technical drawing, and Gostoo produces a sample for approval before committing to production. This approach has made Gostoo particularly popular with boutique furniture retailers, Airbnb operators, and interior design studios who want designer-adjacent pieces without designer price tags.

段落4：
> Sample lead time is 25 days from approved reference. Production runs of 10–50 units take 45–60 days. The factory does not require technical drawings — a clear reference image is sufficient to begin the sampling process. Export documentation including CO (FORM E for ASEAN), commercial invoice, and packing list is handled in-house. FOB Guangzhou or Shenzhen.

**About side 数据：**
```
At a glance:
Founded: 2019
Location: Foshan, Guangdong
Facility: 8,000 m²
Headcount: 120 staff
Annual output: ~30,000 units
Export ratio: 80%
Main markets: AU · SG · MY · ID · PH · HK
FOB port: Guangzhou / Shenzhen

Trade terms:
MOQ: 10 units (sofas) / 20 units (beds)
Sample lead: 25 days
Production: 45–60 days
Payment: 30% T/T + 70%
Incoterms: FOB · CIF · DDP
```

---

## ⑩ TIMELINE（6节点）

| 年份 | 标题 | 内容 |
|---|---|---|
| 2019 | Company founded | Gostoo Furniture is established in Foshan by a team from the Lecong furniture cluster, initially producing upholstered sofas for domestic interior designers and property developers. |
| 2020 | Export market entry | First export order ships to a Singapore furniture retailer. The OEM-from-reference-image service model proves immediately popular with Southeast Asian buyers. |
| 2021 | Fabric library expansion | In-house fabric library grows to 200+ references including bouclé, teddy, and performance linen. COM fabric programme formalised with no surcharge. |
| 2022 | Bed range launch | Platform and storage bed ranges launch in response to buyer demand. Complete bedroom set capability established, including bedside tables and dressers. |
| 2024 | Australia & HK expansion | First shipments to Australian furniture retailers and Hong Kong interior design studios. Airbnb and boutique hotel operator segment identified as key growth channel. |
| 2026 | Joins ChinaMakersHub | Onboards as CMH verified workshop (CMH-F-GST017), expanding direct buyer access through the platform's curated Greater Bay Area network. |

---

## ⑪ REVIEWS（3条）

**Review 1:**
- 姓名：Rachel T.
- 背景：AU · Interior Design Studio · Modular Sofa OEM
- 星级：★★★★★
- 内容：I sent Gostoo a Pinterest board of the sofa I wanted and they came back with a sample within 25 days that was genuinely impressive. The bouclé fabric matched the reference closely and the frame quality was much better than I expected at this price point. We have now ordered for three client projects and the consistency has been good throughout.
- 日期：April 2026

**Review 2:**
- 姓名：Kevin L.
- 背景：SG · Furniture Retailer · Bed & Sofa Range
- 星级：★★★★★
- 内容：We source our premium sofa and bed range from Gostoo. The OEM service is straightforward — reference image in, sample out in 25 days. The velvet and bouclé pieces in particular sell well in our Singapore showroom at a price point that still works for us commercially. Lead times are reliable and Zhang Fucheng responds quickly on WeChat.
- 日期：March 2026

**Review 3:**
- 姓名：Maria S.
- 背景：PH · Hospitality Operator · Villa FF&E
- 星级：★★★★☆
- 内容：We furnished three villa suites with Gostoo pieces — platform beds, accent chairs, and the curved sofa. The aesthetic was exactly what we needed for our boutique property. The rattan bed frame was a particular guest favourite. One piece had a minor stitching issue which was resolved with a credit on the next order. Good supplier for hospitality use.
- 日期：February 2026

---

## ⑫ INQUIRY FORM

**表单标题：** "Send an inquiry"
**说明文字：** "Our team routes your message to Gostoo within 12 hours. A reference image or Pinterest link is all we need to start."

**字段：**
1. Your Name * / Company
2. Email * / Country *
3. Product Category（select）：Sofas · Beds · Accent Chairs · Full Bedroom Set · Custom OEM · Other
4. Reference（input，placeholder: "Pinterest link, image URL, or describe the piece"）/ Quantity
5. Message *（textarea，placeholder: "Describe your product, fabric preference, dimensions, or paste a reference link. No technical drawing required."）
6. btn-submit

---

## ⑬ CTA BAND

```html
<h2>Talk to <em>Gostoo</em> directly.</h2>
<p>Send a reference image and our team will route it within 12 hours. 25-day sampling. No technical drawing required.</p>
```

---

## FOOTER

```
工厂名：Gostoo · Contact
邮件：gostoo@chinamakershub.com
电话：+86 136 1085 3741（Zhang Fucheng）
地址：Foshan, Guangdong（Lecong furniture cluster）
```

---

## 关键注意事项（必须遵守）

1. **`<h4>` 必须用 `</h4>` 关闭**，capabilities 里不能写成 `</div>`
2. **不要在页面内写任何 CSS 或 JS**，全部依赖 `../factory.css` 和 `../factory.js`
3. **Lightbox 的 `onclick` 必须有8个参数**，顺序固定：img路径 / 标题 / 分类 / 描述 / 材料 / 尺寸 / 特点 / MOQ
4. **Verified Modal** 的 Factory ID 显示为 `CMH-F-GST017`
5. **Lightbox 表格** 的 Sample Lead 填 `25 days`，Production Lead 填 `45–60 days`
6. **SVG 底部产品名**用 `Instrument Serif italic`，颜色在深色背景上用 `#B83A26` 或 `#F4EFE6`，保证可读
7. **不需要** `verified-badge-chip` 以外的任何 `<button>` 标签在 header 区域
8. 页面末尾倒数第二行是 `<script src="../factory.js"></script>`，最后是 `</body></html>`

---

## 参考对照文件
如果需要查看已完成的工厂页结构参考，可以查看：
```
web/factories/chengtai-upholstery/index.html
web/factories/dahua-door-hardware/index.html
```
这两个文件使用相同的 factory.css + factory.js 结构，可以直接对照 HTML 骨架。
