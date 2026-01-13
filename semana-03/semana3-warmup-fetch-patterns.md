# 🏋️ WARMUP SEMANA 3: Fetch API + Patterns Avanzados

**Duración:** 6-9 horas (distribuido en 2 días)  
**Objetivo:** Dominar Fetch API para consumir APIs reales, implementar combinators (all/race/allSettled/any), cancelación, retry logic y patterns de producción.

---

## 📚 DISTRIBUCIÓN DE EJERCICIOS

**Bloque 1: Fetch Fundamentals (Ejercicios 1-5)**
- GET, POST, PUT, DELETE
- Error handling
- Headers custom

**Bloque 2: Promise Combinators (Ejercicios 6-9)**
- Promise.all()
- Promise.race()
- Promise.allSettled()
- Promise.any()

**Bloque 3: Advanced Patterns (Ejercicios 10-12)**
- AbortController (cancelación)
- Timeout pattern
- Retry logic

---

## 🎯 BLOQUE 1: FETCH FUNDAMENTALS

### Ejercicio 1: fetch() GET Básico

⏱️ **TIEMPO LÍMITE:** 20 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: GET request a API pública
// ============================================

async function obtenerUsuarios() {
    try {
        // 1. Hacer request GET
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // 2. Verificar si la respuesta es OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 3. Parsear JSON
        const usuarios = await response.json();
        
        // 4. Usar los datos
        console.log('Usuarios obtenidos:', usuarios.length);
        console.log('Primer usuario:', usuarios[0].name);
        
        return usuarios;
        
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Llamar la función
obtenerUsuarios();

// ============================================
// ¿QUÉ HACE?
// ============================================
// 1. fetch() retorna una Promise
// 2. await espera la respuesta del servidor
// 3. response.json() parsea el body como JSON
// 4. Maneja errores con try/catch
```

**Propiedades importantes de response:**
```javascript
response.ok        // true si status 200-299
response.status    // código HTTP (200, 404, 500, etc.)
response.statusText  // texto del status ("OK", "Not Found", etc.)
response.headers   // headers de la respuesta
response.json()    // parsea body como JSON (retorna Promise)
response.text()    // parsea body como texto
response.blob()    // parsea body como archivo binario
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Hacé un GET request a la API de posts: `https://jsonplaceholder.typicode.com/posts`

Mostrá:
1. Cantidad total de posts
2. Título del primer post
3. Título del último post

**PLANTILLA:**
```javascript
async function obtenerPosts() {
    try {
        // Tu código aquí
        
    } catch (error) {
        console.error('Error:', error);
    }
}

obtenerPosts();
```

**RESULTADO ESPERADO:**
```
Total de posts: 100
Primer post: sunt aut facere...
Último post: at nam consequatur...
```

---

#### 💡 HINTS:

**Hint 1:** `const response = await fetch(url);`  
**Hint 2:** `const posts = await response.json();`  
**Hint 3:** `posts.length` para total, `posts[0].title` para primero  
**Hint 4:** `posts[posts.length - 1].title` para último

---

### Ejercicio 2: fetch() POST con body

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: POST request para crear recurso
// ============================================

async function crearPost() {
    try {
        // 1. Preparar datos a enviar
        const nuevoPost = {
            title: 'Mi nuevo post',
            body: 'Este es el contenido del post',
            userId: 1
        };
        
        // 2. Hacer POST request con configuración
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',  // Especificar método
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido
            },
            body: JSON.stringify(nuevoPost)  // Convertir objeto a JSON string
        });
        
        // 3. Verificar respuesta
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 4. Parsear respuesta
        const postCreado = await response.json();
        
        console.log('Post creado con ID:', postCreado.id);
        console.log('Datos:', postCreado);
        
        return postCreado;
        
    } catch (error) {
        console.error('Error al crear post:', error);
        throw error;
    }
}

crearPost();

// ============================================
// ¿QUÉ HACE?
// ============================================
// 1. fetch() con segundo parámetro (opciones)
// 2. method: 'POST' especifica el método HTTP
// 3. headers: define Content-Type
// 4. body: datos a enviar (como JSON string)
// 5. El servidor retorna el recurso creado
```

**Configuración típica de POST:**
```javascript
{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos)
}
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un nuevo usuario con estos datos:
```javascript
{
    name: 'Tu Nombre',
    email: 'tu@email.com',
    username: 'tunombre123'
}
```

Hacé POST a: `https://jsonplaceholder.typicode.com/users`

Mostrá el ID del usuario creado.

**PLANTILLA:**
```javascript
async function crearUsuario() {
    const nuevoUsuario = {
        // Tu objeto aquí
    };
    
    try {
        // Tu fetch POST aquí
        
    } catch (error) {
        console.error('Error:', error);
    }
}

crearUsuario();
```

**RESULTADO ESPERADO:**
```
Usuario creado con ID: 11
Nombre: Tu Nombre
Email: tu@email.com
```

---

#### 💡 HINTS:

**Hint 1:** Segundo parámetro de fetch es un objeto con opciones  
**Hint 2:** `method: 'POST'`  
**Hint 3:** `headers: { 'Content-Type': 'application/json' }`  
**Hint 4:** `body: JSON.stringify(nuevoUsuario)`

---

### Ejercicio 3: fetch() PUT y DELETE

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: PUT (actualizar) y DELETE (eliminar)
// ============================================

// PUT - Actualizar recurso existente
async function actualizarPost(id) {
    try {
        const datosActualizados = {
            id: id,
            title: 'Título actualizado',
            body: 'Contenido actualizado',
            userId: 1
        };
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',  // Método PUT
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosActualizados)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const postActualizado = await response.json();
        console.log('Post actualizado:', postActualizado);
        
        return postActualizado;
        
    } catch (error) {
        console.error('Error al actualizar:', error);
        throw error;
    }
}

// DELETE - Eliminar recurso
async function eliminarPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'  // Método DELETE (sin body)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log(`Post ${id} eliminado correctamente`);
        
        // DELETE suele retornar vacío o el recurso eliminado
        return true;
        
    } catch (error) {
        console.error('Error al eliminar:', error);
        throw error;
    }
}

// Usar las funciones
actualizarPost(1);
eliminarPost(1);

// ============================================
// DIFERENCIAS:
// ============================================
// PUT: Actualiza recurso completo (reemplaza)
// PATCH: Actualiza parcialmente (algunos campos)
// DELETE: Elimina recurso (no lleva body)
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
1. Actualizá el post con ID 5 cambiando el título a "Post actualizado"
2. Eliminá el post con ID 10

**PLANTILLA:**
```javascript
async function actualizarPost(id, nuevoTitulo) {
    // Tu código PUT aquí
}

async function eliminarPost(id) {
    // Tu código DELETE aquí
}

// Ejecutar
actualizarPost(5, 'Post actualizado');
eliminarPost(10);
```

**RESULTADO ESPERADO:**
```
Post 5 actualizado con título: Post actualizado
Post 10 eliminado correctamente
```

---

#### 💡 HINTS:

**Hint 1:** PUT es similar a POST pero con método 'PUT'  
**Hint 2:** La URL incluye el ID: `/posts/${id}`  
**Hint 3:** DELETE solo necesita método, no body

---

### Ejercicio 4: Error Handling (Network vs HTTP)

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Manejar diferentes tipos de errores
// ============================================

async function obtenerPostConErrorHandling(id) {
    try {
        console.log(`Buscando post ${id}...`);
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        
        // ============================================
        // IMPORTANTE: fetch NO rechaza en errores HTTP
        // ============================================
        // fetch solo rechaza en:
        // - Network error (sin internet)
        // - CORS error
        // - Request cancelado
        
        // Errores HTTP (404, 500, etc.) NO rechazan la Promise
        // Debemos verificar manualmente con response.ok
        
        if (!response.ok) {
            // response.ok es false si status NO está en 200-299
            
            if (response.status === 404) {
                throw new Error(`Post ${id} no encontrado (404)`);
            } else if (response.status === 500) {
                throw new Error('Error del servidor (500)');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        
        const post = await response.json();
        console.log('✅ Post obtenido:', post.title);
        
        return post;
        
    } catch (error) {
        // Este catch captura:
        // - Network errors (fetch rechazado)
        // - Errores que lanzamos con throw new Error()
        
        if (error.message.includes('Failed to fetch')) {
            console.error('❌ Error de red: Sin conexión a internet');
        } else if (error.message.includes('404')) {
            console.error('❌ Recurso no encontrado');
        } else {
            console.error('❌ Error:', error.message);
        }
        
        throw error;
    }
}

// Probar con ID válido
obtenerPostConErrorHandling(1);

// Probar con ID inválido (404)
obtenerPostConErrorHandling(999);

// Probar con URL inválida (network error)
// fetch('https://url-invalida-que-no-existe.com/posts/1');

// ============================================
// RESUMEN:
// ============================================
// Network Error → fetch rechaza (entra al catch directamente)
// HTTP Error (404, 500) → fetch NO rechaza, debemos verificar response.ok
```

**Tipos de errores:**
```javascript
// 1. Network Error (sin internet, URL inválida)
fetch('https://url-invalida.com')
    .catch(error => {
        // error.message: "Failed to fetch"
    });

// 2. HTTP Error (404, 500, etc.)
fetch('https://jsonplaceholder.typicode.com/posts/999')
    .then(response => {
        // response.ok = false
        // response.status = 404
        // PERO la Promise NO se rechaza
    });
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función que intente obtener un usuario por ID.

Debe manejar:
1. Network errors (mostrar "Sin conexión")
2. 404 (mostrar "Usuario no encontrado")
3. Otros errores HTTP (mostrar el status)

**PLANTILLA:**
```javascript
async function obtenerUsuario(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        // Verificar response.ok
        // Si no ok → lanzar error según status
        
        const usuario = await response.json();
        console.log('Usuario:', usuario.name);
        return usuario;
        
    } catch (error) {
        // Manejar diferentes tipos de errores
    }
}

// Probar
obtenerUsuario(1);     // ✅ Debería funcionar
obtenerUsuario(999);   // ❌ 404
```

**RESULTADO ESPERADO:**
```
// ID 1:
Usuario: Leanne Graham

// ID 999:
❌ Usuario no encontrado (404)
```

---

#### 💡 HINTS:

**Hint 1:** fetch NO rechaza en errores HTTP, solo en network errors  
**Hint 2:** Verificar `if (!response.ok)` antes de parsear  
**Hint 3:** `response.status === 404` para detectar not found  
**Hint 4:** Network errors tienen mensaje "Failed to fetch"

---

### Ejercicio 5: Headers Custom (Authorization)

⏱️ **TIEMPO LÍMITE:** 20 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Request con headers custom
// ============================================

async function obtenerDatosProtegidos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mi-token-secreto-123',  // Token de autenticación
                'Accept': 'application/json',  // Formato aceptado
                'User-Agent': 'MiApp/1.0'  // Identificador de la app
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const datos = await response.json();
        console.log('Datos obtenidos:', datos.length, 'items');
        
        return datos;
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

obtenerDatosProtegidos();

// ============================================
// HEADERS COMUNES:
// ============================================
// Content-Type: Tipo de contenido que enviamos
//   - 'application/json' (JSON)
//   - 'application/x-www-form-urlencoded' (formularios)
//   - 'multipart/form-data' (archivos)
//
// Authorization: Token de autenticación
//   - 'Bearer token123' (JWT)
//   - 'Basic base64credentials' (Basic Auth)
//
// Accept: Formato que aceptamos en respuesta
//   - 'application/json'
//   - 'text/html'
//
// User-Agent: Identificador del cliente
```

**Ejemplo con API key (común en APIs reales):**
```javascript
async function buscarPeliculas(query) {
    const API_KEY = 'tu-api-key-aqui';
    
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    
    // O usando header:
    const response2 = await fetch('https://api.example.com/search', {
        headers: {
            'X-API-Key': API_KEY  // Header custom para API key
        }
    });
}
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Hacé un request con headers custom simulando autenticación.

Headers a incluir:
- Content-Type: application/json
- Authorization: Bearer token-abc-123
- Accept: application/json

URL: `https://jsonplaceholder.typicode.com/posts/1`

**PLANTILLA:**
```javascript
async function obtenerConAuth() {
    try {
        const response = await fetch('...', {
            headers: {
                // Tus headers aquí
            }
        });
        
        const datos = await response.json();
        console.log('Datos:', datos);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

obtenerConAuth();
```

**RESULTADO ESPERADO:**
```
Datos: { userId: 1, id: 1, title: "...", body: "..." }
```

---

#### 💡 HINTS:

**Hint 1:** Headers van en un objeto dentro del segundo parámetro de fetch  
**Hint 2:** Authorization: 'Bearer token-abc-123'  
**Hint 3:** No olvides Content-Type y Accept

---

## 🎯 BLOQUE 2: PROMISE COMBINATORS

### Ejercicio 6: Promise.all()

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promise.all() - Múltiples requests en paralelo
// ============================================

async function obtenerDatosMultiples() {
    try {
        console.log('Iniciando requests en paralelo...');
        const inicio = Date.now();
        
        // Hacer 3 requests AL MISMO TIEMPO
        const [usuarios, posts, comentarios] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
        ]);
        
        const duracion = ((Date.now() - inicio) / 1000).toFixed(2);
        
        console.log(`✅ Todo completado en ${duracion}s`);
        console.log(`Usuarios: ${usuarios.length}`);
        console.log(`Posts: ${posts.length}`);
        console.log(`Comentarios: ${comentarios.length}`);
        
        return { usuarios, posts, comentarios };
        
    } catch (error) {
        // Si UNA falla → TODAS fallan
        console.error('❌ Una de las requests falló:', error);
        throw error;
    }
}

obtenerDatosMultiples();

// ============================================
// Otra fomra mas robusta:
// ============================================

async function obtenerDatosMultiples() {
    try {
        console.log('Iniciando requests en paralelo...');
        const inicio = Date.now();
        
        // ============================================
        // VERSIÓN CORRECTA: Verificar response.ok
        // ============================================
        const [usuarios, posts, comentarios] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}: users`);
                    return r.json();
                }),
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}: posts`);
                    return r.json();
                }),
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}: comments`);
                    return r.json();
                })
        ]);
        
        const duracion = ((Date.now() - inicio) / 1000).toFixed(2);
        
        console.log(`✅ Todo completado en ${duracion}s`);
        console.log(`Usuarios: ${usuarios.length}`);
        console.log(`Posts: ${posts.length}`);
        console.log(`Comentarios: ${comentarios.length}`);
        
        return { usuarios, posts, comentarios };
        
    } catch (error) {
        // Ahora captura:
        // 1. Network errors
        // 2. HTTP errors (404, 500, etc.)
        // 3. JSON parsing errors
        console.error('❌ Una de las requests falló:', error);
        throw error;
    }
}

// ============================================
// Helper: fetch con verificación automática
// ============================================
async function fetchJSON(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${url}`);
    }
    
    return response.json();
}

// ============================================
// Usar el helper
// ============================================
async function obtenerDatosMultiples() {
    try {
        const [usuarios, posts, comentarios] = await Promise.all([
            fetchJSON('https://jsonplaceholder.typicode.com/users'),
            fetchJSON('https://jsonplaceholder.typicode.com/posts'),
            fetchJSON('https://jsonplaceholder.typicode.com/comments')
        ]);
        
        console.log('Todo OK:', usuarios.length, posts.length, comentarios.length);
        
        return { usuarios, posts, comentarios };
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}


// ============================================
// ¿QUÉ HACE Promise.all()?
// ============================================
// 1. Ejecuta TODAS las promises AL MISMO TIEMPO (paralelo)
// 2. Espera a que TODAS se resuelvan
// 3. Si UNA falla → rechaza TODO inmediatamente
// 4. Retorna array con resultados en el MISMO ORDEN
```

**Comparación secuencial vs paralelo:**
```javascript
// SECUENCIAL (lento):
const usuarios = await fetch('...').then(r => r.json());  // 1s
const posts = await fetch('...').then(r => r.json());     // 1s
const comentarios = await fetch('...').then(r => r.json()); // 1s
// Total: 3 segundos

// PARALELO (rápido):
const [usuarios, posts, comentarios] = await Promise.all([
    fetch('...').then(r => r.json()),  // \
    fetch('...').then(r => r.json()),  //  } Al mismo tiempo
    fetch('...').then(r => r.json())   // /
]);
// Total: 1 segundo (la más lenta)
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Hacé 3 requests en paralelo:
1. Obtener usuario ID 1
2. Obtener usuario ID 2
3. Obtener usuario ID 3

Mostrá los 3 nombres y el tiempo total.

URL: `https://jsonplaceholder.typicode.com/users/{id}`

**PLANTILLA:**
```javascript
async function obtenerTresUsuarios() {
    const inicio = Date.now();
    
    try {
        // Tu Promise.all aquí
        
        const duracion = ((Date.now() - inicio) / 1000).toFixed(2);
        console.log(`Tiempo total: ${duracion}s`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

obtenerTresUsuarios();
```

**RESULTADO ESPERADO:**
```
Usuario 1: Leanne Graham
Usuario 2: Ervin Howell
Usuario 3: Clementine Bauch
Tiempo total: 0.8s
```

---

#### 💡 HINTS:

**Hint 1:** `await Promise.all([fetch1, fetch2, fetch3])`  
**Hint 2:** Cada fetch debe tener `.then(r => r.json())`  
**Hint 3:** Usar destructuring: `const [u1, u2, u3] = await ...`

---

### Ejercicio 7: Promise.race()

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promise.race() - Primera en completar
// ============================================

async function primeraEnCompletar() {
    try {
        console.log('Iniciando race...');
        
        // Simular requests con diferentes delays
        const request1 = new Promise(resolve => 
            setTimeout(() => resolve('Request 1 (3s)'), 3000)
        );
        
        const request2 = new Promise(resolve => 
            setTimeout(() => resolve('Request 2 (1s)'), 1000)
        );
        
        const request3 = new Promise(resolve => 
            setTimeout(() => resolve('Request 3 (2s)'), 2000)
        );
        
        // race() retorna la PRIMERA en completar
        const ganador = await Promise.race([request1, request2, request3]);
        
        console.log('Ganador:', ganador);  // "Request 2 (1s)"
        
        return ganador;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

primeraEnCompletar();

// ============================================
// ¿QUÉ HACE Promise.race()?
// ============================================
// 1. Ejecuta TODAS las promises en paralelo
// 2. Retorna la PRIMERA en completar (resolve o reject)
// 3. Las demás siguen ejecutándose pero se ignoran
// 4. Útil para timeouts, fallback servers
```

**Caso de uso: Timeout pattern**
```javascript
async function fetchConTimeout(url, timeout = 5000) {
    const fetchPromise = fetch(url);
    
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
    );
    
    // Si fetch tarda más de 5s → timeout gana
    return Promise.race([fetchPromise, timeoutPromise]);
}

// Uso:
try {
    const response = await fetchConTimeout('https://api-lenta.com/data', 5000);
} catch (error) {
    if (error.message === 'Timeout') {
        console.log('Request cancelado por timeout');
    }
}
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Hacé 3 requests a diferentes endpoints y mostrá cuál completa primero.

URLs:
- `https://jsonplaceholder.typicode.com/users/1`
- `https://jsonplaceholder.typicode.com/posts/1`
- `https://jsonplaceholder.typicode.com/comments/1`

**PLANTILLA:**
```javascript
async function primeraAPIEnResponder() {
    try {
        const primero = await Promise.race([
            // Tus fetches aquí
        ]);
        
        console.log('Primera respuesta:', primero);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

primeraAPIEnResponder();
```

**RESULTADO ESPERADO:**
```
Primera respuesta: { id: 1, name: "..." } (o el que responda primero)
```

---

#### 💡 HINTS:

**Hint 1:** `await Promise.race([fetch1, fetch2, fetch3])`  
**Hint 2:** Cada fetch necesita `.then(r => r.json())`  
**Hint 3:** race() retorna el resultado de la primera promise que completa

---

### Ejercicio 8: Promise.allSettled()

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promise.allSettled() - Espera TODAS (fallen o no)
// ============================================

async function obtenerTodosSinFallar() {
    try {
        console.log('Obteniendo datos (algunas fallarán)...');
        
        const resultados = await Promise.allSettled([
            fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/users/999').then(r => r.json()),  // ← 404
            fetch('https://url-invalida.com/data').catch(e => { throw e; }),  // ← Network error
            fetch('https://jsonplaceholder.typicode.com/users/3').then(r => r.json())
        ]);
        
        // allSettled SIEMPRE retorna array con TODOS los resultados
        console.log('Resultados:', resultados);
        
        // Filtrar exitosos vs fallidos
        const exitosos = resultados.filter(r => r.status === 'fulfilled');
        const fallidos = resultados.filter(r => r.status === 'rejected');
        
        console.log(`✅ Exitosos: ${exitosos.length}`);
        console.log(`❌ Fallidos: ${fallidos.length}`);
        
        // Usar solo los exitosos
        exitosos.forEach(result => {
            console.log('Usuario:', result.value.name);
        });
        
        return resultados;
        
    } catch (error) {
        // allSettled NUNCA rechaza
        console.error('Error:', error);
    }
}

obtenerTodosSinFallar();

// ============================================
// ¿QUÉ HACE Promise.allSettled()?
// ============================================
// 1. Ejecuta TODAS las promises en paralelo
// 2. Espera a que TODAS completen (fallen o no)
// 3. NUNCA rechaza (no entra al catch)
// 4. Retorna array con objetos:
//    { status: 'fulfilled', value: resultado }
//    { status: 'rejected', reason: error }
```

**Diferencia con Promise.all():**
```javascript
// Promise.all() - Si UNA falla → TODAS fallan
await Promise.all([promise1, promise2, promise3])
    .then(resultados => {
        // Solo llega acá si TODAS tienen éxito
    })
    .catch(error => {
        // Si UNA falla → entra acá
        // Pierde resultados de las exitosas
    });

// Promise.allSettled() - Espera TODAS (fallen o no)
const resultados = await Promise.allSettled([promise1, promise2, promise3]);
// SIEMPRE llega acá con todos los resultados
// No entra al catch nunca
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Intentá obtener 5 usuarios (IDs: 1, 2, 999, 3, 998).
Los IDs 999 y 998 no existen (404).

Mostrá:
1. Cuántos se obtuvieron exitosamente
2. Cuántos fallaron
3. Los nombres de los exitosos

**PLANTILLA:**
```javascript
async function obtenerUsuariosConErrores() {
    const ids = [1, 2, 999, 3, 998];
    
    const resultados = await Promise.allSettled(
        ids.map(id => 
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(r => {
                    if (!r.ok) throw new Error(`Usuario ${id} no encontrado`);
                    return r.json();
                })
        )
    );
    
    // Analizar resultados
    // Tu código aquí
}

obtenerUsuariosConErrores();
```

**RESULTADO ESPERADO:**
```
Exitosos: 3
Fallidos: 2
Usuarios obtenidos:
- Leanne Graham
- Ervin Howell
- Clementine Bauch
```

---

#### 💡 HINTS:

**Hint 1:** allSettled retorna array de objetos con `status` y `value`/`reason`  
**Hint 2:** `resultados.filter(r => r.status === 'fulfilled')`  
**Hint 3:** `result.value` contiene el dato si es fulfilled

---

### Ejercicio 9: Promise.any()

⏱️ **TIEMPO LÍMITE:** 25 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promise.any() - Primera EXITOSA
// ============================================

async function primeraExitosa() {
    try {
        console.log('Intentando múltiples servidores...');
        
        const resultado = await Promise.any([
            fetch('https://servidor-caido.com/data').then(r => r.json()),  // ← Falla
            fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),  // ← Éxito
            fetch('https://otro-servidor.com/data').then(r => r.json())  // ← Falla
        ]);
        
        console.log('✅ Primera exitosa:', resultado);
        
        return resultado;
        
    } catch (error) {
        // Solo entra acá si TODAS fallan
        console.error('❌ Todos los servidores fallaron');
        throw error;
    }
}

primeraExitosa();

// ============================================
// ¿QUÉ HACE Promise.any()?
// ============================================
// 1. Ejecuta TODAS las promises en paralelo
// 2. Retorna la PRIMERA que se resuelva exitosamente
// 3. Ignora las que fallan
// 4. Solo rechaza si TODAS fallan
```

**Caso de uso: Fallback servers**
```javascript
async function obtenerDatosConFallback() {
    try {
        // Intenta servidor primario, luego backups
        const datos = await Promise.any([
            fetch('https://api-primary.com/data').then(r => r.json()),
            fetch('https://api-backup1.com/data').then(r => r.json()),
            fetch('https://api-backup2.com/data').then(r => r.json())
        ]);
        
        console.log('Datos obtenidos de algún servidor:', datos);
        
    } catch (error) {
        console.log('Todos los servidores fallaron');
    }
}
```

**Comparación de combinators:**
```javascript
// Promise.all() - TODAS deben tener éxito
await Promise.all([p1, p2, p3])  // Si UNA falla → TODO falla

// Promise.race() - PRIMERA en completar (éxito o fallo)
await Promise.race([p1, p2, p3])  // Retorna la primera (sea éxito o error)

// Promise.allSettled() - Espera TODAS (fallen o no)
await Promise.allSettled([p1, p2, p3])  // NUNCA falla, retorna todas

// Promise.any() - PRIMERA EXITOSA
await Promise.any([p1, p2, p3])  // Retorna primera exitosa, ignora errores
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Simulá 3 servidores con diferentes tiempos de respuesta.
Algunos fallan, uno tiene éxito.

Usá Promise.any() para obtener el primero exitoso.

**PLANTILLA:**
```javascript
async function obtenerDePrimerServidorExitoso() {
    try {
        // Simular servidores
        const servidor1 = new Promise((resolve, reject) => 
            setTimeout(() => reject('Servidor 1 caído'), 1000)
        );
        
        const servidor2 = new Promise((resolve, reject) => 
            setTimeout(() => resolve('Datos del servidor 2'), 2000)
        );
        
        const servidor3 = new Promise((resolve, reject) => 
            setTimeout(() => reject('Servidor 3 caído'), 500)
        );
        
        const datos = await Promise.any([servidor1, servidor2, servidor3]);
        
        console.log('Datos obtenidos:', datos);
        
    } catch (error) {
        console.log('Todos fallaron');
    }
}

obtenerDePrimerServidorExitoso();
```

**RESULTADO ESPERADO:**
```
Datos obtenidos: Datos del servidor 2
```

---

#### 💡 HINTS:

**Hint 1:** Promise.any() retorna la primera que se resuelve exitosamente  
**Hint 2:** Ignora las que fallan, solo usa las exitosas  
**Hint 3:** Solo entra al catch si TODAS fallan

---

## 🎯 BLOQUE 3: ADVANCED PATTERNS

### Ejercicio 10: AbortController - Cancelar Request

⏱️ **TIEMPO LÍMITE:** 35 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Cancelar fetch con AbortController
// ============================================

async function fetchCancelable() {
    // 1. Crear AbortController
    const controller = new AbortController();
    const signal = controller.signal;
    
    // 2. Cancelar después de 2 segundos
    setTimeout(() => {
        console.log('Cancelando request...');
        controller.abort();
    }, 2000);
    
    try {
        console.log('Iniciando request...');
        
        // 3. Pasar signal al fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            signal: signal  // ← Conectar el signal
        });
        
        const datos = await response.json();
        console.log('✅ Datos recibidos:', datos.length);
        
        return datos;
        
    } catch (error) {
        // 4. Verificar si fue cancelado
        if (error.name === 'AbortError') {
            console.log('❌ Request cancelado por el usuario');
        } else {
            console.error('❌ Error:', error);
        }
    }
}

fetchCancelable();

// ============================================
// ¿CÓMO FUNCIONA AbortController?
// ============================================
// 1. Crear controller: new AbortController()
// 2. Obtener signal: controller.signal
// 3. Pasar signal a fetch: fetch(url, { signal })
// 4. Cancelar cuando sea necesario: controller.abort()
// 5. fetch lanza error con name === 'AbortError'
```

**Caso de uso real: Autocomplete**
```javascript
let controllerAnterior = null;

async function buscar(query) {
    // Cancelar búsqueda anterior si existe
    if (controllerAnterior) {
        controllerAnterior.abort();
    }
    
    // Crear nuevo controller
    controllerAnterior = new AbortController();
    
    try {
        const response = await fetch(`/api/search?q=${query}`, {
            signal: controllerAnterior.signal
        });
        
        const resultados = await response.json();
        mostrarResultados(resultados);
        
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Búsqueda anterior cancelada');
        }
    }
}

// Usuario escribe rápido:
buscar('re');      // ← Cancelado
buscar('rea');     // ← Cancelado
buscar('react');   // ← Este sí completa
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un fetch que se cancele automáticamente después de 3 segundos.

Si completa antes de 3s → mostrar datos  
Si tarda más de 3s → cancelar y mostrar mensaje

**PLANTILLA:**
```javascript
async function fetchConCancelacion() {
    const controller = new AbortController();
    
    // Cancelar después de 3 segundos
    setTimeout(() => {
        // Tu código aquí
    }, 3000);
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            // Tu código aquí
        });
        
        const datos = await response.json();
        console.log('Datos:', datos.length);
        
    } catch (error) {
        // Verificar si fue AbortError
    }
}

fetchConCancelacion();
```

**RESULTADO ESPERADO:**
```
// Si completa rápido:
Datos: 100

// Si tarda más de 3s:
Request cancelado por timeout
```

---

#### 💡 HINTS:

**Hint 1:** `const controller = new AbortController();`  
**Hint 2:** `controller.abort()` cancela el request  
**Hint 3:** `signal: controller.signal` en las opciones de fetch  
**Hint 4:** `error.name === 'AbortError'` verifica cancelación

---

### Ejercicio 11: Timeout con race()

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Timeout pattern con Promise.race()
// ============================================

async function fetchConTimeout(url, timeout = 5000) {
    try {
        // Promise 1: El fetch real
        const fetchPromise = fetch(url).then(response => response.json());
        
        // Promise 2: El timeout
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Timeout: Request tardó más de ${timeout}ms`));
            }, timeout);
        });
        
        // Race: el que termine primero gana
        const resultado = await Promise.race([fetchPromise, timeoutPromise]);
        
        console.log('✅ Request completado a tiempo:', resultado);
        
        return resultado;
        
    } catch (error) {
        if (error.message.includes('Timeout')) {
            console.error('❌ Request cancelado por timeout');
        } else {
            console.error('❌ Error:', error);
        }
        throw error;
    }
}

// Probar con timeout corto (fallará)
fetchConTimeout('https://jsonplaceholder.typicode.com/posts', 100);

// Probar con timeout largo (funcionará)
fetchConTimeout('https://jsonplaceholder.typicode.com/posts', 5000);

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// 1. fetch y timeout corren en paralelo (race)
// 2. Si fetch completa primero → retorna datos
// 3. Si timeout completa primero → rechaza con error
// 4. El que pierde se ignora (pero sigue ejecutándose)
```

**Ventaja vs AbortController:**
```javascript
// Con race() (simple pero no cancela request)
Promise.race([fetchPromise, timeoutPromise])
// → Fetch sigue ejecutándose en background

// Con AbortController (cancela request realmente)
controller.abort()
// → Fetch se cancela de verdad
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Implementá una función que haga fetch con timeout de 2 segundos.

Si completa antes de 2s → retornar datos  
Si tarda más de 2s → lanzar error "Timeout"

**PLANTILLA:**
```javascript
async function fetchConTimeout(url, timeout) {
    const fetchPromise = fetch(url).then(r => r.json());
    
    const timeoutPromise = new Promise((resolve, reject) => {
        // Tu código del timeout aquí
    });
    
    try {
        const resultado = await Promise.race([fetchPromise, timeoutPromise]);
        console.log('Completado:', resultado);
        return resultado;
        
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Probar
fetchConTimeout('https://jsonplaceholder.typicode.com/users/1', 2000);
```

**RESULTADO ESPERADO:**
```
// Si completa rápido:
Completado: { id: 1, name: "..." }

// Si tarda mucho:
Error: Timeout: Request tardó más de 2000ms
```

---

#### 💡 HINTS:

**Hint 1:** timeoutPromise debe usar `reject()` después del delay  
**Hint 2:** `setTimeout(() => reject(new Error('Timeout')), timeout)`  
**Hint 3:** Promise.race retorna el que completa primero

---

### Ejercicio 12: Retry Logic

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Retry automático con exponential backoff
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
                const delay = Math.pow(2, intento) * 1000;  // Exponential backoff
                console.log(`Esperando ${delay}ms antes de reintentar...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    // Si llegó acá → todos los intentos fallaron
    console.error('❌ Todos los intentos fallaron');
    throw lastError;
}

// Probar con URL que falla
fetchConRetry('https://jsonplaceholder.typicode.com/users/999');

// ============================================
// EXPONENTIAL BACKOFF:
// ============================================
// Intento 1: Falla → espera 2s  (2^1 * 1000ms)
// Intento 2: Falla → espera 4s  (2^2 * 1000ms)
// Intento 3: Falla → espera 8s  (2^3 * 1000ms)
// 
// Esto evita saturar el servidor con reintentos rápidos
```

**Versión recursiva (alternativa):**
```javascript
async function fetchConRetryRecursivo(url, maxRetries = 3, intento = 1) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
        
    } catch (error) {
        if (intento >= maxRetries) {
            throw error;  // Sin más reintentos
        }
        
        const delay = Math.pow(2, intento) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return fetchConRetryRecursivo(url, maxRetries, intento + 1);  // Recursión
    }
}
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Implementá una función que reintente fetch hasta 3 veces.

Entre cada intento, esperar 1 segundo.

Si después de 3 intentos falla → lanzar error final

**PLANTILLA:**
```javascript
async function fetchConRetry(url, maxRetries = 3) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            console.log(`Intento ${i}...`);
            
            // Tu fetch aquí
            
        } catch (error) {
            // Manejar error y decidir si reintentar
        }
    }
    
    // Si llegó acá → todos fallaron
    throw new Error('Todos los intentos fallaron');
}

// Probar
fetchConRetry('https://jsonplaceholder.typicode.com/users/999');
```

**RESULTADO ESPERADO:**
```
Intento 1...
❌ Falló
Esperando 1s...
Intento 2...
❌ Falló
Esperando 1s...
Intento 3...
❌ Falló
Error: Todos los intentos fallaron
```

---

#### 💡 HINTS:

**Hint 1:** Usar for loop con contador de intentos  
**Hint 2:** `await new Promise(resolve => setTimeout(resolve, 1000))` para esperar  
**Hint 3:** Guardar último error para lanzarlo si todos fallan  
**Hint 4:** Solo esperar si NO es el último intento

---

## ✅ CHECKLIST FINAL WARMUP SEMANA 3

Completaste el warmup cuando:

**Bloque 1 (Fetch Fundamentals):**
- [ ] Hago GET requests correctamente
- [ ] Hago POST con body y headers
- [ ] Uso PUT y DELETE
- [ ] Distingo network errors de HTTP errors
- [ ] Envío headers custom (Authorization)

**Bloque 2 (Promise Combinators):**
- [ ] Uso Promise.all() para requests en paralelo
- [ ] Uso Promise.race() para primera en completar
- [ ] Uso Promise.allSettled() para obtener todas (fallen o no)
- [ ] Uso Promise.any() para primera exitosa
- [ ] Sé cuándo usar cada combinator

**Bloque 3 (Advanced Patterns):**
- [ ] Cancelo requests con AbortController
- [ ] Implemento timeout pattern
- [ ] Implemento retry logic
- [ ] Entiendo exponential backoff

---

## 🎯 GOVERNOR REMINDER

**Límites:**
- Máximo 2 días para completar warmup
- Si un ejercicio toma >45 min → ver hints o preguntar
- Entender > Perfeccionar

**80% de los ejercicios correctos = SUFICIENTE → NEXT proyecto**

---

## 🚀 PRÓXIMO PASO

Al completar este warmup, continúas con:

**PROYECTO FINAL: Buscador de Películas con API (TMDb)**
- App completa con API real
- Todos los patterns aplicados
- Nivel profesional
- Portfolio-ready

---

**FIN DEL WARMUP SEMANA 3**

Versión: 1.0  
Ejercicios: 12 (5 fetch + 4 combinators + 3 patterns)  
Duración: 6-9 horas  
Nivel esperado al final: Avanzado en Fetch + Patterns ⭐⭐⭐⭐
