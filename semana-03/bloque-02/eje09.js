/**
**CONSIGNA:**
Simulá 3 servidores con diferentes tiempos de respuesta.
Algunos fallan, uno tiene éxito.

Usá Promise.any() para obtener el primero exitoso.

**RESULTADO ESPERADO:**
```
Datos obtenidos: Datos del servidor 2
```
 */

async function obtenerDePrimerServidorExitoso() {
  try {
    // Simular servidores
    const servidor1 = new Promise((resolve, reject) =>
      setTimeout(() => reject('Servidor 1 caído'), 1000)
    );

    const servidor2 = new Promise((resolve, reject) =>
      setTimeout(() => resolve('Datos del servidor 2'), 2000)
    );

    const servidor3 = new Promise((resolve, reject) =>
      setTimeout(() => reject('Servidor 3 caído'), 500)
    );

    const datos = await Promise.any([servidor1, servidor2, servidor3]);

    console.log('Datos obtenidos:', datos);

  } catch (error) {
    console.log('Todos fallaron');
  }
}

obtenerDePrimerServidorExitoso();
