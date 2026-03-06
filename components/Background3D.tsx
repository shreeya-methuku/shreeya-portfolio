import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  colorType: number; // 0=green, 1=cyan, 2=purple
}

export const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Track mouse for parallax
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: (e.clientX / width - 0.5) * 2,  // -1 to 1
        y: (e.clientY / height - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Stars — weighted toward green, occasional cyan/purple
    const stars: Star[] = [];
    const numStars = 900;
    for (let i = 0; i < numStars; i++) {
      const rand = Math.random();
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        colorType: rand < 0.72 ? 0 : rand < 0.88 ? 1 : 2,
      });
    }

    const COLORS = [
      (o: number) => `rgba(16,185,129,${o})`,   // emerald
      (o: number) => `rgba(6,182,212,${o})`,     // cyan
      (o: number) => `rgba(139,92,246,${o})`,    // violet
    ];

    const speed = 0.55;

    const animate = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.92)';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

      const cx = width / 2 + mouseRef.current.x * 18;
      const cy = height / 2 + mouseRef.current.y * 12;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          const rand = Math.random();
          star.colorType = rand < 0.72 ? 0 : rand < 0.88 ? 1 : 2;
        }

        const sx = (star.x / star.z) * width + cx;
        const sy = (star.y / star.z) * height + cy;
        const depth = 1 - star.z / width;
        const size = Math.max(0, depth * 2.8);
        const opacity = depth * 0.9;

        if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
          // Draw streak for fast/close stars
          if (depth > 0.85 && size > 1.5) {
            const prevSx = (star.x / (star.z + speed * 6)) * width + cx;
            const prevSy = (star.y / (star.z + speed * 6)) * height + cy;
            ctx.beginPath();
            ctx.strokeStyle = COLORS[star.colorType](opacity * 0.6);
            ctx.lineWidth = size * 0.5;
            ctx.moveTo(prevSx, prevSy);
            ctx.lineTo(sx, sy);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.fillStyle = COLORS[star.colorType](opacity);
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.65 }}
      />
      {/* Subtle perspective grid overlay at bottom third */}
      <div
        className="fixed bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: '35vh',
          background: 'linear-gradient(transparent, rgba(5,5,5,0.6))',
          maskImage: 'linear-gradient(transparent, black)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(400px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>
    </>
  );
};
