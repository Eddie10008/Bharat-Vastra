import React from 'react';
import { GoogleLogin as GoogleLoginButton } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GoogleLogin = ({ onSuccess, onError, className = '' }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        if (onSuccess) {
          onSuccess(result);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      if (onError) {
        onError(error);
      } else {
        toast.error('Google login failed');
      }
    }
  };

  const handleError = (error) => {
    console.error('Google OAuth error:', error);
    if (onError) {
      onError(error);
    } else {
      toast.error('Google login failed');
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
        text="continue_with"
        shape="rectangular"
        locale="en"
      />
    </div>
  );
};

export default GoogleLogin;
