
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-navy-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-navy-800 mb-4">Page Not Found</h2>
        <p className="text-navy-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" onClick={() => window.history.back()}>
            <span className="flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
