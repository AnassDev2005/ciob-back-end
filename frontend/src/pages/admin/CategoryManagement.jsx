import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/productSlice';
import api from '../../api/axios';
import { Tags, Plus, Edit2, Trash2, X, FolderOpen } from 'lucide-react';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('product');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openModal = (cat = null) => {
    setCurrentCategory(cat);
    setName(cat ? cat.name : '');
    setType(cat ? cat.type : 'product');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setName('');
    setType('product');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentCategory) {
        await api.put(`/admin/categories/${currentCategory.id}`, { name, type });
      } else {
        await api.post('/admin/categories', { name, type });
      }
      dispatch(fetchCategories());
      closeModal();
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await api.delete(`/admin/categories/${id}`);
        dispatch(fetchCategories());
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Gestion des Catégories</h1>
          <p className="text-gray-500 mt-1 font-medium">{categories.length} catégorie(s) au total.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus size={20} /> Nouvelle Catégorie
        </button>
      </header>

      {categories.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-16 border border-gray-100 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <FolderOpen size={36} />
          </div>
          <p className="text-gray-500 font-medium">Aucune catégorie trouvée. Créez la première !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Tags size={22} />
              </div>
              <div className="flex-grow">
                <p className="font-black text-gray-900 text-lg">{cat.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${cat.type === 'recipe' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                    {cat.type === 'recipe' ? 'Recette' : 'Produit'}
                  </span>
                  <p className="text-xs text-gray-400 font-medium">
                    {cat.products?.length ?? 0} produit(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                <button
                  onClick={() => openModal(cat)}
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 text-sm font-bold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                  <Edit2 size={15} /> Modifier
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 p-2 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={15} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">
                {currentCategory ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ex: Ustensiles de cuisson"
                  className="w-full bg-gray-50 border-none rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                  Type de catégorie
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType('product')}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${type === 'product'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                  >
                    Produit
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('recipe')}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${type === 'recipe'
                        ? 'border-rose-600 bg-rose-50 text-rose-700'
                        : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                  >
                    Recette
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 px-6 rounded-xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-60"
                >
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
