import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Menu, X, LayoutDashboard, LogOut, User as UserIcon, Package, ChevronDown, BookOpen, Search, Star, Hexagon } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const { user, token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

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
    const path = location.pathname === "/recipes" ? "/recipes" : "/products";
    navigate(`${path}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-[100] w-full px-4 py-4 pointer-events-none">
      <div className="mx-auto max-w-7xl h-16 pointer-events-auto">
        <div className="h-full bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center justify-between px-6 lg:px-10 overflow-visible relative">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
                <Hexagon fill="currentColor" size={24} />
              </div>
              <span className="text-xl font-black text-gray-900 uppercase tracking-tighter hidden sm:block">Titanic</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-indigo-600 transition-all">Accueil</Link>
              
              {/* Products Tiered Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-indigo-600 transition-all">
                  Collections
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'products' ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[2rem] p-6 pt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                     <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-6 px-4">Fabrication Industrielle</span>
                     <Link to="/products" className="flex items-center justify-between px-4 py-4 rounded-2xl bg-indigo-50 text-indigo-600 font-bold mb-4 hover:bg-indigo-100 transition-colors">
                        Tout le Catalogue <ArrowRight size={16} />
                     </Link>
                     <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {categories.filter(c => c.type === 'product').map(cat => (
                           <Link key={cat.id} to={`/products?category=${cat.id}`} className="px-4 py-3 text-sm font-bold text-gray-700 rounded-xl hover:bg-gray-50 hover:text-indigo-600 transition-all flex items-center gap-3 capitalize group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/item:bg-indigo-500 transition-colors" />
                              {cat.name}
                           </Link>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              {/* Recipes Tiered Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('recipes')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-rose-600 transition-all">
                  L'Atelier
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'recipes' ? 'rotate-180 text-rose-600' : ''}`} />
                </button>
                {activeDropdown === 'recipes' && (
                  <div className="absolute top-full left-0 w-80 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-[2rem] p-6 pt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                     <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-6 px-4">Recettes & Secrets</span>
                     <Link to="/recipes" className="flex items-center justify-between px-4 py-4 rounded-2xl bg-rose-50 text-rose-600 font-bold mb-4 hover:bg-rose-100 transition-colors">
                        Voir les Créations <BookOpen size={16} />
                     </Link>
                     <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {categories.filter(c => c.type === 'recipe').map(cat => (
                           <Link key={cat.id} to={`/recipes?category=${cat.id}`} className="px-4 py-3 text-sm font-bold text-gray-700 rounded-xl hover:bg-gray-50 hover:text-rose-600 transition-all flex items-center gap-3 capitalize group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/item:bg-rose-500 transition-colors" />
                              {cat.name}
                           </Link>
                        ))}
                     </div>
                  </div>
                )}
              </div>

              <Link to="/contact" className="px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:text-indigo-600 transition-all">Contact</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
             {/* Smart Search */}
             <form onSubmit={handleSearch} className="hidden lg:flex items-center relative group">
                <input 
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-gray-50 border-2 border-transparent w-40 focus:w-80 rounded-2xl py-2 pl-10 pr-4 text-sm font-bold text-gray-700 focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={16} className="absolute left-3.5 text-gray-400 group-focus-within:text-indigo-600" />
             </form>

             <div className="h-6 w-px bg-gray-100 mx-2 hidden md:block"></div>

             {token ? (
                <div className="relative group">
                   <button className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-gray-50 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                         <UserIcon size={18} />
                      </div>
                      <div className="hidden xl:block text-left pr-2">
                         <p className="text-[10px] font-black text-gray-900 leading-none uppercase tracking-tighter">{user?.name?.split(' ')[0]}</p>
                         <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-widest leading-none">{user?.is_admin ? 'Admin' : 'VIP'}</p>
                      </div>
                   </button>
                   
                   {/* Profile Dropdown */}
                   <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200 z-[110]">
                      <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <UserIcon size={16} /> Mon Compte
                      </Link>
                      {user?.is_admin && (
                         <Link to="/admin" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <LayoutDashboard size={16} /> Admin Panel
                         </Link>
                      )}
                      <div className="h-px bg-gray-50 my-2 mx-5"></div>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-5 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left uppercase tracking-widest text-[10px]">
                        <LogOut size={16} /> Déconnexion
                      </button>
                   </div>
                </div>
             ) : (
                <div className="hidden md:flex items-center gap-2">
                   <Link to="/login" className="px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-all">Connexion</Link>
                   <Link to="/register" className="h-10 px-6 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 flex items-center hover:bg-indigo-500 transition-all active:scale-95">S'inscrire</Link>
                </div>
             )}

             <button 
                className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-50 bg-white/95 backdrop-blur-2xl md:hidden overflow-y-auto animate-in slide-in-from-right duration-500 pointer-events-auto">
           <div className="px-6 py-10 space-y-12 max-w-lg mx-auto">
              {/* Search in Mobile */}
              <form onSubmit={handleSearch} className="relative group">
                <input 
                  type="text"
                  placeholder="Ex: Marmite inox..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4.5 pl-12 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              </form>

              {/* Main Links */}
              <nav className="space-y-6">
                 <Link to="/" className="flex items-center justify-between text-2xl font-black text-gray-900 group">
                    Accueil <ChevronRight size={24} className="text-gray-200 group-hover:text-indigo-500" />
                 </Link>
                 
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Collections</p>
                    <div className="grid grid-cols-1 gap-4">
                       <Link to="/products" className="text-lg font-bold text-indigo-600 flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-500" /> Tout explorer
                       </Link>
                    </div>
                 </div>

                 <div className="space-y-4 pt-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">L'Atelier</p>
                    <div className="grid grid-cols-1 gap-4">
                       <Link to="/recipes" className="text-lg font-bold text-rose-600 flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-rose-500" /> Recettes Chef
                       </Link>
                    </div>
                 </div>

                 <Link to="/contact" className="flex items-center justify-between text-2xl font-black text-gray-900 group border-t border-gray-50 pt-8 mt-8">
                    Contact <ChevronRight size={24} className="text-gray-200 group-hover:text-indigo-500" />
                 </Link>
              </nav>

              {/* Account Section Mobile */}
              <div className="pt-10 border-t border-gray-100">
                 {token ? (
                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem]"></div>
                       <div className="flex items-center gap-4 mb-8">
                           <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                              <UserIcon size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Bienvenue</p>
                              <p className="text-xl font-bold">{user?.name}</p>
                           </div>
                       </div>
                       <div className="grid grid-cols-1 gap-3">
                          <Link to="/profile" className="w-full py-4 bg-white/10 hover:bg-white/20 text-center font-bold rounded-2xl transition-all">Profil</Link>
                          {user?.is_admin && <Link to="/admin" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-center font-bold rounded-2xl transition-all">Admin Dashboard</Link>}
                          <button onClick={handleLogout} className="w-full py-4 text-rose-400 font-bold uppercase tracking-widest text-xs mt-4">Déconnexion</button>
                       </div>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 gap-4">
                       <Link to="/login" className="w-full py-5 bg-gray-50 text-gray-900 font-black text-center text-sm uppercase tracking-widest rounded-[1.5rem]">Connexion</Link>
                       <Link to="/register" className="w-full py-5 bg-indigo-600 text-white font-black text-center text-sm uppercase tracking-widest rounded-[1.5rem] shadow-2xl shadow-indigo-100">S'inscrire</Link>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </header>
  );
}

// Sub-component for arrow icon in the menu
const ArrowRight = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ChevronRight = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
