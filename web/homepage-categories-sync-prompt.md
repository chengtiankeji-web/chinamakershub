# 主页 & Categories 页面同步更新 Prompt

## 任务概览
修改两个文件：
1. `web/index.html` — 主页
2. `web/categories/index.html` — 品类列表页

同时新建三个品类子页面目录：
3. `web/categories/display-acrylic/index.html`
4. `web/categories/electronics/index.html`
5. `web/categories/packaging-bath/index.html`

---

## 文件一：`web/index.html` 主页修改

### 1.1 Hero 区域数字修改

找到以下内容并替换：
```html
<!-- 原内容 -->
<strong>100+</strong>
Verified workshops in our network
```
改为：
```html
<strong>16</strong>
Verified workshops &amp; suppliers
```

---

### 1.2 Categories 品类卡片区域（重点修改）

找到 `<section class="categories"` 整个区块，把6个 `.cat` 卡片全部替换成以下内容：

**注意：原来有4个卡片的 href 错误地指向 `/categories/furniture/`，全部需要修正。**

```html
<section class="categories" id="categories">
  <div class="container">
    <div class="section-label reveal">Categories</div>
    <h2 class="section-title reveal reveal-2">
      Browse by category. Every workshop <em>verified</em> on the ground by our Foshan team.
    </h2>
    <div class="categories-grid reveal reveal-3">

      <a href="/categories/furniture/" class="cat">
        <div class="cat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h3 class="cat-name">Furniture<br>&amp; Home Living</h3>
        <p class="cat-desc">Sofas, beds, dining sets, office furniture, outdoor furniture. OEM and custom design.</p>
        <span class="cat-count">7 workshops</span>
      </a>

      <a href="/categories/hardware/" class="cat">
        <div class="cat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41"/></svg>
        </div>
        <h3 class="cat-name">Hardware<br>&amp; Metal Parts</h3>
        <p class="cat-desc">Door hardware, fasteners, locks, sheet metal fabrication. ANSI, EN, and AS certified.</p>
        <span class="cat-count">4 workshops</span>
      </a>

      <a href="/categories/lighting/" class="cat">
        <div class="cat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/></svg>
        </div>
        <h3 class="cat-name">Lighting<br>&amp; Fixtures</h3>
        <p class="cat-desc">Commercial LED, decorative, and outdoor lighting. UL, DLC, CE, and SAA certified.</p>
        <span class="cat-count">3 workshops</span>
      </a>

      <a href="/categories/display-acrylic/" class="cat">
        <div class="cat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <h3 class="cat-name">Display<br>&amp; Acrylic</h3>
        <p class="cat-desc">Custom acrylic display stands, cosmetic packaging, 3C and vape accessories. OEM/ODM.</p>
        <span class="cat-count">1 workshop</span>
      </a>

      <a href="/categories/electronics/" class="cat">
        <div class="cat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
        </div>
        <h3 class="cat-name">Electronics<br>&amp; Components</h3>
        <p class="cat-desc">Authorized IC distribution, PCBA, and electronic components. FAE support available.</p>
        <span class="cat-count">2 suppliers</span>
      </a>

      <a href="/categories/packaging-bath/" class="cat">
        <div class="cat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
        </div>
        <h3 class="cat-name">Packaging<br>&amp; Bath</h3>
        <p class="cat-desc">Custom corrugated and rigid packaging, sanitary ware and bathroom fittings. CUPC, CE.</p>
        <span class="cat-count">2 workshops</span>
      </a>

    </div>
  </div>
</section>
```

---

### 1.3 Factories 列表区域

找到 `<div class="factories-list">` 整个区块，把里面的工厂列表全部替换成以下内容（只保留5条精选，加"View all"链接）：

```html
<div class="factories-list">

  <a href="/factories/yixinheng-acrylic/" class="factory">
    <div class="factory-num">CMH-F-3WQSUB</div>
    <div class="factory-name">
      Yixinheng Acrylic
      <span>Shenzhen · Display &amp; Acrylic</span>
    </div>
    <div class="factory-desc">Custom acrylic display stands for cosmetics, 3C, and vape retail. OEM/ODM from 500 pcs. 35-day lead time. Verified by ChinaMakersHub.</div>
    <div class="factory-tags">
      <span class="tag verified">✓ Verified</span>
      <span class="tag">Acrylic Display</span>
      <span class="tag">OEM / ODM</span>
    </div>
    <span class="factory-cta">View Profile →</span>
  </a>

  <a href="/factories/gaosi-furniture/" class="factory">
    <div class="factory-num">CMH-F-GSF001</div>
    <div class="factory-name">
      Gaosi Furniture
      <span>Foshan · Furniture</span>
    </div>
    <div class="factory-desc">Solid wood and engineered furniture with European-spec finishing. 12,000 m² facility. OEM for Scandinavian brands. FSC certified teak available.</div>
    <div class="factory-tags">
      <span class="tag verified">✓ Verified</span>
      <span class="tag">Solid Wood</span>
      <span class="tag">OEM</span>
    </div>
    <span class="factory-cta">View Profile →</span>
  </a>

  <a href="/factories/huihexin-technology/" class="factory">
    <div class="factory-num">CMH-S-HHX016</div>
    <div class="factory-name">
      Huihexin Technology
      <span>Shenzhen · Electronics</span>
    </div>
    <div class="factory-desc">Authorized distributor of branded semiconductors — MCU, power IC, sensors. 5,000+ SKUs in bonded warehouse. FAE engineering support available.</div>
    <div class="factory-tags">
      <span class="tag verified">✓ Verified</span>
      <span class="tag">MCU · Power IC</span>
      <span class="tag">Authorized Dist.</span>
    </div>
    <span class="factory-cta">View Profile →</span>
  </a>

  <a href="/factories/dahua-door-hardware/" class="factory">
    <div class="factory-num">CMH-F-DHD006</div>
    <div class="factory-name">
      Dahua Door Hardware
      <span>Foshan · Hardware</span>
    </div>
    <div class="factory-desc">Door and window hardware manufacturer. Hinges, handles, closers, and locks. ANSI, EN 1906, and AS 4145 certified. PVD and powder coat finishes.</div>
    <div class="factory-tags">
      <span class="tag verified">✓ Verified</span>
      <span class="tag">ANSI · EN · AS</span>
      <span class="tag">PVD Finish</span>
    </div>
    <span class="factory-cta">View Profile →</span>
  </a>

  <a href="/factories/haoguang-led/" class="factory">
    <div class="factory-num">CMH-F-HGL010</div>
    <div class="factory-name">
      Haoguang LED
      <span>Zhongshan · Lighting</span>
    </div>
    <div class="factory-desc">Commercial LED lighting manufacturer from Zhongshan. High-bay, linear, and outdoor luminaires. UL, DLC, and CE certified. From 200 pcs.</div>
    <div class="factory-tags">
      <span class="tag verified">✓ Verified</span>
      <span class="tag">UL · DLC · CE</span>
      <span class="tag">Commercial LED</span>
    </div>
    <span class="factory-cta">View Profile →</span>
  </a>

</div>

<div style="margin-top: 2rem;">
  <a href="/factories/" class="btn-ghost">View all 16 verified workshops →</a>
</div>
```

---

### 1.4 Footer 链接修正

找到 footer 里所有错误的链接，全部修正：

| 原内容 | 改为 |
|---|---|
| `<a href="/categories/furniture/">Browse Categories</a>` | `<a href="/categories/">Browse Categories</a>` |
| `<a href="/categories/furniture/">Featured Factories</a>` | `<a href="/factories/">All Factories</a>` |
| `<a href="/factory-apply">Apply to Join</a>` | `<a href="/factory-apply/">Apply as Factory</a>` |
| `<a href="/factory-apply">Verification Process</a>` | `<a href="/factory-apply/">Verification Process</a>` |
| `<a href="/factory-apply">Member Benefits</a>` | `<a href="/factory-apply/">Apply as Factory</a>` |

---

## 文件二：`web/categories/index.html` 品类列表页修改

打开文件，找到品类卡片列表区域，把所有卡片替换成以下6个，确保 href 正确：

```html
<a href="/categories/furniture/" class="category-card">
  <!-- 保留原有样式，只修改以下内容 -->
  <h2>Furniture &amp; Home Living</h2>
  <p>Sofas, beds, dining sets, office furniture, outdoor furniture, and upholstered seating. OEM and custom design from Foshan's manufacturing cluster.</p>
  <span class="count">7 workshops</span>
</a>

<a href="/categories/hardware/" class="category-card">
  <h2>Hardware &amp; Metal Parts</h2>
  <p>Door hardware, industrial fasteners, security locks, and sheet metal fabrication. ANSI, EN, AS and ISO certified manufacturers.</p>
  <span class="count">4 workshops</span>
</a>

<a href="/categories/lighting/" class="category-card">
  <h2>Lighting &amp; Fixtures</h2>
  <p>Commercial LED, decorative pendants, chandeliers, and outdoor lighting. UL, DLC, CE, SAA, and ENEC certified from Zhongshan's lighting cluster.</p>
  <span class="count">3 workshops</span>
</a>

<a href="/categories/display-acrylic/" class="category-card">
  <h2>Display &amp; Acrylic</h2>
  <p>Custom acrylic display stands, cosmetic packaging trays, and 3C retail fixtures. OEM/ODM from 500 pieces. Shenzhen-based.</p>
  <span class="count">1 workshop</span>
</a>

<a href="/categories/electronics/" class="category-card">
  <h2>Electronics &amp; Components</h2>
  <p>Authorized IC distribution, PCB assembly (PCBA), and electronic component sourcing. FAE engineering support. IPC Class 2/3 certified assembly.</p>
  <span class="count">2 suppliers</span>
</a>

<a href="/categories/packaging-bath/" class="category-card">
  <h2>Packaging &amp; Bath</h2>
  <p>Custom corrugated and rigid gift packaging, sanitary ware and bathroom fittings. FSC certified board. CUPC and CE certified bath products.</p>
  <span class="count">2 workshops</span>
</a>
```

**重要：** 修改时保留原有 CSS class 名称，只替换文字内容和链接，不要改动样式结构。先读取 `web/categories/index.html` 原文件，对照原有的 class 名称和 HTML 结构进行修改。

---

## 文件三：新建3个品类子页面

### 3.1 `web/categories/display-acrylic/index.html`

参考 `web/categories/furniture/index.html` 的结构，创建 Display & Acrylic 品类页，内容：

- **标题：** Display & Acrylic
- **描述：** Custom acrylic display stands, cosmetic packaging, and retail fixtures from Shenzhen.
- **工厂列表（1个）：**
  - Yixinheng Acrylic · CMH-F-3WQSUB · Shenzhen · `/factories/yixinheng-acrylic/`
  - 标签：Acrylic Display · OEM/ODM · Cosmetic · 3C · Vape
  - 描述：Custom acrylic display manufacturer. MOQ 500 pcs. 35-day lead. Verified.

### 3.2 `web/categories/electronics/index.html`

- **标题：** Electronics & Components
- **描述：** Authorized IC distributors and PCB assembly manufacturers in Shenzhen.
- **工厂列表（2个）：**
  1. Huihexin Technology · CMH-S-HHX016 · Shenzhen · `/factories/huihexin-technology/`
     - 标签：MCU · Power IC · Authorized Dist. · FAE Support
     - 描述：Authorized semiconductor distributor. 5,000+ SKUs. 48h FAE response. Verified.
  2. Xinte Electronics · CMH-F-XTE015 · Shenzhen · `/factories/xinte-electronics/`
     - 标签：PCB Assembly · SMT · DIP · IATF 16949
     - 描述：PCBA manufacturer. SMT and DIP. IPC Class 2/3. ISO 13485. Verified.

### 3.3 `web/categories/packaging-bath/index.html`

- **标题：** Packaging & Bath
- **描述：** Custom packaging manufacturers and sanitary ware producers from Dongguan and Foshan.
- **工厂列表（2个）：**
  1. Longda Packaging · CMH-F-LDP013 · Dongguan · `/factories/longda-packaging/`
     - 标签：Corrugated Box · Rigid Box · FSC · Custom Print
     - 描述：Custom packaging manufacturer. FSC certified. MOQ 1,000 pcs. Full offset printing.
  2. Kaiwei Sanitary · CMH-F-KWS014 · Foshan · `/factories/kaiwei-sanitary/`
     - 标签：Bath · Sanitary · CUPC · CE · WELS
     - 描述：Sanitary ware manufacturer. CUPC, CE, WELS certified. MOQ 100 pcs. Verified.

---

## 执行顺序

1. 先读取 `web/categories/index.html` 原文件，了解 HTML 结构和 class 名称
2. 先读取 `web/categories/furniture/index.html`，作为新建品类页的模板
3. 修改 `web/index.html`
4. 修改 `web/categories/index.html`
5. 新建 `web/categories/display-acrylic/index.html`
6. 新建 `web/categories/electronics/index.html`
7. 新建 `web/categories/packaging-bath/index.html`

## 注意事项

1. **修改前先读取原文件**，不要凭空重写，只做精确替换
2. **保留所有原有 CSS 和 JS**，不要删除任何样式
3. **品类工厂数量** 以上面数据为准，不要自己发明数字
4. **href 路径** 末尾带斜杠 `/`，如 `/factories/` 不是 `/factories`
5. **新建的3个品类页** 完全参照 `furniture/index.html` 结构，保持视觉一致
