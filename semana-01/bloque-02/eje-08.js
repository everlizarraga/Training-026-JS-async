/**
**CONSIGNA:**
Simulá este flujo:
1. Buscar una receta por nombre (toma 1 segundo) → retorna { id: 1, nombre: "Pizza" }
2. Obtener ingredientes de esa receta (toma 1 segundo) → retorna ["harina", "tomate", "queso"]
3. Calcular costo total (toma 1 segundo) → suma: $500
4. Imprimir: "La receta {nombre} con {cantidad} ingredientes cuesta ${costo}"
 */

function buscarReceta(nombre) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, nombre: nombre });
    }, 1000);
  });
}

function obtenerIngredientes(recetaId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["harina", "tomate", "queso"]);
    }, 1000);
  });
}

function calcularCosto(ingredientes) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const costo = ingredientes.length * 100;  // $100 por ingrediente
      resolve(costo);
    }, 1000);
  });
}

// TODO: Crear el chain completo (flat, no anidado)
// Hint: Vas a necesitar guardar datos en una variable externa
// o retornar objetos combinados

buscarReceta("Pizza")
  .then((receta) => {
    // TU CÓDIGO AQUÍ
    return obtenerIngredientes(receta)
      .then((lista) => {return {receta, lista}});
  })
  .then(({receta, lista}) => {
    // TU CÓDIGO AQUÍ
    return calcularCosto(lista)
      .then((costo) => {return {receta, lista, costo}});
  })
  .then(({receta, lista, costo}) => {
    // TU CÓDIGO AQUÍ
    console.log(`La receta ${receta.nombre} con ${lista.length} ingredientes cuesta $${costo}`);
  });


