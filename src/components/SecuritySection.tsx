
import React from 'react';
import { ShieldCheck, Lock, Key } from "lucide-react";

const SecuritySection = () => {
  return (
    <section id="security" className="py-20 bg-navy-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white bg-opacity-10 rounded-full px-4 py-1 mb-6">
            <ShieldCheck className="h-4 w-4 text-teal-400 mr-2" />
            <span className="text-sm font-medium text-teal-400">Industry-Leading Security</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Uncompromising Security by Design
          </h2>
          
          <p className="text-lg text-navy-200 max-w-3xl mx-auto">
            Our platform is built with security as its foundation, not as an afterthought. Every feature is designed with privacy and security first.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-navy-800 rounded-xl p-8 border border-navy-700">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-primary-900 p-3 rounded-lg">
                  <Lock className="h-6 w-6 text-primary-300" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email Protection</h3>
                  <p className="text-navy-300">
                    PGP encryption standard ensuring that only authorized recipients can read your emails.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 pl-16">
                <div className="bg-navy-700 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                    <h4 className="text-sm font-medium text-white">Public/Private Key Cryptography</h4>
                  </div>
                  <p className="text-xs text-navy-300 mt-1">
                    Messages are encrypted with the recipient's public key and can only be decrypted with their private key.
                  </p>
                </div>
                
                <div className="bg-navy-700 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-teal-500 mr-2"></div>
                    <h4 className="text-sm font-medium text-white">Digital Signatures</h4>
                  </div>
                  <p className="text-xs text-navy-300 mt-1">
                    Messages are signed with your private key to verify authenticity and prevent tampering.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-navy-800 rounded-xl p-8 border border-navy-700">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-teal-900 p-3 rounded-lg">
                  <Key className="h-6 w-6 text-teal-300" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Chat Security</h3>
                  <p className="text-navy-300">
                    Matrix protocol with end-to-end encryption ensures your messages remain private.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 pl-16">
                <div className="bg-navy-700 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
                    <h4 className="text-sm font-medium text-white">Olm & Megolm Protocols</h4>
                  </div>
                  <p className="text-xs text-navy-300 mt-1">
                    Uses the same double ratchet algorithm as Signal for perfect forward secrecy.
                  </p>
                </div>
                
                <div className="bg-navy-700 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary-500 mr-2"></div>
                    <h4 className="text-sm font-medium text-white">Device Verification</h4>
                  </div>
                  <p className="text-xs text-navy-300 mt-1">
                    Verify devices to ensure messages are only sent to trusted endpoints.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-navy-800 rounded-xl p-8 border border-navy-700">
            <h3 className="text-xl font-semibold mb-4 text-center">Our Security Principles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-navy-700 rounded-lg p-5 text-center">
                <h4 className="font-medium mb-2 text-white">Zero Access</h4>
                <p className="text-sm text-navy-300">
                  We cannot access your messages or content even if compelled.
                </p>
              </div>
              
              <div className="bg-navy-700 rounded-lg p-5 text-center">
                <h4 className="font-medium mb-2 text-white">Open Source</h4>
                <p className="text-sm text-navy-300">
                  Our encryption implementation is open for review and validation.
                </p>
              </div>
              
              <div className="bg-navy-700 rounded-lg p-5 text-center">
                <h4 className="font-medium mb-2 text-white">Regular Audits</h4>
                <p className="text-sm text-navy-300">
                  Security protocols are regularly audited by independent experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
