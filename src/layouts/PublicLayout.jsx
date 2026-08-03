import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Public/Navbar';
import Footer from '../components/Public/Footer';

/**
 * PublicLayout serves as the core layout wrapper for public-facing pages.
 * Features a sticky Navbar, dynamic content rendering via Outlet, and a responsive Footer.
 */
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500 selection:text-white antialiased">
      {/* Sticky Top Navigation */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-100/80 transition-all">
        <Navbar />
      </header>

      {/* Dynamic Main Content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;