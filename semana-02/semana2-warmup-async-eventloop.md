# 🏋️ WARMUP SEMANA 2: Async/Await + Event Loop

**Duración:** 9-12 horas (distribuido en 3 días)  
**Objetivo:** Dominar async/await como alternativa a .then(), entender Event Loop profundamente (call stack, microtasks, macrotasks), y predecir orden de ejecución.

---

## 📚 DISTRIBUCIÓN DE EJERCICIOS

**Bloque 1: Async/Await Fundamentals (Ejercicios 1-6)**
- Sintaxis y uso básico
- Error handling con try/catch
- Return implícito
- Comparación con .then()

**Bloque 2: Parallel/Sequential Execution (Ejercicios 7-9)**
- Promise.all + await
- Performance paralelo vs secuencial
- Top-level await

**Bloque 3: Event Loop Profundo (Ejercicios 10-14)**
- Orden sync vs async
- Microtasks (Promises)
- Macrotasks (setTimeout)
- Predecir ejecución compleja

---

## 🎯 BLOQUE 1: ASYNC/AWAIT FUNDAMENTALS

### Ejercicio 1: Función async Básica

⏱️ **TIEMPO LÍMITE:** 15 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Función async básica
// ============================================

// 1. Declarar función async
async function saludar() {
    return 'Hola!';
    // Una función async SIEMPRE retorna una Promise
}

// 2. Llamar función async
saludar()
    .then((mensaje) => {
        console.log(mensaje);  // "Hola!"
    });

// También podemos usar await (si estamos dentro de otra función async)
async function principal() {
    const resultado = await saludar();
    console.log(resultado);  // "Hola!"
}

principal();

// ============================================
// ¿QUÉ HACE?
// ============================================
// 1. async convierte la función en una que retorna Promise
// 2. return 'Hola!' es equivalente a return Promise.resolve('Hola!')
// 3. Podemos consumir con .then() o con await
```

**¿Qué pasa internamente?**
```
async function saludar() {
    return 'Hola!';
}

// Es equivalente a:
function saludar() {
    return Promise.resolve('Hola!');
}
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `async` llamada `obtenerEdad()` que retorne tu edad (número).  
Luego llamala y mostrá el resultado en consola usando `.then()`.

**PLANTILLA:**
```javascript
// Tu función async aquí
async function obtenerEdad() {
    // Tu código
}

// Llamarla y mostrar resultado
obtenerEdad()
    .then((edad) => {
        // Tu código
    });
```

**RESULTADO ESPERADO:**
```
25  // (o tu edad)
```

---

#### 💡 HINTS (solo si te trabás >10 min):

**Hint 1:** Una función async siempre retorna Promise, no necesitás crear new Promise()  
**Hint 2:** `return 25;` dentro de async function es suficiente  
**Hint 3:** Llamá la función sin await (usá .then() como en el ejemplo)

---

### Ejercicio 2: await Keyword

⏱️ **TIEMPO LÍMITE:** 20 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Usar await para pausar ejecución
// ============================================

// Función que simula operación asíncrona
function esperar(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Esperé ${ms}ms`);
        }, ms);
    });
}

// Función async que USA await
async function tarea() {
    console.log('1. Inicio');
    
    // await PAUSA la ejecución hasta que la Promise se resuelva
    const resultado = await esperar(2000);
    
    console.log('2. Después de esperar');
    console.log(resultado);
    
    return 'Tarea completada';
}

tarea().then((final) => console.log(final));

// ============================================
// ¿QUÉ HACE?
// ============================================
// 1. Imprime "Inicio"
// 2. await pausa la función por 2 segundos
// 3. Cuando esperar() se resuelve, asigna el resultado
// 4. Imprime "Después de esperar" y el resultado
// 5. Retorna "Tarea completada"
```

**Orden de ejecución:**
```
1. Inicio
[espera 2 segundos]
2. Después de esperar
Esperé 2000ms
Tarea completada
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `async` llamada `descargarArchivo()` que:
1. Imprima "Descargando..."
2. Espere 3 segundos (usando la función `esperar()` del ejemplo)
3. Imprima "Descarga completa"
4. Retorne el string "archivo.pdf"

**PLANTILLA:**
```javascript
// Función auxiliar (copiá del ejemplo)
function esperar(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

// Tu función async aquí
async function descargarArchivo() {
    // Tu código
}

// Llamarla
descargarArchivo().then((archivo) => console.log(`Archivo: ${archivo}`));
```

**RESULTADO ESPERADO:**
```
Descargando...
[espera 3 segundos]
Descarga completa
Archivo: archivo.pdf
```

---

#### 💡 HINTS:

**Hint 1:** Usá `await esperar(3000);` para pausar 3 segundos  
**Hint 2:** console.log() ANTES de await, console.log() DESPUÉS de await  
**Hint 3:** return al final de la función

---

### Ejercicio 3: try/catch con async/await

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Manejar errores con try/catch
// ============================================

// Función que puede fallar
function operacionRiesgosa() {
    return new Promise((resolve, reject) => {
        const exito = Math.random() > 0.5;
        
        setTimeout(() => {
            if (exito) {
                resolve('Operación exitosa');
            } else {
                reject('Operación falló');
            }
        }, 1000);
    });
}

// Función async con try/catch
async function intentarOperacion() {
    try {
        console.log('Intentando operación...');
        
        // Si esto falla, salta al catch
        const resultado = await operacionRiesgosa();
        
        console.log('✅', resultado);
        return resultado;
        
    } catch (error) {
        // Captura el reject de la Promise
        console.log('❌', error);
        return null;
    }
}

intentarOperacion();

// ============================================
// ¿QUÉ HACE?
// ============================================
// 1. Intenta ejecutar operacionRiesgosa()
// 2. Si resolve → imprime éxito y retorna resultado
// 3. Si reject → catch captura el error, imprime y retorna null
```

**Con .then() sería:**
```javascript
function intentarOperacion() {
    return operacionRiesgosa()
        .then((resultado) => {
            console.log('✅', resultado);
            return resultado;
        })
        .catch((error) => {
            console.log('❌', error);
            return null;
        });
}
```

**async/await es más legible.**

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `async` llamada `conectarAPI()` que:
1. Intente llamar a `fetchDatos()` (función proporcionada abajo)
2. Si tiene éxito: imprima "Datos recibidos: [resultado]"
3. Si falla: imprima "Error al conectar: [error]"
4. Siempre retorne un objeto: `{ success: true/false, data: resultado o null }`

**PLANTILLA:**
```javascript
// Función que simula API (50% de fallar)
function fetchDatos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() > 0.5;
            if (exito) {
                resolve({ usuarios: 10, posts: 50 });
            } else {
                reject('Error de red');
            }
        }, 1500);
    });
}

// Tu función async aquí
async function conectarAPI() {
    // Tu código con try/catch
}

// Llamarla
conectarAPI().then((resultado) => console.log('Resultado final:', resultado));
```

**RESULTADO ESPERADO (caso éxito):**
```
Datos recibidos: { usuarios: 10, posts: 50 }
Resultado final: { success: true, data: { usuarios: 10, posts: 50 } }
```

**RESULTADO ESPERADO (caso error):**
```
Error al conectar: Error de red
Resultado final: { success: false, data: null }
```

---

#### 💡 HINTS:

**Hint 1:** try { const datos = await fetchDatos(); ... }  
**Hint 2:** catch (error) { ... return { success: false, data: null } }  
**Hint 3:** En el try, si todo sale bien, return { success: true, data: datos }

---

### Ejercicio 4: Comparación .then() vs async/await

⏱️ **TIEMPO LÍMITE:** 20 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Mismo código, dos formas
// ============================================

function obtenerUsuario(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, nombre: 'Ana' });
        }, 1000);
    });
}

function obtenerPosts(usuarioId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(['Post 1', 'Post 2', 'Post 3']);
        }, 1000);
    });
}

// ============================================
// VERSIÓN CON .then() (menos legible)
// ============================================
function obtenerDatosConThen(id) {
    return obtenerUsuario(id)
        .then((usuario) => {
            console.log('Usuario:', usuario.nombre);
            return obtenerPosts(usuario.id);
        })
        .then((posts) => {
            console.log('Posts:', posts);
            return posts;
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

// ============================================
// VERSIÓN CON async/await (MÁS legible)
// ============================================
async function obtenerDatosConAwait(id) {
    try {
        const usuario = await obtenerUsuario(id);
        console.log('Usuario:', usuario.nombre);
        
        const posts = await obtenerPosts(usuario.id);
        console.log('Posts:', posts);
        
        return posts;
    } catch (error) {
        console.log('Error:', error);
    }
}

// Ambas hacen LO MISMO
obtenerDatosConThen(1);
obtenerDatosConAwait(1);
```

**¿Cuál es mejor?**
- async/await: Más legible, parece código síncrono
- .then(): Más verboso, anidaciones difíciles de leer

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Te doy código con `.then()`. Convertilo a `async/await`.

**CÓDIGO ORIGINAL:**
```javascript
function login(username) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ token: 'abc123', username }), 1000);
    });
}

function obtenerPerfil(token) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ nombre: 'Juan', edad: 30 }), 1000);
    });
}

// Versión con .then()
function autenticar(username) {
    return login(username)
        .then((auth) => {
            console.log('Token:', auth.token);
            return obtenerPerfil(auth.token);
        })
        .then((perfil) => {
            console.log('Perfil:', perfil);
            return perfil;
        });
}

autenticar('juan123');
```

**TU TAREA:**
Convertí la función `autenticar()` a async/await manteniendo la misma funcionalidad.

**PLANTILLA:**
```javascript
// Funciones auxiliares (NO tocar)
function login(username) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ token: 'abc123', username }), 1000);
    });
}

function obtenerPerfil(token) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ nombre: 'Juan', edad: 30 }), 1000);
    });
}

// Convertir esta función a async/await
async function autenticar(username) {
    // Tu código aquí
}

autenticar('juan123');
```

**RESULTADO ESPERADO:**
```
Token: abc123
Perfil: { nombre: 'Juan', edad: 30 }
```

---

#### 💡 HINTS:

**Hint 1:** Declarar function como `async function autenticar(username) { ... }`  
**Hint 2:** `const auth = await login(username);`  
**Hint 3:** `const perfil = await obtenerPerfil(auth.token);`  
**Hint 4:** No necesitás .then() ni .catch() - todo es secuencial

---

### Ejercicio 5: Return en async function

⏱️ **TIEMPO LÍMITE:** 15 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Return implícito de Promise
// ============================================

async function ejemplo1() {
    return 'Hola';
    // Equivalente a: return Promise.resolve('Hola');
}

async function ejemplo2() {
    return Promise.resolve('Hola');
    // ¡NO hace doble-wrapping!
}

async function ejemplo3() {
    const resultado = await Promise.resolve('Hola');
    return resultado;
}

// Todas son equivalentes
ejemplo1().then(console.log);  // "Hola"
ejemplo2().then(console.log);  // "Hola"
ejemplo3().then(console.log);  // "Hola"

// ============================================
// ¿QUÉ PASA INTERNAMENTE?
// ============================================
// 1. async function SIEMPRE retorna Promise
// 2. Si retornás valor primitivo → auto-wrap en Promise.resolve()
// 3. Si retornás Promise → NO hace doble-wrapping
// 4. await desenvuelve la Promise
```

**Regla de oro:**
```javascript
async function foo() {
    return valor;  // SIEMPRE es Promise, no importa qué sea "valor"
}
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Predecí qué imprime cada función. Luego ejecutá para verificar.

**CÓDIGO:**
```javascript
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
```

**TU TAREA:**
1. Predecí mentalmente qué imprime cada uno
2. Ejecutá el código
3. Verificá si acertaste

**PREGUNTA ADICIONAL:**
¿Cuál es la diferencia entre caso3 y caso4? ¿Hacen lo mismo?

---

#### 💡 HINTS:

**Hint 1:** async function SIEMPRE retorna Promise  
**Hint 2:** return valor → se envuelve en Promise.resolve(valor)  
**Hint 3:** return Promise → NO se envuelve dos veces  
**Hint 4:** await desenvuelve la Promise, luego return envuelve otra vez

---

### Ejercicio 6: await sin async (ERROR)

⏱️ **TIEMPO LÍMITE:** 10 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Error común - await sin async
// ============================================

// ❌ ESTO NO FUNCIONA
function obtenerDatos() {
    const datos = await fetch('https://api.com/datos');  // ERROR
    return datos;
}

// ✅ CORRECTO
async function obtenerDatos() {
    const datos = await fetch('https://api.com/datos');
    return datos;
}

// ============================================
// ¿POR QUÉ?
// ============================================
// - await SOLO puede usarse dentro de async function
// - Si intentás usar await afuera → SyntaxError
```

**Excepción: Top-level await (módulos ES6)**
```javascript
// En un módulo .mjs (ES6 modules)
const datos = await fetch('https://api.com/datos');  // ✅ Funciona
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Este código tiene errores. Arreglalos.

**CÓDIGO CON ERRORES:**
```javascript
function procesarArchivo() {
    const contenido = await leerArchivo('data.txt');
    const procesado = await transformar(contenido);
    return procesado;
}

function leerArchivo(nombre) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Contenido de ${nombre}`), 1000);
    });
}

function transformar(texto) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(texto.toUpperCase()), 500);
    });
}

procesarArchivo().then(console.log);
```

**TU TAREA:**
Arreglá la función `procesarArchivo()` para que funcione.

---

#### 💡 HINTS:

**Hint 1:** El problema está en la declaración de `procesarArchivo()`  
**Hint 2:** Necesitás agregar la palabra clave `async`  
**Hint 3:** `async function procesarArchivo() { ... }`

---

## 🎯 BLOQUE 2: PARALLEL/SEQUENTIAL EXECUTION

### Ejercicio 7: Promise.all() + await

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Ejecutar múltiples Promises en paralelo
// ============================================

function tarea1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Tarea 1 completada');
            resolve('Resultado 1');
        }, 2000);
    });
}

function tarea2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Tarea 2 completada');
            resolve('Resultado 2');
        }, 1500);
    });
}

function tarea3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Tarea 3 completada');
            resolve('Resultado 3');
        }, 1000);
    });
}

// ============================================
// VERSIÓN PARALELA (todas al mismo tiempo)
// ============================================
async function ejecutarParalelo() {
    console.log('Inicio paralelo');
    const inicio = Date.now();
    
    // Promise.all espera TODAS las promises
    const resultados = await Promise.all([
        tarea1(),  // 2s
        tarea2(),  // 1.5s
        tarea3()   // 1s
    ]);
    
    const duracion = (Date.now() - inicio) / 1000;
    console.log('Resultados:', resultados);
    console.log(`Duración total: ${duracion}s`);  // ~2s (la más lenta)
}

ejecutarParalelo();

// ============================================
// Orden de ejecución:
// ============================================
// Inicio paralelo
// Tarea 3 completada (1s)
// Tarea 2 completada (1.5s)
// Tarea 1 completada (2s)
// Resultados: ['Resultado 1', 'Resultado 2', 'Resultado 3']
// Duración total: 2s
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Tenés 3 funciones que simulan descargas. Ejecutalas EN PARALELO y mostrá:
1. Cuánto tardó en total
2. Todos los archivos descargados

**PLANTILLA:**
```javascript
function descargar1() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('archivo1.pdf'), 3000);
    });
}

function descargar2() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('archivo2.pdf'), 2000);
    });
}

function descargar3() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('archivo3.pdf'), 1000);
    });
}

// Tu función async aquí
async function descargarTodo() {
    // Tu código
}

descargarTodo();
```

**RESULTADO ESPERADO:**
```
Archivos: ['archivo1.pdf', 'archivo2.pdf', 'archivo3.pdf']
Duración: 3s  // La más lenta
```

---

#### 💡 HINTS:

**Hint 1:** `const resultados = await Promise.all([...]);`  
**Hint 2:** Medir tiempo: `const inicio = Date.now();` al principio  
**Hint 3:** Al final: `const duracion = (Date.now() - inicio) / 1000;`

---

### Ejercicio 8: Sequential vs Parallel Performance

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Comparar Sequential vs Parallel
// ============================================

function apiCall(id, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Datos ${id}`);
        }, delay);
    });
}

// ============================================
// SECUENCIAL (una tras otra)
// ============================================
async function secuencial() {
    console.log('Inicio secuencial');
    const inicio = Date.now();
    
    const datos1 = await apiCall(1, 1000);  // Espera 1s
    const datos2 = await apiCall(2, 1000);  // Luego espera 1s
    const datos3 = await apiCall(3, 1000);  // Luego espera 1s
    
    const duracion = (Date.now() - inicio) / 1000;
    console.log([datos1, datos2, datos3]);
    console.log(`Duración secuencial: ${duracion}s`);  // ~3s
}

// ============================================
// PARALELO (todas al mismo tiempo)
// ============================================
async function paralelo() {
    console.log('Inicio paralelo');
    const inicio = Date.now();
    
    const resultados = await Promise.all([
        apiCall(1, 1000),  // Todas empiezan al mismo tiempo
        apiCall(2, 1000),
        apiCall(3, 1000)
    ]);
    
    const duracion = (Date.now() - inicio) / 1000;
    console.log(resultados);
    console.log(`Duración paralelo: ${duracion}s`);  // ~1s
}

secuencial();  // 3 segundos
// paralelo();  // 1 segundo
```

**Diferencia:**
- Sequential: 1s + 1s + 1s = 3s
- Parallel: max(1s, 1s, 1s) = 1s

**Cuándo usar cada uno:**
- Sequential: Cuando la segunda depende del resultado de la primera
- Parallel: Cuando son independientes

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Implementá AMBAS versiones (sequential y parallel) y compará tiempos.

**PLANTILLA:**
```javascript
function fetchUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, nombre: 'Ana' }), 2000);
    });
}

function fetchPosts() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(['Post 1', 'Post 2']), 1500);
    });
}

function fetchComentarios() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(['Comentario 1', 'Comentario 2']), 1000);
    });
}

// Versión secuencial
async function cargarSecuencial() {
    // Tu código: ejecutar una tras otra
}

// Versión paralelo
async function cargarParalelo() {
    // Tu código: ejecutar todas al mismo tiempo
}

cargarSecuencial();
// cargarParalelo();
```

**RESULTADO ESPERADO:**
```
// Sequential:
Duración: 4.5s  // 2 + 1.5 + 1

// Parallel:
Duración: 2s  // max(2, 1.5, 1)
```

---

#### 💡 HINTS:

**Hint 1 (Sequential):** Tres await seguidos  
**Hint 2 (Parallel):** `await Promise.all([fetch1(), fetch2(), fetch3()])`  
**Hint 3:** Medir tiempo al inicio y al final

---

### Ejercicio 9: Top-level await

⏱️ **TIEMPO LÍMITE:** 15 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Top-level await (Módulos ES6)
// ============================================

// En un archivo .mjs o con <script type="module">

// SIN top-level await (viejo)
function init() {
    fetch('https://api.com/config')
        .then((config) => {
            console.log('Config cargada:', config);
            app.start(config);
        });
}
init();

// CON top-level await (nuevo)
const config = await fetch('https://api.com/config');
console.log('Config cargada:', config);
app.start(config);

// ============================================
// ¿QUÉ ES?
// ============================================
// - await fuera de async function
// - Solo funciona en módulos ES6
// - Bloquea la carga del módulo hasta que se resuelva
```

**Ventaja:**
Código más limpio sin necesidad de wrapper function.

**Desventaja:**
Bloquea la carga del módulo (puede ser lento).

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Convertí este código a usar top-level await.

**CÓDIGO ORIGINAL:**
```javascript
async function inicializar() {
    const usuarios = await fetch('https://jsonplaceholder.typicode.com/users');
    const configuracion = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  
    const usuariosData = await usuarios.json();
    const configData = await configuracion.json();
  
    const usuariosSimplificados = usuariosData.map((user) => {
      return {id: user.id, name: user.name}
    });
  
    console.log('Usuarios:', usuariosSimplificados);
    console.log('Configuración:', configData);
  
    return { usuarios: usuariosSimplificados, configuracion: configData };
}

inicializar().then((datos) => {
  console.log('App inicializada:', datos);
});
```

**TU TAREA:**
Reescribí sin la función `inicializar()` usando top-level await.

**NOTA:** Para probar esto necesitás:
- Archivo .mjs, o
- `<script type="module">` en HTML

---

#### 💡 HINTS:

**Hint 1:** Eliminá la función `inicializar()`  
**Hint 2:** Los `await` van directamente en el nivel superior  
**Hint 3:** No necesitás `.then()` al final

---

## 🎯 BLOQUE 3: EVENT LOOP PROFUNDO

### Ejercicio 10: Sync vs Async

⏱️ **TIEMPO LÍMITE:** 20 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Orden de ejecución Sync vs Async
// ============================================

console.log('1. Inicio');

setTimeout(() => {
    console.log('2. setTimeout');
}, 0);

console.log('3. Fin');

// ============================================
// ¿QUÉ IMPRIME?
// ============================================
// 1. Inicio
// 3. Fin
// 2. setTimeout

// ============================================
// ¿POR QUÉ?
// ============================================
// 1. Código síncrono se ejecuta PRIMERO (call stack)
// 2. setTimeout se manda a Task Queue (macrotask)
// 3. Event Loop ejecuta call stack completo
// 4. DESPUÉS ejecuta task queue
```

**Flujo del Event Loop:**
```
Call Stack (sync):
1. console.log('Inicio')  ← Ejecuta
2. setTimeout(...)        ← Manda a Task Queue
3. console.log('Fin')     ← Ejecuta

Task Queue (async):
4. console.log('setTimeout')  ← Ejecuta DESPUÉS
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Predecí el orden de ejecución. Luego ejecutá para verificar.

**CÓDIGO:**
```javascript
console.log('A');

setTimeout(() => {
    console.log('B');
}, 0);

console.log('C');

setTimeout(() => {
    console.log('D');
}, 0);

console.log('E');
```

**TU TAREA:**
1. Escribí en papel el orden que creés
2. Ejecutá el código
3. Verificá si acertaste

**PREGUNTA ADICIONAL:**
¿Por qué B y D se ejecutan al final si tienen delay 0?

---

#### 💡 HINTS:

**Hint 1:** Código síncrono SIEMPRE primero  
**Hint 2:** setTimeout SIEMPRE va al final (aunque sea 0ms)  
**Hint 3:** Orden: A → C → E → B → D

---

### Ejercicio 11: Microtasks (Promises)

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promises vs setTimeout
// ============================================

console.log('1. Inicio');

setTimeout(() => {
    console.log('2. setTimeout');
}, 0);

Promise.resolve().then(() => {
    console.log('3. Promise');
});

console.log('4. Fin');

// ============================================
// ¿QUÉ IMPRIME?
// ============================================
// 1. Inicio
// 4. Fin
// 3. Promise
// 2. setTimeout

// ============================================
// ¿POR QUÉ?
// ============================================
// Orden de prioridad:
// 1. Código sync (call stack)
// 2. Microtasks (Promises)
// 3. Macrotasks (setTimeout)
```

**Regla de oro del Event Loop:**
```
Sync → Microtasks → Macrotasks
```

**Analogía:**
- Sync: Tareas urgentes (ahora mismo)
- Microtasks: Tareas importantes (después de las urgentes)
- Macrotasks: Tareas normales (al final)

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Predecí el orden. Luego ejecutá.

**CÓDIGO:**
```javascript
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
```

**TU TAREA:**
1. Predecí orden en papel
2. Ejecutá
3. Explicá por qué ese orden

**PREGUNTA:**
¿Por qué C y E se ejecutan antes que B y F?

---

#### 💡 HINTS:

**Hint 1:** Sync primero: A, D, G  
**Hint 2:** Microtasks segundo: C, E  
**Hint 3:** Macrotasks último: B, F

---

### Ejercicio 12: Microtasks Anidadas

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promise dentro de Promise
// ============================================

console.log('1. Inicio');

Promise.resolve().then(() => {
    console.log('2. Promise 1');
    
    Promise.resolve().then(() => {
        console.log('3. Promise 1.1 (anidada)');
    });
    
    console.log('4. Dentro de Promise 1');
});

console.log('5. Fin');

// ============================================
// ¿QUÉ IMPRIME?
// ============================================
// 1. Inicio
// 5. Fin
// 2. Promise 1
// 4. Dentro de Promise 1
// 3. Promise 1.1 (anidada)

// ============================================
// ¿POR QUÉ?
// ============================================
// 1. Sync: "Inicio", "Fin"
// 2. Microtask: "Promise 1", "Dentro de Promise 1"
// 3. Nueva microtask creada: "Promise 1.1"
// 4. Se ejecuta la nueva microtask
```

**Flujo detallado:**
```
Call Stack:
1. Inicio
5. Fin

Microtask Queue:
2. Promise 1
4. Dentro de Promise 1

Nueva Microtask (creada en paso 2):
3. Promise 1.1
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Predecí el orden de este código complejo.

**CÓDIGO:**
```javascript
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
```

**TU TAREA:**
1. Dibujá el flujo en papel
2. Predecí orden
3. Ejecutá y verificá

**PREGUNTA:**
¿Por qué C se ejecuta después de D?

---

#### 💡 HINTS:

**Hint 1:** Sync: A, E  
**Hint 2:** Primera ronda de microtasks: B, D  
**Hint 3:** C se crea DENTRO de B → se ejecuta después

---

### Ejercicio 13: Mixed (setTimeout + Promise + sync)

⏱️ **TIEMPO LÍMITE:** 35 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Todo mezclado
// ============================================

console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
});

setTimeout(() => {
    console.log('4');
    
    Promise.resolve().then(() => {
        console.log('5');
    });
}, 0);

console.log('6');

// ============================================
// ¿QUÉ IMPRIME?
// ============================================
// 1
// 6
// 3
// 2
// 4
// 5

// ============================================
// EXPLICACIÓN DETALLADA:
// ============================================
// Sync: 1, 6
// Microtasks: 3
// Macrotasks: 2, 4
// Dentro de macrotask 4 → crea microtask 5
```

**Orden de prioridad (repetimos):**
1. **Call Stack** (código sync)
2. **Microtask Queue** (Promises)
3. **Macrotask Queue** (setTimeout)

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Este es el ejercicio más complejo. Predecí TODO el orden.

**CÓDIGO:**
```javascript
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
```

**TU TAREA:**
1. Dibujá diagrama completo
2. Predecí los 10 pasos
3. Ejecutá y compará
4. Si fallaste, explicá por qué

---

#### 💡 HINTS:

**Hint 1:** Sync: Start, Middle, End  
**Hint 2:** Microtasks: Promise 1, Promise 2  
**Hint 3:** Macrotasks: Timeout 1, Timeout 2  
**Hint 4:** Microtasks creadas DENTRO de macrotasks se ejecutan después  
**Hint 5:** Macrotasks creadas DENTRO de microtasks van al final

---

### Ejercicio 14: Event Loop Complex (FINAL BOSS)

⏱️ **TIEMPO LÍMITE:** 45 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Nivel Expert
// ============================================

console.log('Script start');

setTimeout(() => {
    console.log('setTimeout 1');
    Promise.resolve().then(() => {
        console.log('Promise in setTimeout 1');
    });
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        setTimeout(() => {
            console.log('setTimeout in Promise 1');
        }, 0);
    })
    .then(() => {
        console.log('Promise 2');
    });

setTimeout(() => {
    console.log('setTimeout 2');
    Promise.resolve()
        .then(() => {
            console.log('Promise in setTimeout 2');
        })
        .then(() => {
            console.log('Promise chained in setTimeout 2');
        });
}, 0);

console.log('Script end');

// ============================================
// ORDEN CORRECTO:
// ============================================
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout 1
// Promise in setTimeout 1
// setTimeout 2
// Promise in setTimeout 2
// Promise chained in setTimeout 2
// setTimeout in Promise 1
```

**Explicación paso a paso disponible en hints.**

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Predecí el orden completo de este código ultra-complejo.

**CÓDIGO:**
```javascript
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
```

**TU TAREA:**
1. Predecí el orden de los 11 console.log
2. Explicá el razonamiento
3. Ejecutá y verificá
4. Si acertaste → ¡DOMINASTE EL EVENT LOOP! 🎉

---

#### 💡 HINTS:

**Hint 1:** Sync primero: 1, 11  
**Hint 2:** Microtasks primero: 4, 6, 10  
**Hint 3:** Macrotasks: 2, 7  
**Hint 4:** Microtasks creadas en macrotasks: 3, 8, 9  
**Hint 5:** Macrotask creada en microtask: 5 (al final)

**Orden completo:**
```
1, 11 (sync)
4, 6, 10 (microtasks)
2, 3 (macrotask + su microtask)
7, 8, 9 (macrotask + sus microtasks)
5 (macrotask creada en microtask)
```

---

## ✅ CHECKLIST FINAL WARMUP SEMANA 2

Completaste el warmup cuando:

**Bloque 1 (Async/Await):**
- [ ] Entiendo sintaxis async/await
- [ ] Sé manejar errores con try/catch
- [ ] Puedo convertir .then() a async/await
- [ ] Entiendo el return implícito
- [ ] Sé que await solo funciona en async

**Bloque 2 (Parallel/Sequential):**
- [ ] Uso Promise.all() con await
- [ ] Entiendo diferencia parallel vs sequential
- [ ] Sé cuándo usar cada uno
- [ ] Puedo medir y comparar performance

**Bloque 3 (Event Loop):**
- [ ] Entiendo sync vs async
- [ ] Distingo microtasks de macrotasks
- [ ] Sé que Promises > setTimeout en prioridad
- [ ] Puedo predecir orden de ejecución
- [ ] Domino casos complejos

---

## 🎯 GOVERNOR REMINDER

**Límites:**
- Máximo 3 días para completar warmup
- Si un ejercicio toma >30 min → ver hints
- Si con hints toma >45 min → preguntar
- Entender > Perfeccionar

**80% de los ejercicios correctos = SUFICIENTE → NEXT proyecto**

---

## 🚀 PRÓXIMO PASO

Al completar este warmup, continúas con:

**PROYECTO 2: Visualizador de Event Loop**
- Herramienta interactiva que MUESTRA el Event Loop en tiempo real
- Visualizar Call Stack, Microtask Queue, Macrotask Queue
- Ejecutar código paso a paso
- Entender visualmente todo lo que practicaste aquí

---

**FIN DEL WARMUP SEMANA 2**

Versión: 1.0  
Ejercicios: 14 (6 async/await + 3 parallel/sequential + 5 event loop)  
Duración: 9-12 horas  
Nivel esperado al final: Intermedio-Avanzado en Async/Event Loop ⭐⭐⭐
