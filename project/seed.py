from app import create_app, db
from app.models import Usuario, Cliente, Vehiculo, Reparacion
from datetime import datetime, timedelta

def seed_database():
    app = create_app()
    with app.app_context():
        # Recrear la base de datos
        db.drop_all()
        db.create_all()
        
        # Crear usuarios de prueba
        admin = Usuario(
            username='admin',
            email='admin@example.com',
            role='admin'
        )
        admin.set_password('password')
        
        mechanic = Usuario(
            username='mechanic',
            email='mechanic@example.com',
            role='mechanic'
        )
        mechanic.set_password('password')
        
        # Crear clientes de prueba
        cliente1 = Cliente(
            name='Juan Pérez',
            email='juan.perez@example.com',
            phone='555-123-4567',
            address='Calle Principal 123, Ciudad'
        )
        
        cliente2 = Cliente(
            name='María González',
            email='maria.gonzalez@example.com',
            phone='555-987-6543',
            address='Avenida Central 456, Ciudad'
        )
        
        # Crear vehículos de prueba
        vehiculo1 = Vehiculo(
            cliente=cliente1,
            make='Toyota',
            model='Corolla',
            year=2018,
            license_plate='ABC-123',
            vin='1HGCM82633A123456',
            color='Rojo'
        )
        
        vehiculo2 = Vehiculo(
            cliente=cliente2,
            make='Honda',
            model='Civic',
            year=2020,
            license_plate='XYZ-789',
            vin='2FMDK48C87BB12345',
            color='Azul'
        )
        
        # Crear reparaciones de prueba
        reparacion1 = Reparacion(
            vehiculo=vehiculo1,
            description='Cambio de aceite y filtro',
            start_date=datetime.utcnow() - timedelta(days=5),
            end_date=datetime.utcnow() - timedelta(days=4),
            status='completed',
            cost=150.00,
            notes='Cliente solicitó aceite sintético premium'
        )
        
        reparacion2 = Reparacion(
            vehiculo=vehiculo2,
            description='Revisión de frenos',
            start_date=datetime.utcnow() - timedelta(days=2),
            status='in_progress',
            cost=350.00
        )
        
        # Agregar todos los objetos a la sesión
        db.session.add_all([
            admin, mechanic,
            cliente1, cliente2,
            vehiculo1, vehiculo2,
            reparacion1, reparacion2
        ])
        
        # Guardar cambios
        db.session.commit()
        
        print('Base de datos poblada exitosamente')

if __name__ == '__main__':
    seed_database()