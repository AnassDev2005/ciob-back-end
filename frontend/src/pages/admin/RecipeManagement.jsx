import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../store/slices/recipeSlice';
import { fetchProducts, fetchCategories } from '../../store/slices/productSlice';
import api from '../../api/axios';
import {
    Utensils, Plus, Edit2, Trash2, X, Clock, Image as ImageIcon, ChefHat
} from 'lucide-react';

const emptyForm = {
    title: '',
    description: '',
    steps: [''],
    ingredients: [''],
    preparation_time: '',
    cooking_time: '',
    product_id: '',
    category_id: '',
    image: null,
    images: [] // For multiple upload
};

const RecipeManagement = () => {
    const dispatch = useDispatch();
    const { recipes, loading } = useSelector((state) => state.recipes);
    const { products, categories } = useSelector((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        dispatch(fetchRecipes());
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const openModal = (recipe = null) => {
        if (recipe) {
            setCurrentRecipe(recipe);
            setFormData({
                title: recipe.title || '',
                description: recipe.description || '',
                steps: Array.isArray(recipe.steps) ? recipe.steps : (recipe.steps ? JSON.parse(recipe.steps) : ['']),
                ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : (recipe.ingredients ? JSON.parse(recipe.ingredients) : ['']),
                preparation_time: recipe.preparation_time || '',
                cooking_time: recipe.cooking_time || '',
                product_id: recipe.product_id || '',
                category_id: recipe.category_id || '',
                image: null,
                images: []
            });
        } else {
            setCurrentRecipe(null);
            setFormData(emptyForm);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentRecipe(null);
        setFormData(emptyForm);
    };

    const updateStep = (index, value) => {
        const steps = [...formData.steps];
        steps[index] = value;
        setFormData({ ...formData, steps });
    };

    const addStep = () => setFormData({ ...formData, steps: [...formData.steps, ''] });
    const removeStep = (index) => {
        const steps = [...formData.steps];
        steps.splice(index, 1);
        setFormData({ ...formData, steps: steps.length ? steps : [''] });
    };

    const updateIngredient = (index, value) => {
        const ingredients = [...formData.ingredients];
        ingredients[index] = value;
        setFormData({ ...formData, ingredients });
    };

    const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
    const removeIngredient = (index) => {
        const ingredients = [...formData.ingredients];
        ingredients.splice(index, 1);
        setFormData({ ...formData, ingredients: ingredients.length ? ingredients : [''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        formData.steps.forEach((step, i) => data.append(`steps[${i}]`, step));
        formData.ingredients.forEach((ing, i) => data.append(`ingredients[${i}]`, ing));
        if (formData.preparation_time) data.append('preparation_time', formData.preparation_time);
        if (formData.cooking_time) data.append('cooking_time', formData.cooking_time);
        if (formData.product_id) data.append('product_id', formData.product_id);
        if (formData.category_id) data.append('category_id', formData.category_id);

        if (formData.images && formData.images.length > 0) {
            Array.from(formData.images).forEach(file => {
                data.append('images[]', file);
            });
        } else if (formData.image) {
            data.append('image', formData.image);
        }


        try {
            if (currentRecipe) {
                data.append('_method', 'PUT');
                await api.post(`/admin/recipes/${currentRecipe.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/admin/recipes', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            dispatch(fetchRecipes());
            closeModal();
        } catch (error) {
            console.error('Error saving recipe:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer cette recette ?')) {
            try {
                await api.delete(`/admin/recipes/${id}`);
                dispatch(fetchRecipes());
            } catch (error) {
                console.error('Error deleting recipe:', error);
            }
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Gestion des Recettes</h1>
                    <p className="text-gray-500 mt-1 font-medium">{recipes.length} recette(s) au total.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="inline-flex items-center justify-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95"
                >
                    <Plus size={20} /> Nouvelle Recette
                </button>
            </header>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                {loading && recipes.length === 0 ? (
                    <div className="p-16 text-center text-gray-400 animate-pulse">Chargement...</div>
                ) : recipes.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <ChefHat size={36} />
                        </div>
                        <p className="text-gray-500 font-medium">Aucune recette. Créez la première !</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Recette</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Catégorie</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Produit lié</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Temps</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recipes.map((recipe) => (
                                    <tr key={recipe.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-rose-50 overflow-hidden shrink-0 flex items-center justify-center text-rose-300">
                                                    {recipe.image
                                                        ? <img src={recipe.image} alt="" className="w-full h-full object-cover" />
                                                        : <ImageIcon size={20} />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{recipe.title}</p>
                                                    <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{recipe.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {recipe.category ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                                                    {recipe.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-300 font-medium">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {recipe.product ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                    {recipe.product.name}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-300 font-medium">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                                                {recipe.preparation_time && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} className="text-blue-400" />
                                                        Prép: {recipe.preparation_time}min
                                                    </span>
                                                )}
                                                {recipe.cooking_time && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} className="text-orange-400" />
                                                        Cuisson: {recipe.cooking_time}min
                                                    </span>
                                                )}
                                                {!recipe.preparation_time && !recipe.cooking_time && <span className="text-gray-300">—</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(recipe)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(recipe.id)}
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
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between shrink-0">
                            <h2 className="text-2xl font-black text-gray-900">
                                {currentRecipe ? 'Modifier la Recette' : 'Nouvelle Recette'}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Titre *</label>
                                <input
                                    type="text" required
                                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description *</label>
                                <textarea
                                    rows="3" required
                                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Étapes *</label>
                                <div className="space-y-2">
                                    {formData.steps.map((step, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-black flex items-center justify-center mt-3 shrink-0">{index + 1}</span>
                                            <input
                                                type="text"
                                                placeholder={`Étape ${index + 1}...`}
                                                className="flex-1 bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                                value={step}
                                                onChange={(e) => updateStep(index, e.target.value)}
                                            />
                                            {formData.steps.length > 1 && (
                                                <button type="button" onClick={() => removeStep(index)}
                                                    className="mt-2 p-2 text-gray-300 hover:text-red-500 rounded-lg transition-colors">
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={addStep}
                                        className="text-xs font-black text-rose-600 hover:text-rose-700 flex items-center gap-1 mt-1 ml-8">
                                        <Plus size={14} /> Ajouter une étape
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Ingrédients *</label>
                                <div className="space-y-2">
                                    {formData.ingredients.map((ing, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black flex items-center justify-center mt-3 shrink-0 shadow-sm">{index + 1}</span>
                                            <input
                                                type="text"
                                                placeholder={`Ingrédient ${index + 1}...`}
                                                className="flex-1 bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                                value={ing}
                                                onChange={(e) => updateIngredient(index, e.target.value)}
                                            />
                                            {formData.ingredients.length > 1 && (
                                                <button type="button" onClick={() => removeIngredient(index)}
                                                    className="mt-2 p-2 text-gray-300 hover:text-red-500 rounded-lg transition-colors">
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={addIngredient}
                                        className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mt-1 ml-8 uppercase tracking-widest">
                                        <Plus size={14} /> Ajouter un ingrédient
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Préparation (min)</label>
                                    <input
                                        type="number" min="0"
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                        value={formData.preparation_time}
                                        onChange={(e) => setFormData({ ...formData, preparation_time: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Cuisson (min)</label>
                                    <input
                                        type="number" min="0"
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                        value={formData.cooking_time}
                                        onChange={(e) => setFormData({ ...formData, cooking_time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catégorie</label>
                                    <select
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                        value={formData.category_id}
                                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    >
                                        <option value="">— Aucun —</option>
                                        {categories.filter(c => c.type === 'recipe').map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Produit associé</label>
                                    <select
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                        value={formData.product_id}
                                        onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                                    >
                                        <option value="">— Aucun —</option>
                                        {products.map((p) => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Image</label>
                                <input
                                    type="file" multiple accept="image/*"
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 transition-all"
                                    onChange={(e) => setFormData({ ...formData, images: e.target.files })}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={closeModal}
                                    className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all">
                                    Annuler
                                </button>
                                <button type="submit" disabled={saving}
                                    className="flex-1 py-3 rounded-xl font-bold bg-rose-600 text-white shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95 disabled:opacity-60">
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

export default RecipeManagement;
