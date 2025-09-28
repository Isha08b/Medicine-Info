import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, QrCode, Home, Stethoscope, LogOut, User, Grid2x2 as Grid, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-100 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-olive-600 p-2 rounded-lg">
              <Pill className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-olive-600">MediScan</span>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-olive-600 text-white' 
                  : 'text-gray-600 hover:text-olive-600'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/scan"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/scan') 
                  ? 'bg-olive-600 text-white' 
                  : 'text-gray-600 hover:text-olive-600'
              }`}
            >
              <QrCode className="h-4 w-4" />
              <span>Scan</span>
            </Link>
            
            <Link
              to="/qr-codes"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/qr-codes') 
                  ? 'bg-olive-600 text-white' 
                  : 'text-gray-600 hover:text-olive-600'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>QR Codes</span>
            </Link>
            
            <Link
              to="/reminders"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/reminders') 
                  ? 'bg-olive-600 text-white' 
                  : 'text-gray-600 hover:text-olive-600'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Reminders</span>
            </Link>
            
            <Link
              to="/doctor-recommendation"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/doctor-recommendation') 
                  ? 'bg-olive-600 text-white' 
                  : 'text-gray-600 hover:text-olive-600'
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              <span>Doctor</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <User className="h-4 w-4 text-olive-600" />
                <span className="text-sm font-medium text-gray-700">Welcome</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;