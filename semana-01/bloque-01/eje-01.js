/**
**CONSIGNA:**
Creá una promise que simule descargar un archivo. La descarga debe:
- Tomar 3 segundos (usar setTimeout)
- Al completar, resolver con el mensaje: "archivo.pdf descargado correctamente"
- Imprimir el mensaje cuando se complete
 */

// TODO: Crear la promise
const descargarArchivo = new Promise((resolve, reject) => {
  // TU CÓDIGO AQUÍ
  setTimeout(() => {
    resolve('archivo.pdf descargado correctamente');
  }, 3000);
});

console.log('>>', descargarArchivo);
// TODO: Consumir la promise
descargarArchivo.then((mensaje) => {
  // TU CÓDIGO AQUÍ
  console.log('mensaje:', mensaje);
  console.log('>>>>', descargarArchivo);
});

