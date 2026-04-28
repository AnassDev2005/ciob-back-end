import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct } from '../store/slices/productSlice';
import { Package, Tag, ArrowLeft, ShieldCheck, Truck, Clock, Utensils, Star, Shield, Zap, ChevronRight } from 'lucide-react';

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
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-50 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center bg-white">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-rose-50 text-rose-500 mb-8 shadow-xl shadow-rose-100">
          <Package size={40} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Produit introuvable</h2>
        <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">{error || "Cet item n'est plus dans notre catalogue actif."}</p>
        <Link to="/products" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl">
          <ArrowLeft size={18} />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFF] min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        {/* Breadcrumb / Back Link */}
        <Link to="/products" className="inline-flex items-center gap-3 text-gray-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-12 transition-colors group">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Retour aux collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Advanced Media Gallery */}
          <div className="space-y-8 sticky top-24">
            <div className="relative group aspect-[4/5] bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-indigo-100/30">
              {productImages.length > 0 ? (
                <img
                  src={productImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-out"
                  key={activeImage}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <Package size={140} strokeWidth={1} />
                </div>
              )}

              {/* Status Badge */}
              {product.badge && (
                <div className="absolute top-10 left-10">
                  <span className="bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 shadow-2xl border border-white">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {productImages.length > 1 && (
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 rounded-3xl overflow-hidden border-4 transition-all duration-500 ${activeImage === idx
                      ? 'border-indigo-600 scale-110 shadow-2xl shadow-indigo-100'
                      : 'border-white hover:border-gray-200 opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Immersive Product Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em]">
                <Tag size={12} />
                {product.category?.name || 'Item Premium'}
              </div>

              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-1 text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <span className="ml-2 text-gray-400 font-bold text-xs uppercase tracking-widest">(Avis Vérifiés)</span>
              </div>
            </div>

            <div className="prose prose-indigo max-w-none">
              <p className="text-xl text-gray-500 leading-relaxed font-medium italic">
                "{product.description}"
              </p>
            </div>

            {/* Technical Specs: Diameter & Characteristics */}
            {(product.diameter || (product.characteristics && product.characteristics.length > 0)) && (
              <div className="bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-8 sm:p-10 space-y-10">
                {product.diameter && (
                  <div className="flex items-center justify-between border-b border-gray-200 pb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Dimensions</span>
                    <span className="text-2xl font-black text-gray-900">{product.diameter} <small className="text-gray-400">cm</small></span>
                  </div>
                )}

                {product.characteristics && product.characteristics.length > 0 && (
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Points Forts</span>
                    <div className="flex flex-wrap gap-3">
                      {product.characteristics.map((char, i) => (
                        <div key={i} className="px-5 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Premium Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">Qualité TITANIC</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">Conception Industrielle</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Truck size={28} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">Livraison Pro</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">Expédition Prioritaire</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">Inox Renforcé</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">Matériaux Certifiés</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-indigo-900 text-white shadow-2xl shadow-indigo-200 group hover:bg-indigo-800 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Shield size={28} className="text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-tight">Garantie 5 Ans</h3>
                  <p className="text-xs text-indigo-300 font-bold mt-1">Sérénité Totale</p>
                </div>
              </div>
            </div>

            {/* High-Impact CTA */}
            <div className="pt-8">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-3 px-12 py-6 rounded-[2rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-95 group overflow-hidden relative"
              >
                <span className="relative z-10">Obtenir une Offre Personnalisée</span>
                <ChevronRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Link>
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6 italic">
                Réponse garantie par nos experts sous 24 heures ouvrées
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
