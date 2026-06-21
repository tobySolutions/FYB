import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Globe, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 tracking-tighter">FYB</h3>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              Premium clothing designed for the modern individual. Quality fabrics, tailored fits, and timeless designs that empower you to look and feel your best.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Camera className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><MessageCircle className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links Group 1 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Pages</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Product</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Corporate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Y2k / Denim</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Outerwear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} FYB. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
