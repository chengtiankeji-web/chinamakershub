# 工厂页内链完善 — Kimi 执行 Prompt

## 任务
在每个工厂详情页的 CTA Band（`<section class="cta-band">` 区块）**前面**插入一个"Related Factories"推荐区块，展示同品类的其他工厂，增加内链和用户停留。

---

## 插入位置
在每个工厂页找到这段代码：
```html
<section class="cta-band">
```
在它**前面**插入 Related Factories 区块。

---

## Related Factories 区块 HTML 模板

```html
<!-- Related Factories -->
<section style="padding:clamp(3rem,6vw,5rem) 0;background:var(--paper-warm);border-top:1px solid var(--line);border-bottom:1px solid var(--line);">
  <div class="container">
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:2rem;padding-bottom:1rem;border-bottom:1px solid var(--line);">
      <div>
        <div style="font-family:var(--font-mono);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--cinnabar);margin-bottom:0.4rem;">/ Related</div>
        <h2 style="font-family:var(--font-display);font-size:clamp(1.4rem,2.5vw,2rem);font-weight:300;letter-spacing:-0.02em;font-variation-settings:'opsz' 144;">More {品类名} workshops</h2>
      </div>
      <a href="/factories/" style="font-family:var(--font-mono);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--cinnabar);text-decoration:none;">All Factories →</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);">

      {/* 每个推荐工厂卡片 */}
      <a href="/factories/{slug}/" style="display:block;background:var(--paper);padding:1.8rem;text-decoration:none;color:inherit;transition:background 0.2s;" onmouseover="this.style.background='var(--paper-pure)'" onmouseout="this.style.background='var(--paper)'">
        <div style="font-family:var(--font-mono);font-size:0.62rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--cinnabar);margin-bottom:0.6rem;">{品类标签}</div>
        <h3 style="font-family:var(--font-display);font-size:1.3rem;font-weight:400;letter-spacing:-0.02em;margin-bottom:0.4rem;font-variation-settings:'opsz' 72;">{工厂英文名}</h3>
        <div style="font-family:var(--font-mono);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--ink-mute);margin-bottom:0.8rem;">{城市}, Guangdong</div>
        <div style="font-size:0.82rem;color:var(--ink-soft);line-height:1.55;margin-bottom:1rem;">{一句话描述}</div>
        <span style="font-family:var(--font-mono);font-size:0.68rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--cinnabar);">View Profile →</span>
      </a>

    </div>
  </div>
</section>
```

---

## 每个工厂页的推荐内容

### 1. `gaosi-furniture/index.html`
品类名：Furniture
推荐3个：

**卡片1**
- slug: mingde-office-furniture
- 品类标签: Furniture · Office
- 工厂名: Mingde Office Furniture
- 城市: Foshan
- 描述: Office and commercial furniture specialist. Sit-stand desks, task chairs, and storage. BIFMA certified. MOQ 100 units.

**卡片2**
- slug: chengtai-upholstery
- 品类标签: Furniture · Upholstery
- 工厂名: Chengtai Upholstery
- 城市: Foshan
- 描述: Upholstered sofas, armchairs, and hospitality seating. FR fabric certified. COM fabric accepted. MOQ 50 units.

**卡片3**
- slug: tianlong-outdoor
- 品类标签: Furniture · Outdoor
- 工厂名: Tianlong Outdoor
- 城市: Zhongshan
- 描述: Outdoor furniture in teak, aluminium, and rope weave. UV tested. For garden retail and hotel pool use. MOQ 100 units.

---

### 2. `mingde-office-furniture/index.html`
品类名：Furniture
推荐3个：

**卡片1**
- slug: gaosi-furniture
- 品类标签: Furniture · Solid Wood
- 工厂名: Gaosi Furniture
- 城市: Foshan
- 描述: Solid wood dining and bedroom furniture. FSC certified teak available. OEM for Scandinavian brands. MOQ 500 units.

**卡片2**
- slug: ruijin-metal-furniture
- 品类标签: Furniture · Metal
- 工厂名: Ruijin Metal Furniture
- 城市: Guangzhou
- 描述: Steel and metal furniture. Powder coat and PVD finishes. Retail fixtures and café furniture. MOQ 200 units.

**卡片3**
- slug: gostoo-furniture
- 品类标签: Furniture · Upholstered
- 工厂名: Gostoo Furniture
- 城市: Foshan
- 描述: Designer-inspired sofas and beds. Full OEM from reference image. COM fabric accepted. MOQ 10 units.

---

### 3. `tianlong-outdoor/index.html`
品类名：Furniture
推荐3个：

**卡片1**
- slug: gaosi-furniture
- 品类标签: Furniture · Solid Wood
- 工厂名: Gaosi Furniture
- 城市: Foshan
- 描述: Solid wood dining and bedroom furniture. FSC certified teak available. OEM for Scandinavian brands. MOQ 500 units.

**卡片2**
- slug: ruijin-metal-furniture
- 品类标签: Furniture · Metal
- 工厂名: Ruijin Metal Furniture
- 城市: Guangzhou
- 描述: Steel and metal furniture including café tables and retail fixtures. Powder coat and PVD finishes. MOQ 200 units.

**卡片3**
- slug: chengtai-upholstery
- 品类标签: Furniture · Upholstery
- 工厂名: Chengtai Upholstery
- 城市: Foshan
- 描述: Upholstered sofas and hospitality seating. FR fabric certified to BS 5852 and EN 1021. MOQ 50 units.

---

### 4. `ruijin-metal-furniture/index.html`
品类名：Furniture
推荐3个：

**卡片1**
- slug: gaosi-furniture
- 品类标签: Furniture · Solid Wood
- 工厂名: Gaosi Furniture
- 城市: Foshan
- 描述: Solid wood dining and bedroom furniture. FSC certified teak. OEM for Scandinavian brands. MOQ 500 units.

**卡片2**
- slug: mingde-office-furniture
- 品类标签: Furniture · Office
- 工厂名: Mingde Office Furniture
- 城市: Foshan
- 描述: Office furniture including sit-stand desks and task chairs. BIFMA certified. MOQ 100 units.

**卡片3**
- slug: dahua-door-hardware
- 品类标签: Hardware · Door
- 工厂名: Dahua Door Hardware
- 城市: Foshan
- 描述: Door hardware — hinges, handles, closers and locks. ANSI, EN and AS certified. PVD finishes. MOQ 1,000 pcs.

---

### 5. `chengtai-upholstery/index.html`
品类名：Furniture
推荐3个：

**卡片1**
- slug: gaosi-furniture
- 品类标签: Furniture · Solid Wood
- 工厂名: Gaosi Furniture
- 城市: Foshan
- 描述: Solid wood furniture with European-spec finishing. FSC certified teak available. MOQ 500 units.

**卡片2**
- slug: gostoo-furniture
- 品类标签: Furniture · Custom OEM
- 工厂名: Gostoo Furniture
- 城市: Foshan
- 描述: Designer-inspired sofas and beds. OEM from reference image. COM fabric. No technical drawing required. MOQ 10 units.

**卡片3**
- slug: mingde-office-furniture
- 品类标签: Furniture · Office
- 工厂名: Mingde Office Furniture
- 城市: Foshan
- 描述: Office and contract furniture. Sit-stand desks, task chairs, and storage systems. BIFMA certified. MOQ 100 units.

---

### 6. `gostoo-furniture/index.html`
品类名：Furniture
推荐3个：

**卡片1**
- slug: chengtai-upholstery
- 品类标签: Furniture · Upholstery
- 工厂名: Chengtai Upholstery
- 城市: Foshan
- 描述: Upholstered sofas, armchairs, and banquette seating. FR fabric certified to BS 5852 and EN 1021. MOQ 50 units.

**卡片2**
- slug: gaosi-furniture
- 品类标签: Furniture · Solid Wood
- 工厂名: Gaosi Furniture
- 城市: Foshan
- 描述: Solid wood dining and bedroom furniture. FSC certified teak. OEM for Scandinavian brands. MOQ 500 units.

**卡片3**
- slug: tianlong-outdoor
- 品类标签: Furniture · Outdoor
- 工厂名: Tianlong Outdoor
- 城市: Zhongshan
- 描述: Outdoor furniture in teak, aluminium frame, and hand-woven rope. UV and salt-spray tested. MOQ 100 units.

---

### 7. `dahua-door-hardware/index.html`
品类名：Hardware
推荐3个：

**卡片1**
- slug: xinglong-fasteners
- 品类标签: Hardware · Fasteners
- 工厂名: Xinglong Fasteners
- 城市: Dongguan
- 描述: Industrial fasteners — bolts, nuts, and screws. IATF 16949 certified. Automotive and construction grade. MOQ 5,000 pcs.

**卡片2**
- slug: boshi-lock
- 品类标签: Hardware · Locks
- 工厂名: Boshi Lock
- 城市: Zhongshan
- 描述: Security locks — deadbolts, padlocks, and smart locks. ANSI Grade 2 and EN 12209 certified. MOQ 500 pcs.

**卡片3**
- slug: weichuang-sheet-metal
- 品类标签: Hardware · Sheet Metal
- 工厂名: Weichuang Sheet Metal
- 城市: Shenzhen
- 描述: Precision sheet metal fabrication. Laser cutting, CNC punching, and powder coat. For electronics and industrial equipment. MOQ 200 pcs.

---

### 8. `xinglong-fasteners/index.html`
品类名：Hardware
推荐3个：

**卡片1**
- slug: dahua-door-hardware
- 品类标签: Hardware · Door
- 工厂名: Dahua Door Hardware
- 城市: Foshan
- 描述: Door hardware — hinges, handles, closers and locks. ANSI, EN and AS certified. PVD and powder coat finishes. MOQ 1,000 pcs.

**卡片2**
- slug: weichuang-sheet-metal
- 品类标签: Hardware · Sheet Metal
- 工厂名: Weichuang Sheet Metal
- 城市: Shenzhen
- 描述: Precision sheet metal fabrication. Laser cutting, CNC punching, and welding. ISO 9001. MOQ 200 pcs.

**卡片3**
- slug: boshi-lock
- 品类标签: Hardware · Locks
- 工厂名: Boshi Lock
- 城市: Zhongshan
- 描述: Security locks and smart locks. ANSI Grade 2 and EN 12209 certified. OEM for European hardware brands. MOQ 500 pcs.

---

### 9. `boshi-lock/index.html`
品类名：Hardware
推荐3个：

**卡片1**
- slug: dahua-door-hardware
- 品类标签: Hardware · Door
- 工厂名: Dahua Door Hardware
- 城市: Foshan
- 描述: Door hardware — hinges, handles, closers and mortise locks. ANSI, EN and AS certified. PVD finishes. MOQ 1,000 pcs.

**卡片2**
- slug: xinglong-fasteners
- 品类标签: Hardware · Fasteners
- 工厂名: Xinglong Fasteners
- 城市: Dongguan
- 描述: Industrial fasteners. IATF 16949 certified. Bolts, nuts, and specialty fasteners for automotive and construction. MOQ 5,000 pcs.

**卡片3**
- slug: weichuang-sheet-metal
- 品类标签: Hardware · Sheet Metal
- 工厂名: Weichuang Sheet Metal
- 城市: Shenzhen
- 描述: Precision sheet metal. Laser cut, CNC punch, and powder coat. Server enclosures and industrial panels. MOQ 200 pcs.

---

### 10. `weichuang-sheet-metal/index.html`
品类名：Hardware
推荐3个：

**卡片1**
- slug: dahua-door-hardware
- 品类标签: Hardware · Door
- 工厂名: Dahua Door Hardware
- 城市: Foshan
- 描述: Door hardware — hinges, handles, closers and locks. ANSI, EN and AS certified. PVD and powder coat finishes. MOQ 1,000 pcs.

**卡片2**
- slug: xinglong-fasteners
- 品类标签: Hardware · Fasteners
- 工厂名: Xinglong Fasteners
- 城市: Dongguan
- 描述: Industrial fasteners for automotive and construction. IATF 16949 certified. MOQ 5,000 pcs.

**卡片3**
- slug: xinte-electronics
- 品类标签: Electronics · PCBA
- 工厂名: Xinte Electronics
- 城市: Shenzhen
- 描述: PCB assembly — SMT and DIP. IPC Class 2/3. ISO 13485 medical certified. Fast 5-day prototype. MOQ 100 pcs.

---

### 11. `haoguang-led/index.html`
品类名：Lighting
推荐3个：

**卡片1**
- slug: yimei-decorative-lighting
- 品类标签: Lighting · Decorative
- 工厂名: Yimei Decorative Lighting
- 城市: Zhongshan
- 描述: Decorative pendants, chandeliers, and wall sconces. UL, CE, and SAA listed. Custom glass and metalwork. MOQ 50 pcs.

**卡片2**
- slug: junhui-outdoor-lighting
- 品类标签: Lighting · Outdoor
- 工厂名: Junhui Outdoor Lighting
- 城市: Guangzhou
- 描述: Outdoor LED street lights, flood lights, and garden lighting. IP66, CE, and ENEC certified. MOQ 100 pcs.

**卡片3**
- slug: yixinheng-acrylic
- 品类标签: Display · Acrylic
- 工厂名: Yixinheng Acrylic
- 城市: Shenzhen
- 描述: Custom acrylic display stands for retail, cosmetic, and 3C products. OEM/ODM from 500 pcs. 35-day lead.

---

### 12. `junhui-outdoor-lighting/index.html`
品类名：Lighting
推荐3个：

**卡片1**
- slug: haoguang-led
- 品类标签: Lighting · Commercial LED
- 工厂名: Haoguang LED
- 城市: Zhongshan
- 描述: Commercial LED lighting — high-bay, linear, and panel. UL, DLC, and CE certified. From Zhongshan's lighting cluster. MOQ 200 pcs.

**卡片2**
- slug: yimei-decorative-lighting
- 品类标签: Lighting · Decorative
- 工厂名: Yimei Decorative Lighting
- 城市: Zhongshan
- 描述: Decorative pendants, chandeliers, and wall lights. UL, CE, and SAA listed. Custom glass and metal. MOQ 50 pcs.

**卡片3**
- slug: dahua-door-hardware
- 品类标签: Hardware · Door
- 工厂名: Dahua Door Hardware
- 城市: Foshan
- 描述: Architectural door hardware. ANSI, EN, and AS certified. Hinges, handles, closers, and locks. MOQ 1,000 pcs.

---

### 13. `yimei-decorative-lighting/index.html`
品类名：Lighting
推荐3个：

**卡片1**
- slug: haoguang-led
- 品类标签: Lighting · Commercial LED
- 工厂名: Haoguang LED
- 城市: Zhongshan
- 描述: Commercial LED high-bay, linear, and outdoor lighting. UL, DLC, and CE certified. MOQ 200 pcs.

**卡片2**
- slug: junhui-outdoor-lighting
- 品类标签: Lighting · Outdoor
- 工厂名: Junhui Outdoor Lighting
- 城市: Guangzhou
- 描述: Outdoor LED street lights, flood lights, and solar lights. IP66 rated. CE and ENEC certified. MOQ 100 pcs.

**卡片3**
- slug: gostoo-furniture
- 品类标签: Furniture · Custom OEM
- 工厂名: Gostoo Furniture
- 城市: Foshan
- 描述: Designer-inspired sofas and beds. Full OEM from reference image. COM fabric. MOQ 10 units.

---

### 14. `yixinheng-acrylic/index.html`
品类名：Display & Acrylic
推荐3个：

**卡片1**
- slug: huihexin-technology
- 品类标签: Electronics · Distribution
- 工厂名: Huihexin Technology
- 城市: Shenzhen
- 描述: Authorized IC distributor — MCU, power IC, and sensors. 5,000+ SKUs in bonded warehouse. FAE support. No minimum on samples.

**卡片2**
- slug: haoguang-led
- 品类标签: Lighting · Commercial LED
- 工厂名: Haoguang LED
- 城市: Zhongshan
- 描述: Commercial LED lighting — high-bay, linear, and panel. UL, DLC, and CE certified. MOQ 200 pcs.

**卡片3**
- slug: longda-packaging
- 品类标签: Packaging · Custom
- 工厂名: Longda Packaging
- 城市: Dongguan
- 描述: Custom corrugated and rigid gift boxes. FSC certified board. Full offset printing and embossing. MOQ 1,000 pcs.

---

### 15. `huihexin-technology/index.html`
品类名：Electronics
推荐3个：

**卡片1**
- slug: xinte-electronics
- 品类标签: Electronics · PCBA
- 工厂名: Xinte Electronics
- 城市: Shenzhen
- 描述: PCB assembly — SMT and DIP. IPC Class 2/3 and ISO 13485 certified. 5-day prototype. MOQ 100 pcs.

**卡片2**
- slug: yixinheng-acrylic
- 品类标签: Display · Acrylic
- 工厂名: Yixinheng Acrylic
- 城市: Shenzhen
- 描述: Custom acrylic display stands for 3C, cosmetic, and retail. OEM/ODM. MOQ 500 pcs. 35-day lead.

**卡片3**
- slug: weichuang-sheet-metal
- 品类标签: Hardware · Sheet Metal
- 工厂名: Weichuang Sheet Metal
- 城市: Shenzhen
- 描述: Precision sheet metal enclosures and panels for electronics and industrial equipment. Laser cut, CNC punch. MOQ 200 pcs.

---

### 16. `xinte-electronics/index.html`
品类名：Electronics
推荐3个：

**卡片1**
- slug: huihexin-technology
- 品类标签: Electronics · Distribution
- 工厂名: Huihexin Technology
- 城市: Shenzhen
- 描述: Authorized IC distributor — MCU, power IC, and sensors. Bonded warehouse stock. FAE engineering support. No minimum.

**卡片2**
- slug: weichuang-sheet-metal
- 品类标签: Hardware · Sheet Metal
- 工厂名: Weichuang Sheet Metal
- 城市: Shenzhen
- 描述: Sheet metal enclosures and chassis for electronics. Laser cut, CNC punch, powder coat. ISO 9001. MOQ 200 pcs.

**卡片3**
- slug: yixinheng-acrylic
- 品类标签: Display · Acrylic
- 工厂名: Yixinheng Acrylic
- 城市: Shenzhen
- 描述: Custom acrylic display stands for 3C and retail. OEM/ODM from 500 pcs. Shenzhen-based. 35-day lead.

---

### 17. `longda-packaging/index.html`
品类名：Packaging & Bath
推荐3个：

**卡片1**
- slug: kaiwei-sanitary
- 品类标签: Bath · Sanitary Ware
- 工厂名: Kaiwei Sanitary
- 城市: Foshan
- 描述: Sanitary ware — toilets, basins, and shower enclosures. CUPC, CE, and WELS certified. MOQ 100 pcs.

**卡片2**
- slug: yixinheng-acrylic
- 品类标签: Display · Acrylic
- 工厂名: Yixinheng Acrylic
- 城市: Shenzhen
- 描述: Custom acrylic display and packaging solutions. OEM/ODM. Cosmetic and retail focus. MOQ 500 pcs.

**卡片3**
- slug: gostoo-furniture
- 品类标签: Furniture · Custom OEM
- 工厂名: Gostoo Furniture
- 城市: Foshan
- 描述: Designer-inspired sofas and beds. OEM from reference image. COM fabric accepted. MOQ 10 units.

---

### 18. `kaiwei-sanitary/index.html`
品类名：Packaging & Bath
推荐3个：

**卡片1**
- slug: longda-packaging
- 品类标签: Packaging · Custom
- 工厂名: Longda Packaging
- 城市: Dongguan
- 描述: Custom corrugated and rigid gift packaging. FSC certified board. Full offset printing and embossing. MOQ 1,000 pcs.

**卡片2**
- slug: dahua-door-hardware
- 品类标签: Hardware · Door
- 工厂名: Dahua Door Hardware
- 城市: Foshan
- 描述: Door hardware — hinges, handles, closers, and locks. ANSI, EN, and AS certified. PVD finishes. MOQ 1,000 pcs.

**卡片3**
- slug: ruijin-metal-furniture
- 品类标签: Furniture · Metal
- 工厂名: Ruijin Metal Furniture
- 城市: Guangzhou
- 描述: Metal furniture and retail fixtures. Powder coat and PVD finishes. Cast iron production in-house. MOQ 200 units.

---

## 注意事项

1. **先读取每个文件**，找到 `<section class="cta-band">` 的位置，在它前面插入区块
2. **不要修改** cta-band 和文件其他任何内容
3. **品类名**填入 `More {品类名} workshops` 标题，如 `More Furniture workshops`
4. **3张卡片**用 `grid-template-columns:repeat(3,1fr)` 横排，移动端自动折叠
5. **逐个文件处理**，一次处理3个工厂页，确认后再继续
6. **响应式处理**：在 style 里加 `@media(max-width:768px){...}` 把 grid 改成 1 列，或者直接用 inline style 的 grid，现代浏览器会自动处理
