import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import api from '../api/axios';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{question}</span>
        <ChevronDown className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} size={20} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/contact', formData);
      setStatus({ type: 'success', message: 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du message.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#FDFDFF]">
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-indigo-100/50 shadow-sm">
            <MessageSquare size={14} />
            Entrons en contact
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
            Parlons de <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Vos Projets</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-indigo-100 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
            Une question technique ? Un besoin spécifique pour votre cuisine professionnelle ? 
            Notre équipe d'experts est là pour vous accompagner.
          </p>
        </div>
      </section>

      <section className="pb-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Info Sidebar (Lg: 4/12) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white shadow-xl shadow-indigo-100/20 group hover:shadow-2xl transition-all duration-500">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Nos Coordonnées</h2>
                <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed">
                  Venez nous rencontrer ou contactez-nous via l'un de ces canaux officiels.
                </p>

                <div className="space-y-10">
                  <div className="flex gap-5 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200 group-hover/item:scale-110 transition-transform">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-1">Siège Social</h3>
                      <p className="text-gray-900 font-bold text-sm">Quartier Industriel, Rue 45,<br />Fès 30000, Maroc</p>
                    </div>
                  </div>

                  <div className="flex gap-5 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200 group-hover/item:scale-110 transition-transform">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Téléphone</h3>
                      <p className="text-gray-900 font-bold text-sm">+212 5 35 72 91 68</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Lun - Sam | 8h - 18h</p>
                    </div>
                  </div>

                  <div className="flex gap-5 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-200 group-hover/item:scale-110 transition-transform">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-rose-600 mb-1">Support Email</h3>
                      <p className="text-gray-900 font-bold text-sm">contact@ciob-store.ma</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Réponse en moins de 2h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQ / Info Card */}
              <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] -mr-10 -mt-10"></div>
                <HelpCircle className="text-indigo-400 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-4">Besoin d'aide ?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Consultez notre base de connaissances ou demandez un rappel gratuit à l'un de nos conseillers.
                </p>
                <button className="w-full py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all active:scale-95">
                  Centre d'assistance
                </button>
              </div>
            </div>

            {/* Contact Form Main (Lg: 8/12) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[3rem] p-8 sm:p-16 border border-gray-100 shadow-2xl shadow-indigo-100/40 relative">
                <div className="flex flex-col mb-12">
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Envoyez-nous un Message</h2>
                  <p className="text-gray-500 font-medium italic">Nous sommes impatients de découvrir vos futurs succès culinaires.</p>
                </div>

                {status.message && (
                  <div className={`mb-10 p-6 rounded-2xl text-sm font-bold flex items-center gap-3 ${
                    status.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                    : 'bg-rose-50 text-rose-700 border border-rose-100'
                  }`}>
                    {status.type === 'success' ? <Clock size={20} /> : <AtSign size={20} />}
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom Complet</label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ex: Ahmed Alaoui"
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4.5 pl-14 pr-4 text-sm font-bold focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                        />
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Professionnel</label>
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ahmed@exemple.ma"
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4.5 pl-14 pr-4 text-sm font-bold focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                        />
                        <AtSign className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-indigo-600 transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Sujet de votre demande</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Quel sujet souhaitez-vous aborder ?"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4.5 px-6 text-sm font-bold focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Votre Message</label>
                    <textarea
                      name="message"
                      required
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Comment pouvons-nous vous aider aujourd'hui ?"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-6 px-6 text-sm font-bold focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-3 px-12 py-5 rounded-[1.5rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    <span>{loading ? 'Traitement...' : 'Envoyer le message'}</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white border-t border-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Questions Fréquentes</h2>
            <p className="text-gray-500 font-medium">Réponses rapides aux questions les plus courantes.</p>
          </div>
          <div className="bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-8 sm:p-12">
            <FAQItem 
              question="Quels sont les délais de livraison habituels ?" 
              answer="Pour les produits en stock, nous livrons partout au Maroc sous 48 à 72 heures. Pour les commandes sur mesure, le délai varie entre 7 et 15 jours ouvrables." 
            />
            <FAQItem 
              question="Proposez-vous une installation sur site ?" 
              answer="Oui, notre équipe technique peut se déplacer pour assurer l'installation et la mise en service de vos équipements professionnels TITANIC." 
            />
            <FAQItem 
              question="Comment obtenir un devis personnalisé ?" 
              answer="Remplissez simplement le formulaire ci-dessus ! Nous analysons votre demande et vous envoyons une proposition détaillée sous 24h ouvrées." 
            />
          </div>
        </div>
      </section>

      {/* Modern Map Display */}
      <section className="h-[500px] w-full relative group">
        <div className="absolute inset-0 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-[#F1F3F4] saturate-0 group-hover:saturate-100 transition-all duration-1000">
             {/* Virtual representation of a map */}
             <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
             <div className="absolute flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce border-4 border-white">
                  <MapPin size={32} />
                </div>
                <div className="mt-4 bg-white px-6 py-2 rounded-full shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-gray-900">Zone Industrielle, Fès</p>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-indigo-900 mix-blend-color opacity-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000"></div>
      </section>
    </div>
  );
};

export default Contact;
