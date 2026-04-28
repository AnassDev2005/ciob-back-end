import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../../store/slices/productSlice';
import api from '../../api/axios';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Filter,
  Image as ImageIcon
} from 'lucide-react';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, categories, loading } = useSelector((state) => state.products);
  const [searchTerm, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    badge: '',
    diameter: '',
    characteristics: '',
    image: null,
    images: [] // For multiple upload
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        badge: product.badge || '',
        diameter: product.diameter || '',
        characteristics: product.characteristics ? product.characteristics.join(', ') : '',
        image: null,
        images: []
      });
    } else {
      setCurrentProduct(null);
      setFormData({
        name: '',
        description: '',
        category_id: categories[0]?.id || '',
        badge: '',
        diameter: '',
        characteristics: '',
        image: null,
        images: []
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category_id', formData.category_id);
    data.append('badge', formData.badge);
    data.append('diameter', formData.diameter);

    if (formData.characteristics) {
      const charArray = formData.characteristics.split(',').map(s => s.trim()).filter(s => s !== '');
      charArray.forEach((char, index) => {
        data.append(`characteristics[${index}]`, char);
      });
    }

    if (formData.images && formData.images.length > 0) {
      Array.from(formData.images).forEach(file => {
        data.append('images[]', file);
      });
    } else if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (currentProduct) {
        // Laravel spoofing for PUT with FormData
        data.append('_method', 'PUT');
        await api.post(`/admin/products/${currentProduct.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      dispatch(fetchProducts());
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await api.delete(`/admin/products/${id}`);
        dispatch(fetchProducts());
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-500 mt-1 font-medium">Gérez votre catalogue d'ustensiles de cuisine.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          Nouveau Produit
        </button>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Produit</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Catégorie</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Statut</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                        {product.image ? (
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.badge ? (
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1">
                        <Check size={12} />
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <header className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">
                {currentProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom du produit</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catégorie</label>
                <select
                  className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                >
                  {categories.filter(c => c.type === 'product').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Diamètre (cm)</label>
                  <input
                    type="text"
                    placeholder="Ex: 24"
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Points Forts (Sép: ,)</label>
                  <input
                    type="text"
                    placeholder="Ex: Inox 304, Fond Triple"
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={formData.characteristics}
                    onChange={(e) => setFormData({ ...formData, characteristics: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Badge (Optionnel)</label>
                  <input
                    type="text"
                    placeholder="Ex: Nouveauté"
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Image</label>
                  <input
                    type="file"
                    multiple
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                    onChange={(e) => setFormData({ ...formData, images: e.target.files })}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-grow py-3 px-6 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-grow py-3 px-6 rounded-xl font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-95"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
