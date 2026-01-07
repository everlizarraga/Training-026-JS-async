/**
**CONSIGNA:**
Creá una función `obtenerPrecio(producto)` que:
- Si el producto es "notebook" → retornar inmediatamente 50000 (usando Promise.resolve)
- Si el producto es "celular" → retornar inmediatamente 30000
- Si es otro producto → rechazar con "Producto no encontrado" (usando Promise.reject)
- Probá los 3 casos
 */

function obtenerPrecio(producto) {
  // TODO: Implementar lógica con Promise.resolve() y Promise.reject()
  switch (producto) {
    case "notebook":
      return Promise.resolve(50000);
      break;
    case "celular":
      return Promise.resolve(30000);
    default:
      return Promise.reject("Producto no encontrado");
      break;
  }
}

// TODO: Probar con "notebook"
obtenerPrecio("notebook")
  .then((precio) => console.log(`Precio: $${precio}`))
  .catch((error) => console.log(`Error: ${error}`));

// TODO: Probar con "celular"
obtenerPrecio("celular")
  .then((precio) => console.log(`Precio: $${precio}`))
  .catch((error) => console.log(`Error: ${error}`));

// TODO: Probar con "mouse" (producto no encontrado)
obtenerPrecio("mouse")
  .then((precio) => console.log(`Precio: $${precio}`))
  .catch((error) => console.log(`Error: ${error}`));


