import { Request, Response } from 'express';
import { parseIngredient } from 'parse-ingredient';

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
export const getRecipes = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: [] });
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipe = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: {} });
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (req: Request, res: Response) => {
  res.status(201).json({ success: true, data: { message: 'Recipe created via Supabase' } });
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { message: 'Recipe updated via Supabase' } });
};

// @desc    Add review to recipe
// @route   POST /api/recipes/:id/reviews
// @access  Private
export const addReview = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { message: 'Review added via Supabase' } });
};

// @desc    Add ingredient swap to recipe
// @route   POST /api/recipes/:id/swaps
// @access  Private
export const addIngredientSwap = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { message: 'Swap added via Supabase' } });
};

// @desc    Get recipe variations by region
// @route   GET /api/recipes/:id/variations/:region
// @access  Public
export const getRecipeVariation = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: {} });
};

// @desc    Extract ingredients from free-form recipe steps
// @route   POST /api/recipes/parse-ingredients
// @access  Public
export const parseIngredients = async (req: Request, res: Response) => {
  try {
    const { text } = req.body as { text?: string };

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Request body must include a "text" field of type string.',
      });
    }

    const parsed = parseIngredient(text, { normalizeUOM: true });
    
    return res.status(200).json({
        success: true,
        count: parsed.length,
        data: parsed,
    });

  } catch (error) {
    console.error('Ingredient parsing failed', error);
    res.status(500).json({
      success: false,
      error: 'Unable to parse ingredients.',
    });
  }
}; 