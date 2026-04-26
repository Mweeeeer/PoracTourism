import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ListingsPage from './pages/ListingsPage';
import DetailsPage from './pages/DetailsPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Admin/Dashboard';
import './index.css';

function ProtectedRoute({ children, requireAdmin }) {
  const { currentUser, isAdmin, loading } = useAuth();
  
  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (!currentUser) return <Navigate to="/login" />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" />;
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/listings/:id" element={<DetailsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
