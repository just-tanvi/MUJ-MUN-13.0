import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import mujLogo from './assets/muj_logo.png';
import sdgLogo from './assets/sdg_logo.png';
import litmusLogo from './assets/litmus_logo.png';
import mujmunLogo from './assets/MUJMUN_logo.png';
import heritageBg from './assets/heritage_bg.jpg';
import strikeSound from './assets/gavel-hammered-in-court-sound-effect_Ot6CjSaS.mp3';
import noiseSound from './assets/noise.mp3';

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
  const htmlContentRef = useRef(null);

  // Audio refs & states to unlock sound context
  const [started, setStarted] = useState(false);
  const strikeAudioRef = useRef(null);
  const bgMusicRef = useRef(null);
  const timelineRef = useRef(null);

  // Preload audio files on mount
  useEffect(() => {
    strikeAudioRef.current = new Audio(strikeSound);
    strikeAudioRef.current.load();

    bgMusicRef.current = new Audio(noiseSound);
    bgMusicRef.current.load();
  }, []);

  // Trigger play on started state change
  useEffect(() => {
    if (started && timelineRef.current) {
      timelineRef.current.play();
    }
  }, [started]);

  useGSAP(() => {
    console.log('useGSAP hook executed, initializing GSAP state and timeline');
    // Initial States
    // Gavel starts raised on the right, tilted up (45deg) and transparent
    // Gavel starts raised on the right, tilted up (45deg) and transparent
    gsap.set(gavelRef.current, { y: -window.innerHeight / 2 - 150, x: 135, rotation: 45, opacity: 0, scale: 1.25 });
    gsap.set(gavelBaseRef.current, { rotationX: 0, scale: 0, opacity: 0 });
    gsap.set(logoRef.current, { scale: 0.3, opacity: 0 });
    gsap.set(bgGradientRef.current, { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set(navbarRef.current, { yPercent: -100, opacity: 0 });
    gsap.set(shockwaveRef.current, { scale: 0.1, opacity: 0 });
    gsap.set(shockwave2Ref.current, { scale: 0.1, opacity: 0 });
    gsap.set(impactFlashRef.current, { scale: 0.5, opacity: 0 });
    gsap.set(htmlContentRef.current, { opacity: 0 });
    if (particlesRef.current) {
      gsap.set(particlesRef.current.children, { scale: 0, opacity: 0 });
    }

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out' }
    });
    timelineRef.current = tl;

    // 1. Gavel base zooms in with a springy bounce
    tl.to(gavelBaseRef.current, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8, 
      ease: 'back.out(1.5)' 
    });

    // 2. Gavel swings down-left in a dramatic arc (first strike)
    // Tilted so that the mallet head stands vertically, pounding flat on its bottom circular face (y: 65, x: 120, rotation: 85deg)
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
    tl.call(() => {
      if (strikeAudioRef.current) {
        strikeAudioRef.current.volume = 0.45;
        strikeAudioRef.current.play().catch(e => console.log('Strike play failed:', e));
      }
    }, null, 'impact1');
    
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

    // Screen shake 1 (heavy - snappy 0.12s duration to not overlap second strike)
    tl.to(contentWrapperRef.current, {
      y: 'random(-12, 12)',
      x: 'random(-12, 12)',
      duration: 0.04,
      repeat: 2,
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
      y: -window.innerHeight / 2 - 150,
      x: 300,
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
      opacity: 0,
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
    // Start background music immediately as the central logo appears
    tl.call(() => {
      if (bgMusicRef.current) {
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.25;
        bgMusicRef.current.play().catch(e => console.log('Background music play failed:', e));
      }
    }, null, '-=0.6');

    // Fade out Central Logo
    tl.to(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, '+=1.0');

    // Transition background color from black to dark maroon
    tl.to(containerRef.current, {
      backgroundColor: '#120003',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.5');

    // 6a. Tagline 1: Greatest conference in rajasthan
    tl.fromTo('.tagline-1', {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    tl.to('.tagline-1', {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in'
    }, '+=1.4');

    // Transition background color to rich dark maroon
    tl.to(containerRef.current, {
      backgroundColor: '#260007',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.4');

    // 6b. Tagline 2: MUJMUN13.0
    tl.fromTo('.tagline-2', {
      opacity: 0,
      scale: 0.7
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.2)'
    });
    tl.to('.tagline-2', {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.in'
    }, '+=1.6');

    // Transition background color to dark red
    tl.to(containerRef.current, {
      backgroundColor: '#38000a',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.4');

    // 6c. Tagline 3: #breakthesilence
    tl.fromTo('.tagline-3', {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    tl.to('.tagline-3', {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: 'power2.in'
    }, '+=1.4');

    // Transition background color to a warmer dark red
    tl.to(containerRef.current, {
      backgroundColor: '#2b0008',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.4');

    // 6d. Tagline 4: coming soon
    tl.fromTo('.tagline-4', {
      opacity: 0,
      scale: 0.85
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    });
    tl.to('.tagline-4', {
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.in'
    }, '+=1.4');

    // Transition background color to final maroon (#1a0005)
    tl.to(containerRef.current, {
      backgroundColor: '#1a0005',
      duration: 1.5,
      ease: 'power2.out'
    }, '-=0.4');

    // 7. Reveal HTML content and expand radial gradient
    tl.to(htmlContentRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    }, '+=0.1');

    tl.to(bgGradientRef.current, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 1.5,
      ease: 'power3.inOut'
    }, '-=1.2');

    // 8. Navbar drops down and logos fade in
    tl.to(navbarRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=1.0');

  }, { scope: containerRef });

  // Handle enter overlay action
  const handleEnter = () => {
    // Unlock Web Audio context & pre-play sound files in response to user gesture
    if (strikeAudioRef.current) {
      strikeAudioRef.current.play().then(() => {
        strikeAudioRef.current.pause();
        strikeAudioRef.current.currentTime = 0;
      }).catch(e => console.log('Audio unlock failed:', e));
    }

    if (bgMusicRef.current) {
      bgMusicRef.current.play().then(() => {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }).catch(e => console.log('BG Music unlock failed:', e));
    }

    // Fade out enter button screen
    gsap.to('.enter-overlay', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        setStarted(true);
      }
    });
  };



  return (
    <div 
      ref={containerRef} 
      className="relative w-screen h-screen overflow-hidden bg-black text-white select-none"
    >
      {/* Background Layer 1: Radial Gradient Burgundy to Transparent */}
      <div 
        ref={bgGradientRef} 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1C010C_0%,_transparent_100%)] w-full h-full"
      />

      {/* Main Content Wrapper (Shakes on impact, provides 3D perspective context) */}
      <div ref={contentWrapperRef} className="relative w-full h-full flex items-center justify-center z-10 perspective-1000">
        
        {/* Ambient glow behind */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none z-0" />

        {/* 1. Gavel Base (Sound Block) Container (uses preserve-3d) */}
        <div 
          ref={gavelBaseRef} 
          className="absolute w-56 h-28 z-20 preserve-3d"
          style={{ transformOrigin: 'center bottom' }}
        >
          <GavelBaseSVG />
        </div>

        {/* 2a. Shockwave 1 (Primary impact ring) */}
        <div 
          ref={shockwaveRef} 
          className="absolute w-48 h-48 rounded-full border-2 border-amber-300/40 z-[25] pointer-events-none"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 2b. Shockwave 2 (Secondary impact ring) */}
        <div 
          ref={shockwave2Ref} 
          className="absolute w-48 h-48 rounded-full border border-amber-400/20 z-[25] pointer-events-none"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 2c. Impact Flash Glow */}
        <div 
          ref={impactFlashRef} 
          className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/15 blur-3xl pointer-events-none z-[15]"
          style={{ transformOrigin: 'center center' }}
        />

        {/* 2d. Radiant Spark Particles */}
        <div 
          ref={particlesRef} 
          className="absolute w-4 h-4 z-[26] pointer-events-none"
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

      {/* Taglines Transition Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 45 }}
      >
        <div className="relative flex flex-col items-center justify-center text-center px-4 w-full h-full">
          {/* Tagline 1: GREATEST CONFERENCE IN RAJASTHAN */}
          <div className="tagline-1 absolute text-[#FFF8E7] text-[clamp(0.55rem,2.8vw,3rem)] tracking-[0.1em] sm:tracking-[0.2em] sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-cinzel uppercase text-center whitespace-nowrap drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)] opacity-0 pointer-events-none">
            GREATEST CONFERENCE IN RAJASTHAN
          </div>
          {/* Tagline 2: MUJMUN13.0 */}
          <div className="tagline-2 absolute text-amber-400 text-[clamp(1.8rem,8vw,8rem)] tracking-[0.05em] sm:tracking-[0.1em] sm:text-7xl md:text-[8rem] lg:text-[11rem] font-cinzel font-bold uppercase text-center drop-shadow-[0_10px_30px_rgba(212,175,55,0.5)] opacity-0 pointer-events-none filter-gold-glow">
            MUJMUN13.0
          </div>
          {/* Tagline 3: #breakthesilence */}
          <div className="tagline-3 absolute text-amber-100 text-[clamp(1rem,4.5vw,4rem)] tracking-[0.1em] sm:tracking-[0.2em] sm:text-3xl md:text-5xl lg:text-6xl font-cinzel uppercase text-center max-w-4xl px-4 drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)] opacity-0 pointer-events-none">
            #breakthesilence
          </div>

          {/* Tagline 4: coming soon */}
          <div className="tagline-4 absolute text-amber-300 text-[clamp(1.2rem,5vw,5rem)] tracking-[0.15em] sm:tracking-[0.3em] sm:text-4xl md:text-6xl lg:text-7xl font-cinzel uppercase text-center drop-shadow-[0_8px_20px_rgba(212,175,55,0.4)] opacity-0 pointer-events-none">
            coming soon
          </div>
        </div>
      </div>

      {/* 7. HTML File Content (revealed at the end) */}
      <div 
        ref={htmlContentRef} 
        className="absolute inset-0 z-35 opacity-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#1c0508]"
        style={{ backgroundColor: '#1c0508' }}
      >
        <div 
          className="banner"
          style={{ backgroundImage: `url(${heritageBg})` }}
        >
          {/* Texts on top of the background */}
          <div className="banner-title">MUJ MUN 13.0</div>
          <div className="banner-subtitle">COMING SOON</div>

          {/* 5. Top Navbar: Transparent with no border/shadow, sitting neatly at the top of the banner */}
          <nav 
            ref={navbarRef} 
            className="absolute top-0 left-0 w-full z-30 bg-transparent pt-4 px-4 sm:pt-[1.5cqw] sm:px-[22cqw] flex items-start justify-between pointer-events-none"
          >
            {/* Left Sponsor: MUJ Logo */}
            {/* Set width to w-1/3 and justified center to shift logo rightwards (towards center) */}
            <div className="flex items-start justify-center w-1/3 pointer-events-auto">
              <img 
                src={mujLogo} 
                alt="MUJ Logo" 
                className="h-10 sm:h-[7cqw] w-auto max-w-full object-contain filter brightness-110 contrast-105 drop-shadow-[0_0.2cqw_0.6cqw_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Center Sponsor: SDG Logo */}
            {/* Set width to w-1/3 and justified center to keep it in the exact middle */}
            <div className="flex items-start justify-center w-1/3 pointer-events-auto">
              <img 
                src={sdgLogo} 
                alt="SDG Logo" 
                className="h-9 sm:h-[6.2cqw] w-auto max-w-full object-contain filter brightness-110 contrast-105 drop-shadow-[0_0.2cqw_0.6cqw_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Right Sponsor: Litmus Logo */}
            {/* Set width to w-1/3 and justified center to shift logo leftwards (towards center) */}
            <div className="flex items-start justify-center w-1/3 pointer-events-auto">
              <img 
                src={litmusLogo} 
                alt="Litmus Logo" 
                className="h-9 sm:h-[6.2cqw] w-auto max-w-full object-contain filter brightness-110 contrast-105 drop-shadow-[0_0.2cqw_0.6cqw_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-105"
              />
            </div>
          </nav>
        </div>
      </div>


      {/* 6. Pure Black Screen (Guarantees user gesture to unlock audio, click anywhere to start) */}
      {!started && (
        <div 
          onClick={handleEnter}
          className="enter-overlay absolute inset-0 z-[100] bg-black cursor-pointer select-none"
        />
      )}
    </div>
  );
}

export default App;
