
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface UserActionsProps {
  scrollToWaitlist: () => void;
}

const UserActions = ({ scrollToWaitlist }: UserActionsProps) => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (session) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="border-primary-500 text-primary-500 hover:bg-primary-100"
          onClick={() => navigate('/dashboard')}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button 
          variant="outline" 
          className="border-primary-500 text-primary-500 hover:bg-primary-100"
          onClick={() => navigate('/profile')}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button 
          onClick={handleSignOut}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button 
        variant="outline" 
        className="border-primary-500 text-primary-500 hover:bg-primary-100"
        onClick={() => navigate('/auth')}
      >
        Sign In
      </Button>
      <Button 
        className="bg-primary-500 hover:bg-primary-600 text-white"
        onClick={scrollToWaitlist}
      >
        Join Waitlist
      </Button>
    </div>
  );
};

export default UserActions;
