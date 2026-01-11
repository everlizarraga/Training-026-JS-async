/**
**CONSIGNA:**
Predecí el orden de ejecución. Luego ejecutá para verificar.

**TU TAREA:**
1. Escribí en papel el orden que creés
2. Ejecutá el código
3. Verificá si acertaste
 */

console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

console.log('C');

setTimeout(() => {
  console.log('D');
}, 0);

console.log('E');


/** Resolucion
 * A
 * C
 * E
 * B
 * D
 */
