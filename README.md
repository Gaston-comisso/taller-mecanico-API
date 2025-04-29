
# Proyecto Taller Mecánico API

Bienvenido al repositorio de la API del **Taller Mecánico**, una aplicación que gestiona clientes, vehículos y reparaciones en un taller mecánico.

[Visita el sitio web aquí](https://taller-mecanico-api-1.onrender.com/)

## Descripción

Este proyecto es una API construida con **Flask** que permite gestionar la información de clientes, vehículos y reparaciones. Está diseñada para ser usada como backend para una aplicación web o móvil. La API se conecta a una base de datos MySQL y ofrece endpoints para realizar operaciones CRUD.

## Tecnologías utilizadas

- **Backend**: Flask (Python)
- **Base de datos**: MySQL
- **Autenticación**: JWT
- **Frontend**: React (si se desea usar en conjunto con este backend)
- **CORS**: Para permitir el acceso desde diferentes dominios.

## Instalación

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- Python 3.7+
- MySQL
- Node.js y npm (si vas a trabajar también con el frontend)

### Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Gaston-comisso/taller-mecanico-API.git
   ```

2. Ve a la carpeta del backend:
   ```bash
   cd taller-mecanico-API/project
   ```

3. Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows usa `venv\Scriptsctivate`
   ```

4. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

5. Configura tu base de datos en `config.py` o usa variables de entorno. Ejemplo de `.env`:

   ```
   DATABASE_URL=mysql+pymysql://usuario:contraseña@localhost/nombre_base_de_datos
   JWT_SECRET_KEY=tu_clave_secreta
   ```

7. Ejecuta el servidor:
   ```bash
   flask run
   ```

### Frontend

2. Instala las dependencias de React:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo de React:
   ```bash
   npm run dev
   ```
