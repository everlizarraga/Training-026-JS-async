/**
**CONSIGNA:**
Predecí el orden. Luego ejecutá.

**TU TAREA:**
1. Predecí orden en papel
2. Ejecutá
3. Explicá por qué ese orden
 */

console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');

Promise.resolve().then(() => {
  console.log('E');
});

setTimeout(() => {
  console.log('F');
}, 0);

console.log('G');

/** RESPUESTA
 * A
 * D
 * G
 * C
 * E
 * B
 * F
 */

