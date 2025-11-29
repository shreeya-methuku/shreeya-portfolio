import React, { useEffect, useRef } from 'react';

export const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setSize();
    window.addEventListener('resize', setSize);

    // Star properties
    const stars: { x: number; y: number; z: number }[] = [];
    const numStars = 800;
    const speed = 0.5;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width
      });
    }

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Move star closer
        star.z -= speed;

        // Reset star if it passes camera
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // Project 3D position to 2D
        const x = (star.x / star.z) * width + cx;
        const y = (star.y / star.z) * height + cy;
        
        // Calculate size based on depth (Ensure non-negative)
        const size = Math.max(0, (1 - star.z / width) * 2.5);
        
        // Calculate opacity based on depth
        const opacity = (1 - star.z / width);

        if (x >= 0 && x < width && y >= 0 && y < height) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`; // Cyber primary color
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-60 pointer-events-none"
    />
  );
};