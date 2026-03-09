import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative z-20 -mt-32 px-4 md:px-0">
      <div className="max-w-6xl mx-auto bg-[#f8f8f8] rounded-t-[50px] rounded-b-[20px] shadow-2xl p-10 md:p-20 text-center">
        {/* Small Badge */}
        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
          Since 2015
        </span>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Build the Future.<br />
          <span className="text-blue-600">Live the Dream.</span>
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed mb-10">
          We specialize in high-quality living spaces, combining modern architecture 
          with sustainable engineering to deliver excellence since our inception.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg w-full md:w-auto">
            Explore Portfolio
          </button>
          <button className="border-2 border-gray-300 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-white transition w-full md:w-auto">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;