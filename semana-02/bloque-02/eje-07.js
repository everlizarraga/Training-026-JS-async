/**
**CONSIGNA:**
Tenés 3 funciones que simulan descargas. Ejecutalas EN PARALELO y mostrá:
1. Cuánto tardó en total
2. Todos los archivos descargados
 */

function descargar1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('archivo1.pdf'), 3000);
  });
}

function descargar2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('archivo2.pdf'), 2000);
  });
}

function descargar3() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('archivo3.pdf'), 1000);
  });
}

// Tu función async aquí
async function descargarTodo() {
  // Tu código
  const inicio = Date.now();
  console.log("Iniciando descargas ...");
  const respuesta = await Promise.all([
    descargar1(),
    descargar2(),
    descargar3()
  ]);
  console.log(`Duracion total: ${(Date.now() - inicio)/100}`);
  console.log(respuesta);
}

descargarTodo();


