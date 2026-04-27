import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Menu, X, LogIn, LayoutDashboard, LogOut, User as UserIcon, Package, ChevronDown, BookOpen, Search } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const { user, token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.products);
  const { recipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    // Determine where to go based on current path
    if (location.pathname === "/recipes") {
      navigate(`/recipes?${params.toString()}`);
    } else {
      // Default to products for search
      navigate(`/products?${params.toString()}`);
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Package className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900 uppercase tracking-tight hidden sm:block">Ciob Store</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex relative w-64 xl:w-80 group">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full bg-gray-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all group-hover:bg-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600" />
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
          >
            Accueil
          </Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
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
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
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
            to="/contact"
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors rounded-md hover:bg-gray-50"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile Search Icon (visible on tablets/mobile) */}
          <form onSubmit={handleSearch} className="md:hidden lg:hidden flex relative group mx-2">
             <input
              type="text"
              placeholder="Chercher..."
              className="bg-gray-100 border-none rounded-lg py-1.5 pl-8 pr-2 text-xs w-24 focus:w-40 focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
          </form>

          {token ? (
            <div className="flex items-center gap-1">
              <div className="relative group mr-1">
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200 shadow-sm">
                    <UserIcon size={16} />
                  </div>
                  <div className="hidden xl:block text-left mr-1">
                    <p className="text-[10px] font-bold text-gray-900 leading-none">{user?.name}</p>
                    <p className="text-[8px] text-gray-500 mt-1 uppercase font-semibold">{user?.is_admin ? 'Admin' : 'Client'}</p>
                  </div>
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Déconnexion"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-2 text-xs font-bold text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm transition-all active:scale-95"
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
          {/* Mobile Search in Menu */}
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
          </form>

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
            to="/contact"
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
