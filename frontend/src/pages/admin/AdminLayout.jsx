import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Utensils, 
  MessageSquare, 
  BookOpen, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  User
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Produits', icon: Package, path: '/admin/products' },
    { name: 'Catégories', icon: Tags, path: '/admin/categories' },
    { name: 'Recettes', icon: Utensils, path: '/admin/recipes' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Catalogues', icon: BookOpen, path: '/admin/catalogues' },
    { name: 'Utilisateurs', icon: Users, path: '/admin/users' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <Package size={18} />
            </div>
            {isSidebarOpen && <span className="font-black tracking-tighter text-xl">CIOB ADMIN</span>}
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded-lg lg:block hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow mt-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} className="shrink-0" />
                {isSidebarOpen && <span className="font-bold text-sm">{item.name}</span>}
                {isSidebarOpen && isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
              <User size={16} />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">Admin</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
          >
            <LogOut size={20} className="shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
