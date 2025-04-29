import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, PenTool as Tool, Calendar } from 'lucide-react';
import { Repair, Vehicle, mockRepairs, mockVehicles, mockRepairStatuses } from '../types';

const RepairsPage: React.FC = () => {
  const [repairs, setRepairs] = useState<Repair[]>(mockRepairs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);

  const filteredRepairs = repairs.filter(repair => {
    const vehicle = mockVehicles.find(v => v.id === repair.vehicleId);
    const searchLower = searchTerm.toLowerCase();
    
    return (
      repair.description.toLowerCase().includes(searchLower) ||
      repair.status.includes(searchLower) ||
      (vehicle && `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchLower)) ||
      (vehicle && vehicle.licensePlate.toLowerCase().includes(searchLower))
    );
  });

  const handleAddRepair = () => {
    setCurrentRepair(null);
    setIsModalOpen(true);
  };

  const handleEditRepair = (repair: Repair) => {
    setCurrentRepair(repair);
    setIsModalOpen(true);
  };

  const handleDeleteRepair = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta reparación?')) {
      setRepairs(repairs.filter(repair => repair.id !== id));
    }
  };

  const handleSaveRepair = (repair: Repair) => {
    if (currentRepair) {
      // Edit existing repair
      setRepairs(repairs.map(r => r.id === repair.id ? repair : r));
    } else {
      // Add new repair
      setRepairs([...repairs, { ...repair, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const getVehicleInfo = (vehicleId: number) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : 'Vehículo desconocido';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-200 text-blue-800';
      case 'completed':
        return 'bg-green-200 text-green-800';
      case 'delivered':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Progreso';
      case 'completed':
        return 'Completado';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reparaciones</h1>
        <button
          onClick={handleAddRepair}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={20} className="mr-1" />
          Nueva Reparación
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar reparaciones..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Vehículo</th>
                <th className="py-3 px-4 text-left">Descripción</th>
                <th className="py-3 px-4 text-left">Fecha Inicio</th>
                <th className="py-3 px-4 text-left">Estado</th>
                <th className="py-3 px-4 text-left">Costo</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepairs.map(repair => (
                <tr key={repair.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{getVehicleInfo(repair.vehicleId)}</td>
                  <td className="py-3 px-4">{repair.description}</td>
                  <td className="py-3 px-4">{formatDate(repair.startDate)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(repair.status)}`}>
                      {getStatusText(repair.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">${repair.cost.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRepair(repair)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteRepair(repair.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <RepairModal
          repair={currentRepair}
          vehicles={mockVehicles}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRepair}
        />
      )}
    </div>
  );
};

interface RepairModalProps {
  repair: Repair | null;
  vehicles: Vehicle[];
  onClose: () => void;
  onSave: (repair: Repair) => void;
}

const RepairModal: React.FC<RepairModalProps> = ({ repair, vehicles, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Repair, 'id'> & { id?: number }>({
    vehicleId: repair?.vehicleId || vehicles[0]?.id || 0,
    description: repair?.description || '',
    startDate: repair?.startDate || new Date().toISOString(),
    endDate: repair?.endDate || null,
    status: repair?.status || 'pending',
    cost: repair?.cost || 0,
    notes: repair?.notes || '',
    ...(repair?.id && { id: repair.id }),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'cost') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === 'vehicleId') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Repair);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <Tool className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">
            {repair ? 'Editar Reparación' : 'Nueva Reparación'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehículo
            </label>
            <select
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate.split('T')[0]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin (opcional)
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {mockRepairStatuses.map(status => (
                  <option key={status.id} value={status.name}>
                    {status.name === 'pending' && 'Pendiente'}
                    {status.name === 'in_progress' && 'En Progreso'}
                    {status.name === 'completed' && 'Completado'}
                    {status.name === 'delivered' && 'Entregado'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Costo ($)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas (opcional)
            </label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepairsPage;