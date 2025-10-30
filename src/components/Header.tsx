import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, QrCode, Home, Stethoscope, LogOut, User, Grid2x2 as Grid, Bell, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  // State to manage the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    // Using window.location.href to force a full refresh, which is common for logout
    window.location.href = '/login'; 
  };

  const navLinks = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Scan', to: '/scan', icon: QrCode },
    { name: 'QR Codes', to: '/qr-codes', icon: Grid },
    { name: 'Reminders', to: '/reminders', icon: Bell },
    { name: 'Doctor', to: '/doctor-recommendation', icon: Stethoscope },
  ];

  const authLinks = [
    { name: 'Welcome', icon: User, isUser: true },
    { name: 'Logout', icon: LogOut, action: handleLogout, isLogout: true },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Site Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Pill className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-indigo-600">MediScan</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links (Visible on large screens) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to) 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Desktop User Menu */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              {authLinks.map((item) => (
                item.isUser ? (
                  <div key={item.name} className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                ) : (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                )
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button (Visible on small and medium screens) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" /> // Close icon
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" /> // Hamburger icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (Hidden by default, shown when isOpen is true) */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                isActive(link.to) 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          ))}

          {/* Mobile User Menu */}
          <div className="pt-2 border-t border-gray-200 space-y-1">
            <div className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700">
                <User className="h-5 w-5 text-indigo-600" />
                <span>Welcome</span>
            </div>
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;