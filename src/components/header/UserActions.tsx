
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
      <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
        <Button 
          variant="outline" 
          size="sm"
          className="border-primary-500 text-primary-500 hover:bg-primary-100 text-xs lg:text-sm px-2 lg:px-4"
          onClick={() => navigate('/dashboard')}
        >
          <LayoutDashboard className="mr-1 lg:mr-2 h-3 w-3 lg:h-4 lg:w-4" />
          <span className="hidden lg:inline">Dashboard</span>
          <span className="lg:hidden">App</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-primary-500 text-primary-500 hover:bg-primary-100 text-xs lg:text-sm px-2 lg:px-4"
          onClick={() => navigate('/profile')}
        >
          <User className="mr-1 lg:mr-2 h-3 w-3 lg:h-4 lg:w-4" />
          <span className="hidden lg:inline">Profile</span>
          <span className="lg:hidden">Me</span>
        </Button>
        <Button 
          onClick={handleSignOut}
          size="sm"
          className="bg-primary-500 hover:bg-primary-600 text-white text-xs lg:text-sm px-2 lg:px-4"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
      <Button 
        variant="outline" 
        size="sm"
        className="border-primary-500 text-primary-500 hover:bg-primary-100 text-xs lg:text-sm px-2 lg:px-4"
        onClick={() => navigate('/auth')}
      >
        Sign In
      </Button>
      <Button 
        className="bg-primary-500 hover:bg-primary-600 text-white text-xs lg:text-sm px-2 lg:px-4"
        size="sm"
        onClick={scrollToWaitlist}
      >
        <span className="hidden lg:inline">Join Waitlist</span>
        <span className="lg:hidden">Join</span>
      </Button>
    </div>
  );
};

export default UserActions;
