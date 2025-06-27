import { createClient } from '@supabase/supabase-js';
import { mockRecipes } from '../data/mockRecipes';

const supabaseUrl = 'https://gaubvsvgjinrjyntabqr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhdWJ2c3Znamlucmp5bnRhYnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5ODg0OTcsImV4cCI6MjA2NjU2NDQ5N30.yqT50R7VSrFBxG7KdP6sml7UK36w0ujBTtDpB8s2r4c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Recipe types
export interface Recipe {
  id: string;
  created_at: string;
  version: string; // e.g. "1.0", "1.1"
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  user_id: string;
  rating: number;
  reviews_count: number;
  confidence_score: number;
}

export type RecipeWithReviews = Recipe & {
  reviews?: Review[];
};

export interface Review {
  id: string;
  created_at: string;
  recipe_id: string;
  user_id: string;
  rating: number; // Overall rating
  comment: string;
  followed_exact?: boolean;
  swap_from?: string | null;
  swap_to?: string | null;
  taste_rating?: number | null;
  texture_rating?: number | null;
  quantity_accuracy?: number | null; // Whether quantity was accurate
  clarity_rating?: number | null; // How clear were instructions
  photo_url?: string | null;
}

export interface IngredientSwap {
  id: string;
  created_at: string;
  recipe_id: string;
  original_ingredient: string;
  alternative_ingredient: string;
  success_rate: number;
  votes_count: number;
}

export interface RegionalVariation {
  id: string;
  created_at: string;
  recipe_id: string;
  region: string;
  modifications: string[];
  popularity: number;
}

// Recipe queries with mock data fallback
export const recipeQueries = {
  getRecipe: async (id: string) => {
    if (!supabase) {
      const mockRecipe = mockRecipes.find(r => r._id === id);
      if (!mockRecipe) throw new Error('Recipe not found');
      return mockRecipe;
    }

    const { data, error } = await supabase
      .from('recipes')
      .select(`
        *,
        reviews (*),
        ingredient_swaps (*),
        regional_variations (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  getAllRecipes: async () => {
    if (!supabase) {
      return mockRecipes;
    }

    const { data, error } = await supabase
      .from('recipes')
      .select('*, reviews(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  createRecipe: async (recipe: Omit<Recipe, 'id' | 'created_at' | 'rating' | 'reviews_count' | 'confidence_score'>) => {
    if (!supabase) {
      return {
        ...recipe,
        id: String(mockRecipes.length + 1),
        created_at: new Date().toISOString(),
        rating: 0,
        reviews_count: 0,
        confidence_score: 0,
      };
    }

    const { data, error } = await supabase
      .from('recipes')
      .insert([{
        ...recipe,
        rating: 0,
        reviews_count: 0,
        confidence_score: 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateRecipe: async (id: string, updates: Partial<Recipe>) => {
    if (!supabase) {
      const mockRecipe = mockRecipes.find(r => r._id === id);
      if (!mockRecipe) throw new Error('Recipe not found');
      return { ...mockRecipe, ...updates };
    }

    const { data, error } = await supabase
      .from('recipes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteRecipe: async (id: string) => {
    if (!supabase) {
      return; // Just pretend we deleted it
    }

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  searchRecipes: async (query: string) => {
    if (!supabase) {
      return mockRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .textSearch('title', query)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  },
};

// Version queries
export const recipeVersionQueries = {
  getVersionsForRecipe: async (baseId: string) => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('base_id', baseId)  // assuming 'base_id' groups versions
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  createNewVersion: async (baseId: string, updates: Partial<Recipe>, newVersion: string) => {
    // Insert a new recipe row with incremented version number
    const { data, error } = await supabase
      .from('recipes')
      .insert([{ ...updates, base_id: baseId, version: newVersion }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// Review queries
export const reviewQueries = {
  createReview: async (review: Omit<Review, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateReview: async (id: string, updates: Partial<Review>) => {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteReview: async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};

// Ingredient swap queries
export const ingredientSwapQueries = {
  createIngredientSwap: async (swap: Omit<IngredientSwap, 'id' | 'created_at' | 'success_rate' | 'votes_count'>) => {
    const { data, error } = await supabase
      .from('ingredient_swaps')
      .insert([{
        ...swap,
        success_rate: 0,
        votes_count: 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  voteIngredientSwap: async (id: string, successful: boolean) => {
    const { data: currentSwap } = await supabase
      .from('ingredient_swaps')
      .select('success_rate, votes_count')
      .eq('id', id)
      .single();

    if (!currentSwap) throw new Error('Ingredient swap not found');

    const newVotesCount = currentSwap.votes_count + 1;
    const newSuccessRate = successful
      ? ((currentSwap.success_rate * currentSwap.votes_count) + 100) / newVotesCount
      : (currentSwap.success_rate * currentSwap.votes_count) / newVotesCount;

    const { data, error } = await supabase
      .from('ingredient_swaps')
      .update({
        success_rate: newSuccessRate,
        votes_count: newVotesCount,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Regional variation queries
export const regionalVariationQueries = {
  createRegionalVariation: async (variation: Omit<RegionalVariation, 'id' | 'created_at' | 'popularity'>) => {
    const { data, error } = await supabase
      .from('regional_variations')
      .insert([{
        ...variation,
        popularity: 0,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateRegionalVariation: async (id: string, updates: Partial<RegionalVariation>) => {
    const { data, error } = await supabase
      .from('regional_variations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Utility to compute confidence score locally from reviews
export const computeConfidenceScore = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  const followedExact = reviews.filter(r => r.followed_exact).length;
  const withPhotos = reviews.filter(r => !!r.photo_url).length;
  const avgTaste = reviews.reduce((a, r) => a + (r.taste_rating ?? r.rating), 0) / reviews.length;
  const ratioAccuracy = reviews.filter(r => (r.quantity_accuracy ?? 3) >= 4).length;
  const score =
    (followedExact / reviews.length) * 40 +
    (withPhotos / reviews.length) * 20 +
    (avgTaste / 5) * 30 +
    (ratioAccuracy / reviews.length) * 10;
  return Math.round(score);
} 