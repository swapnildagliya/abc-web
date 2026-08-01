/* ============================================================
   ABC — FABLE 5 · choreography engine
   No libraries. Native scroll only — nothing hijacks the wheel.
   Vocabulary:
     [data-scene]        scene enters once → .is-on (children step in on --step counts)
     [data-scrub]        element gets --p (0..1 progress through the viewport)
     [data-pin]          the manifesto: sticky frame + line-by-line light-up
     [data-marquee]      ribbons pause when off screen
     [data-stage]        followspot tracks the pointer (fine pointers only)
     [data-preview]      hover reveals a floating photo (fine pointers only)
   Reduced motion (or no JS): everything is visible, still and complete.
   ============================================================ */
(() => {
  "use strict";

  const doc = document.documentElement;
  const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const smallScreen = matchMedia("(max-width: 900px)");
  const reduced = () => reduceQuery.matches;
  doc.classList.toggle("reduce", reduced());
  reduceQuery.addEventListener?.("change", () => {
    doc.classList.toggle("reduce", reduced());
    syncVideo();
  });

  /* ---------- header + progress ---------- */
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".progress i");
  let lastY = 0;
  function onScrollUI() {
    const y = scrollY;
    header?.classList.toggle("is-scrolled", y > 40);
    if (progress) {
      const max = doc.scrollHeight - innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
    lastY = y;
  }
  onScrollUI();
  addEventListener("scroll", onScrollUI, { passive: true });

  /* ---------- menu (cobalt curtain) ---------- */
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector(".site-menu");
  let menuReturnFocus = null;

  // assign entrance counts to menu items
  menu?.querySelectorAll(".menu-step").forEach((el, i) => el.style.setProperty("--step", i));

  function menuFocusables() {
    if (!menu) return [];
    return [menuButton, ...menu.querySelectorAll("a[href], button:not([disabled])")].filter(Boolean);
  }
  function setMenu(open) {
    if (!menu || !menuButton) return;
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    menuButton.setAttribute("aria-expanded", String(open));
    if (open) {
      menuReturnFocus = document.activeElement;
      requestAnimationFrame(() => menu.querySelector("a[href]")?.focus());
    } else {
      // WebKit does not focus buttons on click, so fall back to the toggle
      const target = menuReturnFocus instanceof HTMLElement && menuReturnFocus !== document.body
        ? menuReturnFocus : menuButton;
      target.focus();
      menuReturnFocus = null;
    }
  }
  menuButton?.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    if (event.key === "Escape") { setMenu(false); return; }
    if (event.key !== "Tab") return;
    const items = menuFocusables();
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });

  /* ---------- scenes: ensemble entrances ---------- */
  const scenes = [...document.querySelectorAll("[data-scene]")];
  // auto-count the steps inside each scene (explicit data-step wins)
  scenes.forEach(scene => {
    let count = 0;
    scene.querySelectorAll(".fx, .fx-left, .fx-right, .fx-scale, .fx-tilt, .mask-line > span, .solo, .stamp").forEach(el => {
      const explicit = el.closest("[data-step]")?.dataset.step ?? el.dataset.step;
      // cap the count so long ensembles (rosters, lists) never lag behind the reader
      el.style.setProperty("--step", explicit ?? Math.min(count++, 8));
    });
  });
  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-on");
        sceneObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  scenes.forEach(scene => sceneObserver.observe(scene));
  // anything already above the fold on load (deep links) resolves immediately
  addEventListener("load", () => {
    scenes.forEach(scene => {
      const r = scene.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) scene.classList.add("is-on");
    });
  });

  /* ---------- scrub: --p per element (rAF, transform-only consumers) ---------- */
  const scrubs = new Map(); // el -> near-viewport flag
  document.querySelectorAll("[data-scrub]").forEach(el => scrubs.set(el, false));
  if (scrubs.size) {
    let ticking = false;
    function scrubFrame() {
      ticking = false;
      if (reduced()) return;
      scrubs.forEach((active, el) => {
        if (!active) return;
        const r = el.getBoundingClientRect();
        const total = r.height + innerHeight;
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / total));
        el.style.setProperty("--p", p.toFixed(4));
      });
    }
    function requestScrub() {
      if (!ticking) { ticking = true; requestAnimationFrame(scrubFrame); }
    }
    // the gate saves work while far away — but every gate change must itself
    // trigger a pass, or instant jumps (anchors, fast flicks) leave stale --p
    const gate = new IntersectionObserver((entries) => {
      entries.forEach(e => scrubs.set(e.target, e.isIntersecting));
      requestScrub();
    }, { rootMargin: "30% 0px 30% 0px" });
    scrubs.forEach((_, el) => gate.observe(el));
    requestScrub();
    addEventListener("scroll", requestScrub, { passive: true });
    addEventListener("resize", requestScrub);
    addEventListener("load", requestScrub);
  }

  /* ---------- pinned chapters: every [data-pin] gets --pp (0..1 pin progress) ---------- */
  const pins = [...document.querySelectorAll("[data-pin]")];
  if (pins.length) {
    let pinTicking = false;
    function manifestoPhases(pin, p) {
      const lines = pin._mLines || (pin._mLines = [...pin.querySelectorAll(".m-line")]);
      if (!lines.length) return;
      const phase = p < 0.30 ? 1 : p < 0.60 ? 2 : 3;
      pin.dataset.phase = String(phase);
      lines.forEach((line, i) => {
        const lit = p >= 0.08 + i * 0.26;
        line.classList.toggle("is-lit", lit && (i === lines.length - 1 ? true : p < 0.08 + (i + 1) * 0.26 + 0.10));
        line.classList.toggle("was-lit", lit && !line.classList.contains("is-lit"));
      });
    }
    function pinFrame() {
      pinTicking = false;
      pins.forEach(pin => {
        if (reduced()) {
          pin.style.setProperty("--pp", "1");
          if (pin.hasAttribute("data-pin-phases")) {
            pin.dataset.phase = "3";
            pin.querySelectorAll(".m-line").forEach(l => l.classList.add("is-lit"));
          }
          return;
        }
        const r = pin.getBoundingClientRect();
        const span = r.height - innerHeight;
        const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : (r.top < 0 ? 1 : 0);
        pin.style.setProperty("--pp", p.toFixed(4));
        if (pin.hasAttribute("data-pin-phases")) manifestoPhases(pin, p);
        if (pin.hasAttribute("data-roll")) rollFrame(pin, p);
        if (pin.hasAttribute("data-track")) trackFrame(pin, p);
      });
    }
    function requestPin() {
      if (!pinTicking) { pinTicking = true; requestAnimationFrame(pinFrame); }
    }
    requestPin();
    addEventListener("scroll", requestPin, { passive: true });
    addEventListener("resize", requestPin);
    addEventListener("load", requestPin);
  }

  /* ---------- (v6) the caption roll ----------
     Lines travel through a masked window, one readable at a time. Text must
     never cross-fade in place — two semi-transparent lines in one position
     double-expose and become unreadable. Rolling keeps it legible AND smooth. */
  const smooth = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  const ROLLS = [0.30, 0.56, 0.80];   // centre of each transition
  const ROLL_W = 0.13;                // scroll a roll takes
  let lineH = 0;
  function rollMeasure(pin) {
    const win = pin.querySelector(".caption");
    const caps = [...pin.querySelectorAll(".cap")];
    if (!win || !caps.length || reduced()) return;
    caps.forEach(c => { c.style.height = "auto"; });
    lineH = Math.max(...caps.map(c => c.offsetHeight));
    win.style.minHeight = "0";          // the CSS placeholder would otherwise win
    win.style.height = lineH + "px";
    caps.forEach(c => { c.style.height = lineH + "px"; });
  }
  function rollFrame(pin, p) {
    const track = pin.querySelector(".cap-track");
    if (!track || !lineH) return;
    let pos = 0;
    for (const c of ROLLS) pos += smooth((p - (c - ROLL_W / 2)) / ROLL_W);
    track.style.transform = `translateY(${(-pos * lineH).toFixed(1)}px)`;
    const actions = pin.querySelector(".overture-actions");
    if (actions) {                      // its own later window, never the same frame
      const a = smooth((p - 0.70) / 0.20);
      actions.style.opacity = a.toFixed(3);
      actions.style.transform = `translateY(${((1 - a) * 14).toFixed(1)}px)`;
    }
    pin.dataset.phase = String(Math.min(4, Math.floor(p * 4 + 0.0001) + 1));
  }
  const rollPin = document.querySelector("[data-roll]");
  if (rollPin) {
    rollMeasure(rollPin);
    addEventListener("resize", () => rollMeasure(rollPin));
    addEventListener("load", () => rollMeasure(rollPin));
    document.fonts?.ready.then(() => rollMeasure(rollPin));   // webfonts change the height
  }

  /* ---------- (v6) the road: vertical scroll becomes lateral travel ----------
     Mapped 1:1 to the strip's own overflow, so the wheel is never stolen —
     you travel exactly as far sideways as you scrolled down. */
  let travel = 0;
  function trackSize(pin) {
    const strip = pin.querySelector("[data-strip], .postcard-strip");
    if (!strip) return;
    const on = matchMedia("(min-width: 901px)").matches && !reduced();
    pin.classList.toggle("is-tracked", on);
    if (!on) { pin.style.height = ""; strip.style.transform = ""; travel = 0; return; }
    travel = Math.max(0, strip.scrollWidth - innerWidth + 32);
    pin.style.height = (innerHeight + travel) + "px";
  }
  function trackFrame(pin, p) {
    if (!pin.classList.contains("is-tracked")) return;
    const strip = pin.querySelector("[data-strip], .postcard-strip");
    const rule = pin.querySelector(".road-rule i");
    if (strip) strip.style.transform = `translateX(${(-p * travel).toFixed(1)}px)`;
    if (rule) rule.style.setProperty("--k", p.toFixed(3));
  }
  const trackPin = document.querySelector("[data-track]");
  if (trackPin) {
    trackSize(trackPin);
    addEventListener("resize", () => trackSize(trackPin));
    addEventListener("load", () => trackSize(trackPin));
    reduceQuery.addEventListener?.("change", () => trackSize(trackPin));
  }

  /* ---------- (v6.7) the film hero ----------
     Same cross-fade discipline as the reel: a clip is never reused until it has
     faded out, and never plays while hidden (which would burn its own footage
     and freeze). Under reduced motion nothing loads and the poster stands in. */
  const heroFilm = document.querySelector("[data-hero-film]");
  if (heroFilm && !reduced()) {
    const HB = 3200, HBL = 800, HCLIP = 5850;
    const wideH = matchMedia("(min-width: 761px)").matches;
    const list = [...heroFilm.querySelectorAll(".film-hero-clips li")].map(li => ({
      f: li.dataset.clip, t: li.dataset.title, w: li.dataset.who }));
    const hv = [...heroFilm.querySelectorAll(".film-v")];
    const hT = heroFilm.querySelector("[data-hero-title]");
    const hW = heroFilm.querySelector("[data-hero-who]");
    if (list.length && hv.length === 2) {
      const hsrc = n => `../assets/media/${n}${wideH ? "-hd" : ""}.mp4`;
      const hbl = Math.min(HBL, Math.max(0, HCLIP - HB - 150));
      let hi = 0, hc = hv[0], hn = hv[1], ht = null, hOn = false;
      const hprep = (v, k) => { v.src = hsrc(list[k].f); v.load();
        const sk = () => { try { v.currentTime = 0.15; } catch (e) {} };
        if (v.readyState >= 1) sk(); else v.addEventListener("loadedmetadata", sk, { once: true }); };
      function hstep() {
        const k = hi % list.length, out = hn;
        hc.style.transition = `opacity ${hbl}ms linear`;
        out.style.transition = `opacity ${hbl}ms linear`;
        hc.classList.add("live"); out.classList.remove("live");
        const g = hc.play(); if (g && g.catch) g.catch(() => {});
        if (hT) hT.textContent = list[k].t;
        if (hW) hW.textContent = list[k].w;
        setTimeout(() => { if (!out.classList.contains("live")) { out.pause(); hprep(out, (hi + 1) % list.length); } }, hbl + 80);
        ht = setTimeout(() => { hi++; [hc, hn] = [hn, hc]; hstep(); }, HB);
      }
      new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && !hOn) { hOn = true;
          if (!hc.src) { hprep(hc, 0); hprep(hn, 1); }
          hstep();
        } else if (!e.isIntersecting && hOn) { hOn = false; clearTimeout(ht); hv.forEach(v => v.pause()); }
      }), { threshold: 0.15 }).observe(heroFilm);
    }
  }

  /* ---------- (v6.6) standalone lazy loops ----------
     Single clips that live inside other content (one per edition in the
     four-editions track). Same contract as the reel: nothing is fetched until
     the clip is on screen, playback stops when it leaves, and under reduced
     motion nothing loads at all — the poster stands in. */
  const lazyVids = [...document.querySelectorAll("[data-lazyvid]")];
  if (lazyVids.length && !reduced()) {
    const wideVid = matchMedia("(min-width: 761px)").matches;
    const vio = new IntersectionObserver(entries => entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = (wideVid && v.dataset.srcHd) || v.dataset.src || "";
        const go = v.play(); if (go && go.catch) go.catch(() => {});
      } else if (!v.paused) { v.pause(); }
    }), { rootMargin: "10% 0px", threshold: 0.25 });
    lazyVids.forEach(v => vio.observe(v));
  }

  /* ---------- (v6.5) the showcase reel ----------
     Ten acts cross-faded in sequence. The clip list comes from the stills
     markup, so there is one source of truth and the credits cannot drift.

     Three rules this is built on, each learned from a visible bug:
     · a video element may NOT be reused until it has fully faded out —
       loading a new source into it mid-fade snaps it to a different dance
     · a clip must NOT play while hidden — it burns its own footage and then
       freezes on its last frame during its visible turn
     · section + crossfade must never exceed the clip's playable length     */
  const reelStage = document.querySelector("[data-reel-stage]");
  if (reelStage && !reduced()) {
    const BEAT = 3000, BLEND = 700, CLIP_MS = 5850, IN = 0.15;
    const wide = matchMedia("(min-width: 761px)").matches;
    const items = [...reelStage.querySelectorAll(".reel-stills li")].map(li => ({
      f: li.dataset.clip, t: li.dataset.title, w: li.dataset.who,
      still: li.hasAttribute("data-still"),
      scale: li.dataset.scale || "", origin: li.dataset.origin || "",
    }));
    const vids = [...reelStage.querySelectorAll(".reel-v")];
    const titleEl = reelStage.querySelector("[data-reel-title]");
    const whoEl = reelStage.querySelector("[data-reel-who]");
    const ticksEl = reelStage.querySelector(".reel-ticks");
    if (items.length && vids.length === 2) {
      // data-clip carries the folder too, so the reel can mix showcase acts
      // with archive clips from earlier editions
      const src = n => `../assets/media/${n}${wide ? "-hd" : ""}.mp4`;
      const blend = Math.min(BLEND, Math.max(0, CLIP_MS - BEAT - 150));
      items.forEach(() => ticksEl.insertAdjacentHTML("beforeend", "<i></i>"));
      let i = 0, cur = vids[0], nxt = vids[1], timer = null, live = false;

      function prep(v, k) {                 // load + seek, deliberately PAUSED
        const it = items[k];
        if (it.still) {                      // a photograph, shown Ken-Burns style
          v.removeAttribute("src"); v.load();
          v.poster = `../assets/media/${it.f}.jpg`;
          return;
        }
        v.poster = `../assets/media/${it.f}.jpg`; v.src = src(it.f); v.load();
        const seek = () => { try { v.currentTime = IN; } catch (e) {} };
        if (v.readyState >= 1) seek();
        else v.addEventListener("loadedmetadata", seek, { once: true });
      }
      function step() {
        const k = i % items.length, out = nxt;
        cur.style.transition = `opacity ${blend}ms linear, transform ${BEAT + blend}ms linear`;
        out.style.transition = `opacity ${blend}ms linear`;
        cur.classList.add("live"); out.classList.remove("live");
        // a dark, distant archival solo carries its own punch-in as the base;
        // everything else uses the gentle 1.05 push. Both then drift +0.08.
        const base = items[k].scale ? Number(items[k].scale) : 1.05;
        cur.style.transformOrigin = items[k].origin || "50% 50%";
        cur.style.transform = `scale(${base})`;
        requestAnimationFrame(() => { cur.style.transform = `scale(${(base + 0.08).toFixed(2)})`; });
        if (!items[k].still) { const go = cur.play(); if (go && go.catch) go.catch(() => {}); }
        titleEl.textContent = items[k].t; whoEl.textContent = items[k].w;
        [...ticksEl.children].forEach((el, n) => el.classList.toggle("on", n === k));
        setTimeout(() => {                  // only reuse it once it is off screen
          if (out.classList.contains("live")) return;
          out.pause(); prep(out, (i + 1) % items.length);
        }, blend + 80);
        timer = setTimeout(() => { i++; [cur, nxt] = [nxt, cur]; step(); }, BEAT);
      }
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && !live) {
          live = true;
          if (!cur.dataset.primed) { cur.dataset.primed = nxt.dataset.primed = "1"; prep(cur, 0); prep(nxt, 1); }
          step();
        } else if (!e.isIntersecting && live) {
          live = false; clearTimeout(timer); vids.forEach(v => v.pause());
        }
      }), { threshold: 0.25 });
      io.observe(reelStage);
    }
  }

  /* ---------- (v6) intro: curtain up, first visit only, skippable ---------- */
  const curtain = document.querySelector(".curtain");
  if (curtain) {
    const KEY = "abc-curtain";
    if (sessionStorage.getItem(KEY) || reduced()) curtain.remove();
    else {
      document.body.style.overflow = "hidden";
      const lift = () => {
        curtain.classList.add("is-up");
        document.body.style.overflow = "";
        sessionStorage.setItem(KEY, "1");
        setTimeout(() => curtain.remove(), 1100);
      };
      curtain.querySelector(".curtain-skip")?.addEventListener("click", lift);
      setTimeout(lift, 1250);
    }
  }

  /* ---------- (v6) micro-interaction: 3D tilt toward the cursor ---------- */
  if (finePointer.matches) {
    document.querySelectorAll("[data-tilt]").forEach(el => {
      const max = Number(el.dataset.tilt) || 6;
      el.addEventListener("pointermove", ev => {
        if (reduced()) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--tx", `${(-((ev.clientY - r.top) / r.height - .5) * max).toFixed(2)}deg`);
        el.style.setProperty("--ty", `${(((ev.clientX - r.left) / r.width - .5) * max).toFixed(2)}deg`);
      }, { passive: true });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--tx", "0deg"); el.style.setProperty("--ty", "0deg");
      });
    });
  }

  /* (v4) postcards are a plain draggable strip on every device — no pin. */

  /* ---------- marquees: pause off screen ---------- */
  const marquees = document.querySelectorAll("[data-marquee]");
  if (marquees.length) {
    const mObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle("is-idle", !e.isIntersecting));
    });
    marquees.forEach(m => mObserver.observe(m));
  }

  /* ---------- followspot + card glow (fine pointers only) ---------- */
  if (finePointer.matches) {
    document.querySelectorAll("[data-stage]").forEach(stage => {
      stage.addEventListener("pointermove", (event) => {
        if (reduced()) return;
        const r = stage.getBoundingClientRect();
        stage.style.setProperty("--sx", `${((event.clientX - r.left) / r.width) * 100}%`);
        stage.style.setProperty("--sy", `${((event.clientY - r.top) / r.height) * 100}%`);
      }, { passive: true });
    });
    document.querySelectorAll(".card, .contact-option").forEach(card => {
      card.addEventListener("pointermove", (event) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--cx", `${event.clientX - r.left}px`);
        card.style.setProperty("--cy", `${event.clientY - r.top}px`);
      }, { passive: true });
    });
  }

  /* ---------- hover photo previews (supplementary, never load-bearing) ---------- */
  if (finePointer.matches && !smallScreen.matches) {
    const rows = [...document.querySelectorAll("[data-preview]")];
    if (rows.length) {
      const float = document.createElement("div");
      float.className = "preview-float";
      float.setAttribute("aria-hidden", "true");
      const img = document.createElement("img");
      img.alt = "";
      img.width = 300; img.height = 200;
      float.appendChild(img);
      document.body.appendChild(float);
      let raf = null;
      let px = 0, py = 0;
      function place() {
        raf = null;
        const w = float.offsetWidth, h = float.offsetHeight;
        const x = Math.min(Math.max(px + 26, 10), innerWidth - w - 10);
        const y = Math.min(Math.max(py - h / 2, 10), innerHeight - h - 10);
        float.style.left = `${x}px`;
        float.style.top = `${y}px`;
      }
      rows.forEach(row => {
        row.addEventListener("pointerenter", () => {
          if (reduced()) return;
          img.src = row.dataset.preview;
          float.classList.add("is-on");
        });
        row.addEventListener("pointerleave", () => float.classList.remove("is-on"));
        row.addEventListener("pointermove", (event) => {
          px = event.clientX; py = event.clientY;
          if (!raf) raf = requestAnimationFrame(place);
        }, { passive: true });
      });
    }
  }

  /* ---------- hero film control ---------- */
  const video = document.querySelector(".overture-video video, .hero-video");
  const videoControl = document.querySelector("[data-video-control]");
  function setVideoState(playing) {
    if (!videoControl) return;
    videoControl.classList.toggle("is-paused", !playing);
    const label = videoControl.querySelector("span");
    if (label) label.textContent = playing ? "Pause film" : "Play film";
    videoControl.setAttribute("aria-label", playing ? "Pause background video" : "Play background video");
  }
  function syncVideo() {
    if (!video) return;
    if (reduced()) { video.pause(); setVideoState(false); }
  }
  videoControl?.addEventListener("click", () => {
    if (!video) return;
    if (video.paused) { video.play(); setVideoState(true); }
    else { video.pause(); setVideoState(false); }
  });
  syncVideo();
  // some browsers ignore the autoplay attribute until a play() nudge
  if (video && !reduced()) {
    const nudge = () => video.play().then(() => setVideoState(true)).catch(() => setVideoState(false));
    if (video.paused) nudge();
    addEventListener("load", () => { if (video.paused && !reduced()) nudge(); });
  }

  /* ---------- act rail (surtitles) ---------- */
  const cueLabel = document.querySelector("[data-current-cue]");
  if (cueLabel) {
    let cueTimer;
    const cueObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const next = visible?.target.dataset.cue;
      if (!next || next === cueLabel.textContent) return;
      cueLabel.classList.add("is-changing");
      clearTimeout(cueTimer);
      cueTimer = setTimeout(() => {
        cueLabel.textContent = next;
        cueLabel.classList.remove("is-changing");
      }, 220);
    }, { threshold: [0.16, 0.4, 0.7] });
    document.querySelectorAll("[data-cue]").forEach(s => cueObserver.observe(s));
  }

  /* ---------- drag the postcard strip ---------- */
  document.querySelectorAll(".postcard-strip").forEach(strip => {
    let dragging = false, startX = 0, startScroll = 0;
    strip.addEventListener("pointerdown", (event) => {
      dragging = true;
      startX = event.clientX;
      startScroll = strip.scrollLeft;
      strip.classList.add("is-dragging");
      strip.setPointerCapture(event.pointerId);
    });
    strip.addEventListener("pointermove", (event) => {
      if (dragging) strip.scrollLeft = startScroll - (event.clientX - startX);
    });
    const stop = () => { dragging = false; strip.classList.remove("is-dragging"); };
    strip.addEventListener("pointerup", stop);
    strip.addEventListener("pointercancel", stop);
  });

  /* ---------- details niceties ---------- */
  document.querySelectorAll(".folds details, .event-detail, .past-shell").forEach(detail => {
    detail.addEventListener("toggle", () => {
      if (!detail.open || reduced()) return;
      detail.classList.remove("just-opened");
      requestAnimationFrame(() => {
        detail.classList.add("just-opened");
        setTimeout(() => detail.classList.remove("just-opened"), 520);
      });
    });
  });

  /* deep links open their disclosure chain (event + fold anchors) */
  function openFragment() {
    if (!location.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch { return; }
    if (!target) return;
    if (target instanceof HTMLDetailsElement) target.open = true;
    let parent = target.parentElement?.closest("details");
    while (parent) { parent.open = true; parent = parent.parentElement?.closest("details"); }
  }
  openFragment();
  addEventListener("hashchange", openFragment);
})();
