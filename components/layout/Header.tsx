'use client';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../shared/Logo';
import Navigation from './Navigation';
import ThemeToggle from '../shared/ThemeToggle';
import SearchBar from '../shared/SearchBar';
import MobileMenu from '../shared/MobileMenu';

const Header: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false); // ✅ Fixed: Added initial value and type

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced red and black themed color palette
    const colorPalettes = {
      redTheme: [
        { color: 'rgba(239, 68, 68, 0.95)', shadow: '#ef4444' },
        { color: 'rgba(220, 38, 38, 0.95)', shadow: '#dc2626' },
        { color: 'rgba(185, 28, 28, 0.95)', shadow: '#b91c1c' },
        { color: 'rgba(248, 113, 113, 0.95)', shadow: '#f87171' },
        { color: 'rgba(254, 202, 202, 0.95)', shadow: '#fecaca' },
        { color: 'rgba(127, 29, 29, 0.95)', shadow: '#7f1d1d' },
        { color: 'rgba(153, 27, 27, 0.95)', shadow: '#991b1b' },
        { color: 'rgba(255, 100, 100, 0.95)', shadow: '#ff6464' }
      ],
      accent: [
        { color: 'rgba(245, 158, 11, 0.85)', shadow: '#f59e0b' },
        { color: 'rgba(251, 191, 36, 0.85)', shadow: '#fbbf24' },
        { color: 'rgba(252, 211, 77, 0.85)', shadow: '#fcd34d' }
      ],
      special: [
        { color: 'rgba(255, 255, 255, 0.9)', shadow: '#ffffff' },
        { color: 'rgba(255, 255, 255, 0.7)', shadow: '#ffffff' }
      ]
    };

    class Particle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
      colorIndex: number;
      pulse: number;
      pulseSpeed: number;
      vx: number;
      vy: number;
      private canvas: HTMLCanvasElement;
      private palette: typeof colorPalettes.redTheme;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const rand = Math.random();
        if (rand > 0.9) {
          this.palette = colorPalettes.special;
        } else if (rand > 0.8) {
          this.palette = colorPalettes.accent;
        } else {
          this.palette = colorPalettes.redTheme;
        }
        this.colorIndex = Math.floor(Math.random() * this.palette.length);
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.speed = 0;
        this.angle = 0;
        this.pulse = 0;
        this.pulseSpeed = 0;
        this.vx = 0;
        this.vy = 0;
        this.reset();
      }

      reset() {
        if (!this.canvas) return;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.radius = Math.random() * 3.5 + 1;
        this.speed = Math.random() * 0.8 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
      }

      update() {
        if (!this.canvas) return;
        
        this.vx += (Math.random() - 0.5) * 0.1;
        this.vy += (Math.random() - 0.5) * 0.1;
        
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2) {
          this.vx = (this.vx / speed) * 2;
          this.vy = (this.vy / speed) * 2;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) {
          this.vx *= -0.9;
          this.x = this.x < 0 ? 0 : this.canvas.width;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
          this.vy *= -0.9;
          this.y = this.y < 0 ? 0 : this.canvas.height;
        }

        this.pulse += this.pulseSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulseFactor = Math.sin(this.pulse) * 0.4 + 0.7;
        const currentRadius = this.radius * pulseFactor;
        const colorInfo = this.palette[this.colorIndex];

        ctx.save();
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius * 2.5
        );
        
        if (this.palette === colorPalettes.special) {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 100, 100, 0.2)');
        } else if (this.palette === colorPalettes.accent) {
          gradient.addColorStop(0, colorInfo.color.replace('0.85', '1'));
          gradient.addColorStop(0.4, colorInfo.color.replace('0.85', '0.9'));
          gradient.addColorStop(1, 'rgba(255, 200, 100, 0.2)');
        } else {
          gradient.addColorStop(0, colorInfo.color.replace('0.95', '1'));
          gradient.addColorStop(0.5, colorInfo.color.replace('0.95', '0.8'));
          gradient.addColorStop(1, colorInfo.color.replace('0.95', '0.1'));
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        
        ctx.shadowBlur = 40 * pulseFactor;
        ctx.shadowColor = colorInfo.shadow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 0.3, 0, Math.PI * 2);
        
        if (this.palette === colorPalettes.special) {
          ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        } else if (this.palette === colorPalettes.accent) {
          ctx.fillStyle = 'rgba(255, 255, 200, 0.9)';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        }
        
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        ctx.restore();
      }

      getColor() {
        return this.palette[this.colorIndex];
      }
    }

    const particles: Particle[] = [];
    const numParticles = isMobile ? 70 : 140;

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(canvas));
    }

    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            const color1 = particles[i].getColor();
            const color2 = particles[j].getColor();
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            const opacity1 = (opacity * 0.7).toFixed(2);
            const opacity2 = (opacity * 0.7).toFixed(2);
            
            gradient.addColorStop(0, color1.color.replace(/0\.\d+/, opacity1));
            gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.5})`);
            gradient.addColorStop(0.7, `rgba(255, 200, 200, ${opacity * 0.4})`);
            gradient.addColorStop(1, color2.color.replace(/0\.\d+/, opacity2));

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2;
            ctx.lineCap = 'round';
            
            ctx.shadowBlur = 25 * opacity;
            ctx.shadowColor = color1.shadow;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.shadowBlur = 0;
    };

    const drawBackground = () => {
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width, canvas.height, Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient1.addColorStop(0, 'rgba(127, 29, 29, 0.6)');
      gradient1.addColorStop(0.4, 'rgba(69, 10, 10, 0.7)');
      gradient1.addColorStop(0.8, 'rgba(20, 0, 0, 0.9)');
      gradient1.addColorStop(1, 'rgba(0, 0, 0, 1)');
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient2.addColorStop(0, 'rgba(127, 29, 29, 0.3)');
      gradient2.addColorStop(0.5, 'rgba(185, 28, 28, 0.2)');
      gradient2.addColorStop(1, 'rgba(69, 10, 10, 0.3)');
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const opacity = Math.random() * 0.1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, size, size);
      }
    };

    let lastTime = 0;
    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return;

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      connectParticles();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <header className="relative bg-black text-white overflow-hidden py-8 px-5 md:px-12 lg:px-28">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-100"
      />

      {/* Fixed: Use original Tailwind classes */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-red-950/70 to-black pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <Logo />
          <Navigation />
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <MobileMenu />
            <ThemeToggle />
          </div>
        </div>

        <div className="text-center my-12">
          {/* Fixed: Use original Tailwind classes */}
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight drop-shadow-lg bg-linear-to-r from-white to-red-200 bg-clip-text text-transparent">
            Al-Asr ( Islamic Service )
          </h1>
          <p className="mt-6 max-w-[740px] mx-auto text-lg leading-relaxed text-red-100">
            Islamic services, calendar events, and community programs. Stay updated
            with the latest from Al-Asr ( Islamic Service ).
          </p>
          <div className="flex justify-center mt-8">
            <div className="bg-red-900/50 backdrop-blur-lg text-white px-8 py-4 rounded-xl shadow-2xl border border-red-500/40 transform hover:scale-105 transition-all duration-300 hover:bg-red-800/60 hover:border-red-400/60">
              <p className="font-bold text-base">
                Islamic Calendar • Services • Community
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;