/**
**CONSIGNA:**
Predecí el orden de este código complejo.

**TU TAREA:**
1. Dibujá el flujo en papel
2. Predecí orden
3. Ejecutá y verificá
 */

console.log('A');

Promise.resolve().then(() => {
  console.log('B');

  Promise.resolve().then(() => {
    console.log('C');
  });
});

Promise.resolve().then(() => {
  console.log('D');
});

console.log('E');


/** RESPUESTA
 * A
 * E
 * B
 * D
 * C
 */
