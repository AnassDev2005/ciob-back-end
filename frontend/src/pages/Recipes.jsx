import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchRecipes } from '../store/slices/recipeSlice';
import { BookOpen, Clock, Utensils, Info, Filter, X } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {currentCategory ? `Recettes : ${currentCategory.name}` : 'Nos Recettes'}
          </h1>
          <p className="text-lg text-gray-600">
            {currentCategory ? `Découvrez nos recettes utilisant nos produits ${currentCategory.name}` : 'Inspirez-vous avec nos délicieuses recettes traditionnelles'}
          </p>
        </div>

        {/* Categories Filter Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
            <Filter size={16} />
            Ustensiles utilisés
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                !categoryId 
                  ? 'bg-rose-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
              }`}
            >
              Toutes
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  categoryId === category.id.toString()
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Query Display */}
        {searchQuery && (
          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-gray-500">Résultats pour : </span>
            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-bold border border-rose-100">
              "{searchQuery}"
              <button onClick={clearSearch} className="hover:text-rose-900 transition-colors">
                <X size={14} />
              </button>
            </span>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-rose-200">
                  <Utensils size={64} />
                </div>
              )}
              <div className="absolute bottom-3 left-3 flex gap-2">
                {recipe.preparation_time && (
                  <span className="bg-white/90 backdrop-blur text-gray-900 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Clock size={12} className="text-rose-600" />
                    {recipe.preparation_time} min
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                {recipe.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-6 h-15">
                {recipe.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <BookOpen size={14} />
                  <span>{recipe.steps?.length || 0} étapes</span>
                </div>
                <button className="text-rose-600 hover:text-rose-800 text-sm font-bold flex items-center gap-1 transition-colors">
                  Voir la recette
                  <Info size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <Utensils className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-xl font-bold text-gray-400">Aucune recette trouvée</p>
          <button 
            onClick={() => {
              setSearchParams({});
            }}
            className="mt-4 text-rose-600 font-bold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
