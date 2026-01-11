/**
**CONSIGNA:**
Este es el ejercicio más complejo. Predecí TODO el orden.

**TU TAREA:**
1. Dibujá diagrama completo
2. Predecí los 10 pasos
3. Ejecutá y compará
4. Si fallaste, explicá por qué
 */

console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => {
    console.log('Promise inside Timeout 1');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  setTimeout(() => {
    console.log('Timeout inside Promise 1');
  }, 0);
});

console.log('Middle');

Promise.resolve().then(() => {
  console.log('Promise 2');
});

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

console.log('End');


/** RESPUESTA
 * Start
 * Middle
 * End
 * Promise 1
 * Promise 2
 * Timeout 1
 * Promise inside Timeout 1
 * Timeout 2
 * Timeout inside Promise 1
 */