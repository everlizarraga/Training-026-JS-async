# 🎯 GUÍA COMPLETA: Debouncing y Throttling

**Objetivo:** Entender COMPLETAMENTE debouncing desde cero hasta nivel profesional.

**Prerequisito:** Conocer setTimeout() básico.

---

## 📖 TABLA DE CONTENIDOS

1. [El Problema](#problema)
2. [Debouncing Simple](#debouncing-simple)
3. [Cómo Funciona Internamente](#como-funciona)
4. [Implementación Paso a Paso](#implementacion)
5. [Throttling (Diferencia)](#throttling)
6. [Casos de Uso Reales](#casos-uso)
7. [Debouncing Avanzado](#avanzado)
8. [Comparación Completa](#comparacion)

---

<a name="problema"></a>
## 1. 🔥 EL PROBLEMA

### Escenario Real: Buscador

**Sin debouncing:**

```javascript
// Input de búsqueda
input.addEventListener('input', (e) => {
    buscarEnAPI(e.target.value);  // ← Fetch a la API
});
```

**Usuario escribe:** `"b" "a" "t" "m" "a" "n"`

**Qué pasa:**
```
Usuario escribe: b
    → buscarEnAPI('b')        Request 1 ❌

Usuario escribe: a
    → buscarEnAPI('ba')       Request 2 ❌

Usuario escribe: t
    → buscarEnAPI('bat')      Request 3 ❌

Usuario escribe: m
    → buscarEnAPI('batm')     Request 4 ❌

Usuario escribe: a
    → buscarEnAPI('batma')    Request 5 ❌

Usuario escribe: n
    → buscarEnAPI('batman')   Request 6 ✅ (única útil)
```

**Problema:** 6 requests, solo 1 útil → desperdicias 5 requests.

---

### Analogía: Ascensor

**Sin debouncing:**
```
Persona 1 presiona botón → Ascensor se mueve
Persona 2 presiona botón → Ascensor se mueve otra vez
Persona 3 presiona botón → Ascensor se mueve otra vez

Resultado: Ascensor moviéndose constantemente
           Gasto de energía enorme
           Nadie llega a su piso
```

**Con debouncing:**
```
Persona 1 presiona botón → Ascensor espera...
Persona 2 presiona botón → Ascensor espera...
Persona 3 presiona botón → Ascensor espera...
(5 segundos sin que nadie presione)
    → AHORA SÍ el ascensor se mueve

Resultado: Un solo movimiento
           Gasto eficiente
           Todos llegan juntos
```

---

### Visualización del Problema

**Sin debouncing:**
```
Tiempo →  0ms    100ms   200ms   300ms   400ms   500ms
          │       │       │       │       │       │
Teclas:   b       a       t       m       a       n
          │       │       │       │       │       │
Requests: ●───────●───────●───────●───────●───────●
          1       2       3       4       5       6

Total: 6 requests
```

**Con debouncing (300ms):**
```
Tiempo →  0ms    100ms   200ms   300ms   400ms   500ms   800ms
          │       │       │       │       │       │       │
Teclas:   b       a       t       m       a       n
          │       │       │       │       │       │       │
Espera:   ⏳──────⏳──────⏳──────⏳──────⏳──────⏳──────●
                                                        Request 1

Total: 1 request (después de 300ms sin actividad)
```

---

<a name="debouncing-simple"></a>
## 2. 🎯 DEBOUNCING SIMPLE

### Definición

**Debouncing:** Ejecutar una función solo DESPUÉS de que haya pasado cierto tiempo SIN que se vuelva a llamar.

**En español simple:**
```
"Esperá X segundos de silencio antes de hacer algo"
```

---

### Analogía: Microondas

```
Apretás "30 segundos" en el microondas:
    → Microondas espera...
    
Antes de que termine, apretás "+30 segundos":
    → Microondas REINICIA el timer
    → Ahora espera 30 segundos desde AHORA
    
Apretás "+30 segundos" de nuevo:
    → Microondas REINICIA otra vez
    → Espera 30 segundos desde AHORA
    
(Dejás de apretar)
    → Después de 30 segundos → Empieza a calentar
```

**En código:**
```javascript
function debounce(func, delay) {
    let timer;
    
    return function(...args) {
        clearTimeout(timer);  // ← Cancelar timer anterior
        timer = setTimeout(() => {
            func(...args);  // ← Ejecutar después del delay
        }, delay);
    };
}
```

---

### Ejemplo Visual Paso a Paso

```javascript
const search = debounce(buscarEnAPI, 300);

// Usuario escribe "batman":
```

**Timeline:**

```
0ms: Usuario escribe 'b'
     → clearTimeout() (no había timer)
     → setTimeout(buscarEnAPI, 300ms)
     → Timer inicia: [⏱️  300ms restantes]

100ms: Usuario escribe 'a'
       → clearTimeout() ← CANCELA timer anterior
       → setTimeout(buscarEnAPI, 300ms)
       → Timer reinicia: [⏱️  300ms restantes]

200ms: Usuario escribe 't'
       → clearTimeout() ← CANCELA timer anterior
       → setTimeout(buscarEnAPI, 300ms)
       → Timer reinicia: [⏱️  300ms restantes]

300ms: Usuario escribe 'm'
       → clearTimeout() ← CANCELA timer anterior
       → setTimeout(buscarEnAPI, 300ms)
       → Timer reinicia: [⏱️  300ms restantes]

400ms: Usuario escribe 'a'
       → clearTimeout() ← CANCELA timer anterior
       → setTimeout(buscarEnAPI, 300ms)
       → Timer reinicia: [⏱️  300ms restantes]

500ms: Usuario escribe 'n'
       → clearTimeout() ← CANCELA timer anterior
       → setTimeout(buscarEnAPI, 300ms)
       → Timer reinicia: [⏱️  300ms restantes]

600ms: (usuario dejó de escribir)
700ms: (silencio...)
800ms: ✅ Timer completa → buscarEnAPI('batman')
```

**Resultado:** 1 solo request (después de 300ms de silencio).

---

<a name="como-funciona"></a>
## 3. 🔧 CÓMO FUNCIONA INTERNAMENTE

### Paso 1: Entender setTimeout() y clearTimeout()

```javascript
// setTimeout retorna un ID
const timerId = setTimeout(() => {
    console.log('Ejecutado');
}, 1000);

console.log(timerId);  // Número (ej: 123)

// clearTimeout cancela usando ese ID
clearTimeout(timerId);  // ← Cancela el setTimeout
// "Ejecutado" NUNCA se imprime
```

---

### Paso 2: Debounce usa Closure

```javascript
function debounce(func, delay) {
    let timer;  // ← Variable en closure (persiste entre llamadas)
    
    return function(...args) {
        // Esta función tiene acceso a 'timer'
        // aunque se llame múltiples veces
    };
}
```

**Closure = la función retornada "recuerda" la variable `timer`**

---

### Paso 3: Cancelar y Reiniciar

```javascript
function debounce(func, delay) {
    let timer;
    
    return function(...args) {
        // 1. Cancelar timer anterior (si existe)
        clearTimeout(timer);
        
        // 2. Crear nuevo timer
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
```

**Explicación:**
1. Cada vez que se llama → cancela el timer anterior
2. Crea un nuevo timer desde cero
3. Si nadie vuelve a llamar en X tiempo → se ejecuta

---

### Diagrama de Estado

```
Estado inicial:
    timer = undefined

Primera llamada:
    clearTimeout(undefined)  ← No hace nada
    timer = setTimeout(...)  ← Crear timer
    Estado: [⏱️ Timer activo]

Segunda llamada (antes de que termine el timer):
    clearTimeout(timer)      ← CANCELA timer anterior
    timer = setTimeout(...)  ← Crear NUEVO timer
    Estado: [⏱️ Timer reiniciado]

Tercera llamada:
    clearTimeout(timer)      ← CANCELA
    timer = setTimeout(...)  ← NUEVO timer
    Estado: [⏱️ Timer reiniciado]

(Sin más llamadas)
    ... delay transcurre ...
    func() ejecutada ✅
    Estado: [✓ Completado]
```

---

<a name="implementacion"></a>
## 4. 💻 IMPLEMENTACIÓN PASO A PASO

### Nivel 1: Versión Más Simple

```javascript
function debounce(func, delay) {
    let timer;
    
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
}

// Uso:
const buscarDebounced = debounce(() => {
    console.log('Buscando...');
}, 1000);

buscarDebounced();  // Inicia timer
buscarDebounced();  // Reinicia timer
buscarDebounced();  // Reinicia timer
// ... 1 segundo después → "Buscando..."
```

**Problema:** No pasa argumentos a la función.

---

### Nivel 2: Con Argumentos

```javascript
function debounce(func, delay) {
    let timer;
    
    return function(...args) {  // ← Capturar argumentos
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);  // ← Pasar argumentos
        }, delay);
    };
}

// Uso:
const buscarDebounced = debounce((query) => {
    console.log('Buscando:', query);
}, 1000);

buscarDebounced('batman');   // Reinicia timer
buscarDebounced('superman'); // Reinicia timer
// ... 1 segundo → "Buscando: superman"
```

**Mejor:** Ya pasa argumentos correctamente.

---

### Nivel 3: Con Contexto (this)

```javascript
function debounce(func, delay) {
    let timer;
    
    return function(...args) {
        const context = this;  // ← Capturar contexto
        
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);  // ← Aplicar contexto
        }, delay);
    };
}

// Uso con objeto:
const obj = {
    nombre: 'Batman',
    buscar: debounce(function(query) {
        console.log(`${this.nombre} busca:`, query);
    }, 1000)
};

obj.buscar('Joker');  // "Batman busca: Joker"
```

**Perfecto:** Maneja `this` correctamente.

---

### Nivel 4: Versión Profesional

```javascript
function debounce(func, delay, options = {}) {
    let timer;
    
    return function(...args) {
        const context = this;
        
        // Immediate mode (ejecutar inmediatamente la primera vez)
        const callNow = options.immediate && !timer;
        
        clearTimeout(timer);
        
        timer = setTimeout(() => {
            timer = null;  // ← Limpiar timer
            if (!options.immediate) {
                func.apply(context, args);
            }
        }, delay);
        
        if (callNow) {
            func.apply(context, args);
        }
    };
}

// Uso con immediate:
const buscar = debounce((q) => console.log('Buscando:', q), 1000, { 
    immediate: true  // Primera llamada es inmediata
});

buscar('batman');    // ← Ejecuta INMEDIATAMENTE
buscar('superman');  // ← Espera 1s
```

**Features extra:**
- `immediate: true` → Primera llamada se ejecuta sin delay
- Limpia `timer` después de ejecutar

---

## 5. 📊 EJEMPLO INTERACTIVO

### Sin Debouncing

```javascript
let requestCount = 0;

function buscarSinDebounce(query) {
    requestCount++;
    console.log(`Request ${requestCount}: Buscando "${query}"`);
}

const input = document.getElementById('search');
input.addEventListener('input', (e) => {
    buscarSinDebounce(e.target.value);
});

// Usuario escribe "batman":
// Request 1: Buscando "b"
// Request 2: Buscando "ba"
// Request 3: Buscando "bat"
// Request 4: Buscando "batm"
// Request 5: Buscando "batma"
// Request 6: Buscando "batman"
//
// Total: 6 requests
```

---

### Con Debouncing

```javascript
let requestCount = 0;

function buscarConDebounce(query) {
    requestCount++;
    console.log(`Request ${requestCount}: Buscando "${query}"`);
}

const buscarDebounced = debounce(buscarConDebounce, 300);

const input = document.getElementById('search');
input.addEventListener('input', (e) => {
    buscarDebounced(e.target.value);
});

// Usuario escribe "batman" (mismo timing):
// ... esperando ...
// ... esperando ...
// ... 300ms de silencio ...
// Request 1: Buscando "batman"
//
// Total: 1 request ✅
```

**Ahorro:** 83% menos requests (6 → 1).

---

<a name="throttling"></a>
## 6. 🔄 THROTTLING (DIFERENCIA CON DEBOUNCING)

### ¿Qué es Throttling?

**Throttling:** Ejecutar una función MÁXIMO una vez cada X tiempo, sin importar cuántas veces se llame.

**Debouncing vs Throttling:**

```
DEBOUNCING:
"Esperá silencio de X ms antes de ejecutar"
→ Se ejecuta DESPUÉS del último evento

THROTTLING:
"Ejecutá MÁXIMO una vez cada X ms"
→ Se ejecuta DURANTE los eventos (a intervalos)
```

---

### Analogía

**Debouncing = Microondas**
```
Apretás botones → espera silencio → ejecuta
```

**Throttling = Semáforo**
```
Autos pasando constantemente
Pero semáforo cambia MÁXIMO cada 30 segundos
(sin importar cuántos autos haya)
```

---

### Visualización

**Evento continuo (scroll):**

```
Sin control:
Evento: ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
        ↓
Ejecuciones: Cada evento (30 veces)
```

**Con Debouncing (300ms):**
```
Evento: ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
                                          ↓
                                    (300ms después)
Ejecuciones: 1 vez (al final)
```

**Con Throttling (300ms):**
```
Evento: ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
        ↓           ↓           ↓
Ejecuciones: Cada 300ms (10 veces durante)
```

---

### Implementación de Throttling

```javascript
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Uso:
const handleScroll = throttle(() => {
    console.log('Scroll detectado');
}, 1000);

window.addEventListener('scroll', handleScroll);

// Usuario scrollea continuamente:
// "Scroll detectado"
// ... (1 segundo mínimo)
// "Scroll detectado"
// ... (1 segundo mínimo)
// etc.
```

---

### Comparación Visual

```javascript
// Evento que dispara 10 veces en 2 segundos:

// SIN CONTROL:
eventos();  // 10 ejecuciones

// DEBOUNCING (500ms):
debounce(eventos, 500);  // 1 ejecución (al final)

// THROTTLING (500ms):
throttle(eventos, 500);  // 4 ejecuciones (durante)
```

**Timeline:**
```
Tiempo →  0s    0.5s   1s     1.5s   2s     2.5s
          │     │      │      │      │      │
Eventos:  ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●

Sin control:
Ejecución: ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
           (30 veces)

Debouncing:
Ejecución:                                   ●
           (1 vez, después de silencio)

Throttling:
Ejecución: ●          ●          ●          ●
           (4 veces, cada 500ms)
```

---

<a name="casos-uso"></a>
## 7. 🌟 CASOS DE USO REALES

### Debouncing - Cuándo Usar

**✅ USAR DEBOUNCING cuando:**

1. **Autocomplete / Search:**
   ```javascript
   input.addEventListener('input', debounce(buscarEnAPI, 300));
   ```
   → Esperar que el usuario termine de escribir

2. **Resize de ventana:**
   ```javascript
   window.addEventListener('resize', debounce(ajustarLayout, 200));
   ```
   → Esperar que el usuario termine de redimensionar

3. **Validación de formularios:**
   ```javascript
   emailInput.addEventListener('input', debounce(validarEmail, 500));
   ```
   → No validar en cada tecla

4. **Guardar borrador automático:**
   ```javascript
   textarea.addEventListener('input', debounce(guardarBorrador, 2000));
   ```
   → Guardar después de 2s sin escribir

---

### Throttling - Cuándo Usar

**✅ USAR THROTTLING cuando:**

1. **Scroll events:**
   ```javascript
   window.addEventListener('scroll', throttle(checkPosition, 100));
   ```
   → Verificar posición máximo cada 100ms

2. **Mouse move / Drag:**
   ```javascript
   element.addEventListener('mousemove', throttle(updatePosition, 50));
   ```
   → Actualizar posición máximo cada 50ms

3. **Infinite scroll:**
   ```javascript
   window.addEventListener('scroll', throttle(loadMore, 200));
   ```
   → Cargar más items máximo cada 200ms

4. **Button clicks (prevenir spam):**
   ```javascript
   button.addEventListener('click', throttle(enviarFormulario, 1000));
   ```
   → Máximo 1 envío por segundo

---

### Tabla de Decisión

| Escenario | Usar | Razón |
|-----------|------|-------|
| **Input de búsqueda** | Debouncing | Esperar que termine de escribir |
| **Resize de ventana** | Debouncing | Esperar que termine de redimensionar |
| **Scroll infinito** | Throttling | Verificar posición periódicamente |
| **Mousemove tracking** | Throttling | Actualizar posición regularmente |
| **Validación de email** | Debouncing | Esperar que termine de escribir |
| **Guardar borrador** | Debouncing | Guardar después de inactividad |
| **Lazy loading images** | Throttling | Cargar mientras scrollea |
| **Rate limiting API** | Throttling | Máximo X requests por segundo |

---

<a name="avanzado"></a>
## 8. 🚀 DEBOUNCING AVANZADO

### Versión con Cancel

```javascript
function debounce(func, delay) {
    let timer;
    
    const debounced = function(...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
    
    // Método para cancelar manualmente
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null;
    };
    
    return debounced;
}

// Uso:
const buscar = debounce(buscarEnAPI, 300);

buscar('batman');
buscar('superman');
buscar.cancel();  // ← Cancelar manualmente
// No se ejecuta nada
```

---

### Versión con Flush

```javascript
function debounce(func, delay) {
    let timer;
    let lastArgs;
    let lastContext;
    
    const debounced = function(...args) {
        lastArgs = args;
        lastContext = this;
        
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(lastContext, lastArgs);
        }, delay);
    };
    
    // Ejecutar inmediatamente (sin esperar)
    debounced.flush = function() {
        if (timer) {
            clearTimeout(timer);
            func.apply(lastContext, lastArgs);
        }
    };
    
    return debounced;
}

// Uso:
const buscar = debounce(buscarEnAPI, 1000);

buscar('batman');
buscar.flush();  // ← Ejecutar AHORA (sin esperar 1s)
```

---

### Versión con Leading/Trailing

```javascript
function debounce(func, delay, options = {}) {
    const { leading = false, trailing = true } = options;
    
    let timer;
    let lastInvokeTime = 0;
    
    return function(...args) {
        const context = this;
        const time = Date.now();
        
        const isFirstCall = !lastInvokeTime;
        const shouldCallLeading = leading && isFirstCall;
        
        clearTimeout(timer);
        
        if (shouldCallLeading) {
            func.apply(context, args);
        }
        
        timer = setTimeout(() => {
            if (trailing && !shouldCallLeading) {
                func.apply(context, args);
            }
            lastInvokeTime = 0;
        }, delay);
        
        lastInvokeTime = time;
    };
}

// Leading: ejecuta al inicio
const buscarLeading = debounce(buscarEnAPI, 300, { leading: true, trailing: false });

buscarLeading('batman');  // ← Ejecuta INMEDIATAMENTE
buscarLeading('superman'); // ← No ejecuta (solo leading)
// ... 300ms ...
// No se ejecuta nada más

// Trailing: ejecuta al final (default)
const buscarTrailing = debounce(buscarEnAPI, 300, { trailing: true });

buscarTrailing('batman');
buscarTrailing('superman');
// ... 300ms ...
// ← Ejecuta AHORA con 'superman'
```

---

<a name="comparacion"></a>
## 9. 📊 COMPARACIÓN COMPLETA

### Debouncing vs Throttling - Resumen

| Aspecto | Debouncing | Throttling |
|---------|------------|------------|
| **Definición** | Espera silencio antes de ejecutar | Ejecuta máximo cada X tiempo |
| **Cuándo ejecuta** | DESPUÉS del último evento | DURANTE los eventos (intervalos) |
| **Frecuencia** | 1 vez (al final) | Múltiples veces (periódico) |
| **Ideal para** | Input, resize, validación | Scroll, mousemove, drag |
| **Analogía** | Microondas (espera silencio) | Semáforo (intervalo fijo) |

---

### Performance Comparison

**Escenario:** Usuario escribe "batman" en 600ms

```javascript
// Sin control:
// 6 eventos → 6 ejecuciones

// Debouncing (300ms):
// 6 eventos → 1 ejecución (al final)
// Ahorro: 83%

// Throttling (300ms):
// 6 eventos → 2 ejecuciones (cada 300ms)
// Ahorro: 66%
```

**Escenario:** Usuario scrollea por 10 segundos

```javascript
// Sin control:
// 1000 eventos → 1000 ejecuciones

// Debouncing (200ms):
// 1000 eventos → 1 ejecución (al final)
// Ahorro: 99.9%

// Throttling (200ms):
// 1000 eventos → 50 ejecuciones (cada 200ms)
// Ahorro: 95%
```

---

## 10. ✅ RESUMEN EJECUTIVO

### Debouncing en 3 Puntos

1. **Qué es:** Espera X ms de silencio antes de ejecutar
2. **Cómo funciona:** Cancela timer anterior, crea uno nuevo cada vez
3. **Cuándo usar:** Input, resize, validación (cuando querés esperar que termine)

### Código Esencial

```javascript
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

// Uso:
const buscar = debounce(buscarEnAPI, 300);
input.addEventListener('input', (e) => buscar(e.target.value));
```

---

## 🎓 CHECKLIST DE DOMINIO

Dominás debouncing cuando podés:

- [ ] Explicar qué es debouncing con analogía
- [ ] Explicar por qué se usa (el problema que resuelve)
- [ ] Implementar debounce desde cero
- [ ] Explicar cómo funciona clearTimeout/setTimeout
- [ ] Diferenciar debouncing de throttling
- [ ] Decidir cuándo usar cada uno
- [ ] Usar debounce en input de búsqueda
- [ ] Entender closure en la implementación

---

## 💡 PARA TU PROYECTO FINAL

**En el Buscador de Películas:**

```javascript
// Sin debouncing (MAL):
input.addEventListener('input', (e) => {
    searchMovies(e.target.value);  // ← 1 request por tecla
});

// Con debouncing (BIEN):
const handleSearch = debounce(async function(query) {
    const data = await searchMovies(query);
    renderMovies(data.results);
}, 300);

input.addEventListener('input', (e) => {
    handleSearch(e.target.value);  // ← 1 request después de 300ms silencio
});
```

**Beneficios:**
- ✅ Ahorra 90% de requests
- ✅ No bombardea la API
- ✅ Mejor UX (no lag)
- ✅ Más profesional

---

**FIN DE LA GUÍA**

Versión: 1.0  
Temas: Debouncing, Throttling, Performance  
Nivel: Completo (Básico → Avanzado)  
Con todo el amor del mundo 💜
