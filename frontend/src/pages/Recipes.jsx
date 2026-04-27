import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../store/slices/recipeSlice';
import { BookOpen, Clock, Utensils, Info, Filter, X, ChevronRight } from 'lucide-react';

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
      ? (recipe.product?.category_id === parseInt(categoryId))
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
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-rose-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-800"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm border border-rose-400/20">
            <Utensils size={14} />
            Inspiration Culinaire
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            {currentCategory ? `Recettes : ${currentCategory.name}` : 'Secrets de Cuisine'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-rose-100/80 mb-0">
            {currentCategory 
              ? `Découvrez l'art de cuisiner avec nos produits de la gamme ${currentCategory.name}.` 
              : 'Explorez nos recettes traditionnelles et modernes conçues pour tirer le meilleur parti de vos ustensiles TITANIC.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          {/* Categories Filter Bar */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest">
                <Filter size={18} className="text-rose-600" />
                Ustensiles utilisés
              </div>
              <div className="text-xs font-bold text-gray-400">
                {filteredRecipes.length} RECETTES TROUVÉES
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                  !categoryId 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 -translate-y-0.5' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
              >
                Toutes les recettes
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                    categoryId === category.id.toString()
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 -translate-y-0.5'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Query Display */}
          {searchQuery && (
            <div className="mt-8 flex items-center gap-2">
              <span className="text-sm text-gray-500">Résultats pour : </span>
              <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-1.5 rounded-full text-sm font-bold border border-rose-100 group">
                "{searchQuery}"
                <button onClick={clearSearch} className="hover:text-red-500 transition-colors p-0.5">
                  <X size={14} />
                </button>
              </span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 group flex flex-col h-full">
              <div className="aspect-video bg-gray-50 relative overflow-hidden">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-100">
                    <Utensils size={80} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {recipe.preparation_time && (
                    <span className="bg-white/95 backdrop-blur text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                      <Clock size={14} className="text-rose-600" />
                      {recipe.preparation_time} MIN
                    </span>
                  )}
                  <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-xl uppercase tracking-wider">
                    {recipe.product?.category?.name || 'Recette'}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors line-clamp-1">
                  {recipe.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed">
                  {recipe.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                    <BookOpen size={14} className="text-rose-400" />
                    <span>{recipe.steps?.length || 0} étapes</span>
                  </div>
                  <Link 
                    to={`/recipes/${recipe.id}`}
                    className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-800 text-sm font-black transition-all group/btn"
                  >
                    Voir la recette
                    <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRecipes.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl text-gray-300 mb-6">
              <Utensils size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucune recette trouvée</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Essayez de modifier vos filtres ou votre recherche pour découvrir d'autres saveurs.</p>
            <button 
              onClick={() => {
                setSearchParams({});
              }}
              className="px-8 py-3 rounded-xl bg-rose-600 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all transform active:scale-95"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
