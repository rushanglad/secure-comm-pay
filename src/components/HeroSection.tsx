
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, MessageSquare, Mail, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToWaitlist = () => {
    // Scroll to waitlist section smoothly
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-navy-100 to-navy-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center bg-white bg-opacity-70 rounded-full px-4 py-1 mb-6">
              <ShieldCheck className="h-4 w-4 text-teal-500 mr-2" />
              <span className="text-sm font-medium text-navy-700">End-to-end encrypted</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
                Unified Communication
              </span> <br />
              <span className="text-navy-800">with Integrated Payments</span>
            </h1>
            
            <p className="text-lg md:text-xl text-navy-600 mb-8 max-w-lg mx-auto lg:mx-0">
              One platform for encrypted emails, messaging, and seamless payments using crypto, UPI, and e₹.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={scrollToWaitlist}
              >
                Join Waitlist
              </Button>
              
              <Button size="lg" variant="outline" className="border-navy-400 text-navy-700 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full filter blur-3xl opacity-30 animate-pulse-light"></div>
              <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-teal-200 rounded-full filter blur-3xl opacity-20"></div>
              
              <div className="relative glass-effect rounded-2xl shadow-xl border border-white border-opacity-20 p-6 animate-float">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-start space-x-4 bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <MessageSquare className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-800">Encrypted Messaging</h3>
                      <p className="text-sm text-navy-600">Matrix protocol with E2EE</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="p-2 bg-teal-100 rounded-full">
                      <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-800">Secure Email</h3>
                      <p className="text-sm text-navy-600">PGP encryption standard</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="p-2 bg-navy-200 rounded-full">
                      <Send className="h-6 w-6 text-navy-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-800">Integrated Payments</h3>
                      <p className="text-sm text-navy-600">Polygon, UPI, & e₹ CBDC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
