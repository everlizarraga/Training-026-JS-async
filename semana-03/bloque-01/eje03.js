/**
**CONSIGNA:**
1. Actualizá el post con ID 5 cambiando el título a "Post actualizado"
2. Eliminá el post con ID 10

**RESULTADO ESPERADO:**
```
Post 5 actualizado con título: Post actualizado
Post 10 eliminado correctamente
```
 */

async function actualizarPost(id, nuevoTitulo) {
  // Tu código PUT aquí
  try {
    const data = {
      id: id,
      title: nuevoTitulo
    }
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const postActualizado = await response.json();
    // console.log("Post actualizado:", postActualizado);
    console.log(`Post ${id} actualizado con titulo: ${nuevoTitulo}`);
    return postActualizado;

  } catch (error) {
    console.error("Error al actualziar:", error);
    throw error;
  }
}

async function eliminarPost(id) {
  // Tu código DELETE aquí
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const postEliminado = await response.json();
    console.log("Post eliminado:", postEliminado);
    console.log(`Post ${id} eliminado correctamente`);
    return true;
    
  } catch (error) {
    console.error('Error al eliminar:', error);
    throw error;
  }
}

// Ejecutar
actualizarPost(5, 'Post actualizado');
eliminarPost(10);

