/**
**CONSIGNA:**
Implementá AMBAS versiones (sequential y parallel) y compará tiempos.
 */

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
  const inicio = Date.now();
  const usuario = await fetchUsuario();
  const posts = await fetchPosts();
  const comentarios = await fetchComentarios();
  const duracion = (Date.now() - inicio) / 1000;
  console.log(`Sequential: ${duracion}s`)
}

// Versión paralelo
async function cargarParalelo() {
  // Tu código: ejecutar todas al mismo tiempo
  const inicio = Date.now();
  const resultados = await Promise.all([
    fetchUsuario(),
    fetchPosts(),
    fetchComentarios()
  ]);
  const duracion = (Date.now() - inicio) / 1000;
  console.log(`Parallel: ${duracion}s`);
}

cargarSecuencial();
cargarParalelo();

