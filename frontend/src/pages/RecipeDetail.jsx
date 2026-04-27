import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, clearCurrentRecipe } from '../store/slices/recipeSlice';
import { Clock, Utensils, ArrowLeft, BookOpen, ChefHat, CheckCircle2 } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRecipe: recipe, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    return () => dispatch(clearCurrentRecipe());
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recette non trouvée</h2>
        <p className="text-gray-600 mb-8">{error || "La recette que vous recherchez n'existe pas."}</p>
        <Link to="/recipes" className="inline-flex items-center gap-2 text-rose-600 font-bold hover:underline">
          <ArrowLeft size={20} />
          Retour aux recettes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Recipe Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-200">
            <Utensils size={120} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/recipes" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 transition-colors group">
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              Retour aux recettes
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-xl">
                {recipe.product?.category?.name || 'Gastronomie'}
              </span>
              {recipe.preparation_time && (
                <span className="bg-white/20 backdrop-blur text-white text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 border border-white/20">
                  <Clock size={14} />
                  {recipe.preparation_time} MIN
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
              {recipe.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ChefHat className="text-rose-600" size={32} />
                L'histoire du plat
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed italic">
                {recipe.description}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <BookOpen className="text-rose-600" size={32} />
                Préparation pas à pas
              </h2>
              <div className="space-y-8">
                {recipe.steps && recipe.steps.length > 0 ? (
                  recipe.steps.map((step, index) => (
                    <div key={index} className="flex gap-6 group">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-xl border border-rose-100 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                        {index + 1}
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed">
                    Les étapes détaillées arrivent bientôt...
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Product Card */}
              {recipe.product && (
                <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] -mr-10 -mt-10"></div>
                  <h3 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em] mb-4">L'ustensile idéal</h3>
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-2">{recipe.product.name}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Utilisez cet ustensile TITANIC pour une cuisson parfaite et homogène.
                    </p>
                  </div>
                  <Link 
                    to={`/products/${recipe.product.id}`}
                    className="w-full inline-flex items-center justify-center py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-rose-500 hover:text-white transition-all transform active:scale-95"
                  >
                    Voir l'ustensile
                  </Link>
                </div>
              )}

              {/* Tips/Info */}
              <div className="bg-rose-50 rounded-[2.5rem] p-8 border border-rose-100">
                <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Conseils du chef</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="text-rose-600 shrink-0 mt-0.5" size={18} />
                    Respectez scrupuleusement les temps de chauffe.
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="text-rose-600 shrink-0 mt-0.5" size={18} />
                    Privilégiez des produits frais du terroir.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
