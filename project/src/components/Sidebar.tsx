import React from 'react';
import { Users, Car, Wrench, Home, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { user } = useAuth();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'clients', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'vehicles', label: 'Vehículos', icon: <Car size={20} /> },
    { id: 'repairs', label: 'Reparaciones', icon: <Wrench size={20} /> },
  ];
  
  // Only show settings to admins
  if (user?.role === 'admin') {
    menuItems.push({ id: 'settings', label: 'Configuración', icon: <Settings size={20} /> });
  }

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0">
      <div className="p-4">
        <div className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors ${
                activePage === item.id
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;