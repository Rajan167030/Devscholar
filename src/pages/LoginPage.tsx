import React from 'react';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
  onNavigate?: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // TODO: Implement actual login logic
    alert('Login functionality will be implemented with backend API');
  };

  const handleSwitchToSignup = () => {
    if (onNavigate) {
      onNavigate('signup');
    }
  };

  return <LoginForm onSwitchToSignup={handleSwitchToSignup} onLogin={handleLogin} />;
};

export default LoginPage;