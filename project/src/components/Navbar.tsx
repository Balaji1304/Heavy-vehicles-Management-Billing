import { useNavigate, Link } from 'react-router-dom';
import { Truck, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Truck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Transport Manager</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/drivers" className="nav-link">Drivers</Link>
                <Link to="/trucks" className="nav-link">Trucks</Link>
                <Link to="/billing" className="nav-link">Billing</Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}