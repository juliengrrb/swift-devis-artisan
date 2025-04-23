
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Library, 
  Plus 
} from 'lucide-react';

const MobileNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50">
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center w-full h-full ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <LayoutDashboard size={24} />
        <span className="text-xs mt-1">Tableau</span>
      </Link>
      
      <Link 
        to="/quotes" 
        className={`flex flex-col items-center justify-center w-full h-full ${isActive('/quotes') ? 'text-primary' : 'text-gray-500'}`}
      >
        <FileText size={24} />
        <span className="text-xs mt-1">Devis</span>
      </Link>
      
      <div className="flex items-center justify-center w-full relative">
        <Link 
          to="/create-quote"
          className="absolute flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-lg -top-6"
        >
          <Plus size={28} />
        </Link>
      </div>
      
      <Link 
        to="/clients" 
        className={`flex flex-col items-center justify-center w-full h-full ${isActive('/clients') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Users size={24} />
        <span className="text-xs mt-1">Clients</span>
      </Link>
      
      <Link 
        to="/library" 
        className={`flex flex-col items-center justify-center w-full h-full ${isActive('/library') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Library size={24} />
        <span className="text-xs mt-1">Bibliothèque</span>
      </Link>
    </div>
  );
};

export default MobileNavbar;
