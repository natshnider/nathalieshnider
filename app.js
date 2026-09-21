/* ============================================================
   app.js — you shouldn't need to touch this file.
   Everything you'd want to change lives in content.js.
   One exception: DRIFT_SPEED, just below.
   ============================================================ */

const DRIFT_SPEED = 22;   // pixels per second. Lower = slower.
const RESUME_AFTER = 2200; // milliseconds of stillness before drifting again.

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
};

function renderRich(node, text) {
  node.textContent = '';
  String(text ?? '').split(/\*(.+?)\*/g).forEach((part, i) => {
    if (i % 2 === 1) {
      const em = document.createElement('em');
      em.textContent = part;
      node.append(em);
    } else if (part) {
      node.append(document.createTextNode(part));
    }
  });
}

function fillChrome() {
  const mark = $('.wordmark');
  if (mark && SITE.name) mark.textContent = SITE.name;
  const note = $('.foot-note');
  if (note) note.textContent = SITE.footerNote || '';
  const stageHeading = $('.stage-heading');
  if (stageHeading && PAGE) {
    stageHeading.textContent = PAGE.heading || 'Selected Works';
    document.title = SITE.name + ' — ' + (PAGE.heading || 'Works');
  }
}

function wireNavDropdown() {
  const item = $('.nav-item.has-dropdown');
  if (!item) return;
  const caret = $('.nav-caret', item);
  if (!caret) return;

  const close = () => {
    item.classList.remove('is-open');
    caret.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => {
    const open = item.classList.toggle('is-open');
    caret.setAttribute('aria-expanded', String(open));
  };

  caret.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
  document.addEventListener('click', (e) => { if (!item.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

function embedSrc(url) {
  if (!url) return null;
  let u;
  try { u = new URL(url, location.href); } catch { return null; }
  const host = u.hostname.replace(/^www\./, '');

  if (host.endsWith('youtube.com')) {
    if (u.pathname.startsWith('/embed/')) return u.href;
    const v = u.searchParams.get('v');
    if (v) return 'https://www.youtube.com/embed/' + v;
  }
  if (host === 'youtu.be') {
    return 'https://www.youtube.com/embed/' + u.pathname.slice(1);
  }
  if (host.endsWith('vimeo.com')) {
    if (host.startsWith('player.')) return u.href;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts[0] && /^\d+$/.test(parts[0])) {
      return 'https://player.vimeo.com/video/' + parts[0] + (parts[1] ? '?h=' + parts[1] : '');
    }
  }
  return u.href;
}

let pdfJsLoading = null;
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve();
  if (pdfJsLoading) return pdfJsLoading;
  pdfJsLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'vendor/pdfjs/pdf.min.js';
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';
      resolve();
    };
    s.onerror = () => reject(new Error('pdf.js failed to load'));
    document.head.append(s);
  });
  return pdfJsLoading;
}

function buildPdfViewer(container, work) {
  const wrap = el('div', 'pdf-viewer');
  const status = el('p', 'pdf-status');
  status.textContent = 'Loading slides…';

  const canvas = el('canvas');
  const controls = el('div', 'pdf-controls');
  const prev = el('button', 'pdf-nav');
  prev.type = 'button';
  prev.textContent = '‹';
  prev.setAttribute('aria-label', 'Previous slide');
  const count = el('span', 'pdf-count');
  const next = el('button', 'pdf-nav');
  next.type = 'button';
  next.textContent = '›';
  next.setAttribute('aria-label', 'Next slide');

  controls.append(prev, count, next);
  wrap.append(status, canvas, controls);
  container.append(wrap);

  let pdfDoc = null;
  let pageNum = 1;
  let renderTask = null;

  function updateButtons() {
    prev.disabled = pageNum <= 1;
    next.disabled = !pdfDoc || pageNum >= pdfDoc.numPages;
  }

  function renderPage(n) {
    if (!pdfDoc) return;
    pageNum = n;
    count.textContent = n + ' / ' + pdfDoc.numPages;
    updateButtons();
    if (renderTask) renderTask.cancel();
    pdfDoc.getPage(n).then((page) => {
      const targetWidth = wrap.clientWidth || 800;
      const unscaled = page.getViewport({ scale: 1 });
      const scale = targetWidth / unscaled.width;
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      renderTask = page.render({ canvasContext: ctx, viewport });
      renderTask.promise.then(() => { renderTask = null; }).catch(() => {});
    });
  }

  prev.addEventListener('click', () => { if (pageNum > 1) renderPage(pageNum - 1); });
  next.addEventListener('click', () => { if (pdfDoc && pageNum < pdfDoc.numPages) renderPage(pageNum + 1); });
  canvas.addEventListener('click', () => { if (pdfDoc && pageNum < pdfDoc.numPages) renderPage(pageNum + 1); });

  function onKey(e) {
    if (!pdfDoc) return;
    if (e.key === 'ArrowRight' && pageNum < pdfDoc.numPages) renderPage(pageNum + 1);
    if (e.key === 'ArrowLeft' && pageNum > 1) renderPage(pageNum - 1);
  }
  document.addEventListener('keydown', onKey);
  wrap._cleanup = () => document.removeEventListener('keydown', onKey);

  loadPdfJs()
    .then(() => pdfjsLib.getDocument(work.pdf).promise)
    .then((doc) => {
      pdfDoc = doc;
      status.remove();
      renderPage(1);
    })
    .catch(() => {
      status.textContent = "Couldn't load this PDF.";
    });
}

function parseRatio(str) {
  const m = String(str || '3/4').split('/');
  const w = parseFloat(m[0]);
  const h = parseFloat(m[1]);
  if (!w || !h) return 0.75;
  return +(w / h).toFixed(4);
}

function buildPlate(work, index, isClone, clickable) {
  const plate = el(clickable ? 'button' : 'div', clickable ? 'plate' : 'plate plate--static');
  if (clickable) {
    plate.type = 'button';
    plate.setAttribute('aria-label', 'Open ' + work.title);
  }
  plate.dataset.index = index;
  plate.style.setProperty('--ar', parseRatio(work.ratio));
  if (isClone) {
    plate.tabIndex = -1;
    plate.setAttribute('aria-hidden', 'true');
  }

  const media = el('div', 'media');
  if (work.cover) {
    const img = el('img');
    img.src = work.cover;
    img.alt = work.title;
    img.loading = index > 2 ? 'lazy' : 'eager';
    img.draggable = false;
    img.addEventListener('error', () => { img.style.opacity = '0'; });
    media.append(img);
  }

  const cap = el('div', 'caption');
  const h2 = el('h2');
  h2.textContent = work.title;
  cap.append(h2);

  if (work.blurb) {
    const p = el('p');
    renderRich(p, work.blurb);
    cap.append(p);
  }
  if (work.meta) {
    const m = el('p', 'meta');
    m.textContent = work.meta;
    cap.append(m);
  }

  plate.append(media, cap);
  return plate;
}

function buildReel() {
  const reel = $('#reel');
  if (!reel || !PAGE) return;

  const works = PAGE.works || [];
  const clickable = PAGE.mode !== 'photography';

  const track = el('div', 'track');
  const setA = el('div', 'set');
  const setB = el('div', 'set');

  works.forEach((w, i) => setA.append(buildPlate(w, i, false, clickable)));
  works.forEach((w, i) => setB.append(buildPlate(w, i, true, clickable)));

  track.append(setA, setB);
  reel.append(track);

  function fitCovers() {
    const caps = [...setA.querySelectorAll('.caption')];
    if (!caps.length) return;
    const capH = Math.max(...caps.map((c) => c.offsetHeight));
    const MIN_HANG = 20;
    const below = 14 + capH + 26;
    const room = reel.clientHeight - MIN_HANG - below;

    const widest = Math.max(...works.map((w) => parseRatio(w.ratio)));
    const cap = window.innerWidth < 760
      ? (window.innerWidth * 0.90) / widest
      : Math.max(240, window.innerWidth * 0.30);
    const h = Math.max(150, Math.min(room, cap));

    const slack = Math.max(0, room - h);
    const root = document.documentElement.style;
    root.setProperty('--media-h', Math.round(h) + 'px');
    root.setProperty('--hang', Math.round(MIN_HANG + slack * 0.55) + 'px');
  }

  let loopWidth = 0;
  const measure = () => {
    fitCovers();
    loopWidth = setB.offsetLeft - setA.offsetLeft;
  };
  measure();
  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  const stillPreferred = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pos = 0;
  let paused = stillPreferred;
  let resumeTimer = null;
  let last = performance.now();

  const hold = () => {
    paused = true;
    clearTimeout(resumeTimer);
  };
  const release = () => {
    if (stillPreferred) return;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => { paused = false; }, RESUME_AFTER);
  };

  reel.addEventListener('pointerenter', hold);
  reel.addEventListener('pointerleave', release);
  reel.addEventListener('wheel', (e) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    reel.scrollLeft += delta;
    pos = reel.scrollLeft;
    e.preventDefault();
    hold();
    release();
  }, { passive: false });
  reel.addEventListener('touchstart', hold, { passive: true });
  reel.addEventListener('touchend', release, { passive: true });
  reel.addEventListener('focusin', hold);
  reel.addEventListener('focusout', release);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hold(); else release();
  });

  let wrapping = false;
  reel.addEventListener('scroll', () => {
    if (!paused || wrapping || loopWidth <= 0) return;
    if (reel.scrollLeft >= loopWidth) {
      wrapping = true;
      reel.scrollLeft = reel.scrollLeft - loopWidth;
      wrapping = false;
    } else if (reel.scrollLeft <= 0) {
      wrapping = true;
      reel.scrollLeft = loopWidth - 1;
      wrapping = false;
    }
    pos = reel.scrollLeft;
  }, { passive: true });

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!paused && loopWidth > 0) {
      pos += DRIFT_SPEED * dt;
      if (pos >= loopWidth) pos -= loopWidth;
      reel.scrollLeft = pos;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  let dragging = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;

  reel.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startScroll = reel.scrollLeft;
    hold();
  });

  reel.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) {
      moved = true;
      reel.classList.add('is-dragging');
      reel.setPointerCapture?.(e.pointerId);
    }
    if (moved) {
      reel.scrollLeft = startScroll - dx;
      pos = reel.scrollLeft;
    }
  });

  const endDrag = () => {
    dragging = false;
    reel.classList.remove('is-dragging');
    release();
  };
  reel.addEventListener('pointerup', endDrag);
  reel.addEventListener('pointercancel', endDrag);

  reel.addEventListener('click', (e) => {
    if (!clickable) return;
    const plate = e.target.closest('.plate');
    if (!plate) return;
    if (moved) { moved = false; return; }
    openSheet(Number(plate.dataset.index));
  });
}

let lastFocused = null;

function openSheet(index) {
  const work = PAGE.works[index];
  if (!work) return;

  const dialog = $('#sheet');
  const sheet = $('.sheet', dialog);
  lastFocused = document.activeElement;

  sheet.innerHTML = '';

  const title = el('h1', 'script sheet-title');
  title.textContent = work.title;
  sheet.append(title);

  if (work.meta) {
    const meta = el('p', 'sheet-meta');
    meta.textContent = work.meta;
    sheet.append(meta);
  }

  const body = el('div', 'sheet-body');

  const left = el('div');
  if (work.pdf) {
    buildPdfViewer(left, work);
  } else if (work.video) {
    const frame = el('div', 'frame');
    const video = el('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = work.video;
    if (work.cover) video.poster = work.cover;
    video.addEventListener('error', () => {
      frame.innerHTML = '';
      const msg = el('p', 'pdf-status');
      msg.textContent = "This browser couldn't play the video file.";
      const link = el('a', 'sheet-link');
      link.href = work.video;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Open it directly';
      frame.append(msg, link);
    });
    frame.append(video);
    left.append(frame);
  } else {
    const src = embedSrc(work.embed);
    if (src) {
      const frame = el('div', 'frame');
      const iframe = el('iframe');
      iframe.src = src;
      iframe.title = work.title;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.append(iframe);
      left.append(frame);
    } else if (work.cover) {
      const img = el('img');
      img.src = work.cover;
      img.alt = work.title;
      left.append(img);
    }
  }

  const right = el('div', 'prose');
  if (work.description) {
    const p = el('p');
    renderRich(p, work.description);
    right.append(p);
  }
  if (work.awards && work.awards.length) {
    const wrap = el('div', 'awards');
    const lab = el('span', 'label');
    lab.textContent = 'Awards & Selections';
    const ul = el('ul');
    work.awards.forEach((a) => {
      const li = el('li');
      renderRich(li, a);
      ul.append(li);
    });
    wrap.append(lab, ul);
    right.append(wrap);
  }
  if (work.link && work.link.url) {
    const a = el('a', 'sheet-link');
    a.href = work.link.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = work.link.label || 'Open';
    right.append(a);
  }
  if (work.credits && work.credits.length) {
    const ul = el('ul', 'credits');
    work.credits.forEach((c) => {
      const li = el('li');
      renderRich(li, c);
      ul.append(li);
    });
    right.append(ul);
  }

  body.append(left, right);
  sheet.append(body);

  if (work.stills && work.stills.length) {
    const stills = el('div', 'stills');
    const lab = el('span', 'label');
    lab.textContent = 'Stills';
    const row = el('div', 'stills-row');
    work.stills.forEach((s) => {
      const img = el('img');
      img.src = s;
      img.alt = work.title + ' — still';
      img.loading = 'lazy';
      img.addEventListener('error', () => img.remove());
      row.append(img);
    });
    stills.append(lab, row);
    sheet.append(stills);
  }

  const close = el('button', 'sheet-close');
  close.type = 'button';
  close.setAttribute('aria-label', 'Close');
  close.textContent = '✕';
  close.addEventListener('click', () => dialog.close());
  sheet.prepend(close);

  sheet.scrollTop = 0;
  dialog.showModal();
}

function wireSheet() {
  const dialog = $('#sheet');
  if (!dialog) return;

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    const pv = $('.pdf-viewer', dialog);
    if (pv && pv._cleanup) pv._cleanup();
    $('.sheet', dialog).innerHTML = '';
    lastFocused?.focus();
  });
}

function buildProfile() {
  const root = $('#profile');
  if (!root) return;
  const p = SITE.profile;

  const heading = $('.page-heading');
  if (heading) heading.textContent = p.heading || 'Profile';
  document.title = SITE.name + ' — ' + (p.heading || 'Profile');

  const portrait = $('#portrait');
  if (portrait && p.portrait) {
    const img = el('img');
    img.src = p.portrait;
    img.alt = SITE.name;
    img.addEventListener('error', () => img.remove());
    portrait.append(img);
  }

  const bodyWrap = $('.profile-body', root);
  (p.body || []).forEach((text) => {
    const para = el('p');
    renderRich(para, text);
    bodyWrap.append(para);
  });

  if (p.details && p.details.length) {
    const dl = el('dl', 'details');
    p.details.forEach((d) => {
      const dt = el('dt');
      dt.textContent = d.label;
      const dd = el('dd');
      dd.textContent = d.value;
      dl.append(dt, dd);
    });
    bodyWrap.append(dl);
  }

  if (p.links && p.links.length) {
    const nav = el('nav', 'contact');
    p.links.forEach((l) => {
      const a = el('a');
      a.href = l.url;
      a.textContent = l.label;
      if (!l.url.startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener'; }
      nav.append(a);
    });
    bodyWrap.append(nav);
  }
}

/* ---------- go ---------- */

fillChrome();
wireNavDropdown();
buildReel();
wireSheet();
buildProfile();
