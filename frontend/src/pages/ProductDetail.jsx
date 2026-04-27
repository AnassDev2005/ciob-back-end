import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct } from '../store/slices/productSlice';
import { Package, Tag, ArrowLeft, ShieldCheck, Truck, Clock, Utensils } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct: product, loading, error } = useSelector((state) => state.products);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, id]);

  const productImages = product?.images && product.images.length > 0
    ? product.images
    : (product?.image ? [product.image] : []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h2>
        <p className="text-gray-600 mb-8">{error || "Le produit que vous recherchez n'existe pas."}</p>
        <Link to="/products" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
          <ArrowLeft size={20} />
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium mb-8 transition-colors group">
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Gallery */}
          <div className="flex flex-col gap-6">
            <div className="relative group aspect-square bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/50">
              {productImages.length > 0 ? (
                <img
                  src={productImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"
                  key={activeImage}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package size={120} />
                </div>
              )}

              {product.badge && (
                <span className="absolute top-8 left-8 bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl uppercase tracking-widest z-10">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex flex-wrap gap-4 px-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all ${activeImage === idx
                        ? 'border-indigo-600 scale-105 shadow-lg shadow-indigo-100'
                        : 'border-transparent hover:border-gray-200 grayscale hover:grayscale-0'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-600 mb-4 uppercase tracking-[0.2em]">
              <Tag size={14} />
              {product.category?.name || 'Général'}
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Garantie Qualité TITANIC</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Produit fabriqué selon les normes industrielles les plus strictes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Livraison Professionnelle</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Expédition sécurisée partout au Maroc sous 48-72h.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="flex-grow inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-95"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details / Features Section could be added here */}
      </div>
    </div>
  );
};

export default ProductDetail;
