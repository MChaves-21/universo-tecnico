// BackgroundEngine — estrelas, nebulosa, asteroides, foguetes, estrelas cadentes, partículas

export class BackgroundEngine {
  constructor(starCanvas, particleCanvas) {
    this.starCanvas = starCanvas;
    this.ctx = starCanvas.getContext("2d");
    this.pCanvas = particleCanvas;
    this.pCtx = particleCanvas.getContext("2d");

    this.stars = [];
    this.shootingStars = [];
    this.rockets = [];
    this.asteroids = [];
    this.particles = [];

    this._shootingInterval = null;
    this.resize();
  }

  // ── RESIZE ──
  resize() {
    const { innerWidth: w, innerHeight: h } = window;
    this.starCanvas.width = w; this.starCanvas.height = h;
    this.pCanvas.width = w; this.pCanvas.height = h;
    this._initScene();
  }

  // ── INIT ──
  _initScene() {
    this._initStars();
    this.asteroids = [];
    this.rockets = [];
    for (let i = 0; i < 8; i++) this._spawnAsteroid(true);
    for (let i = 0; i < 2; i++) this._spawnRocket(true);

    if (this._shootingInterval) clearInterval(this._shootingInterval);
    this._shootingInterval = setInterval(() => {
      if (Math.random() < 0.6) this._spawnShootingStar();
    }, 1800);
  }

  _initStars() {
    const { width: w, height: h } = this.starCanvas;
    const count = Math.floor((w * h) / 3000);
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.8 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() < 0.05 ? "#fbbf24" : Math.random() < 0.05 ? "#60a5fa" : "#ffffff",
    }));
  }

  // ── SHOOTING STARS ──
  _spawnShootingStar() {
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
    this.shootingStars.push({
      x: Math.random() * this.starCanvas.width * 0.6,
      y: Math.random() * this.starCanvas.height * 0.4,
      vx: Math.cos(angle) * 14,
      vy: Math.sin(angle) * 14,
      alpha: 1,
      width: Math.random() * 0.8 + 0.4,
    });
  }

  _drawShootingStars() {
    this.shootingStars = this.shootingStars.filter(s => s.alpha > 0.01);
    this.shootingStars.forEach(s => {
      const { ctx } = this;
      ctx.save();
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 4, s.y - s.vy * 4);
      grad.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
      ctx.stroke(); ctx.restore();
      s.x += s.vx; s.y += s.vy; s.alpha -= 0.025;
    });
  }

  // ── ASTEROIDS ──
  _spawnAsteroid(init = false) {
    const { width: w, height: h } = this.starCanvas;
    const side = Math.floor(Math.random() * 4);
    const sp = Math.random() * 0.4 + 0.15;
    let x, y, vx, vy;
    if (side === 0)      { x = -30; y = Math.random() * h; vx = sp; vy = (Math.random() - 0.5) * 0.3; }
    else if (side === 1) { x = w + 30; y = Math.random() * h; vx = -sp; vy = (Math.random() - 0.5) * 0.3; }
    else if (side === 2) { x = Math.random() * w; y = -30; vx = (Math.random() - 0.5) * 0.3; vy = sp; }
    else                 { x = Math.random() * w; y = h + 30; vx = (Math.random() - 0.5) * 0.3; vy = -sp; }
    if (init) { x = Math.random() * w; y = Math.random() * h; }
    this.asteroids.push({
      x, y, vx, vy,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      rx: Math.random() * 7 + 4,
      ry: Math.random() * 5 + 3,
      alpha: Math.random() * 0.5 + 0.25,
      color: `hsl(${210 + Math.random() * 30},10%,${30 + Math.random() * 20}%)`,
    });
  }

  _drawAsteroids() {
    const { width: w, height: h } = this.starCanvas;
    this.asteroids = this.asteroids.filter(a => a.x > -60 && a.x < w + 60 && a.y > -60 && a.y < h + 60);
    while (this.asteroids.length < 8) this._spawnAsteroid();
    this.asteroids.forEach(a => {
      const { ctx } = this;
      ctx.save();
      ctx.translate(a.x, a.y); ctx.rotate(a.rot);
      ctx.globalAlpha = a.alpha;
      ctx.fillStyle = a.color;
      ctx.beginPath(); ctx.ellipse(0, 0, a.rx, a.ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = a.alpha * 0.5;
      ctx.fillStyle = "rgba(0,0,0,.4)";
      ctx.beginPath(); ctx.ellipse(-a.rx * 0.2, -a.ry * 0.2, a.rx * 0.3, a.ry * 0.3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      a.x += a.vx; a.y += a.vy; a.rot += a.rotSpeed;
    });
  }

  // ── ROCKETS ──
  _spawnRocket(init = false) {
    const { width: w, height: h } = this.starCanvas;
    const fromLeft = Math.random() < 0.5;
    const angle = fromLeft ? -Math.PI / 5 : Math.PI + Math.PI / 5;
    const speed = Math.random() * 0.6 + 0.4;
    this.rockets.push({
      x: init ? Math.random() * w : (fromLeft ? -40 : w + 40),
      y: init ? Math.random() * h * 0.7 + 50 : Math.random() * h * 0.6 + 50,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      angle: angle + Math.PI / 2,
      scale: Math.random() * 0.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.3,
      flicker: 0,
    });
  }

  _drawRocket(r) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(r.x, r.y); ctx.rotate(r.angle); ctx.scale(r.scale, r.scale);
    ctx.globalAlpha = r.alpha;
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath(); ctx.ellipse(0, 0, 5, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f472b6";
    ctx.beginPath(); ctx.moveTo(0, -11); ctx.lineTo(-4, -18); ctx.lineTo(4, -18); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath(); ctx.moveTo(-5, 5); ctx.lineTo(-9, 12); ctx.lineTo(-5, 9); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(5, 5); ctx.lineTo(9, 12); ctx.lineTo(5, 9); ctx.closePath(); ctx.fill();
    r.flicker = Math.random();
    const fLen = 14 + r.flicker * 6;
    const grad = ctx.createLinearGradient(0, 11, 0, 11 + fLen);
    grad.addColorStop(0, "rgba(251,191,36,0.9)");
    grad.addColorStop(0.5, "rgba(249,115,22,0.6)");
    grad.addColorStop(1, "rgba(239,68,68,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.ellipse(0, 11 + fLen * 0.4, 3 + r.flicker, fLen / 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  _drawRockets() {
    const { width: w, height: h } = this.starCanvas;
    this.rockets = this.rockets.filter(r => r.x > -80 && r.x < w + 80 && r.y > -80 && r.y < h + 80);
    while (this.rockets.length < 2) this._spawnRocket();
    this.rockets.forEach(r => { this._drawRocket(r); r.x += r.vx; r.y += r.vy; });
  }

  // ── NEBULA ──
  _drawNebula() {
    const { ctx } = this;
    const { width: w, height: h } = this.starCanvas;
    const nebs = [
      { x: 0.15, y: 0.3, rx: 200, ry: 120, color: "rgba(124,58,237," },
      { x: 0.80, y: 0.6, rx: 180, ry: 100, color: "rgba(8,145,178," },
      { x: 0.50, y: 0.1, rx: 260, ry: 80,  color: "rgba(190,24,93," },
      { x: 0.05, y: 0.8, rx: 150, ry: 90,  color: "rgba(16,185,129," },
    ];
    nebs.forEach(n => {
      const grad = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, Math.max(n.rx, n.ry));
      grad.addColorStop(0, `${n.color}0.028)`);
      grad.addColorStop(1, `${n.color}0)`);
      ctx.save();
      ctx.scale(1, n.ry / n.rx);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x * w, (n.y * h) * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
      ctx.fill(); ctx.restore();
    });
  }

  // ── PARTICLES ──
  spawnParticles(x, y, color) {
    for (let i = 0; i < 38; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 3 + 1,
        alpha: 1,
        color,
        decay: Math.random() * 0.025 + 0.015,
      });
    }
  }

  _drawParticles() {
    const { pCtx: ctx } = this;
    ctx.clearRect(0, 0, this.pCanvas.width, this.pCanvas.height);
    this.particles = this.particles.filter(p => p.alpha > 0);
    this.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.alpha -= p.decay;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
      ctx.fill();
    });
  }

  // ── MAIN DRAW ──
  draw(t) {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.starCanvas.width, this.starCanvas.height);
    this._drawNebula();
    this.stars.forEach(s => {
      const a = s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed * 1000 + s.phase));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color === "#ffffff" ? `rgba(255,255,255,${a})`
        : s.color === "#fbbf24" ? `rgba(251,191,36,${a})` : `rgba(96,165,250,${a})`;
      ctx.fill();
    });
    this._drawShootingStars();
    this._drawAsteroids();
    this._drawRockets();
    this._drawParticles();
  }
}
