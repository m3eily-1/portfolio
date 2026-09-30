import * as THREE from "three";

export type RingCard = { src: string; slug: string; label: string };

export type RingScene = {
  addVelocity: (v: number) => void;
  destroy: () => void;
};

type Opts = {
  onHover: (card: RingCard | null) => void;
  onSelect: (card: RingCard) => void;
  /** Solid placeholder colour for every card; when set, images are not loaded. */
  fill?: string;
};

const R = 6; // ring radius
const H = 2.15; // card height
const GAP = 0.05; // radians between cards

/** A plane bent onto the inside of a cylinder of radius R, centred on angle 0 (the −z axis). */
function curvedCard(arc: number) {
  const g = new THREE.PlaneGeometry(1, H, 32, 1);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const a = pos.getX(i) * arc; // −arc/2 … arc/2
    pos.setXYZ(i, Math.sin(a) * R, pos.getY(i), -Math.cos(a) * R);
  }
  g.computeVertexNormals();
  return g;
}

export function createRingScene(canvas: HTMLCanvasElement, cards: RingCard[], opts: Opts): RingScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 50);
  const ring = new THREE.Group();
  scene.add(ring);

  const n = cards.length;
  const step = (Math.PI * 2) / n;
  const arc = step - GAP;
  const geo = curvedCard(arc);
  const cardAspect = (R * arc) / H;
  const loader = new THREE.TextureLoader();
  const meshes: THREE.Mesh[] = [];

  // Small rounded corners (Ahmed's request for the ring thumbnails) via a shared alpha mask.
  const RADIUS = 0.07; // world units ≈ 8–10 px on a 1440-wide screen
  const mw = 512;
  const mh = Math.round(mw / cardAspect);
  const mc = document.createElement("canvas");
  mc.width = mw;
  mc.height = mh;
  const mg = mc.getContext("2d")!;
  mg.fillStyle = "#000";
  mg.fillRect(0, 0, mw, mh);
  mg.fillStyle = "#fff";
  mg.beginPath();
  mg.roundRect(0, 0, mw, mh, (RADIUS / H) * mh);
  mg.fill();
  const corners = new THREE.CanvasTexture(mc);

  cards.forEach((c, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: opts.fill ?? "#1c1916", alphaMap: corners, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const m = new THREE.Mesh(geo, mat);
    m.rotation.y = -i * step;
    m.userData = { card: c, hover: 0, reveal: 0, delay: i * 0.05 };
    ring.add(m);
    meshes.push(m);
    if (opts.fill) return;
    loader.load(c.src, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      // object-fit: cover
      const img = t.image as HTMLImageElement;
      const ta = img.width / img.height;
      if (ta > cardAspect) {
        t.repeat.set(cardAspect / ta, 1);
        t.offset.set((1 - cardAspect / ta) / 2, 0);
      } else {
        t.repeat.set(1, ta / cardAspect);
        t.offset.set(0, (1 - ta / cardAspect) / 2);
      }
      mat.map = t;
      mat.color.set("#ffffff");
      mat.needsUpdate = true;
    });
  });

  // --- sizing -----------------------------------------------------------------
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Narrow screens: pull the camera back so more than two cards fit.
    const narrow = w / h < 1;
    camera.fov = narrow ? 70 : 58;
    camera.position.set(0, narrow ? -0.9 : -1.25, narrow ? 3.2 : 4.1);
    camera.lookAt(0, camera.position.y, -R);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // --- interaction --------------------------------------------------------------
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let hovered: THREE.Mesh | null = null;
  let dragging = false;
  let lastX = 0;
  let moved = 0;

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    pointer.tx = ndc.x;
    pointer.ty = ndc.y;
    if (dragging) {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      velocity += dx * 0.0022;
    }
  };
  const onLeave = () => ndc.set(9, 9);
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    moved = 0;
  };
  const onUp = () => {
    if (dragging && moved < 6 && hovered) opts.onSelect(hovered.userData.card);
    dragging = false;
  };
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);

  // --- loop ---------------------------------------------------------------------
  const start = performance.now();
  let last = start;
  let velocity = 0;
  let angle = 0;
  const BASE = 0.055; // rad/s idle spin

  const step_ = () => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = (now - start) / 1000;

    // Intro: a fast spin that settles into the idle drift.
    const intro = Math.max(0, 1 - t / 2.4);
    angle += (BASE + velocity + intro * intro * 2.2) * dt;
    velocity *= Math.pow(0.04, dt); // decay
    ring.rotation.y = angle;

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    ring.rotation.x = pointer.y * 0.035;
    ring.rotation.z = pointer.x * -0.02;

    // Hover
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(meshes, false)[0];
    const h = (hit?.object as THREE.Mesh) ?? null;
    if (h !== hovered) {
      hovered = h;
      opts.onHover(h ? h.userData.card : null);
      canvas.style.cursor = h ? "pointer" : "";
    }

    for (const m of meshes) {
      const u = m.userData;
      u.reveal = Math.min(1, Math.max(0, (t - 0.35 - u.delay) / 0.9));
      u.hover += ((m === hovered ? 1 : 0) - u.hover) * 0.12;
      const mat = m.material as THREE.MeshBasicMaterial;
      const e = 1 - Math.pow(1 - u.reveal, 3);
      mat.opacity = e * (0.82 + u.hover * 0.18);
      const s = 1 + u.hover * 0.04;
      m.scale.set(s, s * (0.6 + e * 0.4), s);
      m.position.y = (1 - e) * -0.6 + u.hover * 0.08;
    }
    renderer.render(scene, camera);
  };

  let raf = 0;
  const loop = () => {
    step_();
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  // rAF is paused in hidden tabs/panes; keep the scene alive there too.
  const iv = window.setInterval(() => document.visibilityState === "hidden" && step_(), 50);

  return {
    addVelocity(v) {
      velocity += v;
    },
    destroy() {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      meshes.forEach((m) => (m.material as THREE.MeshBasicMaterial).map?.dispose());
      geo.dispose();
      corners.dispose();
      renderer.dispose();
    },
  };
}
