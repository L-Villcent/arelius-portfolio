(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smoothstep = (value) => {
    const amount = clamp(value);
    return amount * amount * (3 - 2 * amount);
  };
  const mix = (from, to, amount) => from + (to - from) * amount;
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
      scene: "observe",
      title: "观察内容与语境",
      copy: "先理解主题、受众和内容密度，再决定视觉方向。风格从信息出发，而不是先套模板。",
      signal: "RAW SIGNAL / CONTEXT",
      output: "CONTEXT MAP",
      angle: -66,
      route: 0.16,
    },
    {
      code: "STRUCTURE",
      scene: "structure",
      title: "建立信息骨架",
      copy: "整理叙事顺序、层级和阅读路径，让复杂内容先变得清晰，再进入画面设计。",
      signal: "SORTED SIGNAL / HIERARCHY",
      output: "INFORMATION ARCHITECTURE",
      angle: -28,
      route: 0.34,
    },
    {
      code: "DESIGN",
      scene: "design",
      title: "设计视觉系统",
      copy: "用字体、色彩、网格与图形建立统一规则，让每一页既有个性，也属于同一个系统。",
      signal: "GRID / TYPE / COLOR",
      output: "VISUAL SYSTEM",
      angle: 10,
      route: 0.52,
    },
    {
      code: "REVIEW",
      scene: "review",
      title: "校验节奏与细节",
      copy: "检查文字、对齐、留白、动效与真实使用场景，确保表达准确、阅读顺畅。",
      signal: "MEASURE / VALIDATE",
      output: "VALIDATED FRAME",
      angle: 48,
      route: 0.72,
    },
    {
      code: "ARCHIVE",
      scene: "archive",
      title: "归档与持续迭代",
      copy: "把完成的作品沉淀为可回看的档案，同时保留下一轮修改与扩展的空间。",
      signal: "PACKAGE / VERSION",
      output: "ARCHIVE PACKAGE",
      angle: 86,
      route: 0.92,
    },
  ];

  const SECTION_META = {
    overview: { index: 0, label: "OVERVIEW", context: "SEC_00 / OVERVIEW", dark: false },
    catalog: { index: 1, label: "ARCHIVE DIRECTORY", context: "SEC_01 / DIRECTORY", dark: false },
    selected: { index: 2, label: "PRESENTATION DECKS", context: "SEC_02 / DECKS", dark: true },
    rednote: { index: 3, label: "REDNOTE ARRAY", context: "SEC_03 / NOTES", dark: false },
    process: { index: 4, label: "PROCESS MODULE", context: "SEC_04 / PROCESS", dark: false },
    about: { index: 5, label: "IDENTITY", context: "SEC_05 / IDENTITY", dark: true },
  };

  const CARRIER_STATES = {
    overview: { points: [1150, -180, 900, 80, 780, 300, 650, 520, 510, 760, 270, 930, -130, 1160], width: 320, opacity: 0.82, code: "ACQUIRE" },
    catalog: { points: [1080, -80, 830, 180, 720, 360, 590, 500, 450, 650, 320, 830, 120, 1080], width: 18, opacity: 0.7, code: "ROUTE" },
    selected: { points: [-120, 980, 200, 820, 410, 640, 610, 430, 760, 270, 900, 80, 1120, -140], width: 300, opacity: 0.76, code: "PROJECT" },
    rednote: { points: [-120, 220, 220, 260, 390, 420, 580, 560, 760, 690, 910, 740, 1120, 780], width: 220, opacity: 0.72, code: "SPECIMEN" },
    process: { points: [1100, 190, 780, 20, 360, 100, 250, 430, 145, 750, 520, 980, 960, 690], width: 150, opacity: 0.68, code: "CALIBRATE" },
    about: { points: [-100, 900, 230, 800, 520, 620, 710, 390, 850, 220, 920, 90, 1100, -80], width: 12, opacity: 0.76, code: "VERIFIED" },
  };

  const CATALOG_NODES = [
    { code: "SEC—02 / LOCKED", title: "PRESENTATION DECKS", meta: "02 FILES / ACTIVE NODE" },
    { code: "SEC—03 / LOCKED", title: "REDNOTE COVER ARRAY", meta: "05 FILES / ACTIVE NODE" },
    { code: "SEC—04 / LOCKED", title: "PROCESS MODULE", meta: "05 NODES / ACTIVE NODE" },
    { code: "SEC—05 / LOCKED", title: "IDENTITY CHANNEL", meta: "01 PROFILE / ACTIVE NODE" },
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const compactLayout = window.matchMedia("(max-width: 820px), (max-height: 620px), (max-width: 1180px) and (max-height: 720px), (hover: none) and (pointer: coarse)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const state = {
    activeDeck: 0,
    activeNote: 0,
    activeSection: "overview",
    featureMix: 0,
    featureDirection: 1,
    previewFrame: 0,
    previewFrames: [0, 0],
    featureTokens: [0, 0],
    viewerDeck: 0,
    viewerFrame: 0,
    viewerToken: 0,
    scrollQueued: false,
    scrollIdleTimer: null,
    spineTimer: null,
    pointerX: window.innerWidth / 2,
    pointerY: window.innerHeight / 2,
    pointerTargetX: 0,
    pointerTargetY: 0,
    pointerCurrentX: 0,
    pointerCurrentY: 0,
    pointerFarX: 0,
    pointerFarY: 0,
    pointerMicroX: 0,
    pointerMicroY: 0,
    heroLocalTargetX: 0,
    heroLocalTargetY: 0,
    heroLocalCurrentX: 0,
    heroLocalCurrentY: 0,
    heroProximityTarget: 0,
    heroProximityCurrent: 0,
    heroScrollLock: 0,
    heroPhase: "",
    pointerFrame: 0,
    pointerTime: 0,
    pointerEnabled: false,
    tiltCard: null,
    tiltX: 0,
    tiltY: 0,
    activeCatalog: 0,
    catalogCommitted: 0,
    continuityCommittedId: "overview",
    continuityBaseColor: "#fbfbf8",
    continuityPendingId: "",
    continuityCommitFrame: 0,
    continuityEpoch: 0,
    continuityBusLength: 0,
    continuityNodeProgresses: [],
    activeProcess: 0,
    processToken: 0,
    processSwapTimer: null,
    processFinishTimer: null,
    drawerOpen: false,
    projectStatusTimer: null,
    drawerFocusTimer: null,
    mobileMenuTimer: null,
    chromeHeight: 0,
    layoutMetrics: {},
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
      projectContextCode: $("#project-context-code"),
      projectNodes: $("#project-nodes"),
      projectStatus: $(".project-status"),
      projectStatusImage: $("#project-status-image"),
      projectStatusCode: $("#project-status-code"),
      projectStatusName: $("#project-status-name"),
      projectStatusCount: $("#project-status-count"),
      archiveDrawerToggle: $("#archive-drawer-toggle"),
      archiveDrawer: $("#archive-drawer"),
      modeDock: $("#mode-dock"),
      archiveSpine: $("#archive-spine"),
      archiveSpineIndex: $("#archive-spine-index"),
      archiveSpineLabel: $("#archive-spine-label"),
      transitionField: $("#transition-field"),
      transitionFieldCode: $("#transition-field-code"),
      archiveCarrier: $("#archive-carrier"),
      archiveCarrierHalo: $("#archive-carrier-halo"),
      archiveCarrierBody: $("#archive-carrier-body"),
      archiveCarrierTrace: $("#archive-carrier-trace"),
      archiveCarrierPulse: $("#archive-carrier-pulse"),
      archiveCarrierCode: $("#archive-carrier-code"),
      continuityBus: $("#continuity-bus"),
      continuityBusPath: $(".continuity-bus__track"),
      continuityBusPulse: $("#continuity-bus-pulse"),
      continuityBusNodes: $$('[data-bus-section]'),
      continuityBusCode: $("#continuity-bus-code"),
      hero: $("#overview"),
      heroStage: $("#hero-stage"),
      heroSpecimen: $("#hero-specimen"),
      specimenOrbit: $("#specimen-orbit"),
      specimenLock: $("#specimen-lock"),
      heroAcquisitionState: $("#hero-acquisition-state"),
      heroLockValue: $("#hero-lock-value"),
      heroAcquisitionBar: $("#hero-acquisition-bar"),
      heroIdentityState: $("#hero-identity-state"),
      heroTelemetryState: $("#hero-telemetry-state"),
      heroIdentity: $(".hero-identity"),
      heroMetrics: $(".hero-metrics"),
      coordX: $("#coord-x"),
      coordY: $("#coord-y"),
      coordLock: $("#coord-lock"),
      catalog: $("#catalog"),
      catalogStage: $("#catalog-stage"),
      catalogStack: $("#catalog-stack"),
      catalogFolders: $$(".catalog-folder"),
      catalogDisplay: $("#catalog-display"),
      catalogRadar: $("#catalog-radar"),
      catalogPreviewNumber: $("#catalog-preview-number"),
      catalogRouterCounter: $("#catalog-router-counter"),
      catalogReadoutCode: $("#catalog-readout-code"),
      catalogReadoutTitle: $("#catalog-readout-title"),
      catalogReadoutMeta: $("#catalog-readout-meta"),
      about: $("#about"),
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
      featureCopyPayload: $("#feature-copy-payload"),
      featureScreen: $("#feature-screen"),
      featureImages: $$("[data-feature-image]"),
      featureImageLayers: $$("[data-feature-layer]"),
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
      rednoteInfo: $(".rednote-info"),
      processConsole: $("#process-console"),
      processEngine: $("#process-engine"),
      processEngineLabel: $("#process-engine-label"),
      processEngineOutput: $("#process-engine-output"),
      processStatusOutput: $("#process-status-output"),
      processStatusState: $("#process-status-state"),
      processReadout: $(".process-readout"),
      processNodes: $$(".process-node"),
      processMeter: $$(".process-readout__meter i"),
      identityCard: $(".identity-card"),
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

  function renderDeckFragments() {
    const positions = [
      { left: "0%", top: "14%", x: "-18px", y: "8px", r: "-4deg" },
      { left: "25%", top: "0%", x: "0px", y: "0px", r: "2deg" },
      { left: "51%", top: "18%", x: "10px", y: "-6px", r: "-2deg" },
      { left: "77%", top: "4%", x: "20px", y: "6px", r: "4deg" },
    ];

    const root = document.createDocumentFragment();

    DECKS.forEach((deck, deckIndex) => {
      const points = [
        1,
        Math.max(2, Math.round(deck.frames.length * 0.34)),
        Math.max(3, Math.round(deck.frames.length * 0.62)),
        deck.frames.length - 2,
      ];
      const layer = document.createElement("div");
      layer.className = "deck-fragments__layer";
      layer.dataset.deckFragmentLayer = String(deckIndex);

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
        layer.appendChild(frame);
      });

      root.appendChild(layer);
    });

    dom.deckFragments.replaceChildren(root);
    dom.deckFragmentLayers = $$(".deck-fragments__layer", dom.deckFragments);
    dom.deckFragmentItems = $$(".deck-fragment", dom.deckFragments);
  }

  function positionProjectRailCursor(activeNode = $(".project-chip.is-active", dom.projectNodes)) {
    if (!dom.projectNodes || !activeNode) return;
    const firstNode = $(".project-chip", dom.projectNodes);
    const offset = firstNode ? activeNode.offsetLeft - firstNode.offsetLeft : 0;
    dom.projectNodes.style.setProperty("--node-x", `${offset}px`);
  }

  function syncProjectRail(type, index) {
    let activeNode = null;
    $$('[data-project-type][data-project-index]').forEach((button) => {
      const active = button.dataset.projectType === type && Number(button.dataset.projectIndex) === index;
      button.classList.toggle("is-active", active);
      if (button.classList.contains("project-chip")) button.setAttribute("aria-current", active ? "true" : "false");
      if (active && button.classList.contains("project-chip")) activeNode = button;
    });

    if (!activeNode) return;
    const position = type === "deck" ? index : DECKS.length + index;
    positionProjectRailCursor(activeNode);

    const nextCode = activeNode.dataset.projectCode || "ARCHIVE FILE";
    const nextName = activeNode.dataset.projectName || "ACTIVE SPECIMEN";
    const nextImage = activeNode.dataset.projectImage || "";
    const currentCode = dom.projectStatusCode?.textContent;
    if (currentCode === nextCode) return;

    window.clearTimeout(state.projectStatusTimer);
    dom.projectStatus?.classList.add("is-swapping");
    state.projectStatusTimer = window.setTimeout(() => {
      if (nextImage) dom.projectStatusImage.src = nextImage;
      dom.projectStatusCode.textContent = nextCode;
      dom.projectStatusName.textContent = nextName;
      dom.projectStatusCount.textContent = `${pad(position + 1)} / ${pad(DECKS.length + NOTES.length)}`;
      requestAnimationFrame(() => dom.projectStatus?.classList.remove("is-swapping"));
    }, reducedMotion.matches ? 0 : 120);
  }

  function setArchiveDrawer(open, restoreFocus = false) {
    window.clearTimeout(state.drawerFocusTimer);
    state.drawerOpen = Boolean(open);
    dom.archiveDrawer.classList.toggle("is-open", state.drawerOpen);
    dom.archiveDrawer.setAttribute("aria-hidden", String(!state.drawerOpen));
    dom.archiveDrawerToggle.setAttribute("aria-expanded", String(state.drawerOpen));
    dom.archiveDrawerToggle.setAttribute("aria-label", state.drawerOpen ? "关闭完整档案目录" : "打开完整档案目录");
    dom.body.classList.toggle("drawer-open", state.drawerOpen);

    if (state.drawerOpen) {
      const active = $(".archive-drawer__item.is-active", dom.archiveDrawer) || $(".archive-drawer__item", dom.archiveDrawer);
      state.drawerFocusTimer = window.setTimeout(() => {
        if (state.drawerOpen && active?.isConnected) active.focus({ preventScroll: true });
      }, reducedMotion.matches ? 0 : 180);
    } else if (restoreFocus || dom.archiveDrawer.contains(document.activeElement)) {
      dom.archiveDrawerToggle.focus({ preventScroll: true });
    }
  }

  function setupArchiveDrawer() {
    dom.archiveDrawerToggle.addEventListener("click", () => setArchiveDrawer(!state.drawerOpen));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.drawerOpen) {
        event.preventDefault();
        setArchiveDrawer(false, true);
      }
    });
    document.addEventListener("pointerdown", (event) => {
      if (!state.drawerOpen) return;
      if (event.target.closest("#archive-drawer, #archive-drawer-toggle")) return;
      setArchiveDrawer(false);
    });
  }

  function setCatalogFolder(index, scan = true) {
    const next = clamp(Number(index) || 0, 0, CATALOG_NODES.length - 1);
    const node = CATALOG_NODES[next];
    state.activeCatalog = next;

    $$('.catalog-folder', dom.catalogStack).forEach((folder) => {
      const active = Number(folder.dataset.catalogIndex) === next;
      folder.classList.toggle("is-catalog-active", active);
      if (active) folder.setAttribute("aria-current", "location");
      else folder.removeAttribute("aria-current");
    });

    dom.catalogReadoutCode.textContent = node.code;
    dom.catalogReadoutTitle.textContent = node.title;
    dom.catalogReadoutMeta.textContent = node.meta;
    dom.catalogDisplay.dataset.node = String(next);
    dom.catalogPreviewNumber.textContent = pad(next + 1);
    dom.catalogRouterCounter.textContent = `NODE ${pad(next + 1)} / ${pad(CATALOG_NODES.length)}`;
    dom.catalogStack.style.setProperty("--catalog-bus-progress", `${(next / Math.max(1, CATALOG_NODES.length - 1)) * 100}%`);

    if (scan && !reducedMotion.matches) {
      dom.catalogRadar.classList.remove("is-scanning");
      void dom.catalogRadar.offsetWidth;
      dom.catalogRadar.classList.add("is-scanning");
    }
  }

  function setupCatalogInteraction() {
    const folders = dom.catalogFolders;
    dom.catalogStack.addEventListener("pointermove", (event) => {
      const folder = event.target.closest(".catalog-folder");
      if (!folder) return;
      const index = Number(folder.dataset.catalogIndex);
      if (!Number.isFinite(index)) return;
      dom.catalogStack.classList.add("is-interacting");
      if (index !== state.activeCatalog) setCatalogFolder(index);
    });
    folders.forEach((folder) => {
      const index = Number(folder.dataset.catalogIndex);
      folder.addEventListener("pointerenter", () => {
        dom.catalogStack.classList.add("is-interacting");
        setCatalogFolder(index);
      });
      folder.addEventListener("focus", () => {
        dom.catalogStack.classList.add("is-interacting");
        setCatalogFolder(index);
      });
      folder.addEventListener("click", () => {
        state.catalogCommitted = index;
        setCatalogFolder(index, false);
      });
    });
    dom.catalogStack.addEventListener("pointerleave", () => {
      dom.catalogStack.classList.remove("is-interacting");
      setCatalogFolder(state.catalogCommitted, false);
    });
    dom.catalogStack.addEventListener("focusout", (event) => {
      if (event.relatedTarget && dom.catalogStack.contains(event.relatedTarget)) return;
      dom.catalogStack.classList.remove("is-interacting");
      setCatalogFolder(state.catalogCommitted, false);
    });
  }

  function commitActiveDeck(index, options = {}) {
    const next = clamp(Number(index) || 0, 0, DECKS.length - 1);
    const deck = DECKS[next];
    const changed = next !== state.activeDeck;
    if (!changed && !options.force) return;

    state.activeDeck = next;
    state.previewFrame = state.previewFrames[next] || 0;
    const frame = state.previewFrame;

    dom.featureStage.dataset.activeDeck = String(next);
    dom.featureBreadcrumb.textContent = deck.id;
    dom.featureNumber.textContent = pad(next + 1);
    dom.featureTitle.innerHTML = deck.titleHtml;
    dom.featureDescription.textContent = deck.description;
    dom.featurePages.textContent = `${deck.frames.length} SLIDES`;
    dom.openFeatureDeck.dataset.openDeck = String(next);
    dom.deckConsoleId.textContent = `${deck.id} / FRAME ${pad(frame + 1)}`;
    dom.deckConsoleCounter.textContent = `${pad(frame + 1)} / ${pad(deck.frames.length)}`;
    dom.deckScrubProgress.style.transform = `scaleX(${(frame + 1) / deck.frames.length})`;
    dom.featureStateLabel.textContent = `${pad(next + 1)} / ${pad(DECKS.length)}`;
    dom.featureScreen.setAttribute("aria-label", `${deck.title}第 ${frame + 1} 页`);

    $$("[data-deck-switch]").forEach((button) => {
      const active = Number(button.dataset.deckSwitch) === next;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.tabIndex = 0;
    });

    dom.featureImageLayers.forEach((layer, layerIndex) => {
      layer.classList.toggle("is-active", layerIndex === next);
    });
    dom.deckFragmentLayers?.forEach((layer, layerIndex) => {
      layer.classList.toggle("is-active", layerIndex === next);
    });

    if (state.activeSection === "selected" || options.forceRail) syncProjectRail("deck", next);
  }

  function applyFeatureMix(value, options = {}) {
    const mixValue = clamp(value);
    const previous = state.featureMix;
    state.featureMix = mixValue;

    const distance = Math.abs(mixValue - 0.5);
    const payloadOpacity = smoothstep((distance - 0.06) / 0.26);
    const payloadPhase = mixValue < 0.5
      ? smoothstep(mixValue * 2)
      : smoothstep((1 - mixValue) * 2);
    const payloadX = (mixValue < 0.5 ? -1 : 1) * payloadPhase * 18;
    const transferEnergy = Math.sin(Math.PI * mixValue);
    const transferring = mixValue > 0.08 && mixValue < 0.92;

    dom.featureStage.style.setProperty("--deck-mix", mixValue.toFixed(4));
    dom.featureStage.style.setProperty("--deck-a-opacity", (1 - mixValue).toFixed(4));
    dom.featureStage.style.setProperty("--deck-b-opacity", mixValue.toFixed(4));
    dom.featureStage.style.setProperty("--deck-a-x", `${-12 * mixValue}px`);
    dom.featureStage.style.setProperty("--deck-b-x", `${12 * (1 - mixValue)}px`);
    dom.featureStage.style.setProperty("--deck-a-scale", String(1 + mixValue * 0.008));
    dom.featureStage.style.setProperty("--deck-b-scale", String(1.008 - mixValue * 0.008));
    dom.featureStage.style.setProperty("--deck-payload-opacity", payloadOpacity.toFixed(4));
    dom.featureStage.style.setProperty("--deck-payload-x", `${payloadX}px`);
    dom.featureStage.style.setProperty("--deck-transfer-energy", transferEnergy.toFixed(4));
    dom.featureStage.style.setProperty("--deck-transfer-x", `${mixValue * 500}%`);
    dom.featureStage.style.setProperty("--deck-switch-x", `${mixValue * 100}%`);
    dom.featureStateProgress.style.transform = `scaleX(${0.5 + mixValue * 0.5})`;
    dom.deckConsole.classList.toggle("is-transferring", transferring);
    dom.deckConsole.setAttribute("aria-busy", String(transferring));

    if (options.commit !== false) {
      if (state.activeDeck === 0 && mixValue >= 0.56) commitActiveDeck(1);
      else if (state.activeDeck === 1 && mixValue <= 0.44) commitActiveDeck(0);
    }

    state.featureDirection = mixValue >= previous ? 1 : -1;
  }

  function swapFeaturePreview(index, deckIndex = state.activeDeck, immediate = false) {
    const deck = DECKS[deckIndex];
    const next = clamp(Math.round(index), 0, deck.frames.length - 1);
    const target = dom.featureImages[deckIndex];
    if (!target) return;

    state.previewFrames[deckIndex] = next;
    if (deckIndex === state.activeDeck) {
      state.previewFrame = next;
      dom.deckConsoleCounter.textContent = `${pad(next + 1)} / ${pad(deck.frames.length)}`;
      dom.deckConsoleId.textContent = `${deck.id} / FRAME ${pad(next + 1)}`;
      dom.deckScrubProgress.style.transform = `scaleX(${(next + 1) / deck.frames.length})`;
    }

    const source = deck.previews[next];
    const token = ++state.featureTokens[deckIndex];
    if (target.getAttribute("src") === source) {
      target.classList.remove("is-loading");
      if (deckIndex === state.activeDeck) {
        dom.featureScreen.setAttribute("aria-label", `${deck.title}第 ${next + 1} 页`);
      }
      return;
    }

    target.classList.add("is-loading");
    const loader = new Image();
    loader.decoding = "async";
    loader.src = source;

    const finish = () => {
      if (token !== state.featureTokens[deckIndex]) return;
      target.src = source;
      if (deckIndex === state.activeDeck) {
        dom.featureScreen.setAttribute("aria-label", `${deck.title}第 ${next + 1} 页`);
      }
      if (immediate || reducedMotion.matches) {
        target.classList.remove("is-loading");
      } else {
        requestAnimationFrame(() => target.classList.remove("is-loading"));
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

  function renderProcessReadout(index) {
    const item = PROCESS[index];
    dom.processCode.textContent = `NODE—${pad(index + 1)} / ${item.code}`;
    dom.processNumber.textContent = pad(index + 1);
    dom.processTitle.textContent = item.title;
    dom.processCopy.textContent = item.copy;
    dom.processEngineLabel.textContent = item.signal;
    dom.processEngineOutput.textContent = `OUTPUT / ${item.output}`;
    dom.processStatusOutput.textContent = `OUTPUT / ${item.output}`;
  }

  function setProcessStep(index, options = {}) {
    const next = Math.round(clamp(Number(index) || 0, 0, PROCESS.length - 1));
    const previous = state.activeProcess;
    const item = PROCESS[next];
    const animate = options.animate !== false && next !== previous && !reducedMotion.matches;
    const direction = Math.sign(next - previous) || 1;
    const token = ++state.processToken;

    window.clearTimeout(state.processSwapTimer);
    window.clearTimeout(state.processFinishTimer);
    state.activeProcess = next;

    dom.processConsole.classList.remove("is-routing");
    dom.processConsole.dataset.processDirection = String(direction);
    dom.processConsole.style.setProperty("--process-shift", `${direction * 18}px`);
    dom.processConsole.style.setProperty("--process-angle", `${item.angle}deg`);
    if (animate) void dom.processEngine.offsetWidth;
    dom.processEngine.dataset.processState = item.scene;
    dom.processEngine.style.setProperty("--process-route-offset", String(1 - item.route));

    dom.processNodes.forEach((node, nodeIndex) => {
      const active = nodeIndex === next;
      node.classList.toggle("is-active", active);
      node.classList.toggle("is-passed", nodeIndex < next);
      node.querySelector("button")?.setAttribute("aria-pressed", String(active));
    });
    dom.processMeter.forEach((meter, meterIndex) => meter.classList.toggle("is-on", meterIndex <= next));

    if (!animate) {
      renderProcessReadout(next);
      dom.processStatusState.textContent = "STATUS / ACTIVE";
      return;
    }

    void dom.processConsole.offsetWidth;
    dom.processConsole.classList.add("is-routing");
    dom.processStatusState.textContent = "STATUS / ROUTING";
    state.processSwapTimer = window.setTimeout(() => {
      if (token !== state.processToken) return;
      renderProcessReadout(next);
    }, 210);
    state.processFinishTimer = window.setTimeout(() => {
      if (token !== state.processToken) return;
      dom.processConsole.classList.remove("is-routing");
      dom.processStatusState.textContent = "STATUS / ACTIVE";
    }, 560);
  }

  function positionContinuityBus() {
    if (!dom.continuityBusPath || !dom.continuityBusNodes?.length || !dom.sections?.length) return;
    try {
      state.continuityBusLength = dom.continuityBusPath.getTotalLength();
    } catch (_) {
      state.continuityBusLength = 0;
    }
    if (!state.continuityBusLength) return;

    const viewport = window.innerHeight;
    const chrome = state.chromeHeight;
    const anchorOffset = chrome + Math.max(120, (viewport - chrome) * 0.38);
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
    state.continuityNodeProgresses = [];

    dom.continuityBusNodes.forEach((node) => {
      const sectionId = node.dataset.busSection;
      const sectionTop = state.layoutMetrics[sectionId]?.top ?? 0;
      const progress = clamp((sectionTop - anchorOffset) / maxScroll);
      const point = dom.continuityBusPath.getPointAtLength(progress * state.continuityBusLength);
      node.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
      state.continuityNodeProgresses.push(progress);
    });
  }

  function updateContinuityBus(progress) {
    if (!dom.continuityBusPath || !state.continuityBusLength) return;
    const amount = clamp(progress);
    dom.transitionField.style.setProperty("--bus-offset", String(1 - amount));
    const point = dom.continuityBusPath.getPointAtLength(amount * state.continuityBusLength);
    dom.continuityBusPulse.setAttribute("cx", point.x.toFixed(2));
    dom.continuityBusPulse.setAttribute("cy", point.y.toFixed(2));
  }

  function carrierPath(points) {
    return `M${points[0].toFixed(2)} ${points[1].toFixed(2)} C${points[2].toFixed(2)} ${points[3].toFixed(2)} ${points[4].toFixed(2)} ${points[5].toFixed(2)} ${points[6].toFixed(2)} ${points[7].toFixed(2)} C${points[8].toFixed(2)} ${points[9].toFixed(2)} ${points[10].toFixed(2)} ${points[11].toFixed(2)} ${points[12].toFixed(2)} ${points[13].toFixed(2)}`;
  }

  function cubicPoint(startX, startY, control1X, control1Y, control2X, control2Y, endX, endY, amount) {
    const inverse = 1 - amount;
    const inverse2 = inverse * inverse;
    const amount2 = amount * amount;
    return {
      x: inverse2 * inverse * startX + 3 * inverse2 * amount * control1X + 3 * inverse * amount2 * control2X + amount2 * amount * endX,
      y: inverse2 * inverse * startY + 3 * inverse2 * amount * control1Y + 3 * inverse * amount2 * control2Y + amount2 * amount * endY,
    };
  }

  function carrierPoint(points, progress) {
    if (progress <= 0.5) {
      const amount = progress * 2;
      return cubicPoint(points[0], points[1], points[2], points[3], points[4], points[5], points[6], points[7], amount);
    }
    const amount = (progress - 0.5) * 2;
    return cubicPoint(points[6], points[7], points[8], points[9], points[10], points[11], points[12], points[13], amount);
  }

  function resolveChapterFrame(y = window.scrollY, viewport = window.innerHeight) {
    const sections = dom.sections || [];
    if (!sections.length) return null;

    const chrome = state.chromeHeight;
    const visibleHeight = Math.max(1, viewport - chrome);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport);
    let baseSection = sections[0];

    for (let index = 1; index < sections.length; index += 1) {
      const target = sections[index];
      const top = state.layoutMetrics[target.id]?.top;
      if (top == null) continue;
      const end = Math.min(Math.max(0, top - chrome), maxScroll);
      const start = Math.max(0, end - visibleHeight);

      if (y >= end - 0.5) {
        baseSection = target;
        continue;
      }
      if (y >= start) {
        return {
          from: baseSection,
          to: target,
          progress: smoothstep((y - start) / Math.max(1, end - start)),
          transitioning: true,
        };
      }
      break;
    }

    return { from: baseSection, to: baseSection, progress: 0, transitioning: false };
  }

  function updateArchiveCarrier(frame, globalProgress) {
    if (!frame || !dom.archiveCarrierBody) return;
    const fromState = CARRIER_STATES[frame.from.id] || CARRIER_STATES.overview;
    const toState = CARRIER_STATES[frame.to.id] || fromState;
    const amount = frame.transitioning ? frame.progress : 0;
    const points = fromState.points.map((value, index) => mix(value, toState.points[index], amount));
    const baseWidth = mix(fromState.width, toState.width, amount);
    const waist = frame.transitioning ? 1 - Math.sin(Math.PI * amount) * 0.88 : 1;
    const handoff = frame.transitioning ? Math.sin(Math.PI * amount) : 0;
    const compactFactor = compactLayout.matches ? 0.58 : 1;
    const width = Math.max(compactLayout.matches ? 7 : 10, baseWidth * waist * compactFactor);
    const opacity = mix(fromState.opacity, toState.opacity, amount) * (frame.transitioning ? 0.9 + waist * 0.1 : 1);
    const path = carrierPath(points);

    dom.archiveCarrierHalo.setAttribute("d", path);
    dom.archiveCarrierBody.setAttribute("d", path);
    dom.archiveCarrierTrace.setAttribute("d", path);
    dom.archiveCarrier.style.setProperty("--carrier-width", width.toFixed(2));
    dom.archiveCarrier.style.setProperty("--carrier-halo-width", (width + Math.max(34, width * 0.2)).toFixed(2));
    dom.archiveCarrier.style.setProperty("--carrier-opacity", opacity.toFixed(3));
    dom.archiveCarrier.style.setProperty("--carrier-halo-opacity", (0.075 + handoff * 0.045).toFixed(3));
    const traceBaseOpacity = compactLayout.matches ? 0.76 : 0.82;
    const tracePeakOpacity = compactLayout.matches ? 0.9 : 0.96;
    dom.archiveCarrier.style.setProperty("--carrier-trace-opacity", mix(traceBaseOpacity, tracePeakOpacity, handoff).toFixed(3));

    const pulseProgress = 0.08 + clamp(globalProgress) * 0.84;
    const pulse = carrierPoint(points, pulseProgress);
    dom.archiveCarrierPulse.setAttribute("cx", pulse.x.toFixed(2));
    dom.archiveCarrierPulse.setAttribute("cy", pulse.y.toFixed(2));
    dom.archiveCarrierCode.textContent = frame.transitioning
      ? `${fromState.code} → ${toState.code} / ${pad(Math.round(amount * 99))}`
      : `${fromState.code} / ${pad(SECTION_META[frame.from.id]?.index ?? 0)}`;
  }

  function refreshLayoutMetrics() {
    const resolvedChromeTop = parseFloat(getComputedStyle(dom.transitionField).top);
    const measuredChromeTop = dom.transitionField.getBoundingClientRect().top;
    state.chromeHeight = Number.isFinite(resolvedChromeTop) ? resolvedChromeTop : Math.max(0, measuredChromeTop);
    state.layoutMetrics = Object.fromEntries((dom.sections || []).map((section) => [section.id, {
      top: section.offsetTop,
      height: section.offsetHeight,
    }]));
    positionContinuityBus();
  }

  function sceneProgress(section, scrollY, viewport) {
    const metric = state.layoutMetrics[section.id];
    if (!metric) return 0;
    const travel = Math.max(1, metric.height - viewport);
    return clamp((scrollY - metric.top) / travel);
  }

  function sceneIsNearby(section, scrollY, viewport) {
    const metric = state.layoutMetrics[section.id];
    if (!metric) return false;
    return scrollY + viewport >= metric.top - viewport * 0.5 && scrollY <= metric.top + metric.height + viewport * 0.5;
  }

  function renderHeroLock() {
    const value = Math.round(clamp(Math.max(state.heroScrollLock, state.heroProximityCurrent * 100), 0, 100));
    dom.heroLockValue.textContent = `LOCK / ${String(value).padStart(3, "0")}%`;
    dom.coordLock.textContent = String(value).padStart(3, "0");
  }

  function setHeroPhase(phase) {
    if (phase === state.heroPhase) return;
    state.heroPhase = phase;
    dom.heroAcquisitionState.textContent = phase;
    const identityState = phase === "SYSTEM WAKE" ? "ONLINE" : phase === "ACQUIRING" ? "SCANNING" : phase === "TARGET LOCK" ? "IDENTIFIED" : "ARCHIVED";
    const telemetryState = phase === "SYSTEM WAKE" ? "STANDBY" : phase === "ACQUIRING" ? "ACQUIRE" : phase === "TARGET LOCK" ? "LOCKED" : "TRANSMIT";
    dom.heroIdentityState.textContent = identityState;
    dom.heroTelemetryState.textContent = telemetryState;
    dom.heroStage.dataset.acquisition = phase.toLowerCase().replace(" ", "-");
  }

  function updateHeroScene(progress) {
    const stage = dom.heroStage;
    const wake = smoothstep(progress / 0.18);
    const acquire = smoothstep((progress - 0.14) / 0.34);
    const lock = smoothstep((progress - 0.44) / 0.28);
    const handoff = smoothstep((progress - 0.72) / 0.28);
    const phase = progress < 0.18 ? "SYSTEM WAKE" : progress < 0.48 ? "ACQUIRING" : progress < 0.74 ? "TARGET LOCK" : "SIGNAL HANDOFF";
    const scanFocus = Math.sin(Math.PI * clamp((progress - 0.14) / 0.46));

    setHeroPhase(phase);
    state.heroScrollLock = clamp(progress / 0.68) * 100;
    renderHeroLock();

    stage.style.setProperty("--hero-wake", wake.toFixed(4));
    stage.style.setProperty("--hero-acquire", acquire.toFixed(4));
    stage.style.setProperty("--hero-lock", lock.toFixed(4));
    stage.style.setProperty("--hero-handoff", handoff.toFixed(4));
    stage.style.setProperty("--hero-copy-x", `${-42 * handoff}px`);
    stage.style.setProperty("--hero-copy-y", `${-24 * handoff}px`);
    stage.style.setProperty("--hero-copy-opacity", String(1 - handoff * 0.78));
    stage.style.setProperty("--hero-orbit-scale", String(0.84 + wake * 0.16 + acquire * 0.06 - handoff * 0.1));
    stage.style.setProperty("--hero-orbit-opacity", String(0.66 + wake * 0.34 - handoff * 0.16));
    stage.style.setProperty("--orbit-lock-scale", String(1 - lock * 0.025));
    stage.style.setProperty("--orbit-rotation", `${progress * 72 - 18 - lock * 12}deg`);
    stage.style.setProperty("--orbit-dash", String(0.24 - acquire * 0.19 + handoff * 0.06));
    stage.style.setProperty("--hero-card-x", `${handoff * 56}px`);
    stage.style.setProperty("--hero-card-y", `${(1 - wake) * 18 + handoff * 18}px`);
    stage.style.setProperty("--hero-card-z", `${24 + lock * 30 - handoff * 10}px`);
    stage.style.setProperty("--hero-card-scale", String(0.9 + wake * 0.1 + lock * 0.035 - handoff * 0.14));
    stage.style.setProperty("--hero-card-rx", `${(1 - wake) * -3.4 + handoff * 1.2}deg`);
    stage.style.setProperty("--hero-card-ry", `${(1 - wake) * 7 - lock * 2.2 + handoff * 4}deg`);
    stage.style.setProperty("--hero-lock-opacity", String(0.08 + acquire * 0.5 + lock * 0.4 - handoff * 0.58));
    stage.style.setProperty("--hero-lock-scale", String(1.12 - acquire * 0.08 - lock * 0.04 + handoff * 0.16));
    stage.style.setProperty("--hero-acquisition-progress", String(clamp(progress / 0.68)));
    stage.style.setProperty("--hero-scan-opacity", String(scanFocus * (1 - handoff)));
    stage.style.setProperty("--hero-scan-y", `${-4 + acquire * 280}px`);
    stage.style.setProperty("--hero-beam-x", `${-15 + progress * 30}%`);
    stage.style.setProperty("--hero-beam-r", `${progress * 3.8 - 1.9}deg`);
    stage.style.setProperty("--hero-beam-opacity", String((0.11 + acquire * 0.13) * (1 - handoff)));
    stage.style.setProperty("--ghost-one-x", `${6 - acquire * 22 - lock * 10 - handoff * 8}px`);
    stage.style.setProperty("--ghost-one-y", `${4 - acquire * 12 - lock * 6}px`);
    stage.style.setProperty("--ghost-two-x", `${-4 + acquire * 22 + lock * 10 + handoff * 8}px`);
    stage.style.setProperty("--ghost-two-y", `${-2 + acquire * 12 + lock * 6}px`);
    stage.style.setProperty("--hero-ghost-opacity", String(0.08 + wake * 0.07 + acquire * 0.06 - lock * 0.03 - handoff * 0.1));
    stage.style.setProperty("--scroll-cue-opacity", String(1 - clamp(progress / 0.16)));
  }

  function updateFeatureScene(progress) {
    const intro = clamp(progress / 0.12);
    const exit = clamp((progress - 0.84) / 0.16);
    dom.featureStage.style.setProperty("--feature-beam-x", `${(progress - 0.5) * 92}px`);
    dom.featureStage.style.setProperty("--feature-beam-opacity", String(0.18 * smoothstep(intro) * (1 - smoothstep(exit))));
    dom.featureStage.style.setProperty("--feature-exit", String(exit));
    dom.featureStage.style.setProperty("--feature-content-opacity", String(1 - exit * 0.46));
    dom.featureStage.style.setProperty("--feature-content-y", `${exit * -18}px`);

    const deckMix = smoothstep((progress - 0.42) / 0.16);
    applyFeatureMix(deckMix);

    const fragments = dom.deckFragmentItems || [];
    fragments.forEach((fragment, index) => {
      const local = clamp((progress - (index % 4) * 0.035) / 0.55);
      fragment.style.setProperty("--fragment-opacity", String(0.18 + local * 0.55));
      fragment.style.setProperty("--fragment-y", `${(1 - local) * 36}px`);
    });
  }

  function updateRednoteScene(progress) {
    const intro = clamp(progress / 0.12);
    const exit = clamp((progress - 0.86) / 0.14);
    dom.rednoteStage.style.setProperty("--rednote-beam-opacity", String(0.16 * smoothstep(intro) * (1 - smoothstep(exit))));
    dom.rednoteStage.style.setProperty("--rednote-exit", String(exit));
    dom.rednoteStage.style.setProperty("--rednote-content-opacity", String(1 - exit * 0.42));
    dom.rednoteStage.style.setProperty("--rednote-content-y", `${exit * -16}px`);
    if (performance.now() <= state.noteManualUntil) return;
    const desired = Math.round(progress * (NOTES.length - 1));
    if (desired !== state.activeNote) setActiveNote(desired);
  }

  function updateCatalogScene(progress) {
    const folders = dom.catalogFolders;
    const intro = clamp(progress / 0.2);
    const route = clamp((progress - 0.1) / 0.56);
    const preview = clamp((progress - 0.26) / 0.34);
    const exit = clamp((progress - 0.82) / 0.18);

    folders.forEach((folder, index) => {
      const unlock = clamp((progress - 0.055 - index * 0.045) / 0.24);
      folder.style.setProperty("--catalog-row-x", `${(1 - unlock) * -4}px`);
      folder.style.setProperty("--catalog-row-body-x", `${(1 - unlock) * 7}px`);
      folder.style.setProperty("--catalog-row-line", String(0.16 + unlock * 0.84));
    });

    dom.catalogStage.style.setProperty("--catalog-chassis-y", `${(1 - intro) * 12}px`);
    dom.catalogStage.style.setProperty("--catalog-chassis-rotate", `${2.8 - intro * 1.2}deg`);
    dom.catalogStage.style.setProperty("--catalog-chassis-opacity", String(0.82 + intro * 0.18));
    dom.catalogStage.style.setProperty("--catalog-route-fill", `${route * 100}%`);
    dom.catalogStage.style.setProperty("--catalog-handoff", String(clamp((progress - 0.58) / 0.22)));
    dom.catalogDisplay.style.setProperty("--catalog-preview-progress", String(preview));
    dom.catalogDisplay.style.setProperty("--catalog-preview-opacity", String(0.48 + preview * 0.52));
    dom.catalogDisplay.style.setProperty("--catalog-preview-y", `${(1 - preview) * 14}px`);
    dom.catalogDisplay.style.setProperty("--catalog-preview-scale", String(0.96 + preview * 0.04));
    dom.catalogDisplay.style.setProperty("--catalog-readout-opacity", String(0.56 + preview * 0.44));
    dom.catalogDisplay.style.setProperty("--catalog-readout-y", `${(1 - preview) * 9}px`);
    dom.catalogDisplay.style.opacity = String(0.74 + preview * 0.26 - exit * 0.12);
    dom.catalogStage.style.setProperty("--catalog-content-opacity", String(1 - exit * 0.18));
    dom.catalogStage.style.setProperty("--catalog-content-y", `${exit * -8}px`);
  }

  function updateActiveSection(scrollY = window.scrollY, viewport = window.innerHeight) {
    const sections = dom.sections || [];
    const chrome = state.chromeHeight;
    const anchor = scrollY + chrome + Math.max(120, (viewport - chrome) * 0.38);
    let active = sections[0];
    sections.forEach((section) => {
      if ((state.layoutMetrics[section.id]?.top ?? section.offsetTop) <= anchor) active = section;
    });
    setActiveSection(active);
  }

  function cancelContinuityCommit() {
    if (!state.continuityCommitFrame && !state.continuityPendingId) return;
    if (state.continuityCommitFrame) cancelAnimationFrame(state.continuityCommitFrame);
    state.continuityCommitFrame = 0;
    state.continuityPendingId = "";
    state.continuityEpoch += 1;
    dom.transitionField.classList.remove("is-committing");
  }

  function renderSettledContinuity(section, colorFor, instant = false) {
    const id = section.id;
    const color = colorFor(section);
    const dark = SECTION_META[id]?.dark === true;
    const transitionCode = dom.transitionFieldCode;

    if (state.continuityPendingId === id) return;
    if (instant || state.continuityBaseColor === color || state.continuityCommittedId === id) {
      cancelContinuityCommit();
      state.continuityCommittedId = id;
      state.continuityBaseColor = color;
      dom.transitionField.classList.remove("is-active", "is-committing");
      dom.transitionField.classList.toggle("is-dark", dark);
      dom.transitionField.style.setProperty("--continuity-base", color);
      dom.transitionField.style.setProperty("--continuity-next", color);
      dom.transitionField.style.setProperty("--transition-shift", "75%");
      dom.transitionField.style.setProperty("--transition-signal-x", "34vw");
      dom.transitionField.style.setProperty("--transition-grid-shift", "0px");
      dom.transitionField.style.setProperty("--transition-glow", "0");
      transitionCode.textContent = `ARCHIVE / ${SECTION_META[id]?.label || "OVERVIEW"}`;
      return;
    }

    cancelContinuityCommit();
    const epoch = state.continuityEpoch;
    state.continuityPendingId = id;
    state.continuityCommittedId = id;
    state.continuityBaseColor = color;
    dom.transitionField.classList.remove("is-active");
    dom.transitionField.classList.add("is-committing");
    dom.transitionField.classList.toggle("is-dark", dark);
    dom.transitionField.style.setProperty("--continuity-base", color);
    dom.transitionField.style.setProperty("--continuity-next", color);
    dom.transitionField.style.setProperty("--transition-shift", "-15%");
    dom.transitionField.style.setProperty("--transition-signal-x", "-34vw");
    dom.transitionField.style.setProperty("--transition-grid-shift", "0px");
    dom.transitionField.style.setProperty("--transition-glow", "0");
    transitionCode.textContent = `ARCHIVE / ${SECTION_META[id]?.label || "OVERVIEW"}`;

    state.continuityCommitFrame = requestAnimationFrame(() => {
      if (epoch !== state.continuityEpoch || state.continuityPendingId !== id) return;
      dom.transitionField.style.setProperty("--transition-shift", "75%");
      dom.transitionField.style.setProperty("--transition-signal-x", "34vw");
      dom.transitionField.classList.remove("is-committing");
      state.continuityPendingId = "";
      state.continuityCommitFrame = 0;
    });
  }

  function updateContinuity(frame) {
    if (!frame) return;
    const colorFor = (section) => SECTION_META[section.id]?.dark ? "#151b22" : "#fbfbf8";

    if (reducedMotion.matches) {
      const settled = frame.transitioning && frame.progress >= 0.5 ? frame.to : frame.from;
      renderSettledContinuity(settled, colorFor, true);
      return;
    }

    if (!frame.transitioning) {
      renderSettledContinuity(frame.from, colorFor);
      return;
    }

    cancelContinuityCommit();
    const p = frame.progress;
    const fromDark = SECTION_META[frame.from.id]?.dark === true;
    const toDark = SECTION_META[frame.to.id]?.dark === true;
    const sameTone = fromDark === toDark;
    const glow = Math.sin(Math.PI * p) * (sameTone ? 0.12 : 0.34);
    const shift = 75 - p * 90;
    const signalX = 34 - p * 68;

    state.continuityCommittedId = frame.from.id;
    state.continuityBaseColor = colorFor(frame.from);
    dom.transitionField.classList.add("is-active");
    dom.transitionField.classList.remove("is-committing");
    dom.transitionField.classList.toggle("is-dark", p >= 0.52 ? toDark : fromDark);
    dom.transitionField.style.setProperty("--continuity-base", colorFor(frame.from));
    dom.transitionField.style.setProperty("--continuity-next", colorFor(frame.to));
    dom.transitionField.style.setProperty("--transition-shift", `${shift}%`);
    dom.transitionField.style.setProperty("--transition-signal-x", `${signalX}vw`);
    dom.transitionField.style.setProperty("--transition-grid-shift", `${(p - 0.5) * 20}px`);
    dom.transitionField.style.setProperty("--transition-glow", glow.toFixed(3));
    dom.transitionFieldCode.textContent = `ARCHIVE / ${SECTION_META[frame.from.id]?.index ?? 0}→${SECTION_META[frame.to.id]?.index ?? 0} / ${pad(Math.round(p * 99))}`;
  }

  function updateScrollScenes() {
    state.scrollQueued = false;
    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
    const global = clamp(scrollY / maxScroll);
    const chapterFrame = resolveChapterFrame(scrollY, viewport);
    const compact = reducedMotion.matches || compactLayout.matches;
    const sceneUpdates = compact ? [] : [
      [dom.hero, updateHeroScene],
      [dom.catalog, updateCatalogScene],
      [dom.feature, updateFeatureScene],
      [dom.rednote, updateRednoteScene],
    ].filter(([section]) => sceneIsNearby(section, scrollY, viewport))
      .map(([section, update]) => [update, sceneProgress(section, scrollY, viewport)]);

    dom.globalProgress.style.transform = `scaleY(${global})`;
    dom.archiveSpine.style.setProperty("--spine-progress", `${global * 100}%`);
    updateContinuityBus(global);
    updateArchiveCarrier(chapterFrame, global);
    updateActiveSection(scrollY, viewport);
    updateContinuity(chapterFrame);
    sceneUpdates.forEach(([update, progress]) => update(progress));
  }

  function queueScrollUpdate() {
    dom.body.classList.add("is-scroll-scrubbing");
    window.clearTimeout(state.scrollIdleTimer);
    state.scrollIdleTimer = window.setTimeout(() => dom.body.classList.remove("is-scroll-scrubbing"), 96);
    if (state.scrollQueued) return;
    state.scrollQueued = true;
    requestAnimationFrame(updateScrollScenes);
  }

  function positionModeDockCursor(index) {
    if (!dom.modeDock) return;
    const items = $$(".mode-dock__item", dom.modeDock);
    const firstItem = items[0];
    const activeItem = items[index];
    const offset = firstItem && activeItem
      ? activeItem.offsetTop - firstItem.offsetTop
      : index * 68;
    dom.modeDock.style.setProperty("--dock-y", `${offset}px`);
    dom.modeDock.style.setProperty("--dock-x", `${index * 100}%`);
  }

  function setActiveSection(section) {
    if (!section) return;
    dom.heroStage.classList.toggle("is-orbit-live", section.id === "overview");
    if (section.id !== state.activeSection) {
      state.activeSection = section.id;
      const meta = SECTION_META[section.id] || SECTION_META.overview;
      dom.systemPath.textContent = section.dataset.path || `ARCHIVE / ${section.id.toUpperCase()}`;
      $$('.mode-dock__item').forEach((link) => {
        const active = link.dataset.section === section.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
      $$('a', dom.mobileMenu).forEach((link) => {
        if (link.getAttribute("href") === `#${section.id}`) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
      positionModeDockCursor(meta.index);
      dom.projectContextCode.textContent = meta.context;
      dom.continuityBusCode.textContent = `${meta.context} / ONLINE`;
      dom.continuityBusNodes.forEach((node) => {
        const nodeMeta = SECTION_META[node.dataset.busSection] || SECTION_META.overview;
        node.classList.toggle("is-current", nodeMeta.index === meta.index);
        node.classList.toggle("is-passed", nodeMeta.index < meta.index);
      });
      dom.archiveSpine.classList.toggle("is-dark", meta.dark);
      if (section.id !== "overview") {
        state.heroLocalTargetX = 0;
        state.heroLocalTargetY = 0;
        state.heroProximityTarget = 0;
        dom.reticle.classList.remove("is-locking");
        startPointerMotion();
      }
      dom.archiveSpine.classList.remove("is-updating");
      void dom.archiveSpine.offsetWidth;
      dom.archiveSpine.classList.add("is-updating");
      window.clearTimeout(state.spineTimer);
      state.spineTimer = window.setTimeout(() => {
        dom.archiveSpineIndex.textContent = pad(meta.index);
        dom.archiveSpineLabel.textContent = meta.label;
      }, reducedMotion.matches ? 0 : 120);

      if (section.id === "overview") syncProjectRail("deck", 1);
      else if (section.id === "selected") syncProjectRail("deck", state.activeDeck);
      else if (section.id === "rednote") syncProjectRail("note", state.activeNote);
    }
  }

  function observeSections() {
    dom.sections = $$('main > section[id]');
    refreshLayoutMetrics();
    state.activeSection = "";
    updateActiveSection(window.scrollY, window.innerHeight);
  }

  function setupRevealObserver() {
    const targets = $$('.process-console, .about-copy, .contact-card');
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

  function applyPointerDeadZone(value, zone = 0.05) {
    const amount = Math.abs(value);
    if (amount <= zone) return 0;
    return Math.sign(value) * ((amount - zone) / (1 - zone));
  }

  function updateSpatialTransforms(x, y, farX, farY, microX, microY) {
    const fixed = (value) => Number(value.toFixed(3));
    const heroLocalX = state.heroLocalCurrentX;
    const heroLocalY = state.heroLocalCurrentY;
    const heroProximity = state.heroProximityCurrent;
    dom.root.style.setProperty("--spatial-bg-x", `${fixed(farX * -3)}px`);
    dom.root.style.setProperty("--spatial-bg-y", `${fixed(farY * -2)}px`);
    dom.root.style.setProperty("--spatial-decor-x", `${fixed(x * 9)}px`);
    dom.root.style.setProperty("--spatial-decor-y", `${fixed(y * 7)}px`);
    dom.root.style.setProperty("--spatial-decor-reverse-x", `${fixed(x * -8)}px`);
    dom.root.style.setProperty("--spatial-decor-reverse-y", `${fixed(y * -6)}px`);
    dom.root.style.setProperty("--spatial-copy-x", `${fixed(farX * 4)}px`);
    dom.root.style.setProperty("--spatial-copy-y", `${fixed(farY * 3)}px`);
    dom.root.style.setProperty("--spatial-micro-x", `${fixed(microX * 3)}px`);
    dom.root.style.setProperty("--spatial-micro-y", `${fixed(microY * 2.4)}px`);
    dom.root.style.setProperty("--spatial-micro-reverse-x", `${fixed(microX * -3)}px`);
    dom.root.style.setProperty("--spatial-micro-reverse-y", `${fixed(microY * -2.4)}px`);
    dom.root.style.setProperty("--specimen-pointer-x", `${fixed(x * 6 + heroLocalX * heroProximity * 4)}px`);
    dom.root.style.setProperty("--specimen-pointer-y", `${fixed(y * 5 + heroLocalY * heroProximity * 3)}px`);
    dom.root.style.setProperty("--specimen-pointer-rx", `${fixed(y * -1.5 + heroLocalY * heroProximity * -4.5)}deg`);
    dom.root.style.setProperty("--specimen-pointer-ry", `${fixed(x * 2.2 + heroLocalX * heroProximity * 6.5)}deg`);
    dom.root.style.setProperty("--hero-ghost-avoid-x", `${fixed(heroProximity * 18)}px`);
    dom.root.style.setProperty("--hero-ghost-avoid-y", `${fixed(heroProximity * 10)}px`);
    dom.root.style.setProperty("--hero-lock-proximity", fixed(heroProximity * 0.035));
    dom.root.style.setProperty("--hero-identity-transform", `translate3d(${fixed(x * 12)}px, ${fixed(y * 8)}px, 24px) rotateY(${fixed(5 + x * 3)}deg) rotateX(${fixed(y * -2.4)}deg)`);
    dom.root.style.setProperty("--hero-metrics-transform", `translate3d(${fixed(x * 16)}px, ${fixed(y * 10)}px, 32px) rotateY(${fixed(-6 + x * 3.2)}deg) rotateX(${fixed(y * -2.6)}deg)`);
    dom.root.style.setProperty("--catalog-display-transform", `translate3d(${fixed(x * -12)}px, ${fixed(y * -8)}px, 24px) rotateY(${fixed(-6 + x * 2.5)}deg) rotateX(${fixed(y * -2)}deg)`);
    dom.root.style.setProperty("--deck-console-transform", `translate3d(${fixed(x * 15)}px, ${fixed(y * 10)}px, 38px) rotateX(${fixed(y * -2.6)}deg) rotateY(${fixed(-5 + x * 3.5)}deg)`);
    dom.root.style.setProperty("--rednote-info-transform", `translate3d(${fixed(x * 11)}px, ${fixed(y * 7)}px, 28px) rotateY(${fixed(6 + x * 2.4)}deg) rotateX(${fixed(y * -2)}deg)`);
    dom.root.style.setProperty("--process-readout-transform", `translate3d(${fixed(x * 13)}px, calc(-50% + ${fixed(y * 8)}px), 30px) rotateY(${fixed(-6 + x * 2.7)}deg) rotateX(${fixed(y * -2.1)}deg)`);
    dom.root.style.setProperty("--identity-card-transform", `translate3d(${fixed(x * 14)}px, ${fixed(y * 9)}px, 30px) rotateY(${fixed(-6 + x * 3)}deg) rotateX(${fixed(y * -2.2)}deg)`);
  }

  function updatePointer(time) {
    if (!state.pointerEnabled || reducedMotion.matches) {
      state.pointerFrame = 0;
      state.pointerTime = 0;
      return;
    }
    const delta = state.pointerTime ? Math.min(32, time - state.pointerTime) : 16;
    state.pointerTime = time;
    const blend = 1 - Math.exp(-delta / 118);
    const farBlend = 1 - Math.exp(-delta / 190);
    const microBlend = 1 - Math.exp(-delta / 76);
    const heroBlend = 1 - Math.exp(-delta / 92);
    state.pointerCurrentX += (state.pointerTargetX - state.pointerCurrentX) * blend;
    state.pointerCurrentY += (state.pointerTargetY - state.pointerCurrentY) * blend;
    state.pointerFarX += (state.pointerTargetX - state.pointerFarX) * farBlend;
    state.pointerFarY += (state.pointerTargetY - state.pointerFarY) * farBlend;
    state.pointerMicroX += (state.pointerTargetX - state.pointerMicroX) * microBlend;
    state.pointerMicroY += (state.pointerTargetY - state.pointerMicroY) * microBlend;
    state.heroLocalCurrentX += (state.heroLocalTargetX - state.heroLocalCurrentX) * heroBlend;
    state.heroLocalCurrentY += (state.heroLocalTargetY - state.heroLocalCurrentY) * heroBlend;
    state.heroProximityCurrent += (state.heroProximityTarget - state.heroProximityCurrent) * heroBlend;

    dom.root.style.setProperty("--mx", state.pointerCurrentX.toFixed(4));
    dom.root.style.setProperty("--my", state.pointerCurrentY.toFixed(4));
    updateSpatialTransforms(state.pointerCurrentX, state.pointerCurrentY, state.pointerFarX, state.pointerFarY, state.pointerMicroX, state.pointerMicroY);
    dom.reticle.style.transform = `translate3d(${state.pointerX}px, ${state.pointerY}px, 0) translate(-50%, -50%)`;
    dom.coordX.textContent = String(Math.round(state.pointerX)).padStart(4, "0");
    dom.coordY.textContent = String(Math.round(state.pointerY)).padStart(4, "0");
    dom.reticle.classList.toggle("is-locking", state.activeSection === "overview" && state.heroProximityCurrent > 0.42);
    renderHeroLock();
    if (state.tiltCard?.isConnected) {
      state.tiltCard.style.setProperty("--rednote-card-transform", `scale(1) perspective(1000px) rotateX(${(state.tiltY * -1.2).toFixed(3)}deg) rotateY(${(state.tiltX * 1.7).toFixed(3)}deg)`);
    }

    const moving = Math.abs(state.pointerTargetX - state.pointerFarX) > 0.001
      || Math.abs(state.pointerTargetY - state.pointerFarY) > 0.001
      || Math.abs(state.pointerTargetX - state.pointerMicroX) > 0.001
      || Math.abs(state.pointerTargetY - state.pointerMicroY) > 0.001
      || Math.abs(state.heroLocalTargetX - state.heroLocalCurrentX) > 0.001
      || Math.abs(state.heroLocalTargetY - state.heroLocalCurrentY) > 0.001
      || Math.abs(state.heroProximityTarget - state.heroProximityCurrent) > 0.001;
    if (moving) state.pointerFrame = requestAnimationFrame(updatePointer);
    else {
      state.pointerFrame = 0;
      state.pointerTime = 0;
    }
  }

  function startPointerMotion() {
    if (!state.pointerEnabled || reducedMotion.matches) return;
    if (!state.pointerFrame) state.pointerFrame = requestAnimationFrame(updatePointer);
  }

  function queuePointerUpdate(event) {
    if (!state.pointerEnabled || reducedMotion.matches) return;
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    state.pointerTargetX = applyPointerDeadZone(clamp((state.pointerX / width - 0.5) * 2, -1, 1));
    state.pointerTargetY = applyPointerDeadZone(clamp((state.pointerY / height - 0.5) * 2, -1, 1));
    if (state.activeSection === "overview" && dom.heroSpecimen?.isConnected) {
      const specimen = dom.heroSpecimen.getBoundingClientRect();
      const centerX = specimen.left + specimen.width / 2;
      const centerY = specimen.top + specimen.height / 2;
      const localX = clamp((event.clientX - centerX) / Math.max(1, specimen.width * 0.55), -1, 1);
      const localY = clamp((event.clientY - centerY) / Math.max(1, specimen.height * 0.72), -1, 1);
      const distance = Math.hypot(
        (event.clientX - centerX) / Math.max(1, specimen.width * 0.9),
        (event.clientY - centerY) / Math.max(1, specimen.height * 1.35)
      );
      state.heroProximityTarget = smoothstep(1 - clamp(distance));
      state.heroLocalTargetX = localX;
      state.heroLocalTargetY = localY;
    } else {
      state.heroProximityTarget = 0;
      state.heroLocalTargetX = 0;
      state.heroLocalTargetY = 0;
    }
    const card = event.target.closest?.(".rednote-card") || null;
    if (state.tiltCard && state.tiltCard !== card) state.tiltCard.style.setProperty("--rednote-card-transform", "scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)");
    state.tiltCard = card;
    if (card) {
      const rect = card.getBoundingClientRect();
      state.tiltX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      state.tiltY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    dom.reticle.classList.add("is-visible");
    startPointerMotion();
  }

  function resetPointerMotion() {
    if (state.pointerFrame) cancelAnimationFrame(state.pointerFrame);
    state.pointerFrame = 0;
    state.pointerTime = 0;
    state.pointerTargetX = 0;
    state.pointerTargetY = 0;
    state.pointerCurrentX = 0;
    state.pointerCurrentY = 0;
    state.pointerFarX = 0;
    state.pointerFarY = 0;
    state.pointerMicroX = 0;
    state.pointerMicroY = 0;
    state.heroLocalTargetX = 0;
    state.heroLocalTargetY = 0;
    state.heroLocalCurrentX = 0;
    state.heroLocalCurrentY = 0;
    state.heroProximityTarget = 0;
    state.heroProximityCurrent = 0;
    if (state.tiltCard?.isConnected) {
      state.tiltCard.style.setProperty("--rednote-card-transform", "scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)");
    }
    state.tiltCard = null;
    state.tiltX = 0;
    state.tiltY = 0;
    dom.reticle.classList.remove("is-visible", "is-hovering", "is-locking");
    dom.root.style.setProperty("--mx", "0");
    dom.root.style.setProperty("--my", "0");
    updateSpatialTransforms(0, 0, 0, 0, 0, 0);
    renderHeroLock();
  }

  function handlePointerEnter() {
    if (state.pointerEnabled) dom.reticle.classList.add("is-visible");
  }

  function handlePointerLeave() {
    if (!state.pointerEnabled) return;
    dom.reticle.classList.remove("is-visible");
    state.pointerTargetX = 0;
    state.pointerTargetY = 0;
    if (state.tiltCard?.isConnected) {
      state.tiltCard.style.setProperty("--rednote-card-transform", "scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)");
    }
    state.tiltCard = null;
    startPointerMotion();
  }

  function handleInteractivePointerOver(event) {
    if (state.pointerEnabled && event.target.closest("a, button, [data-interactive]")) {
      dom.reticle.classList.add("is-hovering");
    }
  }

  function handleInteractivePointerOut(event) {
    if (!state.pointerEnabled) return;
    const next = event.relatedTarget;
    if (!next || !next.closest || !next.closest("a, button, [data-interactive]")) {
      dom.reticle.classList.remove("is-hovering");
    }
  }

  function handleRednotePointerOut(event) {
    const card = event.target.closest(".rednote-card");
    if (!card || card.contains(event.relatedTarget)) return;
    card.style.setProperty("--rednote-card-transform", "scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)");
    if (state.tiltCard === card) state.tiltCard = null;
  }

  function enablePointerSystem() {
    if (state.pointerEnabled) return;
    state.pointerEnabled = true;
    window.addEventListener("pointermove", queuePointerUpdate, { passive: true });
    window.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerover", handleInteractivePointerOver);
    document.addEventListener("pointerout", handleInteractivePointerOut);
    dom.rednoteTrack.addEventListener("pointerout", handleRednotePointerOut);
  }

  function disablePointerSystem() {
    if (state.pointerEnabled) {
      window.removeEventListener("pointermove", queuePointerUpdate);
      window.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerover", handleInteractivePointerOver);
      document.removeEventListener("pointerout", handleInteractivePointerOut);
      dom.rednoteTrack.removeEventListener("pointerout", handleRednotePointerOut);
    }
    state.pointerEnabled = false;
    resetPointerMotion();
  }

  function syncPointerSystem() {
    const enabled = finePointer.matches && !compactLayout.matches && !reducedMotion.matches;
    if (enabled) enablePointerSystem();
    else disablePointerSystem();
  }

  function setupPointerSystem() {
    resetPointerMotion();
    syncPointerSystem();
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

  function requestFeatureDeck(index) {
    const next = clamp(Number(index) || 0, 0, DECKS.length - 1);
    const staticMode = compactLayout.matches || reducedMotion.matches;
    if (staticMode) {
      commitActiveDeck(next, { forceRail: true });
      applyFeatureMix(next, { commit: false });
    }
    scrollToFeatureDeck(next);
  }

  function setupCatalogNavigation() {
    $$('a[href="#catalog"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        if (compactLayout.matches || reducedMotion.matches) return;
        event.preventDefault();
        const metric = state.layoutMetrics.catalog || { top: dom.catalog.offsetTop, height: dom.catalog.offsetHeight };
        const travel = Math.max(1, metric.height - window.innerHeight);
        try { window.history.pushState(null, "", "#catalog"); } catch (_) {}
        window.scrollTo({ top: metric.top + travel * 0.42, behavior: "smooth" });
      });
    });
  }

  function scrollToNote(index) {
    if (compactLayout.matches || reducedMotion.matches) {
      const behavior = reducedMotion.matches ? "auto" : "smooth";
      dom.rednote.scrollIntoView({ behavior });
      window.setTimeout(() => dom.rednoteTrack.children[index]?.scrollIntoView({ behavior, inline: "center", block: "nearest" }), reducedMotion.matches ? 0 : 450);
      return;
    }
    const travel = Math.max(0, dom.rednote.offsetHeight - window.innerHeight);
    window.scrollTo({ top: dom.rednote.offsetTop + travel * (index / (NOTES.length - 1)), behavior: "smooth" });
  }

  function setupProjectControls() {
    $$('.project-chip, .archive-drawer__item').forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.target) {
          $(chip.dataset.target)?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
          return;
        }
        const index = Number(chip.dataset.projectIndex);
        if (chip.dataset.projectType === "deck") {
          requestFeatureDeck(index);
        } else if (chip.dataset.projectType === "note") {
          state.noteManualUntil = performance.now() + 1200;
          syncProjectRail("note", index);
          setActiveNote(index);
          scrollToNote(index);
        }
        if (state.drawerOpen) setArchiveDrawer(false);
      });
    });

    $$('[data-deck-switch]').forEach((button) => {
      button.addEventListener("click", () => {
        requestFeatureDeck(Number(button.dataset.deckSwitch));
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

    const processButtons = dom.processNodes.map((node) => node.querySelector("button"));
    dom.processNodes.forEach((node, nodeIndex) => {
      const button = processButtons[nodeIndex];
      if (!button) return;
      button.addEventListener("click", () => setProcessStep(Number(node.dataset.node)));
      button.addEventListener("keydown", (event) => {
        let target = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") target = Math.min(PROCESS.length - 1, nodeIndex + 1);
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = Math.max(0, nodeIndex - 1);
        else if (event.key === "Home") target = 0;
        else if (event.key === "End") target = PROCESS.length - 1;
        if (target == null) return;
        event.preventDefault();
        processButtons[target]?.focus();
        setProcessStep(target);
      });
    });
  }

  function setupDeckScrubber() {
    let lastSwap = 0;
    const deckIsTransferring = () => state.featureMix > 0.08 && state.featureMix < 0.92;
    dom.deckConsole.addEventListener("pointermove", (event) => {
      if (!finePointer.matches || reducedMotion.matches || deckIsTransferring()) return;
      const now = performance.now();
      if (now - lastSwap < 74) return;
      const rect = dom.featureScreen.getBoundingClientRect();
      const ratio = clamp((event.clientX - rect.left) / rect.width);
      const deckIndex = state.featureMix >= 0.5 ? 1 : 0;
      const next = Math.round(ratio * (DECKS[deckIndex].frames.length - 1));
      if (next === state.previewFrames[deckIndex]) return;
      lastSwap = now;
      swapFeaturePreview(next, deckIndex);
    });
    dom.deckConsole.addEventListener("click", () => {
      openViewer(state.activeDeck, state.previewFrames[state.activeDeck], dom.deckConsole);
    });
    dom.deckConsole.tabIndex = 0;
    dom.deckConsole.setAttribute("role", "button");
    dom.deckConsole.setAttribute("aria-label", "移动指针预览页面；点击打开完整幻灯片");
    dom.deckConsole.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openViewer(state.activeDeck, state.previewFrames[state.activeDeck], dom.deckConsole);
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
    const setMenuOpen = (open, options = {}) => {
      window.clearTimeout(state.mobileMenuTimer);
      dom.menuToggle.setAttribute("aria-expanded", String(open));
      dom.menuToggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
      dom.mobileMenu.hidden = !open;

      if (open) {
        const firstLink = $("a", dom.mobileMenu);
        state.mobileMenuTimer = window.setTimeout(() => {
          if (!dom.mobileMenu.hidden) firstLink?.focus({ preventScroll: true });
        }, reducedMotion.matches ? 0 : 120);
        return;
      }

      const target = options.focusTarget;
      if (target) {
        const focusTarget = $("h1, h2", target) || target;
        focusTarget.setAttribute("tabindex", "-1");
        requestAnimationFrame(() => {
          focusTarget.focus({ preventScroll: true });
          focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
        });
      } else if (options.restoreFocus || dom.mobileMenu.contains(document.activeElement)) {
        dom.menuToggle.focus({ preventScroll: true });
      }
    };

    dom.menuToggle.addEventListener("click", () => setMenuOpen(dom.menuToggle.getAttribute("aria-expanded") !== "true"));
    $$('a', dom.mobileMenu).forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false, { focusTarget: $(link.getAttribute("href")) });
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || dom.mobileMenu.hidden) return;
      event.preventDefault();
      setMenuOpen(false, { restoreFocus: true });
    });
  }

  function setupModeDockFocus() {
    dom.modeDock.addEventListener("click", (event) => {
      if (event.detail === 0) return;
      const link = event.target.closest(".mode-dock__item");
      if (link) requestAnimationFrame(() => link.blur());
    });
  }

  function setupResponsiveMotion() {
    let refreshFrame = 0;

    const refreshNow = () => {
      refreshFrame = 0;
      refreshLayoutMetrics();
      positionProjectRailCursor();
      const meta = SECTION_META[state.activeSection] || SECTION_META.overview;
      positionModeDockCursor(meta.index);
      positionRednoteTrack(false);
      queueScrollUpdate();
    };

    const refresh = () => {
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(refreshNow);
    };

    const refreshMotionMode = () => {
      syncPointerSystem();
      if (reducedMotion.matches || compactLayout.matches) {
        updateHeroScene(0.68);
        applyFeatureMix(state.activeDeck, { commit: false });
      }
      refresh();
    };
    compactLayout.addEventListener?.("change", refreshMotionMode);
    reducedMotion.addEventListener?.("change", refreshMotionMode);
    finePointer.addEventListener?.("change", refreshMotionMode);
    window.addEventListener("resize", refresh, { passive: true });
    window.visualViewport?.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("load", refresh, { once: true });
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
  }

  function init() {
    cacheDom();
    runBootSequence();
    updateClock();
    window.setInterval(updateClock, 1000);
    renderRednotes();
    renderDeckFragments();
    commitActiveDeck(0, { force: true });
    applyFeatureMix(0, { commit: false });
    setActiveNote(0, { animate: false });
    syncProjectRail("deck", 1);
    setProcessStep(0, { animate: false });
    updateHeroScene(reducedMotion.matches || compactLayout.matches ? 0.68 : 0);
    setCatalogFolder(0, false);
    setupArchiveDrawer();
    setupCatalogInteraction();
    setupProjectControls();
    setupCatalogNavigation();
    setupDeckScrubber();
    setupViewer();
    setupPointerSystem();
    setupMenu();
    setupModeDockFocus();
    setupResponsiveMotion();
    setupRevealObserver();
    observeSections();
    dom.copyEmail.addEventListener("click", copyEmail);
    window.addEventListener("scroll", queueScrollUpdate, { passive: true });
    dom.root.classList.add("continuity-ready");
    queueScrollUpdate();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
