/**
**CONSIGNA:**
Analizá y arreglá este código que tiene problemas con returns:
 */

// ❌ CÓDIGO CON ERRORES
Promise.resolve(100)
  .then((n) => {
    console.log('Inicial:', n);
    const mitad = n / 2;  // No hay return
    return mitad;
  })
  .then((n) => {
    console.log('Mitad:', n);  // ¿Qué imprime?
    return n * 3;  // No hay return
  })
  .then((n) => {
    console.log('Triple:', n);  // ¿Qué imprime?
    return n + 10;
  })
  .then((n) => {
    console.log('Final:', n);  // ¿Qué imprime?
  });

