import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface AnalyticsData {
  totalRecipes: number;
  totalReviews: number;
  averageRating: number;
  popularCuisines: { cuisine: string; count: number }[];
  topIngredients: { ingredient: string; count: number }[];
  ratingDistribution: { rating: number; count: number }[];
  difficultyDistribution: { difficulty: string; count: number }[];
  monthlyActivity: { month: string; recipes: number; reviews: number }[];
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch recipes data
        let { data: recipes, error: recipesError } = await supabase
          .from('recipes')
          .select('id');

        if (recipesError) throw recipesError;
        recipes = recipes || [];

        // Fetch reviews data
        let { data: reviews, error: reviewsError } = await supabase
          .from('reviews')
          .select('id, rating');

        if (reviewsError) throw reviewsError;
        reviews = reviews || [];

        const totalRecipes = recipes.length;
        const totalReviews = reviews.length;
        const averageRating = reviews.length > 0
          ? reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / reviews.length
          : 0;

        setData({
          totalRecipes,
          totalReviews,
          averageRating,
          popularCuisines: [],
          topIngredients: [],
          ratingDistribution: [],
          difficultyDistribution: [],
          monthlyActivity: [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-playfair mb-8">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-gray-500 mb-2">Total Recipes</h3>
          <p className="text-4xl font-bold text-purple-600">{data.totalRecipes}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-gray-500 mb-2">Total Reviews</h3>
          <p className="text-4xl font-bold text-purple-600">{data.totalReviews}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-gray-500 mb-2">Average Rating</h3>
          <p className="text-4xl font-bold text-purple-600">
            {data.averageRating.toFixed(1)}
            <span className="text-2xl">★</span>
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Popular Cuisines */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-playfair mb-6">Popular Cuisines</h2>
          <div className="space-y-4">
            {data.popularCuisines.map(({ cuisine, count }) => (
              <div key={cuisine} className="flex items-center">
                <span className="w-32 text-gray-600">{cuisine}</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(count / data.totalRecipes) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-playfair mb-6">Rating Distribution</h2>
          <div className="space-y-4">
            {data.ratingDistribution.map(({ rating, count }) => (
              <div key={rating} className="flex items-center">
                <span className="w-20 text-gray-600">{rating} ★</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(count / data.totalReviews) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Ingredients */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-playfair mb-6">Top Ingredients</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.topIngredients.map(({ ingredient, count }) => (
              <div key={ingredient} className="flex items-center space-x-2">
                <span className="text-purple-600">•</span>
                <span className="text-gray-600">{ingredient}</span>
                <span className="text-gray-400">({count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-playfair mb-6">Recipe Difficulty</h2>
          <div className="space-y-4">
            {data.difficultyDistribution.map(({ difficulty, count }) => (
              <div key={difficulty} className="flex items-center">
                <span className="w-24 text-gray-600">{difficulty}</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(count / data.totalRecipes) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-gray-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Activity */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-playfair mb-6">Monthly Activity</h2>
        <div className="h-64">
          <div className="h-full flex items-end space-x-4">
            {data.monthlyActivity.map(({ month, recipes, reviews }) => (
              <div key={month} className="flex-1 flex flex-col items-center">
                <div className="w-full flex space-x-1">
                  <div
                    className="flex-1 bg-purple-600"
                    style={{
                      height: `${(recipes / Math.max(...data.monthlyActivity.map(m => m.recipes))) * 200}px`,
                    }}
                  />
                  <div
                    className="flex-1 bg-green-500"
                    style={{
                      height: `${(reviews / Math.max(...data.monthlyActivity.map(m => m.reviews))) * 200}px`,
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 transform -rotate-45 origin-top-left">
                  {month}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-600 mr-2" />
            <span className="text-gray-600">Recipes</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2" />
            <span className="text-gray-600">Reviews</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics; 