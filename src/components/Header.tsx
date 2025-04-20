import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Menu, X, User } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-navy-700 hover:text-primary-500 transition-colors">
            Features
          </a>
          <a href="#payments" className="text-navy-700 hover:text-primary-500 transition-colors">
            Payments
          </a>
          <a href="#platforms" className="text-navy-700 hover:text-primary-500 transition-colors">
            Platforms
          </a>
          <a href="#security" className="text-navy-700 hover:text-primary-500 transition-colors">
            Security
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <Button 
                variant="outline" 
                className="border-primary-500 text-primary-500 hover:bg-primary-100"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button 
                onClick={handleSignOut}
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-primary-500 text-primary-500 hover:bg-primary-100"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={() => navigate('/auth')}
              >
                Join Waitlist
              </Button>
            </>
          )}
        </div>

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

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-navy-700 hover:text-primary-500 transition-colors"
              onClick={toggleMenu}
            >
              Features
            </a>
            <a 
              href="#payments" 
              className="text-navy-700 hover:text-primary-500 transition-colors"
              onClick={toggleMenu}
            >
              Payments
            </a>
            <a 
              href="#platforms" 
              className="text-navy-700 hover:text-primary-500 transition-colors"
              onClick={toggleMenu}
            >
              Platforms
            </a>
            <a 
              href="#security" 
              className="text-navy-700 hover:text-primary-500 transition-colors"
              onClick={toggleMenu}
            >
              Security
            </a>
            {session && (
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  className="border-primary-500 text-primary-500 hover:bg-primary-100"
                  onClick={() => {
                    navigate('/profile');
                    toggleMenu();
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
