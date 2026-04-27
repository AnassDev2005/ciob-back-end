import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import { Package, Tag, Filter, X, ChevronRight, Search, Sparkles } from 'lucide-react';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const { products, loading, error, categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
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

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryId
      ? (product.category_id === parseInt(categoryId) || product.category?.id === parseInt(categoryId))
      : true;

    const matchesSearch = searchQuery
      ? (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <div className="w-16 h-16 border-4 border-indigo-50 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FDFDFF] min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
            <Package size={14} className="text-indigo-400" />
            Catalogue Premium
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6">
            {currentCategory ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-100 italic">
                {currentCategory.name}
              </span>
            ) : 'Nos Collections'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-medium leading-relaxed">
            {currentCategory?.description || 'Découvrez l\'excellence industrielle au service de votre cuisine. Des outils forgés pour la performance et la durabilité.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto width-full px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-32">
        
        {/* Glass Filter Bar */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white p-4 sm:p-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${!categoryId
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'
                  }`}
              >
                Tout voir
              </button>
              {categories.filter(c => c.type === 'product').map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${categoryId === category.id.toString()
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Stats / Search Display */}
            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-6 lg:pt-0 border-gray-100">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Résultats</span>
                  <span className="text-xl font-black text-gray-900">{filteredProducts.length} <span className="text-sm font-bold text-gray-400">Items</span></span>
               </div>
               {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-colors"
                  >
                    Effacer: "{searchQuery}" <X size={14} />
                  </button>
               )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`}
              className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(79,70,229,0.12)] transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] bg-gray-50 relative overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200 bg-gray-50/50">
                    <Package size={80} strokeWidth={1} />
                  </div>
                )}
                
                {/* Overlay details on hover */}
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="bg-white/95 backdrop-blur px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-indigo-600 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Explorer l'item
                   </div>
                </div>

                {product.badge && (
                  <div className="absolute top-6 left-6">
                    <span className="bg-white text-gray-900 text-[10px] font-black px-4 py-2 rounded-xl uppercase shadow-2xl tracking-[0.1em] border border-gray-100 flex items-center gap-2">
                       <Sparkles size={12} className="text-indigo-600" />
                       {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Info Container */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 mb-4 uppercase tracking-[0.2em]">
                  <Tag size={12} />
                  {product.category?.name || 'Incontournable'}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-8 leading-relaxed italic">
                  {product.description}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between group/bot">
                   <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Voir Détails</span>
                   <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <ChevronRight size={20} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-indigo-50 text-indigo-200 mb-8 border border-white shadow-xl shadow-indigo-100/20">
              <Search size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Aventure Inconnue</h2>
            <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">Aucun résultat pour cette recherche. Explorez d'autres catégories pour trouver votre bonheur.</p>
            <button
              onClick={() => setSearchParams({})}
              className="px-10 py-4 rounded-[1.5rem] bg-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
