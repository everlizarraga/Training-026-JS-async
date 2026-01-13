# 🧠 GUÍA COMPLETA: Advanced Patterns (Semana 3 - Bloque 3)

**Objetivo:** Entender COMPLETAMENTE AbortController, Timeout patterns, Retry logic y Exponential Backoff desde cero.

**Prerequisito:** Conocer Promises y fetch básico.

---

## 📖 TABLA DE CONTENIDOS

1. [AbortController - Cancelar Requests](#abortcontroller)
2. [Error Object - Propiedades y Métodos](#error-object)
3. [Timeout Pattern - No Esperar Forever](#timeout-pattern)
4. [Retry Logic - Reintentar Automáticamente](#retry-logic)
5. [Exponential Backoff - Estrategia de Reintentos](#exponential-backoff)
6. [Casos de Uso Reales](#casos-uso-reales)

---

<a name="abortcontroller"></a>
## 1. 🛑 AbortController - Cancelar Requests

### ¿Qué es AbortController?

**Definición simple:**  
Es una **API del navegador** (Web API) que permite CANCELAR operaciones asíncronas como fetch, addEventListener, etc.

**Analogía:**  
Imaginá que pedís una pizza por teléfono. Después de colgar, te arrepentís. ¿Podés cancelar el pedido? SÍ, si llamás rápido.

```
Sin AbortController:
- Pedís pizza → Esperás → Llega (aunque no la quieras)

Con AbortController:
- Pedís pizza → Te arrepentís → Llamás para cancelar → No llega
```

---

### ¿Es API del navegador o de JavaScript?

**Respuesta:** Es una **Web API** (API del navegador/Node.js).

**Aclaración:**
```
JavaScript puro:
- Promises
- async/await
- Array methods
- etc.

Web APIs (navegador):
- fetch()
- setTimeout()
- AbortController ← ESTE
- localStorage
- etc.
```

**AbortController está disponible en:**
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Node.js (desde versión 15)
- ❌ NO en IE11 (obsoleto)

---

### ¿Cómo funciona AbortController?

**Componentes:**

```
AbortController (el controlador)
    │
    ├─ signal (la señal)
    │     │
    │     └─ aborted (boolean: ¿cancelado?)
    │
    └─ abort() (método para cancelar)
```

**Flujo:**

```
1. Crear controlador → new AbortController()
2. Obtener signal → controller.signal
3. Pasar signal a fetch → fetch(url, { signal })
4. Cancelar cuando necesites → controller.abort()
5. fetch lanza error → catch captura AbortError
```

---

### Ejemplo Paso a Paso

```javascript
// ============================================
// PASO 1: Crear AbortController
// ============================================
const controller = new AbortController();
// controller = { signal: AbortSignal, abort: function }

// ============================================
// PASO 2: Obtener la señal (signal)
// ============================================
const signal = controller.signal;
// signal = { aborted: false, ... }
console.log(signal.aborted);  // false (aún no cancelado)

// ============================================
// PASO 3: Hacer fetch CON la señal
// ============================================
fetch('https://api.com/data', {
    signal: signal  // ← Conectar la señal al fetch
})
.then(response => response.json())
.then(data => {
    console.log('Datos recibidos:', data);
})
.catch(error => {
    // Si controller.abort() se llama → entra acá
    if (error.name === 'AbortError') {
        console.log('Request cancelado');
    } else {
        console.error('Otro error:', error);
    }
});

// ============================================
// PASO 4: Cancelar el request
// ============================================
// (en cualquier momento antes de que complete)
controller.abort();
// Ahora signal.aborted = true
// fetch lanza AbortError
```

---

### Diagrama ASCII del Flujo

```
┌───────────────────────────────────────────────────────────┐
│                  JAVASCRIPT CODE                          │
│                                                           │
│  const controller = new AbortController();               │
│  const signal = controller.signal;                       │
│                                                           │
│  fetch(url, { signal: signal })  ←─────┐                │
│      .then(...)                          │                │
│      .catch(error => ...)                │                │
│                                          │                │
│  // Después de 2 segundos:              │                │
│  controller.abort();  ───────────────────┘                │
│                                                           │
└───────────────────────────────────────────────────────────┘
                          ↓
                   (signal conectado)
                          ↓
┌───────────────────────────────────────────────────────────┐
│                    FETCH REQUEST                          │
│                                                           │
│  Request en progreso...                                  │
│  [●●●●●●●●  ] Descargando datos...                       │
│                                                           │
│  ← signal.aborted cambia a true                         │
│                                                           │
│  ¡CANCELAR INMEDIATAMENTE!                               │
│  Lanzar AbortError                                       │
│                                                           │
└───────────────────────────────────────────────────────────┘
                          ↓
                   (entra al catch)
                          ↓
┌───────────────────────────────────────────────────────────┐
│                    CATCH BLOCK                            │
│                                                           │
│  if (error.name === 'AbortError') {                      │
│      console.log('Request cancelado');                   │
│  }                                                       │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

### ¿Por qué pasar "signal" al fetch?

**Pregunta:** ¿No puede controller comunicarse con fetch automáticamente?

**Respuesta:** NO. Necesitás CONECTARLOS explícitamente.

**Analogía:**
```
Controller = Control remoto
Signal = Señal infrarroja
Fetch = TV

Si no apuntás el control al TV (pasar signal), 
no se comunican.

fetch(url, { signal })  ← "Apuntar el control al TV"
```

**Sin signal:**
```javascript
const controller = new AbortController();

fetch('https://api.com/data');  // ← NO conectado

controller.abort();  // ← No hace nada (fetch no sabe del controller)
```

**Con signal:**
```javascript
const controller = new AbortController();

fetch('https://api.com/data', { 
    signal: controller.signal  // ← CONECTADO
});

controller.abort();  // ← Funciona (fetch está escuchando)
```

---

### ¿Es obligatorio como method, headers, body?

**Respuesta:** NO es obligatorio, es **opcional**.

**Segundo parámetro de fetch (opciones):**
```javascript
fetch(url, {
    method: 'POST',        // Opcional (default: 'GET')
    headers: { ... },      // Opcional
    body: JSON.stringify(...), // Opcional
    signal: controller.signal, // Opcional ← Este
    mode: 'cors',          // Opcional
    credentials: 'include' // Opcional
    // ... más opciones
})
```

**Solo necesitás `signal` si querés poder cancelar.**

---

### Ejemplo Completo Comentado

```javascript
// ============================================
// EJEMPLO: Cancelar fetch después de 3 segundos
// ============================================

async function fetchConCancelacion() {
    // 1. Crear AbortController
    const controller = new AbortController();
    
    // 2. Configurar cancelación automática
    const timeoutId = setTimeout(() => {
        console.log('⏰ Timeout - Cancelando request...');
        controller.abort();
    }, 3000);  // 3 segundos
    
    try {
        console.log('🚀 Iniciando request...');
        
        // 3. Hacer fetch con signal
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            signal: controller.signal  // ← Pasar signal
        });
        
        // Si llegó acá → request completó antes de 3s
        clearTimeout(timeoutId);  // Cancelar el timeout
        
        const datos = await response.json();
        console.log('✅ Datos recibidos:', datos.length);
        
        return datos;
        
    } catch (error) {
        // 4. Manejar cancelación
        if (error.name === 'AbortError') {
            console.log('❌ Request cancelado por timeout');
        } else {
            console.error('❌ Error:', error.message);
        }
        
        throw error;
    }
}

fetchConCancelacion();

// ============================================
// FLUJO:
// ============================================
// Si request completa en 1s:
//   → clearTimeout cancela el abort
//   → Retorna datos normalmente
//
// Si request tarda 5s:
//   → setTimeout ejecuta controller.abort() a los 3s
//   → fetch lanza AbortError
//   → Entra al catch con error.name === 'AbortError'
```

---

### Caso de Uso Real: Autocomplete

```javascript
// ============================================
// EJEMPLO REAL: Autocomplete que cancela búsquedas anteriores
// ============================================

let controllerAnterior = null;

async function buscarPeliculas(query) {
    // 1. Cancelar búsqueda anterior si existe
    if (controllerAnterior) {
        controllerAnterior.abort();
        console.log('🗑️ Búsqueda anterior cancelada');
    }
    
    // 2. Crear nuevo controller para esta búsqueda
    controllerAnterior = new AbortController();
    
    try {
        console.log(`🔍 Buscando: "${query}"`);
        
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            { signal: controllerAnterior.signal }
        );
        
        const datos = await response.json();
        console.log(`✅ Encontradas ${datos.results.length} películas`);
        
        // Mostrar resultados en UI
        mostrarResultados(datos.results);
        
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('⏭️ Búsqueda reemplazada por una nueva');
        } else {
            console.error('❌ Error:', error);
        }
    }
}

// Usuario escribe en input:
buscarPeliculas('re');      // ← Búsqueda 1 (cancelada)
buscarPeliculas('rea');     // ← Búsqueda 2 (cancelada)
buscarPeliculas('react');   // ← Búsqueda 3 (completa)

// Solo la última búsqueda muestra resultados
```

**Flujo visual:**
```
Usuario escribe:
  r → buscarPeliculas('r')     [Request 1 iniciado]
  e → buscarPeliculas('re')    [Request 2 iniciado → Cancela Request 1]
  a → buscarPeliculas('rea')   [Request 3 iniciado → Cancela Request 2]
  c → buscarPeliculas('reac')  [Request 4 iniciado → Cancela Request 3]
  t → buscarPeliculas('react') [Request 5 iniciado → Cancela Request 4]
      
Solo Request 5 completa y muestra resultados ✅
```

---

### Propiedades y Métodos

**AbortController:**
```javascript
const controller = new AbortController();

// Propiedades:
controller.signal      // AbortSignal object

// Métodos:
controller.abort()     // Cancelar la operación
```

**AbortSignal:**
```javascript
const signal = controller.signal;

// Propiedades:
signal.aborted         // boolean: ¿ya fue cancelado?
signal.reason          // razón de la cancelación (si hay)

// Eventos:
signal.addEventListener('abort', () => {
    console.log('Signal cancelado');
});
```

**Ejemplo:**
```javascript
const controller = new AbortController();
const signal = controller.signal;

console.log(signal.aborted);  // false

signal.addEventListener('abort', () => {
    console.log('¡Cancelado!');
    console.log('Razón:', signal.reason);
});

controller.abort();  // Dispara el evento 'abort'
console.log(signal.aborted);  // true
```

---

### Múltiples Operaciones con el Mismo Controller

**Puedes usar el MISMO signal para múltiples fetches:**

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Múltiples requests con el mismo signal
Promise.all([
    fetch('/api/users', { signal }),
    fetch('/api/posts', { signal }),
    fetch('/api/comments', { signal })
])
.then(responses => {
    console.log('Todos completados');
})
.catch(error => {
    if (error.name === 'AbortError') {
        console.log('TODOS los requests cancelados');
    }
});

// Cancelar TODOS de una vez
controller.abort();
```

🤔 LA PREGUNTA
¿Qué pasa si hago controller.abort() DESPUÉS de que fetch ya completó?

✅ RESPUESTA CORTA
NO pasa nada. No hay error.
Una vez que fetch completó (resolve o reject), el abort NO tiene efecto.

📖 EXPLICACIÓN DETALLADA
Experimento 1: Abort después de éxito

```javascript
async function testAbortDespuesDeExito() {
    const controller = new AbortController();
    
    try {
        console.log('1. Iniciando fetch...');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
            signal: controller.signal
        });
        
        console.log('2. Fetch completó exitosamente');
        console.log('   signal.aborted:', controller.signal.aborted);  // false
        
        const datos = await response.json();
        console.log('3. Datos parseados:', datos.name);
        
        // ============================================
        // ABORT DESPUÉS de que ya completó
        // ============================================
        console.log('4. Llamando abort() AHORA (después de completar)...');
        controller.abort();
        
        console.log('5. signal.aborted:', controller.signal.aborted);  // true
        console.log('6. Pero no pasó nada. Sin errores.');
        
        return datos;
        
    } catch (error) {
        // ← NO entra acá
        console.log('ERROR:', error.name);
    }
}

testAbortDespuesDeExito();
// ============================================
// OUTPUT:
// ============================================
// 1. Iniciando fetch...
// 2. Fetch completó exitosamente
//    signal.aborted: false
// 3. Datos parseados: Leanne Graham
// 4. Llamando abort() AHORA (después de completar)...
// 5. signal.aborted: true
// 6. Pero no pasó nada. Sin errores.
```
Conclusión: abort() cambia signal.aborted a true, pero no causa error porque fetch ya terminó.

---
Experimento 2: Por qué necesitamos clearTimeout()
```javascript
async function ejemploConTimeout() {
    const controller = new AbortController();
    
    // Timeout que ejecutará abort() después de 3 segundos
    const timeoutId = setTimeout(() => {
        console.log('⏰ Timeout ejecutado - llamando abort()');
        controller.abort();
    }, 3000);
    
    try {
        console.log('Iniciando fetch...');
        
        // Fetch que completa en 1 segundo
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
            signal: controller.signal
        });
        
        console.log('✅ Fetch completó en 1s (antes del timeout)');
        
        // ============================================
        // CASO A: SIN clearTimeout
        // ============================================
        // NO cancelamos el timeout
        // → setTimeout seguirá ejecutándose
        // → A los 3s llamará controller.abort()
        // → Pero fetch ya completó → no hace nada
        
        // ============================================
        // CASO B: CON clearTimeout (CORRECTO)
        // ============================================
        clearTimeout(timeoutId);  // ← Cancelar el timeout
        console.log('✅ Timeout cancelado (ya no se ejecutará)');
        
        const datos = await response.json();
        return datos;
        
    } catch (error) {
        console.log('❌ Error:', error.name);
        clearTimeout(timeoutId);//← Limpiar timeout también en caso de error
    }
}

ejemploConTimeout();

// ============================================
// SIN clearTimeout (output):
// ============================================
// Iniciando fetch...
// ✅ Fetch completó en 1s (antes del timeout)
// ... 2 segundos después ...
// ⏰ Timeout ejecutado - llamando abort()
// (pero no hace nada porque fetch ya completó)

// ============================================
// CON clearTimeout (output):
// ============================================
// Iniciando fetch...
// ✅ Fetch completó en 1s (antes del timeout)
// ✅ Timeout cancelado (ya no se ejecutará)
// (el setTimeout nunca se ejecuta)
```

---

## 🔍 DIAGRAMA DEL FLUJO

### Caso A: Fetch completa ANTES del timeout
```
0s  → fetch inicia + setTimeout(abort, 3000)
      ↓
1s  → fetch COMPLETA ✅
      ↓
      clearTimeout(timeoutId)  ← IMPORTANTE
      ↓
3s  → setTimeout NO se ejecuta (fue cancelado)
      ↓
      Todo bien, sin errores
```

### Caso B: Fetch completa ANTES, pero NO cancelamos timeout
```
0s  → fetch inicia + setTimeout(abort, 3000)
      ↓
1s  → fetch COMPLETA ✅
      ↓
      NO clearTimeout  ❌
      ↓
3s  → setTimeout se ejecuta
      ↓
      controller.abort() llamado
      ↓
      signal.aborted = true
      ↓
      Pero NO hace nada (fetch ya completó)
      ↓
      Sin errores, pero desperdicio de recursos
```

### Caso C: Timeout se ejecuta ANTES que fetch
```
0s  → fetch inicia + setTimeout(abort, 3000)
      ↓
3s  → setTimeout se ejecuta PRIMERO
      ↓
      controller.abort()
      ↓
      fetch lanza AbortError ❌
      ↓
      Entra al catch
      ↓
      clearTimeout nunca se ejecuta (ya fue tarde)
```

💡 POR QUÉ HACER clearTimeout()
Razones:

Limpieza de recursos:
El setTimeout sigue en memoria aunque no haga nada
Buena práctica cancelarlo cuando ya no se necesita


Evitar efectos secundarios:
Aunque abort() no cause error, cambia signal.aborted
Podría confundir código que verifique ese estado


Performance:
En apps con muchos requests, timeouts sin cancelar se acumulan


---

### Resumen AbortController

**¿Qué es?**
- Web API para cancelar operaciones asíncronas

**¿Cómo funciona?**
1. Crear: `new AbortController()`
2. Obtener signal: `controller.signal`
3. Conectar: `fetch(url, { signal })`
4. Cancelar: `controller.abort()`

**¿Es obligatorio?**
- NO, solo si querés poder cancelar

**Casos de uso:**
- Autocomplete (cancelar búsquedas anteriores)
- Timeout (cancelar requests lentos)
- Navegación (cancelar al cambiar de página)

---

### 💎 RESUMEN EJECUTIVO
Pregunta: ¿Qué hace abort() por dentro?
Respuesta nivel 1 (simple):
Cierra la conexión de red y descarta los datos.
Respuesta nivel 2 (intermedio):
Cierra el socket TCP, libera buffers, descarta datos descargados, y rechaza la Promise.
Respuesta nivel 3 (técnico):
Envía TCP RST al servidor, cierra file descriptor del socket, libera memoria de buffers de I/O, cancela operaciones de lectura asíncronas pendientes, y propaga AbortError por la cadena de Promises.
Lo que NO hace:

❌ NO envía request de "cancelación" al servidor
❌ NO garantiza que el servidor detenga el procesamiento
❌ NO "des-envía" el request original

Lo que SÍ hace:

✅ Cierra conexión TCP inmediatamente
✅ Descarta datos recibidos
✅ Libera recursos (RAM, CPU, red)
✅ Lanza AbortError en JavaScript


---

<a name="error-object"></a>
## 2. 🚨 Error Object - Propiedades y Métodos

### ¿Qué es un Error?

**Definición:**  
Un objeto que representa un error en JavaScript.

**Creación:**
```javascript
// Crear error manualmente
const error = new Error('Algo salió mal');

// Lanzar error
throw new Error('Algo salió mal');

// Capturar error
try {
    throw new Error('Algo salió mal');
} catch (error) {
    // error es un objeto Error
}
```

---

### Propiedades del Error Object

```javascript
try {
    throw new Error('Este es el mensaje');
} catch (error) {
    // ============================================
    // PROPIEDADES ESTÁNDAR (todos los browsers)
    // ============================================
    
    console.log(error.name);     // 'Error'
    console.log(error.message);  // 'Este es el mensaje'
    console.log(error.stack);    // Stack trace (debugging)
    
    // ============================================
    // PROPIEDAD NO ESTÁNDAR (algunos browsers)
    // ============================================
    
    console.log(error.fileName);    // Archivo donde ocurrió (Firefox)
    console.log(error.lineNumber);  // Línea donde ocurrió (Firefox)
    console.log(error.columnNumber); // Columna (Firefox)
}
```

---

### Propiedad: error.name

**¿Qué es?**  
El TIPO de error.

**Tipos comunes:**

```javascript
// 1. Error genérico
const error = new Error('mensaje');
console.log(error.name);  // 'Error'

// 2. TypeError (tipo incorrecto)
try {
    null.toUpperCase();
} catch (error) {
    console.log(error.name);  // 'TypeError'
}

// 3. ReferenceError (variable no existe)
try {
    console.log(variableQueNoExiste);
} catch (error) {
    console.log(error.name);  // 'ReferenceError'
}

// 4. SyntaxError (sintaxis incorrecta)
try {
    eval('const a =');
} catch (error) {
    console.log(error.name);  // 'SyntaxError'
}

// 5. RangeError (valor fuera de rango)
try {
    const arr = new Array(-1);
} catch (error) {
    console.log(error.name);  // 'RangeError'
}

// 6. AbortError (fetch cancelado)
try {
    const controller = new AbortController();
    controller.abort();
    await fetch('/api/data', { signal: controller.signal });
} catch (error) {
    console.log(error.name);  // 'AbortError'
}
```

---

### Propiedad: error.message

**¿Qué es?**  
La DESCRIPCIÓN del error (lo que pasaste al constructor).

```javascript
const error = new Error('Usuario no encontrado');

console.log(error.name);     // 'Error'
console.log(error.message);  // 'Usuario no encontrado'
```

---

### Propiedad: error.stack

**¿Qué es?**  
El STACK TRACE (dónde ocurrió el error).

**Útil para debugging.**

```javascript
function nivel3() {
    throw new Error('Error en nivel 3');
}

function nivel2() {
    nivel3();
}

function nivel1() {
    nivel2();
}

try {
    nivel1();
} catch (error) {
    console.log(error.stack);
}

// Output:
// Error: Error en nivel 3
//     at nivel3 (archivo.js:2)
//     at nivel2 (archivo.js:6)
//     at nivel1 (archivo.js:10)
//     at <anonymous>:1:5
```

**Muestra la CADENA de llamadas** (call stack).

---

### Comparación: name vs message

```javascript
try {
    await fetch('/api/data', { signal: abortedSignal });
} catch (error) {
    // ============================================
    // Usar error.name para TIPO de error
    // ============================================
    if (error.name === 'AbortError') {
        console.log('Request cancelado');
    } else if (error.name === 'TypeError') {
        console.log('Error de tipo');
    }
    
    // ============================================
    // Usar error.message para DESCRIPCIÓN
    // ============================================
    console.log('Detalles:', error.message);
}
```

**Cuándo usar cada uno:**

| Propiedad | Cuándo usar |
|-----------|-------------|
| `error.name` | Detectar TIPO de error (para lógica condicional) |
| `error.message` | Mostrar DESCRIPCIÓN al usuario o logging |
| `error.stack` | Debugging (encontrar dónde ocurrió) |

---

### Crear Errores Personalizados

```javascript
// ============================================
// Error con name custom
// ============================================
const error = new Error('Credenciales inválidas');
error.name = 'AuthenticationError';

console.log(error.name);     // 'AuthenticationError'
console.log(error.message);  // 'Credenciales inválidas'

// ============================================
// Clase de Error custom
// ============================================
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

try {
    throw new ValidationError('Email inválido');
} catch (error) {
    if (error.name === 'ValidationError') {
        console.log('Error de validación:', error.message);
    }
}
```

---

### Resumen Error Object

**Propiedades principales:**
- `error.name` → Tipo de error (para condicionales)
- `error.message` → Descripción (para mostrar/loggear)
- `error.stack` → Stack trace (para debugging)

**Uso con AbortController:**
```javascript
catch (error) {
    if (error.name === 'AbortError') {  // ← Usar .name
        console.log('Request cancelado');
    }
}
```



---

<a name="timeout-pattern"></a>
## 3. ⏱️ Timeout Pattern - No Esperar Forever

### ¿Qué es el Timeout Pattern?

**Problema:**  
Un fetch puede tardar MUCHO tiempo (servidor lento, sin respuesta).

**Solución:**  
Cancelar el request si tarda más de X segundos.

**Analogía:**
```
Esperás un paquete de correo:
- Si llega en 3 días → perfecto
- Si tarda 2 semanas → cancelás el pedido y pedís reembolso
```

---

### Implementación con Promise.race()

```javascript
// ============================================
// MÉTODO 1: Timeout con Promise.race()
// ============================================

async function fetchConTimeout(url, timeoutMs = 5000) {
    // Promise 1: El fetch real
    const fetchPromise = fetch(url).then(r => r.json());
    
    // Promise 2: El timeout
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Timeout: más de ${timeoutMs}ms`));
        }, timeoutMs);
    });
    
    // Race: el que complete primero gana
    try {
        const resultado = await Promise.race([
            fetchPromise,
            timeoutPromise
        ]);
        
        console.log('✅ Request completado a tiempo');
        return resultado;
        
    } catch (error) {
        if (error.message.includes('Timeout')) {
            console.log('⏰ Request cancelado por timeout');
        }
        throw error;
    }
}

// Uso:
fetchConTimeout('https://api-lenta.com/data', 3000);
```

**Flujo:**
```
0s  → fetch inicia + timeout inicia
    → Ambos corren en paralelo
    
2s  → fetch aún cargando...
    → timeout aún esperando...
    
3s  → timeout completa PRIMERO
    → Promise.race retorna timeout (reject)
    → fetch sigue en background (pero se ignora)
```

---

### Implementación con AbortController

```javascript
// ============================================
// MÉTODO 2: Timeout con AbortController (MEJOR)
// ============================================

async function fetchConTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    
    // Configurar timeout para cancelar
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutMs);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        
        // Si llegó acá → completó a tiempo
        clearTimeout(timeoutId);  // Cancelar el timeout
        
        const datos = await response.json();
        console.log('✅ Request completado a tiempo');
        
        return datos;
        
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('⏰ Request cancelado por timeout');
        }
        throw error;
    }
}

// Uso:
fetchConTimeout('https://api-lenta.com/data', 3000);
```

**Ventaja vs Promise.race():**
- ✅ fetch se CANCELA realmente (no sigue en background)
- ✅ Ahorra recursos (network, CPU)
- ✅ Más eficiente

---

### Comparación Visual

```
┌─────────────────────────────────────────────────────────┐
│              Promise.race() (no cancela)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  fetch iniciado                                         │
│    ↓                                                    │
│  Promise.race([fetch, timeout])                         │
│    ↓                                                    │
│  Timeout gana → rechaza                                 │
│    ↓                                                    │
│  fetch SIGUE ejecutándose en background ❌              │
│  (desperdicio de recursos)                             │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         AbortController (cancela realmente)             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  fetch iniciado con signal                              │
│    ↓                                                    │
│  setTimeout() esperando...                              │
│    ↓                                                    │
│  Timeout → controller.abort()                           │
│    ↓                                                    │
│  fetch CANCELADO inmediatamente ✅                      │
│  (ahorra recursos)                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Helper Reutilizable

```javascript
// ============================================
// Helper: fetch con timeout automático
// ============================================

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
    const controller = new AbortController();
    
    // Agregar signal a options
    const fetchOptions = {
        ...options,
        signal: controller.signal
    };
    
    // Configurar timeout
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error(`Timeout: más de ${timeoutMs}ms`);
        }
        
        throw error;
    }
}

// Uso simple:
const datos = await fetchWithTimeout('https://api.com/data', {}, 3000);
```

---

<a name="retry-logic"></a>
## 4. 🔄 Retry Logic - Reintentar Automáticamente

### ¿Qué es Retry Logic?

**Problema:**  
Un request puede fallar temporalmente (servidor ocupado, red inestable).

**Solución:**  
Intentar de nuevo automáticamente.

**Analogía:**
```
Llamás a un amigo por teléfono:
- Primera vez: ocupado
- Segunda vez: ocupado
- Tercera vez: atiende ✅

No te rendiste al primer intento.
```

---

### Implementación Básica

```javascript
// ============================================
// EJEMPLO: Retry simple (3 intentos)
// ============================================

async function fetchConRetry(url, maxRetries = 3) {
    let lastError;
    
    for (let intento = 1; intento <= maxRetries; intento++) {
        try {
            console.log(`Intento ${intento}/${maxRetries}...`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const datos = await response.json();
            console.log(`✅ Éxito en intento ${intento}`);
            
            return datos;
            
        } catch (error) {
            lastError = error;
            console.log(`❌ Intento ${intento} falló:`, error.message);
            
            // Si no es el último intento → esperar antes de reintentar
            if (intento < maxRetries) {
                console.log('Esperando 1s antes de reintentar...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    
    // Si llegó acá → todos los intentos fallaron
    console.error('❌ Todos los intentos fallaron');
    throw lastError;
}

// Uso:
fetchConRetry('https://api-inestable.com/data');

// ============================================
// Output esperado:
// ============================================
// Intento 1/3...
// ❌ Intento 1 falló: HTTP 500
// Esperando 1s antes de reintentar...
// Intento 2/3...
// ❌ Intento 2 falló: HTTP 500
// Esperando 1s antes de reintentar...
// Intento 3/3...
// ✅ Éxito en intento 3
```

---

### Flujo Visual

```
┌─────────────────────────────────────────────────────┐
│                   RETRY LOGIC                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Intento 1:                                        │
│    fetch(url)  →  ❌ Error 500                     │
│       ↓                                            │
│    Esperar 1s                                      │
│       ↓                                            │
│  Intento 2:                                        │
│    fetch(url)  →  ❌ Error 503                     │
│       ↓                                            │
│    Esperar 1s                                      │
│       ↓                                            │
│  Intento 3:                                        │
│    fetch(url)  →  ✅ Éxito (200)                   │
│       ↓                                            │
│    Retornar datos                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### ¿Cuándo Reintentar?

**NO todos los errores deben reintentarse:**

```javascript
async function fetchConRetryInteligente(url, maxRetries = 3) {
    for (let intento = 1; intento <= maxRetries; intento++) {
        try {
            const response = await fetch(url);
            
            // ============================================
            // Decidir si vale la pena reintentar
            // ============================================
            
            if (response.ok) {
                // 200-299: Éxito
                return await response.json();
            }
            
            // Errores que NO deben reintentarse:
            if (response.status === 400) {
                // Bad Request (error del cliente)
                throw new Error('Request inválido');
            }
            if (response.status === 401 || response.status === 403) {
                // No autorizado (no ayuda reintentar)
                throw new Error('No autorizado');
            }
            if (response.status === 404) {
                // Not Found (no existe, no aparecerá)
                throw new Error('Recurso no encontrado');
            }
            
            // Errores que SÍ deben reintentarse:
            if (response.status >= 500) {
                // 500, 503 (error del servidor, temporal)
                throw new Error(`Server error ${response.status}`);
            }
            if (response.status === 429) {
                // Too Many Requests (esperar y reintentar)
                throw new Error('Rate limit excedido');
            }
            
        } catch (error) {
            // Si es el último intento → lanzar error
            if (intento === maxRetries) {
                throw error;
            }
            
            // Si es network error → reintentar
            if (error.message.includes('Failed to fetch')) {
                console.log('Network error, reintentando...');
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
            }
            
            // Si es error 4xx (cliente) → NO reintentar
            if (error.message.includes('400') || 
                error.message.includes('401') ||
                error.message.includes('404')) {
                throw error;
            }
            
            // Si es error 5xx o 429 → reintentar
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
```

**Regla general:**
```
✅ Reintentar:
- Network errors (sin internet)
- 500, 502, 503 (server error temporal)
- 429 (rate limit)

❌ NO reintentar:
- 400 (bad request)
- 401, 403 (no autorizado)
- 404 (not found)
```

---

<a name="exponential-backoff"></a>
## 5. 📈 Exponential Backoff - Estrategia de Reintentos

### ¿Qué es Exponential Backoff?

**Definición:**  
Aumentar el tiempo de espera entre reintentos EXPONENCIALMENTE.

**Problema con delay fijo:**
```
Intento 1: Falla → espera 1s → Intento 2
Intento 2: Falla → espera 1s → Intento 3
Intento 3: Falla → espera 1s → Intento 4

Problema: Si el servidor está saturado, seguís bombardeándolo
cada 1 segundo → empeora la situación.
```

**Solución con exponential backoff:**
```
Intento 1: Falla → espera 1s → Intento 2
Intento 2: Falla → espera 2s → Intento 3
Intento 3: Falla → espera 4s → Intento 4
Intento 4: Falla → espera 8s → Intento 5

Ventaja: Das tiempo al servidor para recuperarse.
```

---

### Fórmula

```
delay = base ^ intento * 1000

Donde:
- base = 2 (típicamente)
- intento = número de intento (1, 2, 3, ...)
- 1000 = conversión a milisegundos
```

**Ejemplos:**
```
Intento 1: 2^1 * 1000 = 2000ms  (2 segundos)
Intento 2: 2^2 * 1000 = 4000ms  (4 segundos)
Intento 3: 2^3 * 1000 = 8000ms  (8 segundos)
Intento 4: 2^4 * 1000 = 16000ms (16 segundos)
```

---

### Gráfico Visual

```
Tiempo de espera (segundos)
    ↑
 16 │                               ●
    │
 12 │
    │
  8 │                       ●
    │
  4 │               ●
    │
  2 │       ●
    │
  0 └───────┴───────┴───────┴───────┴───────→ Intento
        1       2       3       4       5
```

**Crece exponencialmente → mucho más espacio entre intentos.**

---

### Implementación

```javascript
// ============================================
// EJEMPLO: Retry con Exponential Backoff
// ============================================

async function fetchConExponentialBackoff(url, maxRetries = 5) {
    let lastError;
    
    for (let intento = 1; intento <= maxRetries; intento++) {
        try {
            console.log(`Intento ${intento}/${maxRetries}...`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const datos = await response.json();
            console.log(`✅ Éxito en intento ${intento}`);
            
            return datos;
            
        } catch (error) {
            lastError = error;
            console.log(`❌ Intento ${intento} falló:`, error.message);
            
            // Si no es el último intento → esperar con backoff
            if (intento < maxRetries) {
                // ============================================
                // EXPONENTIAL BACKOFF
                // ============================================
                const delay = Math.pow(2, intento) * 1000;  // 2^intento * 1000ms
                
                console.log(`⏳ Esperando ${delay}ms antes de reintentar...`);
                
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    // Todos los intentos fallaron
    console.error('❌ Todos los intentos fallaron');
    throw lastError;
}

// Uso:
fetchConExponentialBackoff('https://api-saturada.com/data');

// ============================================
// Output esperado:
// ============================================
// Intento 1/5...
// ❌ Intento 1 falló: HTTP 503
// ⏳ Esperando 2000ms antes de reintentar...
// Intento 2/5...
// ❌ Intento 2 falló: HTTP 503
// ⏳ Esperando 4000ms antes de reintentar...
// Intento 3/5...
// ❌ Intento 3 falló: HTTP 503
// ⏳ Esperando 8000ms antes de reintentar...
// Intento 4/5...
// ✅ Éxito en intento 4
```

---

### Exponential Backoff con Jitter

**Problema:**  
Si 1000 clientes reintentan al mismo tiempo → siguen saturando el servidor.

**Solución:**  
Agregar JITTER (variación aleatoria).

```javascript
// ============================================
// EXPONENTIAL BACKOFF + JITTER
// ============================================

function calcularDelayConJitter(intento, base = 2) {
    // Delay base (exponential)
    const delayBase = Math.pow(base, intento) * 1000;
    
    // Jitter (variación aleatoria ±25%)
    const jitter = delayBase * 0.25 * (Math.random() - 0.5) * 2;
    
    // Delay final
    const delayFinal = delayBase + jitter;
    
    return Math.max(0, delayFinal);  // No negativo
}

// Ejemplos:
console.log(calcularDelayConJitter(1));  // ~2000ms ± 25%
console.log(calcularDelayConJitter(2));  // ~4000ms ± 25%
console.log(calcularDelayConJitter(3));  // ~8000ms ± 25%

// ============================================
// Usar en retry logic:
// ============================================

async function fetchConBackoffYJitter(url, maxRetries = 5) {
    for (let intento = 1; intento <= maxRetries; intento++) {
        try {
            // ... fetch logic
            
        } catch (error) {
            if (intento < maxRetries) {
                const delay = calcularDelayConJitter(intento);
                console.log(`Esperando ${delay.toFixed(0)}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
}
```

**Ventaja del Jitter:**
```
Sin jitter (todos esperan exactamente 4s):
  Cliente 1: reintentar a los 4s
  Cliente 2: reintentar a los 4s
  Cliente 3: reintentar a los 4s
  → Todos bombardean juntos ❌

Con jitter (cada uno espera ~4s ± 25%):
  Cliente 1: reintentar a los 3.2s
  Cliente 2: reintentar a los 4.8s
  Cliente 3: reintentar a los 3.9s
  → Se distribuyen en el tiempo ✅
```

---

### Límite Máximo (Cap)

**Problema:**  
Con muchos reintentos, el delay puede ser DEMASIADO largo.

```
Intento 10: 2^10 * 1000 = 1,024,000ms (17 minutos!) ❌
```

**Solución:**  
Poner un límite máximo.

```javascript
function calcularDelayConCap(intento, base = 2, maxDelay = 60000) {
    const delayBase = Math.pow(base, intento) * 1000;
    
    // No superar maxDelay
    return Math.min(delayBase, maxDelay);
}

// Ejemplos:
console.log(calcularDelayConCap(1));   // 2000ms
console.log(calcularDelayConCap(5));   // 32000ms
console.log(calcularDelayConCap(10));  // 60000ms (cap)
console.log(calcularDelayConCap(20));  // 60000ms (cap)
```

---

### Estrategia Completa

```javascript
// ============================================
// EXPONENTIAL BACKOFF COMPLETO
// (con jitter, cap, y retry inteligente)
// ============================================

async function fetchConBackoffCompleto(url, options = {}) {
    const {
        maxRetries = 5,
        baseDelay = 2,
        maxDelay = 60000,
        shouldRetry = (error) => true  // Función customizable
    } = options;
    
    let lastError;
    
    for (let intento = 1; intento <= maxRetries; intento++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                // Decidir si reintentar según status
                if (response.status >= 400 && response.status < 500) {
                    // Error del cliente → no reintentar
                    throw new Error(`HTTP ${response.status}`);
                }
                throw new Error(`Server error ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            lastError = error;
            
            // Verificar si debe reintentar
            if (!shouldRetry(error) || intento === maxRetries) {
                throw error;
            }
            
            // Calcular delay con exponential backoff + jitter + cap
            const delayBase = Math.pow(baseDelay, intento) * 1000;
            const jitter = delayBase * 0.25 * (Math.random() - 0.5) * 2;
            const delay = Math.min(delayBase + jitter, maxDelay);
            
            console.log(`Reintentando en ${(delay / 1000).toFixed(1)}s...`);
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

// Uso:
const datos = await fetchConBackoffCompleto('https://api.com/data', {
    maxRetries: 5,
    baseDelay: 2,
    maxDelay: 60000,
    shouldRetry: (error) => {
        // No reintentar errores 4xx
        return !error.message.includes('400') && 
               !error.message.includes('404');
    }
});
```

---

### Comparación de Estrategias

| Estrategia | Delay entre intentos | Pros | Contras |
|------------|---------------------|------|---------|
| **Sin retry** | N/A | Simple | Falla fácilmente |
| **Retry inmediato** | 0ms | Rápido | Satura servidor |
| **Delay fijo** | 1s, 1s, 1s | Simple | Sigue saturando |
| **Exponential backoff** | 2s, 4s, 8s | Da tiempo al servidor | Puede ser muy largo |
| **Backoff + Jitter** | ~2s, ~4s, ~8s | Distribuye carga | Más complejo |
| **Backoff + Cap** | 2s, 4s, 8s, 16s, 32s (max) | Balanceado | Requiere ajustar cap |

---

<a name="casos-uso-reales"></a>
## 6. 🌟 Casos de Uso Reales

### Caso 1: Autocomplete con Cancelación

```javascript
let controllerActual = null;

async function autocompleteBusqueda(query) {
    // Cancelar búsqueda anterior
    if (controllerActual) {
        controllerActual.abort();
    }
    
    controllerActual = new AbortController();
    
    try {
        const response = await fetch(`/api/search?q=${query}`, {
            signal: controllerActual.signal
        });
        
        const resultados = await response.json();
        mostrarResultados(resultados);
        
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error:', error);
        }
    }
}

// Input event
inputElement.addEventListener('input', (e) => {
    autocompleteBusqueda(e.target.value);
});
```

---

### Caso 2: Múltiples Endpoints con Timeout

```javascript
async function cargarDashboard() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
        const [usuarios, ventas, estadisticas] = await Promise.all([
            fetch('/api/users', { signal: controller.signal }),
            fetch('/api/sales', { signal: controller.signal }),
            fetch('/api/stats', { signal: controller.signal })
        ]);
        
        clearTimeout(timeoutId);
        
        // Procesar datos...
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            mostrarError('Dashboard tardó mucho en cargar');
        }
    }
}
```

---

### Caso 3: Upload con Retry

```javascript
async function uploadArchivo(archivo) {
    const formData = new FormData();
    formData.append('file', archivo);
    
    return await fetchConBackoffCompleto('/api/upload', {
        method: 'POST',
        body: formData,
        maxRetries: 3,
        shouldRetry: (error) => {
            // Reintentar solo en errores de red o 5xx
            return error.message.includes('Failed to fetch') ||
                   error.message.includes('50');
        }
    });
}
```

---

## ✅ RESUMEN GENERAL

### AbortController
- Web API para cancelar operaciones
- `new AbortController()` + `signal` + `abort()`
- Usar en autocomplete, navegación, timeouts

### Error Object
- `error.name` → Tipo (para condicionales)
- `error.message` → Descripción
- `error.stack` → Debugging

### Timeout Pattern
- Promise.race() (simple pero no cancela)
- AbortController (cancela realmente, mejor)
- Default: 5-10 segundos

### Retry Logic
- Reintentar automáticamente en errores temporales
- NO reintentar errores 4xx (cliente)
- SÍ reintentar 5xx (servidor) y network errors

### Exponential Backoff
- Aumentar delay exponencialmente: 2^n * 1000ms
- Agregar jitter (variación aleatoria)
- Poner cap (máximo 60s típicamente)
- Estrategia profesional para producción

---

## 🎓 CHECKLIST DE DOMINIO

Dominás estos patterns cuando podés:

- [ ] Explicar qué es AbortController
- [ ] Cancelar fetch con signal
- [ ] Distinguir error.name de error.message
- [ ] Implementar timeout con AbortController
- [ ] Implementar retry logic básico
- [ ] Calcular delay con exponential backoff
- [ ] Decidir cuándo reintentar y cuándo no
- [ ] Combinar timeout + retry + backoff

---

**FIN DE LA GUÍA**

Versión: 1.0  
Temas: AbortController, Error Object, Timeout, Retry, Exponential Backoff  
Nivel: Avanzado  
Con todo el amor del mundo 💜
