
import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import { Logo } from './LandingPage';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-secondary">
      <div className="w-full max-w-md mb-8">
        <Logo />
      </div>
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;
