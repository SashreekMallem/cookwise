import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { recipeQueries } from '../lib/supabase';
import {
  StarIcon, ClockIcon, UsersIcon, ArrowTrendingUpIcon, BeakerIcon, GlobeAltIcon, CalendarIcon, ArrowLeftIcon, CameraIcon, BookOpenIcon
} from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientSwap {
  originalIngredient: string;
  alternativeIngredient: string;
  successRate: number;
}

interface RegionalVariation {
  region: string;
  modifications: string[];
  popularity: number;
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  reviews: Review[];
  rating: number;
  ingredientSwaps: IngredientSwap[];
  regionalVariations: RegionalVariation[];
  confidenceScore: number;
  version: number;
}

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

const sectionVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const recipeData = await recipeQueries.getRecipe(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Failed to fetch recipe details:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // TODO: Add a premium loading skeleton component
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const reviews = recipe.reviews || [];
  const totalTime = recipe.prep_time + recipe.cook_time;
  const confidenceScore = recipe.confidence_score || 75; // Fallback
  const averageRating = reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / (reviews.length || 1);

  const renderStars = (rating: number) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <SolidStarIcon key={i} className={`star ${i < Math.round(rating) ? 'star-filled' : 'star-empty'}`} />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="pb-24">
        <Link to="/" className="btn-ghost inline-flex items-center gap-2 mb-8 animate-fade-in">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Recipes</span>
        </Link>

        <header className="relative h-[50vh] rounded-3xl overflow-hidden mb-12 animate-fade-in">
          <img src={recipe.image_url || 'https://source.unsplash.com/random/1600x900/?food,cooking'} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-12 text-white">
            <span className="badge badge-primary mb-4">{recipe.cuisine}</span>
            <h1 className="text-white !text-5xl drop-shadow-lg">{recipe.title}</h1>
            <div className="flex items-center gap-2 mt-4 text-white/90">
              {/* Placeholder for author info if not available */}
              <span>By {recipe.user_id || 'Community Chef'}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <main className="lg:col-span-2 space-y-12">
            <motion.section 
              className="card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={sectionVariants}
            >
              <StatCard icon={<StarIcon />} value={averageRating.toFixed(1)} label="Rating" />
              <StatCard icon={<ClockIcon />} value={`${totalTime}m`} label="Total Time" />
              <StatCard icon={<UsersIcon />} value={recipe.difficulty} label="Difficulty" />
              <StatCard icon={<ArrowTrendingUpIcon />} value={`${confidenceScore}%`} label="Confidence" />
            </motion.section>

            <motion.section
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={sectionVariants}
            >
              <h2 className="mb-4">Description</h2>
              <p className="prose max-w-none">{recipe.description}</p>
            </motion.section>

            <motion.section
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={sectionVariants}
            >
              <h2 className="mb-6">Ingredients</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {recipe.ingredients.map((ing: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 group">
                     <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-600 flex-shrink-0 flex items-center justify-center font-bold">{i + 1}</div>
                     <div>
                       <span className="font-medium">{ing.name}</span>
                       <span className="text-neutral-500 text-sm ml-2">{ing.amount} {ing.unit}</span>
                     </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={sectionVariants}
            >
              <h2 className="mb-6">Instructions</h2>
              <ol className="space-y-8 border-l-2 border-primary-200/50 ml-4">
                {recipe.instructions.map((step: string, i: number) => (
                  <li key={i} className="relative pl-10">
                     <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold ring-8 ring-neutral-50">{i + 1}</div>
                     <p className="prose max-w-none">{step}</p>
                  </li>
                ))}
              </ol>
            </motion.section>
          </main>

          <motion.aside 
            className="space-y-8 lg:sticky top-28 h-fit"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <InfoCard title="Ingredient Swaps" icon={<BeakerIcon />} data={recipe.ingredient_swaps || []} />
            <InfoCard title="Regional Variations" icon={<GlobeAltIcon />} data={recipe.regional_variations || []} />
            <InfoCard title="Version History" icon={<CalendarIcon />} data={[{ version: recipe.version, date: recipe.created_at, changes: 'Initial release' }]} />
          </motion.aside>
        </div>
        
        <motion.section 
          className="mt-24"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          variants={sectionVariants}
        >
          <h2 className="mb-8 text-center">Community Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: any) => (
              <div key={review.id} className="card p-6 flex flex-col">
                <div className="flex items-center mb-4">
                   {/* Placeholder for author info */}
                  <div>
                    <p className="font-semibold">{review.user_id}</p>
                    <p className="text-sm text-neutral-500">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-auto">{renderStars(review.rating)}</div>
                </div>
                <p className="text-neutral-600 italic mb-4">"{review.comment}"</p>
                
                <div className="mt-auto space-y-3 pt-4 border-t border-neutral-200/60">
                  <FeedbackItem icon={<BookOpenIcon />} label="Clarity" value={review.clarity_rating} />
                  <FeedbackItem icon={<BeakerIcon />} label="Taste" value={review.taste_rating} />
                  <FeedbackItem icon={<CameraIcon />} label="Authenticity" value={review.authenticity_rating} />
                </div>
              </div>
            ))}
             {reviews.length === 0 && <p className="text-center col-span-full">Be the first to review this recipe!</p>}
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-12 h-12 bg-primary-100/50 text-primary-600 rounded-xl flex items-center justify-center">{icon}</div>
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-sm text-neutral-500">{label}</p>
  </div>
);

const InfoCard = ({ title, icon, data }: { title: string, icon: React.ReactNode, data: any[]}) => (
  <div className="card p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 text-accent-600">{icon}</div>
      <h3 className="!text-xl text-neutral-800">{title}</h3>
    </div>
    <ul className="space-y-3 text-sm">
      {data.map((item, i) => (
        <li key={i} className="flex justify-between p-2 rounded-lg hover:bg-neutral-100/50">
          <span>{item.original || item.region || `v${item.version}`}</span>
          <span className="font-medium text-neutral-800">{item.swap || item.name || new Date(item.date).toLocaleDateString()}</span>
        </li>
      ))}
       {data.length === 0 && <li className="text-neutral-500">No data available.</li>}
    </ul>
  </div>
);

const FeedbackItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-neutral-600">
      {icon}
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`w-4 h-4 rounded-full ${i < value ? 'bg-accent-400' : 'bg-neutral-200'}`} />
      ))}
    </div>
  </div>
);

export default RecipeDetail; 