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
}

export const mockRecipes: Recipe[] = [
  {
    _id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce. Perfect blend of simple ingredients for an authentic taste.',
    author: {
      name: 'Chef Maria',
      avatar: 'https://ui-avatars.com/api/?name=Chef+Maria&background=random',
    },
    prepTime: 20,
    cookTime: 15,
    difficulty: 'medium',
    averageRating: 4.8,
    confidenceScore: 95,
    images: ['https://source.unsplash.com/random/800x600/?pizza,margherita'],
    cuisine: 'Italian'
  },
  {
    _id: '2',
    title: 'Japanese Ramen Bowl',
    description: 'Rich and flavorful ramen with tender chashu pork, soft-boiled egg, and fresh vegetables in a savory miso broth.',
    author: {
      name: 'Chef Tanaka',
      avatar: 'https://ui-avatars.com/api/?name=Chef+Tanaka&background=random',
    },
    prepTime: 45,
    cookTime: 30,
    difficulty: 'hard',
    averageRating: 4.9,
    confidenceScore: 92,
    images: ['https://source.unsplash.com/random/800x600/?ramen,noodles'],
    cuisine: 'Japanese'
  },
  {
    _id: '3',
    title: 'Fresh Summer Salad',
    description: 'Light and refreshing salad with mixed greens, cherry tomatoes, cucumber, and a honey-lemon vinaigrette.',
    author: {
      name: 'Sarah Green',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Green&background=random',
    },
    prepTime: 15,
    cookTime: 0,
    difficulty: 'easy',
    averageRating: 4.5,
    confidenceScore: 88,
    images: ['https://source.unsplash.com/random/800x600/?salad,fresh'],
    cuisine: 'International'
  },
  {
    _id: '4',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a gooey molten center, served with vanilla ice cream and fresh berries.',
    author: {
      name: 'Pierre Dubois',
      avatar: 'https://ui-avatars.com/api/?name=Pierre+Dubois&background=random',
    },
    prepTime: 20,
    cookTime: 12,
    difficulty: 'medium',
    averageRating: 4.9,
    confidenceScore: 94,
    images: ['https://source.unsplash.com/random/800x600/?chocolate,cake'],
    cuisine: 'French'
  },
  {
    _id: '5',
    title: 'Thai Green Curry',
    description: 'Aromatic and spicy curry with coconut milk, tender chicken, and fresh vegetables. Served with jasmine rice.',
    author: {
      name: 'Lisa Wong',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Wong&background=random',
    },
    prepTime: 30,
    cookTime: 25,
    difficulty: 'medium',
    averageRating: 4.7,
    confidenceScore: 91,
    images: ['https://source.unsplash.com/random/800x600/?curry,thai'],
    cuisine: 'Thai'
  },
  {
    _id: '6',
    title: 'Classic Beef Burger',
    description: 'Juicy beef patty with melted cheese, fresh lettuce, tomato, and special sauce on a toasted brioche bun.',
    author: {
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
    },
    prepTime: 20,
    cookTime: 10,
    difficulty: 'easy',
    averageRating: 4.6,
    confidenceScore: 89,
    images: ['https://source.unsplash.com/random/800x600/?burger,beef'],
    cuisine: 'American'
  }
]; 