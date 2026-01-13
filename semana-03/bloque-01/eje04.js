/**
**CONSIGNA:**
Creá una función que intente obtener un usuario por ID.

Debe manejar:
1. Network errors (mostrar "Sin conexión")
2. 404 (mostrar "Usuario no encontrado")
3. Otros errores HTTP (mostrar el status)

**RESULTADO ESPERADO:**
```
// ID 1:
Usuario: Leanne Graham

// ID 999:
❌ Usuario no encontrado (404)
```
 */

async function obtenerUsuario(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    // Verificar response.ok
    // Si no ok → lanzar error según status
    if(!response.ok) {
      if(response.status == 404) {
        throw new Error(`Post ${id} no encontrado (404)`);
      } else if(response.status == 500) {
        throw new Error(`Error del servidor (500)`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const usuario = await response.json();
    console.log('Usuario:', usuario.name);
    return usuario;

  } catch (error) {
    // Manejar diferentes tipos de errores
    if(error.message.includes("Failed to fetch")) {
      console.error('❌ Error de red: Sin conexión a internet');
    } else if(error.message.includes("404")) {
      console.error("❌ Recurso no encontrado");
    } else {
      console.error('❌ Error:', error.message);
    }
    throw error;
  }
}

// Probar
obtenerUsuario(1);     // ✅ Debería funcionar
obtenerUsuario(999);   // ❌ 404

