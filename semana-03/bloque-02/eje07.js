/**
**CONSIGNA:**
Hacé 3 requests a diferentes endpoints y mostrá cuál completa primero.

URLs:
- `https://jsonplaceholder.typicode.com/users/1`
- `https://jsonplaceholder.typicode.com/posts/1`
- `https://jsonplaceholder.typicode.com/comments/1`

**RESULTADO ESPERADO:**
```
Primera respuesta: { id: 1, name: "..." } (o el que responda primero)
```
 */

async function primeraAPIEnResponder() {
  const time = Date.now();
  try {
    const primero = await Promise.race([
      // Tus fetches aquí
      fetch(`https://jsonplaceholder.typicode.com/users/1`).then((response) => {
        if(!response.ok) {
          throw new Error(`HTTP ${response.status}: https://jsonplaceholder.typicode.com/users/1`);
        }
        return response.json();
      }),
      fetch(`https://jsonplaceholder.typicode.com/posts/1`).then((response) => {
        if(!response.ok) {
          throw new Error(`HTTP ${response.status}: https://jsonplaceholder.typicode.com/posts/1`);
        }
        return response.json();
      }),
      fetch(`https://jsonplaceholder.typicode.com/comments/1`).then((response) => {
        if(!response.ok) {
          throw new Error(`HTTP ${response.status}: https://jsonplaceholder.typicode.com/comments/1`);
        }
        return response.json();
      }),
    ]);
    const duracion = (Date.now() - time)/ 100;
    console.log('Primera respuesta:', primero);
    console.log(`Duracion: ${duracion}s`);

  } catch (error) {
    console.error('Error:', error);
  }
}

primeraAPIEnResponder();

