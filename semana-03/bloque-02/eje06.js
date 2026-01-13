/**
**CONSIGNA:**
Hacé 3 requests en paralelo:
1. Obtener usuario ID 1
2. Obtener usuario ID 2
3. Obtener usuario ID 3

Mostrá los 3 nombres y el tiempo total.

URL: `https://jsonplaceholder.typicode.com/users/{id}`

**RESULTADO ESPERADO:**
```
Usuario 1: Leanne Graham
Usuario 2: Ervin Howell
Usuario 3: Clementine Bauch
Tiempo total: 0.8s
```
 */

async function fetchSeguro(url) {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
  return response.json();
}

async function obtenerTresUsuarios() {
  const inicio = Date.now();

  try {
    // Tu Promise.all aquí
    const [user1, user2, user3] = await Promise.all([
      fetchSeguro(`https://jsonplaceholder.typicode.com/users/1`),
      fetchSeguro(`https://jsonplaceholder.typicode.com/users/2`),
      fetchSeguro(`https://jsonplaceholder.typicode.com/users/3`)
    ]);
    console.log(`Usuario 1: ${user1.name}`);
    console.log(`Usuario 2: ${user2.name}`);
    console.log(`Usuario 3: ${user3.name}`);
    const duracion = ((Date.now() - inicio) / 1000).toFixed(2);
    console.log(`Tiempo total: ${duracion}s`);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

obtenerTresUsuarios();


