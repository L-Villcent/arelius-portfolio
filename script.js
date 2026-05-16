/* ============================================
   ARELIUS VILLCENT — DESIGN ARCHIVE
   Script: 数据 + 渲染 + 灯箱
   ============================================ */

/* ============ 小红书笔记数据 ============
   每条笔记一个对象：
   - title:  显示在卡片下方的标题
   - image:  封面图路径（放在 images/xiaohongshu/ 里）
   - link:   点击跳转的小红书链接

   ▸ 新增一条：在数组里复制一行 { ... } 并改内容，记得每行末尾加逗号
   ▸ 删除一条：把整行 { ... }, 删掉就行
   ▸ 改顺序：直接调整数组顺序
   编辑后保存文件并推送到 GitHub，Vercel 会自动更新网站。
============================================ */
const rednoteNotes = [
  {
    title: '边狱巴士游戏简评',
    image: 'images/xiaohongshu/cover-01.jpg',
    link: 'https://www.xiaohongshu.com/explore/69d9610e00000000230046f7?xsec_token=ABDb8k_SbmPHsa1lj53LPN73qcSpzGKz8BjAKplWmbUGo=&xsec_source=pc_user'
  },
  {
    title: '终末地游戏简评',
    image: 'images/xiaohongshu/cover-02.jpg',
    link: 'https://www.xiaohongshu.com/explore/69dd276e000000001f00182e?xsec_token=ABUf-SU0IbuMOhrC5FxitiUwi-jOy1PaCHLBlLP2jZB98=&xsec_source=pc_user'
  },
  {
    title: '浣熊推币机游戏简评',
    image: 'images/xiaohongshu/cover-03.jpg',
    link: 'https://www.xiaohongshu.com/explore/69e3cbc8000000002301d010?xsec_token=ABJyQb-qqb8jGV0F4K9NZkBXEaPxhhPvgO6FztIxTSwaI=&xsec_source=pc_user'
  },
  {
    title: '漫威争锋游戏简评',
    image: 'images/xiaohongshu/cover-04.jpg',
    link: 'https://www.xiaohongshu.com/explore/69ebe388000000001a0371e8?xsec_token=ABzs5xC5wEJHFZFupZge27AcUZsgXZfzF1ZBZs9BU-GWg=&xsec_source=pc_user'
  },
  {
    title: '异环游戏简评',
    image: 'images/xiaohongshu/cover-05.jpg',
    link: 'https://www.xiaohongshu.com/explore/69efa1c5000000001f007f0f?xsec_token=ABPrsnCQhDq5gERuFzGB822QfFOZ0sm79EII6z7ya1mPQ=&xsec_source=pc_user'
  }
];

/* ============ PPT 数据配置 ============
   每个 PPT 套装一个对象，images 数组按显示顺序列出每张图片路径。

   ▸ 新增一套：在数组里复制一行 { ... } 并改内容
   ▸ 删除一套：把整行 { ... }, 删掉就行
   ▸ 改图片张数：增删 images 数组里的路径即可，不需要固定 5 张
============================================ */
const pptDecks = [
  {
    id: 'PPT — 001',
    title: '国泰逸旅 航司介绍',
    category: 'PRESENTATION DECK',
    images: [
      'images/ppt/ppt-01/01.jpg',
      'images/ppt/ppt-01/02.jpg',
      'images/ppt/ppt-01/03.jpg',
      'images/ppt/ppt-01/04.jpg',
      'images/ppt/ppt-01/05.jpg',
      'images/ppt/ppt-01/06.jpg',
      'images/ppt/ppt-01/07.jpg',
      'images/ppt/ppt-01/08.jpg',
      'images/ppt/ppt-01/09.jpg',
      'images/ppt/ppt-01/10.jpg',
      'images/ppt/ppt-01/11.jpg',
      'images/ppt/ppt-01/12.jpg',
      'images/ppt/ppt-01/13.jpg',
      'images/ppt/ppt-01/14.jpg',
      'images/ppt/ppt-01/15.jpg',
      'images/ppt/ppt-01/16.jpg',
      'images/ppt/ppt-01/17.jpg',
      'images/ppt/ppt-01/18.jpg',
      'images/ppt/ppt-01/19.jpg'
    ]
  },
  {
    id: 'PPT — 002',
    title: 'UMA协议与乐观预言机',
    category: 'PRESENTATION DECK',
    images: [
      'images/ppt/ppt-01/01.jpg',
      'images/ppt/ppt-01/02.jpg',
      'images/ppt/ppt-01/03.jpg',
      'images/ppt/ppt-01/04.jpg',
      'images/ppt/ppt-01/05.jpg',
      'images/ppt/ppt-01/06.jpg',
      'images/ppt/ppt-01/07.jpg',
      'images/ppt/ppt-01/08.jpg',
      'images/ppt/ppt-01/09.jpg',
      'images/ppt/ppt-01/10.jpg',
      'images/ppt/ppt-01/11.jpg',
      'images/ppt/ppt-01/12.jpg',
      'images/ppt/ppt-01/13.jpg',
      'images/ppt/ppt-01/14.jpg'
    ]
  }
];

/* ============ RENDER 小红书 GRID ============ */
function renderRednoteGrid() {
  const grid = document.getElementById('rednote-grid');
  if (!grid) return;

  grid.innerHTML = rednoteNotes.map((note, i) => {
    const num = String(i + 1).padStart(3, '0');
    const fileName = note.image.split('/').pop();
    return `
      <a class="rednote-card" href="${note.link}" target="_blank" rel="noopener">
        <div class="rednote-header">
          <span class="rednote-id">RED — ${num}</span>
          <span class="rednote-ext">↗ XHS</span>
        </div>
        <div class="rednote-thumb">
          <img src="${note.image}" alt="${note.title}" onerror="this.style.display='none'; this.parentElement.classList.add('no-img');">
          <div class="rednote-placeholder">
            <div class="ph-mark">${fileName}</div>
          </div>
          <div class="rednote-hover">
            <span class="rednote-hover-txt">↗ 在小红书查看</span>
          </div>
        </div>
        <div class="rednote-foot">
          <span class="rednote-title">${note.title}</span>
          <span class="rednote-arrow">→</span>
        </div>
      </a>
    `;
  }).join('');

  // Update hero counter
  const counter = document.getElementById('count-rednote');
  if (counter) counter.innerHTML = String(rednoteNotes.length).padStart(2, '0') + '<span class="hb-unit">ea</span>';
}

/* ============ RENDER PPT GRID ============ */
function renderPPTGrid() {
  const grid = document.getElementById('ppt-grid');
  if (!grid) return;

  grid.innerHTML = pptDecks.map((deck, i) => {
    const coverSrc = deck.images[0] || '';
    const count = deck.images.length;
    return `
      <div class="ppt-card" data-deck-index="${i}">
        <div class="ppt-header">
          <span class="ppt-id">${deck.id}</span>
          <span class="ppt-count">${String(count).padStart(2, '0')} SLIDES</span>
        </div>
        <div class="ppt-thumb no-img" data-placeholder="${deck.id.replace(/\s/g, '')}-cover.jpg">
          <img src="${coverSrc}" alt="${deck.title}" onload="this.parentElement.classList.remove('no-img')" onerror="this.style.display='none'">
          <div class="ppt-hover">
            <span class="ppt-hover-txt">↗ 浏览幻灯片</span>
            <span class="ppt-hover-sub">${count} pages · click to open</span>
          </div>
        </div>
        <div class="ppt-foot">
          <div>
            <div class="ppt-title">${deck.title}</div>
            <div class="ppt-cat">${deck.category}</div>
          </div>
          <div class="ppt-arrow">→</div>
        </div>
      </div>
    `;
  }).join('');

  // Bind click events
  grid.querySelectorAll('.ppt-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.deckIndex, 10);
      openLightbox(idx, 0);
    });
  });

  // Update hero counter
  const counter = document.getElementById('count-ppt');
  if (counter) counter.innerHTML = String(pptDecks.length).padStart(2, '0') + '<span class="hb-unit">ea</span>';
}

/* ============ LIGHTBOX ============ */
let lbState = { deckIndex: 0, slideIndex: 0 };

const lb = {
  el: null,
  img: null,
  counter: null,
  deckId: null,
  deckTitle: null,
  prev: null,
  next: null,
  close: null
};

function initLightbox() {
  lb.el = document.getElementById('lightbox');
  lb.img = document.getElementById('lb-image');
  lb.counter = document.getElementById('lb-counter');
  lb.deckId = document.getElementById('lb-deck-id');
  lb.deckTitle = document.getElementById('lb-deck-title');
  lb.prev = document.getElementById('lb-prev');
  lb.next = document.getElementById('lb-next');
  lb.close = document.getElementById('lb-close');

  lb.prev.addEventListener('click', () => navigate(-1));
  lb.next.addEventListener('click', () => navigate(1));
  lb.close.addEventListener('click', closeLightbox);

  lb.el.addEventListener('click', (e) => {
    if (e.target === lb.el) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.el.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
  });
}

function openLightbox(deckIdx, slideIdx) {
  lbState.deckIndex = deckIdx;
  lbState.slideIndex = slideIdx;
  lb.el.classList.add('active');
  lb.el.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  updateLightbox();
}

function closeLightbox() {
  lb.el.classList.remove('active');
  lb.el.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigate(delta) {
  const deck = pptDecks[lbState.deckIndex];
  const newIdx = lbState.slideIndex + delta;
  if (newIdx < 0 || newIdx >= deck.images.length) return;
  lbState.slideIndex = newIdx;
  updateLightbox();
}

function updateLightbox() {
  const deck = pptDecks[lbState.deckIndex];
  const total = deck.images.length;
  const current = lbState.slideIndex;
  lb.img.src = deck.images[current];
  lb.img.alt = `${deck.title} - slide ${current + 1}`;
  lb.counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  lb.deckId.textContent = deck.id;
  lb.deckTitle.textContent = deck.title;
  lb.prev.disabled = current === 0;
  lb.next.disabled = current === total - 1;
}

/* ============ SCROLL REVEAL ============ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============ CLOCK ============ */
function initClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  function tick() {
    const d = new Date();
    const dt = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    const tm = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    el.textContent = `${dt} · ${tm}`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  renderRednoteGrid();
  renderPPTGrid();
  initLightbox();
  initReveal();
  initClock();
});
