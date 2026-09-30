"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// Flowing golden "silk" smoke from a tiny WebGL shader (fbm noise), leaning toward the cursor.
function Silk() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const gl = c.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const fs = `precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}
      void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*2.4;
        float q=fbm(p+vec2(t*.05,t*.03)+m*.4);float k=fbm(p+q*1.8+vec2(-t*.04,t*.06));
        float glow=smoothstep(.25,.85,k)*(.35+uv.y*.75);vec3 col=mix(vec3(.07,.06,.05),vec3(1.,.83,.45),glow*.8);
        col=mix(col,vec3(.9,.34,.18),smoothstep(.62,1.,k)*.25);gl_FragColor=vec4(col,glow*.9);}`;
    const sh = (type: number, src: string) => {
      const x = gl.createShader(type)!;
      gl.shaderSource(x, src);
      gl.compileShader(x);
      return x;
    };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, "r");
    const uT = gl.getUniformLocation(pr, "t");
    const uM = gl.getUniformLocation(pr, "m");
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const move = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", move);
    const start = performance.now();
    const step = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = c.clientWidth * dpr;
      const hh = c.clientHeight * dpr;
      if (c.width !== w || c.height !== hh) {
        c.width = w;
        c.height = hh;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.viewport(0, 0, w, hh);
      gl.uniform2f(uR, w, hh);
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.uniform2f(uM, mouse.x, -mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    let raf = 0;
    const loop = () => {
      step();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const iv = window.setInterval(() => document.visibilityState === "hidden" && step(), 60);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return <canvas ref={ref} className="hb-canvas" aria-hidden />;
}
/** Hero background: the silk shader (skipped when the visitor prefers reduced motion). */
export default function HeroBg() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(!prefersReducedMotion()), []);
  return <div className="hb" aria-hidden>{on && <Silk />}</div>;
}
