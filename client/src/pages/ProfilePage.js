import React from 'react';
import NumerologyProfile from '../components/common/NumerologyProfile';

const ProfilePage = () => {
  return (
    <div className="container-max px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Profile</h1>
      
      {/* Numerology Profile Section */}
      <div className="mb-8">
        <NumerologyProfile />
      </div>
      
      <p className="text-gray-600">Profile page coming soon...</p>
    </div>
  );
};

export default ProfilePage;
