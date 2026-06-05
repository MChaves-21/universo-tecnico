// UIEngine — tooltip, carrossel, lightbox, abertura de projetos, skills highlight

import { IMAGES, PROJECTS } from "../data/projects.js";

export class UIEngine {
  constructor(bgEngine, mapEngine, travelEngine) {
    this.bg      = bgEngine;
    this.map     = mapEngine;
    this.travel  = travelEngine;

    this.curSlide      = 0;
    this.totalSlides   = 0;
    this.activeProjId  = null;
    this.lbImgs        = [];
    this.lbIdx         = 0;

    this._initTooltip();
    this._initLightbox();
    this._bindMapNodes();
  }

  // ── TOOLTIP ──
  _initTooltip() {
    this.tt      = document.getElementById("tooltip");
    this.ttTitle = document.getElementById("tt-title");
    this.ttDesc  = document.getElementById("tt-desc");
    document.addEventListener("mousemove", e => {
      if (this.tt.classList.contains("show")) {
        this.tt.style.left = `${e.clientX + 14}px`;
        this.tt.style.top  = `${e.clientY - 8}px`;
      }
    });
  }

  showTip(e, id) {
    const p = PROJECTS[id];
    this.ttTitle.textContent = p.name;
    this.ttDesc.textContent  = p.category.split("·")[0].trim() + " — clique para explorar";
    this.tt.classList.add("show");
  }

  hideTip() { this.tt.classList.remove("show"); }

  // ── MAP NODE BINDINGS ──
  _bindMapNodes() {
    document.querySelectorAll(".map-node[data-project]").forEach(node => {
      const id = node.dataset.project;
      node.addEventListener("mouseenter", e => this.showTip(e, id));
      node.addEventListener("mouseleave", () => this.hideTip());
      node.addEventListener("click", () => this.openProject(id));
    });

    const youNode = document.querySelector(".node-you");
    if (youNode) youNode.addEventListener("click", () => this.map.flashCoords("BASE ESTELAR · ONLINE · PRONTO PARA MISSÃO"));
  }

  // ── SKILLS HIGHLIGHT ──
  _highlightSkills(techArray) {
    const techLower = techArray.map(t => t.toLowerCase());
    document.querySelectorAll(".skill-item[data-keys]").forEach(el => {
      const keys = el.dataset.keys.split(",");
      const match = keys.some(k => techLower.some(t => t.includes(k) || k.includes(t.split(" ")[0])));
      el.classList.toggle("lit", match);
    });
  }

  _clearSkills() {
    document.querySelectorAll(".skill-item").forEach(el => el.classList.remove("lit"));
  }

  // ── TYPEWRITER ──
  _typewriter(el, text, speed = 16) {
    el.innerHTML = "";
    const cursor = Object.assign(document.createElement("span"), { className: "typewriter-cursor" });
    el.appendChild(cursor);
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { el.insertBefore(document.createTextNode(text[i++]), cursor); }
      else { clearInterval(iv); setTimeout(() => cursor.remove(), 800); }
    }, speed);
  }

  // ── CAROUSEL ──
  _buildCarousel(imgKeys, color) {
    const slides = imgKeys.map((k, i) =>
      `<div class="carousel-slide">
        <img src="${IMAGES[k]}" alt="Screenshot ${i + 1}" loading="lazy" data-lb-idx="${i}"/>
      </div>`
    ).join("");
    const dots = imgKeys.map((_, i) =>
      `<div class="c-dot${i === 0 ? " active" : ""}" data-dot="${i}"></div>`
    ).join("");
    return `
      <div class="carousel" id="carousel-main">
        <div class="carousel-track" id="c-track">${slides}</div>
        <div class="carousel-dots">${dots}</div>
        <div class="carousel-controls">
          <button class="c-btn" id="c-prev">&#8592;</button>
          <button class="c-btn" id="c-next">&#8594;</button>
        </div>
        <div class="carousel-hint">🔍 CLIQUE PARA AMPLIAR</div>
      </div>`;
  }

  _bindCarousel(imgKeys, projectName) {
    this.curSlide = 0;
    this.totalSlides = imgKeys.length;

    document.getElementById("c-prev")?.addEventListener("click", e => { e.stopPropagation(); this._setSlide(this.curSlide - 1); });
    document.getElementById("c-next")?.addEventListener("click", e => { e.stopPropagation(); this._setSlide(this.curSlide + 1); });
    document.querySelectorAll(".c-dot").forEach(dot => {
      dot.addEventListener("click", e => { e.stopPropagation(); this._setSlide(+dot.dataset.dot); });
    });
    document.querySelectorAll(".carousel-slide img").forEach(img => {
      img.addEventListener("click", () => this.openLightbox(imgKeys, +img.dataset.lbIdx, projectName));
    });
  }

  _setSlide(n) {
    const track = document.getElementById("c-track");
    if (!track) return;
    this.curSlide = (n + this.totalSlides) % this.totalSlides;
    track.style.transform = `translateX(${-this.curSlide * 100}%)`;
    document.querySelectorAll(".c-dot").forEach((d, i) => d.classList.toggle("active", i === this.curSlide));
  }

  // ── LIGHTBOX ──
  _initLightbox() {
    this.lb     = document.getElementById("lightbox");
    this.lbImg  = document.getElementById("lightbox-img");
    this.lbImg.style.transition = "opacity .15s";
    this.lbCap  = document.getElementById("lightbox-caption");
    this.lbCnt  = document.getElementById("lightbox-counter");

    document.getElementById("lightbox-close").addEventListener("click", () => this.closeLightbox());
    document.getElementById("lb-prev").addEventListener("click", e => { e.stopPropagation(); this._lbNavigate(-1); });
    document.getElementById("lb-next").addEventListener("click", e => { e.stopPropagation(); this._lbNavigate(1); });
    this.lb.addEventListener("click", e => { if (e.target === this.lb) this.closeLightbox(); });
    document.addEventListener("keydown", e => {
      if (!this.lb.classList.contains("open")) return;
      if (e.key === "Escape")      this.closeLightbox();
      if (e.key === "ArrowLeft")   this._lbNavigate(-1);
      if (e.key === "ArrowRight")  this._lbNavigate(1);
    });
  }

  openLightbox(imgs, idx, projectName) {
    this.lbImgs = imgs; this.lbIdx = idx;
    this.lbImg.src = IMAGES[imgs[idx]];
    this.lbCap.textContent = `${projectName} · Screenshot ${idx + 1}`;
    this.lbCnt.textContent = `${idx + 1} / ${imgs.length}`;
    this.lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    this.lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  _lbNavigate(dir) {
    this.lbIdx = (this.lbIdx + dir + this.lbImgs.length) % this.lbImgs.length;
    this.lbImg.style.opacity = "0";
    setTimeout(() => {
      this.lbImg.src = IMAGES[this.lbImgs[this.lbIdx]];
      this.lbCnt.textContent = `${this.lbIdx + 1} / ${this.lbImgs.length}`;
      this.lbImg.style.opacity = "1";
    }, 120);
  }

  // ── OPEN PROJECT ──
  openProject(id) {
    const p = PROJECTS[id];
    if (!p) { console.warn(`Projeto "${id}" não encontrado em PROJECTS`); return; }
    this.travel.launch(p, () => this._renderProject(id));
  }

  _renderProject(id) {
    const p = PROJECTS[id];
    const panel   = document.getElementById("project-panel");
    const content = document.getElementById("project-content");

    this.map.setSelected(id);

    // Particles
    const pos = this.map.getNodeScreenPos(`[data-project="${id}"]`);
    this.bg.spawnParticles(pos.x, pos.y, p.color.slice(0, 7));

    const techBadges = p.tech.map(t =>
      `<span class="tech-badge" style="border-color:${p.color}44;color:${p.color};background:${p.colorBg}">${t}</span>`
    ).join("");

    content.innerHTML = `
      <div class="proj-header">
        <div>
          <div class="proj-name" style="color:${p.color}">${p.name}</div>
          <span class="proj-tag" style="background:${p.colorBg};color:${p.color};border:1px solid ${p.color}44">
            ${p.tag} · ${p.category.split("·")[0].trim()}
          </span>
        </div>
        <button class="close-btn" id="close-proj">✕</button>
      </div>
      ${this._buildCarousel(p.imgs, p.color)}
      <div class="proj-grid">
        <div class="proj-field" style="grid-column:1/-1">
          <label>Sobre o Projeto</label>
          <p id="proj-desc-text"></p>
        </div>
        <div class="proj-field">
          <label>Stack Tecnológica</label>
          <div class="proj-tech">${techBadges}</div>
        </div>
        <div class="proj-field">
          <label>Repositório</label>
          <a class="proj-link" href="${p.link}" target="_blank" rel="noopener">↗ Ver no GitHub</a>
        </div>
      </div>
      <div class="proj-insight" style="border-color:${p.color}">💡 ${p.insight}</div>
    `;

    document.getElementById("close-proj")?.addEventListener("click", () => this.closeProject());
    this._bindCarousel(p.imgs, p.name);

    panel.classList.add("open");

    setTimeout(() => {
      const descEl = document.getElementById("proj-desc-text");
      if (descEl) this._typewriter(descEl, p.desc);
    }, 120);

    this._highlightSkills(p.tech);
    setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  closeProject() {
    document.getElementById("project-panel").classList.remove("open");
    this.map.clearSelected();
    this._clearSkills();
  }
}
