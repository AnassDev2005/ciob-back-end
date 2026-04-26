import { MapPin, Phone, MessageCircle, Package, Globe, Camera, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">Restons Connectés</h3>
              <p className="text-gray-600 mt-1">Suivez nos actualités et découvrez nos nouveaux produits sur les réseaux sociaux.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300">
                  <Globe size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#E4405F] group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white transition-all duration-300">
                  <Camera size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">Instagram</span>
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white transition-all duration-300">
                  <Play size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">YouTube</span>
              </a>
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                  <MessageCircle size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-6 w-6 text-indigo-400" />
                <span className="text-lg font-bold">Ciob Store</span>
              </div>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                L'excellence de la cuisson industrielle au service du Maroc. Fabrique des
                ustensiles de cuisine haut de gamme depuis 1991.
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-4">Navigation</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Nos produits
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-4">Support</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Service Client
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-4">Contact</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  Fes, Maroc — Zone industrielle
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0" />
                  +212 535 729 168
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 CIOB STORE — Leader de la Cuisson Industrielle</p>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
