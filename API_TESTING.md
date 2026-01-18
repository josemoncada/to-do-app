# Scripts útiles para testing de la API

## 1. Health Check
```bash
curl http://localhost:3000/health
```

## 2. Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "José Quevedo",
    "email": "jose@example.com",
    "password": "password123"
  }'
```

## 3. Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jose@example.com",
    "password": "password123"
  }'
```

## 4. Obtener usuario autenticado (reemplazar TOKEN)
```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 5. Crear tarea (reemplazar TOKEN)
```bash
curl -X POST http://localhost:3000/api/v1/todo/create \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Terminar el proyecto Fastify",
    "prioridad": "alta"
  }'
```

## 6. Listar tareas (reemplazar TOKEN)
```bash
curl -X GET "http://localhost:3000/api/v1/todo/list?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 7. Listar tareas con filtros (reemplazar TOKEN)
```bash
curl -X GET "http://localhost:3000/api/v1/todo/list?page=1&limit=10&prioridad=alta&finalizada=false" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 8. Obtener tarea por ID (reemplazar TOKEN y TODO_ID)
```bash
curl -X GET http://localhost:3000/api/v1/todo/list/TODO_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 9. Actualizar tarea (reemplazar TOKEN y TODO_ID)
```bash
curl -X PATCH http://localhost:3000/api/v1/todo/update/TODO_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tarea actualizada",
    "prioridad": "media",
    "finalizada": true
  }'
```

## 10. Eliminar tarea (reemplazar TOKEN y TODO_ID)
```bash
curl -X DELETE http://localhost:3000/api/v1/todo/list/TODO_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing con archivo .http (REST Client para VS Code)

Crea un archivo `test.http` con el siguiente contenido:

```http
### Variables
@baseUrl = http://localhost:3000/api/v1
@token = your-token-here

### Health Check
GET http://localhost:3000/health

### Register User
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "nombre": "José Quevedo",
  "email": "jose@example.com",
  "password": "password123"
}

### Login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "jose@example.com",
  "password": "password123"
}

### Get Me
GET {{baseUrl}}/auth/me
Authorization: Bearer {{token}}

### Create Todo
POST {{baseUrl}}/todo/create
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "nombre": "Completar documentación",
  "prioridad": "alta"
}

### List Todos
GET {{baseUrl}}/todo/list?page=1&limit=10
Authorization: Bearer {{token}}

### List Todos with filters
GET {{baseUrl}}/todo/list?page=1&limit=10&prioridad=alta&finalizada=false
Authorization: Bearer {{token}}

### Get Todo by ID
GET {{baseUrl}}/todo/list/{{todoId}}
Authorization: Bearer {{token}}

### Update Todo
PATCH {{baseUrl}}/todo/update/{{todoId}}
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "nombre": "Tarea actualizada",
  "finalizada": true
}

### Delete Todo
DELETE {{baseUrl}}/todo/list/{{todoId}}
Authorization: Bearer {{token}}
```
