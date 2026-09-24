import React, { useEffect, useRef } from 'react';

interface KineticCircuitCanvasProps {
  isDark?: boolean;
}

export const KineticCircuitCanvas: React.FC<KineticCircuitCanvasProps> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Biratnagar Hub Coordinates (Normalized percentages)
    const hubs = [
      { name: 'Roadcess', x: 0.22, y: 0.35 },
      { name: 'Bargachhi', x: 0.45, y: 0.22 },
      { name: 'Traffic Chowk', x: 0.72, y: 0.38 },
      { name: 'Rani Border', x: 0.32, y: 0.68 },
      { name: 'Duhabi Corridor', x: 0.82, y: 0.62 },
    ];

    // Connection Lines between hubs
    const connections = [
      [0, 1], // Roadcess <-> Bargachhi
      [1, 2], // Bargachhi <-> Traffic Chowk
      [0, 3], // Roadcess <-> Rani
      [2, 4], // Traffic Chowk <-> Duhabi
      [1, 4], // Bargachhi <-> Duhabi
    ];

    // Moving Pulses (representing active repair requests traveling across Biratnagar)
    interface Pulse {
      connIndex: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }

    const pulses: Pulse[] = [
      { connIndex: 0, progress: 0.1, speed: 0.004, color: '#FF6B00', size: 3.5 },
      { connIndex: 1, progress: 0.6, speed: 0.005, color: '#FFB800', size: 4 },
      { connIndex: 2, progress: 0.3, speed: 0.0035, color: '#10B981', size: 3 },
      { connIndex: 3, progress: 0.8, speed: 0.0045, color: '#FF6B00', size: 3.5 },
      { connIndex: 4, progress: 0.4, speed: 0.005, color: '#38BDF8', size: 3.5 },
    ];

    // Ambient floating workshop sparkles (warm, cheerful, delightful)
    const sparkleCount = 45;
    const sparkles = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    // Mouse interactive gravity
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Draw subtle circuit connections between Biratnagar hubs
      connections.forEach(([fromIdx, toIdx]) => {
        const from = hubs[fromIdx];
        const to = hubs[toIdx];

        const x1 = from.x * width;
        const y1 = from.y * height;
        const x2 = to.x * width;
        const y2 = to.y * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isDark ? 'rgba(255, 107, 0, 0.14)' : 'rgba(255, 107, 0, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Draw Hub Nodes
      hubs.forEach((hub) => {
        const hx = hub.x * width;
        const hy = hub.y * height;

        // Outer glow circle
        ctx.beginPath();
        ctx.arc(hx, hy, 7, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 107, 0, 0.12)';
        ctx.fill();

        // Inner solid node
        ctx.beginPath();
        ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#FFB800' : '#FF6B00';
        ctx.fill();
      });

      // 3. Move and draw pulses traveling along the lines
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const [fromIdx, toIdx] = connections[p.connIndex];
        const from = hubs[fromIdx];
        const to = hubs[toIdx];

        const px = from.x * width + (to.x * width - from.x * width) * p.progress;
        const py = from.y * height + (to.y * height - from.y * height) * p.progress;

        // Glowing pulse head
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDark ? 10 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Render gentle ambient workshop sparkles
      sparkles.forEach((s) => {
        s.y += s.vy;
        s.x += s.vx;
        s.pulse += 0.03;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        const alpha = Math.max(0.1, Math.min(0.8, s.alpha + Math.sin(s.pulse) * 0.25));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 184, 0, ${alpha * 0.7})`
          : `rgba(255, 107, 0, ${alpha * 0.5})`;
        ctx.fill();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
