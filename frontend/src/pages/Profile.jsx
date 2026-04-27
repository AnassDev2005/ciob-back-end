import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import api from '../api/axios';
import { User, Mail, Shield, CheckCircle, AlertCircle, Save, Key } from 'lucide-react';

export default function Profile() {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        confirmPassword: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

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
            setFormData({ ...formData, password: '', confirmPassword: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <header className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Mon Profil</h1>
                <p className="text-gray-500 font-medium">Gérez vos informations personnelles et la sécurité de votre compte.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: User Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm text-center">
                        <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                            <User size={40} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                        <p className="text-sm text-gray-500 mb-6">{user?.email}</p>
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user?.is_admin ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                            }`}>
                            {user?.is_admin ? 'Administrateur' : 'Utilisateur Standard'}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 overflow-hidden relative">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full"></div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Accès Rapide</h3>
                        <nav className="space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white text-gray-700 text-sm font-bold shadow-sm">
                                <Shield size={18} className="text-indigo-500" />
                                Sécurité du compte
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Right: Forms */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm space-y-8">
                        <div>
                            <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
                                <User className="text-indigo-600" size={20} />
                                Informations Personnelles
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom Complet</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Adresse Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-50"></div>

                        <div>
                            <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
                                <Key className="text-indigo-600" size={20} />
                                Changer le mot de passe
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nouveau Mot de Passe</label>
                                    <input
                                        type="password"
                                        placeholder="Min. 8 caractères"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirmer</label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {status.message && (
                            <div className={`flex items-center gap-3 p-4 rounded-2xl border text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'
                                }`}>
                                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                {status.message}
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                <Save size={20} />
                                {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
