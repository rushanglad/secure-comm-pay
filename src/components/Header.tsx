
import React, { useState } from 'react';
import { Mail, MessageSquare, Menu, X } from "lucide-react";
import Navigation from './header/Navigation';
import UserActions from './header/UserActions';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToWaitlist = () => {
    // Close menu if open
    if (isMenuOpen) setIsMenuOpen(false);
    // Scroll to waitlist section smoothly
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed w-full bg-white bg-opacity-80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary-500" />
            <MessageSquare className="h-5 w-5 text-teal-500 -ml-2" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-teal-500">
            SecureComm
          </span>
        </div>

        <Navigation />
        <UserActions scrollToWaitlist={scrollToWaitlist} />

        <button 
          className="md:hidden text-navy-800 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen}
        onToggle={toggleMenu}
        scrollToWaitlist={scrollToWaitlist}
      />
    </header>
  );
};

export default Header;
