import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Menu, X, LogIn, LayoutDashboard, LogOut, User as UserIcon, Package, ChevronDown, BookOpen } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.products);
  const { recipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900 uppercase tracking-tight">Ciob Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
          >
            Accueil
          </Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
              onMouseEnter={() => { setIsProductsOpen(true); setIsRecipesOpen(false); }}
            >
              Nos produits
              <ChevronDown size={14} className={`transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isProductsOpen && (
              <div 
                className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-lg py-3 mt-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <Link
                  to="/products"
                  className="block px-4 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 border-b border-gray-50 mb-1"
                  onClick={() => setIsProductsOpen(false)}
                >
                  Découvrir tous nos produits
                </Link>
                <div className="max-h-64 overflow-y-auto">
                  {categories.length > 0 ? categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.id}`}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )) : (
                    <p className="px-4 py-2 text-xs text-gray-400">Aucune catégorie</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recipes Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
              onMouseEnter={() => { setIsRecipesOpen(true); setIsProductsOpen(false); }}
            >
              Recettes
              <ChevronDown size={14} className={`transition-transform duration-200 ${isRecipesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isRecipesOpen && (
              <div 
                className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-lg py-3 mt-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setIsRecipesOpen(false)}
              >
                <Link
                  to="/recipes"
                  className="block px-4 py-3 text-sm font-semibold text-rose-600 bg-rose-50/50 hover:bg-rose-50 border-b border-gray-50 mb-1"
                  onClick={() => setIsRecipesOpen(false)}
                >
                  Voir toutes les recettes
                </Link>
                <div className="max-h-64 overflow-y-auto">
                  {categories.length > 0 ? categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/recipes?category=${category.id}`}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-rose-600 transition-colors"
                      onClick={() => setIsRecipesOpen(false)}
                    >
                      {category.name}
                    </Link>
                  )) : (
                    <p className="px-4 py-2 text-xs text-gray-400">Aucune catégorie</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/products"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-2">
              <div className="relative group mr-2">
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                    <UserIcon size={18} />
                  </div>
                  <div className="hidden lg:block text-left mr-2">
                    <p className="text-xs font-bold text-gray-900 leading-none">{user?.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">{user?.is_admin ? 'Administrateur' : 'Client'}</p>
                  </div>
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-sm transition-all active:scale-95"
              >
                S'inscrire
              </Link>
            </div>
          )}

          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-6 space-y-6 animate-in slide-in-from-right duration-300">
          <Link
            to="/"
            className="block text-lg font-semibold text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nos Produits</p>
            <div className="grid grid-cols-1 gap-1 pl-2 border-l-2 border-gray-100">
              <Link
                to="/products"
                className="block py-2 text-sm font-medium text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Tous les produits
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="block py-2 text-sm text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recettes</p>
            <div className="grid grid-cols-1 gap-1 pl-2 border-l-2 border-gray-100">
              <Link
                to="/recipes"
                className="block py-2 text-sm font-medium text-rose-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Toutes les recettes
              </Link>
              {recipes.slice(0, 5).map((recipe) => (
                <Link
                  key={recipe.id}
                  to="/recipes"
                  className="block py-2 text-sm text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {recipe.title || recipe.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="block text-lg font-semibold text-gray-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>

          <div className="pt-6 border-t border-gray-100">
            {token ? (
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200 shadow-sm">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-white border border-red-100 text-sm font-bold text-red-600 shadow-sm transition-all"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 bg-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
