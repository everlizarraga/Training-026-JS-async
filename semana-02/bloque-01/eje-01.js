/**
**CONSIGNA:**
Creá una función `async` llamada `obtenerEdad()` que retorne tu edad (número).  
Luego llamala y mostrá el resultado en consola usando `.then()`.
 */

// Tu función async aquí
async function obtenerEdad() {
  // Tu código
  return 34;
}

// Llamarla y mostrar resultado
obtenerEdad()
  .then((edad) => {
    // Tu código
    console.log("mi edad:", edad);
  });

