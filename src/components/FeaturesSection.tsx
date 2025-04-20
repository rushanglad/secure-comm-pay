
import React from 'react';
import { ShieldCheck, MessageSquare, Mail, Search, Paperclip, ArrowRight, Bell } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary-500" />,
    title: "End-to-End Encryption",
    description: "All communications are encrypted with state-of-the-art protocols ensuring only you and your recipient can access the content."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary-500" />,
    title: "Unified Messaging",
    description: "One platform for both email and instant messaging with a consistent user experience across devices."
  },
  {
    icon: <Search className="h-8 w-8 text-primary-500" />,
    title: "Encrypted Search",
    description: "Powerful search through your messages and emails without compromising on privacy and security."
  },
  {
    icon: <Paperclip className="h-8 w-8 text-primary-500" />,
    title: "Secure Attachments",
    description: "Share files and media with automatic encryption and detailed access controls."
  },
  {
    icon: <Bell className="h-8 w-8 text-primary-500" />,
    title: "Smart Notifications",
    description: "Customizable alerts across devices with privacy-focused notification content."
  },
  {
    icon: <Mail className="h-8 w-8 text-primary-500" />,
    title: "Unified Username",
    description: "One identity for both email and messaging creates a seamless communication experience."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800">
            Powerful Features, Uncompromising Security
          </h2>
          <p className="text-lg text-navy-600 max-w-3xl mx-auto">
            SecureComm combines the best of email and messaging with cutting-edge security to create a truly private communication platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-navy-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="bg-white rounded-lg h-16 w-16 flex items-center justify-center mb-5 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-navy-800">{feature.title}</h3>
              <p className="text-navy-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-primary-500 font-medium hover:text-primary-700 transition-colors"
          >
            Learn more about our features <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
