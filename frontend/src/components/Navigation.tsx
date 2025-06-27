import { Link, NavLink } from 'react-router-dom';
import { SparklesIcon, MagnifyingGlassIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const navLinkClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300";
  const activeLinkClasses = "bg-primary-500/10 text-primary-600 shadow-inner-glow";
  const inactiveLinkClasses = "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between h-20 bg-white/80 backdrop-blur-glass rounded-2xl shadow-glass px-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 animate-bounce-in">
            <SparklesIcon className="w-8 h-8 text-primary-500" />
            <span className="font-display text-2xl font-bold text-neutral-800">Cookwise</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/recipes" 
              end
              className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <span>Discover</span>
            </NavLink>
            <NavLink 
              to="/analytics" 
              className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <span>Analytics</span>
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <span>Profile</span>
            </NavLink>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="btn-ghost p-3 rounded-full hidden sm:block">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <Link to="/create" className="btn-island animate-scale-in">
              <PlusIcon className="w-5 h-5" />
              <span className="hidden lg:block">New Recipe</span>
            </Link>
            <button className="btn-ghost p-2 rounded-full hidden sm:block">
               <UserCircleIcon className="w-8 h-8"/>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation; 