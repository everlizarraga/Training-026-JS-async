/**
**CONSIGNA:**
Implementá una función que haga fetch con timeout de 2 segundos.

Si completa antes de 2s → retornar datos  
Si tarda más de 2s → lanzar error "Timeout"

**RESULTADO ESPERADO:**
```
// Si completa rápido:
Completado: { id: 1, name: "..." }

// Si tarda mucho:
Error: Timeout: Request tardó más de 2000ms
```
 */

async function fetchConTimeout(url, timeout) {
  const fetchPromise = fetch(url).then(r => r.json());
  let temporizador;

  const timeoutPromise = new Promise((resolve, reject) => {
    // Tu código del timeout aquí
    temporizador = setTimeout(() => {
      reject(`Timeout: Request tardó más de ${timeout}ms`);
    }, timeout);
  });

  try {
    const resultado = await Promise.race([fetchPromise, timeoutPromise]);
    clearTimeout(temporizador);
    console.log('Completado:', resultado);
    return resultado;

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Probar
fetchConTimeout('https://jsonplaceholder.typicode.com/users/1', 2000);

