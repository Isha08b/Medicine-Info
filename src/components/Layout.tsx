import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScanPage from '../pages/ScanPage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;