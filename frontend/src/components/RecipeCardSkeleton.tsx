import React from 'react';

const RecipeCardSkeleton = () => {
  return (
    <div className="group relative block overflow-hidden card animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-t-2xl bg-neutral-300/50"></div>

      {/* Content Placeholder */}
      <div className="p-6">
        {/* Author Placeholder */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-neutral-300/50"></div>
          <div className="h-4 bg-neutral-300/50 rounded w-1/2"></div>
        </div>

        {/* Title Placeholder */}
        <div className="h-6 bg-neutral-300/50 rounded w-3/4 mb-3"></div>
        
        {/* Description Placeholder */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-neutral-300/50 rounded w-full"></div>
          <div className="h-3 bg-neutral-300/50 rounded w-5/6"></div>
        </div>

        {/* Stats Placeholder */}
        <div className="flex items-center justify-between text-sm mt-4">
          <div className="flex items-center space-x-4">
            <div className="h-5 bg-neutral-300/50 rounded w-12"></div>
            <div className="h-5 bg-neutral-300/50 rounded w-12"></div>
          </div>
          <div className="h-6 bg-neutral-300/50 rounded-full w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton; 