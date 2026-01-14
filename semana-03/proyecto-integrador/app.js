// ============================================
// CONFIGURACIÓN
// ============================================
const API_KEY = '69cbc687c32419aa77d44cddeee6cf38';  // ← REEMPLAZAR con tu key
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
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func.apply(this, args);
    }, delay);
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

  const cacheKey = `${query}-${page}`;
  if (state.cache.has(cacheKey)) {
    state.stats.cacheHits++;  // ← Incrementar contador de caché
    updateStats();
    console.log('Desde caché:', cacheKey);
    return state.cache.get(cacheKey);
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=es-ES`;
  console.log(url);
  try {
    state.stats.totalRequests++;
    updateStats();
    const data = await fetchWithRetry(url, { signal: state.currentController?.signal });
    state.cache.set(cacheKey, data.results);
    // state.currentController = null;
    state.currentPage = page;
    state.totalPages = data.total_pages;
    // state.movies = data.results;
    console.log("Fetch exitoso !!!");
    return data.results;
  } catch (error) {
    console.error(error.message);
    return null;
    // throw error;
  }
}
// searchMovies("batman", 1);

/**
 * Obtener detalles de película
 */
async function getMovieDetails(movieId) {
  // TODO DÍA 3: Implementar detalles
  // 1. Fetch a /movie/{id}
  // 2. Retornar datos completos
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;
  if (state.cache.has(url)) {
    return state.cache.get(url);
  }
  console.log(url);
  try {
    const data = await fetchWithRetry(url);
    state.cache.set(url, data);
    console.log("Detalles:", data);
    return data
  } catch (error) {
    console.error("Erro en details:", error.message);
    return null;
  }
}
// getMovieDetails(268);

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
  if (!append) {
    moviesGrid.innerHTML = '';  // Limpiar grid
    state.movies = [];
  }

  state.movies = [...state.movies, ...movies];

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const posterUrl = movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : '';
      // : 'https://via.placeholder.com/200x300?text=Sin+Póster';

    card.innerHTML = `
      <img 
        src="${posterUrl}" 
        alt="${movie.title}"
        class="movie-poster"
      >
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-meta">
          <span class="movie-year">${movie.release_date?.split('-')[0] || 'N/A'}</span>
          <div class="movie-rating">
            <span class="star">⭐</span>
            <span>${movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
        `;

    // Agregar click event
    card.addEventListener('click', () => {
      showMovieDetails(movie.id);
    });

    moviesGrid.appendChild(card);
  });
}

/**
 * Mostrar detalles de película (modal)
 */
async function showMovieDetails(movieId) {
  // TODO DÍA 3: Implementar modal
  // 1. Fetch detalles
  // 2. Renderizar en modal
  // 3. Mostrar modal
  const movie = await getMovieDetails(movieId);
  if (!movie) return;

  movieModal.classList.remove('hidden');
  const movieDetails = movieModal.querySelector("#movie-details");
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    :'';
    // : 'https://via.placeholder.com/300x450?text=Sin+Póster';
  // const backdropUrl = movie.backdrop_path
  //   ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  //   : '';

  const year = movie.release_date?.split('-')[0] || 'N/A';
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const duration = movie.runtime ? `${hours}h ${minutes}m` : 'N/A';
  const genres = movie.genres?.map(g => g.name).join(', ') || 'N/A';

  movieDetails.innerHTML = `
    <div class="movie-detail-header">
      <img src="${posterUrl}" alt="${movie.title}" class="movie-detail-poster">
            
      <div class="movie-detail-info">
        <h2>${movie.title}</h2>
          
        <div class="movie-detail-meta">
          <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
          <span style="margin: 0 10px;">•</span>
          <span>${year}</span>
          <span style="margin: 0 10px;">•</span>
          <span>${duration}</span>
        </div>
          
        <p style="margin: 20px 0;"><strong>Géneros:</strong> ${genres}</p>
          
        <p class="movie-detail-overview">
          ${movie.overview || 'Sin descripción disponible.'}
        </p>
      </div>
    </div>
    `;
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
const handleSearch = debounce(async function (query) {
  // TODO DÍA 2: Implementar handler
  // 1. Cancelar búsqueda anterior (AbortController)
  // 2. Si query vacío → mostrar empty state
  // 3. Llamar searchMovies()
  // 4. Renderizar resultados
  if (state.currentController) {
    state.currentController.abort();
    state.stats.cancelled++;
    updateStats();
  }
  if (!query || query == '') {
    emptyState.classList.remove('hidden');
    moviesGrid.innerHTML = '';
    loadingSkeleton.classList.add('hidden');
    errorState.classList.add('hidden');
    return;
  }
  state.currentController = new AbortController();
  state.currentQuery = query;
  const movies = await searchMovies(query);
  if (!movies) return;
  setLoading(false);
  renderMovies(movies);
  if (movies && movies.length > 0) {
    renderMovies(movies);
  } else {
    moviesGrid.innerHTML = '<p style="text-align: center; color: #999;">No se encontraron películas</p>';
  }
  console.log('Buscando:', query);
}, 300);  // Debounce de 300ms

/**
 * Handler de infinite scroll
 */
async function handleScroll() {
  // TODO DÍA 3: Implementar infinite scroll
  // 1. Detectar si llegó al bottom
  // 2. Si hay más páginas → cargar siguiente
  // 3. Append resultados
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (!bottom) return;
  if (state.totalPages <= state.currentPage) return;
  const movies = await searchMovies(state.currentQuery, state.currentPage + 1);
  renderMovies(movies, true);
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
// console.log('Configurá tu API_KEY en la línea 5');

