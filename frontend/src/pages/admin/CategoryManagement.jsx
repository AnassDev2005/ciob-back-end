import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/productSlice';
import api from '../../api/axios';
import { Tags, Plus, Edit2, Trash2 } from 'lucide-react';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-gray-900">Gestion des Catégories</h1>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
          <Plus size={20} /> Nouvelle Catégorie
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.products?.length || 0} produits</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><Edit2 size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
