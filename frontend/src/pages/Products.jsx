import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import { Package, Tag, Info, Filter, X } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {currentCategory ? currentCategory.name : 'Nos Produits'}
          </h1>
          <p className="text-lg text-gray-600">
            {currentCategory ? currentCategory.description : 'Découvrez notre collection d\'ustensiles de cuisine de haute qualité'}
          </p>
        </div>

        {/* Categories Filter Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
            <Filter size={16} />
            Filtrer par catégorie
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                !categoryId 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  categoryId === category.id.toString()
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
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
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold border border-indigo-100">
              "{searchQuery}"
              <button onClick={clearSearch} className="hover:text-indigo-900 transition-colors">
                <X size={14} />
              </button>
            </span>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package size={48} />
                </div>
              )}
              {product.badge && (
                <span className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 mb-2 uppercase">
                <Tag size={12} />
                {product.category?.name || 'Uncategorized'}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center gap-1 transition-colors">
                  <Info size={16} />
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-xl font-bold text-gray-400">Aucun produit trouvé</p>
          <button 
            onClick={() => {
              setSearchParams({});
            }}
            className="mt-4 text-indigo-600 font-bold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
