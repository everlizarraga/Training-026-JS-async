# 🍕 PROYECTO DE PRÁCTICA: RECIPE FINDER

**Duración estimada:** 2-3 días (6-9 horas)  
**Nivel:** Mid-Senior (igual que Proyecto Final)  
**Autonomía:** 95% - Diseñás e implementás TODO el JavaScript desde cero

---

## 🎯 OBJETIVO

Construir un **buscador de recetas** completo consumiendo TheMealDB API.

**Aplicar TODOS los conocimientos del entrenamiento:**
- State management
- Fetch API
- Debouncing
- AbortController
- Error handling
- Loading states
- Caché
- Event listeners

**PERO esta vez:** Vos diseñás la arquitectura JavaScript completa desde cero.

---

## 🌐 API: TheMealDB

**URL base:** https://www.themealdb.com/api/json/v1/1/

**Ventajas:**
- ✅ 100% gratis
- ✅ Sin API key necesaria
- ✅ Sin límites de requests
- ✅ Documentación simple

**Endpoints principales:**
```
Buscar por nombre:
https://www.themealdb.com/api/json/v1/1/search.php?s=pasta

Detalles por ID:
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

Listar categorías:
https://www.themealdb.com/api/json/v1/1/categories.php

Receta random:
https://www.themealdb.com/api/json/v1/1/random.php
```

**Documentación completa:** https://www.themealdb.com/api.php

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
- [x] Input de búsqueda funcional
- [x] Debouncing (300ms)
- [x] Cancelación de búsquedas anteriores (AbortController)
- [x] Grid de recetas con imagen, nombre, categoría
- [x] Click en receta → Ver detalles (modal)
- [x] Loading states (skeleton screens)
- [x] Error handling visual
- [x] Estadísticas en footer (requests totales, desde caché, cancelados)

### Nice to Have (opcional):
- [ ] Botón "Random Recipe"
- [ ] Filtros por categoría
- [ ] Favoritos (localStorage)
- [ ] Infinite scroll

**Governor:** Hacer SOLO el MVP. Nice-to-have solo si sobra tiempo.

---

## 📁 ARCHIVOS PROVISTOS

1. **index.html** - Estructura completa con IDs/clases
2. **styles.css** - Estilos profesionales completos
3. **hints.md** - Hints estratégicos (State, API, fórmulas)

**TU trabajo:** Crear `app.js` desde cero.

---

## 🎨 ESTRUCTURA HTML (para que sepas los IDs/clases)

**IDs importantes:**
- `search-input` - Input de búsqueda
- `recipes-grid` - Grid donde van las recetas
- `loading-skeleton` - Skeleton de carga
- `empty-state` - Mensaje inicial
- `error-state` - Mensaje de error
- `recipe-modal` - Modal para detalles
- `recipe-details` - Contenedor de detalles
- `stat-total` - Contador de requests totales
- `stat-cache` - Contador desde caché
- `stat-cancelled` - Contador cancelados

**Clases importantes:**
- `.recipe-card` - Card de cada receta
- `.hidden` - Clase para ocultar elementos

---

## 📅 CRONOGRAMA SUGERIDO (OPCIONAL)

### Día 1: Fundamentos (3 horas)
**Objetivo:** Búsqueda básica funcional

**Tareas:**
1. Crear State inicial
2. Implementar `searchRecipes()` (fetch a API)
3. Implementar `renderRecipes()` (mostrar en grid)
4. Conectar input con búsqueda
5. Testear con búsqueda manual

**Checkpoint:** Ver recetas en pantalla al buscar "chicken"

---

### Día 2: Optimizaciones (3 horas)
**Objetivo:** Debouncing, cancelación, detalles

**Tareas:**
1. Implementar debouncing (300ms)
2. Implementar AbortController (cancelar búsquedas)
3. Implementar loading states
4. Implementar `showRecipeDetails()` (modal)
5. Testear escribiendo rápido y clicks

**Checkpoint:** Búsqueda optimizada, modal funciona

---

### Día 3: Pulido (2-3 horas)
**Objetivo:** Error handling, caché, estadísticas

**Tareas:**
1. Implementar error handling visual
2. Implementar caché de búsquedas
3. Actualizar estadísticas (counters)
4. Pulir estilos si es necesario
5. Testing completo

**Checkpoint:** App completa al 80%+ funcional

---

## 🎯 PATTERNS A IMPLEMENTAR

**Del entrenamiento vas a usar:**

1. **State Pattern** - Estado centralizado
2. **Debouncing Pattern** - Reducir requests
3. **Cancellation Pattern** - AbortController
4. **Cache Pattern** - Memoization
5. **Loading State Pattern** - Skeleton screens
6. **Error Boundary Pattern** - Manejo robusto

**Ya los conocés todos. Ahora los implementás sin ayuda.**

---

## 💡 HINTS DISPONIBLES

**En el archivo `hints.md` vas a encontrar:**

✅ Estructura sugerida de State (qué propiedades necesitás)
✅ Endpoints con ejemplos de respuesta JSON
✅ Fórmulas puntuales (si las necesitás)
✅ Consideraciones importantes de la API

**NO vas a encontrar:**
❌ Código JavaScript
❌ Soluciones completas
❌ Estructura de funciones

---

## 🚀 CÓMO EMPEZAR

**1. Copiar archivos base:**
- Crear carpeta `recipe-finder/`
- Copiar `index.html`
- Copiar `styles.css`
- Crear `app.js` vacío

**2. Abrir `hints.md`:**
- Leer estructura de State sugerida
- Ver ejemplos de API responses
- Tener a mano los endpoints

**3. Empezar a codear:**
- Definir State inicial
- Implementar primera función (searchRecipes)
- Ir incrementalmente

**4. Si te trabás >30 min:**
- Revisar hints
- Preguntarme (te guío sin dar código)

---

## ✅ CHECKLIST DE COMPLETITUD

**Búsqueda:**
- [ ] Input funcional
- [ ] Debouncing aplicado (300ms)
- [ ] AbortController cancela búsquedas

**Renderizado:**
- [ ] Grid de recetas se muestra
- [ ] Imágenes se cargan
- [ ] Información correcta (nombre, categoría)

**Detalles:**
- [ ] Click en receta abre modal
- [ ] Modal muestra info completa
- [ ] Modal se puede cerrar

**States:**
- [ ] Loading skeleton funciona
- [ ] Empty state se muestra al inicio
- [ ] Error state funciona en errores

**Optimizaciones:**
- [ ] Caché evita re-fetch
- [ ] Estadísticas se actualizan
- [ ] Sin errores en consola

---

## 🎓 LO QUE VAS A APRENDER

**Skills que vas a ejercitar:**

1. **Arquitectura** - Diseñar State y flujo desde cero
2. **Implementación** - Aplicar patterns sin plantilla
3. **Debugging** - Resolver problemas por tu cuenta
4. **Decisiones** - Elegir approach y estructura
5. **Autonomía** - Construir sin seguir TODOs

**Al terminar vas a confirmar:**
- ✅ "Sé cómo diseñar arquitectura"
- ✅ "Puedo implementar patterns sin ayuda"
- ✅ "Entiendo profundamente lo que hago"
- ✅ "Puedo construir apps desde cero"

---

## 💪 GOVERNOR ACTIVO

**Límites estrictos:**
- ⏱️ Máximo 3 días (9 horas)
- ⏱️ Si está funcional al 80% → es suficiente
- ⏱️ Nice-to-have solo si sobra tiempo

**Frases del Governor:**
```
"Funciona el MVP? → Suficiente. Avanzar."
"80% funcional = Proyecto completado con éxito"
"Detalles perfectos < App funcional"
```

---

## 🎯 DIFERENCIA CON PROYECTO FINAL

| Aspecto | Proyecto Final | Este Proyecto |
|---------|----------------|---------------|
| HTML/CSS | ✅ Completo | ✅ Completo |
| JS Estructura | ✅ Con TODOs | ❌ Hoja en blanco |
| Hints | ✅ En comentarios | ✅ Documento separado |
| Autonomía | 70% | 95% |
| Complejidad | Mid-Senior | Mid-Senior |

**Básicamente: Mismo nivel, MUCHA más autonomía.**

---

## 📝 NOTAS IMPORTANTES

**Sobre la API:**
- Algunas recetas tienen 20 ingredientes, otras 5
- Ingredientes están en `strIngredient1`, `strIngredient2`, etc.
- Lo mismo con medidas: `strMeasure1`, `strMeasure2`, etc.
- Algunos campos pueden ser `null` o `""` (manejar eso)

**Sobre el proyecto:**
- Es PRÁCTICA, no evaluación
- No hay "respuesta correcta única"
- Tu approach puede diferir del que yo usaría (está bien)
- Si funciona y sigue los patterns → es correcto

**Sobre pedir ayuda:**
- Si te trabás >30 min → preguntá
- Te voy a guiar sin dar código
- Hints conceptuales, no soluciones

---

## 🚀 ¡MANOS A LA OBRA!

**Paso siguiente:**
1. Crear carpeta `recipe-finder/`
2. Copiar `index.html` y `styles.css`
3. Crear `app.js` vacío
4. Abrir `hints.md` para referencia
5. Empezar a codear

**Recordá:** Vos diseñás TODO. Yo solo te doy la estructura visual y hints estratégicos.

**¡Confiá en tu conocimiento! Ya sabés cómo hacerlo.** 💪

---

**FIN DEL BRIEF**

Cuando estés listo, empezá con `searchRecipes()` y `renderRecipes()`.  
Construí incrementalmente. Testeá frecuentemente.

**¡Éxito!** 🍕🚀
