import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../store/slices/authSlice';
import { LogIn, AlertCircle, Mail, Lock, ArrowRight, Star } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    return () => dispatch(clearError());
  }, [token, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0F172A] overflow-hidden">
      {/* Cinematic Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl px-4 py-20">
        {/* Glass Container */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl p-8 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
               <Star size={12} className="text-indigo-400" />
               Accès Membre
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Bonjour à nouveau</h1>
            <p className="text-gray-400 font-medium">Connectez-vous pour gérer vos projets culinaires.</p>
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
            <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Identifiant</label>
                 <div className="relative group">
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white font-bold placeholder:text-gray-600 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                 </div>
              </div>

              <div className="space-y-3">
                 <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Mot de Passe</label>
                    <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">
                       Oublié ?
                    </Link>
                 </div>
                 <div className="relative group">
                    <input
                      type="password"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-6 text-white font-bold placeholder:text-gray-600 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                 </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 px-12 py-5 rounded-[1.5rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all transform active:scale-95 disabled:opacity-50 group relative overflow-hidden"
            >
              <span className="relative z-10">{loading ? 'Connexion...' : 'Se Connecter'}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-white font-black uppercase tracking-tight hover:text-indigo-400 transition-colors ml-2 decoration-indigo-500/50 underline underline-offset-8">
                Créer un profil
              </Link>
            </p>
          </div>
        </div>

        {/* Brand Link */}
        <div className="mt-12 text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors font-black text-xs uppercase tracking-[0.4em]">
              TITANIC INDUSTRIES
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
