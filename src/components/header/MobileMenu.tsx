
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  scrollToWaitlist: () => void;
}

const MobileMenu = ({ isOpen, onToggle, scrollToWaitlist }: MobileMenuProps) => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg py-4 px-6">
      <nav className="flex flex-col space-y-4">
        <a 
          href="#features" 
          className="text-navy-700 hover:text-primary-500 transition-colors"
          onClick={onToggle}
        >
          Features
        </a>
        <a 
          href="#payments" 
          className="text-navy-700 hover:text-primary-500 transition-colors"
          onClick={onToggle}
        >
          Payments
        </a>
        <a 
          href="#platforms" 
          className="text-navy-700 hover:text-primary-500 transition-colors"
          onClick={onToggle}
        >
          Platforms
        </a>
        <a 
          href="#security" 
          className="text-navy-700 hover:text-primary-500 transition-colors"
          onClick={onToggle}
        >
          Security
        </a>
        {session ? (
          <div className="flex flex-col space-y-2 pt-2">
            <Button 
              variant="outline" 
              className="border-primary-500 text-primary-500 hover:bg-primary-100"
              onClick={() => {
                navigate('/profile');
                onToggle();
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button 
              onClick={() => {
                handleSignOut();
                onToggle();
              }}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 pt-2">
            <Button 
              variant="outline" 
              className="border-primary-500 text-primary-500 hover:bg-primary-100 w-full"
              onClick={() => {
                navigate('/auth');
                onToggle();
              }}
            >
              Sign In
            </Button>
            <Button 
              className="bg-primary-500 hover:bg-primary-600 text-white w-full"
              onClick={scrollToWaitlist}
            >
              Join Waitlist
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
