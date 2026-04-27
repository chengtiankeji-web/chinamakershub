二、SEO 优化完整方案
你的网站目标用户是英语区买家（AU / SG / UK / US），搜索关键词是 "furniture manufacturer China"、"verified factory Foshan" 这类。方案分4个优先级：

🔴 P0 — 本周内完成（影响最大）
1. 每个工厂页加 meta description
目前工厂页的 <meta name="description"> 内容太短或缺失。每个页面需要一句 150 字以内、包含核心关键词的描述，例如：

"Dahua Door Hardware — ANSI, EN and AS certified door hardware manufacturer in Foshan. Hinges, handles, closers and locks. MOQ 1,000 pcs. Verified by ChinaMakersHub."

2. 每个工厂页加 OG 标签（社交分享用）
html<meta property="og:title" content="Dahua Door Hardware — Door Hardware Manufacturer | ChinaMakershub">
<meta property="og:description" content="...">
<meta property="og:url" content="https://chinamakershub.com/factories/dahua-door-hardware/">
<meta property="og:type" content="website">
3. 主页 title 优化
现在主页 title 如果只是 "ChinaMakersHub" 太短，改成：

"ChinaMakersHub — Verified Manufacturers & Factories in China's Greater Bay Area"

4. 工厂页加 Schema.org 结构化数据
让 Google 理解这是一个制造商页面：
html<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dahua Door Hardware",
  "description": "...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Foshan",
    "addressCountry": "CN"
  },
  "url": "https://chinamakershub.com/factories/dahua-door-hardware/"
}
</script>

🟠 P1 — 两周内完成
5. robots.txt 检查和完善
确认存在且格式正确：
User-agent: *
Allow: /
Sitemap: https://chinamakershub.com/sitemap.xml
6. 图片 alt 标签
所有 <img> 标签必须有描述性 alt，目前封装图片的 alt 已经有了，检查其他页面。
7. 内链完善

主页的工厂列表 → 链接到工厂详情页 ✅（已做）
工厂详情页底部加"相关工厂"推荐（同品类）
Journal 文章里加工厂页的内链，比如写 Foshan furniture 的文章链接到 Gaosi、Chengtai

8. Journal 文章 meta 优化
每篇文章检查 title 和 description 是否包含目标关键词。

🟡 P2 — 一个月内
9. Google Search Console 数据分析
提交 sitemap 后等 1–2 周，看哪些页面被收录，哪些关键词有展示，针对性优化。
10. 页面加载速度
用 pagespeed.web.dev 测试主页和工厂页，主要优化点：

图片压缩（惠和鑫的封装图有些超过 100K）
Google Fonts 改成本地加载或加 preconnect（已有 preconnect，可以再优化）

11. 新增 Journal 文章
目前12篇，目标关键词还有很多空白，建议补充：

"furniture manufacturer Foshan MOQ"
"acrylic display manufacturer Shenzhen"
"LED lighting manufacturer Zhongshan"
"door hardware ANSI certified China"

每篇文章都是一个长尾关键词的入口。

🟢 P3 — 持续进行
12. 反向链接建设

在 Made-in-China、Alibaba 等平台的工厂主页加 CMH 链接
联系行业 blog 做内容合作
惠和鑫、易鑫恒等工厂在自己的社媒上提及 CMH 链接


今天下午的执行顺序建议

先确认 robots.txt 是否存在，是否有 sitemap 引用
提交 sitemap 到 Google Search Console
让 Kimi 批量给工厂页加 meta description 和 OG 标签（这个最值）
主页 title 优化

你有没有 Google Search Console 的账号？如果还没验证域名，这个要先做。