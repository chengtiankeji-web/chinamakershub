# Journal 文章加工厂内链 — Kimi 执行 Prompt

## 任务
在以下6篇 journal 文章的正文中，在合适位置插入对应工厂详情页的内链，增加内链深度和相关性。

## 原则
1. **自然插入**，不要生硬，链接要出现在语境相关的句子里
2. **每篇文章加 2–3 个工厂内链**，不要超过3个，避免显得像广告
3. **链接样式**统一用：`style="color:var(--cinnabar);font-weight:500;"`
4. **不要修改**文章其他任何内容，只在现有段落里插入 `<a>` 标签
5. **先读取每个文件**，找到合适的插入位置，再修改

---

## 文章1：`foshan-furniture-manufacturing-hub-guide.html`

**插入位置和内容：**

找到第155行附近的 "ChinaMakersHub in Foshan" 章节，找到这句话：
> "ChinaMakersHub works with verified Foshan manufacturers across upholstered furniture, solid wood, engineering wood and outdoor furniture categories."

在 "upholstered furniture" 后面加链接到 Chengtai，"solid wood" 后面加链接到 Gaosi，"outdoor furniture" 后面加链接到 Tianlong：

```html
ChinaMakersHub works with verified Foshan manufacturers across 
<a href="/factories/chengtai-upholstery/" style="color:var(--cinnabar);font-weight:500;">upholstered furniture</a>, 
<a href="/factories/gaosi-furniture/" style="color:var(--cinnabar);font-weight:500;">solid wood</a>, 
engineering wood and 
<a href="/factories/tianlong-outdoor/" style="color:var(--cinnabar);font-weight:500;">outdoor furniture</a> 
categories.
```

---

## 文章2：`shenzhen-electronics-manufacturing-sourcing-guide.html`

**目标工厂：**
- Huihexin Technology → `/factories/huihexin-technology/`（IC distribution）
- Xinte Electronics → `/factories/xinte-electronics/`（PCBA）
- Yixinheng Acrylic → `/factories/yixinheng-acrylic/`（display for 3C products）

**插入方式：**
先读取文件，找到以下类型的段落，在合适位置插入：
- 提到 "IC distribution" 或 "component sourcing" 的段落 → 插入 Huihexin 链接
- 提到 "PCB assembly" 或 "PCBA" 的段落 → 插入 Xinte 链接
- 提到 "3C accessories" 或 "display" 的段落 → 插入 Yixinheng 链接

如果找不到精确匹配，在文章的 "ChinaMakersHub" 介绍段落里，用类似格式插入：
```html
Our verified Shenzhen suppliers include 
<a href="/factories/huihexin-technology/" style="color:var(--cinnabar);font-weight:500;">Huihexin Technology</a> 
(authorized IC distributor) and 
<a href="/factories/xinte-electronics/" style="color:var(--cinnabar);font-weight:500;">Xinte Electronics</a> 
(IPC-certified PCBA manufacturer).
```

---

## 文章3：`china-factory-audit-checklist.html`

**目标工厂：**
- Dahua Door Hardware → `/factories/dahua-door-hardware/`（ANSI/EN certified）
- Yixinheng Acrylic → `/factories/yixinheng-acrylic/`（verified factory example）

**插入方式：**
先读取文件，找到提到 "verified factory" 或 "CMH verified" 或 "example" 的段落，插入真实工厂作为案例举例：

```html
For example, <a href="/factories/dahua-door-hardware/" style="color:var(--cinnabar);font-weight:500;">Dahua Door Hardware</a> in Foshan holds ANSI/BHMA, EN 1906, and AS 4145 certifications — all verified on-site by our team.
```

---

## 文章4：`minimum-order-quantity-negotiation-china.html`

**目标工厂：**
- Gostoo Furniture → `/factories/gostoo-furniture/`（MOQ 10 units，很低）
- Yixinheng Acrylic → `/factories/yixinheng-acrylic/`（MOQ 500 pcs）
- Longda Packaging → `/factories/longda-packaging/`（MOQ 1,000 pcs）

**插入方式：**
找到讨论 MOQ 范围或举例的段落，插入真实工厂数据作为参考：

```html
MOQ varies significantly by product type. Upholstered furniture manufacturers like 
<a href="/factories/gostoo-furniture/" style="color:var(--cinnabar);font-weight:500;">Gostoo Furniture</a> 
accept orders from 10 units, while packaging specialists like 
<a href="/factories/longda-packaging/" style="color:var(--cinnabar);font-weight:500;">Longda Packaging</a> 
typically require 1,000 pieces minimum.
```

---

## 文章5：`oem-vs-odm-manufacturing-china-explained.html`

**目标工厂：**
- Gaosi Furniture → `/factories/gaosi-furniture/`（OEM for Scandinavian brands）
- Yixinheng Acrylic → `/factories/yixinheng-acrylic/`（OEM/ODM）
- Gostoo Furniture → `/factories/gostoo-furniture/`（OEM from reference image）

**插入方式：**
找到解释 OEM 或 ODM 定义/举例的段落，插入：

```html
A typical OEM example: 
<a href="/factories/gaosi-furniture/" style="color:var(--cinnabar);font-weight:500;">Gaosi Furniture</a> 
in Foshan manufactures solid wood furniture to buyers' own designs and brand specifications, with no Gaosi branding on the finished product.
```

---

## 文章6：`product-inspection-china-before-shipment.html`

**目标工厂：**
- Dahua Door Hardware → `/factories/dahua-door-hardware/`（in-house salt spray test）
- Haoguang LED → `/factories/haoguang-led/`（in-house LM-80 / UV test）
- Tianlong Outdoor → `/factories/tianlong-outdoor/`（UV and salt spray test）

**插入方式：**
找到讨论 "in-house testing" 或 "third-party inspection" 的段落，插入：

```html
Some factories maintain in-house test facilities — 
<a href="/factories/haoguang-led/" style="color:var(--cinnabar);font-weight:500;">Haoguang LED</a> 
runs LM-80 photometric testing on-site, while 
<a href="/factories/tianlong-outdoor/" style="color:var(--cinnabar);font-weight:500;">Tianlong Outdoor</a> 
operates UV and salt-spray chambers for weathering certification.
```

---

## 注意事项

1. **先读取文件**，找到最合适的插入段落，不要强行插入到不相关的位置
2. 如果文章里已经有对这些工厂的提及，直接在工厂名上加 `<a>` 标签即可
3. 如果找不到合适位置，在文章末尾 "ChinaMakersHub" 介绍段落里插入，那里最自然
4. **链接在新标签打开不需要**，同站内链不加 `target="_blank"`
5. **一次处理2篇**，确认后再继续
