import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, clearCurrentRecipe } from '../store/slices/recipeSlice';
import { Clock, Utensils, ArrowLeft, BookOpen, ChefHat, CheckCircle2, ChevronLeft, ChevronRight, Share2, Flame, Heart } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRecipe: recipe, loading, error } = useSelector((state) => state.recipes);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    return () => dispatch(clearCurrentRecipe());
  }, [dispatch, id]);

  const nextImage = () => {
    if (!recipeImages.length) return;
    setActiveImage((prev) => (prev + 1) % recipeImages.length);
  };

  const prevImage = () => {
    if (!recipeImages.length) return;
    setActiveImage((prev) => (prev - 1 + recipeImages.length) % recipeImages.length);
  };

  const recipeImages = recipe?.images && Array.isArray(recipe.images) && recipe.images.length > 0
    ? recipe.images
    : (recipe?.image ? [recipe.image] : []);

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

  if (error || !recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center bg-white">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-rose-50 text-rose-500 mb-8 shadow-xl shadow-rose-100">
          <Utensils size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Recette Introuvable</h2>
        <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">{error || "Cette saveur n'est malheureusement plus disponible à la consultation."}</p>
        <Link to="/recipes" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all shadow-2xl">
          <ArrowLeft size={18} />
          Retour à l'atelier
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFF] min-h-screen pb-40">
      {/* Cinematic Full-Width Header */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-[#1A0B0E]">
        <div className="absolute inset-0 w-full h-full">
          {recipeImages.length > 0 ? (
            <img
              src={recipeImages[activeImage]}
              alt={recipe.title}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
              key={activeImage}
            />
          ) : (
            <div className="w-full h-full bg-[#1A0B0E] flex items-center justify-center text-rose-900/10">
              <Utensils size={200} strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Dynamic Image Selection Interface */}
        {recipeImages.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 sm:px-12 z-20">
            <button
              onClick={prevImage}
              className="p-4 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/30 transition-all transform active:scale-90 border border-white/20"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="p-4 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/30 transition-all transform active:scale-90 border border-white/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Visual Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B0E] via-[#1A0B0E]/20 to-[#1A0B0E]/40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 sm:pb-24">
          <div className="max-w-7xl mx-auto">
            <Link to="/recipes" className="inline-flex items-center gap-3 text-white/50 hover:text-rose-400 font-black text-[10px] uppercase tracking-[0.3em] mb-10 transition-colors group">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-2" />
              L'Atelier Culinaire
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="bg-rose-600 text-white text-[10px] font-black px-5 py-2 rounded-xl uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                <Flame size={14} />
                {recipe.product?.category?.name || 'Recette Signature'}
              </div>
              {recipe.preparation_time && (
                <div className="bg-white/10 backdrop-blur-xl text-white text-[10px] font-black px-5 py-2 rounded-xl flex items-center gap-2 border border-white/10">
                  <Clock size={14} className="text-rose-400" />
                  PREP: {recipe.preparation_time} MIN
                </div>
              )}
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1] tracking-tighter mb-10 max-w-4xl">
              {recipe.title}
            </h1>

            <div className="flex items-center gap-8">
              {/* Gallery Progress */}
              {recipeImages.length > 1 && (
                <div className="flex gap-4">
                  {recipeImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-1 rounded-full transition-all duration-500 ${activeImage === idx ? 'w-12 bg-rose-500' : 'w-4 bg-white/20 hover:bg-white/40'
                        }`}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 ml-auto">
                <button className="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-white border border-white/10 hover:bg-rose-600 transition-all active:scale-95 group">
                  <Heart size={20} className="group-hover:fill-current" />
                </button>
                <button className="bg-white/5 backdrop-blur-md p-4 rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all active:scale-95">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Main Content Area (8/12) */}
          <div className="lg:col-span-8 space-y-24">

            {/* The Story Section */}
            <section className="bg-white rounded-[3.5rem] p-10 sm:p-20 shadow-2xl shadow-[#1A0B0E]/5 border border-gray-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-1 bg-rose-600"></div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">L'Histoire du Plat</h2>
              </div>
              <p className="text-2xl sm:text-3xl text-gray-800 leading-relaxed font-serif italic">
                "{recipe.description}"
              </p>
              <div className="mt-16 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-rose-600">
                  <ChefHat size={32} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Inspiré par</p>
                  <p className="font-bold text-gray-900">Le Savoir-Faire TITANIC</p>
                </div>
              </div>
            </section>

            {/* Ingredients Section */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <section className="bg-rose-50/30 rounded-[3.5rem] p-10 sm:p-20 border border-rose-100/50">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-16 h-1 bg-rose-600"></div>
                  <h2 className="text-xs font-black text-rose-600 uppercase tracking-[0.3em]">Liste des Ingrédients</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {recipe.ingredients.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-rose-200 group-hover:bg-rose-500 transition-colors" />
                      <span className="text-lg text-gray-700 font-medium capitalize">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Preparation Steps */}
            <section className="px-6 sm:px-12">
              <h2 className="text-4xl font-black text-gray-900 mb-16 flex items-center gap-6">
                <BookOpen className="text-rose-600" size={40} />
                La Préparation
              </h2>

              <div className="space-y-12">
                {recipe.steps && recipe.steps.length > 0 ? (
                  recipe.steps.map((step, index) => (
                    <div key={index} className="flex gap-10 group relative">
                      {/* Grid numbering line */}
                      {index !== recipe.steps.length - 1 && (
                        <div className="absolute top-16 left-8 bottom-[-48px] w-0.5 bg-gray-100"></div>
                      )}

                      <div className="shrink-0 w-16 h-16 rounded-3xl bg-white text-gray-900 flex items-center justify-center font-black text-2xl border-4 border-gray-50 shadow-xl group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-100 transition-all duration-500 z-10">
                        {index + 1}
                      </div>
                      <div className="pt-4 flex-grow">
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-16 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Les étapes secrètes arrivent...</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area (4/12) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="sticky top-12 space-y-10">

              {/* Product recommendation */}
              {recipe.product && (
                <div className="bg-[#1A0B0E] rounded-[3rem] p-10 text-white overflow-hidden relative group shadow-2xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-[6rem] -mr-16 -mt-16 group-hover:bg-rose-500/10 transition-colors"></div>

                  <span className="inline-block px-4 py-1.5 rounded-xl bg-rose-600/20 text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    Le secret de la cuisson
                  </span>

                  <div className="mb-10 relative">
                    <h3 className="text-3xl font-black mb-4 leading-tight">{recipe.product.name}</h3>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed">
                      Pour réussir cette recette, la maîtrise thermique est capitale. Notre matériel industriel assure une inertie parfaite.
                    </p>
                  </div>

                  <Link
                    to={`/products/${recipe.product.id}`}
                    className="w-full flex items-center justify-center gap-3 py-5 bg-white text-gray-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-rose-600 hover:text-white transition-all transform active:scale-95 shadow-xl"
                  >
                    <span>Voir l'Ustensile</span>
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                </div>
              )}

              {/* Pro Tips Card */}
              <div className="bg-rose-50/50 rounded-[3rem] p-10 border border-rose-100 relative overflow-hidden">
                <div className="relative">
                  <h3 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[0.3em] flex items-center gap-3">
                    <CheckCircle2 className="text-rose-600" size={16} />
                    Conseils de Brigade
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2"></span>
                      <p className="text-sm text-gray-600 font-bold leading-relaxed italic">
                        "La patience est l'ingrédient principal de tout grand plat marocain."
                      </p>
                    </li>
                    <li className="flex gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2"></span>
                      <p className="text-sm text-gray-600 font-bold leading-relaxed italic">
                        "Nettoyez toujours vos ustensiles TITANIC à l'eau tiede pour préserver le poli miroir."
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Support CTA */}
              <div className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl shadow-gray-200/40 text-center">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">Besoin d'un conseil ?</p>
                <Link to="/contact" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors uppercase text-sm tracking-tighter decoration-2 underline underline-offset-8">
                  Contactez notre service chef
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
