# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Cookwise – Advanced Feature Roadmap

This document outlines how the nine key capabilities are/will be implemented.

## 1️⃣ Recipe Module / Versioning
• Schema: `recipes` table now contains `version` and a `base_id` (self-reference) so every version is its own row.
• Supabase Row Level Security (RLS): only owner or admins can create new versions.
• Front-End: CreateRecipe sets `version = '1.0'`. RecipeDetail shows version badge & History tab.

## 2️⃣ Cooking Feedback / Review System
See `reviews` table – stores full structured feedback, swap info, sub-ratings, photo.

## 3️⃣ Ingredient Swap Tracking
`ingredient_swaps` table collects swaps, `votes_count` & `success_rate` auto-updated via Postgres trigger.

## 4️⃣ Recipe Evolution & Auto-Suggestion
Periodic Supabase Edge Function analyses reviews, suggests new ratios; when accepted, `recipeVersionQueries.createNewVersion` creates v+0.1.

## 5️⃣ Regional Taste Profiles
`regional_variations` ties a recipe to region. Users table stores `region` pref.

## 6️⃣ Confidence Score
Pure SQL view `recipe_confidence_view` OR client util `computeConfidenceScore` (fallback) – combines followed_exact, photos, avg taste etc.

## 7️⃣ Community Recognition
`user_stats` materialized view + triggers; badges awarded via Edge Function and cached in `user_badges`.

## 8️⃣ Visual Review Gallery
Reviews with `photo_url` feed a gallery component (to build) + image moderation.

## 9️⃣ Version History UI
RecipeDetail → History tab queries `recipeVersionQueries.getVersionsForRecipe(base_id)` and renders diff list.
