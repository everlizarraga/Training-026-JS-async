/**
**CONSIGNA:**
Creá una función `rastrearPromise(nombre, promesa)` que:
1. Imprima el estado inicial de la promise
2. Cuando se resuelva/rechace, imprima el estado final
3. Mida cuánto tiempo tardó en resolverse/rechazarse
4. Imprima un resumen completo al final
 */

function rastrearPromise(nombre, promesa) {
  const inicio = Date.now();

  // TODO: Imprimir estado inicial
  console.log(`[${nombre}] Estado inicial:`, promesa);

  // TODO: Esperar resolución/rechazo y medir tiempo
  return promesa
    .then((valor) => {
      // TODO: Calcular tiempo transcurrido
      const espera = Date.now() - inicio;
      // TODO: Imprimir resultado
      console.log(`[${nombre}] ✅ Resuelta con: ${valor} (${espera}ms)`);
    })
    .catch((error) => {
      // TODO: Calcular tiempo transcurrido
      const espera = Date.now() - inicio;
      // TODO: Imprimir error
      console.log(`[${nombre}] ❌ Rechazada con: ${error} (${espera}ms)`);
    });
}

// TODO: Probar con diferentes promises

// Test 1: Promise inmediata
rastrearPromise('Test 1', Promise.resolve('OK'));

// Test 2: Promise con delay
rastrearPromise(
  'Test 2',
  new Promise(resolve => setTimeout(() => resolve('Demorado'), 1500))
);

// Test 3: Promise que falla
rastrearPromise('Test 3', Promise.reject('Error!'));




