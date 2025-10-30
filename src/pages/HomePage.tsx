import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Shield, Users, ArrowRight, Star, Zap, Grid2x2 as Grid, Bell } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Trusted by 10,000+ Users</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Medicine
            <span className="block text-primary-600">
              Information System
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Scan QR codes on medicine packages to get comprehensive drug information, watch educational videos, 
            and connect with healthcare professionals instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/scan"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 flex items-center space-x-2"
            >
              <QrCode className="h-5 w-5" />
              <span>Start Scanning</span>
            </Link>
            
            <Link
              to="/qr-codes"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200 flex items-center space-x-2"
            >
              <Grid className="h-5 w-5" />
              <span>View QR Codes</span>
            </Link>
            
            <Link
              to="/reminders"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200 flex items-center space-x-2"
            >
              <Bell className="h-5 w-5" />
              <span>Reminders</span>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Medicines Scanned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose MediScan?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of healthcare information with our cutting-edge technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Safe & Reliable</h3>
            <p className="text-gray-600">
              Get accurate, verified information about medications with comprehensive safety guidelines and precautions from trusted medical sources.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Access</h3>
            <p className="text-gray-600">
              Simply scan the QR code and get immediate access to drug information, educational videos, and expert recommendations in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Support</h3>
            <p className="text-gray-600">
              Connect with qualified healthcare professionals for personalized advice and recommendations tailored to your specific needs.
            </p>
          </div>
        </div>

        <div className="bg-primary-600 rounded-lg p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 opacity-90">Join thousands of users who trust MediScan for their healthcare needs</p>
          <Link
            to="/scan"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
          >
            <QrCode className="h-5 w-5" />
            <span>Start Your First Scan</span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;