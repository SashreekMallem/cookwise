import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Landing from './pages/Landing.tsx';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import Profile from './pages/Profile.tsx';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound.tsx';

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="font-sans antialiased text-neutral-800">
      {!isLandingPage && <Navigation />}
      <main className={!isLandingPage ? "pt-28 container mx-auto px-4 sm:px-6 lg:px-8" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

// We need to wrap App in Router to use useLocation hook
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
