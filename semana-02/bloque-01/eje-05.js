/**
**CONSIGNA:**
Predecí qué imprime cada función. Luego ejecutá para verificar.
 */

async function caso1() {
  return 42;
}

async function caso2() {
  return Promise.resolve(100);
}

async function caso3() {
  const num = await Promise.resolve(200);
  return num;
}

async function caso4() {
  return await Promise.resolve(300);
}

// ¿Qué imprime cada uno?
caso1().then(console.log);  // ¿?
caso2().then(console.log);  // ¿?
caso3().then(console.log);  // ¿?
caso4().then(console.log);  // ¿?

