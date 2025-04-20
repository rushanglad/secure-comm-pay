
import React from 'react';
import { Button } from "@/components/ui/button";

const PaymentsSection = () => {
  return (
    <section id="payments" className="py-20 bg-navy-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800">
            Integrated Payment Solutions
          </h2>
          <p className="text-lg text-navy-600 max-w-3xl mx-auto">
            Send and receive payments seamlessly through multiple methods, all with the same level of security as your messages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Polygon Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3"></div>
            <div className="p-6">
              <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy-800">Polygon Crypto</h3>
              <p className="text-navy-600 mb-5">
                Send MATIC and custom ERC-20 tokens with minimal fees and quick confirmation times.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Low transaction fees</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Fast confirmations</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Full wallet integration</span>
                </li>
              </ul>
            </div>
          </div>

          {/* UPI Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-3"></div>
            <div className="p-6">
              <div className="bg-teal-100 rounded-full h-16 w-16 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M12 9v6"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy-800">UPI</h3>
              <p className="text-navy-600 mb-5">
                India's Universal Payment Interface for instant bank transfers using QR codes or IDs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Instant transfers</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">QR code payments</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Zero transaction fees</span>
                </li>
              </ul>
            </div>
          </div>

          {/* eRupee Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-3"></div>
            <div className="p-6">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy-800">e₹ (CBDC)</h3>
              <p className="text-navy-600 mb-5">
                Digital Rupee issued by the Reserve Bank of India for secure and regulated digital transactions.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Central bank backed</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Offline transactions</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-sm text-navy-600">Bank API integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">
            Explore Payment Options
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentsSection;
