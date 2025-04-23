
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // This would be replaced with actual authentication check

  useEffect(() => {
    // If logged in, redirect to dashboard
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return <LandingPage />;
};

export default Index;
