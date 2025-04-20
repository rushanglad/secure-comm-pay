
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileForm } from '@/components/profile/ProfileForm';

// Define the profile type to match what the form expects
interface ProfileData {
  username: string;
  full_name: string | null;
}

const Profile = () => {
  const { session } = useAuth();
  
  // Redirect to auth if not logged in
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', session.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, name')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      
      // Return data with the correct shape for our form
      return {
        username: data?.username || '',
        full_name: data?.name || null, // Using name field from database as full_name
      } as ProfileData;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
        <p className="text-red-500">Error loading profile: {(error as Error).message}</p>
      </div>
    );
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
          {profile && <ProfileForm profile={profile} onUpdate={refetch} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
