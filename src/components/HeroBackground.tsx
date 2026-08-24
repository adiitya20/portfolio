"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/context/ExperienceContext";
import { usePrefersReducedMotion } from "@/lib/useMedia";

const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  
  // Wave deformation
  float wave = sin(uv.x * 8.0 + uTime * 0.4) * cos(uv.y * 8.0 + uTime * 0.3) * 0.08;
  vec2 distUv = uv + vec2(wave, wave);
  
  float n = noise(distUv * 3.2 + uTime * 0.04);
  n += 0.35 * noise(distUv * 7.5 - uTime * 0.05 + uMouse * 1.2);
  
  // Grid line accent
  vec2 gridUv = fract(distUv * 16.0);
  float grid = smoothstep(0.02, 0.0, abs(gridUv.x - 0.5)) + smoothstep(0.02, 0.0, abs(gridUv.y - 0.5));
  
  float distToMouse = distance(uv, uMouse);
  float glow = smoothstep(0.45, 0.0, distToMouse);
  float ripple = sin(distToMouse * 24.0 - uTime * 2.5) * 0.5 + 0.5;
  
  vec3 paper = vec3(0.953, 0.937, 0.902);
  vec3 ridge = vec3(0.884, 0.837, 0.743);
  vec3 accent = vec3(0.706, 0.290, 0.157);
  
  vec3 col = mix(paper, ridge, n * 0.58 + grid * 0.04);
  col = mix(col, accent, glow * 0.09 + glow * ripple * 0.04);
  
  gl_FragColor = vec4(col, 1.0);
}
`;

function Field() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.x += (event.clientX / window.innerWidth - mouse.current.x) * 0.08;
      mouse.current.y += (1 - event.clientY / window.innerHeight - mouse.current.y) * 0.08;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh scale={[2.2, 2.2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial ref={material} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

function Fallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#ead9c8,transparent_42%),radial-gradient(circle_at_80%_70%,#d9cbb6,transparent_36%),#f3efe6]" />
  );
}

export function HeroBackground() {
  const reduced = usePrefersReducedMotion();
  const { loaded } = useExperience();
  const wrap = useRef<HTMLDivElement>(null);

  if (reduced) return <Fallback />;

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden">
      <Fallback />
      {loaded ? (
        <Canvas
          className="absolute inset-0"
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 1] }}
          onCreated={({ gl }) => {
            gl.setClearColor("#f3efe6", 0);
          }}
        >
          <Field />
        </Canvas>
      ) : null}
    </div>
  );
}
