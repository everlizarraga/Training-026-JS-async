# ROADMAP: Async JavaScript - Dominio Completo

## 📊 METADATA

**Objetivo:** Dominar async JavaScript desde fundamentos hasta patterns avanzados del mundo real - Promises, Async/Await, Event Loop, Fetch API y patrones de producción

**Tecnologías conocidas:** HTML, CSS, JavaScript (intermedio-avanzado), Scope, Closures, This, Call/Apply/Bind

**Horas diarias disponibles:** 3 horas

**Duración estimada total:** 3 semanas

**Fecha de inicio:** A definir

**Enfoque determinado:** Ejercicios progresivos + Proyectos integradores + Visualizaciones

**Justificación del enfoque:** 
- Async JavaScript es FUNDAMENTAL para desarrollo moderno (frontend y backend)
- Requiere práctica intensiva (no se entiende solo leyendo)
- Event Loop es contra-intuitivo → necesita visualización
- Fetch API es la base de toda interacción con APIs
- Patterns avanzados separan juniors de seniors
- Mix de teoría + práctica + proyectos reales asegura dominio completo

**Número de fases:** 3 semanas (1 fase = 1 semana)

**Justificación:** 
- **Semana 1:** Fundamentos de Promises (base esencial)
- **Semana 2:** Async/Await + Event Loop (mecanismo interno)
- **Semana 3:** Fetch + Patterns reales (aplicación profesional)

Cada semana agrupa conceptos relacionados que se construyen sobre la anterior. No se pueden fusionar sin perder profundidad (demasiado denso), ni dividir más sin romper la lógica de aprendizaje.

---

## 🗺️ ESTRUCTURA COMPLETA DEL ENTRENAMIENTO

### SEMANA 1: Promises Fundamentals
**Duración estimada:** 7 días (21 horas)  
**Objetivo de la semana:** Dominar creación, consumo y manipulación de Promises desde cero. Entender states, chaining y error handling profundamente.

#### Warmup Semana 1: Promises desde Cero
**Duración:** 9-12 horas (distribuido en 3 días)  
**Objetivo:** Practicar creación y consumo de promises en múltiples escenarios

**Ejercicios:**
1. **Crear Promise Básica** - Constructor new Promise(resolve, reject)
2. **Consumir con .then()** - Manejar promesa resuelta
3. **Consumir con .catch()** - Manejar promesa rechazada
4. **Consumir con .finally()** - Cleanup independiente del resultado
5. **Promise.resolve() y Promise.reject()** - Shortcuts para crear promises
6. **Chaining Simple** - Encadenar 2-3 .then()
7. **Chaining con Transformación** - Pasar datos entre .then()
8. **Chaining con Promises Anidadas** - Aplanar promises dentro de .then()
9. **Error Propagation** - Cómo se propagan errores en chains
10. **Return vs No Return en .then()** - Diferencia crítica
11. **Multiple .catch()** - Cuál se ejecuta y por qué
12. **Promise States Debugging** - Inspeccionar pending/fulfilled/rejected

**Justificación de cantidad:** 12 ejercicios porque promises tienen múltiples aspectos sutiles (creación, consumo, chaining, errors) que deben practicarse por separado antes de combinar. Cada ejercicio aísla un concepto específico.

**Distribución conceptual:**
- Ejercicios 1-5: Fundamentos (crear, consumir, shortcuts)
- Ejercicios 6-8: Chaining (encadenar, transformar, aplanar)
- Ejercicios 9-12: Error handling (propagación, múltiples catches, debugging)

---

#### Proyecto 1: Sistema de Tareas Asíncronas Custom
**Duración:** 4 días máximo  
**Objetivo:** Construir un sistema que simula operaciones asíncronas (como fetch) usando Promises desde cero. Implementar queue, retry logic y logging.

**Cronograma:**
- **Día 1:** Clase Task con Promise interna, ejecutar tareas simples
- **Día 2:** TaskQueue para ejecutar múltiples tareas, parallel vs sequential
- **Día 3:** Retry logic con exponential backoff, error handling
- **Día 4:** Logger, estadísticas, UI simple para visualizar

**Features mínimas (MVP):**
- Crear tareas asíncronas con delay configurable
- Ejecutar tareas en paralelo (Promise.all simulado)
- Ejecutar tareas secuencialmente
- Retry automático con max retries
- Logging de cada tarea (pending → fulfilled/rejected)
- Estadísticas (total, exitosas, fallidas, tiempo promedio)

**Patterns introducidos:**
- **Factory Pattern:** Crear tareas con configuración
- **Queue Pattern:** Gestionar cola de tareas asíncronas
- **Retry Pattern:** Reintentar operaciones fallidas
- **Observer Pattern:** Notificar cambios de estado

**Contexto de uso real:**
Este proyecto simula librerías como:
- **Axios:** Manejo de requests con retry
- **Bull/Bee-Queue:** Job queues en Node.js
- **RxJS:** Observables y streams
- **React Query:** Caché y retry de queries

Vas a implementar los patterns que estas librerías usan internamente. Entender esto te da superpoderes para debuggear y optimizar apps reales.

---

### SEMANA 2: Async/Await + Event Loop
**Duración estimada:** 7 días (21 horas)  
**Objetivo de la semana:** Dominar async/await como alternativa a .then(), entender Event Loop profundamente (call stack, queues, orden de ejecución), distinguir microtasks de macrotasks.

#### Warmup Semana 2: Async/Await + Event Loop
**Duración:** 9-12 horas (distribuido en 3 días)  
**Objetivo:** Practicar async/await, try/catch y predecir orden de ejecución en Event Loop

**Ejercicios:**
1. **Función async Básica** - Declarar y usar async function
2. **await Keyword** - Pausar ejecución y esperar Promise
3. **try/catch con async/await** - Manejo de errores
4. **Comparación .then() vs async/await** - Mismo código, dos formas
5. **Return en async function** - Siempre retorna Promise
6. **await sin async** - Error común (no se puede)
7. **Parallel Execution con async/await** - Promise.all + await
8. **Sequential vs Parallel Performance** - Medir diferencia de tiempo
9. **Top-level await** - En módulos ES6 (si aplica)
10. **Event Loop: Sync vs Async** - console.log + setTimeout orden
11. **Event Loop: Microtasks** - Promise vs setTimeout orden
12. **Event Loop: Microtasks Anidadas** - Promise dentro de Promise
13. **Event Loop: Mixed** - setTimeout + Promise + sync, predecir orden
14. **Event Loop: Complex** - Múltiples timers + promises, orden completo

**Justificación de cantidad:** 14 ejercicios porque async/await y event loop son conceptos densos que requieren práctica repetitiva. Ejercicios 1-9 son async/await (sintaxis y uso), ejercicios 10-14 son event loop (orden de ejecución, crítico para dominio real).

**Distribución conceptual:**
- Ejercicios 1-6: Fundamentos async/await (sintaxis, errors, returns)
- Ejercicios 7-9: Patterns de ejecución (parallel, sequential, top-level)
- Ejercicios 10-14: Event Loop profundo (orden sync/async/micro/macro)

**Contextos de uso introducidos:**
- **Ejercicio 8:** Performance optimization (cuando usar parallel vs sequential)
- **Ejercicio 11-14:** Debugging (entender por qué algo se ejecuta "fuera de orden")

---

#### Proyecto 2: Visualizador de Event Loop
**Duración:** 4 días máximo  
**Objetivo:** Construir herramienta interactiva que MUESTRA cómo funciona el Event Loop en tiempo real: call stack, task queue, microtask queue, y orden de ejecución.

**Cronograma:**
- **Día 1:** UI básica (3 columnas: Call Stack, Microtask Queue, Task Queue)
- **Día 2:** Parser de código (detectar sync, setTimeout, Promises)
- **Día 3:** Simulador de ejecución paso a paso, animaciones
- **Día 4:** Ejemplos pre-cargados, editor de código live

**Features mínimas (MVP):**
- Ingresar código JavaScript (con sync, setTimeout, Promises)
- Visualizar Call Stack en tiempo real
- Visualizar Microtask Queue (Promises)
- Visualizar Task Queue (setTimeout, setInterval)
- Ejecutar paso a paso (Step-by-step mode)
- Ejecutar automático con velocidad ajustable
- Mostrar orden de ejecución en consola
- 5 ejemplos pre-cargados (del simple al complejo)

**Patterns introducidos:**
- **Interpreter Pattern:** Parsear y ejecutar código
- **State Machine:** Manejar estados de ejecución
- **Animation Pattern:** Visualizar transiciones
- **Command Pattern:** Ejecutar acciones paso a paso

**Contexto de uso real:**
Este proyecto te hace entender:
- **Por qué React Hooks tienen reglas** (microtasks)
- **Por qué setState es asíncrono** (batching en microtasks)
- **Por qué setInterval puede "saltarse" ejecuciones**
- **Cómo funcionan herramientas como Loupe** (visualizador famoso)

Después de esto, NINGÚN comportamiento asíncrono te sorprenderá. Vas a poder predecir orden de ejecución mentalmente.

---

### SEMANA 3: Fetch API + Patterns Avanzados
**Duración estimada:** 7 días (21 horas)  
**Objetivo de la semana:** Dominar Fetch API para consumir APIs reales, implementar combinators (all/race/allSettled/any), cancelación, retry logic, race conditions y patterns de producción.

#### Warmup Semana 3: Fetch + Combinators
**Duración:** 6-9 horas (distribuido en 2 días)  
**Objetivo:** Practicar fetch con diferentes métodos HTTP, combinators, y cancelación

**Ejercicios:**
1. **fetch() GET básico** - Request simple, .json()
2. **fetch() POST con body** - Enviar datos, headers
3. **fetch() PUT y DELETE** - Actualizar y eliminar recursos
4. **fetch() Error Handling** - Network errors vs HTTP errors (404, 500)
5. **fetch() con Headers custom** - Authorization, Content-Type
6. **Promise.all()** - Múltiples requests en paralelo
7. **Promise.race()** - Primera en terminar (timeout pattern)
8. **Promise.allSettled()** - Todas completan sin fallar
9. **Promise.any()** - Primera en resolverse (fallback servers)
10. **AbortController** - Cancelar fetch en progreso
11. **Timeout con race()** - Cancelar si tarda mucho
12. **Retry con fetch()** - Reintentar request fallido

**Justificación de cantidad:** 12 ejercicios porque fetch tiene múltiples variantes (métodos HTTP, headers, errors) y combinators tienen casos de uso específicos que deben practicarse separadamente. Cada ejercicio simula un escenario real.

**Distribución conceptual:**
- Ejercicios 1-5: Fetch fundamentals (métodos, headers, errors)
- Ejercicios 6-9: Combinators (all/race/allSettled/any, comparación)
- Ejercicios 10-12: Advanced patterns (cancelación, timeout, retry)

**Contextos de uso introducidos:**
- **Ejercicio 6:** Dashboard con múltiples APIs
- **Ejercicio 7:** Timeout de 5 segundos para requests lentos
- **Ejercicio 8:** Enviar a múltiples analytics providers
- **Ejercicio 9:** Primary + fallback servers
- **Ejercicio 10:** Autocomplete (cancelar búsqueda anterior)

---

#### Proyecto Final: Buscador de Películas con API (TMDb/OMDb)
**Duración:** 5 días máximo  
**Objetivo:** Construir app completa que consume API real (The Movie Database o OMDb), implementa TODOS los patterns avanzados: búsqueda con cancelación, loading states, retry logic, infinite scroll, caché y manejo robusto de errores.

**Cronograma:**
- **Día 1:** Setup API, búsqueda básica, mostrar resultados
- **Día 2:** Debouncing + AbortController (cancelar búsquedas), loading states
- **Día 3:** Infinite scroll con lazy loading, Promise.all para detalles
- **Día 4:** Retry logic, caché de búsquedas, fallback para imágenes rotas
- **Día 5:** Estadísticas (requests totales, cancelados, desde caché), pulido UI

**Features mínimas (MVP):**
- Buscador con input (películas por título)
- Debouncing (300ms) + cancelación de búsquedas anteriores
- Loading states (skeleton screens mientras carga)
- Grid de películas con póster, título, año, rating
- Click en película → Mostrar detalles (fetch adicional)
- Infinite scroll (cargar más resultados al scrollear)
- Retry automático si request falla (max 3 reintentos)
- Caché de búsquedas (no re-fetch si ya buscaste lo mismo)
- Error handling visual (mensajes claros de error)
- Estadísticas en footer (requests, desde caché, cancelados)

**Features Nice-to-Have (si sobra tiempo):**
- [ ] Filtros (por género, año, rating)
- [ ] Favoritos (localStorage)
- [ ] Dark mode
- [ ] Animaciones en carga

**Patterns introducidos:**
- **Debouncing Pattern:** Reducir requests innecesarios
- **Cancellation Pattern:** AbortController para cancelar
- **Retry Pattern:** Exponential backoff
- **Cache Pattern:** Memoization de requests
- **Lazy Loading Pattern:** Infinite scroll
- **Loading State Pattern:** Skeleton screens
- **Error Boundary Pattern:** Manejo robusto de errores

**API Recomendada:**
**The Movie Database (TMDb)** - https://www.themoviedb.org/settings/api
- ✅ Gratis, sin límite estricto
- ✅ Bien documentada
- ✅ Retorna imágenes, posters, info completa
- ✅ Endpoints: /search/movie, /movie/{id}

**Alternativa:** OMDb API - http://www.omdbapi.com/ (requiere API key gratis)

**Stack Técnico:**
- HTML, CSS (o Tailwind/Bootstrap)
- JavaScript Vanilla (o TypeScript si querés)
- Fetch API
- Ninguna librería externa (todo desde cero)

**Contexto de uso real:**
Este proyecto implementa patterns que verás en:
- **React Query:** Caché, retry, loading states
- **SWR:** Stale-while-revalidate pattern
- **Apollo Client:** GraphQL client con caché
- **Algolia Search:** Autocomplete con debouncing

Es un proyecto de **nivel mid-senior** que demuestra dominio total de async JavaScript en producción.

---

## 🎯 RESUMEN DE CONCEPTOS POR SEMANA

### Semana 1: Promises Fundamentals
**Conceptos cubiertos (12 temas):**
1. Constructor new Promise(resolve, reject)
2. Estados: pending, fulfilled, rejected
3. .then() para consumir promesa resuelta
4. .catch() para manejar errores
5. .finally() para cleanup
6. Promise.resolve() y Promise.reject()
7. Chaining: encadenar múltiples .then()
8. Transformación de datos entre .then()
9. Aplanar promises anidadas
10. Propagación de errores
11. Diferencia return vs no return
12. Debugging de promise states

### Semana 2: Async/Await + Event Loop
**Conceptos cubiertos (14 temas):**
13. Declarar async function
14. await keyword (pausar ejecución)
15. try/catch con async/await
16. Return implícito en async function
17. Comparación .then() vs async/await
18. Parallel execution (Promise.all + await)
19. Sequential vs parallel performance
20. Top-level await (módulos ES6)
21. Call Stack (pila de ejecución)
22. Task Queue / Macrotasks (setTimeout, setInterval)
23. Microtask Queue (Promises)
24. Orden de ejecución (sync → micro → macro)
25. setTimeout vs Promise.resolve orden
26. Event Loop completo visualizado

### Semana 3: Fetch API + Patterns Avanzados
**Conceptos cubiertos (13 temas):**
27. fetch() GET, POST, PUT, DELETE
28. Headers y configuración de requests
29. Manejo de respuestas (.json(), .text(), .blob())
30. Error handling (network vs HTTP errors)
31. Promise.all() - Todas deben resolverse
32. Promise.race() - Primera en terminar
33. Promise.allSettled() - Espera todas
34. Promise.any() - Primera en resolverse
35. AbortController - Cancelar requests
36. Timeout pattern con race()
37. Retry logic con exponential backoff
38. Debouncing y throttling
39. Race conditions y soluciones

**Total: 39 conceptos cubiertos** ✅

---

## 🎨 PATTERNS Y BUENAS PRÁCTICAS

### Semana 1:
- **Factory Pattern:** Crear promises configurables
- **Queue Pattern:** Gestionar tareas asíncronas
- **Retry Pattern:** Reintentar con backoff

### Semana 2:
- **Interpreter Pattern:** Parsear código
- **State Machine:** Estados de ejecución
- **Animation Pattern:** Visualizaciones

### Semana 3:
- **Debouncing Pattern:** Reducir requests
- **Cancellation Pattern:** AbortController
- **Cache Pattern:** Memoization de API calls
- **Lazy Loading:** Infinite scroll
- **Loading State:** Skeleton screens

---

## ⏱️ TIMELINE GLOBAL

**Semana 1:** Promises Fundamentals  
- Días 1-3: Warmup (12 ejercicios)
- Días 4-7: Proyecto 1 (Sistema de Tareas Asíncronas)

**Semana 2:** Async/Await + Event Loop  
- Días 1-3: Warmup (14 ejercicios)
- Días 4-7: Proyecto 2 (Visualizador Event Loop)

**Semana 3:** Fetch API + Patterns Avanzados  
- Días 1-2: Warmup (12 ejercicios)
- Días 3-7: Proyecto Final (Buscador de Películas)

**Total estimado:** 21 días (3 semanas completas)

**Breakdown detallado:**

| Semana | Warmup | Proyecto | Total | Días |
|--------|--------|----------|-------|------|
| 1 | 9-12 hrs | 12 hrs | 21-24 hrs | 7 |
| 2 | 9-12 hrs | 12 hrs | 21-24 hrs | 7 |
| 3 | 6-9 hrs | 15 hrs | 21-24 hrs | 7 |

**Total: 63-72 horas → 21 días con 3 hrs/día**

---

## 📈 PROGRESIÓN DE DIFICULTAD

```
Complejidad
    ↑
    │                                          ┌────── Proyecto Final
    │                                     ┌────┤    (Buscador API)
    │                               ┌─────┤    │
    │                         ┌─────┤     │    │
    │                   ┌─────┤     │     │    │
    │             ┌─────┤     │     │     │    │
    │       ┌─────┤     │     │     │     │    │
    │ ┌─────┤     │     │     │     │     │    │
    └─┴─────┴─────┴─────┴─────┴─────┴─────┴────┴────→ Tiempo
      S1    S1    S2    S2    S3    S3    S3   S3
      Ej   Proy   Ej   Proy   Ej   Día1  Día3  Día5
```

**Leyenda:**
- **S1:** Semana 1 (Promises) - Base fundamental
- **S2:** Semana 2 (Async/Event Loop) - Mecanismo interno
- **S3:** Semana 3 (Fetch/Patterns) - Aplicación real

**Cada semana incrementa:**
- Cantidad de conceptos que se combinan
- Complejidad de los proyectos
- Similitud con código de producción
- Patterns avanzados

---

## 🎓 APRENDIZAJES CLAVE POR SEMANA

### Al completar Semana 1 sabrás:
- ✅ Crear promises desde cero con new Promise()
- ✅ Consumir promises con .then()/.catch()/.finally()
- ✅ Encadenar promises correctamente
- ✅ Manejar errores y propagarlos
- ✅ Diferencia entre Promise.resolve() y new Promise()
- ✅ Implementar retry logic desde cero
- ✅ Construir queue de tareas asíncronas

### Al completar Semana 2 sabrás:
- ✅ Usar async/await como alternativa a .then()
- ✅ try/catch para error handling
- ✅ Ejecutar promises en paralelo vs secuencial
- ✅ Optimizar performance con parallel execution
- ✅ Cómo funciona el Event Loop (call stack, queues)
- ✅ Diferencia entre microtasks y macrotasks
- ✅ Predecir orden de ejecución de código asíncrono
- ✅ Debuggear timing issues mentalmente

### Al completar Semana 3 sabrás:
- ✅ Consumir APIs con fetch() (GET/POST/PUT/DELETE)
- ✅ Manejar headers y autenticación
- ✅ Diferencia entre network errors y HTTP errors
- ✅ Usar Promise.all/race/allSettled/any apropiadamente
- ✅ Cancelar requests con AbortController
- ✅ Implementar debouncing y throttling
- ✅ Retry logic con exponential backoff
- ✅ Caché de API calls
- ✅ Infinite scroll y lazy loading
- ✅ Loading states profesionales
- ✅ **DOMINIO TOTAL de Async JavaScript**

---

## 💡 CONSEJOS PARA EL ENTRENAMIENTO

### Governor aplicado:
- **Ejercicios:** Máximo 30-45 min cada uno. Si te trabás >20 min → hints
- **Proyectos Semana 1-2:** Máximo 4 días. Funcional > perfecto
- **Proyecto Final:** Máximo 5 días. MVP obligatorio, nice-to-have opcional
- **Iteraciones:** Máximo 2 por ejercicio/proyecto → después NEXT
- **80/20:** Primera versión 80% → suficiente para avanzar

### Cómo estudiar efectivamente:
1. **Leer ejemplo resuelto** antes de intentar ejercicio
2. **Ejecutar código** en navegador/Node (no solo leer)
3. **Experimentar:** Cambiar valores, agregar console.log(), ver qué pasa
4. **Predecir orden** de ejecución ANTES de ejecutar (Event Loop)
5. **Explicártelo en voz alta** (Rubber Duck Debugging)

### Si te trabás:
1. console.log() estratégicos (estado de promises, timing)
2. Dibujar diagrama de flujo
3. Revisar ejemplo resuelto con más atención
4. Ver Hint 1 (si >20 min)
5. Ver Hint 2 (si >30 min)
6. Preguntar (si >45 min)

### Reconocimiento de logros:
Al completar cada semana, celebrá:
- ✅ Semana completada = sistema dominado
- ✅ Cada ejercicio = concepto consolidado
- ✅ Cada proyecto = aplicación real

**No minimices logros.** Async JavaScript es considerado **avanzado** y confunde a muchos developers con años de experiencia.

---

## 📋 NOTAS IMPORTANTES

### Sobre los ejercicios:
- Primeros ejercicios son código puro (consola/Node)
- Después se agrega HTML cuando ayuda a visualizar
- Todos tienen ejemplo resuelto comentado línea por línea
- Hints son conceptuales, NO código completo

### Sobre los proyectos:
- HTML/CSS base se provee (copiás y pegás)
- Te enfocás en el JavaScript
- MVP definido claramente
- Patterns señalados explícitamente
- Conexión con mundo real explicada

### Sobre la API del Proyecto Final:
- TMDb es gratis y sin límites estrictos
- Registrate en https://www.themoviedb.org/settings/api
- API key gratis instantánea
- Documentación completa: https://developers.themoviedb.org/3

### Sobre el Knowledge Base:
- Este roadmap es la estructura COMPLETA del entrenamiento
- En nuevos chats, referenciá: "Semana X - Ejercicio Y" o "Semana X - Proyecto"
- El roadmap NO se modifica, es referencia estática
- Para tracking de progreso personal, usá checklist externa

---

## 🎯 OBJETIVO FINAL

Al completar este entrenamiento vas a:

✅ Dominar Promises, Async/Await, Event Loop **a nivel senior**  
✅ Consumir APIs reales profesionalmente  
✅ Implementar patterns de producción (retry, cache, debounce, cancelación)  
✅ Debuggear problemas de timing y race conditions rápidamente  
✅ Entender cómo funcionan librerías como React Query, Axios, RxJS por dentro  
✅ Escribir código asíncrono limpio y optimizado  
✅ Predecir orden de ejecución mentalmente  
✅ Tener base sólida para React, Node.js, y cualquier framework moderno  

**Nivel esperado al final:** Mid-Senior en Async JavaScript.

**Este conocimiento es FUNDAMENTAL y te va a acompañar toda tu carrera.**

---

## 🚀 PRÓXIMOS PASOS

1. **Revisá este roadmap completo**
2. **Guardalo en el Knowledge Base del proyecto**
3. **Avisame cuando estés listo para empezar**
4. **Comenzaremos con Semana 1 - Warmup (Ejercicio 1)**

---

## 📊 COMPARACIÓN CON OTROS ENTRENAMIENTOS

| Métrica | JS Avanzado (anterior) | Async JS (este) |
|---------|------------------------|-----------------|
| Duración | 4 semanas | 3 semanas |
| Ejercicios | ~30 | 38 ejercicios |
| Proyectos | 4 proyectos | 3 proyectos |
| Conceptos | Scope/Closures/This/Bind | Promises/Async/Event Loop/Fetch |
| Aplicación | Fundamental (base) | Crítico (día a día) |
| Frecuencia de uso | Constante | **TODO EL TIEMPO** |

**Este entrenamiento es más corto pero igual de denso. Async JS lo usás en CADA aplicación moderna.**

---

## 🌟 SKILLS DESBLOQUEADOS

**Después de este entrenamiento podrás:**
- 🚀 Construir apps que consumen APIs (frontend)
- 🚀 Crear APIs con Express (backend con Node.js)
- 🚀 Usar React con hooks (useEffect depende de async)
- 🚀 Implementar real-time features (WebSockets)
- 🚀 Optimizar performance de apps (parallel execution, caching)
- 🚀 Debuggear timing issues que confunden a otros devs
- 🚀 Entender documentación de librerías async (React Query, SWR, Axios)
- 🚀 Pasar entrevistas técnicas de nivel mid-senior

---

## 💪 GOVERNOR ACTIVO

**Límites estrictos para cada semana:**
- ⏱️ **Warmup:** Máximo 3 días
- ⏱️ **Proyecto:** Máximo 4-5 días
- ✅ **80% funcional = Suficiente para avanzar**
- 📌 **Si llegás al límite → SUBIR lo que tengas y NEXT**

**Frases del Governor:**
```
"Funciona? → NEXT semana."
"Entendés el concepto? → NEXT ejercicio."
"Proyecto al 80%? → SUBIR y avanzar."
"Completaste semana? → CELEBRAR y continuar."
```

---

FIN DEL ROADMAP

**Versión:** 1.0  
**Fecha de creación:** Enero 2026  
**Optimizado para:** Estudiante con dominio de JS fundamentals (scope/closures/this/bind)  
**Formato:** 3 semanas progresivas, 38 ejercicios, 3 proyectos (1 final complejo)  
**Duración:** 21 días con 3 horas/día (~63-72 horas totales)  
**Nivel de salida:** Mid-Senior en Async JavaScript
