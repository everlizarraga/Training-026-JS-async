/**
**CONSIGNA:**
Creá una función `async` llamada `descargarArchivo()` que:
1. Imprima "Descargando..."
2. Espere 3 segundos (usando la función `esperar()` del ejemplo)
3. Imprima "Descarga completa"
4. Retorne el string "archivo.pdf"
 */

// Función auxiliar (copiá del ejemplo)
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

// Tu función async aquí
async function descargarArchivo() {
  // Tu código
  console.log("Descargando...");
  await esperar(3000);
  console.log("Descarga completa");
  return "archivo.pdf"
}

// Llamarla
descargarArchivo().then((archivo) => console.log(`Archivo: ${archivo}`));

