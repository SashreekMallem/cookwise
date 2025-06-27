// @ts-nocheck
import express from 'express';
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  addReview,
  addIngredientSwap,
  getRecipeVariation,
  parseIngredients
} from '../controllers/recipeController';

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(createRecipe);

router.route('/:id')
  .get(getRecipe)
  .put(updateRecipe);

router.route('/:id/reviews')
  .post(addReview);

router.route('/:id/swaps')
  .post(addIngredientSwap);

router.route('/:id/variations/:region')
  .get(getRecipeVariation);

router.post('/parse-ingredients', parseIngredients);

export default router; 