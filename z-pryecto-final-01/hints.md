# 💡 HINTS ESTRATÉGICOS - RECIPE FINDER

**Propósito:** Información puntual para mantener el flujo sin salir a buscar documentación.

**NO contiene:** Código JavaScript, soluciones completas, estructura de funciones.

---

## 🗂️ STATE SUGERIDO

**Para manejar el estado de la aplicación, considerá estas propiedades:**

```
state = {
    recipes: []           // Array de recetas actuales en pantalla
    cache: Map            // Caché de búsquedas (key: query, value: recipes)
    currentQuery: ""      // Query actual de búsqueda
    isLoading: false      // Si está cargando
    error: null           // Mensaje de error (si hay)
    
    stats: {
        total: 0          // Total de requests a la API
        cacheHits: 0      // Cuántos vinieron desde caché
        cancelled: 0      // Cuántos fueron cancelados
    }
}
```

**Nota:** Podés agregar más propiedades si lo necesitás (ej: `selectedRecipe`, `abortController`, etc.)

---

## 🌐 API - ENDPOINTS Y RESPONSES

### **1. Buscar recetas por nombre**

**Endpoint:**
```
https://www.themealdb.com/api/json/v1/1/search.php?s=QUERY
```

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/search.php?s=pasta
```

**Response (estructura):**
```json
{
  "meals": [
    {
      "idMeal": "52771",
      "strMeal": "Spicy Arrabiata Penne",
      "strCategory": "Vegetarian",
      "strArea": "Italian",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      "strInstructions": "Bring a large pot of water to a boil...",
      "strIngredient1": "penne rigate",
      "strIngredient2": "olive oil",
      "strIngredient3": "garlic",
      ...
      "strIngredient20": "",
      "strMeasure1": "1 pound",
      "strMeasure2": "1/4 cup",
      "strMeasure3": "3 cloves",
      ...
      "strMeasure20": ""
    },
    {
      // otra receta...
    }
  ]
}
```

**Notas importantes:**
- Si no encuentra nada → `"meals": null`
- Ingredientes van de `strIngredient1` a `strIngredient20`
- Medidas van de `strMeasure1` a `strMeasure20`
- Algunos ingredientes/medidas pueden ser `""` o `null` (filtrar esos)

---

### **2. Buscar receta por ID**

**Endpoint:**
```
https://www.themealdb.com/api/json/v1/1/lookup.php?i=ID
```

**Ejemplo:**
```
https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771
```

**Response:** Mismo formato que búsqueda, pero retorna UN solo meal en el array.

---

### **3. Receta random (opcional - nice to have)**

**Endpoint:**
```
https://www.themealdb.com/api/json/v1/1/random.php
```

**Response:** Un solo meal.

---

## 🔧 CONSIDERACIONES DE LA API

### **Manejo de ingredientes:**

Los ingredientes vienen en 20 propiedades separadas:
```
strIngredient1: "penne rigate"
strIngredient2: "olive oil"
strIngredient3: "garlic"
...
strIngredient10: ""
strIngredient11: ""
...
```

**Para extraerlos:**
- Iterar del 1 al 20
- Verificar que NO sea `""` ni `null`
- Combinar con la medida correspondiente

**Ejemplo conceptual:**
```
Si strIngredient5 = "tomatoes" y strMeasure5 = "2 cups"
→ "2 cups tomatoes"
```

---

### **Búsqueda vacía:**

Si el input está vacío:
- Opción 1: No hacer fetch (mostrar empty state)
- Opción 2: Hacer fetch con query vacío (retorna recetas random)

**Recomendación:** Opción 1 (no fetchear si input vacío)

---

### **Response null:**

Si la API no encuentra recetas:
```json
{
  "meals": null
}
```

**Manejar esto:**
- Verificar si `response.meals` es `null`
- Mostrar mensaje apropiado (ej: "No encontramos recetas con 'xyz'")

---

## 🎨 CLASES E IDS DEL HTML

**Para mostrar/ocultar elementos:**

```
.hidden                   // Clase para ocultar (display: none)

#search-input             // Input de búsqueda
#recipes-grid             // Grid donde van las recipe cards
#loading-skeleton         // Skeleton de carga
#empty-state              // Mensaje inicial (vacío)
#error-state              // Mensaje de error
#error-message            // Texto específico del error

#recipe-modal             // Modal completo
#recipe-details           // Contenedor de detalles dentro del modal
.modal-overlay            // Overlay del modal (para cerrar al clickear)
.modal-close              // Botón X de cerrar

#stat-total               // Contador de requests totales
#stat-cache               // Contador desde caché
#stat-cancelled           // Contador cancelados
```

---

## ⚡ DEBOUNCING

**Concepto:**
Esperar X ms después de que el usuario DEJE de escribir antes de hacer fetch.

**Tiempo recomendado:** 300ms

**¿Cómo implementarlo?**
- Usar `setTimeout()` y `clearTimeout()`
- Cada vez que escriben → cancelar timer anterior, crear nuevo timer
- Cuando el timer completa → ejecutar búsqueda

**Ya lo hiciste en el Proyecto Final.** Aplicá la misma lógica.

---

## 🛑 ABORTCONTROLLER

**Concepto:**
Cancelar fetch en progreso si el usuario escribe de nuevo.

**¿Cómo usarlo?**
1. Crear nuevo `AbortController` antes de cada fetch
2. Pasar `signal` al fetch: `fetch(url, { signal: controller.signal })`
3. Si hay fetch en progreso → llamar `controller.abort()`
4. Manejar error `AbortError` en el catch

**Ya lo hiciste en el Proyecto Final.** Aplicá la misma lógica.

---

## 📦 CACHÉ

**Concepto:**
Si ya buscaste "pasta" → guardar resultado.  
Si vuelven a buscar "pasta" → no hacer fetch, usar del caché.

**Estructura recomendada:**
```
cache = new Map()

// Guardar:
cache.set(query, recipes)

// Obtener:
if (cache.has(query)) {
    recipes = cache.get(query)
    // Incrementar stats.cacheHits
}
```

**Key del caché:** El query de búsqueda (ej: "pasta")

---

## 🎯 RENDERIZADO DE RECIPE CARDS

**Estructura HTML de una card:**

```html
<div class="recipe-card" data-id="52771">
    <img src="URL_DE_IMAGEN" alt="Nombre" class="recipe-image">
    <div class="recipe-info">
        <h3 class="recipe-name">Nombre de la receta</h3>
        <span class="recipe-category">Categoría</span>
    </div>
</div>
```

**Importante:**
- `data-id` con el `idMeal` (para identificar al clickear)
- Agregar event listener de click a cada card

---

## 🔍 MODAL DE DETALLES

**Flujo:**
1. Usuario clickea una recipe card
2. Obtener el `idMeal` (desde `data-id` o del objeto)
3. Hacer fetch para obtener detalles: `lookup.php?i=ID`
4. Renderizar en `#recipe-details`
5. Mostrar modal (quitar clase `.hidden`)

**Estructura HTML de detalles (sugerida):**

```html
<div class="recipe-details">
    <img src="URL" class="recipe-details-image">
    <h2 class="recipe-details-title">Nombre</h2>
    
    <div class="recipe-details-meta">
        <span class="recipe-details-badge">Categoría: X</span>
        <span class="recipe-details-badge">Área: Y</span>
    </div>
    
    <div class="recipe-details-section">
        <h3>Ingredientes</h3>
        <div class="recipe-ingredients">
            <div class="recipe-ingredient">1 cup pasta</div>
            <div class="recipe-ingredient">2 tbsp oil</div>
            ...
        </div>
    </div>
    
    <div class="recipe-details-section">
        <h3>Instrucciones</h3>
        <p class="recipe-instructions">Texto de instrucciones...</p>
    </div>
</div>
```

---

## ❌ ERROR HANDLING

**Casos de error a manejar:**

1. **Network error** (sin internet, API caída)
   - Catch del fetch
   - Mostrar `#error-state`

2. **API retorna null** (no encontró recetas)
   - Verificar `response.meals === null`
   - Mostrar mensaje: "No encontramos recetas con 'xyz'"

3. **Fetch cancelado** (AbortError)
   - NO mostrar error (es intencional)
   - Incrementar `stats.cancelled`

**Mostrar error:**
```
1. Ocultar loading y grid
2. Mostrar #error-state
3. Actualizar #error-message con texto específico
```

---

## 📊 ESTADÍSTICAS

**Cuándo actualizar cada contador:**

**stats.total:**
- Incrementar CADA vez que hacés fetch a la API
- Incluye los que se cancelan

**stats.cacheHits:**
- Incrementar cuando usás resultado del caché (en lugar de fetch)

**stats.cancelled:**
- Incrementar cuando se cancela un fetch (AbortError)

**Cómo actualizar en HTML:**
```
document.getElementById('stat-total').textContent = state.stats.total
```

---

## 🎨 MOSTRAR/OCULTAR ELEMENTOS

**Estados de la UI:**

### **Estado: Inicial (vacío)**
```
#empty-state → Visible
#loading-skeleton → Hidden
#recipes-grid → Hidden
#error-state → Hidden
```

### **Estado: Loading**
```
#empty-state → Hidden
#loading-skeleton → Visible
#recipes-grid → Hidden
#error-state → Hidden
```

### **Estado: Resultados**
```
#empty-state → Hidden
#loading-skeleton → Hidden
#recipes-grid → Visible
#error-state → Hidden
```

### **Estado: Error**
```
#empty-state → Hidden
#loading-skeleton → Hidden
#recipes-grid → Hidden
#error-state → Visible
```

**Helper conceptual:**
```
Para ocultar: elemento.classList.add('hidden')
Para mostrar: elemento.classList.remove('hidden')
```

---

## 🔒 CERRAR MODAL

**3 formas de cerrar el modal:**

1. Click en botón X (`.modal-close`)
2. Click en overlay (`.modal-overlay`)
3. Tecla Escape

**Para cerrar:**
```
1. Agregar clase .hidden al #recipe-modal
2. (Opcional) Limpiar contenido de #recipe-details
```

---

## 🧪 TESTING SUGERIDO

**Probar estos casos:**

✅ Buscar "chicken" → Ver resultados
✅ Buscar "xyz123abc" → Ver mensaje "no encontrado"
✅ Escribir rápido → Ver que cancela búsquedas anteriores
✅ Buscar "pasta" 2 veces → Verificar que 2da vez viene de caché
✅ Click en receta → Ver modal con detalles
✅ Cerrar modal → Modal desaparece
✅ Input vacío → Ver empty state
✅ Verificar contadores (total, caché, cancelados)

---

## 💡 TIPS GENERALES

**1. Empezar simple:**
- Primero: fetch básico + renderizar
- Después: debouncing
- Después: cancelación
- Después: caché
- Después: detalles

**2. Console.log es tu amigo:**
- Loggear responses de API
- Loggear estado antes/después de cambios
- Verificar que ingredientes se extraigan bien

**3. Testear frecuentemente:**
- No escribir 100 líneas y después testear
- Testear cada feature nueva individualmente

**4. Ingredientes/Medidas:**
- Loop del 1 al 20
- Verificar que NO sea `""` ni `null` ni `" "`
- Combinar medida + ingrediente

**5. IDs numéricos:**
- `idMeal` es string, no número
- Usar `dataset.id` o guardar referencia

---

## 🚫 LO QUE NO NECESITÁS

**NO implementes (nice-to-have, opcional):**
- Infinite scroll
- Filtros por categoría
- Favoritos
- Random recipe button

**Solo si SOBRA tiempo después del MVP completo.**

---

## 🆘 SI TE TRABÁS

**>15 min en algo:**
- Console.log para ver qué está pasando
- Verificar estructura de response de API
- Revisar que IDs/clases sean correctos

**>30 min en algo:**
- Preguntarme (te guío sin dar código)
- Explicame qué estás tratando de hacer
- Qué probaste y qué resultado te dio

---

## 🎯 RESUMEN DE FUNCIONES PRINCIPALES

**Funciones que probablemente necesites (nombres sugeridos):**

- `searchRecipes(query)` - Fetch a API, maneja caché
- `renderRecipes(recipes)` - Renderiza grid de cards
- `showRecipeDetails(id)` - Fetch detalles + mostrar modal
- `closeModal()` - Ocultar modal
- `updateStats()` - Actualizar contadores
- `showLoading()` / `hideLoading()` - Manejar skeleton
- `showError(message)` - Mostrar error state
- `showEmptyState()` - Mostrar empty state

**Nota:** Podés usar otros nombres o estructura diferente. Esto es solo sugerencia.

---

## 🔑 FÓRMULAS/DATOS PUNTUALES

**Debouncing delay:** 300ms

**AbortController:** `new AbortController()`

**Verificar ingrediente válido:**
```
Si ingrediente !== "" && ingrediente !== null
```

**Combinar medida + ingrediente:**
```
"medida ingrediente" (ej: "2 cups tomatoes")
```

**Verificar response null:**
```
Si response.meals === null → "No encontrado"
```

---

**FIN DE HINTS**

**Recordá:** Esto es solo referencia. No hay UNA forma correcta de hacerlo.

**Si tu approach es diferente pero funciona → está bien.** 💪

**¡Manos a la obra!** 🍕🚀
