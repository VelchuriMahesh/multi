import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaPhoneAlt, 
  FaRegEnvelope, 
  // FaMapMarkerAlt removed here as it was unused
  FaUserAlt
} from 'react-icons/fa';
import logo from '../logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-[#050a14] text-gray-400 py-16 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-6">
            <img src={logo} alt="MVIPL Logo" className="h-16 w-auto" />
            <p className="text-sm leading-relaxed text-gray-500">
              Multiversal Infra Private Limited (MVIPL) envisions at developing a 
              real estate firm that builds High Quality Living Spaces with On-time 
              Delivery and Customer Satisfaction as the key driving factors.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FaFacebookF size={14} />} />
              <SocialIcon icon={<FaInstagram size={14} />} />
              <SocialIcon icon={<FaWhatsapp size={14} />} />
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6">
            <h4 className="text-[#c4a676] font-bold uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer transition">Overview</li>
              <li className="hover:text-white cursor-pointer transition">Our Team</li>
              <li className="hover:text-white cursor-pointer transition">Projects</li>
              <li className="hover:text-white cursor-pointer transition">Insights</li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="text-[#c4a676] font-bold uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-white cursor-pointer transition">Residential</li>
              <li className="hover:text-white cursor-pointer transition">Commercial</li>
              <li className="hover:text-white cursor-pointer transition">Land Development</li>
              <li className="hover:text-white cursor-pointer transition">Looking for Dev?</li>
            </ul>
          </div>

          {/* Column 4: Corporate Office */}
          <div className="space-y-6">
            <h4 className="text-[#c4a676] font-bold uppercase tracking-widest text-xs">Corporate Office</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-gray-500" />
                <span>+91 9945 196777</span>
              </div>
              <div className="flex items-start gap-3">
                <FaRegEnvelope className="mt-1 text-gray-500" />
                <span>multiversalinfra@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 border-l border-gray-800 pl-4">
                <span>
                  Villa no 12, Saicity villas<br />
                  K.Dommasandra, Kodigehalli main road<br />
                  Behind kidzee school, Belathur road<br />
                  Whitefield, Bangalore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-900 pt-10 relative flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <p className="text-[10px] uppercase tracking-widest text-gray-600">
            © 2015 MULTIVERSAL INFRA PVT. LTD. ALL RIGHTS RESERVED.
          </p>

          {/* ADVANCED ACTION PILL - HIGH CONTRAST VERSION */}
          <div className="flex items-center bg-white rounded-full p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-200 scale-90 md:scale-100">
            {/* Main Action Button */}
            <button 
              onClick={() => window.location.href = 'mailto:multiversalinfra@gmail.com'}
              className="bg-[#111827] text-white flex items-center gap-3 px-6 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 whitespace-nowrap"
            >
              <FaRegEnvelope className="text-sm" /> 
              Schedule Visit
            </button>

            {/* Icon Section (Phone & WhatsApp) */}
            <div className="flex items-center px-5 gap-5 border-l border-gray-200 ml-2">
                <a href="tel:+919945196777" className="group">
                  <FaPhoneAlt 
                    className="text-gray-400 group-hover:text-black transition-colors" 
                    style={{ width: '16px', height: '16px', display: 'block' }} 
                  />
                </a>

                <a href="https://wa.me/919945196777" target="_blank" rel="noreferrer" className="group">
                  <FaWhatsapp 
                    className="text-[#25D366] group-hover:scale-125 transition-transform" 
                    style={{ width: '22px', height: '22px', display: 'block' }} 
                  />
                </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer">
              <FaUserAlt size={10} /> Employee Portal
            </div>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

// Reusable Social Icon Component
const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all cursor-pointer">
    {icon}
  </div>
);

export default Footer;