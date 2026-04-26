import { Link } from 'react-router-dom';
import { ChevronRight, Package, Utensils, Award, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 mix-blend-multiply"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            L'excellence Culinaire à <span className="text-indigo-400">Votre Portée</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10">
            Découvrez notre sélection exclusive d'ustensiles de cuisine professionnels et de recettes traditionnelles pour sublimer vos créations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all transform hover:-translate-y-1"
            >
              Voir nos produits
              <ChevronRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/recipes"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-700 text-base font-bold rounded-xl text-white bg-gray-800 hover:bg-gray-700 shadow-lg transition-all transform hover:-translate-y-1"
            >
              Explorer les recettes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Pourquoi choisir Ciob Store ?</h2>
            <div className="mt-4 h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Qualité Supérieure</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos produits sont fabriqués avec les meilleurs matériaux pour garantir une durabilité exceptionnelle.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-rose-100 text-rose-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Garantie & Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Tous nos ustensiles bénéficient d'une garantie constructeur et d'un service client réactif.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Livraison Rapide</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous expédions vos commandes dans les plus brefs délais partout au Maroc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900">Nos Univers</h2>
              <p className="text-gray-600 mt-2">Explorez nos deux grandes catégories</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/products" className="group relative overflow-hidden rounded-3xl bg-indigo-600 h-80 shadow-2xl transition-transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-indigo-900 opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <Package size={48} className="mb-4" />
                <h3 className="text-3xl font-extrabold mb-2">Nos Produits</h3>
                <p className="text-indigo-100 mb-4">Ustensiles de cuisine haute performance pour les passionnés.</p>
                <div className="inline-flex items-center font-bold">
                  Voir tout le catalogue <ChevronRight size={20} className="ml-1" />
                </div>
              </div>
            </Link>

            <Link to="/recipes" className="group relative overflow-hidden rounded-3xl bg-rose-600 h-80 shadow-2xl transition-transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-rose-900 opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <Utensils size={48} className="mb-4" />
                <h3 className="text-3xl font-extrabold mb-2">Nos Recettes</h3>
                <p className="text-rose-100 mb-4">Découvrez des saveurs authentiques et apprenez nos secrets.</p>
                <div className="inline-flex items-center font-bold">
                  Découvrir les recettes <ChevronRight size={20} className="ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
