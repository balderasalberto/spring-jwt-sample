# 🧪 Documentación de Pruebas con Bruno

## Archivo creados

Se han creado los siguientes archivos para Bruno API Client:

### Colección completa en `/bruno`
- `bruno.json` - Configuración de la colección  
- `environments/Local.bru` - Variables de entorno (baseUrl, token)
- `Auth/Register.bru` - Request de registro con auto-save del token
- `Auth/Login.bru` - Request de login con auto-save del token
- `Users/Get Profile.bru` - Request protegido que usa el token

## Características

✅ **Auto-save de tokens**: Los requests de login/register guardan automáticamente el token JWT  
✅ **Tests incluidos**: Cada request tiene tests automatizados  
✅ **Variables de entorno**: Usa `{{baseUrl}}` y `{{token}}` para facilitar las pruebas  
✅ **Documentación inline**: Cada request incluye documentación de uso  

## Cómo usar

1. Abrir Bruno
2. Clic en "Open Collection"
3. Seleccionar la carpeta `bruno/` del proyecto
4. Ejecutar requests en orden: Register → Get Profile → Login → Get Profile

¡Todo listo para probar la API!
