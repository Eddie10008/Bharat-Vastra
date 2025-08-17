import React from 'react';
import { GoogleLogin as GoogleLoginButton } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GoogleLogin = ({ onSuccess, onError, className = '', isRegistration = false }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        if (onSuccess) {
          onSuccess(result);
        } else {
          // Default behavior - navigate to home or complete profile
          if (result.user && !result.user.profileCompleted) {
            navigate('/complete-profile');
          } else {
            navigate('/');
          }
        }
        
        // Show success message
        if (isRegistration) {
          toast.success('Account created successfully with Google!');
        } else {
          toast.success('Login successful!');
        }
      }
    } catch (error) {
      console.error('Google auth error:', error);
      if (onError) {
        onError(error);
      } else {
        toast.error(isRegistration ? 'Failed to create account with Google' : 'Google login failed');
      }
    }
  };

  const handleError = (error) => {
    console.error('Google OAuth error:', error);
    if (onError) {
      onError(error);
    } else {
      toast.error(isRegistration ? 'Failed to create account with Google' : 'Google login failed');
    }
  };

  return (
    <div className={className}>
      <GoogleLoginButton
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="outline"
        size="large"
        text={isRegistration ? "signup_with" : "continue_with"}
        shape="rectangular"
        locale="en"
      />
    </div>
  );
};

export default GoogleLogin;
