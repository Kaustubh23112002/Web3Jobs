import React, { useEffect, useRef } from 'react';
import Web3Logo from '@/assets/web3.png'

const SpaceAnimation = () => {
  const canvasRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();

    // Create stars
    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.5
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Logo animation
      const time = Date.now();
      if (logoRef.current) {
        logoRef.current.style.transform = `
          translate(-50%, -50%)
          scale(${1 + Math.sin(time/500) * 0.05})
          rotate(${Math.sin(time/700) * 3}deg)
        `;
        logoRef.current.style.opacity = `${0.8 + Math.sin(time/300) * 0.2}`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <img
        ref={logoRef}
        src={Web3Logo}
        alt="THRM Logo"
        className="absolute left-1/2 top-1/2 w-40 h-40 transition-all duration-300"
        style={{
          transform: 'translate(-50%, -50%)',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
        }}
      />
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="w-full flex items-center justify-center p-1">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-7xl mx-auto border border-white/20">
        <h2 className="text-4xl font-bold text-white mb-6 text-gradient">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="space-y-6 md:w-2/3">
            <p className="text-lg text-white mobile-justified">
              At <strong>THRM Web3 Jobs</strong>, we are your trusted partner in navigating the exciting world of <strong>Web3 careers</strong>. Our mission is to connect talented individuals with groundbreaking opportunities in blockchain, cryptocurrency, NFTs, and decentralized technologies. Whether you're a developer, marketer, or business professional, we’re here to help you find your dream job in the Web3 space.
            </p>
            <p className="text-lg text-white mobile-justified">
              Founded in <strong>2025</strong>, THRM Web3 Jobs was created to address the growing demand for skilled professionals in the Web3 ecosystem. With a team of industry experts and tech enthusiasts, we’ve built a platform that simplifies the job search process while empowering companies to find the best talent in the industry.
            </p>
            <p className="text-lg text-white mobile-justified">
              We specialize in connecting job seekers with roles in <strong>blockchain development, smart contract engineering, decentralized finance (DeFi), NFT marketplaces, and Web3 marketing</strong>. Our platform is designed to help you take the next step in your career, whether you're just starting out or looking to advance in the Web3 world.
            </p>
          </div>

          <div className="md:w-1/3 min-h-[400px] rounded-2xl overflow-hidden border border-white/20 relative">
            <SpaceAnimation />
          </div>
        </div>
      </div>

      <style jsx global>{`
        html {
          -webkit-hyphens: auto;
          -moz-hyphens: auto;
          hyphens: auto;
        }
        .mobile-justified {
          text-align: justify;
          text-justify: inter-word;
          word-break: break-word;
        }
        @media (max-width: 767px) {
          .mobile-justified {
            text-align-last: left;
            hyphens: auto;
            -webkit-hyphens: auto;
            -moz-hyphens: auto;
          }
        }
        .text-gradient {
          background: linear-gradient(90deg, #81c315 0, #ffd300);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;