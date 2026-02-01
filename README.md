# 🔐 Spring Boot JWT Authentication Sample

Una aplicación completa de ejemplo que demuestra la autenticación JWT con Spring Boot y un frontend moderno y llamativo.

## ✨ Características

- 🔒 **Autenticación JWT segura** - Tokens basados en estándares de la industria
- 🎨 **Frontend moderno** - Diseño glassmorphism con gradientes vibrantes
- 🚀 **Spring Boot 3** - Framework moderno con Spring Security 6
- 💾 **Base de datos H2** - Base de datos en memoria para desarrollo rápido
- 📱 **Diseño responsive** - Funciona en cualquier dispositivo
- ✅ **Validación completa** - Validación de formularios y manejo de errores

## 🛠️ Tecnologías Utilizadas

### Backend
- Spring Boot 3.2.1
- Spring Security 6
- Spring Data JPA
- JWT (jjwt 0.12.3)
- H2 Database
- Lombok
- Maven

### Frontend
- HTML5
- CSS3 (Glassmorphism, Gradientes, Animaciones)
- JavaScript (Vanilla)
- Google Fonts (Poppins)

## 📋 Requisitos Previos

- Java 17 o superior
- Maven 3.6 o superior

## 🚀 Cómo Ejecutar

1. **Clonar el repositorio** (si aplica):
   ```bash
   git clone <repository-url>
   cd spring-jwt-sample
   ```

2. **Compilar el proyecto**:
   ```bash
   mvn clean install
   ```

3. **Ejecutar la aplicación**:
   ```bash
   mvn spring-boot:run
   ```

4. **Acceder a la aplicación**:
   Abrir el navegador en: `http://localhost:8080`

## 📡 API Endpoints

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario",
  "email": "usuario@email.com",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "usuario",
  "email": "usuario@email.com"
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "usuario",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "usuario",
  "email": "usuario@email.com"
}
```

### Endpoints Protegidos

#### Obtener Perfil de Usuario
```http
GET /api/users/profile
Authorization: Bearer {token}
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "username": "usuario",
  "email": "usuario@email.com",
  "role": "ROLE_USER",
  "createdAt": "2024-01-31T22:30:00"
}
```

## 🎯 Flujo de Autenticación JWT

1. **Registro/Login**: El usuario envía credenciales al backend
2. **Generación de Token**: El servidor valida las credenciales y genera un JWT
3. **Almacenamiento**: El frontend guarda el token en localStorage
4. **Autenticación**: Para cada petición a endpoints protegidos, el frontend incluye el token en el header `Authorization: Bearer {token}`
5. **Validación**: El servidor valida el token en cada petición
6. **Acceso**: Si el token es válido, se permite el acceso al recurso

## 🗄️ Estructura del Proyecto

```
spring-jwt-sample/
├── src/
│   ├── main/
│   │   ├── java/com/example/jwt/
│   │   │   ├── config/          # Configuración de Spring Security y JWT
│   │   │   ├── controller/      # Controladores REST
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # Entidades JPA
│   │   │   ├── repository/      # Repositorios JPA
│   │   │   ├── service/         # Servicios de negocio
│   │   │   ├── util/            # Utilidades JWT
│   │   │   └── SpringJwtApplication.java
│   │   └── resources/
│   │       ├── static/          # Frontend (HTML, CSS, JS)
│   │       └── application.properties
├── pom.xml
└── README.md
```

## 🎨 Características del Frontend

- **Glassmorphism**: Efectos de vidrio esmerilado modernos
- **Gradientes Vibrantes**: Colores púrpura, azul y rosa
- **Animaciones Suaves**: Transiciones y efectos hover
- **Formularios Tabbed**: Cambio fluido entre login y registro
- **Validación en Tiempo Real**: Retroalimentación inmediata al usuario
- **Diseño Responsive**: Adaptable a móviles y tablets

## 🔐 Seguridad

- Contraseñas encriptadas con BCrypt
- Tokens JWT firmados con HS256
- Validación de tokens en cada petición
- CORS configurado para peticiones cross-origin
- Sesiones stateless (sin estado en servidor)
- Expiración de tokens (24 horas por defecto)

## 🐛 Debugging

Para acceder a la consola H2 durante el desarrollo:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:jwtdb`
- Username: `sa`
- Password: (dejar vacío)

## 📝 Configuración

Las propiedades principales se encuentran en `application.properties`:

- `jwt.secret`: Clave secreta para firmar tokens
- `jwt.expiration`: Tiempo de expiración del token en ms (86400000 = 24 horas)
- `server.port`: Puerto del servidor (8080 por defecto)

## 🤝 Contribuciones

Este es un proyecto de ejemplo educativo. Siéntete libre de usarlo como base para tus proyectos.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Desarrollado con ❤️ usando Spring Boot y JWT**

Prueba con JWT
