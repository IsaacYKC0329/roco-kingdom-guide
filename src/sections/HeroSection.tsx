import { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_elevation;
uniform float u_rotation;
uniform vec2 u_mouse;
#define PI 3.14159265359

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float valueNoise(vec2 p, float t) { return noise(p + t * 0.1); }

vec4 aurora(vec2 uv, float t) {
  vec3 col = vec3(0.0);
  float avgHeight = 0.0;
  float bandSign = 1.0;
  if (uv.y < 0.0) { uv = -uv; bandSign = -1.0; }
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float layerSeed = fi * 17.31;
    float speed = 0.3 + fi * 0.1;
    float baseFreqX = 1.5 + fi * 0.4;
    float waveAmpX = 0.08 - fi * 0.01;
    float bandPhase = fi * 0.15;
    float yBase = 0.2 + bandPhase * 0.12;
    float xShift = waveAmpX * sin(uv.y * baseFreqX + t * speed * 2.0 + layerSeed);
    xShift += (0.06 - fi * 0.008) * sin(uv.x * (2.0 + fi * 0.3) + t * speed * 1.5 + layerSeed + 1.0);
    float yTarget = yBase + xShift;
    float dist = abs(uv.y - yTarget);
    float intensity = exp(-dist * 8.0) * (0.6 - fi * 0.08);
    float yFade = 1.0;
    if (uv.y < 0.25) yFade = pow(uv.y / 0.25, 1.5);
    else if (uv.y > 0.55) yFade = pow((0.7 - uv.y) / 0.45, 1.2);
    intensity *= yFade;
    float hue = hash(vec2(layerSeed + 100.0, 0.0));
    vec3 auroraColor;
    if (hue < 0.33) auroraColor = mix(vec3(0.0, 1.0, 0.2), vec3(0.0, 0.8, 1.0), hue / 0.33);
    else if (hue < 0.66) auroraColor = mix(vec3(0.0, 0.8, 1.0), vec3(0.6, 0.0, 1.0), (hue - 0.33) / 0.33);
    else auroraColor = mix(vec3(0.6, 0.0, 1.0), vec3(1.0, 0.0, 0.5), (hue - 0.66) / 0.34);
    col += auroraColor * intensity * bandSign;
    avgHeight += intensity * yTarget;
  }
  return vec4(col, avgHeight);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv = uv * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;
  float t = u_time;
  float rot = u_rotation;
  vec2 starFieldUv = uv * 2.0;
  mat2 rotMat = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
  starFieldUv = rotMat * starFieldUv;
  vec3 bgColor = vec3(0.02, 0.03, 0.08);
  float starNoise = hash(starFieldUv * 50.0);
  bgColor += vec3(0.9, 0.95, 1.0) * smoothstep(0.98, 1.0, starNoise) * 0.8;
  vec4 aur = aurora(starFieldUv, t * 0.2);
  aur.rgb *= 0.6;
  bgColor += aur.rgb * smoothstep(-0.3, 0.2, starFieldUv.y);
  float noiseVal = valueNoise(starFieldUv * 3.0 + vec2(0.0, t * 0.05), t);
  bgColor += vec3(0.4, 0.3, 0.6) * noiseVal * (1.0 + aur.a * 0.5) * 0.3 * smoothstep(0.0, -0.4, uv.y);
  vec2 mOff = (u_mouse - 0.5) * 0.3;
  vec3 look = normalize(vec3(mOff.x, mOff.y + 0.3, 1.0));
  float sphereRadius = 0.35;
  vec3 oc = vec3(0.0);
  float b = dot(oc, look);
  float c = dot(oc, oc) - sphereRadius * sphereRadius;
  float discriminant = b * b - c;
  if (discriminant <= 0.0) { gl_FragColor = vec4(bgColor, 1.0); return; }
  float tHit = -b - sqrt(discriminant);
  vec3 hitPoint = look * tHit;
  vec3 normal = normalize(hitPoint);
  float sphereU = atan(normal.z, normal.x) / (2.0 * PI) + 0.5;
  float sphereV = normal.y * 0.5 + 0.5;
  float innerGlow = valueNoise(vec2(sphereU * 2.0 + t * 0.02, sphereV * 2.0), t * 0.5) * 0.5 + 0.5;
  float cloudPattern = smoothstep(0.4, 0.6, valueNoise(vec2(sphereU * 4.0 + t * 0.03, sphereV * 4.0 + t * 0.01), t * 0.8));
  vec3 sphereColor = mix(vec3(0.0, 0.8, 1.0), vec3(0.8, 0.0, 0.5), innerGlow);
  float fresnel = 1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0)));
  sphereColor += vec3(0.6, 0.8, 1.0) * pow(fresnel, 3.0) * 0.8;
  vec3 reflected = reflect(look, normal);
  vec2 reflectedUv = reflected.xy / (reflected.z + 1.0) * 0.5 + 0.5;
  mat2 elevRot = mat2(cos(u_elevation), -sin(u_elevation), sin(u_elevation), cos(u_elevation));
  reflectedUv = elevRot * reflectedUv;
  sphereColor += aurora(reflectedUv, t * 0.2).rgb * 0.5 * (1.0 - pow(fresnel, 3.0));
  sphereColor += vec3(1.0, 0.9, 0.8) * pow(max(dot(reflect(-vec3(0.0, 1.0, 0.0), normal), look), 0.0), 32.0) * 0.5;
  vec3 finalSphereColor = mix(sphereColor, bgColor, smoothstep(0.0, sphereRadius * 2.0, tHit) * 0.5);
  vec3 lightDir = normalize(vec3(0.5, 0.8, 0.3));
  finalSphereColor += vec3(0.8, 0.6, 1.0) * pow(max(dot(normal, lightDir), 0.0), 4.0) * 0.3;
  gl_FragColor = vec4(finalSphereColor, 1.0);
}
`;

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    }
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uElevation = gl.getUniformLocation(program, 'u_elevation');
    const uRotation = gl.getUniformLocation(program, 'u_rotation');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    gl.uniform1f(uElevation, 0.2);

    let rotation = 0;
    let animId: number;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    window.addEventListener('resize', resize);
    function render(time: number) {
      rotation += 0.0005;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.05;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.05;
      gl!.uniform1f(uTime, time * 0.001);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uRotation, rotation);
      gl!.uniform2f(uMouse, smoothMouseRef.current.x, smoothMouseRef.current.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" onMouseMove={(e) => { mouseRef.current.x = e.clientX / window.innerWidth; mouseRef.current.y = 1.0 - e.clientY / window.innerHeight; }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-sm tracking-[0.5em] text-[#F59E0B] mb-4 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Mobile MMORPG</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-glow" style={{ fontFamily: "'Cinzel', serif", background: 'linear-gradient(135deg, #F59E0B, #FBBF24, #D97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Roco Kingdom</h1>
        <p className="mt-3 text-lg md:text-xl text-[#94A3B8]" style={{ fontFamily: "'Inter', sans-serif" }}>Mobile Guide — 376+ Pets · Open World · Turn-Based Battles</p>
        <div className="mt-8 flex gap-4 pointer-events-auto">
          <a href="#pokedex-section" className="px-8 py-3 rounded-full glass text-[#F59E0B] font-medium hover:bg-[rgba(245,158,11,0.15)] transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-sm">Explore Pets</a>
          <a href="#guide-section" className="px-8 py-3 rounded-full glass text-[#38BDF8] font-medium hover:bg-[rgba(56,189,248,0.15)] transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] text-sm">Beginner Guide</a>
        </div>
      </div>
      <button onClick={() => document.getElementById('destiny-cards')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#94A3B8] hover:text-[#F59E0B] transition-colors cursor-pointer">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </button>
    </section>
  );
}
