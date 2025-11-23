'use client';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../shared/Logo';
import Navigation from './Navigation';
import ThemeToggle from '../shared/ThemeToggle';
import SearchBar from '../shared/SearchBar';
import MobileMenu from '../shared/MobileMenu';
import CategoriesNavbar from './CategoriesNavbar';
import SidebarMenu from './SidebarMenu';
import { FixedIcons } from '@/components/shared/FixedIcons';

const Header: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  // ✅ FIXED: Separate mount effect to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // ✅ FIXED: Mobile detection only after mount
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // ✅ PERFORMANCE: Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    checkMobile();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMounted]);

  // ✅ BEAUTIFUL HEADER FOR ALL PAGES: Canvas with different behavior
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    // Different canvas behavior for different pages
    const path = window.location.pathname;
    setCurrentPath(path);
    
    const isHomepage = path === '/';
    
    if (isHomepage) {
      // Homepage: Show full canvas with animation
      setShowCanvas(true);
    } else {
      // Other pages: Show static/subtle canvas
      const timer = setTimeout(() => {
        setShowCanvas(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  // ✅ PERFORMANCE: Optimized canvas animation for all pages
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined' || !showCanvas) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isAnimating = true;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    // Initial resize
    resizeCanvas();
    
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x = 0;
      y = 0;
      radius = 0;
      speed = 0;
      angle = 0;
      private canvas: HTMLCanvasElement;
      private seed: number;

      constructor(canvas: HTMLCanvasElement, seed: number) {
        this.canvas = canvas;
        this.seed = seed;
        this.reset();
      }

      reset() {
        if (!this.canvas) return;
        
        const random = (offset: number = 0) => {
          const x = Math.sin(this.seed + offset) * 10000;
          return x - Math.floor(x);
        };
        
        this.x = random(1) * this.canvas.width;
        this.y = random(2) * this.canvas.height;
        
        // Different particle behavior based on page
        if (currentPath === '/') {
          // Homepage: More dynamic particles
          this.radius = random(3) * 2.5 + 1;
          this.speed = random(4) * 0.5 + 0.2;
        } else {
          // Other pages: Subtle, slower particles
          this.radius = random(3) * 1.5 + 0.5;
          this.speed = random(4) * 0.2 + 0.1;
        }
        
        this.angle = random(5) * Math.PI * 2;
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
        
        const isRed = this.seed % 3 === 0;
        
        // Different colors based on page
        if (currentPath === '/') {
          ctx.fillStyle = isRed ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = isRed ? 12 : 6;
        } else {
          // Subtle colors for other pages
          ctx.fillStyle = isRed ? 'rgba(239, 68, 68, 0.6)' : 'rgba(255, 255, 255, 0.4)';
          ctx.shadowBlur = isRed ? 8 : 4;
        }
        
        ctx.shadowColor = isRed ? '#ef4444' : '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Different particle count based on page
    const numParticles = currentPath === '/' ? (isMobile ? 45 : 90) : (isMobile ? 25 : 50);
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(canvas, i));
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < (currentPath === '/' ? 130 : 100)) {
            ctx.strokeStyle = `rgba(239, 68, 68, ${currentPath === '/' ? 1 - distance / 130 : 0.5 - distance / 200})`;
            ctx.lineWidth = currentPath === '/' ? 0.6 : 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!isAnimating || !canvas || !ctx) return;
      
      // Different background opacity based on page
      ctx.fillStyle = currentPath === '/' ? 'rgba(127, 29, 29, 0.12)' : 'rgba(127, 29, 29, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      isAnimating = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMounted, isMobile, showCanvas, currentPath]);

  // ✅ BEAUTIFUL PAGE TITLES FOR DIFFERENT PAGES
  const getPageTitle = () => {
    switch(currentPath) {
      case '/about':
        return 'About Al-Asr Islamic Service';
      case '/services':
        return 'Our Islamic Services';
      case '/quran':
        return 'Quran Teachings & Resources';
      case '/hadith':
        return 'Hadith Collection';
      case '/prayer-times':
        return 'Prayer Times & Schedule';
      case '/islamic-calendar':
        return 'Islamic Calendar & Events';
      case '/community-programs':
        return 'Community Programs';
      case '/education-services':
        return 'Islamic Education Services';
      case '/religious-guidance':
        return 'Religious Guidance';
      case '/funeral-services':
        return 'Funeral Services';
      case '/quran-classes':
        return 'Quran Classes';
      case '/contact':
        return 'Contact Us';
      case '/donate':
        return 'Support Our Cause';
      case '/events':
        return 'Upcoming Events';
      default:
        if (currentPath.startsWith('/posts/')) return 'Islamic Articles';
        if (currentPath.startsWith('/categories/')) return 'Blog Categories';
        return 'Al-Asr Islamic Service';
    }
  };

  const getPageDescription = () => {
    switch(currentPath) {
      case '/about':
        return 'Learn about our mission, vision, and dedication to serving the Muslim community with faith and compassion.';
      case '/services':
        return 'Comprehensive Islamic services including education, guidance, community programs, and spiritual support.';
      case '/quran':
        return 'Explore Quranic teachings, translations, tafsir, and resources for spiritual growth and understanding.';
      case '/hadith':
        return 'Collection of authentic Hadith with explanations and guidance for daily Islamic practice.';
      case '/prayer-times':
        return 'Accurate prayer timings, Qibla direction, and prayer guidance for your spiritual journey.';
      case '/islamic-calendar':
        return 'Islamic dates, important events, and religious occasions throughout the Hijri year.';
      case '/community-programs':
        return 'Engaging community activities, social services, and programs for all age groups.';
      case '/education-services':
        return 'Quality Islamic education, courses, and learning resources for children and adults.';
      case '/religious-guidance':
        return 'Expert religious counseling, fatwa services, and spiritual guidance from qualified scholars.';
      case '/funeral-services':
        return 'Compassionate funeral services, burial arrangements, and grief support according to Islamic traditions.';
      case '/quran-classes':
        return 'Learn Quran recitation, Tajweed, and memorization with qualified teachers and flexible schedules.';
      case '/contact':
        return 'Get in touch with us for inquiries, support, or to learn more about our services.';
      case '/donate':
        return 'Support our Islamic services and community programs through your generous donations.';
      case '/events':
        return 'Stay updated with upcoming Islamic events, seminars, and community gatherings.';
      default:
        if (currentPath.startsWith('/posts/')) return 'Islamic insights, teachings, and articles for spiritual enlightenment.';
        if (currentPath.startsWith('/categories/')) return 'Browse articles by categories and topics.';
        return 'Islamic services, calendar events, and community programs. Stay updated with the latest from Al-Asr Islamic Service.';
    }
  };

  const isHomepage = currentPath === '/';

  return (
    <header className="relative bg-red-950 text-white overflow-hidden">
      {/* ✅ BEAUTIFUL CANVAS FOR ALL PAGES */}
      {showCanvas && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">
        {/* Main Header */}
        <div className={`px-5 md:px-12 lg:px-28 ${isHomepage ? 'py-8' : 'py-6'}`}>
          <div className="flex justify-between items-center">
            <Logo />
            <Navigation />
            <div className="flex items-center gap-4">
              {/* Desktop Search - Hidden on mobile */}
              <div className="hidden md:block">
                <SearchBar />
              </div>

              {/* Sidebar Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 min-h-11"
                aria-label="Open main menu"
                aria-expanded={isSidebarOpen}
                aria-controls="sidebar-menu"
              >
                <FixedIcons.Menu className="w-4 h-4" />
                <span className="text-sm font-medium">Menu</span>
              </button>
              
              {/* Mobile Menu */}
              <MobileMenu />
              
              <ThemeToggle />
            </div>
          </div>

          {/* ✅ BEAUTIFUL HERO SECTION FOR ALL PAGES */}
          <div className={`text-center ${isHomepage ? 'my-12' : 'my-8'}`}>
            <h1 className={`font-bold mb-4 leading-tight drop-shadow-lg ${
              isHomepage ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-5xl'
            }`}>
              {getPageTitle()}
            </h1>
            <p className={`mt-4 max-w-[740px] mx-auto leading-relaxed text-red-100 ${
              isHomepage ? 'text-lg' : 'text-base'
            }`}>
              {getPageDescription()}
            </p>
            
            {/* Call to Action for specific pages */}
            {!isHomepage && (
              <div className="flex justify-center mt-6">
                <div className="bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg border border-white/25 transform hover:scale-105 transition-all duration-300">
                  <p className="font-semibold text-sm">
                    {currentPath === '/donate' && 'Make a Difference Today'}
                    {currentPath === '/contact' && 'Get in Touch Now'}
                    {currentPath === '/events' && 'Join Our Community'}
                    {currentPath.startsWith('/posts/') && 'Continue Reading'}
                    {!['/donate', '/contact', '/events'].includes(currentPath) && 
                     !currentPath.startsWith('/posts/') && 'Explore More'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Homepage specific CTA */}
            {isHomepage && (
              <div className="flex justify-center mt-8">
                <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl shadow-xl border border-white/30 transform hover:scale-105 transition-all duration-300">
                  <p className="font-bold text-base">
                    Islamic Calendar • Services • Community
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories Navigation Bar with Dropdown */}
        <CategoriesNavbar />

        {/* Sidebar Menu Component */}
        <SidebarMenu 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;