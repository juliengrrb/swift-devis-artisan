
import React, { ReactNode } from 'react';
import MobileNavbar from './MobileNavbar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  showActionButtons?: boolean;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false,
  showActionButtons = true,
  hideNavbar = false
}) => {
  return (
    <div className="min-h-screen bg-secondary pb-16">
      <Header 
        title={title} 
        showBackButton={showBackButton} 
        showActionButtons={showActionButtons}
      />
      <main className="p-4 pb-20">
        {children}
      </main>
      {!hideNavbar && <MobileNavbar />}
    </div>
  );
};

export default Layout;
