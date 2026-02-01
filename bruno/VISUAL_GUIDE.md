# 🖼️ Guía Visual de Bruno - Spring JWT Sample API

Esta guía muestra paso a paso cómo usar Bruno para probar la API de autenticación JWT.

## 📂 1. Vista de la Colección

![Colección Bruno](file:///C:/Users/Lap-Xime/.gemini/antigravity/brain/ae47b681-e45a-48bf-bff8-c329b5d5abef/bruno_collection_view_1769925673933.png)

La colección contiene dos carpetas principales:
- **Auth**: Requests de registro y login
- **Users**: Endpoints protegidos (Get Profile)

---

## ✅ 2. Ejecutar Registro de Usuario

Ejecuta el request **"Register User"** para crear un nuevo usuario.

**Respuesta Exitosa:**

![Respuesta de Registro](file:///C:/Users/Lap-Xime/.gemini/antigravity/brain/ae47b681-e45a-48bf-bff8-c329b5d5abef/bruno_register_response_1769925688829.png)

✨ **Importante**: 
- Status: **200 OK** (verde)
- La respuesta incluye el **token JWT**
- En la consola verás: `✅ Token guardado`

---

## 🔧 3. Verificar Variables de Entorno

Ve a **Environments → Local** para verificar que el token se guardó automáticamente:

![Variables de Entorno](file:///C:/Users/Lap-Xime/.gemini/antigravity/brain/ae47b681-e45a-48bf-bff8-c329b5d5abef/bruno_environment_vars_1769925702477.png)

Deberías ver:
- `baseUrl`: `http://localhost:8080`
- `token`: El JWT completo (comienza con `eyJ...`)

---

## 🔐 4. Configurar Request Protegido

El request **"Get User Profile"** usa el token en el header Authorization:

![Request Get Profile](file:///C:/Users/Lap-Xime/.gemini/antigravity/brain/ae47b681-e45a-48bf-bff8-c329b5d5abef/bruno_get_profile_request_1769925715897.png)

**Headers configurados:**
- `Authorization: Bearer {{token}}`
- `Content-Type: application/json`

El token se inserta automáticamente desde las variables de entorno.

---

## 🎉 5. Respuesta Exitosa del Perfil

Al ejecutar **"Get User Profile"**, obtendrás tu información de usuario:

![Perfil Exitoso](file:///C:/Users/Lap-Xime/.gemini/antigravity/brain/ae47b681-e45a-48bf-bff8-c329b5d5abef/bruno_profile_success_1769925730159.png)

**Resultado:**
- Status: **200 OK** (verde)
- Datos del usuario: id, username, email, role, createdAt
- Tests: **Todos pasan** ✅

---

## 📋 Flujo de Prueba Completo

### Paso 1: Registro
```
POST /api/auth/register
→ Respuesta: 200 OK + token
→ Token guardado automáticamente en {{token}}
```

### Paso 2: Verificar Token
```
Environments → Local
→ Confirmar que existe la variable "token"
```

### Paso 3: Obtener Perfil
```
GET /api/users/profile
→ Header: Authorization: Bearer {{token}}
→ Respuesta: 200 OK + datos del usuario
```

---

## 🐛 Solución de Problemas

### Error 403 Forbidden en Get Profile

Si obtienes 403, verifica:

1. **El token se guardó?**
   - Ve a Environments → Local
   - Variable `token` debe tener un valor

2. **El header está correcto?**
   - Debe ser: `Authorization: Bearer {{token}}`
   - O el token completo si no funciona la variable

3. **El servidor está corriendo?**
   ```bash
   mvn spring-boot:run
   ```

### El token no se guarda automáticamente

**Solución manual:**
1. Copia el token de la respuesta de Register/Login
2. Ve a Environments → Local
3. Pega el valor en la variable `token`
4. Ejecuta Get Profile nuevamente

---

## ✨ Tips

- 💡 El token expira en 24 horas (configurable en `application.properties`)
- 🔄 Puedes ejecutar Login nuevamente para obtener un nuevo token
- 📝 Los tests se ejecutan automáticamente después de cada request
- 🎯 Usa la pestaña "Tests" para ver los resultados

¡Listo! Ahora puedes probar toda la API de autenticación JWT con Bruno. 🚀
