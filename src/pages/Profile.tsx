
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ProfileForm } from '@/components/profile/ProfileForm';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

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

  const { data: profile, isLoading, error, refetch } = useQuery<ProfileData>({
    queryKey: ['profile', session.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, name')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      
      // Handle case where no profile exists yet
      if (!data) {
        return {
          username: session.user.email?.split('@')[0] || '',
          full_name: null,
        };
      }
      
      // Map the 'name' column from database to 'full_name' prop
      return {
        username: data?.username || session.user.email?.split('@')[0] || '',
        full_name: data?.name || null,
      };
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading profile: {(error as Error).message}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">User Profile</h1>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <div className="bg-gray-100 p-3 rounded border">
                {session.user.email}
              </div>
            </div>
            {profile && <ProfileForm profile={profile} onUpdate={refetch} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
