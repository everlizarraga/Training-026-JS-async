/**
**CONSIGNA:**
Creá una función `async` llamada `conectarAPI()` que:
1. Intente llamar a `fetchDatos()` (función proporcionada abajo)
2. Si tiene éxito: imprima "Datos recibidos: [resultado]"
3. Si falla: imprima "Error al conectar: [error]"
4. Siempre retorne un objeto: `{ success: true/false, data: resultado o null }`
 */

// Función que simula API (50% de fallar)
function fetchDatos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5;
      if (exito) {
        resolve({ usuarios: 10, posts: 50 });
      } else {
        reject('Error de red');
      }
    }, 1500);
  });
}

// Tu función async aquí
async function conectarAPI() {
  // Tu código con try/catch
  try {
    const result = await fetchDatos();
    console.log("Datos recibidos:", result);
    return {success: true, data: result};
  } catch (error) {
    console.log("Error al conectar:", error);
    return {success: false, data: null};
  }
}

// Llamarla
conectarAPI().then((resultado) => console.log('Resultado final:', resultado));


