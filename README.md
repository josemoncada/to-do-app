# GUÍA DE INSTALACIÓN

## 📋 Requisitos Previos

- Node.js >= 22.x
- npm >= 10.x
- PostgreSQL >= 17.x (o Docker)
- Docker y Docker Compose (opcional, recomendado)

## 🛠️ Instalación

### Opción 1: Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd to-do-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
# Application
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=usuario_base_datos
DB_PASSWORD=password_usuario
DB_DATABASE=nombre_base_datos

# JWT
JWT_SECRET=secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# API
API_PREFIX=/api
API_VERSION=v1
```

4. **Crear la base de datos**
```bash
# Conéctate a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE to_do_app_db;
\q
```

5. **Compilar TypeScript**
```bash
npm run build
```

6. **Ejecutar migraciones**
```bash
npm run migration:run
```

7. **Iniciar el servidor**
```bash
# Desarrollo (con hot-reload)
npm run dev

# Producción
npm run build
npm start
```

### Opción 2: Instalación con Docker (Recomendado)

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd to-do-app
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
```

3. **Levantar los servicios con Docker Compose V2**
```bash
docker compose up -d --build
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- API en el puerto 3000
- Ejecutará automáticamente las migraciones

4. **Ver logs**
```bash
docker compose logs -f api
```

5. **Detener los servicios**
```bash
docker compose down
```

6. **Detener y eliminar volúmenes (limpieza completa)**
```bash
docker compose down -v
```

## 📚 Documentación de la API

Una vez iniciado el servidor, la documentación interactiva de Swagger está disponible en:

```
http://localhost:3000/docs
```

### Health Check

```bash
curl http://localhost:3000/health
```

## 🔐 Endpoints de Autenticación

### 1. Registrar Usuario
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "José Moncada",
  "email": "jmoncada@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "uuid",
      "name": "José Moncada",
      "email": "jmoncada@example.com",
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "jmoncada@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Obtener Usuario Autenticado
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario autenticado",
  "data": {
    "id": "uuid",
    "name": "José Moncada",
    "email": "jmoncada@example.com",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z"
  }
}
```

## ✅ Endpoints de Tareas (Todo)

Todos los endpoints de tareas requieren autenticación (token JWT en el header Authorization).

### 1. Crear Tarea
```http
POST /api/v1/todo/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Completar proyecto",
  "priority": "alta"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Tarea creada exitosamente",
  "data": {
    "id": "uuid",
    "name": "Completar proyecto",
    "priority": "alta",
    "isCompleted": false,
    "userId": "uuid",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### 2. Actualizar Tarea
```http
PATCH /api/v1/todo/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Completar proyecto actualizado",
  "priority": "media",
  "isCompleted": true
}
```

### 3. Listar Tareas (con paginación y filtros)
```http
GET /api/v1/todo/list?page=1&limit=10&search=tarea&sortBy=createdAt&order=DESC&priority=baja&isCompleted=true
Authorization: Bearer <token>
```

**Parámetros de query:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Resultados por página (default: 10, max: 100)
- `search` (opcional): Filtrar por coincidencia por nombre de la tarea (baja, media, alta)
- `sortBy` (opcional): Campo para ordenar los datos (createdAt, updatedAt, name, priority, isCompleted)
- `order` (opcional): Orden de los datos por el campo elegido o default ( ASC, DESC)
- `priority` (opcional): Filtrar por prioridad (baja, media, alta)
- `isCompleted` (opcional): Filtrar por estado (true, false)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Lista de tareas",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 4. Obtener Tarea por ID
```http
GET /api/v1/todo/list/:id
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea encontrada",
  "data": {
    "id": "uuid",
    "name": "Proyecto finalizado",
    "priority": "alta",
    "isCompleted": true,
    "userId": "uuid",
    "createdAt": "2026-01-15T10:10:46.193Z",
    "updatedAt": "2026-01-15T10:10:46.193Z"
  }
}
```

### 5. Eliminar Tarea
```http
DELETE /api/v1/todo/list/:id
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Tarea eliminada exitosamente"
}
```

## 🗄️ Gestión de Migraciones

### Crear una nueva migración
```bash
npm run migration:create -- NombreDeLaMigracion
```

### Generar migración desde cambios en entidades
```bash
npm run migration:generate -- NombreDeLaMigracion
```

### Ejecutar migraciones pendientes
```bash
npm run migration:run
```

### Revertir última migración
```bash
npm run migration:revert
```

### Consulta estatus de la migración
```bash
npm run migration:show
```

## 📊 Códigos HTTP Utilizados

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error de validación o solicitud incorrecta
- `401 Unauthorized`: No autenticado o token inválido
- `403 Forbidden`: No tiene permisos para el recurso
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Conflicto (ej: email duplicado)
- `500 Internal Server Error`: Error del servidor

## 🐳 Comandos Docker Útiles

```bash
# Construir y levantar servicios
docker compose up -d --build

# Ver logs en tiempo real
docker compose logs -f

# Reiniciar un servicio específico
docker compose restart api

# Ejecutar comandos dentro del contenedor
docker compose exec api npm run migration:run

# Detener servicios
docker compose stop

# Eliminar contenedores y volúmenes
docker compose down -v
```
