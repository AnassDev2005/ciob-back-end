import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../../store/slices/adminSlice';
import { 
  Package, 
  Tags, 
  Utensils, 
  MessageSquare, 
  Users, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const cards = [
    { name: 'Produits', value: stats?.products_count || 0, icon: Package, color: 'bg-blue-500' },
    { name: 'Catégories', value: stats?.categories_count || 0, icon: Tags, color: 'bg-purple-500' },
    { name: 'Recettes', value: stats?.recipes_count || 0, icon: Utensils, color: 'bg-rose-500' },
    { name: 'Messages', value: stats?.messages_count || 0, icon: MessageSquare, color: 'bg-amber-500' },
    { name: 'Utilisateurs', value: stats?.users_count || 0, icon: Users, color: 'bg-indigo-500' },
    { name: 'Messages non lus', value: stats?.unread_messages_count || 0, icon: MessageSquare, color: 'bg-emerald-500' },
  ];

  if (loading && !stats) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 font-medium">Bienvenue dans votre espace d'administration.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-32 h-32 ${card.color} opacity-[0.03] rounded-bl-[5rem] -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`}></div>
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-2xl ${card.color} text-white shadow-lg`}>
                <card.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                +12%
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em]">{card.name}</h3>
              <div className="flex items-end justify-between mt-1">
                <span className="text-4xl font-black text-gray-900">{card.value}</span>
                <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-6">Activités Récentes</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Nouveau produit ajouté</p>
                  <p className="text-xs text-gray-500 font-medium">Il y a 2 heures</p>
                </div>
                <button className="ml-auto text-indigo-600 hover:underline text-xs font-black uppercase">Voir</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-6">Messages en attente</h2>
          <div className="space-y-6 text-center py-8">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <MessageSquare size={32} />
            </div>
            <p className="text-gray-500 font-medium">Tous les messages ont été traités !</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
