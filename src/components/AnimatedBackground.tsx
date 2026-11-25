import React, { useEffect, useRef, useState } from 'react';

export type BackgroundStyle = 'crystals' | 'dotgrid' | 'aurora' | 'topographic';

interface PolyhedronData {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  vrx: number;
  vry: number;
  vrz: number;
  size: number;
  type: 'octa' | 'cube' | 'tetra' | 'icosa';
  color: string;
  alpha: number;
}

interface GridDot {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const styleRef = useRef<BackgroundStyle>('crystals');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initGridDots();
    };

    // Warm Palette Colors
    const primaryAmber = '217, 119, 6';     // #D97706
    const warmTerracotta = '194, 65, 12';  // #C2410C
    const honeyGold = '245, 158, 11';      // #F59E0B
    const bronzeSepia = '146, 64, 14';     // #92400E

    // Mouse Tracking (Smooth Damped)
    const targetMouse = { x: -1000, y: -1000, active: false };
    const smoothMouse = { x: -1000, y: -1000, intensity: 0 };

    // --- 1. SETUP: 3D GLASS POLYHEDRA & CRYSTALS ---
    const polyhedraCount = Math.min(Math.floor(width / 95), 16);
    const polyhedra: PolyhedronData[] = [];
    const polyTypes: ('octa' | 'cube' | 'tetra' | 'icosa')[] = ['octa', 'cube', 'tetra', 'icosa'];
    const polyColors = [primaryAmber, warmTerracotta, honeyGold];

    for (let i = 0; i < polyhedraCount; i++) {
      polyhedra.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: (Math.random() - 0.5) * 350,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.2,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        vrx: (Math.random() - 0.5) * 0.012,
        vry: (Math.random() - 0.5) * 0.015,
        vrz: (Math.random() - 0.5) * 0.01,
        size: 26 + Math.random() * 28,
        type: polyTypes[i % polyTypes.length],
        color: polyColors[i % polyColors.length],
        alpha: 0.35 + Math.random() * 0.35
      });
    }

    // Polyhedra Vertices and Faces definitions
    const getPolyGeometry = (type: 'octa' | 'cube' | 'tetra' | 'icosa') => {
      if (type === 'octa') {
        return {
          vertices: [
            [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]
          ],
          faces: [
            [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
            [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
          ]
        };
      } else if (type === 'cube') {
        return {
          vertices: [
            [-0.7, -0.7, -0.7], [0.7, -0.7, -0.7], [0.7, 0.7, -0.7], [-0.7, 0.7, -0.7],
            [-0.7, -0.7, 0.7], [0.7, -0.7, 0.7], [0.7, 0.7, 0.7], [-0.7, 0.7, 0.7]
          ],
          faces: [
            [0, 1, 2, 3], [5, 4, 7, 6], [4, 0, 3, 7],
            [1, 5, 6, 2], [4, 5, 1, 0], [3, 2, 6, 7]
          ]
        };
      } else if (type === 'tetra') {
        return {
          vertices: [
            [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]
          ],
          faces: [
            [0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]
          ]
        };
      } else {
        // Icosahedron
        const phi = (1 + Math.sqrt(5)) / 2 * 0.65;
        const a = 0.65;
        return {
          vertices: [
            [-a, phi, 0], [a, phi, 0], [-a, -phi, 0], [a, -phi, 0],
            [0, -a, phi], [0, a, phi], [0, -a, -phi], [0, a, -phi],
            [phi, 0, -a], [phi, 0, a], [-phi, 0, -a], [-phi, 0, a]
          ],
          faces: [
            [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
            [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
            [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
            [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
          ]
        };
      }
    };

    // --- 2. SETUP: KINETIC MAGNETIC DOT GRID ---
    let gridDots: GridDot[] = [];
    const gridSpacing = 32;

    const initGridDots = () => {
      gridDots = [];
      const cols = Math.floor(width / gridSpacing) + 2;
      const rows = Math.floor(height / gridSpacing) + 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const ox = c * gridSpacing;
          const oy = r * gridSpacing;
          gridDots.push({
            originX: ox,
            originY: oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            baseRadius: 1.2
          });
        }
      }
    };

    initGridDots();
    resize();

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      targetMouse.active = false;
      setMousePos({ x: -1000, y: -1000 });
    };

    const handleClick = (e: MouseEvent) => {
      // Impulse on crystals or grid
      polyhedra.forEach((p) => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          p.vrx += (Math.random() - 0.5) * 0.08;
          p.vry += (Math.random() - 0.5) * 0.08;
          p.vz += (Math.random() - 0.5) * 4;
        }
      });

      gridDots.forEach((dot) => {
        const dx = dot.x - e.clientX;
        const dy = dot.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 1) {
          const force = (1 - dist / 200) * 20;
          dot.vx += (dx / dist) * force;
          dot.vy += (dy / dist) * force;
        }
      });
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let time = 0;

    // --- MAIN RENDER LOOP ---
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      if (targetMouse.active) {
        smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.12;
        smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.12;
        smoothMouse.intensity += (1 - smoothMouse.intensity) * 0.08;
      } else {
        smoothMouse.intensity += (0 - smoothMouse.intensity) * 0.05;
      }

      const currentStyle = styleRef.current;

      // =======================================================================
      // MODE 1: 🔮 3D GLASS POLYHEDRA & CRYSTALS (Default)
      // =======================================================================
      if (currentStyle === 'crystals') {
        const fov = 550;
        const lightDir = [0.45, -0.65, 0.6];
        const lightLen = Math.sqrt(lightDir[0] ** 2 + lightDir[1] ** 2 + lightDir[2] ** 2);
        const lx = lightDir[0] / lightLen;
        const ly = lightDir[1] / lightLen;
        const lz = lightDir[2] / lightLen;

        // Sort polyhedra back-to-front by z depth
        polyhedra.sort((a, b) => b.z - a.z);

        polyhedra.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.rx += p.vrx;
          p.ry += p.vry;
          p.rz += p.vrz;

          // Wrap edges
          if (p.x < -60) p.x = width + 60;
          if (p.x > width + 60) p.x = -60;
          if (p.y < -60) p.y = height + 60;
          if (p.y > height + 60) p.y = -60;
          if (p.z < -200) p.z = 250;
          if (p.z > 250) p.z = -200;

          // Mouse gentle repulsion & parallax tilt
          if (smoothMouse.intensity > 0.05) {
            const dx = p.x - smoothMouse.x;
            const dy = p.y - smoothMouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 180;

            if (dist < repelRadius && dist > 1) {
              const force = (1 - dist / repelRadius) * 1.6;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
              p.vrx += (dy / dist) * 0.002;
              p.vry += (dx / dist) * 0.002;
            }
          }

          const geom = getPolyGeometry(p.type);
          const scale = fov / (fov + p.z);
          const size = p.size * scale;

          // 3D Rotation matrices
          const cx = Math.cos(p.rx), sx = Math.sin(p.rx);
          const cy = Math.cos(p.ry), sy = Math.sin(p.ry);
          const cz = Math.cos(p.rz), sz = Math.sin(p.rz);

          // Project vertices to 2D
          const projected = geom.vertices.map((v) => {
            // Rotate X
            let y1 = v[1] * cx - v[2] * sx;
            let z1 = v[1] * sx + v[2] * cx;
            // Rotate Y
            let x2 = v[0] * cy + z1 * sy;
            let z2 = -v[0] * sy + z1 * cy;
            // Rotate Z
            let x3 = x2 * cz - y1 * sz;
            let y3 = x2 * sz + y1 * cz;

            return {
              x: p.x + x3 * size,
              y: p.y + y3 * size,
              z: z2 * size
            };
          });

          // Draw Faces with Glass Translucency & Specular Highlights
          geom.faces.forEach((face) => {
            const v0 = projected[face[0]];
            const v1 = projected[face[1]];
            const v2 = projected[face[2]];

            // Normal vector via cross product
            const ax = v1.x - v0.x;
            const ay = v1.y - v0.y;
            const az = v1.z - v0.z;
            const bx = v2.x - v0.x;
            const by = v2.y - v0.y;
            const bz = v2.z - v0.z;

            const nx = ay * bz - az * by;
            const ny = az * bx - ax * bz;
            const nz = ax * by - ay * bx;
            const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz);

            if (nLen > 0.001) {
              const normalZ = nz / nLen;
              // Double-sided semi-transparent glass
              const dot = Math.abs((nx / nLen) * lx + (ny / nLen) * ly + (nz / nLen) * lz);
              const faceAlpha = Math.min(0.24, p.alpha * (0.06 + dot * 0.18));

              ctx.beginPath();
              ctx.moveTo(v0.x, v0.y);
              for (let i = 1; i < face.length; i++) {
                ctx.lineTo(projected[face[i]].x, projected[face[i]].y);
              }
              ctx.closePath();

              ctx.fillStyle = `rgba(${p.color}, ${faceAlpha})`;
              ctx.fill();

              // Glowing Glass Edges
              ctx.strokeStyle = `rgba(${p.color}, ${p.alpha * 0.55})`;
              ctx.lineWidth = 1.1;
              ctx.stroke();
            }
          });

          // Draw Glowing Vertex Nodes
          projected.forEach((v) => {
            ctx.beginPath();
            ctx.arc(v.x, v.y, 1.8 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${honeyGold}, ${p.alpha * 0.75})`;
            ctx.fill();
          });
        });
      }

      // =======================================================================
      // MODE 2: 🔲 KINETIC MAGNETIC DOT GRID
      // =======================================================================
      else if (currentStyle === 'dotgrid') {
        const mouseRadius = 150;

        gridDots.forEach((dot) => {
          // Ambient gentle harmonic wave
          const waveX = Math.sin(dot.originX * 0.006 + dot.originY * 0.006 + time * 1.5) * 2.5;
          const waveY = Math.cos(dot.originX * 0.006 - dot.originY * 0.006 + time * 1.2) * 2.5;

          const targetX = dot.originX + waveX;
          const targetY = dot.originY + waveY;

          // Mouse magnetic displacement
          if (smoothMouse.intensity > 0.05) {
            const dx = dot.x - smoothMouse.x;
            const dy = dot.y - smoothMouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 1) {
              const factor = (1 - dist / mouseRadius);
              const repelForce = factor * factor * 26 * smoothMouse.intensity;
              dot.vx += (dx / dist) * repelForce * 0.2;
              dot.vy += (dy / dist) * repelForce * 0.2;
            }
          }

          // Spring damping towards target
          dot.vx += (targetX - dot.x) * 0.08;
          dot.vy += (targetY - dot.y) * 0.08;
          dot.vx *= 0.82;
          dot.vy *= 0.82;

          dot.x += dot.vx;
          dot.y += dot.vy;

          // Distance to mouse for brightness
          const dToMouse = Math.sqrt((dot.x - smoothMouse.x) ** 2 + (dot.y - smoothMouse.y) ** 2);
          const isNearMouse = dToMouse < mouseRadius && smoothMouse.intensity > 0.1;
          const nearFactor = isNearMouse ? (1 - dToMouse / mouseRadius) : 0;

          const radius = dot.baseRadius + nearFactor * 2.2;
          const alpha = 0.22 + nearFactor * 0.65;
          const color = nearFactor > 0.3 ? honeyGold : primaryAmber;

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          if (nearFactor > 0.4) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${honeyGold}, 0.7)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // =======================================================================
      // MODE 3: 🌊 LIQUID HONEY AURORA
      // =======================================================================
      else if (currentStyle === 'aurora') {
        const waveCount = 5;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const baseH = (height / (waveCount + 1)) * (w + 1);
          const freq = 0.0018 + w * 0.0006;
          const amp = 35 + w * 8;
          const speed = 0.8 + w * 0.2;

          ctx.moveTo(0, height);
          ctx.lineTo(0, baseH);

          for (let x = 0; x <= width; x += 30) {
            let y = baseH + Math.sin(x * freq + time * speed) * amp + Math.cos(x * 0.001 + time * 0.5) * 18;

            if (smoothMouse.intensity > 0.05) {
              const dx = x - smoothMouse.x;
              const dy = y - smoothMouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 180) {
                const f = (1 - dist / 180);
                y += Math.sin(dist * 0.05 - time * 2) * 16 * f * smoothMouse.intensity;
              }
            }
            ctx.lineTo(x, y);
          }

          ctx.lineTo(width, height);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, baseH - amp, 0, height);
          const col = w % 2 === 0 ? primaryAmber : warmTerracotta;
          grad.addColorStop(0, `rgba(${col}, 0.055)`);
          grad.addColorStop(1, 'rgba(250, 247, 242, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // =======================================================================
      // MODE 4: 🌾 TOPOGRAPHIC SILK WAVES
      // =======================================================================
      else if (currentStyle === 'topographic') {
        const lineCount = 20;
        const vSpace = height / (lineCount + 1);

        for (let i = 0; i < lineCount; i++) {
          const baseY = vSpace * (i + 1);
          ctx.beginPath();

          for (let x = 0; x <= width; x += 22) {
            let y = baseY + Math.sin(x * 0.002 + time * 0.8 + i * 0.3) * 22;
            if (smoothMouse.intensity > 0.05) {
              const dx = x - smoothMouse.x;
              const dy = y - smoothMouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 170) {
                const f = (1 - dist / 170);
                y += f * f * 35 * smoothMouse.intensity;
              }
            }
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.strokeStyle = `rgba(${primaryAmber}, ${0.15 + (i / lineCount) * 0.15})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#FAF7F2]">
      {/* Dynamic Cursor Spotlight Radial Warm Amber Glow */}
      <div
        className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full blur-[130px] opacity-40 transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)'
        }}
      />

      {/* Floating 3D Ambient Aura Orbs: Champagne Gold, Terracotta Peach & Rose Beige */}
      <div className="absolute -top-32 -left-32 w-[400px] sm:w-[680px] h-[400px] sm:h-[680px] bg-amber-200/40 rounded-full blur-[140px] animate-float-orb-1" />
      <div className="absolute top-1/3 -right-32 w-[380px] sm:w-[620px] h-[380px] sm:h-[620px] bg-orange-200/30 rounded-full blur-[140px] animate-float-orb-2" />
      <div className="absolute -bottom-36 left-1/4 w-[420px] sm:w-[720px] h-[420px] sm:h-[720px] bg-rose-100/40 rounded-full blur-[150px] animate-float-orb-3" />

      {/* Primary HTML5 Interactive Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
