import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCatalogues,
    createCatalogue,
    toggleCatalogueActive,
    deleteCatalogue,
} from '../../store/slices/adminSlice';
import {
    BookOpen, Plus, Trash2, X, FileText, ExternalLink, ToggleLeft, ToggleRight,
} from 'lucide-react';

const CatalogueManagement = () => {
    const dispatch = useDispatch();
    const { catalogues, loading } = useSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        dispatch(fetchCatalogues());
    }, [dispatch]);

    const openModal = () => {
        setTitle('');
        setFile(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle('');
        setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setSaving(true);
        const data = new FormData();
        data.append('title', title);
        data.append('file', file);
        try {
            await dispatch(createCatalogue(data));
            closeModal();
        } catch (error) {
            console.error('Error creating catalogue:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = (cat) => {
        dispatch(toggleCatalogueActive({ id: cat.id, is_active: !cat.is_active }));
    };

    const handleDelete = (id) => {
        if (window.confirm('Supprimer ce catalogue ?')) {
            dispatch(deleteCatalogue(id));
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Gestion des Catalogues</h1>
                    <p className="text-gray-500 mt-1 font-medium">{catalogues.length} catalogue(s) PDF.</p>
                </div>
                <button
                    onClick={openModal}
                    className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all active:scale-95"
                >
                    <Plus size={20} /> Nouveau Catalogue
                </button>
            </header>

            {loading && catalogues.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-[1.5rem] border border-gray-100 h-44 animate-pulse" />
                    ))}
                </div>
            ) : catalogues.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-16 border border-gray-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
                        <BookOpen size={36} />
                    </div>
                    <p className="text-gray-500 font-medium">Aucun catalogue. Ajoutez votre premier PDF !</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {catalogues.map((cat) => (
                        <div key={cat.id} className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
                            {/* Preview area */}
                            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 h-28 flex flex-col items-center justify-center gap-2">
                                <FileText size={36} className="text-teal-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-teal-500">PDF</span>
                            </div>

                            <div className="p-5 flex flex-col flex-1 gap-4">
                                <div className="flex-1">
                                    <p className="font-black text-gray-900 text-sm leading-tight">{cat.title}</p>
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${cat.is_active
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {cat.is_active ? '● Actif' : '○ Inactif'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-50 pt-3 gap-2">
                                    {cat.file_path && (
                                        <a
                                            href={cat.file_path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors"
                                        >
                                            <ExternalLink size={14} /> Ouvrir
                                        </a>
                                    )}
                                    <div className="flex items-center gap-1 ml-auto">
                                        <button
                                            onClick={() => handleToggle(cat)}
                                            className={`p-1.5 rounded-lg transition-all ${cat.is_active
                                                    ? 'text-emerald-600 hover:bg-emerald-50'
                                                    : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                            title={cat.is_active ? 'Désactiver' : 'Activer'}
                                        >
                                            {cat.is_active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-gray-900">Nouveau Catalogue</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Titre *</label>
                                <input
                                    type="text" required autoFocus
                                    placeholder="Ex: Catalogue Printemps 2025"
                                    className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-teal-500 transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Fichier PDF *</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-teal-400 transition-colors">
                                    <FileText size={32} className="text-gray-300 mx-auto mb-2" />
                                    <input
                                        type="file" accept=".pdf" required
                                        className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all cursor-pointer"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {file && (
                                        <p className="text-xs font-bold text-teal-600 mt-2">{file.name}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={closeModal}
                                    className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
                                    Annuler
                                </button>
                                <button type="submit" disabled={saving || !file}
                                    className="flex-1 py-3 rounded-xl font-bold bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all active:scale-95 disabled:opacity-60">
                                    {saving ? 'Envoi...' : 'Uploader'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CatalogueManagement;
