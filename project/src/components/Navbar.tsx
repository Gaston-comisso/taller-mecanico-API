import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wrench, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Wrench className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">Taller Mecánico</span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{user.username}</span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-700">
                  {user.role}
                </span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center text-sm px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;