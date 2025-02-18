# API RESTful para Blog Personal 📝

## Descripción 📖
Esta es una API RESTful simple para gestionar publicaciones de un blog personal. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) y utiliza autenticación JWT para proteger los endpoints. Ideal para proyectos personales o como base para aprender sobre desarrollo de APIs con Node.js y SQL Server.

## Características 🚀
✅ Creación y gestión de publicaciones 📢  
✅ Filtrado y obtención de posts por ID 🔍  
✅ Actualización y eliminación con **soft delete** 🗑️  
✅ Seguridad mediante autenticación JWT 🔐  

## Tecnologías utilizadas 🛠️
- **Node.js** + Express.js
- **SQL Server** (Base de datos)
- **JWT (JSON Web Tokens)** para autenticación
- **MSSQL** (módulo para conexión con SQL Server)

## Instalación 🔧
### 1️⃣ Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 2️⃣ Instalar dependencias:
```bash
npm install
```

### 3️⃣ Configurar las variables de entorno:
Crea un archivo **.env** en la raíz del proyecto y define las siguientes variables:
```env
PORT=5000
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_SERVER=localhost
DB_DATABASE=nombre_de_tu_base_de_datos
JWT_SECRET=tu_clave_secreta
```

### 4️⃣ Iniciar el servidor:
```bash
npm start
```
El servidor estará corriendo en `http://localhost:5000` 🚀

## Endpoints 📌
### 🔹 Autenticación (JWT)
- **`POST /auth/register`** → Registro de usuario
- **`POST /auth/login`** → Inicio de sesión

### 🔹 Publicaciones (Posts)
- **`GET /posts`** → Obtener todas las publicaciones
- **`GET /posts/:id`** → Obtener una publicación por ID
- **`POST /posts`** → Crear una nueva publicación (requiere autenticación)
- **`PUT /posts/:id`** → Actualizar una publicación existente (requiere autenticación)
- **`DELETE /posts/:id`** → Eliminar una publicación (soft delete, requiere autenticación)

## Ejemplo de solicitud para crear un post 📬
```json
{
  "title": "Mi primer post",
  "content": "Este es el contenido de mi post",
  "author": "Nahuel",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}
```

## Contribución 🤝
Si deseas contribuir, ¡eres bienvenido! Puedes hacer un **fork** del proyecto y enviar un **pull request** con mejoras o correcciones. 😊

## Licencia 📜
Este proyecto está bajo la licencia MIT. ¡Úsalo como quieras! 😃

