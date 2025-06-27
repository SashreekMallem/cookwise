import React from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, CakeIcon, StarIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Profile Header */}
      <div className="relative rounded-xl bg-white/70 backdrop-blur-sm shadow-lg p-8 border border-neutral-200">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <UserCircleIcon className="w-24 h-24 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-neutral-200">
              <CakeIcon className="w-5 h-5 text-primary-600" />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-display font-bold text-neutral-900">
              Welcome to Cookwise
            </h1>
            <p className="text-neutral-600 mt-2">
              Join our community to share your recipes and cooking experiences
            </p>
            <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Sign Up
              </button>
              <button className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-neutral-200"
        >
          <StarIcon className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
            Rate & Review
          </h3>
          <p className="text-neutral-600">
            Share your cooking experiences and help recipes evolve
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-neutral-200"
        >
          <BookmarkIcon className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
            Save Favorites
          </h3>
          <p className="text-neutral-600">
            Build your personal collection of beloved recipes
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg border border-neutral-200"
        >
          <CakeIcon className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
            Share Recipes
          </h3>
          <p className="text-neutral-600">
            Contribute your unique recipes to our growing community
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile; 