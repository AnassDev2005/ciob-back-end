import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { ChevronRight, Package, Utensils, Award, ShieldCheck, Truck, ArrowRight, Star, ChevronLeft, Tag } from 'lucide-react';

const ProductSlider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !products.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products, isPaused]);

  if (!products.length) return null;

  return (
    <div 
      className="relative group h-[500px] w-full overflow-hidden rounded-[3rem] bg-gray-900 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-105 translate-x-12 pointer-events-none'
            }`}
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
               {product.image ? (
                 <img
                   src={product.image}
                   alt={product.name}
                   className="h-full w-full object-cover"
                 />
               ) : (
                 <div className="h-full w-full bg-indigo-900 flex items-center justify-center opacity-40">
                    <Package size={100} strokeWidth={1} className="text-white" />
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-center px-12 sm:px-20 max-w-2xl">
               <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">
                  <Tag size={12} />
                  {product.category?.name || 'Must-Have Items'}
               </div>
               <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                  {product.name}
               </h3>
               <p className="text-gray-300 text-lg font-medium leading-relaxed mb-10 line-clamp-2">
                  {product.description}
               </p>
               <div>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-gray-900 transition-all shadow-xl"
                  >
                    Découvrir l'Item <ArrowRight size={18} />
                  </Link>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-12 flex items-center gap-4 z-20">
         <div className="flex gap-2 mr-6">
            {products.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                   currentIndex === idx ? 'w-10 bg-indigo-500' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
         </div>
         <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-indigo-600 transition-all"
         >
            <ChevronLeft size={20} />
         </button>
         <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-indigo-600 transition-all"
         >
            <ChevronRight size={20} />
         </button>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Featured products for the slider (e.g., first 5 or products with a badge)
  const featuredProducts = products.length > 0 ? products.slice(0, 5) : [];

  return (
    <div className="flex flex-col bg-[#FDFDFF]">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden">
        {/* Advanced Background Layers */}
        <div className="absolute inset-0 z-0">
          {/* Main Gradient Surface */}
          <div className="absolute inset-0 bg-[#0F172A]"></div>
          
          {/* Animated Mesh / Blobs */}
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px]"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F172A_100%)] opacity-80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                <Star size={12} className="text-indigo-400" />
                L'Art de la Cuisine Pro
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
                L'Excellence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-500 animate-gradient-x">
                  Culinaire
                </span>
              </h1>
              
              <p className="max-w-xl text-lg sm:text-xl text-gray-400 font-medium leading-relaxed mb-12">
                Équipez votre passion avec les outils des plus grands chefs. 
                Découvrez notre collection TITANIC et nos secrets de gastronomie marocaine.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all transform active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Voir le Catalogue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                
                <Link
                  to="/recipes"
                  className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  Nos Recettes
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex items-center gap-8 grayscale opacity-40">
                <div className="text-white text-xs font-black uppercase tracking-[0.2em]">Partner of fine cuisine</div>
                <div className="h-px w-12 bg-white/20"></div>
                <div className="text-white text-xs font-black uppercase tracking-[0.2em]">Fès • Maroc</div>
              </div>
            </div>

            {/* Right: Abstract Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                 {/* Floating Glass Panels */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[450px] bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl rotate-[15deg] -ml-20"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[450px] bg-indigo-500/10 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl -rotate-[10deg] ml-20 mt-10"></div>
                 
                 {/* Featured Iconic Item Representation */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[3rem] shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
                       <Utensils size={100} className="text-white/20" />
                       <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl">
                          <Package size={32} className="text-indigo-600" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Slider Section */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">Sélection Exclusive</span>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">Nos Incontournables</h2>
              </div>
              <Link to="/products" className="group flex items-center gap-3 font-black text-sm uppercase tracking-widest text-indigo-600">
                Parcourir tout <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* The Slider Component */}
            {featuredProducts.length > 0 ? (
                <ProductSlider products={featuredProducts} />
            ) : (
                <div className="h-[400px] w-full rounded-[3rem] bg-gray-50 animate-pulse flex items-center justify-center text-gray-300">
                   Chargement des produits...
                </div>
            )}
         </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">Pourquoi Choisir TITANIC ?</h2>
            <p className="text-gray-500 text-lg font-medium">L'héritage d'un savoir-faire industriel d'exception.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-[2rem] bg-white text-indigo-600 mb-8 transform group-hover:rotate-6 transition-transform shadow-xl shadow-indigo-100/50">
                <Award size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Qualité Militaire</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Conçus pour résister aux environnements les plus exigeants, nos ustensiles durent toute une vie.
              </p>
            </div>

            <div className="group text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-[2rem] bg-white text-rose-600 mb-8 transform group-hover:-rotate-6 transition-transform shadow-xl shadow-rose-100/50">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Certifié CE</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Chaque produit subit des tests de sécurité rigoureux pour garantir une hygiène alimentaire parfaite.
              </p>
            </div>

            <div className="group text-center">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-[2rem] bg-white text-emerald-600 mb-8 transform group-hover:rotate-6 transition-transform shadow-xl shadow-emerald-100/50">
                <Truck size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Logistique Dédiée</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                Nous maîtrisons notre chaîne de livraison pour vous servir rapidement sur tout le territoire national.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] -mr-96 -mt-96"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">Découvrez nos univers</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">Prêt à Transformer <br />Votre Cuisine ?</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link to="/products" className="group relative overflow-hidden rounded-[3rem] bg-[#0F172A] aspect-[16/10] shadow-2xl">
              <div className="absolute inset-0 bg-indigo-600 h-full w-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute inset-x-0 bottom-0 p-12 text-white transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-6">
                  <Package size={28} />
                </div>
                <h3 className="text-4xl font-extrabold mb-4">Produits Pro</h3>
                <p className="text-gray-400 font-medium max-w-sm">Explorez notre gamme complète d'ustensiles de cuisson haut de gamme.</p>
              </div>
            </Link>

            <Link to="/recipes" className="group relative overflow-hidden rounded-[3rem] bg-[#0F172A] aspect-[16/10] shadow-2xl">
              <div className="absolute inset-0 bg-rose-600 h-full w-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute inset-x-0 bottom-0 p-12 text-white transform group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-6">
                  <Utensils size={28} />
                </div>
                <h3 className="text-4xl font-extrabold mb-4">Savoureuses Recettes</h3>
                <p className="text-gray-400 font-medium max-w-sm">Inspirez - vous avec les plats préférés de nos chefs partenaires.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
