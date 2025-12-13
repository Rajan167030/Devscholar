import React from 'react';
import SignupForm from '../components/SignupForm';

interface SignupPageProps {
  onNavigate?: (page: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const handleSignup = (data: { firstName: string; lastName: string; email: string; password: string }) => {
    console.log('Signup attempt:', data);
    // TODO: Implement actual signup logic
    alert('Signup functionality will be implemented with backend API');
  };

  const handleSwitchToLogin = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return <SignupForm onSwitchToLogin={handleSwitchToLogin} onSignup={handleSignup} />;
};

export default SignupPage;