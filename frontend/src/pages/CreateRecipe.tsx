// @ts-nocheck
import { useState, useRef, useEffect, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { recipeQueries } from '../lib/supabase';
import { PlusIcon, TrashIcon, ArrowUpCircleIcon, CloudArrowUpIcon, SparklesIcon } from '@heroicons/react/24/outline';

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

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState(30);
  const [cookTime, setCookTime] = useState(45);
  const [servings, setServings] = useState(4);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [cuisine, setCuisine] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [steps, setSteps] = useState<string[]>(['']);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Auto-detect ingredients from instructions
  const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';

  const detectIngredients = useCallback(async () => {
    try {
      const plainText = steps.join('. ');

      const res = await fetch(`${API_URL}/api/recipes/parse-ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainText }),
      });

      const json = await res.json();
      if (json.success) {
        const newIngredients = json.data.map((ing: any) => ({
          name: ing.name || '',
          amount: ing.quantity !== null && ing.quantity !== undefined ? ing.quantity.toString() : '',
          unit: ing.unit || '',
        }));
        setIngredients(newIngredients);
      }
    } catch (err) {
      console.error('Ingredient detection failed', err);
    }
  }, [steps, API_URL]);

  const handleAddField = (setter: Function, state: any[], field: any) => {
    setter([...state, field]);
  };

  const handleRemoveField = (setter: Function, state: any[], index: number) => {
    const values = [...state];
    values.splice(index, 1);
    setter(values);
  };

  const handleInputChange = (setter: Function, state: any[], index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const values = [...state];
    values[index][event.target.name] = event.target.value;
    setter(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Build structured instructions from individual step inputs (ingredients empty for now)
      const structuredInstructions = steps.map(text => ({ text, ingredients: [] }));

      // 2. Construct the recipe object for submission
      const newRecipe = {
        title,
        description,
        prep_time: Number(prepTime),
        cook_time: Number(cookTime),
        servings: Number(servings),
        difficulty,
        cuisine,
        ingredients: ingredients.map(i => ({...i, amount: Number(i.amount)})), // This is the main ingredient list
        instructions: structuredInstructions, // Step-by-step structure
        version: "1.0",
      };

      console.log("Submitting structured recipe:", newRecipe); // For debugging

      const created = await recipeQueries.createRecipe(newRecipe as any);
      navigate(`/recipe/${created.id}`);
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="max-w-4xl mx-auto pb-24"
    >
      <form onSubmit={handleSubmit} className="space-y-12 relative">
        <div className="text-center">
          <h1>Share Your Culinary Creation</h1>
          <p className="mt-4 text-lg text-neutral-600">Contribute to the community by sharing your favorite recipes.</p>
        </div>
        
        <FormSection title="Recipe Details" description="Provide the basic information about your recipe.">
          <Input label="Title" name="title" placeholder="e.g., Classic Lasagna" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} required />
          <Textarea label="Description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} required />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Cuisine" name="cuisine" value={cuisine} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCuisine(e.target.value)} placeholder="e.g., Italian, Mexican" required />
            <Select label="Difficulty" value={difficulty} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value as any)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Input label="Prep Time (mins)" name="prepTime" type="number" value={prepTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrepTime(Number(e.target.value))} required />
            <Input label="Cook Time (mins)" name="cookTime" type="number" value={cookTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCookTime(Number(e.target.value))} required />
            <Input label="Servings" name="servings" type="number" value={servings} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServings(Number(e.target.value))} required />
          </div>
        </FormSection>

        <FormSection title="Ingredients" description="List all the ingredients needed.">
          <div className="space-y-4">
            {ingredients.map((ing, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <Input label={index === 0 ? "Ingredient" : ""} name="name" value={ing.name} onChange={(e) => handleInputChange(setIngredients, ingredients, index, e)} placeholder="e.g., All-purpose flour" containerClassName="col-span-6"/>
                <Input label={index === 0 ? "Amount" : ""} name="amount" type="text" value={ing.amount} onChange={(e) => handleInputChange(setIngredients, ingredients, index, e)} placeholder="e.g., 2" containerClassName="col-span-2"/>
                <Input label={index === 0 ? "Unit" : ""} name="unit" value={ing.unit} onChange={(e) => handleInputChange(setIngredients, ingredients, index, e)} placeholder="e.g., cups" containerClassName="col-span-3"/>
                <button type="button" onClick={() => handleRemoveField(setIngredients, ingredients, index)} className="btn-ghost !p-0 h-12 w-12 flex items-center justify-center text-neutral-500 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button type="button" onClick={() => handleAddField(setIngredients, ingredients, { name: '', amount: '', unit: '' })} className="btn-subtle">
              <PlusIcon className="w-5 h-5"/> Add Ingredient
            </button>
          </div>
        </FormSection>

        <FormSection title="Steps" description="Enter each instruction step separately.">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="font-bold text-primary-500 text-lg mt-3">{idx + 1}.</span>
                <Textarea
                  value={step}
                  onChange={(e) => {
                    const updated = [...steps];
                    updated[idx] = e.target.value;
                    setSteps(updated);
                  }}
                  rows={2}
                  containerClassName="flex-1"
                />
                <button type="button" onClick={() => {
                  const updated = steps.filter((_, i) => i !== idx);
                  setSteps(updated.length ? updated : ['']);
                }} className="btn-ghost !p-0 h-12 w-12 flex items-center justify-center text-neutral-500 hover:text-red-500 mt-1"><TrashIcon className="w-5 h-5"/></button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button type="button" onClick={() => setSteps([...steps, ''])} className="btn-subtle">
              <PlusIcon className="w-5 h-5"/> Add Step
            </button>
            <button
              type="button"
              onClick={detectIngredients}
              className="btn-subtle text-primary-600 bg-primary-500/10 hover:bg-primary-500/20"
            >
              <SparklesIcon className="w-5 h-5"/> Auto-detect Ingredients
            </button>
          </div>
        </FormSection>

        <FormSection title="Recipe Image" description="Upload a beautiful photo of your finished dish.">
          <div className="w-full h-64 border-2 border-dashed border-neutral-300 rounded-2xl flex flex-col items-center justify-center text-center p-4">
            <CloudArrowUpIcon className="w-12 h-12 text-neutral-400 mb-4"/>
            <p className="text-neutral-600 mb-2">Drag & drop your image here, or click to browse.</p>
            <p className="text-sm text-neutral-500">PNG, JPG, or GIF up to 10MB</p>
            <input type="file" className="absolute w-full h-full opacity-0 cursor-pointer" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
          </div>
        </FormSection>

        <div className="sticky bottom-0 z-10 py-6 bg-gradient-to-t from-neutral-100 via-neutral-100 to-transparent -mx-8 -mb-24 px-8">
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary flex items-center gap-2 !px-8 !py-4 !text-lg !rounded-full">
              <ArrowUpCircleIcon className="w-6 h-6"/> Submit Recipe
            </button>
          </div>
        </div>

      </form>
    </motion.div>
  );
};

// Reusable components for the form
const FormSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <div className="card p-8 animate-fade-in !shadow-glass-sm hover:!shadow-glass-lg !transform-none">
    <h2 className="!text-2xl border-b border-neutral-200 pb-4 mb-1">{title}</h2>
    <p className="text-neutral-500 mb-6 mt-2">{description}</p>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const Input = ({ label, type = 'text', value, onChange, name, placeholder, required = false, containerClassName = '' }: { label: string, type?: string, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name?: string, placeholder?: string, required?: boolean, containerClassName?: string }) => (
  <div className={containerClassName}>
    <label className={`block text-sm font-medium text-neutral-700 mb-2 ${!label && 'invisible'}`}>{label || 'Label'}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="input"/>
  </div>
);

const Textarea = ({ label, value, onChange, required = false, rows = 4, containerClassName = '' }: { label?: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, required?: boolean, rows?: number, containerClassName?: string }) => (
  <div className={containerClassName}>
    {label && <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>}
    <textarea value={value} onChange={onChange} required={required} rows={rows} className="input"/>
  </div>
);

const Select = ({ label, value, onChange, children }: { label: string, value: any, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
    <select value={value} onChange={onChange} className="input">
      {children}
    </select>
  </div>
);

export default CreateRecipe; 