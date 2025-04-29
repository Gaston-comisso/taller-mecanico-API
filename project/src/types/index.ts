export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'mechanic' | 'receptionist';
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Vehicle {
  id: number;
  clientId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
}

export interface RepairStatus {
  id: number;
  name: 'pending' | 'in_progress' | 'completed' | 'delivered';
  color: string;
}

export interface Repair {
  id: number;
  vehicleId: number;
  description: string;
  startDate: string;
  endDate: string | null;
  status: RepairStatus['name'];
  cost: number;
  notes: string | null;
}

// Mock data for development
export const mockClients: Client[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '555-123-4567',
    address: 'Calle Principal 123, Ciudad',
    createdAt: '2023-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '555-987-6543',
    address: 'Avenida Central 456, Ciudad',
    createdAt: '2023-02-20T14:45:00Z',
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    phone: '555-567-8901',
    address: 'Plaza Mayor 789, Ciudad',
    createdAt: '2023-03-10T09:15:00Z',
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    clientId: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2018,
    licensePlate: 'ABC-123',
    vin: '1HGCM82633A123456',
    color: 'Rojo',
  },
  {
    id: 2,
    clientId: 1,
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    licensePlate: 'XYZ-789',
    vin: '2FMDK48C87BB12345',
    color: 'Azul',
  },
  {
    id: 3,
    clientId: 2,
    make: 'Volkswagen',
    model: 'Golf',
    year: 2019,
    licensePlate: 'DEF-456',
    vin: '3VWSE69M35M123456',
    color: 'Negro',
  },
  {
    id: 4,
    clientId: 3,
    make: 'Ford',
    model: 'Focus',
    year: 2017,
    licensePlate: 'GHI-789',
    vin: '1FADP3F23EL123456',
    color: 'Blanco',
  },
];

export const mockRepairStatuses: RepairStatus[] = [
  { id: 1, name: 'pending', color: 'bg-yellow-200 text-yellow-800' },
  { id: 2, name: 'in_progress', color: 'bg-blue-200 text-blue-800' },
  { id: 3, name: 'completed', color: 'bg-green-200 text-green-800' },
  { id: 4, name: 'delivered', color: 'bg-gray-200 text-gray-800' },
];

export const mockRepairs: Repair[] = [
  {
    id: 1,
    vehicleId: 1,
    description: 'Cambio de aceite y filtro',
    startDate: '2023-04-05T08:00:00Z',
    endDate: '2023-04-05T10:30:00Z',
    status: 'completed',
    cost: 150.00,
    notes: 'Cliente solicitó aceite sintético premium',
  },
  {
    id: 2,
    vehicleId: 2,
    description: 'Revisión de frenos y cambio de pastillas',
    startDate: '2023-04-10T09:15:00Z',
    endDate: null,
    status: 'in_progress',
    cost: 350.00,
    notes: null,
  },
  {
    id: 3,
    vehicleId: 3,
    description: 'Diagnóstico de fallo en el motor',
    startDate: '2023-04-12T14:00:00Z',
    endDate: null,
    status: 'pending',
    cost: 200.00,
    notes: 'Vehículo presenta ruidos anormales al acelerar',
  },
  {
    id: 4,
    vehicleId: 4,
    description: 'Alineación y balanceo',
    startDate: '2023-04-08T11:30:00Z',
    endDate: '2023-04-08T13:45:00Z',
    status: 'delivered',
    cost: 120.00,
    notes: 'Se recomendó cambio de neumáticos en próxima visita',
  },
];