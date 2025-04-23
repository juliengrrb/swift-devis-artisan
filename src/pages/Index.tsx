
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard immediately without auth check
    navigate('/dashboard');
  }, [navigate]);

  return null;
};

export default Index;
