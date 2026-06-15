import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import mujLogo from './assets/muj_logo.png';
import sdgLogo from './assets/sdg_logo.png';
import litmusLogo from './assets/litmus_logo.png';
import mujmunLogo from './assets/MUJMUN_logo.png';

// Golden Gavel SVG Component (Normal T-shape: mallet head horizontal, handle vertical)
const GavelSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-[0_12px_24px_rgba(0,0,0,0.75)]">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BF953F" />
        <stop offset="25%" stopColor="#FCF6BA" />
        <stop offset="50%" stopColor="#B38728" />
        <stop offset="75%" stopColor="#FBF5B7" />
        <stop offset="100%" stopColor="#AA771C" />
      </linearGradient>
      <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3d1f05" />
        <stop offset="50%" stopColor="#5c330e" />
        <stop offset="100%" stopColor="#3d1f05" />
      </linearGradient>
    </defs>
    
    {/* Gavel Handle (extends straight up from the center of the mallet head) */}
    <rect 
      x="91" 
      y="30" 
      width="18" 
      height="100" 
      rx="4" 
      fill="url(#woodGrad)" 
      stroke="url(#goldGrad)" 
      strokeWidth="1.5" 
    />
    {/* Handle Grip tip at the very top */}
    <circle cx="100" cy="25" r="10" fill="url(#goldGrad)" />
    
    {/* Gavel Mallet Head (positioned horizontally at the bottom so it strikes flat) */}
    <g>
      {/* Mallet body */}
      <rect 
        x="65" 
        y="130" 
        width="70" 
        height="36" 
        rx="3" 
        fill="url(#woodGrad)" 
        stroke="url(#goldGrad)" 
        strokeWidth="1.5" 
      />
      {/* Mallet left cap */}
      <path d="M 65 126 C 55 126, 55 170, 65 170 Z" fill="url(#goldGrad)" />
      {/* Mallet right cap */}
      <path d="M 135 126 C 145 126, 145 170, 135 170 Z" fill="url(#goldGrad)" />
      {/* Golden center band */}
      <rect x="96" y="130" width="8" height="36" fill="url(#goldGrad)" />
    </g>
  </svg>
);

// Gavel Base (Sound Block) SVG Component
const GavelBaseSVG = () => (
  <svg viewBox="0 0 240 120" className="w-full h-full drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]">
    <defs>
      <linearGradient id="goldGradBase" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BF953F" />
        <stop offset="25%" stopColor="#FCF6BA" />
        <stop offset="50%" stopColor="#B38728" />
        <stop offset="75%" stopColor="#FBF5B7" />
        <stop offset="100%" stopColor="#AA771C" />
      </linearGradient>
      <linearGradient id="woodGradBase" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5c330e" />
        <stop offset="70%" stopColor="#3d1f05" />
        <stop offset="100%" stopColor="#1f0e01" />
      </linearGradient>
    </defs>
    {/* Base plate 3D perspective effect (ellipse) */}
    {/* Bottom ring for 3D thickness */}
    <ellipse cx="120" cy="70" rx="100" ry="38" fill="#1f0e01" stroke="url(#goldGradBase)" strokeWidth="0.5" />
    <path d="M 20 70 A 100 38 0 0 0 220 70 L 220 82 A 100 38 0 0 1 20 82 Z" fill="url(#woodGradBase)" stroke="url(#goldGradBase)" strokeWidth="1" />
    {/* Top surface */}
    <ellipse cx="120" cy="65" rx="98" ry="36" fill="url(#woodGradBase)" stroke="url(#goldGradBase)" strokeWidth="1.5" />
    {/* Inner golden ring on top surface */}
    <ellipse cx="120" cy="65" rx="72" ry="24" fill="none" stroke="url(#goldGradBase)" strokeWidth="1.2" strokeDasharray="6 3" />
  </svg>
);

function App() {
  const containerRef = useRef(null);
  const gavelRef = useRef(null);
  const gavelBaseRef = useRef(null);
  const logoRef = useRef(null);
  const bgGradientRef = useRef(null);
  const navbarRef = useRef(null);
  const shockwaveRef = useRef(null);
  const shockwave2Ref = useRef(null);
  const impactFlashRef = useRef(null);
  const particlesRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useGSAP(() => {
    // Initial States
    // Gavel starts raised on the right, tilted up (45deg) and transparent
    gsap.set(gavelRef.current, { y: -350, x: 135, rotation: 45, opacity: 0, scale: 1.25 });
    gsap.set(gavelBaseRef.current, { rotationX: 0, scale: 0, opacity: 0 });
    gsap.set(logoRef.current, { scale: 0.3, opacity: 0 });
    gsap.set(bgGradientRef.current, { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(navbarRef.current, { y: -120, opacity: 0 });
    gsap.set(shockwaveRef.current, { scale: 0.1, opacity: 0 });
    gsap.set(shockwave2Ref.current, { scale: 0.1, opacity: 0 });
    gsap.set(impactFlashRef.current, { scale: 0.5, opacity: 0 });
    if (particlesRef.current) {
      gsap.set(particlesRef.current.children, { scale: 0, opacity: 0 });
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });

    // 1. Gavel base zooms in with a springy bounce
    tl.to(gavelBaseRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8, 
      ease: 'back.out(1.5)' 
    });

    // 2. Gavel swings down-left in a dramatic arc (first strike)
    // Tilted so that the mallet head stands vertically, pounding flat on its bottom circular face (y: 65, x: 120, rotation: 85deg)
    // duration reduced from 0.6 to 0.22 and ease set to power4.in to make it look incredibly fast and powerful
    tl.to(gavelRef.current, { 
      y: 65, 
      x: 120,
      rotation: 85,
      opacity: 1,
      duration: 0.22,
      ease: 'power4.in'
    }, '-=0.2');

    // 3. Impact strike 1!
    tl.addLabel('impact1');
    
    // First Rebound (gavel bounces back up-right quickly)
    tl.to(gavelRef.current, {
      y: 45,
      x: 125,
      rotation: 80,
      duration: 0.06,
      ease: 'power1.out'
    }, 'impact1');

    // Second Strike (hits block again)
    tl.to(gavelRef.current, {
      y: 65,
      x: 120,
      rotation: 85,
      duration: 0.06,
      ease: 'power1.in'
    }, 'impact1+=0.06');

    // Impact strike 2!
    tl.addLabel('impact2', 'impact1+=0.12');

    // Final Rebound (settles back up-right)
    tl.to(gavelRef.current, {
      y: 20,
      x: 135,
      rotation: 70,
      duration: 0.18,
      ease: 'power2.out'
    }, 'impact2');

    // Base squishes heavily on impact 1
    tl.to(gavelBaseRef.current, {
      scaleY: 0.74,
      scaleX: 1.08,
      y: 11,
      duration: 0.06,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    }, 'impact1');

    // Base squishes lightly on impact 2
    tl.to(gavelBaseRef.current, {
      scaleY: 0.85,
      scaleX: 1.04,
      y: 6,
      duration: 0.06,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    }, 'impact2');

    // Shockwave ring 1 expands from impact center
    tl.to(shockwaveRef.current, {
      scale: 4.2,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      startAt: { scale: 0.1, opacity: 1 }
    }, 'impact1');

    // Shockwave ring 2 expands slightly delayed (ripple effect)
    tl.to(shockwave2Ref.current, {
      scale: 5.0,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      startAt: { scale: 0.1, opacity: 0.8 }
    }, 'impact1+=0.06');

    // Impact light flash glow
    tl.to(impactFlashRef.current, {
      opacity: 1,
      scale: 2.2,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
      ease: 'power1.out',
      startAt: { opacity: 0, scale: 0.5 }
    }, 'impact1');

    // Radiant Spark Particles burst outwards
    if (particlesRef.current) {
      tl.fromTo(particlesRef.current.children, 
        { x: 0, y: 0, scaleY: 0.1, scaleX: 0.1, opacity: 1 },
        {
          x: (i) => 130 * Math.cos(i * 36 * Math.PI / 180),
          y: (i) => 130 * Math.sin(i * 36 * Math.PI / 180),
          scaleY: 1.5,
          scaleX: 0.5,
          rotation: (i) => i * 36 + 90,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.005
        },
        'impact1'
      );
    }

    // Screen shake 1 (heavy)
    tl.to(contentWrapperRef.current, {
      y: 'random(-12, 12)',
      x: 'random(-12, 12)',
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      clearProps: 'x,y'
    }, 'impact1');

    // Screen shake 2 (light)
    tl.to(contentWrapperRef.current, {
      y: 'random(-4, 4)',
      x: 'random(-4, 4)',
      duration: 0.05,
      repeat: 3,
      yoyo: true,
      clearProps: 'x,y'
    }, 'impact2');

    // 4. Gavel exits - fades out as it flies up and away to the right (duration reduced for tighter timing)
    tl.to(gavelRef.current, {
      y: -250,
      x: 220,
      rotation: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '+=0.2');

    // 5. Gavel base flips 90 degrees forward (lying flat in 3D perspective)
    tl.to(gavelBaseRef.current, {
      rotationX: 90,
      y: 60,
      scaleX: 0.95,
      opacity: 0.4,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.1');

    // 6. Central Logo appears scaling & glowing
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.0,
      ease: 'elastic.out(1, 0.75)'
    }, '-=0.6');

    // 7. Background reveal: Radial gradient expands from center outward
    tl.to(bgGradientRef.current, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 1.5,
      ease: 'power3.inOut'
    }, '-=0.5');

    // 8. Navbar drops down and logos fade in
    tl.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.8');

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white select-none"
    >
      {/* Background Layer 1: Radial Gradient Burgundy to Black */}
      <div 
        ref={bgGradientRef} 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1C010C_0%,_#000000_100%)] w-full h-full"
      />

      {/* Main Content Wrapper (Shakes on impact) */}
      <div ref={contentWrapperRef} className="relative w-full h-full flex items-center justify-center z-10">
        
        {/* Ambient glow behind */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none z-0" />

        {/* 1. Gavel Base (Sound Block) Container */}
        <div 
          ref={gavelBaseRef} 
          className="absolute w-56 h-28 z-20 perspective-1000 preserve-3d"
          style={{ transformOrigin: 'center bottom' }}
        >
          <GavelBaseSVG />
        </div>

        {/* 2a. Shockwave 1 (Primary impact ring) */}
        <div 
          ref={shockwaveRef} 
          className="absolute w-48 h-48 rounded-full border-2 border-amber-300/40 z-25 pointer-events-none"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 2b. Shockwave 2 (Secondary impact ring) */}
        <div 
          ref={shockwave2Ref} 
          className="absolute w-48 h-48 rounded-full border border-amber-400/20 z-25 pointer-events-none"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 2c. Impact Flash Glow */}
        <div 
          ref={impactFlashRef} 
          className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/15 blur-3xl pointer-events-none z-15"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 2d. Radiant Spark Particles */}
        <div 
          ref={particlesRef} 
          className="absolute w-4 h-4 z-26 pointer-events-none"
          style={{ transformOrigin: 'center center' }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-6 bg-gradient-to-b from-amber-200 to-amber-500 rounded-full"
              style={{
                top: 'calc(50% - 12px)',
                left: 'calc(50% - 3px)',
                transformOrigin: 'center center',
              }}
            />
          ))}
        </div>

        {/* 3. The Falling Gavel Mallet & Handle */}
        <div 
          ref={gavelRef} 
          className="absolute w-48 h-48 z-30 pointer-events-none"
          style={{ transformOrigin: '100px 25px' }} // Rotates around the top grip circle
        >
          <GavelSVG />
        </div>

        {/* 4. Central Logo (revealed) - Size made larger */}
        <div 
          ref={logoRef} 
          className="absolute flex flex-col items-center justify-center z-40 pointer-events-none"
        >
          {/* Main MUJMUN Logo */}
          <div className="relative group filter-gold-glow">
            <img 
              src={mujmunLogo} 
              alt="MUJMUN Logo" 
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
            />
            {/* Ambient golden ring glow */}
            <div className="absolute inset-0 -m-6 rounded-full border border-amber-500/20 radial-glow pointer-events-none animate-pulse duration-3000" />
          </div>
        </div>
      </div>

      {/* 5. Top Navbar: Glassmorphic with Golden Streak bottom border */}
      <nav 
        ref={navbarRef} 
        className="absolute top-0 left-0 w-full z-50 bg-black/45 backdrop-blur-lg border-b border-white/5 py-3 px-8 md:px-16 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
      >
        {/* Left Sponsor: MUJ Logo */}
        <div className="flex items-center justify-start h-12 md:h-16 w-1/4">
          <img 
            src={mujLogo} 
            alt="MUJ Logo" 
            className="h-full w-auto max-w-full object-contain filter brightness-110 contrast-105 drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] transition-all duration-300"
          />
        </div>

        {/* Center Sponsor: SDG Logo */}
        <div className="flex items-center justify-center h-10 md:h-14 w-2/4">
          <img 
            src={sdgLogo} 
            alt="SDG Logo" 
            className="h-full w-auto max-w-full object-contain filter brightness-110 contrast-105 drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] transition-all duration-300"
          />
        </div>

        {/* Right Sponsor: Litmus Logo */}
        <div className="flex items-center justify-end h-12 md:h-16 w-1/4">
          <img 
            src={litmusLogo} 
            alt="Litmus Logo" 
            className="h-full w-auto max-w-full object-contain filter brightness-110 contrast-105 drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] transition-all duration-300"
          />
        </div>

        {/* Golden Streak Line at the very bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden bg-amber-500/10">
          <div className="w-full h-full gold-streak-active" />
        </div>
      </nav>
    </div>
  );
}

export default App;
