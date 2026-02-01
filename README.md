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

## 📊 Diagramas UML

### Diagrama de Clases - Modelo de Dominio

```mermaid
classDiagram
    class User {
        -Long id
        -String username
        -String email
        -String password
        -String role
        -LocalDateTime createdAt
        -LocalDateTime updatedAt
        +getId()
        +getUsername()
        +getEmail()
    }
    
    class UserRepository {
        <<interface>>
        +findByUsername(String) Optional~User~
        +existsByUsername(String) Boolean
        +existsByEmail(String) Boolean
    }
    
    class UserDetailsServiceImpl {
        -UserRepository userRepository
        +loadUserByUsername(String) UserDetails
    }
    
    class JwtUtil {
        -String secret
        -Long expiration
        +generateToken(UserDetails) String
        +validateToken(String, UserDetails) Boolean
        +extractUsername(String) String
        +extractExpiration(String) Date
    }
    
    class AuthController {
        -AuthenticationManager authManager
        -UserRepository userRepository
        -PasswordEncoder passwordEncoder
        -JwtUtil jwtUtil
        +registerUser(RegisterRequest) ResponseEntity
        +loginUser(LoginRequest) ResponseEntity
    }
    
    class UserController {
        -UserRepository userRepository
        +getUserProfile() ResponseEntity
    }
    
    class SecurityConfig {
        -JwtAuthenticationFilter jwtAuthFilter
        -UserDetailsService userDetailsService
        +securityFilterChain(HttpSecurity) SecurityFilterChain
        +passwordEncoder() PasswordEncoder
    }
    
    class JwtAuthenticationFilter {
        -JwtUtil jwtUtil
        -UserDetailsService userDetailsService
        +doFilterInternal(HttpServletRequest, HttpServletResponse, FilterChain)
    }
    
    UserRepository <|.. UserDetailsServiceImpl : implements
    UserDetailsServiceImpl --> User : uses
    AuthController --> UserRepository : uses
    AuthController --> JwtUtil : uses
    UserController --> UserRepository : uses
    JwtAuthenticationFilter --> JwtUtil : uses
    JwtAuthenticationFilter --> UserDetailsService : uses
    SecurityConfig --> JwtAuthenticationFilter : configures
```

### Diagrama de Secuencia - Registro de Usuario

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend
    participant AuthController
    participant UserRepository
    participant PasswordEncoder
    participant JwtUtil
    participant Database
    
    Usuario->>Frontend: Ingresa datos de registro
    Frontend->>AuthController: POST /api/auth/register
    AuthController->>UserRepository: existsByUsername(username)
    UserRepository->>Database: SELECT * FROM users WHERE username=?
    Database-->>UserRepository: No existe
    UserRepository-->>AuthController: false
    
    AuthController->>UserRepository: existsByEmail(email)
    UserRepository->>Database: SELECT * FROM users WHERE email=?
    Database-->>UserRepository: No existe
    UserRepository-->>AuthController: false
    
    AuthController->>PasswordEncoder: encode(password)
    PasswordEncoder-->>AuthController: hashedPassword
    
    AuthController->>UserRepository: save(user)
    UserRepository->>Database: INSERT INTO users...
    Database-->>UserRepository: User guardado
    UserRepository-->>AuthController: User
    
    AuthController->>JwtUtil: generateToken(userDetails)
    JwtUtil-->>AuthController: JWT Token
    
    AuthController-->>Frontend: 200 OK {token, username, email}
    Frontend->>Frontend: localStorage.setItem("jwtToken", token)
    Frontend-->>Usuario: Redirige a Dashboard
```

### Diagrama de Secuencia - Login de Usuario

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend
    participant AuthController
    participant AuthManager
    participant UserDetailsService
    participant UserRepository
    participant JwtUtil
    participant Database
    
    Usuario->>Frontend: Ingresa credenciales
    Frontend->>AuthController: POST /api/auth/login
    AuthController->>AuthManager: authenticate(username, password)
    AuthManager->>UserDetailsService: loadUserByUsername(username)
    UserDetailsService->>UserRepository: findByUsername(username)
    UserRepository->>Database: SELECT * FROM users WHERE username=?
    Database-->>UserRepository: User
    UserRepository-->>UserDetailsService: Optional[User]
    UserDetailsService-->>AuthManager: UserDetails
    
    AuthManager->>AuthManager: Verifica password con BCrypt
    alt Password correcto
        AuthManager-->>AuthController: Authentication
        AuthController->>JwtUtil: generateToken(userDetails)
        JwtUtil-->>AuthController: JWT Token
        AuthController->>UserRepository: findByUsername(username)
        UserRepository-->>AuthController: User
        AuthController-->>Frontend: 200 OK {token, username, email}
        Frontend->>Frontend: localStorage.setItem("jwtToken", token)
        Frontend-->>Usuario: Redirige a Dashboard
    else Password incorrecto
        AuthManager-->>AuthController: BadCredentialsException
        AuthController-->>Frontend: 401 Unauthorized
        Frontend-->>Usuario: Muestra error
    end
```

### Diagrama de Secuencia - Acceso a Endpoint Protegido

```mermaid
sequenceDiagram
    actor Usuario
    participant Frontend
    participant JwtAuthFilter
    participant JwtUtil
    participant UserDetailsService
    participant UserController
    participant UserRepository
    participant Database
    
    Usuario->>Frontend: Accede a Dashboard
    Frontend->>Frontend: token = localStorage.getItem("jwtToken")
    Frontend->>UserController: GET /api/users/profile<br/>Authorization: Bearer {token}
    
    Note over JwtAuthFilter: Intercepta la petición
    JwtAuthFilter->>JwtAuthFilter: Extrae token del header
    JwtAuthFilter->>JwtUtil: extractUsername(token)
    JwtUtil-->>JwtAuthFilter: username
    
    JwtAuthFilter->>UserDetailsService: loadUserByUsername(username)
    UserDetailsService-->>JwtAuthFilter: UserDetails
    
    JwtAuthFilter->>JwtUtil: validateToken(token, userDetails)
    JwtUtil->>JwtUtil: Verifica firma y expiración
    JwtUtil-->>JwtAuthFilter: true
    
    JwtAuthFilter->>JwtAuthFilter: Set Authentication in SecurityContext
    JwtAuthFilter-->>UserController: Continúa con la petición
    
    UserController->>UserRepository: findByUsername(username)
    UserRepository->>Database: SELECT * FROM users WHERE username=?
    Database-->>UserRepository: User
    UserRepository-->>UserController: Optional[User]
    
    UserController-->>Frontend: 200 OK {id, username, email, role, createdAt}
    Frontend-->>Usuario: Muestra perfil en Dashboard
```

### Diagrama de Componentes - Arquitectura General

```mermaid
graph TB
    subgraph "Frontend (Static Resources)"
        HTML[index.html / dashboard.html]
        CSS[style.css]
        JS[app.js / dashboard.js]
    end
    
    subgraph "Spring Boot Application"
        subgraph "Presentation Layer"
            AuthCtrl[AuthController]
            UserCtrl[UserController]
        end
        
        subgraph "Security Layer"
            SecConfig[SecurityConfig]
            JwtFilter[JwtAuthenticationFilter]
            JwtUtil[JwtUtil]
        end
        
        subgraph "Service Layer"
            UserDetailsServ[UserDetailsServiceImpl]
        end
        
        subgraph "Data Access Layer"
            UserRepo[UserRepository]
        end
        
        subgraph "Domain Layer"
            UserEntity[User Entity]
            DTOs[DTOs: LoginRequest<br/>RegisterRequest<br/>AuthResponse]
        end
    end
    
    subgraph "Database"
        H2[(H2 In-Memory DB)]
    end
    
    HTML -->|HTTP Requests| AuthCtrl
    HTML -->|HTTP Requests| UserCtrl
    JS -->|JWT Token| JwtFilter
    
    AuthCtrl --> UserRepo
    AuthCtrl --> JwtUtil
    UserCtrl --> UserRepo
    
    JwtFilter --> JwtUtil
    JwtFilter --> UserDetailsServ
    SecConfig --> JwtFilter
    
    UserDetailsServ --> UserRepo
    UserRepo --> H2
    
    AuthCtrl -.->|uses| DTOs
    UserCtrl -.->|uses| DTOs
    UserRepo -.->|manages| UserEntity
    
    style HTML fill:#667eea
    style CSS fill:#764ba2
    style JS fill:#f093fb
    style H2 fill:#10b981
    style JwtFilter fill:#ef4444
    style JwtUtil fill:#f59e0b
```

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
