/**
**CONSIGNA:**
Implementá una función que reintente fetch hasta 3 veces.

Entre cada intento, esperar 1 segundo.

Si después de 3 intentos falla → lanzar error final

**RESULTADO ESPERADO:**
```
Intento 1...
❌ Falló
Esperando 1s...
Intento 2...
❌ Falló
Esperando 1s...
Intento 3...
❌ Falló
Error: Todos los intentos fallaron
```
 */

async function fetchConRetry(url, maxRetries = 3) {
  let lastError;
  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`Intento ${i}...`);

      // Tu fetch aquí
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log(`✅ Exito: ${data}`);
      return data;
    } catch (error) {
      // Manejar error y decidir si reintentar
      lastError = error;
      console.log(`❌ Falló: ${error.message}`);
      if(i < maxRetries) {
        const delay = 1000;
        console.log(`Esperando ${delay}ms antes de reintentar...`);
        await new Promise(resolve => {setTimeout(resolve, delay)})
      }
    }
  }

  // Si llegó acá → todos fallaron
  console.error('❌ Todos los intentos fallaron')
  throw new Error('Todos los intentos fallaron');
}

// Probar
fetchConRetry('https://jsonplaceholder.typicode.com/users/999');



