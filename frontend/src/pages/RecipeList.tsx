import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, MagnifyingGlassIcon, SparklesIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import RecipeCard from '../components/RecipeCard';
import { recipeQueries, computeConfidenceScore } from '../lib/supabase';
import type { RecipeWithReviews } from '../lib/supabase';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeWithReviews[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('confidence');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      const fetchRecipes = async () => {
        setLoading(true);
        const fetchedRecipes = await recipeQueries.getAllRecipes();
        const recipesWithConfidence = fetchedRecipes.map((r) => ({
          ...r,
          confidenceScore: computeConfidenceScore(r.reviews || [])
        }));
        setRecipes(recipesWithConfidence as any); // Still need 'as any' for added confidenceScore
        setLoading(false);
      };

      fetchRecipes();
    }, 500); // 500ms delay
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedRecipes = useMemo(() => {
    return (recipes as any[])
      .filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(recipe => difficultyFilter.length === 0 || difficultyFilter.includes(recipe.difficulty.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'confidence') {
          return b.confidenceScore - a.confidenceScore;
        }
        if (sortOrder === 'rating') {
          return b.rating - a.rating;
        }
        if (sortOrder === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
      });
  }, [recipes, searchTerm, sortOrder, difficultyFilter]);

  const handleDifficultyToggle = (difficulty: string) => {
    setDifficultyFilter(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };
  
  const difficulties = ['easy', 'medium', 'hard'];

  if (loading) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <section className="text-center py-16 sm:py-24 animate-pulse">
          <div className="h-12 bg-neutral-300/50 rounded-lg w-1/2 mx-auto mb-4"></div>
          <div className="h-5 bg-neutral-300/50 rounded-lg w-3/4 mx-auto"></div>
        </section>
        <div className="mb-12 p-6 bg-white/80 backdrop-blur-glass rounded-2xl shadow-glass animate-pulse">
            <div className="h-14 bg-neutral-300/50 rounded-lg w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {[...Array(6)].map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-24 animate-fade-in">
        <h1 className="mb-4">Discover Your Next Favorite Meal</h1>
        <p className="max-w-2xl mx-auto text-lg text-neutral-600">
          Explore a world of community-driven recipes, refined and perfected by home cooks like you.
        </p>
      </section>

      {/* Filters and Search Bar */}
      <div className="mb-12 p-6 bg-white/80 backdrop-blur-glass rounded-2xl shadow-glass sticky top-28 z-40 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-1/3">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-12 w-full"
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="font-medium text-neutral-700 hidden sm:block">Difficulty:</span>
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => handleDifficultyToggle(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 transform active:scale-95
                  ${difficultyFilter.includes(d)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white/50 hover:bg-white'}`
                }
              >
                {d}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="input appearance-none pr-10"
            >
              <option value="confidence">Sort by: Confidence</option>
              <option value="rating">Sort by: Rating</option>
              <option value="newest">Sort by: Newest</option>
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        {filteredAndSortedRecipes.map((recipe, index) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe as any} />
          </div>
        ))}
      </div>

      {filteredAndSortedRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block p-4 rounded-full bg-neutral-100 mb-4">
            <SparklesIcon className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-2">
            No recipes found
          </h3>
          <p className="text-neutral-500">
            Try adjusting your search or filters to find what you're looking for
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecipeList; 