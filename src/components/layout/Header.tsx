
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showActionButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title,
  showBackButton = false,
  showActionButtons = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Hide back button on main dashboard
  const shouldShowBackButton = showBackButton && location.pathname !== '/dashboard';

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm py-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {shouldShowBackButton && (
            <button 
              onClick={handleBack}
              className="mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="font-semibold text-xl">{title}</h1>
        </div>
        
        {showActionButtons && (
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 ml-2 rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
