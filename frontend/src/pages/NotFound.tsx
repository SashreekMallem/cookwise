import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-xl rounded-full" />
          <ExclamationTriangleIcon className="relative w-24 h-24 mx-auto text-primary-600" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-neutral-900">
          Page Not Found
        </h1>
        
        <p className="text-neutral-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to cooking!
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound; 