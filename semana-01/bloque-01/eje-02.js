/**
**CONSIGNA:**
Tenés una promise que retorna tu edad. Creá un chain de `.then()` que:
1. Reciba la edad
2. Calcule cuántos años tendrás en 10 años
3. Imprima: "En 10 años tendrás X años"
 */

const obtenerEdad = new Promise((resolve) => {
  setTimeout(() => {
    resolve(25);  // Tu edad actual
  }, 1000);
});

// TODO: Encadenar .then() para calcular e imprimir
obtenerEdad
  .then((edad) => {
    // TU CÓDIGO AQUÍ
    console.log('Edad:', edad);
    return edad + 10;
  })
  .then((edadFutura) => {
    // TU CÓDIGO AQUÍ
    console.log('En 10 años tendrás %d años', edadFutura);
  });
