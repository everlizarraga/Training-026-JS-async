/**
**CONSIGNA:**
Hacé un request con headers custom simulando autenticación.

Headers a incluir:
- Content-Type: application/json
- Authorization: Bearer token-abc-123
- Accept: application/json

URL: `https://jsonplaceholder.typicode.com/posts/1`
 */

async function obtenerConAuth() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
      headers: {
        // Tus headers aquí
        "Content-Type": "application/json",
        "Authorization": "Bearer token-abc-123",
        "Accept": "application/json"
      }
    });

    const datos = await response.json();
    console.log('Datos:', datos);

  } catch (error) {
    console.error('Error:', error);
  }
}

obtenerConAuth();

