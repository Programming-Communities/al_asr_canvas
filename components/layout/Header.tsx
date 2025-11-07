'use client';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../shared/Logo';
import Navigation from './Navigation';
import ThemeToggle from '../shared/ThemeToggle';
import SearchBar from '../shared/SearchBar';
import MobileMenu from '../shared/MobileMenu';

const Header: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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

    class Particle {
      x = 0;
      y = 0;
      radius = 0;
      speed = 0;
      angle = 0;
      private canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.reset();
      }

      reset() {
        if (!this.canvas) return;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.radius = Math.random() * 2.5 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        if (!this.canvas) return;
        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 0 || this.x > this.canvas.width) this.angle = Math.PI - this.angle;
        if (this.y < 0 || this.y > this.canvas.height) this.angle = -this.angle;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const isRed = Math.random() > 0.6;
        ctx.fillStyle = isRed ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = isRed ? 12 : 6;
        ctx.shadowColor = isRed ? '#ef4444' : '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const numParticles = 90;

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(canvas));
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 130) {
            ctx.strokeStyle = `rgba(239, 68, 68, ${1 - distance / 130})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = 'rgba(127, 29, 29, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      connectParticles();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <header className="relative bg-red-950 text-white overflow-hidden py-8 px-5 md:px-12 lg:px-28">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <Logo />
          <Navigation />
          <div className="flex items-center gap-4">
            {/* Desktop Search - Hidden on mobile */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu />
            
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Search Overlay - Removed since it's now in MobileMenu */}
        
        <div className="text-center my-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            Al-Asr ( Islamic Service )
          </h1>
          <p className="mt-6 max-w-[740px] mx-auto text-lg leading-relaxed text-red-100">
            Islamic services, calendar events, and community programs. Stay updated
            with the latest from Al-Asr ( Islamic Service ).
          </p>
          <div className="flex justify-center mt-8">
            <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl shadow-xl border border-white/30 transform hover:scale-105 transition-all duration-300">
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