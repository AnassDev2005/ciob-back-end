import { MapPin, Phone, MessageCircle, ChevronRight, Send, Mail, Globe, Shield, Package } from "lucide-react";
import { Link } from "react-router-dom";

// Social Icon Components
const Facebook = ({ size = 24, ...props }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
   </svg>
);

const Instagram = ({ size = 24, ...props }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
   </svg>
);

const Youtube = ({ size = 24, ...props }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 2.78 2.78 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
   </svg>
);

export default function Footer() {
   return (
      <footer className="bg-[#0F172A] text-white pt-32 pb-12 overflow-hidden relative">
         {/* Visual Background Elements */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>

         <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">

            {/* Top Section: Newsletter or Call to Connect */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
               <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                     <Globe size={12} />
                     Présence Nationale
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tight">Révolutionnez <br />Votre Cuisine de Chef.</h2>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed">
                     Rejoignez les professionnels de la gastronomie marocaine qui font confiance à la robustesse et à l'inox TITANIC depuis plus de 30 ans.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <a href="https://wa.me/212535729168" target="_blank" rel="noopener noreferrer" className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                     <MessageCircle size={32} className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                     <p className="font-bold text-lg">Support Direct</p>
                  </a>
                  <Link to="/contact" className="group p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-500/10 hover:bg-indigo-500 transition-all">
                     <Send size={32} className="text-white/50 mb-6 group-hover:rotate-12 transition-transform" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-1">Demande</p>
                     <p className="font-bold text-lg">Devis Rapide</p>
                  </Link>
               </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-32">

               {/* Logo & About */}
               <div className="lg:col-span-4 pr-0 lg:pr-20">
                  <Link to="/" className="flex items-center gap-3 mb-10 group">
                     <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-xl group-hover:rotate-12 transition-transform duration-500">
                        <Package size={24} />
                     </div>
                     <span className="text-2xl font-black tracking-tight uppercase">Titanic</span>
                  </Link>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium italic mb-10">
                     "L'excellence industrielle marocaine au service de l'art culinaire professionnel. Une longévité inégalée."
                  </p>
                  <div className="flex gap-4">
                     {[
                        { icon: <Facebook size={18} />, link: "https://www.facebook.com/TitanicProductionMaroc" },
                        { icon: <Instagram size={18} />, link: "https://www.instagram.com/titanic_maroc" },
                        { icon: <Youtube size={18} />, link: "https://www.youtube.com/@titanicmaroc" }
                     ].map((social, idx) => (
                        <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                           {social.icon}
                        </a>
                     ))}
                  </div>
               </div>

               {/* Nav Categories */}
               <div className="lg:col-span-2">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Univers</h3>
                  <ul className="space-y-4">
                     <li><Link to="/products" className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Produits</Link></li>
                     <li><Link to="/recipes" className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Recettes Chef</Link></li>
                     <li><Link to="/contact" className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /> Contact Pro</Link></li>
                  </ul>
               </div>

               {/* Info Categories */}
               <div className="lg:col-span-2">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Services</h3>
                  <ul className="space-y-4">
                     <li><Link to="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Sur mesure</Link></li>
                     <li><Link to="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Revendeurs</Link></li>
                     <li><Link to="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                  </ul>
               </div>

               {/* Contact Info */}
               <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 mt-[-20px] lg:mt-0">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Siège Social</h3>
                  <div className="space-y-8">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-white/50">
                           <MapPin size={18} />
                        </div>
                        <p className="text-sm font-bold text-gray-300 leading-relaxed uppercase tracking-tight">Fès 30000, Maroc <br />Quartier Industriel, Rue 45</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-white/50">
                           <Phone size={18} />
                        </div>
                        <p className="text-sm font-black text-white">+212 5 35 72 91 68</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-white/50">
                           <Mail size={18} />
                        </div>
                        <p className="text-sm font-black text-indigo-300">contact@ciob-store.ma</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
               <div className="flex items-center gap-3">
                  <Shield size={16} className="text-indigo-500" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                     © 2026 TITANIC INDUSTRIES — Leader National DE LA CUISSON PRO
                  </p>
               </div>
               <div className="flex gap-10">
                  <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Mentions Légales</Link>
                  <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">Politique de Cookies</Link>
               </div>
            </div>
         </div>
      </footer>
   );
}
