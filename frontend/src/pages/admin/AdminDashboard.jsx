import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminStats, fetchMessages, markMessageRead } from '../../store/slices/adminSlice';
import {
  Package,
  Tags,
  Utensils,
  MessageSquare,
  Users,
  BookOpen,
  ArrowUpRight,
  Mail,
  CheckCircle2,
  Activity,
  Home,
} from 'lucide-react';

// Simple SVG bar chart component
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-3 h-32 w-full">
      {data.map((item) => {
        const heightPct = Math.max((item.value / max) * 100, 4);
        return (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-xs font-black text-gray-700">{item.value}</span>
            <div className="w-full rounded-t-xl transition-all duration-700" style={{ height: `${heightPct}%`, background: item.color }} />
            <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 text-center leading-tight">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, messages, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchMessages());
  }, [dispatch]);

  const unreadMessages = messages.filter(m => !m.is_read).slice(0, 5);

  const statCards = [
    { name: 'Produits', value: stats?.products_count ?? '—', icon: Package, color: 'bg-blue-500', shadow: 'shadow-blue-200', link: '/admin/products' },
    { name: 'Catégories', value: stats?.categories_count ?? '—', icon: Tags, color: 'bg-purple-500', shadow: 'shadow-purple-200', link: '/admin/categories' },
    { name: 'Recettes', value: stats?.recipes_count ?? '—', icon: Utensils, color: 'bg-rose-500', shadow: 'shadow-rose-200', link: '/admin/recipes' },
    { name: 'Messages', value: stats?.messages_count ?? '—', icon: MessageSquare, color: 'bg-amber-500', shadow: 'shadow-amber-200', link: '/admin/messages' },
    { name: 'Utilisateurs', value: stats?.users_count ?? '—', icon: Users, color: 'bg-indigo-500', shadow: 'shadow-indigo-200', link: '/admin/users' },
  ];

  const chartData = [
    { label: 'Produits', value: stats?.products_count || 0, color: '#3b82f6' },
    { label: 'Catégories', value: stats?.categories_count || 0, color: '#a855f7' },
    { label: 'Recettes', value: stats?.recipes_count || 0, color: '#f43f5e' },
    { label: 'Utilisateurs', value: stats?.users_count || 0, color: '#6366f1' },
    { label: 'Messages', value: stats?.messages_count || 0, color: '#f59e0b' },
  ];

  const quickActions = [
    { label: 'Ajouter un Produit', icon: Package, link: '/admin/products', color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
    { label: 'Nouvelle Recette', icon: Utensils, link: '/admin/recipes', color: 'text-rose-600 bg-rose-50 hover:bg-rose-100' },
    { label: 'Gérer les Catégories', icon: Tags, link: '/admin/categories', color: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
    { label: 'Voir les Messages', icon: Mail, link: '/admin/messages', color: 'text-amber-600 bg-amber-50 hover:bg-amber-100' },
    { label: 'Utilisateurs', icon: Users, link: '/admin/users', color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' },
  ];

  const handleMarkRead = (msg) => {
    dispatch(markMessageRead({ id: msg.id, is_read: true }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 font-medium">Bienvenue dans votre espace d'administration.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl font-bold text-sm border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Home size={16} />
            <span>Aller au site</span>
          </Link>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl font-bold text-sm">
            <Activity size={16} />
            <span>Système en ligne</span>
          </div>
        </div>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.name}
            to={card.link}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col gap-3"
          >
            <div className={`p-3 rounded-xl ${card.color} ${card.shadow} shadow-lg text-white w-fit`}>
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">
                {loading && card.value === '—' ? (
                  <span className="inline-block w-8 h-6 bg-gray-100 rounded animate-pulse" />
                ) : card.value}
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-0.5">{card.name}</p>
            </div>
            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors ml-auto" />
          </Link>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-6">Vue d'ensemble des entités</h2>
          {stats ? (
            <BarChart data={chartData} />
          ) : (
            <div className="flex items-end gap-3 h-32">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 bg-gray-100 rounded-t-xl animate-pulse" style={{ height: `${30 + i * 15}%` }} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.link}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${action.color}`}
              >
                <action.icon size={18} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Unread Messages */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900">
            Messages non lus
            {stats?.unread_messages_count > 0 && (
              <span className="ml-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {stats.unread_messages_count}
              </span>
            )}
          </h2>
          <Link to="/admin/messages" className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-wider">
            Voir tout →
          </Link>
        </div>

        {unreadMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={28} className="text-emerald-400" />
            </div>
            <p className="text-gray-500 font-medium">Aucun message non lu — tout est traité !</p>
          </div>
        ) : (
          <div className="space-y-3">
            {unreadMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-100 hover:bg-amber-50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-black text-sm">
                  {msg.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{msg.subject || '(Sans sujet)'}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.name} · {msg.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                  </span>
                  <button
                    onClick={() => handleMarkRead(msg)}
                    className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-200 transition-colors"
                    title="Marquer comme lu"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
