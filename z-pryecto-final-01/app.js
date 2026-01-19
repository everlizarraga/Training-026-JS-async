

const state = {
  recipes: [],        // Array de recetas actuales en pantalla
  selectedRecipe: null,
  cache: new Map(),   // Caché de búsquedas (key: query, value: recipes)
  currentQuery: "",   // Query actual de búsqueda
  isLoading: false,   // Si está cargando
  error: null,        // Mensaje de error (si hay)
  stats: {
    total: 0,         // Total de requests a la API
    cacheHits: 0,     // Cuántos vinieron desde caché
    cancelled: 0      // Cuántos fueron cancelados
  },
  translate: false,
  currentController: null
}

/**
 * @typedef {Object} Ingrediente
 * @property {string} nombre
 * @property {string} cantidad
 */


const UI = function () {
  // Elements Stats
  const _elementStatTotal = document.getElementById('stat-total');
  const _elementStatCache = document.getElementById('stat-cache');
  const _elementStateCancel = document.getElementById('stat-cancelled');
  // Element Modal
  const _modalContainer = document.getElementById('recipe-modal');
  const _modalDetails = document.getElementById('recipe-details');
  // Input
  const _inputSearch = document.getElementById('search-input');
  // Cards
  const _gridCards = document.getElementById('recipes-grid');
  // Main-content
  const _loadingSkeleton = document.getElementById('loading-skeleton');
  const _emptyState = document.getElementById('empty-state');
  const _errorState = document.getElementById('error-state');
  const _gridRecipes = document.getElementById('recipes-grid');
  // Funciones Auxiliares
  const ocultarMmain = () => {
    _loadingSkeleton.classList.add('hidden');
    _emptyState.classList.add('hidden');
    _errorState.classList.add('hidden');
    _gridRecipes.classList.add('hidden');
  }
  return {
    stats: {
      update() {
        _elementStatTotal.textContent = state.stats.total;
        _elementStatCache.textContent = state.stats.cacheHits;
        _elementStateCancel.textContent = state.stats.cancelled;
      }
    },
    modal: {
      show(trueFalse = true) {
        if (trueFalse) {
          _modalContainer.classList.remove('hidden');
          return;
        }
        _modalContainer.classList.add('hidden');
        _modalDetails.innerHTML = '';
      },
      set(receta) {
        if (!receta) throw new Error("Receta no encontrada");
        _modalDetails.innerHTML = '';
        const nuevoContenido = `
          <img src="${receta.strMealThumb}" class="recipe-details-image" alt="${receta.strMeal}" data-yt="${receta.strYoutube}">
          <h2 class="recipe-details-title">${receta.strMeal}</h2>
          
          <div class="recipe-details-meta">
            <span class="recipe-details-badge">Categoría: ${receta.strCategory}</span>
            <span class="recipe-details-badge">Área: ${receta.strArea}</span>
          </div>
          
          <div class="recipe-details-section">
            <h3>Ingredientes</h3>
            <div class="recipe-ingredients">
              <!--div class="recipe-ingredient">1 cup pasta</!--div>
              <div-- class="recipe-ingredient">2 tbsp oil</div-->
            </div>
          </div>
          
          <div class="recipe-details-section">
            <h3>Instrucciones</h3>
            <p class="recipe-instructions">${!state.translate ? receta.strInstructions : ''}</p>
          </div>
        `;
        _modalDetails.innerHTML = nuevoContenido;
        if (state.translate) {
          const instruccionesElement = _modalDetails.querySelector('.recipe-instructions');
          const fn = async (texto) => {
            instruccionesElement.textContent = await traducirTexto(texto);
          }
          fn(receta.strInstructions);
        }
        requestAnimationFrame(() => {
          procesarIngredientes(receta);
          const details = _modalContainer.querySelector('.recipe-ingredients');
          if (!details) throw new Error("No se encontro el nodo details");
          details.innerHTML = receta
            .ingredientes.map(e => {
              return `<div class="recipe-ingredient">${e.cantidad} ${e.nombre}</div>`
            })
            .join('');
        });
      }
    },
    input: {
      get() {
        return _inputSearch.value;
      },
      set(value) {
        _inputSearch.textContent = value;
      }
    },
    cards: {
      createCardNode(receta) {
        const temp = document.createElement('div');
        const template = `
          <div class="recipe-card" data-id="${receta.idMeal}">
            <img src="${receta.strMealThumb}" alt="${receta.strMeal}" class="recipe-image">
            <div class="recipe-info">
              <h3 class="recipe-name">${receta.strMeal}</h3>
              <span class="recipe-category">${receta.strCategory}</span>
            </div>
          </div>
        `;
        temp.innerHTML = template;
        // console.log("FirstChild:", temp.children[0]);
        return temp.children[0];
      },
      clear() { _gridCards.innerHTML = '' },
      addCard(...cards) {
        if (cards.length == 0) throw new Error("Se requiere Argumentos Cards");
        cards.forEach(e => {
          _gridCards.append(e);
        });
      }
    },
    mainContent: {
      /**
       * Switchear Panel Visible
       * @param {'loading-state'|'empty-state'|'error-state'|'recipes-state'} mode 
       */
      show(mode) {
        switch (mode) {
          case 'loading-state':
            if(!_loadingSkeleton) throw new Error("Elemento no encontrado");
            ocultarMmain();
            _loadingSkeleton.classList.remove('hidden');
            break;
          case 'empty-state':
            if(!_emptyState) throw new Error("Elemento no encontrado");
            ocultarMmain();
            _emptyState.classList.remove('hidden');
            break;
          case 'error-state':
            if(!_errorState) throw new Error("Elemento no encontrado");
            const errorMessageElement = _errorState.querySelector('#error-message');
            errorMessageElement.textContent = state.error;
            ocultarMmain();
            _errorState.classList.remove('hidden');
            break;
          case 'recipes-state':
            if(!_gridRecipes) throw new Error("Elemento no encontrado");
            ocultarMmain();
            _gridRecipes.classList.remove('hidden');
            break;
          default:
            break;
        }
      }
    }
  }
}();

// UI.modal.show();

// /////////////////////////////////////////////////
// Funciones Asincronas
// /////////////////////////////////////////////////
const fnAsincronas = function () {
  return {
    async fetchSimple(url, opciones = {}) {
      if (!url) throw new Error("Es necesario una URL");
      state.stats.total += 1;
      UI.stats.update();
      try {
        const response = await fetch(url, opciones);
        if (!response.ok) {
          throw new Error(`HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error.message);
        if (error.name === 'AbortError') {
          state.currentController = null;
          state.stats.cancelled += 1;
          UI.stats.update();
          throw error;
        }
        throw error;
      }
    },
    async fetchConReintentos(url, opciones = {}, retry = 3) {
      if (!url) throw new Error("Es necesario una URL");
      let ultimoError;
      for (let i = 1; i <= retry; i++) {
        try {
          console.log(`Intento ${i}/${retry}`);
          const response = await this.fetchSimple(url, opciones);
          console.log("[v] Éxito !!!");
          // return await response.json();
          return response;
        } catch (error) {
          ultimoError = error;
          if (error.name === 'AbortError') throw error;
          console.error("[X] Fallo.");
          if(i < retry) {
            const delay = 200;
            await new Promise((resolve, _) => setTimeout(resolve, delay));
          }
        }
      }
      throw ultimoError;
    },
  }
}();

const recipeFinderAPI = function () {
  return {
    /**
     * Buscar por texto
     * @param {string} search 
     * @returns {Promise<Object[]|null>}
     * @throws {Error}
     */
    async searchByQuery(search) {
      if(!search) throw new Error("Es necesario una URL");
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      try {
        const response = await fnAsincronas.fetchConReintentos(
          URL,
          {signal: state.currentController?.signal},
          3
        );
        console.log(`API-Query: ${search}`);
        return response.meals;
      } catch (error) {
        console.error(`API-Query: ${error.message}`);
        state.error = error.message;
        throw error;
      }
    },
    /**
     * Buscar por ID
     * @param {string} id 
     * @returns {Promise<Object[]|null>}
     * @throws {Error}
     */
    async searchByID(id) {
      if(!id) throw new Error("Es necesario una ID");
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      try {
        const response = await fnAsincronas.fetchConReintentos(
          URL,
          {signal: state.currentController?.signal},
          3
        );
        console.log("API-id:", response);
        return response.meals;
      } catch (error) {
        console.error(`API-id: ${error.message}`);
        state.error = error.message;
        throw error;
      }
    }
  }
}();



// /////////////////////////////////////////////////
// Handlers
// /////////////////////////////////////////////////
const fnFetchSearch = memorization(recipeFinderAPI.searchByQuery, "handle-search-query");

async function handleSearch(query) {
  if(!query || query === '') {
    console.warn("Se necesita query");
    UI.mainContent.show('empty-state');
    return;
  }

  if(state.currentController) {
    state.currentController.abort();
  }
  
  state.currentQuery = query;
  state.currentController = new AbortController();
  try {
    // const response = await recipeFinderAPI.searchByQuery(query);
    UI.mainContent.show('loading-state');
    const response = await fnFetchSearch(query);
    if(response == null) {
      state.error = `Sin resultados para: ${query}`;
      UI.mainContent.show('error-state');
      return;
    }
    console.log('>>>', response);
    state.recipes = response;
    UI.cards.clear();
    const cards = response.map(e => UI.cards.createCardNode(e));
    UI.cards.addCard(...cards);
    UI.mainContent.show('recipes-state');
  } catch (error) {
    console.error(">:", error.message);
    UI.mainContent.show('error-state');
  }
}

const fnFetchCardId = memorization(recipeFinderAPI.searchByID, "handle-search-id");
/**
 * Controlador de click en card
 * @param {HTMLElement} card 
 */
async function handleClickCard(card) {
  const id = card.dataset.id;
  try {
    // const response = await recipeFinderAPI.searchByID(id);
    const response = await fnFetchCardId(id);
    if(response == null) {
      state.error = `Elemento ${id} No encontrado.`;
      UI.mainContent.show('error-state');
      return;
    }
    UI.modal.set(response[0]);
    UI.modal.show();
  } catch (error) {
    UI.mainContent.show('error-state');
    console.error(error.message);
  }
}

/**
 * Manejador de Img -> YouTube
 * @param {HTMLElement} imgVideo 
 */
function handleClickYouTube(imgVideo) {
  console.log('imgVideo:', imgVideo);
  const url = imgVideo.dataset.yt;
  console.log('imgVideo URL:', url);
  if(!url) throw new Error("YT URL no encontrada");
  window.open(url, '_blank', 'noopener,noreferrer');
}

// /////////////////////////////////////////////////
// Listeners
// /////////////////////////////////////////////////
const inputSearch = document.getElementById('search-input');
if(inputSearch) {
  const fn = debounce(handleSearch, 500);
  inputSearch.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    fn(query);
  });
} else console.error("Input no encontrado");

const mainContainer = document.querySelector('main');
if(mainContainer) {
  mainContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.recipe-card');
    if(card) {
      console.log("Card:", card);
      handleClickCard(card);
    }
  });
} else console.error("Elemento no encontrado");

const modalElement = document.getElementById('recipe-modal');
if(modalElement) {
  document.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal-overlay') ||
    event.target.classList.contains('modal-close')) {
      UI.modal.show(false);
    }
    const imgVideo = event.target.closest('#recipe-details img.recipe-details-image');
    if(imgVideo) {
      handleClickYouTube(imgVideo);
    }
  });
} else console.error("Elemento no encontrado");

// /////////////////////////////////////////////////
// Aux Functions
// /////////////////////////////////////////////////

function memorization(fn, str = '') {
  return async function(...args) {
    const key = `[${str}-${fn.name}]-${args.join('-')}`;
    if(state.cache.has(key)) {
      state.stats.cacheHits += 1;
      UI.stats.update();
      return state.cache.get(key);
    }
    try {
      const response = await fn(...args);
      state.cache.set(key, response);
      return response;
    } catch(error) {
      console.error(error.message);
      return null;
      // throw error;
    }

  }
};

function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      fn.apply(this, args);
    }, delay);
  }
}

function procesarIngredientes(receta) {
  const lista = [];
  for (let i = 1; i <= 20; i++) {
    const keyIngrediente = `strIngredient${i}`;
    const keyCantidad = `strMeasure${i}`;
    if (receta[keyIngrediente] !== '') {
      /**@type {Ingrediente} */
      const nuevoIngrediente = {
        nombre: receta[keyIngrediente],
        cantidad: receta[keyCantidad]
      }
      lista.push(nuevoIngrediente);
    }
  }
  receta["ingredientes"] = lista;
}

async function traducirTexto(text) {
  const maxChar = 450;
  let lista = [];
  let traducciones = [];
  if (text.length > maxChar -1) {
    lista = dividirTextoLargo(text, maxChar)
    console.log(lista);
  }else {
    lista = [text];
  }
  for (const elemento of lista) {
    const traducido = await myMemoryTraductor(elemento);
    // console.log(`Traducido[${elemento.length}]: ${traducido}`);
    if (!traducido) throw new Error("Error al traducir");
    traducciones.push(traducido);
  }
  return traducciones.join(' ');
}

async function myMemoryTraductor(texto, idiomaOrigen = "en", idiomaDestino = "es") {
  const apiKey = "bda6031c3b566b284e95";
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${idiomaOrigen}|${idiomaDestino}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[HTTP: ${response.status}] Error MyMemory Translate`);
    }
    const data = await response.json();
    /**@type {string} */
    const textoTraducido = data.responseData.translatedText;
    // console.log(`Translate[${response.status}]:`, textoTraducido);
    const textErrorMaxLength = "QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS";
    if (textoTraducido.includes(textErrorMaxLength)) {
      return null;
    }
    return textoTraducido;
  } catch (error) {
    console.error(`myMemoryTraductor: ${error.message}`);
    return null;
  }
}

// myMemoryTraductor("Hello World", "en", "es");

const textoLargo = "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.";

// myMemoryTraductor(textoLargo, "en", "es");

function dividirTextoLargo(str, maxChars = 450) {
  const esOracionAceptable = (oracion) => oracion.length <= maxChars;

  function limpiarTexto(texto) {
    return texto
      .replace(/\r\n/g, ' ')  // Reemplaza Windows line breaks
      .replace(/\n/g, ' ')     // Reemplaza Unix line breaks
      .replace(/\r/g, ' ')     // Reemplaza Mac line breaks
      .replace(/\s+/g, ' ')    // Normaliza múltiples espacios a uno
      .trim();                 // Elimina espacios al inicio/fin
  }

  function dividirOracionForzada(texto) {
    let rpta = [];
    /**@type {string[]} */
    const textoSplit = texto.split(' ');
    if (textoSplit.length == 1) throw new Error(`[Max Length ${maxChars}] Una palabra demasiado larga`);
    const mitad = Math.floor(textoSplit.length / 2);
    const acoplarN = (inicio, fin) =>
      textoSplit.slice(inicio, fin + 1).join(' ');
    const primeraMitad = acoplarN(0, mitad);
    const segundaMitad = acoplarN(mitad + 1, textoSplit.length - 1);
    [primeraMitad, segundaMitad].forEach(e => {
      if (esOracionAceptable(e)) rpta.push(e);
      else {
        const volverADividir = dividirOracionForzada(e);
        rpta = [...rpta, ...volverADividir];
      }
    });

    return rpta;
  }

  if (!str || str == '') return null;
  /**@type {string[]} */
  const textoEnOraciones = limpiarTexto(str).split(/(?<=[.!?])\s+/);
  if (textoEnOraciones.length == 1) {
    if (esOracionAceptable(textoEnOraciones[0])) {
      return textoEnOraciones;
    } else {
      return dividirOracionForzada(textoEnOraciones[0]);
    }
  }

  const acumulador = [];
  let base = '';

  for (let i = 0; i < textoEnOraciones.length; i++) {
    const actual = textoEnOraciones[i];
    if (!esOracionAceptable(actual)) {
      const spliteadoLargo = dividirOracionForzada(actual);
      acumulador.push(...spliteadoLargo);
    } else {
      const choclo = [base, actual].join(' ').trim();
      if (!esOracionAceptable(choclo)) {
        if (base != '') {
          acumulador.push(base);
          base = actual;
          if ((i + 1) >= textoEnOraciones.length) acumulador.push(actual);
        }
      } else {
        if ((i + 1) < textoEnOraciones.length) {
          base = choclo;
        } else {
          acumulador.push(choclo);
        }
      }
    }
  }

  // console.log(acumulador);
  // console.log(acumulador.map(e => {
  //   return {
  //     str: e,
  //     length: e.length
  //   }
  // }))
  // console.log('----------');
  // console.log(dividirOracionForzada(textoLargo));

  return acumulador;

}

// dividirTextoLargo(textoLargo);
// console.log(textoLargo.length);


