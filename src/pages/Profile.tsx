
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { session } = useAuth();
  
  // Redirect to auth if not logged in
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <p className="bg-gray-100 p-2 rounded">{session.user.email}</p>
          </div>
          {/* Placeholder for additional profile information */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

