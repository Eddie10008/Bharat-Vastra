import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { AUSTRALIA_CONFIG } from '../../config/australia';
import GaneshaLogo from '../common/GaneshaLogo';
import DecorativePattern from '../common/DecorativePattern';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Shop by Category': [
      { name: 'Sarees', path: '/category/indian-attire?subcategory=sari' },
      { name: 'Lehengas', path: '/category/indian-attire?subcategory=lehenga' },
      { name: 'Kurtas', path: '/category/indian-attire?subcategory=kurta' },
      { name: 'Jewelry', path: '/category/jewelry' },
      { name: 'Wholesale', path: '/products?isWholesale=true' },
    ],
    'Customer Service': [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns & Exchanges', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'Care Instructions', path: '/care-instructions' },
    ],
    'About Bharat Vastra': [
      { name: 'Our Story', path: '/about' },
      { name: 'Become a Seller', path: '/seller-registration' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'FAQ', path: '/faq' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/bharatvastra', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/bharatvastra', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/bharatvastra', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/bharatvastra', label: 'YouTube' },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Main footer content */}
      <div className="container-max px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <GaneshaLogo size="lg" showText={true} />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover the finest collection of Indian attire and jewelry. From traditional sarees 
              to contemporary fusion wear, we bring you authentic Indian fashion that celebrates 
              our rich cultural heritage.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} className="text-white" />
                <span>{AUSTRALIA_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-white" />
                <span>{AUSTRALIA_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin size={16} className="text-white mt-1" />
                <span>
                  {AUSTRALIA_CONFIG.contact.address.street}<br />
                  {AUSTRALIA_CONFIG.contact.address.suburb}, {AUSTRALIA_CONFIG.contact.address.city}<br />
                  {AUSTRALIA_CONFIG.contact.address.state} {AUSTRALIA_CONFIG.contact.address.postcode}, {AUSTRALIA_CONFIG.contact.address.country}
                </span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-8 border-t border-gray-800 relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <DecorativePattern variant="border" size="full" opacity={0.3} />
          </div>
          <div className="relative max-w-md">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest collections and exclusive offers.
            </p>
            <div className="flex spiritual-border rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-white text-black hover:bg-gray-100 font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-max px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Bharat Vastra. All rights reserved.
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Payment methods */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-5 bg-gray-800 rounded text-xs flex items-center justify-center text-gray-300">
                  💳
                </div>
                <div className="w-8 h-5 bg-gray-800 rounded text-xs flex items-center justify-center text-gray-300">
                  📱
                </div>
                <div className="w-8 h-5 bg-gray-800 rounded text-xs flex items-center justify-center text-gray-300">
                  🏦
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-gray-950 py-4">
        <div className="container-max px-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <span>100% Authentic Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <span>Free Shipping on $150+</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white rounded-full"></div>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
