/* factory.js — shared JS for all factory/supplier pages */

// ── LIGHTBOX + ZOOM ──────────────────────────────────────────────
const ZOOM = 2.5, LENS_SIZE = 100;
const lbImgWrap = document.getElementById('lb-img-wrap');
const lbImg     = document.getElementById('lb-img');
const zoomLens  = document.getElementById('zoom-lens');
const zoomPrev  = document.getElementById('zoom-preview');

zoomLens.style.width = zoomLens.style.height = LENS_SIZE + 'px';

lbImgWrap.addEventListener('mouseenter', () => {
  zoomLens.classList.add('active'); zoomPrev.classList.add('active');
});
lbImgWrap.addEventListener('mouseleave', () => {
  zoomLens.classList.remove('active'); zoomPrev.classList.remove('active');
});
lbImgWrap.addEventListener('mousemove', (e) => {
  const rect  = lbImgWrap.getBoundingClientRect();
  const wrapW = rect.width, wrapH = rect.height;
  const natW  = lbImg.naturalWidth  || wrapW;
  const natH  = lbImg.naturalHeight || wrapH;
  const halfL = LENS_SIZE / 2;
  const x = Math.max(halfL, Math.min(e.clientX - rect.left, wrapW - halfL));
  const y = Math.max(halfL, Math.min(e.clientY - rect.top,  wrapH - halfL));
  zoomLens.style.left = (x - halfL) + 'px';
  zoomLens.style.top  = (y - halfL) + 'px';
  const scale = Math.max(wrapW / natW, wrapH / natH);
  const rendW = natW * scale, rendH = natH * scale;
  const offX  = (wrapW - rendW) / 2, offY = (wrapH - rendH) / 2;
  const fracX = (x - offX) / rendW,  fracY = (y - offY) / rendH;
  const bgW   = rendW * ZOOM, bgH = rendH * ZOOM;
  zoomPrev.style.backgroundSize     = `${bgW}px ${bgH}px`;
  zoomPrev.style.backgroundPosition = `-${fracX * bgW - wrapW / 2}px -${fracY * bgH - wrapH / 2}px`;
});

function openLightbox(img, title, cat, desc, material, size, feature, moq) {
  lbImg.src = img;
  zoomPrev.style.backgroundImage = `url('${img}')`;
  document.getElementById('lb-title').textContent    = title;
  document.getElementById('lb-cat').textContent      = cat;
  document.getElementById('lb-desc').textContent     = desc;
  document.getElementById('lb-material').textContent = material;
  document.getElementById('lb-size').textContent     = size;
  document.getElementById('lb-feature').textContent  = feature;
  document.getElementById('lb-moq').textContent      = moq + ' minimum';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  zoomLens.classList.remove('active');
  zoomPrev.classList.remove('active');
}
function closeLightboxOnBg(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

// ── VERIFIED MODAL ───────────────────────────────────────────────
function openVerifiedModal() {
  document.getElementById('verified-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVerifiedModal() {
  document.getElementById('verified-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeVerifiedOnBg(e) {
  if (e.target === document.getElementById('verified-modal')) closeVerifiedModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeVerifiedModal(); }
});

// ── PRODUCT FILTER + PAGINATION ──────────────────────────────────
const PAGE_SIZE = 8;
let currentPage = 1;
let currentCat  = 'all';

function getVisible() {
  return Array.from(document.querySelectorAll('.product'))
    .filter(p => currentCat === 'all' || p.dataset.cat === currentCat);
}

function renderPage() {
  const all        = Array.from(document.querySelectorAll('.product'));
  const visible    = getVisible();
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  currentPage      = Math.min(currentPage, totalPages);
  const start      = (currentPage - 1) * PAGE_SIZE;
  const pageItems  = new Set(visible.slice(start, start + PAGE_SIZE));

  all.forEach(p => {
    const inCat = currentCat === 'all' || p.dataset.cat === currentCat;
    p.style.display = (inCat && pageItems.has(p)) ? 'flex' : 'none';
  });

  document.getElementById('page-total').textContent        = totalPages;
  document.querySelector('#page-info strong').textContent  = currentPage;
  document.getElementById('page-prev').disabled            = currentPage <= 1;
  document.getElementById('page-next').disabled            = currentPage >= totalPages;
  document.getElementById('pagination').style.display      = totalPages <= 1 ? 'none' : 'flex';
  document.getElementById('cat-page-info').textContent     = currentPage + ' / ' + totalPages;
  document.getElementById('cat-prev').disabled             = currentPage <= 1;
  document.getElementById('cat-next').disabled             = currentPage >= totalPages;
  document.getElementById('cat-pager').style.display       = totalPages <= 1 ? 'none' : 'flex';
}

function changePage(delta) {
  currentPage += delta;
  renderPage();
  document.querySelector('.section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentCat  = this.dataset.cat;
    currentPage = 1;
    renderPage();
  });
});

renderPage();

// ── INQUIRY FORM ─────────────────────────────────────────────────
function handleInquiry() {
  alert('Thank you! Your inquiry has been submitted. We will respond within 12 hours.');
}