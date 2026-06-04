// MapEngine — radar, tooltip, animação de entrada dos nós

export class MapEngine {
  constructor() {
    this.radarAngle = 0;
    this.arm = document.getElementById("radar-arm");
    this.tip = document.getElementById("radar-tip");
    this.coords = document.getElementById("map-coords");
    this.CX = 350; this.CY = 190; this.R = 68;
  }

  tick() {
    this.radarAngle += 0.6;
    const rad = this.radarAngle * Math.PI / 180;
    const x = this.CX + Math.sin(rad) * this.R;
    const y = this.CY - Math.cos(rad) * this.R;
    this.arm?.setAttribute("x2", x);
    this.arm?.setAttribute("y2", y);
    this.tip?.setAttribute("cx", x);
    this.tip?.setAttribute("cy", y);
  }

  revealNodes() {
    document.querySelectorAll(".map-node").forEach((node, i) => {
      setTimeout(() => node.classList.add("revealed"), 300 + i * 180);
    });
  }

  flashCoords(msg, duration = 3000) {
    if (!this.coords) return;
    this.coords.textContent = msg;
    setTimeout(() => { this.coords.textContent = "SYS 47°N · 23°W · ORBIT STABLE"; }, duration);
  }

  getNodeScreenPos(selector) {
    const el = document.querySelector(`${selector} .node-circle`);
    if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  setSelected(id) {
    document.querySelectorAll(".map-node").forEach(n => n.classList.remove("selected"));
    document.querySelector(`[data-project="${id}"]`)?.classList.add("selected");
    document.querySelectorAll(".conn-line").forEach(l => l.classList.remove("active"));
    const idx = ["proj1", "proj2", "proj3", "proj4"].indexOf(id) + 1;
    document.getElementById(`conn${idx}`)?.classList.add("active");
  }

  clearSelected() {
    document.querySelectorAll(".map-node").forEach(n => n.classList.remove("selected"));
    document.querySelectorAll(".conn-line").forEach(l => l.classList.remove("active"));
  }
}
