import React from 'react';
import { Car, Users, Wrench, AlertCircle } from 'lucide-react';
import { mockClients, mockVehicles, mockRepairs } from '../types';

const Dashboard: React.FC = () => {
  const pendingRepairs = mockRepairs.filter(repair => repair.status === 'pending').length;
  const inProgressRepairs = mockRepairs.filter(repair => repair.status === 'in_progress').length;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Clientes" 
          value={mockClients.length} 
          icon={<Users className="h-8 w-8 text-blue-500" />} 
          color="bg-blue-100"
        />
        <DashboardCard 
          title="Vehículos" 
          value={mockVehicles.length} 
          icon={<Car className="h-8 w-8 text-green-500" />} 
          color="bg-green-100"
        />
        <DashboardCard 
          title="Reparaciones Pendientes" 
          value={pendingRepairs} 
          icon={<AlertCircle className="h-8 w-8 text-yellow-500" />} 
          color="bg-yellow-100"
        />
        <DashboardCard 
          title="Reparaciones en Progreso" 
          value={inProgressRepairs} 
          icon={<Wrench className="h-8 w-8 text-purple-500" />} 
          color="bg-purple-100"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentRepairsCard />
        <RecentClientsCard />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} rounded-lg shadow-md p-6`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
};

const RecentRepairsCard: React.FC = () => {
  // Get the 5 most recent repairs
  const recentRepairs = [...mockRepairs]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reparaciones Recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Vehículo</th>
              <th className="py-2 px-4 text-left">Descripción</th>
              <th className="py-2 px-4 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentRepairs.map(repair => {
              const vehicle = mockVehicles.find(v => v.id === repair.vehicleId);
              let statusColor = '';
              
              switch(repair.status) {
                case 'pending':
                  statusColor = 'bg-yellow-200 text-yellow-800';
                  break;
                case 'in_progress':
                  statusColor = 'bg-blue-200 text-blue-800';
                  break;
                case 'completed':
                  statusColor = 'bg-green-200 text-green-800';
                  break;
                case 'delivered':
                  statusColor = 'bg-gray-200 text-gray-800';
                  break;
              }
              
              return (
                <tr key={repair.id} className="border-b">
                  <td className="py-2 px-4">
                    {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown'}
                  </td>
                  <td className="py-2 px-4">{repair.description}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
                      {repair.status === 'pending' && 'Pendiente'}
                      {repair.status === 'in_progress' && 'En Progreso'}
                      {repair.status === 'completed' && 'Completado'}
                      {repair.status === 'delivered' && 'Entregado'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RecentClientsCard: React.FC = () => {
  // Get the 5 most recent clients
  const recentClients = [...mockClients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Clientes Recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {recentClients.map(client => (
              <tr key={client.id} className="border-b">
                <td className="py-2 px-4">{client.name}</td>
                <td className="py-2 px-4">{client.email}</td>
                <td className="py-2 px-4">{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;