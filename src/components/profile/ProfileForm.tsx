
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProfileFormData {
  username: string;
  full_name: string;
}

export const ProfileForm = ({ profile, onUpdate }: { 
  profile: { username: string; full_name: string | null; }; 
  onUpdate: () => void;
}) => {
  const { session } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: {
      username: profile.username,
      full_name: profile.full_name || ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          name: data.full_name, // Save to name field in the database
          updated_at: new Date().toISOString()
        })
        .eq('id', session?.user.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      onUpdate();
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          {...register('full_name')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};
