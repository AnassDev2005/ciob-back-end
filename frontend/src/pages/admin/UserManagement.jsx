import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/adminSlice';
import api from '../../api/axios';
import { 
  Users, 
  Search, 
  Trash2, 
  Shield, 
  User as UserIcon,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAdmin = async (user) => {
    try {
      await api.put(`/admin/users/${user.id}`, { is_admin: !user.is_admin });
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        dispatch(fetchUsers());
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-gray-900">Gestion des Utilisateurs</h1>
        <p className="text-gray-500 mt-1 font-medium">Gérez les accès et les rôles des utilisateurs.</p>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Rechercher un utilisateur..." 
              className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Utilisateur</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Rôle</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date d'inscription</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.is_admin ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                        <Shield size={10} />
                        Administrateur
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-500">
                        Client
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleAdmin(user)}
                        className={`p-2 rounded-lg transition-all ${
                          user.is_admin 
                            ? 'text-amber-600 hover:bg-amber-50' 
                            : 'text-indigo-600 hover:bg-indigo-50'
                        }`}
                        title={user.is_admin ? "Retirer les droits admin" : "Promouvoir admin"}
                      >
                        <Shield size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
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
    </div>
  );
};

export default UserManagement;
