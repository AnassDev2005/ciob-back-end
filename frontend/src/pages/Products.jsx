import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import { Package, Tag, Info, Filter, X, ChevronRight } from 'lucide-react';

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
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-800"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm border border-indigo-400/20">
            <Package size={14} />
            Catalogue Professionnel
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            {currentCategory ? currentCategory.name : 'Nos Collections'}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-indigo-100/80 mb-0">
            {currentCategory 
              ? currentCategory.description 
              : 'Découvrez notre gamme complète d\'ustensiles de cuisine haute performance pour les professionnels et les passionnés.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          {/* Categories Filter Bar */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest">
                <Filter size={18} className="text-indigo-600" />
                Filtrer par catégorie
              </div>
              <div className="text-xs font-bold text-gray-400">
                {filteredProducts.length} PRODUITS TROUVÉS
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                  !categoryId 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 -translate-y-0.5' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
                }`}
              >
                Tous les produits
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${
                    categoryId === category.id.toString()
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 -translate-y-0.5'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
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
              <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-100 group">
                "{searchQuery}"
                <button onClick={clearSearch} className="hover:text-red-500 transition-colors p-0.5">
                  <X size={14} />
                </button>
              </span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Package size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase shadow-lg tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-600 mb-3 uppercase tracking-widest">
                  <Tag size={12} />
                  {product.category?.name || 'Général'}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-50">
                  <Link 
                    to={`/products/${product.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gray-50 text-gray-900 text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95 group/btn"
                  >
                    Voir les détails
                    <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl text-gray-300 mb-6">
              <Package size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Nous n'avons trouvé aucun résultat correspondant à vos critères de recherche.</p>
            <button 
              onClick={() => {
                setSearchParams({});
              }}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-95"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
