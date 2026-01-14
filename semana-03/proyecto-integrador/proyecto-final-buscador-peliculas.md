# 🎬 PROYECTO FINAL: Buscador de Películas (TMDb API)

**Duración:** 5 días máximo (15 horas)  
**Objetivo:** Construir app COMPLETA que consume API real e implementa TODOS los patterns avanzados de producción.

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un **buscador de películas profesional** similar a:
- Netflix search
- IMDb search
- Google Movies

**Con funcionalidades de nivel Mid-Senior:**
- Búsqueda en tiempo real con debouncing
- Cancelación automática de búsquedas
- Infinite scroll (lazy loading)
- Retry automático en errores
- Caché de búsquedas
- Loading states profesionales
- Estadísticas de performance

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
- [x] **Input de búsqueda** con placeholder
- [x] **Debouncing** (300ms) - no buscar en cada tecla
- [x] **Cancelación** de búsquedas anteriores (AbortController)
- [x] **Grid de películas** con póster, título, año, rating
- [x] **Loading states** (skeleton screens)
- [x] **Click en película** → Ver detalles (modal o sección)
- [x] **Infinite scroll** - cargar más al scrollear
- [x] **Retry logic** - reintentar si falla (max 3)
- [x] **Caché** - no re-buscar lo mismo
- [x] **Error handling** visual
- [x] **Estadísticas** en footer (requests, caché, cancelados)

### Nice to Have (si sobra tiempo):
- [ ] Filtros por género/año
- [ ] Favoritos (localStorage)
- [ ] Dark mode
- [ ] Animaciones

**Governor:** Hacer SOLO el MVP. Nice-to-have opcional.

---

## 📅 CRONOGRAMA DÍA POR DÍA

### DÍA 1: Setup + Búsqueda Básica (3 horas)
**Objetivo:** API funcionando, búsqueda simple, mostrar resultados

**Tareas:**
1. [ ] Registrarse en TMDb y obtener API key
2. [ ] Copiar HTML/CSS base
3. [ ] Implementar función `searchMovies(query)`
4. [ ] Mostrar películas en grid
5. [ ] Testear con búsqueda manual (sin input aún)

**Checkpoint:** Ver películas en pantalla al buscar "batman"

---

### DÍA 2: Debouncing + Cancelación (3 horas)
**Objetivo:** Input funcional con debouncing y cancelación

**Tareas:**
1. [ ] Conectar input a búsqueda
2. [ ] Implementar debounce (300ms)
3. [ ] Implementar AbortController (cancelar búsquedas)
4. [ ] Agregar loading states (skeleton screens)
5. [ ] Testear escribiendo rápido

**Checkpoint:** Búsqueda funciona sin bombardear API

---

### DÍA 3: Detalles + Infinite Scroll (4 horas)
**Objetivo:** Ver detalles al click, cargar más películas al scrollear

**Tareas:**
1. [ ] Click en película → fetch detalles
2. [ ] Mostrar detalles (modal o sección)
3. [ ] Implementar infinite scroll (detectar bottom)
4. [ ] Cargar página siguiente de resultados
5. [ ] Testear scroll hasta tener varias páginas

**Checkpoint:** Scroll infinito funciona, detalles se muestran

---

### DÍA 4: Retry + Caché (3 horas)
**Objetivo:** Retry automático, caché de búsquedas

**Tareas:**
1. [ ] Implementar retry logic (max 3 intentos)
2. [ ] Implementar caché (Map o objeto)
3. [ ] Verificar caché antes de fetch
4. [ ] Guardar respuestas en caché
5. [ ] Testear con y sin internet

**Checkpoint:** Caché funciona, retry automático en errores

---

### DÍA 5: Estadísticas + Pulido (2 horas)
**Objetivo:** Footer con stats, pulir UI, testing final

**Tareas:**
1. [ ] Contador de requests totales
2. [ ] Contador de requests desde caché
3. [ ] Contador de requests cancelados
4. [ ] Mejorar estilos (spacing, colores)
5. [ ] Testing completo de todos los features

**Checkpoint:** Estadísticas funcionan, UI profesional

---

## 🌐 SETUP DE API (THE MOVIE DATABASE)

### Paso 1: Registrarse

**URL:** https://www.themoviedb.org/signup

1. Crear cuenta (gratis)
2. Confirmar email
3. Login

---

### Paso 2: Obtener API Key

1. Ir a: https://www.themoviedb.org/settings/api
2. Click en "Create" o "Request API Key"
3. Elegir "Developer"
4. Aceptar términos
5. Copiar tu **API Key (v3 auth)**

**Ejemplo:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

### Paso 3: Endpoints Principales

**Buscar películas:**
```
GET https://api.themoviedb.org/3/search/movie

Parámetros:
- api_key: TU_API_KEY
- query: término de búsqueda (ej: "batman")
- page: número de página (1, 2, 3...)
- language: 'es-ES' (opcional, para español)

Ejemplo completo:
https://api.themoviedb.org/3/search/movie?api_key=TU_KEY&query=batman&page=1&language=es-ES
```

**Respuesta:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 268,
      "title": "Batman",
      "overview": "El multimillonario Bruce Wayne...",
      "poster_path": "/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg",
      "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
      "release_date": "1989-06-23",
      "vote_average": 7.2
    },
    // ... más películas
  ],
  "total_pages": 42,
  "total_results": 834
}
```

**Detalles de película:**
```
GET https://api.themoviedb.org/3/movie/{movie_id}

Ejemplo:
https://api.themoviedb.org/3/movie/268?api_key=TU_KEY&language=es-ES
```

**Imágenes:**
```
Base URL: https://image.tmdb.org/t/p/

Tamaños disponibles:
- w92    (muy pequeño)
- w154   (pequeño)
- w185   (thumbnail)
- w342   (mediano)
- w500   (grande) ← Recomendado para pósters
- w780   (muy grande)
- original (tamaño original)

Ejemplo completo:
https://image.tmdb.org/t/p/w500/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg
                            ↑
                    poster_path de la API
```

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
proyecto-final/
├── index.html
├── styles.css
└── app.js
```

---

## 🎨 HTML COMPLETO (copiar tal cual)

Crear `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎬 Buscador de Películas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <header class="header">
            <h1>🎬 Buscador de Películas</h1>
            <p class="subtitle">Powered by The Movie Database (TMDb)</p>
        </header>

        <!-- SEARCH BAR -->
        <section class="search-section">
            <div class="search-container">
                <input 
                    type="text" 
                    id="search-input" 
                    class="search-input"
                    placeholder="Buscar películas... (ej: batman, matrix, avatar)"
                    autocomplete="off"
                >
                <div id="search-status" class="search-status"></div>
            </div>
        </section>

        <!-- MOVIES GRID -->
        <section class="movies-section">
            <div id="movies-grid" class="movies-grid">
                <!-- Películas se insertan aquí dinámicamente -->
            </div>

            <!-- Loading Skeleton -->
            <div id="loading-skeleton" class="loading-skeleton hidden">
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
                <div class="skeleton-card"></div>
            </div>

            <!-- Loading More (Infinite Scroll) -->
            <div id="loading-more" class="loading-more hidden">
                <div class="spinner"></div>
                <p>Cargando más películas...</p>
            </div>

            <!-- Empty State -->
            <div id="empty-state" class="empty-state">
                <p>🔍 Buscá una película para empezar</p>
            </div>

            <!-- Error State -->
            <div id="error-state" class="error-state hidden">
                <p>❌ Error al buscar películas</p>
                <p class="error-message"></p>
                <button id="retry-btn" class="retry-btn">Reintentar</button>
            </div>
        </section>

        <!-- MOVIE DETAILS MODAL -->
        <div id="movie-modal" class="modal hidden">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div id="movie-details">
                    <!-- Detalles se insertan aquí -->
                </div>
            </div>
        </div>

        <!-- FOOTER CON ESTADÍSTICAS -->
        <footer class="footer">
            <div class="stats">
                <div class="stat">
                    <span class="stat-label">Requests Totales:</span>
                    <span id="stat-total" class="stat-value">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Desde Caché:</span>
                    <span id="stat-cache" class="stat-value">0</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Cancelados:</span>
                    <span id="stat-cancelled" class="stat-value">0</span>
                </div>
            </div>
        </footer>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

---

## 🎨 CSS COMPLETO (copiar tal cual)

Crear `styles.css`:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #e50914;
    --primary-dark: #b20710;
    --bg-dark: #141414;
    --bg-light: #1f1f1f;
    --text-light: #ffffff;
    --text-gray: #999999;
    --border: #333333;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-light);
    line-height: 1.6;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* HEADER */
.header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--border);
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.subtitle {
    color: var(--text-gray);
    font-size: 1rem;
}

/* SEARCH SECTION */
.search-section {
    margin-bottom: 40px;
}

.search-container {
    max-width: 600px;
    margin: 0 auto;
}

.search-input {
    width: 100%;
    padding: 15px 20px;
    font-size: 1.1rem;
    background-color: var(--bg-light);
    color: var(--text-light);
    border: 2px solid var(--border);
    border-radius: 8px;
    transition: border-color 0.3s;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary);
}

.search-status {
    margin-top: 10px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-gray);
    min-height: 20px;
}

/* MOVIES GRID */
.movies-section {
    min-height: 400px;
    position: relative;
}

.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.movie-card {
    background-color: var(--bg-light);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
}

.movie-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(229, 9, 20, 0.3);
}

.movie-poster {
    width: 100%;
    height: 300px;
    object-fit: cover;
    background-color: #333;
}

.movie-info {
    padding: 15px;
}

.movie-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.movie-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-gray);
}

.movie-year {
    color: var(--text-gray);
}

.movie-rating {
    display: flex;
    align-items: center;
    gap: 5px;
}

.movie-rating .star {
    color: #ffd700;
}

/* LOADING SKELETON */
.loading-skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.skeleton-card {
    background-color: var(--bg-light);
    border-radius: 8px;
    height: 400px;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

/* LOADING MORE */
.loading-more {
    text-align: center;
    padding: 30px;
}

.spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 10px;
    border: 4px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* EMPTY STATE */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-gray);
    font-size: 1.2rem;
}

/* ERROR STATE */
.error-state {
    text-align: center;
    padding: 60px 20px;
}

.error-state p {
    margin-bottom: 10px;
    font-size: 1.1rem;
}

.error-message {
    color: var(--text-gray);
    font-size: 0.9rem;
}

.retry-btn {
    margin-top: 20px;
    padding: 12px 30px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.retry-btn:hover {
    background-color: var(--primary-dark);
}

/* MODAL */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
    position: relative;
    background-color: var(--bg-light);
    border-radius: 10px;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 30px;
    z-index: 1001;
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    transition: color 0.3s;
}

.modal-close:hover {
    color: var(--primary);
}

.movie-detail-header {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
}

.movie-detail-poster {
    width: 300px;
    height: 450px;
    object-fit: cover;
    border-radius: 8px;
}

.movie-detail-info h2 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.movie-detail-meta {
    color: var(--text-gray);
    margin-bottom: 20px;
}

.movie-detail-overview {
    line-height: 1.8;
    margin-bottom: 20px;
}

/* FOOTER */
.footer {
    margin-top: 60px;
    padding-top: 30px;
    border-top: 2px solid var(--border);
}

.stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}

.stat {
    text-align: center;
}

.stat-label {
    display: block;
    color: var(--text-gray);
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
}

/* UTILITIES */
.hidden {
    display: none !important;
}

/* RESPONSIVE */
@media (max-width: 768px) {
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }

    .movie-detail-header {
        flex-direction: column;
    }

    .movie-detail-poster {
        width: 100%;
        height: auto;
    }

    .stats {
        gap: 20px;
    }
}
```

---

## 💻 JAVASCRIPT - ESTRUCTURA BASE

Crear `app.js`:

```javascript
// ============================================
// CONFIGURACIÓN
// ============================================
const API_KEY = 'TU_API_KEY_AQUI';  // ← REEMPLAZAR con tu key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ============================================
// ESTADO DE LA APP
// ============================================
const state = {
    currentQuery: '',
    currentPage: 1,
    totalPages: 0,
    movies: [],
    cache: new Map(),  // Caché de búsquedas
    stats: {
        totalRequests: 0,
        cacheHits: 0,
        cancelled: 0
    },
    currentController: null  // Para cancelar búsquedas
};

// ============================================
// DOM ELEMENTS
// ============================================
const searchInput = document.getElementById('search-input');
const searchStatus = document.getElementById('search-status');
const moviesGrid = document.getElementById('movies-grid');
const loadingSkeleton = document.getElementById('loading-skeleton');
const loadingMore = document.getElementById('loading-more');
const emptyState = document.getElementById('empty-state');
const errorState = document.getElementById('error-state');
const movieModal = document.getElementById('movie-modal');
const statTotal = document.getElementById('stat-total');
const statCache = document.getElementById('stat-cache');
const statCancelled = document.getElementById('stat-cancelled');

// ============================================
// HELPERS
// ============================================

/**
 * Debounce: Ejecuta función después de X ms sin actividad
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Fetch con retry logic
 */
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            lastError = error;
            
            // Si es AbortError, no reintentar
            if (error.name === 'AbortError') {
                throw error;
            }
            
            // Si no es el último intento, esperar
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 1000;  // Exponential backoff
                console.log(`Reintento ${attempt + 1} en ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

/**
 * Actualizar estadísticas
 */
function updateStats() {
    statTotal.textContent = state.stats.totalRequests;
    statCache.textContent = state.stats.cacheHits;
    statCancelled.textContent = state.stats.cancelled;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Buscar películas
 */
async function searchMovies(query, page = 1) {
    // TODO DÍA 1: Implementar búsqueda
    // 1. Verificar caché primero (DÍA 4)
    // 2. Hacer fetch a /search/movie
    // 3. Retornar datos
}

/**
 * Obtener detalles de película
 */
async function getMovieDetails(movieId) {
    // TODO DÍA 3: Implementar detalles
    // 1. Fetch a /movie/{id}
    // 2. Retornar datos completos
}

// ============================================
// UI FUNCTIONS
// ============================================

/**
 * Renderizar películas en el grid
 */
function renderMovies(movies, append = false) {
    // TODO DÍA 1: Implementar renderizado
    // 1. Si append = false → limpiar grid
    // 2. Por cada película → crear card
    // 3. Agregar al grid
}

/**
 * Mostrar detalles de película (modal)
 */
async function showMovieDetails(movieId) {
    // TODO DÍA 3: Implementar modal
    // 1. Fetch detalles
    // 2. Renderizar en modal
    // 3. Mostrar modal
}

/**
 * Mostrar/ocultar loading
 */
function setLoading(loading) {
    if (loading) {
        loadingSkeleton.classList.remove('hidden');
        emptyState.classList.add('hidden');
        errorState.classList.add('hidden');
    } else {
        loadingSkeleton.classList.add('hidden');
    }
}

/**
 * Mostrar error
 */
function showError(message) {
    errorState.classList.remove('hidden');
    errorState.querySelector('.error-message').textContent = message;
    emptyState.classList.add('hidden');
    loadingSkeleton.classList.add('hidden');
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handler de búsqueda (con debouncing)
 */
const handleSearch = debounce(async function(query) {
    // TODO DÍA 2: Implementar handler
    // 1. Cancelar búsqueda anterior (AbortController)
    // 2. Si query vacío → mostrar empty state
    // 3. Llamar searchMovies()
    // 4. Renderizar resultados
    
    console.log('Buscando:', query);
}, 300);  // Debounce de 300ms

/**
 * Handler de infinite scroll
 */
function handleScroll() {
    // TODO DÍA 3: Implementar infinite scroll
    // 1. Detectar si llegó al bottom
    // 2. Si hay más páginas → cargar siguiente
    // 3. Append resultados
}

// ============================================
// EVENT LISTENERS
// ============================================

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    handleSearch(query);
});

window.addEventListener('scroll', handleScroll);

// Modal close
movieModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') || 
        e.target.classList.contains('modal-close')) {
        movieModal.classList.add('hidden');
    }
});

// ============================================
// INIT
// ============================================
console.log('🎬 App iniciada');
console.log('Configurá tu API_KEY en la línea 5');
```

---

## 🎓 PATTERNS EXPLICADOS

### 1. DEBOUNCING PATTERN

**Qué es:** Esperar X ms sin actividad antes de ejecutar función.

**Por qué:** Evitar hacer fetch en CADA tecla (bombardear API).

**Dónde lo ves:**
```javascript
const handleSearch = debounce(async function(query) {
    // Se ejecuta 300ms DESPUÉS de que el usuario dejó de escribir
}, 300);
```

**Analogía:** Ascensor que espera 5 segundos sin que nadie presione botones antes de moverse.

---

### 2. CANCELLATION PATTERN

**Qué es:** Cancelar request anterior cuando inicia uno nuevo.

**Por qué:** Evitar que respuestas viejas sobreescriban las nuevas.

**Dónde lo ves:**
```javascript
// Cancelar búsqueda anterior
if (state.currentController) {
    state.currentController.abort();
    state.stats.cancelled++;
}

// Crear nuevo controller
state.currentController = new AbortController();
```

---

### 3. RETRY PATTERN

**Qué es:** Reintentar automáticamente en errores temporales.

**Por qué:** Red inestable, servidor ocupado → segunda oportunidad.

**Dónde lo ves:**
```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Intentar fetch
        } catch (error) {
            // Si falla → esperar y reintentar
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

---

### 4. CACHE PATTERN

**Qué es:** Guardar respuestas para no re-buscar lo mismo.

**Por qué:** Ahorrar requests, mejorar performance.

**Dónde lo ves:**
```javascript
const cacheKey = `${query}-${page}`;

// Verificar caché primero
if (state.cache.has(cacheKey)) {
    state.stats.cacheHits++;
    return state.cache.get(cacheKey);
}

// Si no está → fetch y guardar
const data = await fetch(...);
state.cache.set(cacheKey, data);
```

---

### 5. LAZY LOADING PATTERN (Infinite Scroll)

**Qué es:** Cargar más contenido al scrollear (no todo de una vez).

**Por qué:** Performance, mejor UX.

**Dónde lo ves:**
```javascript
function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Si llegó al bottom (con margen de 100px)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadNextPage();
    }
}
```

---

### 6. LOADING STATE PATTERN

**Qué es:** Mostrar skeleton/spinner mientras carga.

**Por qué:** Feedback visual, mejor UX.

**Dónde lo ves:**
```javascript
setLoading(true);  // Mostrar skeleton
const data = await searchMovies(query);
setLoading(false);  // Ocultar skeleton
renderMovies(data.results);
```

---

## 💡 HINTS POR DÍA

### Día 1: Búsqueda Básica

**Hint 1:** URL completa:
```javascript
const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=es-ES`;
```

**Hint 2:** Renderizar película:
```javascript
const card = document.createElement('div');
card.className = 'movie-card';
card.innerHTML = `
    <img src="${IMAGE_BASE_URL}${movie.poster_path}" class="movie-poster">
    <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-meta">
            <span class="movie-year">${movie.release_date?.split('-')[0]}</span>
            <div class="movie-rating">
                <span class="star">⭐</span>
                <span>${movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
    </div>
`;
```

---

### Día 2: Debouncing + Cancelación

**Hint 1:** Cancelar anterior:
```javascript
if (state.currentController) {
    state.currentController.abort();
    state.stats.cancelled++;
    updateStats();
}

state.currentController = new AbortController();
```

**Hint 2:** Pasar signal a fetch:
```javascript
const response = await fetch(url, {
    signal: state.currentController.signal
});
```

---

### Día 3: Detalles + Infinite Scroll

**Hint 1:** Detectar bottom:
```javascript
const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
```

**Hint 2:** Cargar siguiente página:
```javascript
if (state.currentPage < state.totalPages && !state.isLoadingMore) {
    state.currentPage++;
    loadNextPage();
}
```

---

### Día 4: Retry + Caché

**Hint 1:** Verificar caché:
```javascript
const cacheKey = `${query}-${page}`;
if (state.cache.has(cacheKey)) {
    state.stats.cacheHits++;
    return state.cache.get(cacheKey);
}
```

**Hint 2:** Guardar en caché:
```javascript
state.cache.set(cacheKey, data);
```

---

### Día 5: Estadísticas

**Hint 1:** Incrementar contador:
```javascript
state.stats.totalRequests++;
updateStats();
```

---

## ✅ CHECKLIST FINAL

### Día 1:
- [ ] API key funcionando
- [ ] searchMovies() implementada
- [ ] Películas se renderizan en grid
- [ ] Pósters se cargan correctamente

### Día 2:
- [ ] Input conectado a búsqueda
- [ ] Debouncing funciona (300ms)
- [ ] AbortController cancela búsquedas
- [ ] Loading skeleton se muestra

### Día 3:
- [ ] Click en película abre modal
- [ ] Detalles se muestran correctamente
- [ ] Infinite scroll detecta bottom
- [ ] Página siguiente se carga

### Día 4:
- [ ] Retry automático funciona
- [ ] Caché guarda búsquedas
- [ ] Caché evita re-fetch
- [ ] Sin errores en consola

### Día 5:
- [ ] Estadísticas se actualizan
- [ ] UI pulida y profesional
- [ ] Todo funciona sin bugs
- [ ] Readme con instrucciones

---

## 🎯 GOVERNOR REMINDER

**Límites estrictos:**
- ⏱️ Máximo 5 días (15 horas)
- ⏱️ Si una feature toma >3 horas → simplificar o skipear
- ✅ MVP suficiente = Nice-to-have opcional
- ✅ 80% funcional = SUBIR

**Frases del Governor:**
```
"Funciona? → SUBIR (no iterar más)"
"MVP completo? → Nice-to-have opcional"
"Día 5 terminó? → SUBIR lo que tengas"
```

---

## 🚀 DESPUÉS DE COMPLETAR

Al terminar este proyecto habrás:

✅ Construido app completa con API real  
✅ Implementado 7 patterns de producción  
✅ Dominado TOTALMENTE Async JavaScript  
✅ Alcanzado nivel Mid-Senior demostrable  
✅ Proyecto portfolio-ready  

**Nivel de salida:** Mid-Senior en Async JavaScript ⭐⭐⭐⭐⭐

---

## 📝 NOTAS IMPORTANTES

### API Limits

TMDb tiene límite de **40 requests por 10 segundos**.

Con caché + debouncing → no deberías llegar nunca.

### Póster Fallback

Si película no tiene póster:
```javascript
const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}` 
    : 'https://via.placeholder.com/200x300?text=Sin+Póster';
```

### CORS

TMDb API **SÍ permite CORS** → funciona desde navegador.

---

**FIN DEL BRIEF**

Versión: 1.0  
Proyecto: Final (Semana 3)  
Duración: 5 días máximo  
Nivel: Mid-Senior  
Con todo el amor del mundo 💜🎬
