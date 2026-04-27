import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import api from '../api/axios';
import { User, Mail, Shield, CheckCircle, AlertCircle, Save, Key, UserCircle, Settings, Award, ArrowRight, ShieldCheck, Zap, Briefcase, Calendar } from 'lucide-react';

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        confirmPassword: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'Les mots de passe ne correspondent pas.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const updateData = {
                name: formData.name,
                email: formData.email,
            };
            if (formData.password) {
                updateData.password = formData.password;
            }

            const response = await api.put('/me', updateData);
            dispatch(updateUser(response.data));
            setStatus({ type: 'success', message: 'Profil mis à jour avec succès !' });
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } catch (error) {
            console.error('Profile update error:', error);
            let errorMsg = 'Une erreur est survenue lors de la mise à jour.';
            if (error.response?.data?.errors) {
                errorMsg = Object.values(error.response.data.errors).flat().join(' ');
            } else if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            }
            setStatus({ type: 'error', message: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-[#F9FAFB] min-h-screen font-sans">
            {/* Elegant Prestige Header */}
            <section className="bg-white border-b border-gray-100 pt-16 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-[-15deg] translate-x-1/4"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-left animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="flex items-center gap-2 mb-6">
                           <div className="h-0.5 w-12 bg-indigo-600"></div>
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Compte Certifié</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-light text-gray-900 leading-tight tracking-tight mb-4">
                           Votre <span className="font-black italic">Dashboard</span> <br />Privé
                        </h1>
                        <p className="max-w-xl text-gray-500 text-lg font-medium leading-relaxed italic border-l-4 border-indigo-100 pl-6 mt-8">
                           "L'art de la cuisine commence par une organisation impeccable. Gérez votre identité professionnelle en toute sérénité."
                        </p>
                     </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto width-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Classic Portrait Card */}
                    <div className="lg:col-span-4 sticky top-24">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
                            <div className="h-32 bg-[#0F172A] relative">
                               <div className="absolute inset-0 bg-indigo-600 opacity-20"></div>
                            </div>
                            <div className="px-8 pb-10 -mt-16 text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 rounded-full bg-white p-1 border border-gray-100 shadow-2xl mx-auto overflow-hidden">
                                        <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                            <UserCircle size={100} strokeWidth={1} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center text-white shadow-lg">
                                       <Award size={14} />
                                    </div>
                                </div>
                                
                                <h2 className="text-2xl font-black text-gray-900 mb-1">{user?.name}</h2>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">{user?.is_admin ? 'Directeur Général' : 'Membre Premium'}</p>
                                
                                <div className="space-y-4 border-t border-gray-50 pt-10">
                                   <div className="flex items-center gap-4 text-left p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm text-indigo-600">
                                         <Mail size={18} />
                                      </div>
                                      <div>
                                         <p className="text-[10px] font-black uppercase text-gray-400">Email Direct</p>
                                         <p className="text-xs font-bold text-gray-700">{user?.email}</p>
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-4 text-left p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm text-amber-500">
                                         <ShieldCheck size={18} />
                                      </div>
                                      <div>
                                         <p className="text-[10px] font-black uppercase text-gray-400">Vérification</p>
                                         <p className="text-xs font-bold text-gray-700">Identité Certifiée</p>
                                      </div>
                                   </div>
                                </div>
                            </div>
                        </div>

                        {/* Classic Quote/info */}
                        <div className="mt-8 p-10 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
                           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center gap-3">
                              <Shield size={16} /> Heritage titanic
                           </h3>
                           <p className="text-sm font-medium text-gray-400 leading-relaxed italic">
                              "Chaque membre de notre communauté contribue à l'héritage de l'excellence industrielle marocaine."
                           </p>
                        </div>
                    </div>

                    {/* Right: Refined Forms Area */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden">
                            <div className="p-8 sm:p-14 space-y-16">
                               
                               {/* General Information Pane */}
                               <section>
                                  <div className="flex flex-col mb-10">
                                     <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Informations d'Identité</h3>
                                     <p className="text-gray-400 text-sm font-medium font-serif italic">Vos données de contact et d'affichage officielles.</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                     <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Nom Complet</label>
                                        <input
                                          type="text"
                                          value={formData.name}
                                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                          className="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 text-gray-900 font-bold focus:border-indigo-600 focus:ring-0 transition-all outline-none shadow-sm"
                                        />
                                     </div>
                                     <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email de Liaison</label>
                                        <input
                                          type="email"
                                          value={formData.email}
                                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                          className="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 text-gray-900 font-bold focus:border-indigo-600 focus:ring-0 transition-all outline-none shadow-sm"
                                        />
                                     </div>
                                  </div>
                               </section>

                               <div className="h-px bg-gray-100"></div>

                               {/* Security & Access Pane */}
                               <section>
                                  <div className="flex flex-col mb-10">
                                     <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Sécurité & Accès</h3>
                                     <p className="text-gray-400 text-sm font-medium font-serif italic">Mettez à jour vos identifiants de connexion confidentiels.</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                     <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Nouveau Code Secret</label>
                                        <input
                                             type="password"
                                             placeholder="Laisser vide si inchangé"
                                             value={formData.password}
                                             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                             className="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 text-gray-900 font-bold focus:border-rose-600 focus:ring-0 transition-all outline-none shadow-sm placeholder:text-gray-300"
                                        />
                                     </div>
                                     <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Confirmation</label>
                                        <input
                                             type="password"
                                             value={formData.confirmPassword}
                                             onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                             className="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 text-gray-900 font-bold focus:border-rose-600 focus:ring-0 transition-all outline-none shadow-sm"
                                        />
                                     </div>
                                  </div>
                               </section>

                               {/* Status Alerts */}
                               {status.message && (
                                   <div className={`flex items-center gap-4 p-6 rounded-2xl border-2 animate-in fade-in slide-in-from-top-2 duration-300 ${
                                     status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                                   }`}>
                                       {status.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                                       <span className="font-bold text-sm uppercase tracking-tight">{status.message}</span>
                                   </div>
                               )}
                            </div>

                            {/* Solid Action Bar */}
                            <div className="bg-gray-50 px-8 py-10 sm:px-14 flex items-center justify-end">
                               <button
                                   type="submit"
                                   disabled={loading}
                                   className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-900 transition-all transform active:scale-95 disabled:opacity-50 shadow-2xl shadow-indigo-200"
                               >
                                   <Save size={18} />
                                   {loading ? 'Traitement...' : 'Valider les changements'}
                               </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
