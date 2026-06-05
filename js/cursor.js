// CursorEngine — cursor HUD personalizado + Modo de Viagem

export class CursorEngine {
  constructor() {
    this.el = document.getElementById("hud-cursor");
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.curX = this.mouseX;
    this.curY = this.mouseY;
    this._bindEvents();
    this._animate();
  }

  _bindEvents() {
    document.addEventListener("mousemove", e => { this.mouseX = e.clientX; this.mouseY = e.clientY; });
    document.addEventListener("mouseleave", () => this.el.style.opacity = "0");
    document.addEventListener("mouseenter", () => this.el.style.opacity = "1");
  }

  // Call this after map nodes are in DOM
  bindNodes() {
    document.querySelectorAll(".map-node").forEach(node => {
      node.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      node.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  _animate() {
    this.curX += (this.mouseX - this.curX) * 0.18;
    this.curY += (this.mouseY - this.curY) * 0.18;
    this.el.style.left = `${this.curX}px`;
    this.el.style.top  = `${this.curY}px`;
    requestAnimationFrame(() => this._animate());
  }
}

// ── TravelEngine ──
export class TravelEngine {
  constructor() {
    this.overlay  = document.getElementById("travel-overlay");
    this.dest     = document.getElementById("travel-dest");
    this.destName = this.dest.querySelector(".dest-name");
    this.traveling = false;
  }

  launch(project, callback) {
    if (this.traveling) return;
    if (!project) { callback(); return; } // Segurança: projeto não encontrado

    this.traveling = true;

    try {
      const { name, color } = project;
      this.destName.textContent = name;
      this.destName.style.color = color;
      this.destName.style.textShadow = `0 0 20px ${color}`;
      this._spawnWarpLines(color);
      this.overlay.classList.add("active");
      this.overlay.style.background =
        `radial-gradient(circle at 50% 50%, ${color}18 0%, rgba(3,5,15,.88) 100%)`;
      setTimeout(() => this.dest.classList.add("show"), 100);
      document.querySelector(".map-wrap").classList.add("traveling");
      setTimeout(() => this.dest.classList.remove("show"), 580);
    } catch(e) {
      console.warn("TravelEngine erro:", e);
    }

    setTimeout(() => {
      this.overlay.classList.remove("active");
      document.querySelector(".map-wrap")?.classList.remove("traveling");
      this.traveling = false;
      callback();
    }, 860);
  }

  _spawnWarpLines(color) {
    for (let i = 0; i < 14; i++) {
      const line = document.createElement("div");
      line.className = "warp-line";
      line.style.top = `${Math.random() * 100}vh`;
      line.style.animationDelay = `${Math.random() * 0.25}s`;
      line.style.background = `linear-gradient(90deg,transparent,${color},transparent)`;
      document.body.appendChild(line);
      setTimeout(() => line.remove(), 900);
    }
  }
}
