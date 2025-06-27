import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { StarIcon, ClockIcon, UserIcon, BeakerIcon } from '@heroicons/react/24/solid';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  averageRating: number;
  confidenceScore: number;
  images: string[];
  cuisine: string;
  version?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const confidenceScore = recipe.confidenceScore || 75; // Fallback
  const averageRating = recipe.averageRating || 0;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'badge-accent from-emerald-500/10 to-emerald-600/10 text-emerald-700';
      case 'medium':
        return 'badge-accent from-amber-500/10 to-amber-600/10 text-amber-700';
      case 'hard':
        return 'badge-accent from-rose-500/10 to-rose-600/10 text-rose-700';
      default:
        return 'badge-accent';
    }
  };

  return (
    <motion.div
      style={{
        perspective: '1000px',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/recipe/${recipe._id}`}
        className="group relative block overflow-hidden card"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-t-2xl">
          <motion.img
            src={recipe.images[0] || 'https://source.unsplash.com/random/800x600/?food,cooking'}
            alt={recipe.title}
            className="w-full h-full object-cover filter group-hover:brightness-110"
            style={{ transform: 'translateZ(40px) scale(1.1)' }}
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Version Badge */}
          {recipe.version && (
            <div className="absolute top-4 left-4 badge badge-primary" style={{ transform: 'translateZ(50px)' }}>
              v{recipe.version}
            </div>
          )}

          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4" style={{ transform: 'translateZ(50px)' }}>
            <span className={`badge ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6 bg-white/80 backdrop-blur-glass">
          <div className="flex items-center space-x-2 mb-3" style={{ transform: 'translateZ(30px)' }}>
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="w-8 h-8 rounded-full ring-2 ring-white shadow-lg"
            />
            <span className="text-sm font-medium text-neutral-700">{recipe.author.name}</span>
          </div>

          <h3 className="font-display text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300" style={{ transform: 'translateZ(50px)' }}>
            {recipe.title}
          </h3>
          
          <p className="text-neutral-600 text-sm line-clamp-2 mb-4 group-hover:text-neutral-700 transition-colors" style={{ transform: 'translateZ(20px)' }}>
            {recipe.description}
          </p>

          <div className="flex items-center justify-between text-sm" style={{ transform: 'translateZ(40px)' }}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-amber-500">
                <StarIcon className="w-5 h-5 mr-1" />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-neutral-500">
                <ClockIcon className="w-5 h-5 mr-1" />
                <span>{totalTime}m</span>
              </div>
            </div>

            <div className="badge badge-primary">
              {confidenceScore}% confidence
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard; 