# 惠和鑫工厂页 — 产品卡替换 Prompt

## 任务
修改 `web/factories/huihexin-technology/index.html`，把现有的 SVG 占位产品卡全部替换成真实封装图片产品卡。

---

## 图片路径
所有图片已存放在：
```
web/factories/huihexin-technology/images/
```
引用时用相对路径 `images/文件名`，例如 `images/SOT23.png`

---

## 产品卡图片显示方案

产品卡图片用 `<img>` 替换原来的 `<svg>`，关键是处理白底问题。

**每张产品卡的 `.product-img` 结构改为：**

```html
<div class="product-img" style="background:#0A0C14;">
  <img src="images/SOT23.png" alt="SOT-23 Package"
       style="width:80%;height:80%;object-fit:contain;
              position:absolute;top:50%;left:50%;
              transform:translate(-50%,-50%);
              mix-blend-mode:lighten;">
  <div class="product-overlay"><span>Quick View</span></div>
</div>
```

**关键点：**
- 外层 `background` 用深色（`#0A0C14` 深蓝黑 或 `#0F0E0C` 纯黑，交替使用）
- `mix-blend-mode:lighten` 让白底自动融入深色背景，只显示器件轮廓
- `position:absolute` + `top:50%;left:50%;transform:translate(-50%,-50%)` 居中显示
- `.product-img` 本身已有 `position:relative`（来自 factory.css），不需要重复写

---

## filter 分类（4个）

```html
<button class="cat-btn active" data-cat="all">All Products</button>
<button class="cat-btn" data-cat="sot">SOT Series</button>
<button class="cat-btn" data-cat="dfn">DFN / PDFN</button>
<button class="cat-btn" data-cat="sop">SOP / TSSOP</button>
<button class="cat-btn" data-cat="to">TO Series</button>
```

注意：原来的 filter 只有3个按钮，现在改成5个（All + 4类）

---

## 16张产品卡完整数据

每张卡的格式：
```html
<article class="product" data-cat="{分类}" onclick="openLightbox('{img}','{title}','{cat}','{desc}','{material}','{size}','{feature}','{moq}')">
  <div class="product-img" style="background:{bg};">
    <img src="images/{filename}" alt="{alt}" style="width:80%;height:80%;object-fit:contain;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);mix-blend-mode:lighten;">
    <div class="product-overlay"><span>Quick View</span></div>
  </div>
  <div class="product-info">
    <div class="product-cat-tag">{cat-tag}</div>
    <h4>{title}</h4>
    <div class="product-specs">
      <div class="product-spec"><span>Package</span><strong>{package}</strong></div>
      <div class="product-spec"><span>Type</span><strong>{type}</strong></div>
    </div>
    <span class="product-moq">MOQ: {moq}</span>
  </div>
</article>
```

### 卡1
- data-cat: `sot`
- filename: `SOT23.png`
- bg: `#0A0C14`
- alt: SOT-23 Package
- title: SOT-23 Single MOSFET
- cat-tag: SOT Series
- package: SOT-23
- type: N-Ch / P-Ch single
- desc: Standard SOT-23 3-pin single MOSFET. Compact footprint for low-voltage switching and load switching applications. N-channel and P-channel variants available.
- material: Silicon MOSFET die
- size: SOT-23 · 3-pin
- feature: Vds 8V–100V range
- moq: No minimum · sample available

### 卡2
- data-cat: `sot`
- filename: `SOT23-6.png`
- bg: `#0F0E0C`
- alt: SOT-23-6 Package
- title: SOT-23-6 Dual MOSFET
- cat-tag: SOT Series
- package: SOT-23-6
- type: Dual N+N / N+P
- desc: SOT-23-6 dual MOSFET package. Two independent MOSFETs in a single compact footprint. N+N and complementary N+P configurations available.
- material: Silicon MOSFET die
- size: SOT-23-6 · 6-pin
- feature: Dual channel · space saving
- moq: No minimum · sample available

### 卡3
- data-cat: `sot`
- filename: `SOT323.png`
- bg: `#0A0C14`
- alt: SOT-323 Package
- title: SOT-323 Small Signal
- cat-tag: SOT Series
- package: SOT-323
- type: Ultra-compact single
- desc: SOT-323 (SC-70) ultra-compact single MOSFET. Smaller footprint than SOT-23. Suitable for handheld, wearable, and high-density PCB designs.
- material: Silicon MOSFET die
- size: SOT-323 · 3-pin
- feature: SC-70 compatible
- moq: No minimum · sample available

### 卡4
- data-cat: `sot`
- filename: `SOT223-3L.png`
- bg: `#0F0E0C`
- alt: SOT-223 Package
- title: SOT-223 Power Package
- cat-tag: SOT Series
- package: SOT-223
- type: Medium power · tab drain
- desc: SOT-223 3-pin medium power MOSFET with exposed drain tab for improved thermal dissipation. Suitable for DC-DC converters and load switches up to 3A.
- material: Silicon MOSFET die
- size: SOT-223 · 3-pin + tab
- feature: Thermal tab · PCB mount
- moq: No minimum · sample available

### 卡5
- data-cat: `sot`
- filename: `SOT-523.jpg`
- bg: `#0A0C14`
- alt: SOT-523 Package
- title: SOT-523 Ultra-Small
- cat-tag: SOT Series
- package: SOT-523
- type: Ultra-small · 3-pin
- desc: SOT-523 ultra-small MOSFET for space-critical designs. Smaller than SOT-323. Used in smartphones, IoT devices, and miniaturised power management circuits.
- material: Silicon MOSFET die
- size: SOT-523 · 3-pin
- feature: Smallest SOT footprint
- moq: No minimum · sample available

### 卡6
- data-cat: `dfn`
- filename: `DFN2X2-8L.png`
- bg: `#0F0E0C`
- alt: DFN 2x2-8L Package
- title: DFN 2×2-8L N-Channel
- cat-tag: DFN / PDFN
- package: DFN 2×2-8L
- type: Single N-channel
- desc: DFN 2×2mm 8-lead single N-channel MOSFET. Large exposed drain pad for superior thermal performance. Ideal for synchronous buck converters and motor drive.
- material: Silicon MOSFET die
- size: 2×2mm · 8-lead
- feature: Exposed drain pad · low Rds(on)
- moq: No minimum · sample available

### 卡7
- data-cat: `dfn`
- filename: `DFN3x3.png`
- bg: `#0A0C14`
- alt: DFN 3x3 Package
- title: DFN 3×3 Power MOSFET
- cat-tag: DFN / PDFN
- package: DFN 3×3
- type: Single · high current
- desc: DFN 3×3mm single MOSFET with large exposed pad for high current applications. Low profile and excellent thermal resistance. Used in notebook and server power stages.
- material: Silicon MOSFET die
- size: 3×3mm · 8-lead
- feature: High current · low Rds(on)
- moq: No minimum · sample available

### 卡8
- data-cat: `dfn`
- filename: `DFN3X3-8.png`
- bg: `#0F0E0C`
- alt: DFN 3x3-8L Dual Package
- title: DFN 3×3-8L Dual N
- cat-tag: DFN / PDFN
- package: DFN 3×3-8L
- type: Dual N-channel
- desc: DFN 3×3mm 8-lead dual N-channel MOSFET. Two independent N-channel devices in one package. Used in half-bridge and H-bridge motor driver circuits.
- material: Silicon MOSFET die
- size: 3×3mm · 8-lead dual
- feature: Half-bridge ready
- moq: No minimum · sample available

### 卡9
- data-cat: `dfn`
- filename: `PDFN3X3-8L.png`
- bg: `#0A0C14`
- alt: PDFN 3x3-8L Package
- title: PDFN 3×3-8L
- cat-tag: DFN / PDFN
- package: PDFN 3×3-8L
- type: Power DFN · single
- desc: PDFN (Power DFN) 3×3mm 8-lead package with enhanced drain pad area. Superior thermal and electrical performance vs standard DFN. For high-efficiency power conversion.
- material: Silicon MOSFET die
- size: 3×3mm · 8-lead
- feature: Enhanced pad · power grade
- moq: No minimum · sample available

### 卡10
- data-cat: `dfn`
- filename: `PDFN5X6-8L.png`
- bg: `#0F0E0C`
- alt: PDFN 5x6-8L Package
- title: PDFN 5×6-8L Power
- cat-tag: DFN / PDFN
- package: PDFN 5×6-8L
- type: High power · large pad
- desc: PDFN 5×6mm 8-lead high-power MOSFET package. Very large exposed source/drain pad for maximum thermal dissipation. Suited for motor drive, UPS, and industrial power supplies.
- material: Silicon MOSFET die
- size: 5×6mm · 8-lead
- feature: Max thermal · industrial grade
- moq: No minimum · sample available

### 卡11
- data-cat: `sop`
- filename: `SOP-8.png`
- bg: `#0A0C14`
- alt: SOP-8 Package
- title: SOP-8 Logic Package
- cat-tag: SOP / TSSOP
- package: SOP-8
- type: 8-lead wide body
- desc: Standard SOP-8 (SOIC-8) 8-lead package. Used for gate drivers, op-amps, voltage regulators, and logic ICs. Wide body with 1.27mm pitch. Industry-standard footprint.
- material: Various IC die
- size: SOP-8 · 1.27mm pitch
- feature: Industry standard · wide body
- moq: No minimum · sample available

### 卡12
- data-cat: `sop`
- filename: `ESOP-8.jpg`
- bg: `#0F0E0C`
- alt: ESOP-8 Package
- title: ESOP-8 Enhanced SOP
- cat-tag: SOP / TSSOP
- package: ESOP-8
- type: Exposed pad · enhanced thermal
- desc: ESOP-8 (SOP-8 with exposed pad) combines standard SOP-8 footprint with an exposed thermal pad on the underside for improved heat dissipation in power management ICs.
- material: Power management IC die
- size: ESOP-8 · exposed pad
- feature: Thermal pad · SOP-8 compatible
- moq: No minimum · sample available

### 卡13
- data-cat: `sop`
- filename: `TSSop-8.png`
- bg: `#0A0C14`
- alt: TSSOP-8 Package
- title: TSSOP-8 Compact SOP
- cat-tag: SOP / TSSOP
- package: TSSOP-8
- type: Thin shrink SOP
- desc: TSSOP-8 thin shrink small outline package. Narrower than SOP-8 with 0.65mm pitch. Used in space-constrained designs for logic, analog, and mixed-signal ICs.
- material: Various IC die
- size: TSSOP-8 · 0.65mm pitch
- feature: Narrow · high density PCB
- moq: No minimum · sample available

### 卡14
- data-cat: `to`
- filename: `TO-220.png`
- bg: `#0F0E0C`
- alt: TO-220 Package
- title: TO-220 Power MOSFET
- cat-tag: TO Series
- package: TO-220
- type: Through-hole · heatsink mount
- desc: TO-220 3-pin through-hole power MOSFET. Industry-standard package with mounting hole for external heatsink. Wide Vds range 20V–600V+. For linear regulators, motor control, and power switching.
- material: Silicon MOSFET die
- size: TO-220 · 3-pin
- feature: Heatsink mount · high power
- moq: No minimum · sample available

### 卡15
- data-cat: `to`
- filename: `TO-252.png`
- bg: `#0A0C14`
- alt: TO-252 Package
- title: TO-252 Medium Power
- cat-tag: TO Series
- package: TO-252 (D-PAK)
- type: Surface mount · tab
- desc: TO-252 (D-PAK) surface-mount power package. Large exposed tab for thermal dissipation without external heatsink. Drop-in SMT replacement for TO-220 in many designs.
- material: Silicon MOSFET die
- size: TO-252 · 3-pin SMT
- feature: D-PAK · SMT power
- moq: No minimum · sample available

### 卡16
- data-cat: `to`
- filename: `TO-247-3L.png`
- bg: `#0F0E0C`
- alt: TO-247 Package
- title: TO-247 High Power
- cat-tag: TO Series
- package: TO-247
- type: High power · through-hole
- desc: TO-247 3-pin high-power MOSFET package. Larger than TO-220 with better thermal performance and higher current ratings. For inverters, motor drives, and high-current switching power supplies.
- material: Silicon MOSFET die
- size: TO-247 · 3-pin
- feature: Max current · inverter grade
- moq: No minimum · sample available

---

## Lightbox 表格固定行（所有产品卡一致）

```html
<tr><td>Material</td><td id="lb-material"></td></tr>
<tr><td>Package</td><td id="lb-size"></td></tr>
<tr><td>Feature</td><td id="lb-feature"></td></tr>
<tr><td>MOQ</td><td id="lb-moq"></td></tr>
<tr><td>Sample</td><td>Available on request</td></tr>
<tr><td>Lead Time</td><td>3–5 days dispatch</td></tr>
<tr><td>Payment</td><td>T/T · PayPal · Alipay</td></tr>
```

注意：把原来 lightbox table 里的 `Sample Lead` / `Production Lead` / `Incoterms` 三行替换成上面这3行，因为惠和鑫是分销商不是制造商，逻辑不同。

---

## 注意事项

1. **只替换产品卡部分**，其他内容（header、trust band、about、timeline、reviews等）不要动
2. **filter 按钮从3个改成5个**（All + SOT + DFN/PDFN + SOP/TSSOP + TO Series）
3. **products-grid 从原来的卡数量改成16张**
4. **cat-btn 的 data-cat 值** 必须和 product 的 data-cat 完全一致，否则 filter 不工作
5. **不要改 factory.js 的引用**，分页和 filter 逻辑已在 factory.js 里，自动生效
6. **图片文件名区分大小写**，严格按照上面列出的文件名写，不要自行改大小写
7. `ESOP-8.jpg` 是 jpg 格式，其余都是 png，注意后缀不要写错
