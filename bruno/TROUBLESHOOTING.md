# 🔧 Solución al Error 403 Forbidden

## Problema
El endpoint "Get User Profile" retorna 403 Forbidden.

## Causa
El token JWT no se está enviando correctamente en el header Authorization.

## Solución Aplicada

He actualizado el archivo `Get Profile.bru` para enviar el token correctamente en el header.

## ✅ Pasos para Probar

### 1. Ejecutar Register o Login
Primero debes obtener un token:
- Ejecuta el request **"Register User"** O **"Login User"**
- Verifica en la consola de Bruno que aparezca: `✅ Token guardado: eyJhbGc...`

### 2. Verificar que el Token se Guardó
En Bruno:
1. Ve a **Environments** → **Local**
2. Verifica que la variable `token` tenga un valor (el JWT)
3. Si está vacía, el script post-response no funcionó

### 3. Opción Manual (Si el Token no se Guardó Automáticamente)
Si el token no se guardó automáticamente:

1. **Después de Register/Login**, copia el token de la respuesta
2. **Abre el request "Get Profile"**
3. **En la pestaña Headers**, el header Authorization debería verse así:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWI...
   ```
4. **Reemplaza `{{token}}`** con el token completo:
   ```
   Authorization: Bearer TU_TOKEN_AQUI
   ```

### 4. Ejecutar Get Profile
Ahora ejecuta el request **"Get User Profile"**:
- ✅ **200 OK**: Funciona correctamente, verás tu perfil
- ❌ **403 Forbidden**: El token no se está enviando o es inválido

## 🐛 Debugging

Si aún tienes 403:

1. **Verifica que el servidor esté corriendo**:
   ```bash
   mvn spring-boot:run
   ```

2. **Verifica el header en Bruno**:
   - Pestaña "Headers" del request
   - Debe tener: `Authorization: Bearer <token>`
   - El token debe empezar con `eyJ...`

3. **Verifica el token en la respuesta de Login/Register**:
   - Debe haber un campo `"token": "eyJ..."`
   - Copia ese valor completo

4. **Prueba manual**:
   - En el header Authorization, reemplaza `{{token}}` con el valor real
   - Ejemplo: `Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlhdCI6MTcwNjc0ODAwMCwiZXhwIjoxNzA2ODM0NDAwfQ.abcdef123456...`

## ✨ Alternativa: Usar Hardcoded Token (Para Pruebas)

Si quieres probar rápidamente:

1. Ejecuta Register/Login desde el navegador en `http://localhost:8080`
2. Abre DevTools → Application → LocalStorage
3. Copia el valor de `jwtToken`
4. Pégalo directamente en el header de Bruno

¡Esto debería resolver el problema! 🚀
