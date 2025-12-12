import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const GoogleAuthCallback: React.FC = () => {
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          // Store the token in localStorage
          localStorage.setItem('authToken', token);

          // Fetch user data from the backend
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();

            // Set user in auth context
            login({
              id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              googleId: userData.googleId,
            });
          }

          // Redirect to home page
          window.location.href = '/';
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Still redirect to home even if user data fetch fails
          window.location.href = '/';
        }
      } else {
        // Handle error - redirect to home or login
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, [login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;