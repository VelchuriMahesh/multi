import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HeroSection;