import React from 'react';
import { Settings, Users, Shield, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  
  // Only admins should access this page
  if (user?.role !== 'admin') {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsCard 
          title="Gestión de Usuarios" 
          description="Administra usuarios, roles y permisos del sistema."
          icon={<Users className="h-10 w-10 text-blue-500" />}
          actions={[
            { label: 'Usuarios', onClick: () => alert('Gestión de usuarios') },
            { label: 'Roles', onClick: () => alert('Gestión de roles') },
          ]}
        />
        
        <SettingsCard 
          title="Seguridad" 
          description="Configura opciones de seguridad y autenticación."
          icon={<Shield className="h-10 w-10 text-green-500" />}
          actions={[
            { label: 'Contraseñas', onClick: () => alert('Política de contraseñas') },
            { label: 'Sesiones', onClick: () => alert('Gestión de sesiones') },
          ]}
        />
        
        <SettingsCard 
          title="Base de Datos" 
          description="Opciones de respaldo y restauración de datos."
          icon={<Database className="h-10 w-10 text-purple-500" />}
          actions={[
            { label: 'Respaldo', onClick: () => alert('Crear respaldo') },
            { label: 'Restaurar', onClick: () => alert('Restaurar datos') },
          ]}
        />
      </div>
    </div>
  );
};

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, icon, actions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start mb-4">
        <div className="mr-4">{icon}</div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;