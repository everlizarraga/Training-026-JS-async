# 🧠 GUÍA COMPLETA: Event Loop de JavaScript

**Objetivo:** Entender COMPLETAMENTE cómo funciona JavaScript por dentro - Call Stack, Event Loop, Microtasks, Macrotasks.

**Prerequisito:** Ninguno. Todo explicado desde cero.

---

## 📖 TABLA DE CONTENIDOS

1. [JavaScript es Single-Threaded](#javascript-single-threaded)
2. [Call Stack (Pila de Ejecución)](#call-stack)
3. [Web APIs / Browser APIs](#web-apis)
4. [Task Queue / Macrotask Queue](#task-queue)
5. [Microtask Queue](#microtask-queue)
6. [Event Loop (El Coordinador)](#event-loop)
7. [Orden de Ejecución Completo](#orden-completo)
8. [Ejemplos Progresivos](#ejemplos)
9. [Casos Complejos](#casos-complejos)
10. [Resumen Visual](#resumen-visual)

---

<a name="javascript-single-threaded"></a>
## 1. 🧵 JavaScript es Single-Threaded

### ¿Qué significa "Single-Threaded"?

**Definición simple:**  
JavaScript puede hacer **UNA SOLA COSA A LA VEZ**.

**Analogía:**  
Imaginá un cocinero en una cocina. Solo tiene DOS MANOS. No puede picar cebolla Y freír papas AL MISMO TIEMPO. Tiene que hacer una cosa, terminarla, y luego la otra.

```
Cocinero (JavaScript):
1. Picar cebolla     ← Hace esto AHORA
2. Freír papas       ← Espera su turno
3. Hervir agua       ← Espera su turno
```

**¿Por qué es importante?**  
Porque JavaScript NO puede hacer múltiples tareas simultáneas DIRECTAMENTE. Pero tiene trucos para SIMULAR que sí puede (ahí entra el Event Loop).

---

### Entonces, ¿cómo JavaScript maneja cosas asíncronas?

**Respuesta:** Delegación + Event Loop.

**Analogía mejorada:**  
El cocinero (JavaScript) tiene AYUDANTES (Web APIs). Cuando necesita hacer algo que tarda (como hornear), le dice al ayudante "avisame cuando esté listo" y SIGUE cocinando otras cosas.

```
Cocinero (JS):
"Ayudante, horneá esta pizza 20 minutos. Avisame cuando esté."

Mientras tanto:
- Pica cebolla
- Fríe papas
- Lava platos

20 minutos después:
Ayudante: "¡Pizza lista!"
Cocinero: "Ok, la saco del horno"
```

**Eso es JavaScript asíncrono.**

---

<a name="call-stack"></a>
## 2. 📚 Call Stack (Pila de Ejecución)

### ¿Qué es el Call Stack?

**Definición:**  
Es una **PILA** (stack) donde JavaScript lleva el registro de qué función está ejecutando AHORA.

**Analogía:**  
Una pila de platos:
- Agregás platos ARRIBA (push)
- Sacás platos de ARRIBA (pop)
- Solo podés sacar el de arriba (Last In, First Out)

```
Pila de Platos:
  ┌─────────┐
  │ Plato 3 │ ← Último agregado, primero en salir
  ├─────────┤
  │ Plato 2 │
  ├─────────┤
  │ Plato 1 │ ← Primero agregado, último en salir
  └─────────┘
```

---

### Ejemplo de Call Stack

**Código:**
```javascript
function multiplicar(a, b) {
    return a * b;
}

function cuadrado(n) {
    return multiplicar(n, n);
}

function imprimirCuadrado(n) {
    const resultado = cuadrado(n);
    console.log(resultado);
}

imprimirCuadrado(5);
```

**Call Stack paso a paso:**

```
PASO 1: Llamamos imprimirCuadrado(5)
┌──────────────────────┐
│ imprimirCuadrado(5)  │ ← Se agrega al stack
└──────────────────────┘

PASO 2: imprimirCuadrado llama a cuadrado(5)
┌──────────────────────┐
│ cuadrado(5)          │ ← Se agrega arriba
├──────────────────────┤
│ imprimirCuadrado(5)  │
└──────────────────────┘

PASO 3: cuadrado llama a multiplicar(5, 5)
┌──────────────────────┐
│ multiplicar(5, 5)    │ ← Se agrega arriba
├──────────────────────┤
│ cuadrado(5)          │
├──────────────────────┤
│ imprimirCuadrado(5)  │
└──────────────────────┘

PASO 4: multiplicar termina, retorna 25
┌──────────────────────┐
│ cuadrado(5)          │ ← multiplicar se SACA (pop)
├──────────────────────┤
│ imprimirCuadrado(5)  │
└──────────────────────┘

PASO 5: cuadrado termina, retorna 25
┌──────────────────────┐
│ imprimirCuadrado(5)  │ ← cuadrado se SACA (pop)
└──────────────────────┘

PASO 6: imprimirCuadrado termina
[Stack vacío] ← imprimirCuadrado se SACA (pop)
```

**Regla de oro:**  
El Call Stack se ejecuta de ARRIBA hacia ABAJO. Solo cuando una función termina, se saca del stack.

---

### Call Stack con código asíncrono

**Código:**
```javascript
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

console.log('3');
```

**¿Qué imprime?**
```
1
3
2  ← ¿Por qué al final si tiene delay 0?
```

**Call Stack:**
```
PASO 1:
┌──────────────────────┐
│ console.log('1')     │ ← Ejecuta, imprime "1", se saca
└──────────────────────┘

PASO 2:
┌──────────────────────┐
│ setTimeout(...)      │ ← Se ejecuta PERO el callback
└──────────────────────┘    NO se mete al stack AHORA
                            Se manda a otro lugar (Web APIs)

PASO 3:
┌──────────────────────┐
│ console.log('3')     │ ← Ejecuta, imprime "3", se saca
└──────────────────────┘

PASO 4:
[Stack vacío]

Ahora sí, el callback de setTimeout entra al stack:
┌──────────────────────┐
│ console.log('2')     │ ← Ejecuta, imprime "2"
└──────────────────────┘
```

**¿Por qué?** Porque setTimeout NO se ejecuta en el Call Stack. Se manda a **Web APIs**.

---

<a name="web-apis"></a>
## 3. 🌐 Web APIs / Browser APIs

### ¿Qué son las Web APIs?

**Definición:**  
Son funciones que el NAVEGADOR (o Node.js) te da, pero que NO son parte de JavaScript puro.

**Ejemplos:**
- `setTimeout` / `setInterval`
- `fetch`
- `XMLHttpRequest`
- `addEventListener`
- `setImmediate` (Node.js)

**Analogía:**  
Son los "AYUDANTES" del cocinero. JavaScript les delega tareas que toman tiempo.

```
JavaScript dice:
"Ayudante setTimeout, esperá 2 segundos y luego avisame"

Ayudante setTimeout:
*cuenta 2 segundos en paralelo mientras JS hace otras cosas*

Después de 2 segundos:
"¡Listo! Acá está tu callback para ejecutar"
```

---

### Flujo con Web APIs

```javascript
console.log('Inicio');

setTimeout(() => {
    console.log('Timeout');
}, 2000);

console.log('Fin');
```

**Diagrama completo:**

```
┌─────────────────────────────────────────────────────────┐
│                     JAVASCRIPT                          │
│                                                         │
│  ┌───────────────┐                                     │
│  │  Call Stack   │                                     │
│  ├───────────────┤                                     │
│  │ console('Inicio') │ ← PASO 1: Ejecuta            │
│  └───────────────┘                                     │
│         ↓                                              │
│  setTimeout(...) ← PASO 2: Delega a Web APIs         │
│         ↓                                              │
│  ┌───────────────┐                                     │
│  │ console('Fin')│ ← PASO 3: Ejecuta                 │
│  └───────────────┘                                     │
└─────────────────────────────────────────────────────────┘
                      ↓ (delega)
┌─────────────────────────────────────────────────────────┐
│                    WEB APIs                             │
│                                                         │
│  setTimeout callback esperando 2000ms...               │
│  [●●●●●●●●●●] ← contando tiempo                        │
│                                                         │
│  Después de 2 segundos:                                │
│  "¡Listo! Callback ready para ejecutar"               │
└─────────────────────────────────────────────────────────┘
                      ↓ (manda callback a)
┌─────────────────────────────────────────────────────────┐
│                  TASK QUEUE                             │
│                                                         │
│  [ () => console.log('Timeout') ] ← Esperando su turno│
└─────────────────────────────────────────────────────────┘
```

**El callback NO vuelve al Call Stack directamente.** Primero va a una COLA (queue).

---

<a name="task-queue"></a>
## 4. 📋 Task Queue / Macrotask Queue

### ¿Qué es el Task Queue?

**Definición:**  
Es una COLA (queue) donde esperan los callbacks que las Web APIs terminaron de procesar.

**Analogía:**  
Cola del supermercado:
- Primero en llegar → primero en ser atendido (FIFO: First In, First Out)
- Los callbacks esperan su turno

```
Task Queue (cola):

  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Callback │ ← │ Callback │ ← │ Callback │
  │    1     │    │    2     │    │    3     │
  └──────────┘    └──────────┘    └──────────┘
      ↑                                  ↑
   Primero                            Último
  (sale primero)                    (sale último)
```

---

### Tipos de tareas en Task Queue (Macrotasks)

**Macrotasks incluyen:**
- `setTimeout`
- `setInterval`
- `setImmediate` (Node.js)
- I/O operations
- UI rendering

**Ejemplo:**
```javascript
setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);
setTimeout(() => console.log('Timeout 3'), 0);
```

**Task Queue:**
```
┌────────────────────┐
│ console('Timeout 1')│ ← Primero
├────────────────────┤
│ console('Timeout 2')│ ← Segundo
├────────────────────┤
│ console('Timeout 3')│ ← Tercero
└────────────────────┘
```

**Se ejecutan EN ORDEN:**
```
Timeout 1
Timeout 2
Timeout 3
```

---

<a name="microtask-queue"></a>
## 5. ⚡ Microtask Queue

### ¿Qué es el Microtask Queue?

**Definición:**  
Es una COLA ESPECIAL con **PRIORIDAD ALTA** donde esperan callbacks de Promises.

**Diferencia clave:**  
Las Microtasks tienen **PRIORIDAD sobre las Macrotasks**.

**Analogía:**  
En el supermercado, las microtasks son la "fila preferencial" (ancianos, embarazadas). Pasan ANTES que la fila normal.

```
Supermercado:

Fila Preferencial (Microtasks):
  ┌──────────┐
  │ Promise  │ ← Pasa PRIMERO
  └──────────┘

Fila Normal (Macrotasks):
  ┌──────────┐    ┌──────────┐
  │ setTimeout│ ← │ setTimeout│ ← Esperan
  └──────────┘    └──────────┘
```

---

### Tipos de tareas en Microtask Queue

**Microtasks incluyen:**
- `Promise.then()`
- `Promise.catch()`
- `Promise.finally()`
- `async/await`
- `queueMicrotask()`
- `MutationObserver`

**Ejemplo:**
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);  // Macrotask

Promise.resolve().then(() => console.log('3'));  // Microtask

console.log('4');
```

**¿Qué imprime?**
```
1  ← Sync (Call Stack)
4  ← Sync (Call Stack)
3  ← Microtask (PRIORIDAD)
2  ← Macrotask (después)
```

**Flujo:**

```
Call Stack (sync):
1. console.log('1')  ← Ejecuta
2. setTimeout(...)   ← Delega a Web APIs
3. Promise.then(...) ← Manda a Microtask Queue
4. console.log('4')  ← Ejecuta

Microtask Queue:
[ console.log('3') ] ← Se ejecuta ANTES que macrotasks

Macrotask Queue:
[ console.log('2') ] ← Se ejecuta DESPUÉS de microtasks
```

---

### Comparación Visual

```
┌─────────────────────────────────────────────────┐
│              PRIORIDAD DE EJECUCIÓN             │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. CALL STACK (código sync)        ← MÁS ALTA│
│     ↓                                          │
│  2. MICROTASK QUEUE (Promises)      ← ALTA    │
│     ↓                                          │
│  3. MACROTASK QUEUE (setTimeout)    ← NORMAL  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Regla de oro:**  
```
Sync → Microtasks → Macrotasks
```

---

<a name="event-loop"></a>
## 6. 🔄 Event Loop (El Coordinador)

### ¿Qué es el Event Loop?

**Definición:**  
Es un **BUCLE INFINITO** que coordina todo. Su trabajo es verificar constantemente:
1. ¿El Call Stack está vacío?
2. Si sí → ¿Hay microtasks esperando?
3. Si sí → Ejecutar TODAS las microtasks
4. ¿Hay macrotasks esperando?
5. Si sí → Ejecutar UNA macrotask
6. Repetir desde el paso 1

**Analogía:**  
Un controlador de tráfico en un cruce:
- Ve si una calle está vacía
- Da paso a autos según prioridad
- Repite constantemente

---

### Pseudocódigo del Event Loop

```javascript
while (true) {
    // 1. Ejecutar todo el código sync (Call Stack)
    ejecutarCallStack();
    
    // 2. Si hay microtasks, ejecutar TODAS
    while (hayMicrotasks()) {
        ejecutarMicrotask();
    }
    
    // 3. Ejecutar UNA macrotask
    if (hayMacrotasks()) {
        ejecutarUnaMacrotask();
    }
    
    // 4. Repetir
}
```

**Clave:** Las microtasks se ejecutan TODAS de una vez. Las macrotasks se ejecutan UNA por vez.

---

### Diagrama Completo del Event Loop

```
┌───────────────────────────────────────────────────────┐
│                    JAVASCRIPT ENGINE                  │
│                                                       │
│  ┌─────────────────┐                                 │
│  │   CALL STACK    │ ← Ejecuta código sync          │
│  │                 │                                 │
│  │  function()     │                                 │
│  │  console.log()  │                                 │
│  └─────────────────┘                                 │
│           ↓                                          │
│  ¿Stack vacío?                                       │
│           ↓ SÍ                                       │
│  ┌─────────────────┐                                 │
│  │ MICROTASK QUEUE │ ← PRIORIDAD ALTA               │
│  │                 │                                 │
│  │ Promise.then()  │ ← Ejecutar TODAS               │
│  │ Promise.then()  │                                 │
│  │ async/await     │                                 │
│  └─────────────────┘                                 │
│           ↓                                          │
│  ¿Microtasks vacías?                                │
│           ↓ SÍ                                       │
│  ┌─────────────────┐                                 │
│  │ MACROTASK QUEUE │ ← PRIORIDAD NORMAL             │
│  │                 │                                 │
│  │ setTimeout()    │ ← Ejecutar UNA                 │
│  │ setInterval()   │                                 │
│  └─────────────────┘                                 │
│           ↓                                          │
│  Volver al inicio (loop infinito)                   │
└───────────────────────────────────────────────────────┘
         ↑                            ↓
         └────────── EVENT LOOP ──────┘
```

---

<a name="orden-completo"></a>
## 7. 📊 Orden de Ejecución Completo

### Regla de oro (repetimos para que quede claro)

```
1. CALL STACK (sync)      ← TODO lo síncrono PRIMERO
2. MICROTASK QUEUE        ← TODAS las microtasks
3. MACROTASK QUEUE        ← UNA macrotask
4. Repetir desde paso 2
```

---

### Ejemplo Paso a Paso

**Código:**
```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
```

**Paso a Paso:**

```
═════════════════════════════════════════════════════
PASO 1: Ejecutar Call Stack (sync)
═════════════════════════════════════════════════════

Call Stack:
  ┌──────────────┐
  │ console('A') │ ← Ejecuta, imprime "A"
  └──────────────┘

  setTimeout(...) ← Delega a Web APIs → Task Queue
  
  Promise.then(...) ← Manda a Microtask Queue
  
  ┌──────────────┐
  │ console('D') │ ← Ejecuta, imprime "D"
  └──────────────┘

Output hasta ahora:
A
D

═════════════════════════════════════════════════════
PASO 2: Call Stack vacío → Ejecutar Microtasks
═════════════════════════════════════════════════════

Microtask Queue:
  ┌──────────────┐
  │ console('C') │ ← Ejecuta, imprime "C"
  └──────────────┘

Output hasta ahora:
A
D
C

═════════════════════════════════════════════════════
PASO 3: Microtasks vacías → Ejecutar UNA Macrotask
═════════════════════════════════════════════════════

Macrotask Queue:
  ┌──────────────┐
  │ console('B') │ ← Ejecuta, imprime "B"
  └──────────────┘

Output final:
A
D
C
B
```

**Resultado:**
```
A  ← Sync
D  ← Sync
C  ← Microtask
B  ← Macrotask
```

---

<a name="ejemplos"></a>
## 8. 📚 Ejemplos Progresivos

### Ejemplo 1: Solo Sync

```javascript
console.log('1');
console.log('2');
console.log('3');
```

**Análisis:**
- TODO sync → Call Stack ejecuta en orden
- NO hay async → NO hay queues

**Output:**
```
1
2
3
```

---

### Ejemplo 2: Sync + Macrotask

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

console.log('3');
```

**Análisis:**
```
Call Stack (sync):
1. console.log('1')  → Imprime "1"
2. setTimeout(...)   → Manda a Macrotask Queue
3. console.log('3')  → Imprime "3"

Macrotask Queue:
1. console.log('2')  → Imprime "2"
```

**Output:**
```
1
3
2
```

---

### Ejemplo 3: Sync + Microtask

```javascript
console.log('1');

Promise.resolve().then(() => console.log('2'));

console.log('3');
```

**Análisis:**
```
Call Stack (sync):
1. console.log('1')  → Imprime "1"
2. Promise.then(...) → Manda a Microtask Queue
3. console.log('3')  → Imprime "3"

Microtask Queue:
1. console.log('2')  → Imprime "2"
```

**Output:**
```
1
3
2
```

---

### Ejemplo 4: Sync + Microtask + Macrotask

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
```

**Análisis:**
```
Call Stack (sync):
1. console.log('1')  → Imprime "1"
2. setTimeout(...)   → Manda a Macrotask Queue
3. Promise.then(...) → Manda a Microtask Queue
4. console.log('4')  → Imprime "4"

Microtask Queue (PRIORIDAD):
1. console.log('3')  → Imprime "3"

Macrotask Queue:
1. console.log('2')  → Imprime "2"
```

**Output:**
```
1
4
3
2
```

**Orden:** Sync → Microtasks → Macrotasks

---

### Ejemplo 5: Microtasks Anidadas

```javascript
console.log('1');

Promise.resolve().then(() => {
    console.log('2');
    
    Promise.resolve().then(() => {
        console.log('3');
    });
});

console.log('4');
```

**Análisis:**
```
Call Stack (sync):
1. console.log('1')  → Imprime "1"
2. Promise.then(...) → Manda a Microtask Queue
3. console.log('4')  → Imprime "4"

Microtask Queue (ronda 1):
1. console.log('2')  → Imprime "2"
   - Dentro crea nueva microtask (console.log('3'))

Microtask Queue (ronda 2):
1. console.log('3')  → Imprime "3"
```

**Output:**
```
1
4
2
3
```

**Clave:** Las microtasks se ejecutan TODAS antes de pasar a macrotasks, incluso las que se crean durante la ejecución de otras microtasks.

---

### Ejemplo 6: Macrotask crea Microtask

```javascript
console.log('1');

setTimeout(() => {
    console.log('2');
    
    Promise.resolve().then(() => {
        console.log('3');
    });
}, 0);

console.log('4');
```

**Análisis:**
```
Call Stack (sync):
1. console.log('1')  → Imprime "1"
2. setTimeout(...)   → Manda a Macrotask Queue
3. console.log('4')  → Imprime "4"

Macrotask Queue (ronda 1):
1. console.log('2')  → Imprime "2"
   - Dentro crea microtask (console.log('3'))

Microtask Queue (después de macrotask):
1. console.log('3')  → Imprime "3"
```

**Output:**
```
1
4
2
3
```

**Clave:** Cuando una macrotask crea una microtask, la microtask se ejecuta ANTES de la siguiente macrotask.

---

<a name="casos-complejos"></a>
## 9. 🔥 Casos Complejos

### Caso Complejo 1

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve().then(() => console.log('Promise in Timeout 1'));
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        setTimeout(() => console.log('Timeout in Promise 1'), 0);
    })
    .then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout 2'), 0);

console.log('End');
```

**Output:**
```
Start
End
Promise 1
Promise 2
Timeout 1
Promise in Timeout 1
Timeout 2
Timeout in Promise 1
```

**Explicación detallada:**

```
═══════════════════════════════════════════════════
FASE 1: SYNC
═══════════════════════════════════════════════════
1. console.log('Start')      → "Start"
2. setTimeout(Timeout 1)     → Macrotask Queue
3. Promise.then(Promise 1)   → Microtask Queue
4. setTimeout(Timeout 2)     → Macrotask Queue
5. console.log('End')        → "End"

Output: Start, End

═══════════════════════════════════════════════════
FASE 2: MICROTASKS
═══════════════════════════════════════════════════
6. Promise 1 ejecuta         → "Promise 1"
   - Crea setTimeout         → Macrotask Queue (al final)
   - Retorna y encadena .then() → Microtask Queue
7. Promise 2 ejecuta         → "Promise 2"

Output: Start, End, Promise 1, Promise 2

═══════════════════════════════════════════════════
FASE 3: MACROTASKS (una por una)
═══════════════════════════════════════════════════
8. Timeout 1 ejecuta         → "Timeout 1"
   - Crea Promise.then()     → Microtask Queue
   
   Microtasks inmediatas:
   9. Promise in Timeout 1   → "Promise in Timeout 1"

10. Timeout 2 ejecuta        → "Timeout 2"

11. Timeout in Promise 1     → "Timeout in Promise 1"

Output final: 
Start
End
Promise 1
Promise 2
Timeout 1
Promise in Timeout 1
Timeout 2
Timeout in Promise 1
```

---

### Caso Complejo 2

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
    .then(() => console.log('3'))
    .then(() => console.log('4'));

setTimeout(() => console.log('5'), 0);

Promise.resolve().then(() => console.log('6'));

console.log('7');
```

**Output:**
```
1
7
3
6
4
2
5
```

**Explicación:**

```
Sync: 1, 7

Microtasks (ronda 1):
- Promise.then(3)
- Promise.then(6)

Microtasks (ronda 2 - creada por el .then() encadenado):
- Promise.then(4)

Macrotasks:
- setTimeout(2)
- setTimeout(5)
```

---

<a name="resumen-visual"></a>
## 10. 🎨 Resumen Visual Completo

### Diagrama Master del Event Loop

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃            JAVASCRIPT EVENT LOOP                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  ┌─────────────────────────────────────────────┐
  │         1. CÓDIGO SYNC (Call Stack)         │
  │                                             │
  │  Ejecuta TODO el código síncrono PRIMERO   │
  │                                             │
  │  console.log()                             │
  │  Variables                                  │
  │  Operaciones matemáticas                   │
  │  etc.                                      │
  └─────────────────────────────────────────────┘
                    ↓
                    ↓ (Stack vacío?)
                    ↓ SÍ
  ┌─────────────────────────────────────────────┐
  │      2. MICROTASK QUEUE (Alta Prioridad)    │
  │                                             │
  │  Ejecuta TODAS las microtasks              │
  │                                             │
  │  ✓ Promise.then()                          │
  │  ✓ Promise.catch()                         │
  │  ✓ async/await                             │
  │  ✓ queueMicrotask()                        │
  │                                             │
  │  [Ejecuta TODAS antes de continuar]        │
  └─────────────────────────────────────────────┘
                    ↓
                    ↓ (Microtasks vacías?)
                    ↓ SÍ
  ┌─────────────────────────────────────────────┐
  │     3. MACROTASK QUEUE (Prioridad Normal)   │
  │                                             │
  │  Ejecuta UNA macrotask                     │
  │                                             │
  │  ✓ setTimeout()                            │
  │  ✓ setInterval()                           │
  │  ✓ setImmediate() (Node.js)                │
  │  ✓ I/O operations                          │
  │                                             │
  │  [Ejecuta UNA y vuelve al paso 2]          │
  └─────────────────────────────────────────────┘
                    ↓
                    ↓
         ┌──────────┴──────────┐
         │  Volver a paso 2    │
         │  (Event Loop)       │
         └──────────┬──────────┘
                    ↓
              [LOOP INFINITO]
```

---

### Tabla Resumen

| Categoría | Qué incluye | Prioridad | Se ejecutan |
|-----------|-------------|-----------|-------------|
| **Sync** | console.log, variables, operaciones | MÁS ALTA | TODO de una vez |
| **Microtasks** | Promises, async/await | ALTA | TODAS antes de macrotasks |
| **Macrotasks** | setTimeout, setInterval | NORMAL | UNA por vez |

---

### Orden de Ejecución - Regla Simple

```
┌──────────────────────────────────────────────┐
│  PRIMERO:  TODO el código sync              │
│            ↓                                 │
│  SEGUNDO:  TODAS las microtasks             │
│            ↓                                 │
│  TERCERO:  UNA macrotask                    │
│            ↓                                 │
│  REPETIR desde SEGUNDO (Event Loop)         │
└──────────────────────────────────────────────┘
```

---

## 🎓 CONCEPTOS CLAVE PARA RECORDAR

### 1. JavaScript es Single-Threaded
- Solo hace UNA cosa a la vez
- Simula concurrencia con Event Loop

### 2. Call Stack (Pila)
- Registra qué función se está ejecutando AHORA
- Last In, First Out (LIFO)
- Se ejecuta TODO antes de pasar a queues

### 3. Web APIs
- Funciones del navegador/Node.js
- Manejan tareas asíncronas (setTimeout, fetch, etc.)
- NO bloquean el Call Stack

### 4. Macrotask Queue
- Cola para setTimeout, setInterval, etc.
- Prioridad NORMAL
- Se ejecuta UNA por vez

### 5. Microtask Queue
- Cola para Promises, async/await
- Prioridad ALTA
- Se ejecutan TODAS de una vez

### 6. Event Loop
- Coordina todo
- Verifica constantemente: Stack vacío? → Microtasks → Macrotasks

---

## 🚀 EJERCICIOS DE PRÁCTICA

Ahora que entendés los conceptos, probá predecir el output:

### Ejercicio A
```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

<details>
<summary>Ver respuesta</summary>

```
A
D
C
B
```

**Explicación:**
- Sync: A, D
- Microtask: C
- Macrotask: B
</details>

---

### Ejercicio B
```javascript
console.log('1');

setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
});

console.log('6');
```

<details>
<summary>Ver respuesta</summary>

```
1
6
4
2
3
5
```

**Explicación:**
- Sync: 1, 6
- Microtask: 4 (crea setTimeout para 5)
- Macrotask: 2 (crea microtask para 3)
- Microtask inmediata: 3
- Macrotask: 5
</details>

---

## 📚 RECURSOS ADICIONALES

### Herramientas para Visualizar

**Loupe (Event Loop Visualizer):**
http://latentflip.com/loupe/

Visualiza el Event Loop en tiempo real con tu código.

---

## ✅ CHECKLIST DE COMPRENSIÓN

Sabés que dominaste el Event Loop cuando podés:

- [ ] Explicar qué es Single-Threaded
- [ ] Dibujar el Call Stack
- [ ] Distinguir Microtasks de Macrotasks
- [ ] Predecir orden de ejecución
- [ ] Explicar por qué Promises tienen prioridad
- [ ] Saber cuándo usar async/await vs .then()
- [ ] Debuggear problemas de timing

---

## 🎯 RESUMEN ULTRA-CORTO

```javascript
// Orden de ejecución:
console.log('sync');              // 1. PRIMERO (sync)
Promise.resolve().then(...)       // 2. SEGUNDO (microtask)
setTimeout(...)                   // 3. TERCERO (macrotask)
```

**Regla:**
```
Sync → Microtasks → Macrotasks → Loop
```

---

**FIN DE LA GUÍA**

Ahora tenés TODO el contexto para entender los ejercicios del Bloque 3. 💪

Versión: 1.0  
Explicación: Desde cero hasta avanzado  
Con: Analogías, diagramas ASCII, ejemplos progresivos  
Objetivo: Dominio completo del Event Loop ⭐⭐⭐
