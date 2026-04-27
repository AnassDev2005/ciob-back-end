import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from './store/slices/productSlice';
import { fetchRecipes } from './store/slices/recipeSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import RecipeManagement from './pages/admin/RecipeManagement';
import MessageManagement from './pages/admin/MessageManagement';
import CatalogueManagement from './pages/admin/CatalogueManagement';
import UserManagement from './pages/admin/UserManagement';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes with header/footer */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/products"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><Products /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/products/:id"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><ProductDetail /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/recipes"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><Recipes /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><RecipeDetail /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><Contact /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><Login /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
              <Header />
              <main className="flex-grow"><Register /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Header />
                <main className="flex-grow"><Profile /></main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Admin routes – no public header/footer, uses AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="recipes" element={<RecipeManagement />} />
          <Route path="messages" element={<MessageManagement />} />
          <Route path="catalogues" element={<CatalogueManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
