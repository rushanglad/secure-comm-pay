
interface NavigationProps {
  onItemClick?: () => void;
}

const Navigation = ({ onItemClick }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a 
        href="#features" 
        className="text-navy-700 hover:text-primary-500 transition-colors"
        onClick={onItemClick}
      >
        Features
      </a>
      <a 
        href="#payments" 
        className="text-navy-700 hover:text-primary-500 transition-colors"
        onClick={onItemClick}
      >
        Payments
      </a>
      <a 
        href="#platforms" 
        className="text-navy-700 hover:text-primary-500 transition-colors"
        onClick={onItemClick}
      >
        Platforms
      </a>
      <a 
        href="#security" 
        className="text-navy-700 hover:text-primary-500 transition-colors"
        onClick={onItemClick}
      >
        Security
      </a>
    </nav>
  );
};

export default Navigation;
