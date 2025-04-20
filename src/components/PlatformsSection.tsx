
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare } from 'lucide-react';

const PlatformsSection = () => {
  const [platform, setPlatform] = useState("web");

  return (
    <section id="platforms" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800">
            Available Across All Platforms
          </h2>
          <p className="text-lg text-navy-600 max-w-3xl mx-auto">
            Access SecureComm seamlessly on any device with our web and mobile applications.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="web" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10">
              <TabsTrigger 
                value="web"
                className="text-lg py-3 data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                Web Application
              </TabsTrigger>
              <TabsTrigger 
                value="mobile"
                className="text-lg py-3 data-[state=active]:bg-primary-500 data-[state=active]:text-white"
              >
                Mobile App
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="web" className="mt-6">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <h3 className="text-2xl font-semibold mb-4 text-navy-800">Web Experience</h3>
                  <p className="text-navy-600 mb-6">
                    Access your encrypted communications from any modern browser with our responsive web application. No downloads required.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Browser-Based Security</h4>
                        <p className="text-navy-600 text-sm">
                          End-to-end encryption implemented directly in your browser for maximum security.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Wallet Integration</h4>
                        <p className="text-navy-600 text-sm">
                          Connect with browser extensions like MetaMask for seamless crypto payments.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Progressive Web App</h4>
                        <p className="text-navy-600 text-sm">
                          Install as a desktop application with offline capabilities and notifications.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                  <div className="bg-navy-100 rounded-lg p-4 shadow-lg">
                    <div className="bg-white rounded-lg shadow-sm p-2 overflow-hidden">
                      <div className="flex items-center mb-4 bg-navy-800 text-white px-4 py-2 rounded-t-md">
                        <div className="flex space-x-2 mr-4">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-sm font-medium">SecureComm Web</div>
                      </div>
                      
                      <div className="bg-navy-50 h-48 sm:h-64 rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <Mail className="h-12 w-12 text-primary-500" />
                            <MessageSquare className="h-12 w-12 text-teal-500 -ml-4" />
                          </div>
                          <p className="text-navy-600 font-medium">SecureComm Web Interface</p>
                          <p className="text-navy-400 text-sm">Encrypted. Private. Secure.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="mt-6">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="bg-navy-100 rounded-[36px] p-4 shadow-lg max-w-[280px] mx-auto">
                      <div className="bg-navy-800 rounded-[28px] pb-6 overflow-hidden">
                        <div className="h-6 flex items-center justify-center">
                          <div className="h-4 w-20 bg-navy-700 rounded-b-lg"></div>
                        </div>
                        
                        <div className="bg-navy-50 h-[440px] flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="flex justify-center mb-2">
                              <Mail className="h-10 w-10 text-primary-500" />
                              <MessageSquare className="h-10 w-10 text-teal-500 -ml-4" />
                            </div>
                            <p className="text-navy-600 font-medium mt-2">SecureComm Mobile</p>
                            <p className="text-navy-400 text-xs">Privacy on the go</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-navy-800">Mobile Experience</h3>
                  <p className="text-navy-600 mb-6">
                    Take your secure communications anywhere with our feature-rich mobile applications for iOS and Android.
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Biometric Protection</h4>
                        <p className="text-navy-600 text-sm">
                          Secure access with fingerprint and face recognition for enhanced security.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Mobile Wallet Integration</h4>
                        <p className="text-navy-600 text-sm">
                          Connect with WalletConnect compatible crypto wallets or use UPI directly.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Offline Capability</h4>
                        <p className="text-navy-600 text-sm">
                          Access your previous communications even when you're offline.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                        <span className="text-primary-600 font-medium">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy-800">Push Notifications</h4>
                        <p className="text-navy-600 text-sm">
                          Privacy-focused notifications that don't reveal message contents.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
