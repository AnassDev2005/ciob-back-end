import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import { Package, Tag, Info } from 'lucide-react';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const { products, loading, error, categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = categoryId 
    ? products.filter(p => p.category_id === parseInt(categoryId) || p.category?.id === parseInt(categoryId))
    : products;

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
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {currentCategory ? currentCategory.name : 'Nos Produits'}
        </h1>
        <p className="text-lg text-gray-600">
          {currentCategory ? currentCategory.description : 'Découvrez notre collection d\'ustensiles de cuisine de haute qualité'}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package size={48} />
                </div>
              )}
              {product.badge && (
                <span className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  {product.badge}
                </span>
              )}
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 mb-2 uppercase">
                <Tag size={12} />
                {product.category?.name || 'Uncategorized'}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1">
                  <Info size={16} />
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-xl">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  );
};

export default Products;
