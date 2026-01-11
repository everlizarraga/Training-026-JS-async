/**
**CONSIGNA:**
Predecí el orden completo de este código ultra-complejo.

**TU TAREA:**
1. Predecí el orden de los 11 console.log
2. Explicá el razonamiento
3. Ejecutá y verificá
4. Si acertaste → ¡DOMINASTE EL EVENT LOOP! 🎉
 */

console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
  })
  .then(() => console.log('6'));

setTimeout(() => {
  console.log('7');
  Promise.resolve()
    .then(() => console.log('8'))
    .then(() => console.log('9'));
}, 0);

Promise.resolve().then(() => {
  console.log('10');
});

console.log('11');


/** RESPUESTA
 * 1
 * 11
 * 4
 * 10
 * 6
 * 2
 * 3
 * 7
 * 8
 * 9
 * 5
 */
