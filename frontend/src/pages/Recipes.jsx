import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../store/slices/recipeSlice';
import { BookOpen, Clock, Utensils, Filter, X, ChevronRight, Search, ChefHat, Heart } from 'lucide-react';

const Recipes = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleCategoryChange = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('category', id);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = categoryId
      ? (recipe.category_id === parseInt(categoryId) || recipe.category?.id === parseInt(categoryId))
      : true;

    const matchesSearch = searchQuery
      ? (recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesCategory && matchesSearch;
  });

  const currentCategory = categoryId
    ? categories.find(c => c.id === parseInt(categoryId))
    : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-rose-50 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FDFDFF] min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#1A0B0E]">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-rose-200/80 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
            <ChefHat size={14} className="text-rose-400" />
            Atelier Culinaire
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6">
            {currentCategory ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-200">
                L'Art du {currentCategory.name}
              </span>
            ) : 'Secrets de Cuisine'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-medium leading-relaxed">
            {currentCategory 
              ? `Découvrez comment sublimer vos plats avec notre gamme ${currentCategory.name}.` 
              : 'Explorez nos inspirations gourmandes conçues pour révéler tout le potentiel de voutre matériel de cuisine professionnel.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto width-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-32">
        
        {/* Floating Filter Bar */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white p-4 sm:p-6 rounded-[2.5rem] shadow-2xl shadow-rose-100/50 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${!categoryId
                    ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 scale-105'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'
                  }`}
              >
                Inspirations
              </button>
              {categories.filter(c => c.type === 'recipe').map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${categoryId === category.id.toString()
                      ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 scale-105'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Results Feedback */}
            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-6 lg:pt-0 border-gray-100">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Découvertes</span>
                  <span className="text-xl font-black text-gray-900">{filteredRecipes.length} <span className="text-sm font-bold text-gray-400">Recettes</span></span>
               </div>
               {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-100 transition-colors"
                  >
                    "{searchQuery}" <X size={14} />
                  </button>
               )}
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredRecipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              to={`/recipes/${recipe.id}`}
              className="group bg-white rounded-[3rem] border border-gray-100 overflow-hidden hover:shadow-[0_32px_80px_-20px_rgba(244,63,94,0.15)] transition-all duration-500 flex flex-col h-full"
            >
              {/* Media Section */}
              <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-100/50">
                    <Utensils size={80} strokeWidth={1} />
                  </div>
                )}
                
                {/* Floating Meta Data */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                   <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border border-white/50">
                      <Clock size={14} className="text-rose-600" />
                      <span className="text-[10px] font-black text-gray-900 uppercase">
                        {recipe.preparation_time || 30} MIN
                      </span>
                   </div>
                </div>

                <div className="absolute top-6 right-6">
                   <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <Heart size={18} />
                   </button>
                </div>

                {/* Linear gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0E]/80 via-[#1A0B0E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-8 left-8 right-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest">
                      <BookOpen size={14} className="text-rose-400" />
                      <span>{recipe.steps?.length || 5} Étapes à suivre</span>
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-10 flex flex-col flex-grow">
                <div className="mb-4">
                   <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.25em]">
                      {recipe.product?.category?.name || 'Gastronomie'}
                   </span>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-rose-600 transition-colors leading-tight">
                  {recipe.title}
                </h3>
                
                <p className="text-gray-500 text-sm font-medium line-clamp-3 mb-10 leading-relaxed">
                  {recipe.description}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between group/action">
                   <span className="text-xs font-black uppercase text-gray-400 tracking-widest group-hover:text-gray-900 transition-colors">Découvrir</span>
                   <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-rose-200">
                      <ChevronRight size={20} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-40 bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-rose-50 text-rose-200 mb-8 shadow-xl shadow-rose-100/20">
              <Search size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Cuisine Calme</h2>
            <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">Nous n'avons pas trouvé de recettes pour cette sélection. Inspirez-vous avec d'autres catégories.</p>
            <button
              onClick={() => setSearchParams({})}
              className="px-10 py-4 rounded-[1.5rem] bg-rose-600 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-rose-100 hover:bg-rose-700 transition-all active:scale-95"
            >
              Voir tout l'Atelier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
