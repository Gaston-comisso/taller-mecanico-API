import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ClientsPage from './components/ClientsPage';
import VehiclesPage from './components/VehiclesPage';
import RepairsPage from './components/RepairsPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setActivePage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-x-auto">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'clients' && <ClientsPage />}
          {activePage === 'vehicles' && <VehiclesPage />}
          {activePage === 'repairs' && <RepairsPage />}
          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;