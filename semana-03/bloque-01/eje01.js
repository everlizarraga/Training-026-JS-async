/**
**CONSIGNA:**
Hacé un GET request a la API de posts: `https://jsonplaceholder.typicode.com/posts`

Mostrá:
1. Cantidad total de posts
2. Título del primer post
3. Título del último post
 */

async function obtenerPosts() {
  try {
    // Tu código aquí
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    const cantidadPosts = posts.length;
    const primerPost = posts[0];
    const ultimoPost = posts[cantidadPosts - 1];
    console.log("Cantidad total de posts:", cantidadPosts);
    console.log("Título del primer post:", primerPost.title);
    console.log("Título del último post:", ultimoPost.title);

  } catch (error) {
    console.error('Error:', error);
  }
}

obtenerPosts();

