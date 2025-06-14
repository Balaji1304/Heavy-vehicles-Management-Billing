import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DriversManagement from './pages/DriversManagement';
import TrucksManagement from './pages/TrucksManagement';
import BillingManagement from './pages/BillingManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/drivers" element={
              <PrivateRoute>
                <DriversManagement />
              </PrivateRoute>
            } />
            <Route path="/trucks" element={
              <PrivateRoute>
                <TrucksManagement />
              </PrivateRoute>
            } />
            <Route path="/billing" element={
              <PrivateRoute>
                <BillingManagement />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;