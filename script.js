(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const pad = (value) => String(value).padStart(2, "0");

  const makeFrames = (folder, count) =>
    Array.from({ length: count }, (_, index) => `images/ppt/${folder}/${pad(index + 1)}.jpg`);
  const makePreviews = (folder, count) =>
    Array.from({ length: count }, (_, index) => `images/previews/${folder}/${pad(index + 1)}.webp`);

  const DECKS = [
    {
      id: "PPT—001",
      short: "ODYSSEY",
      title: "国泰逸旅 航司介绍",
      titleHtml: "国泰逸旅<br>航司介绍",
      description: "围绕虚构航空品牌构建的航司介绍演示，包含品牌定位、服务体验与视觉叙事。",
      frames: makeFrames("ppt-01", 19),
      previews: makePreviews("ppt-01", 19),
    },
    {
      id: "PPT—002",
      short: "UMA / OO",
      title: "UMA 协议与乐观预言机",
      titleHtml: "UMA 协议与<br>乐观预言机",
      description: "围绕 UMA 协议与乐观预言机展开的技术介绍与机制分析，以规格书式结构梳理复杂信息。",
      frames: makeFrames("ppt-02", 14),
      previews: makePreviews("ppt-02", 14),
    },
  ];

  const NOTES = [
    {
      id: "RED—001",
      title: "边狱巴士游戏简评",
      cover: "images/xiaohongshu/cover-01.jpg",
      preview: "images/previews/xiaohongshu/cover-01.webp",
      url: "https://www.xiaohongshu.com/explore/69d9610e00000000230046f7",
    },
    {
      id: "RED—002",
      title: "终末地游戏简评",
      cover: "images/xiaohongshu/cover-02.jpg",
      preview: "images/previews/xiaohongshu/cover-02.webp",
      url: "https://www.xiaohongshu.com/explore/69dd276e000000001f00182e",
    },
    {
      id: "RED—003",
      title: "浣熊推币机游戏简评",
      cover: "images/xiaohongshu/cover-03.jpg",
      preview: "images/previews/xiaohongshu/cover-03.webp",
      url: "https://www.xiaohongshu.com/explore/69e3cbc8000000002301d010",
    },
    {
      id: "RED—004",
      title: "漫威争锋游戏简评",
      cover: "images/xiaohongshu/cover-04.jpg",
      preview: "images/previews/xiaohongshu/cover-04.webp",
      url: "https://www.xiaohongshu.com/explore/69ebe388000000001a0371e8",
    },
    {
      id: "RED—005",
      title: "异环游戏简评",
      cover: "images/xiaohongshu/cover-05.jpg",
      preview: "images/previews/xiaohongshu/cover-05.webp",
      url: "https://www.xiaohongshu.com/explore/69efa1c5000000001f007f0f",
    },
  ];

  const PROCESS = [
    {
      code: "OBSERVE",
      title: "观察内容与语境",
      copy: "先理解主题、受众和内容密度，再决定视觉方向。风格从信息出发，而不是先套模板。",
    },
    {
      code: "STRUCTURE",
      title: "建立信息骨架",
      copy: "整理叙事顺序、层级和阅读路径，让复杂内容先变得清晰，再进入画面设计。",
    },
    {
      code: "DESIGN",
      title: "设计视觉系统",
      copy: "用字体、色彩、网格与图形建立统一规则，让每一页既有个性，也属于同一个系统。",
    },
    {
      code: "REVIEW",
      title: "校验节奏与细节",
      copy: "检查文字、对齐、留白、动效与真实使用场景，确保表达准确、阅读顺畅。",
    },
    {
      code: "ARCHIVE",
      title: "归档与持续迭代",
      copy: "把完成的作品沉淀为可回看的档案，同时保留下一轮修改与扩展的空间。",
    },
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const compactLayout = window.matchMedia("(max-width: 820px)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const state = {
    activeDeck: 0,
    activeNote: 0,
    activeSection: "overview",
    previewFrame: 0,
    viewerDeck: 0,
    viewerFrame: 0,
    viewerToken: 0,
    featureToken: 0,
    scrollQueued: false,
    pointerQueued: false,
    pointerX: window.innerWidth / 2,
    pointerY: window.innerHeight / 2,
    featureManualUntil: 0,
    noteManualUntil: 0,
    toastTimer: null,
    opener: null,
  };

  const dom = {};

  function cacheDom() {
    Object.assign(dom, {
      root: document.documentElement,
      body: document.body,
      boot: $("#boot-screen"),
      reticle: $("#pointer-reticle"),
      globalProgress: $("#global-progress-bar"),
      systemPath: $("#system-path"),
      clock: $("#clock"),
      menuToggle: $("#menu-toggle"),
      mobileMenu: $("#mobile-menu"),
      hero: $("#overview"),
      heroStage: $("#hero-stage"),
      heroSpecimen: $("#hero-specimen"),
      coordX: $("#coord-x"),
      coordY: $("#coord-y"),
      feature: $("#selected"),
      featureStage: $("#feature-stage"),
      featureBreadcrumb: $("#feature-breadcrumb"),
      featureNumber: $("#feature-number"),
      featureTitle: $("#feature-title"),
      featureDescription: $("#feature-description"),
      featurePages: $("#feature-pages"),
      openFeatureDeck: $("#open-feature-deck"),
      deckConsole: $("#deck-console"),
      deckConsoleId: $("#deck-console-id"),
      deckConsoleCounter: $("#deck-console-counter"),
      deckScrubProgress: $("#deck-scrub-progress"),
      featureImage: $("#feature-image"),
      deckFragments: $("#deck-fragments"),
      featureStateProgress: $("#feature-state-progress"),
      featureStateLabel: $("#feature-state-label"),
      rednote: $("#rednote"),
      rednoteStage: $("#rednote-stage"),
      rednoteTrack: $("#rednote-track"),
      rednoteId: $("#rednote-id"),
      rednoteTitle: $("#rednote-title"),
      rednoteIndex: $("#rednote-index"),
      rednoteLink: $("#rednote-link"),
      processCode: $("#process-code"),
      processNumber: $("#process-number"),
      processTitle: $("#process-title"),
      processCopy: $("#process-copy"),
      copyEmail: $("#copy-email"),
      viewer: $("#deck-viewer"),
      viewerTitle: $("#viewer-title"),
      viewerDeckId: $("#viewer-deck-id"),
      viewerCounter: $("#viewer-counter"),
      viewerFile: $("#viewer-file"),
      viewerImage: $("#viewer-image"),
      viewerImageWrap: $(".viewer-image-wrap"),
      viewerThumbs: $("#viewer-thumbs"),
      viewerPrev: $("#viewer-prev"),
      viewerNext: $("#viewer-next"),
      viewerClose: $("#viewer-close"),
      toast: $("#toast"),
    });
  }

  function runBootSequence() {
    if (!dom.boot) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("arelius-booted") === "1";
      sessionStorage.setItem("arelius-booted", "1");
    } catch (_) {
      seen = false;
    }

    const delay = reducedMotion.matches ? 0 : seen ? 260 : 1120;
    window.setTimeout(() => dom.boot.classList.add("is-complete"), delay);
  }

  function updateClock() {
    if (!dom.clock) return;
    const formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
    dom.clock.textContent = `UTC+09 / ${formatted}`;
  }

  function renderRednotes() {
    const fragment = document.createDocumentFragment();

    NOTES.forEach((note, index) => {
      const button = document.createElement("button");
      button.className = `rednote-card${index === state.activeNote ? " is-active" : ""}`;
      button.type = "button";
      button.dataset.noteIndex = String(index);
      button.setAttribute("aria-label", `检视 ${note.title}`);
      button.setAttribute("aria-pressed", index === state.activeNote ? "true" : "false");
      button.innerHTML = `
        <img src="${note.preview}" alt="${note.title}封面" width="900" height="1200" loading="lazy" decoding="async">
        <span class="rednote-card__label"><span>${note.id}</span><span>${pad(index + 1)} / ${pad(NOTES.length)}</span></span>
      `;
      fragment.appendChild(button);
    });

    dom.rednoteTrack.replaceChildren(fragment);
  }

  function renderDeckFragments(deckIndex) {
    const deck = DECKS[deckIndex];
    const points = [
      1,
      Math.max(2, Math.round(deck.frames.length * 0.34)),
      Math.max(3, Math.round(deck.frames.length * 0.62)),
      deck.frames.length - 2,
    ];
    const positions = [
      { left: "0%", top: "14%", x: "-18px", y: "8px", r: "-4deg" },
      { left: "25%", top: "0%", x: "0px", y: "0px", r: "2deg" },
      { left: "51%", top: "18%", x: "10px", y: "-6px", r: "-2deg" },
      { left: "77%", top: "4%", x: "20px", y: "6px", r: "4deg" },
    ];

    const fragment = document.createDocumentFragment();
    points.forEach((frameIndex, index) => {
      const frame = document.createElement("span");
      const pos = positions[index];
      frame.className = "deck-fragment";
      frame.style.left = pos.left;
      frame.style.top = pos.top;
      frame.style.setProperty("--fragment-x", pos.x);
      frame.style.setProperty("--fragment-y", pos.y);
      frame.style.setProperty("--fragment-r", pos.r);
      frame.innerHTML = `<img src="${deck.previews[frameIndex]}" alt="" loading="lazy" decoding="async">`;
      fragment.appendChild(frame);
    });
    dom.deckFragments.replaceChildren(fragment);
  }

  function syncProjectRail(type, index) {
    $$('.project-chip[data-project-type]').forEach((button) => {
      const active = button.dataset.projectType === type && Number(button.dataset.projectIndex) === index;
      button.classList.toggle("is-active", active);
    });
  }

  function setActiveDeck(index, options = {}) {
    const next = clamp(Number(index) || 0, 0, DECKS.length - 1);
    const deck = DECKS[next];
    const changed = next !== state.activeDeck;
    state.activeDeck = next;
    state.previewFrame = 0;

    dom.featureBreadcrumb.textContent = deck.id;
    dom.featureNumber.textContent = pad(next + 1);
    dom.featureTitle.innerHTML = deck.titleHtml;
    dom.featureDescription.textContent = deck.description;
    dom.featurePages.textContent = `${deck.frames.length} SLIDES`;
    dom.openFeatureDeck.dataset.openDeck = String(next);
    dom.deckConsoleId.textContent = `${deck.id} / FRAME 01`;
    dom.featureImage.alt = `${deck.title}第 1 页`;
    dom.featureStateLabel.textContent = `${pad(next + 1)} / ${pad(DECKS.length)}`;
    dom.featureStateProgress.style.transform = `scaleX(${(next + 1) / DECKS.length})`;

    $$('[data-deck-switch]').forEach((button) => {
      const active = Number(button.dataset.deckSwitch) === next;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    if (state.activeSection === "selected" || options.forceRail) syncProjectRail("deck", next);

    if (changed || options.force) renderDeckFragments(next);
    swapFeaturePreview(0, true);
  }

  function swapFeaturePreview(index, immediate = false) {
    const deck = DECKS[state.activeDeck];
    const next = clamp(Math.round(index), 0, deck.frames.length - 1);
    state.previewFrame = next;
    dom.deckConsoleCounter.textContent = `${pad(next + 1)} / ${pad(deck.frames.length)}`;
    dom.deckConsoleId.textContent = `${deck.id} / FRAME ${pad(next + 1)}`;
    dom.deckScrubProgress.style.transform = `scaleX(${(next + 1) / deck.frames.length})`;

    const source = deck.previews[next];
    if (dom.featureImage.getAttribute("src") === source) return;

    const token = ++state.featureToken;
    dom.featureImage.classList.add("is-loading");
    const loader = new Image();
    loader.decoding = "async";
    loader.src = source;

    const finish = () => {
      if (token !== state.featureToken) return;
      dom.featureImage.src = source;
      dom.featureImage.alt = `${deck.title}第 ${next + 1} 页`;
      if (immediate) {
        dom.featureImage.classList.remove("is-loading");
      } else {
        requestAnimationFrame(() => dom.featureImage.classList.remove("is-loading"));
      }
    };

    if (loader.decode) loader.decode().then(finish).catch(finish);
    else loader.addEventListener("load", finish, { once: true });
  }

  function setActiveNote(index, options = {}) {
    const next = clamp(Number(index) || 0, 0, NOTES.length - 1);
    const note = NOTES[next];
    state.activeNote = next;

    dom.rednoteId.textContent = note.id;
    dom.rednoteTitle.textContent = note.title;
    dom.rednoteIndex.textContent = `${pad(next + 1)} / ${pad(NOTES.length)}`;
    dom.rednoteLink.href = note.url;
    dom.rednoteLink.setAttribute("aria-label", `在小红书打开${note.title}`);

    $$('.rednote-card', dom.rednoteTrack).forEach((card, cardIndex) => {
      const active = cardIndex === next;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    if (state.activeSection === "rednote" || options.forceRail) syncProjectRail("note", next);

    positionRednoteTrack(options.animate !== false);
  }

  function positionRednoteTrack(animate = true) {
    if (compactLayout.matches || !dom.rednoteTrack.children.length) {
      dom.rednoteTrack.style.transform = "";
      return;
    }

    const card = dom.rednoteTrack.children[state.activeNote];
    const targetCenter = dom.rednoteStage.clientWidth * 0.69;
    const currentCenter = dom.rednoteTrack.offsetLeft + card.offsetLeft + card.offsetWidth / 2;
    const translate = targetCenter - currentCenter;
    dom.rednoteTrack.style.transition = animate && !reducedMotion.matches ? "transform .55s cubic-bezier(.16,1,.3,1)" : "none";
    dom.rednoteTrack.style.transform = `translate3d(${translate}px, 0, 0)`;
  }

  function setProcessStep(index) {
    const next = clamp(Number(index) || 0, 0, PROCESS.length - 1);
    const item = PROCESS[next];
    $$('.process-node').forEach((node, nodeIndex) => node.classList.toggle("is-active", nodeIndex === next));
    dom.processCode.textContent = `NODE—${pad(next + 1)} / ${item.code}`;
    dom.processNumber.textContent = pad(next + 1);
    dom.processTitle.textContent = item.title;
    dom.processCopy.textContent = item.copy;
  }

  function sceneProgress(section) {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    return clamp(-rect.top / travel);
  }

  function updateHeroScene(progress) {
    const stage = dom.heroStage;
    const intro = clamp(progress / 0.3);
    const inspect = clamp((progress - 0.15) / 0.48);
    const exit = clamp((progress - 0.72) / 0.28);
    stage.style.setProperty("--hero-copy-x", `${-34 * exit}px`);
    stage.style.setProperty("--hero-copy-y", `${-22 * exit}px`);
    stage.style.setProperty("--hero-copy-opacity", String(1 - exit * 0.82));
    stage.style.setProperty("--hero-orbit-scale", String(0.82 + intro * 0.18 + inspect * 0.1 - exit * 0.08));
    stage.style.setProperty("--hero-orbit-opacity", String(0.72 + intro * 0.28 - exit * 0.18));
    stage.style.setProperty("--orbit-rotation", `${progress * 54 - 12}deg`);
    stage.style.setProperty("--orbit-dash", String(0.22 - progress * 0.18));
    stage.style.setProperty("--hero-beam-x", String(-11 + progress * 22));
    stage.style.setProperty("--hero-beam-r", `${progress * 3 - 1.5}deg`);
    stage.style.setProperty("--ghost-one-x", `${-24 + progress * 66}px`);
    stage.style.setProperty("--ghost-one-y", `${14 - progress * 34}px`);
    stage.style.setProperty("--ghost-two-x", `${26 - progress * 62}px`);
    stage.style.setProperty("--ghost-two-y", `${-12 + progress * 30}px`);
    stage.style.setProperty("--scroll-cue-opacity", String(1 - clamp(progress / 0.18)));
  }

  function updateFeatureScene(progress) {
    dom.featureStage.style.setProperty("--feature-beam-x", `${(progress - 0.5) * 92}px`);
    dom.featureStateProgress.style.transform = `scaleX(${progress})`;

    const desiredDeck = progress < 0.5 ? 0 : 1;
    if (performance.now() > state.featureManualUntil && desiredDeck !== state.activeDeck) {
      setActiveDeck(desiredDeck);
    }

    const fragments = $$('.deck-fragment', dom.deckFragments);
    fragments.forEach((fragment, index) => {
      const local = clamp((progress - index * 0.035) / 0.55);
      fragment.style.setProperty("--fragment-opacity", String(0.18 + local * 0.55));
      fragment.style.setProperty("--fragment-y", `${(1 - local) * 36}px`);
    });
  }

  function updateRednoteScene(progress) {
    if (performance.now() <= state.noteManualUntil) return;
    const desired = Math.round(progress * (NOTES.length - 1));
    if (desired !== state.activeNote) setActiveNote(desired);
  }

  function updateScrollScenes() {
    state.scrollQueued = false;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const global = clamp(window.scrollY / maxScroll);
    dom.globalProgress.style.transform = `scaleY(${global})`;

    if (reducedMotion.matches || compactLayout.matches) return;
    updateHeroScene(sceneProgress(dom.hero));
    updateFeatureScene(sceneProgress(dom.feature));
    updateRednoteScene(sceneProgress(dom.rednote));
  }

  function queueScrollUpdate() {
    if (state.scrollQueued) return;
    state.scrollQueued = true;
    requestAnimationFrame(updateScrollScenes);
  }

  function setActiveSection(section) {
    if (!section) return;
    if (section.id !== state.activeSection) {
      state.activeSection = section.id;
      dom.systemPath.textContent = section.dataset.path || `ARCHIVE / ${section.id.toUpperCase()}`;
      $$('.mode-dock__item').forEach((link) => link.classList.toggle("is-active", link.dataset.section === section.id));
    }
    if (section.id === "overview") syncProjectRail("deck", 1);
    else if (section.id === "selected") syncProjectRail("deck", state.activeDeck);
    else if (section.id === "rednote") syncProjectRail("note", state.activeNote);
    else syncProjectRail(null, -1);
  }

  function observeSections() {
    const sections = $$('main > section[id]');
    if (!("IntersectionObserver" in window)) return;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
        const active = sections.reduce((best, section) =>
          (ratios.get(section) || 0) > (ratios.get(best) || 0) ? section : best,
        sections[0]);
        setActiveSection(active);
      },
      { rootMargin: "-18% 0px -50% 0px", threshold: [0, 0.05, 0.15, 0.3, 0.55, 0.8] }
    );
    sections.forEach((section) => observer.observe(section));
  }

  function setupRevealObserver() {
    const targets = $$('.catalog-folder, .catalog-display, .process-console, .about-copy, .contact-card');
    targets.forEach((target) => target.setAttribute("data-reveal", ""));
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );
    targets.forEach((target) => observer.observe(target));
  }

  function updatePointer() {
    state.pointerQueued = false;
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const mx = clamp((state.pointerX / width - 0.5) * 2, -1, 1);
    const my = clamp((state.pointerY / height - 0.5) * 2, -1, 1);

    dom.root.style.setProperty("--mx", mx.toFixed(3));
    dom.root.style.setProperty("--my", my.toFixed(3));
    dom.reticle.style.left = `${state.pointerX}px`;
    dom.reticle.style.top = `${state.pointerY}px`;
    dom.coordX.textContent = String(Math.round(state.pointerX)).padStart(4, "0");
    dom.coordY.textContent = String(Math.round(state.pointerY)).padStart(4, "0");
  }

  function queuePointerUpdate(event) {
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
    dom.reticle.classList.add("is-visible");
    if (state.pointerQueued) return;
    state.pointerQueued = true;
    requestAnimationFrame(updatePointer);
  }

  function setupPointerSystem() {
    dom.root.style.setProperty("--mx", "0");
    dom.root.style.setProperty("--my", "0");
    if (!finePointer.matches || reducedMotion.matches) return;

    window.addEventListener("pointermove", queuePointerUpdate, { passive: true });
    window.addEventListener("pointerenter", () => dom.reticle.classList.add("is-visible"));
    window.addEventListener("pointerleave", () => dom.reticle.classList.remove("is-visible"));

    document.addEventListener("pointerover", (event) => {
      if (event.target.closest("a, button, [data-interactive]")) dom.reticle.classList.add("is-hovering");
    });
    document.addEventListener("pointerout", (event) => {
      const next = event.relatedTarget;
      if (!next || !next.closest || !next.closest("a, button, [data-interactive]")) {
        dom.reticle.classList.remove("is-hovering");
      }
    });

    dom.rednoteTrack.addEventListener("pointermove", (event) => {
      const card = event.target.closest(".rednote-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-mx", ((event.clientX - rect.left) / rect.width - 0.5) * 2);
      card.style.setProperty("--card-my", ((event.clientY - rect.top) / rect.height - 0.5) * 2);
    });
  }

  function scrollToFeatureDeck(index) {
    if (compactLayout.matches || reducedMotion.matches) {
      dom.feature.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      return;
    }
    const travel = Math.max(0, dom.feature.offsetHeight - window.innerHeight);
    const progress = index === 0 ? 0.16 : 0.74;
    window.scrollTo({ top: dom.feature.offsetTop + travel * progress, behavior: "smooth" });
  }

  function scrollToNote(index) {
    if (compactLayout.matches || reducedMotion.matches) {
      dom.rednote.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      window.setTimeout(() => dom.rednoteTrack.children[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }), 450);
      return;
    }
    const travel = Math.max(0, dom.rednote.offsetHeight - window.innerHeight);
    window.scrollTo({ top: dom.rednote.offsetTop + travel * (index / (NOTES.length - 1)), behavior: "smooth" });
  }

  function setupProjectControls() {
    $$('.project-chip').forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.target) {
          $(chip.dataset.target)?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
          return;
        }
        const index = Number(chip.dataset.projectIndex);
        if (chip.dataset.projectType === "deck") {
          state.featureManualUntil = performance.now() + 1200;
          syncProjectRail("deck", index);
          setActiveDeck(index);
          scrollToFeatureDeck(index);
        } else if (chip.dataset.projectType === "note") {
          state.noteManualUntil = performance.now() + 1200;
          syncProjectRail("note", index);
          setActiveNote(index);
          scrollToNote(index);
        }
      });
    });

    $$('[data-deck-switch]').forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.deckSwitch);
        state.featureManualUntil = performance.now() + 1200;
        setActiveDeck(index);
        scrollToFeatureDeck(index);
      });
    });

    dom.rednoteTrack.addEventListener("click", (event) => {
      const card = event.target.closest(".rednote-card");
      if (!card) return;
      const index = Number(card.dataset.noteIndex);
      if (index === state.activeNote) {
        window.open(NOTES[index].url, "_blank", "noopener,noreferrer");
        return;
      }
      state.noteManualUntil = performance.now() + 1200;
      setActiveNote(index);
      scrollToNote(index);
    });

    $$('.process-node').forEach((node) => {
      node.querySelector("button")?.addEventListener("click", () => setProcessStep(Number(node.dataset.node)));
    });
  }

  function setupDeckScrubber() {
    let lastSwap = 0;
    dom.deckConsole.addEventListener("pointermove", (event) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const now = performance.now();
      if (now - lastSwap < 74) return;
      const rect = dom.deckConsole.getBoundingClientRect();
      const ratio = clamp((event.clientX - rect.left) / rect.width);
      const next = Math.round(ratio * (DECKS[state.activeDeck].frames.length - 1));
      if (next === state.previewFrame) return;
      lastSwap = now;
      swapFeaturePreview(next);
    });
    dom.deckConsole.addEventListener("click", () => openViewer(state.activeDeck, state.previewFrame, dom.deckConsole));
    dom.deckConsole.tabIndex = 0;
    dom.deckConsole.setAttribute("role", "button");
    dom.deckConsole.setAttribute("aria-label", "移动指针预览页面；点击打开完整幻灯片");
    dom.deckConsole.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openViewer(state.activeDeck, state.previewFrame, dom.deckConsole);
      }
    });
  }

  function renderViewerThumbs() {
    const deck = DECKS[state.viewerDeck];
    const fragment = document.createDocumentFragment();

    deck.frames.forEach((source, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `viewer-thumb${index === state.viewerFrame ? " is-active" : ""}`;
      button.dataset.frameIndex = String(index);
      button.setAttribute("aria-label", `查看第 ${index + 1} 页`);
      button.innerHTML = `<span>${pad(index + 1)}</span>`;
      fragment.appendChild(button);
    });

    dom.viewerThumbs.replaceChildren(fragment);
    updateViewerThumbWindow();
  }

  function updateViewerThumbWindow() {
    const deck = DECKS[state.viewerDeck];
    $$('.viewer-thumb', dom.viewerThumbs).forEach((button, index) => {
      const active = index === state.viewerFrame;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");

      if (Math.abs(index - state.viewerFrame) <= 3 && !button.querySelector("img")) {
        const image = document.createElement("img");
        image.src = deck.previews[index];
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        button.replaceChildren(image);
      }
    });

    dom.viewerThumbs.children[state.viewerFrame]?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", inline: "center", block: "nearest" });
  }

  function preloadViewerNeighbors() {
    const deck = DECKS[state.viewerDeck];
    [state.viewerFrame - 1, state.viewerFrame + 1].forEach((index) => {
      if (index < 0 || index >= deck.frames.length) return;
      const image = new Image();
      image.src = deck.frames[index];
    });
  }

  function showViewerFrame(index, direction = 0) {
    const deck = DECKS[state.viewerDeck];
    const next = clamp(Math.round(index), 0, deck.frames.length - 1);
    state.viewerFrame = next;
    const token = ++state.viewerToken;

    dom.viewerCounter.textContent = `${pad(next + 1)} / ${pad(deck.frames.length)}`;
    dom.viewerFile.textContent = `FRAME_${pad(next + 1)}.JPG`;
    dom.viewerPrev.disabled = next === 0;
    dom.viewerNext.disabled = next === deck.frames.length - 1;
    dom.viewerImage.classList.add("is-loading");
    dom.viewerImageWrap.classList.remove("is-scanning");

    const source = deck.frames[next];
    const loader = new Image();
    loader.decoding = "async";
    loader.src = source;

    const finish = () => {
      if (token !== state.viewerToken) return;
      dom.viewerImage.src = source;
      dom.viewerImage.alt = `${deck.title}第 ${next + 1} 页`;
      dom.viewerImage.dataset.direction = String(direction);
      requestAnimationFrame(() => {
        dom.viewerImage.classList.remove("is-loading");
        dom.viewerImageWrap.classList.add("is-scanning");
      });
      updateViewerThumbWindow();
      preloadViewerNeighbors();
    };

    if (loader.decode) loader.decode().then(finish).catch(finish);
    else loader.addEventListener("load", finish, { once: true });
  }

  function openViewer(deckIndex, frameIndex = 0, opener = document.activeElement) {
    if (!dom.viewer || typeof dom.viewer.showModal !== "function") return;
    state.viewerDeck = clamp(Number(deckIndex) || 0, 0, DECKS.length - 1);
    state.viewerFrame = clamp(Number(frameIndex) || 0, 0, DECKS[state.viewerDeck].frames.length - 1);
    state.opener = opener instanceof HTMLElement ? opener : null;
    const deck = DECKS[state.viewerDeck];

    dom.viewerTitle.textContent = deck.title;
    dom.viewerDeckId.textContent = deck.id;
    renderViewerThumbs();
    dom.viewer.showModal();
    dom.body.classList.add("viewer-open");
    showViewerFrame(state.viewerFrame);
    dom.viewerClose.focus({ preventScroll: true });
  }

  function closeViewer() {
    if (dom.viewer.open) dom.viewer.close();
  }

  function setupViewer() {
    $$('[data-open-deck]').forEach((button) => {
      button.addEventListener("click", () => openViewer(Number(button.dataset.openDeck), 0, button));
    });
    dom.viewerPrev.addEventListener("click", () => showViewerFrame(state.viewerFrame - 1, -1));
    dom.viewerNext.addEventListener("click", () => showViewerFrame(state.viewerFrame + 1, 1));
    dom.viewerClose.addEventListener("click", closeViewer);
    dom.viewerThumbs.addEventListener("click", (event) => {
      const button = event.target.closest(".viewer-thumb");
      if (button) showViewerFrame(Number(button.dataset.frameIndex), Number(button.dataset.frameIndex) > state.viewerFrame ? 1 : -1);
    });
    dom.viewer.addEventListener("click", (event) => {
      if (event.target === dom.viewer) closeViewer();
    });
    dom.viewer.addEventListener("close", () => {
      dom.body.classList.remove("viewer-open");
      state.viewerToken += 1;
      state.opener?.focus({ preventScroll: true });
    });
    dom.viewer.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showViewerFrame(state.viewerFrame - 1, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showViewerFrame(state.viewerFrame + 1, 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        showViewerFrame(0, -1);
      } else if (event.key === "End") {
        event.preventDefault();
        showViewerFrame(DECKS[state.viewerDeck].frames.length - 1, 1);
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
      }
    });

    let touchStart = 0;
    dom.viewer.addEventListener("touchstart", (event) => {
      touchStart = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });
    dom.viewer.addEventListener("touchend", (event) => {
      const delta = (event.changedTouches[0]?.clientX || 0) - touchStart;
      if (Math.abs(delta) < 48) return;
      showViewerFrame(state.viewerFrame + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    }, { passive: true });
  }

  async function copyEmail() {
    const email = dom.copyEmail.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (_) {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    showToast("CONTACT CHANNEL COPIED");
  }

  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("is-visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => dom.toast.classList.remove("is-visible"), 1800);
  }

  function setupMenu() {
    dom.menuToggle.addEventListener("click", () => {
      const open = dom.menuToggle.getAttribute("aria-expanded") === "true";
      dom.menuToggle.setAttribute("aria-expanded", String(!open));
      dom.menuToggle.setAttribute("aria-label", open ? "打开导航" : "关闭导航");
      dom.mobileMenu.hidden = open;
    });
    $$('a', dom.mobileMenu).forEach((link) => {
      link.addEventListener("click", () => {
        dom.mobileMenu.hidden = true;
        dom.menuToggle.setAttribute("aria-expanded", "false");
        dom.menuToggle.setAttribute("aria-label", "打开导航");
      });
    });
  }

  function setupResponsiveMotion() {
    const refresh = () => {
      positionRednoteTrack(false);
      queueScrollUpdate();
    };
    compactLayout.addEventListener?.("change", refresh);
    reducedMotion.addEventListener?.("change", refresh);
    window.addEventListener("resize", refresh, { passive: true });
  }

  function init() {
    cacheDom();
    runBootSequence();
    updateClock();
    window.setInterval(updateClock, 1000);
    renderRednotes();
    setActiveDeck(0, { force: true });
    setActiveNote(0, { animate: false });
    syncProjectRail("deck", 1);
    setProcessStep(0);
    setupProjectControls();
    setupDeckScrubber();
    setupViewer();
    setupPointerSystem();
    setupMenu();
    setupResponsiveMotion();
    setupRevealObserver();
    observeSections();
    dom.copyEmail.addEventListener("click", copyEmail);
    window.addEventListener("scroll", queueScrollUpdate, { passive: true });
    queueScrollUpdate();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
