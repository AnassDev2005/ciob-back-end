import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ciobLogo from "../assets/Logo/logo ciob.jpg";

// Social Icon Components
const Facebook = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 2.78 2.78 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">Restons Connectés</h3>
              <p className="text-gray-600 mt-1">
                Suivez nos actualités et découvrez nos nouveaux produits sur les réseaux sociaux.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://www.facebook.com/TitanicProductionMaroc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300">
                  <Facebook size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/titanic_maroc?igsh=MXNmb2hzYXM0bnU0Zg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#E4405F] group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white transition-all duration-300">
                  <Instagram size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">Instagram</span>
              </a>
              <a 
                href="https://www.youtube.com/@titanicmaroc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="h-14 w-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#FF0000] group-hover:bg-[#FF0000] group-hover:text-white transition-all duration-300">
                  <Youtube size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">YouTube</span>
              </a>
              <a 
                href="https://wa.me/212535729168" 
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
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={ciobLogo} alt="Ciob" className="h-10 w-auto rounded" />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                L'excellence de la cuisson industrielle au service du Maroc. Nous fabriquons des
                ustensiles de cuisine haut de gamme depuis 1991.
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-6 text-indigo-400">Navigation</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    L'entreprise
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white transition-colors">
                    Nos produits
                  </Link>
                </li>
                <li>
                  <Link to="/recipes" className="hover:text-white transition-colors">
                    Recettes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-6 text-indigo-400">Support</p>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Réclamations
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Service Client
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Mentions Légales
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-6 text-indigo-400">Contact</p>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-indigo-400 shrink-0" />
                  <span>Fes, Maroc — Zone industrielle</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-indigo-400 shrink-0" />
                  <span>+212 535 729 168</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 TITANIC — Leader de la Cuisson Industrielle</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-gray-300 transition-colors">
                Confidentialité
              </Link>
              <Link to="/" className="hover:text-gray-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}