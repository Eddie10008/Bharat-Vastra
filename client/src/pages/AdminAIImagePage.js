import React from 'react';
import { Helmet } from 'react-helmet-async';
import AIImageGenerator from '../components/admin/AIImageGenerator';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AdminAIImagePage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <Helmet>
        <title>AI Image Generator - Bharat Vastra Admin</title>
        <meta name="description" content="Generate high-quality, copyright-free images for your Bharat Vastra platform using AI" />
      </Helmet>
      
      <AIImageGenerator />
    </ProtectedRoute>
  );
};

export default AdminAIImagePage;
