import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-olive-600 p-2 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MediScan</span>
            </div>
            <p className="text-gray-200 mb-4">
              Your trusted companion for medicine information and healthcare management.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-200 hover:text-olive-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-200 hover:text-olive-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-200 hover:text-olive-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-200 hover:text-olive-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-gray-200 hover:text-white transition-colors duration-200">
                  QR Scanner
                </Link>
              </li>
              <li>
                <Link to="/qr-codes" className="text-gray-200 hover:text-white transition-colors duration-200">
                  QR Codes
                </Link>
              </li>
              <li>
                <Link to="/reminders" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Reminders
                </Link>
              </li>
              <li>
                <Link to="/doctor-recommendation" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Doctor Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-olive-400" />
                <span className="text-gray-200">support@mediscan.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-olive-400" />
                <span className="text-gray-200">+91 97452-231411</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-olive-400" />
                <span className="text-gray-200">123 Healthcare St, Medical City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm">
            © 2024 MediScan. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;