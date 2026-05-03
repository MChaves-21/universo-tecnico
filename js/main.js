// main.js — ponto de entrada da aplicação
import { BackgroundEngine } from "./background.js";
import { CursorEngine, TravelEngine } from "./cursor.js";
import { MapEngine } from "./map.js";
import { UIEngine } from "./ui.js";

// ── INIT ──
const bgEngine     = new BackgroundEngine(
  document.getElementById("starfield"),
  document.getElementById("particles")
);
const mapEngine    = new MapEngine();
const cursorEngine = new CursorEngine();
const travelEngine = new TravelEngine();
const uiEngine     = new UIEngine(bgEngine, mapEngine, travelEngine);

cursorEngine.bindNodes();
mapEngine.revealNodes();

// ── LOOP PRINCIPAL ──
function loop(t) {
  bgEngine.draw(t / 1000);
  mapEngine.tick();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ── RESIZE ──
window.addEventListener("resize", () => bgEngine.resize());
