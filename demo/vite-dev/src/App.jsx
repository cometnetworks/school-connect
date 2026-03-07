import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Home, Users, Settings } from 'lucide-react';
import HomePage from './pages/HomePage';
import StudentProfile from './pages/StudentProfile';
import LoginPage from './pages/LoginPage';
import ChildrenPage from './pages/ChildrenPage';

// Simple Auth Guard
const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem('schoolConnectAuth') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
};

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Users, label: 'Hijos', path: '/children' },
    { icon: Settings, label: 'Ajustes', path: '/settings' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-16 transition-colors duration-200 ${isActive ? 'text-[var(--color-brand-blue)]' : 'text-[var(--color-text-muted)] hover:text-gray-900'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto relative bg-[var(--color-brand-light)] shadow-xl overflow-hidden">
      {children}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/children" element={<ChildrenPage />} />
                <Route path="/student/:id" element={<StudentProfile />} />
                <Route path="/settings" element={
                  <div className="p-6 text-center mt-20">
                    <h2 className="text-xl font-bold mb-4">Ajustes</h2>
                    <button
                      onClick={() => {
                        localStorage.removeItem('schoolConnectAuth');
                        window.location.href = '/login';
                      }}
                      className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-medium"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                } />
              </Routes>
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
