/**
**CONSIGNA:**
Creá un fetch que se cancele automáticamente después de 3 segundos.

Si completa antes de 3s → mostrar datos  
Si tarda más de 3s → cancelar y mostrar mensaje

**RESULTADO ESPERADO:**
```
// Si completa rápido:
Datos: 100

// Si tarda más de 3s:
Request cancelado por timeout
```
 */

async function fetchConCancelacion() {
  const controller = new AbortController();

  // Cancelar después de 3 segundos
  const timeout = setTimeout(() => {
    // Tu código aquí
    controller.abort();
  }, 3000);

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      // Tu código aquí
      signal: controller.signal
    });
    clearTimeout(timeout);

    const datos = await response.json();
    console.log('Datos:', datos.length);

  } catch (error) {
    // Verificar si fue AbortError
    if(error.name == "AbortError") {
      console.log('❌ Request cancelado por timeout');
    } else {
      console.error('❌ Error:', error);
    }
  }
}

fetchConCancelacion();

