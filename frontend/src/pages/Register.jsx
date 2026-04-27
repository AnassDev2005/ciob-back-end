import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, clearError } from '../store/slices/authSlice';
import { UserPlus, AlertCircle, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    return () => dispatch(clearError());
  }, [token, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070B14] overflow-hidden">
      {/* Cinematic Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-rose-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 py-20">
        {/* Glass Container */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-2xl p-8 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
               <ShieldCheck size={12} className="text-rose-400" />
               Rejoindre la Communauté
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Créer votre Profil</h1>
            <p className="text-gray-400 font-medium italic">Accédez à l'excellence culinaire TITANIC.</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 mb-10 flex items-center gap-4 text-rose-200">
               <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle size={20} />
               </div>
               <p className="text-sm font-bold uppercase tracking-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 ml-1">Nom Complet</label>
                 <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white font-bold placeholder:text-gray-600 focus:bg-white/10 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                      placeholder="Ahmed Alaoui"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 ml-1">Email Personnel</label>
                 <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white font-bold placeholder:text-gray-600 focus:bg-white/10 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 ml-1">Mot de Passe</label>
                 <div className="relative group">
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white font-bold placeholder:text-gray-600 focus:bg-white/10 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 ml-1">Confirmation</label>
                 <div className="relative group">
                    <input
                      type="password"
                      name="password_confirmation"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white font-bold placeholder:text-gray-600 focus:bg-white/10 focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                      placeholder="••••••••"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                    />
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
                 </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 px-12 py-5 rounded-[2rem] bg-rose-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-rose-500/20 hover:bg-rose-500 transition-all transform active:scale-95 disabled:opacity-50 group overflow-hidden"
            >
              <span className="relative z-10">{loading ? 'Création...' : "S'inscrire Maintenant"}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Déjà membre ?{' '}
              <Link to="/login" className="text-white font-black uppercase tracking-tight hover:text-rose-400 transition-colors ml-2 decoration-rose-500/50 underline underline-offset-8">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-500 transition-colors font-black text-xs uppercase tracking-[0.4em]">
              TITANIC INDUSTRIES
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
