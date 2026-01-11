/**
**CONSIGNA:**
Este código tiene errores. Arreglalos.
 */

async function procesarArchivo() {
  const contenido = await leerArchivo('data.txt');
  const procesado = await transformar(contenido);
  return procesado;
}

function leerArchivo(nombre) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Contenido de ${nombre}`), 1000);
  });
}

function transformar(texto) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(texto.toUpperCase()), 500);
  });
}

procesarArchivo().then(console.log);


