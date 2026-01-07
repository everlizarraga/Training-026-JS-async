/**
**CONSIGNA:**
Simulá un proceso de compra con validaciones:
1. Verificar stock (si no hay stock → throw error)
2. Aplicar descuento
3. Procesar pago (puede fallar 30% de las veces)
4. Si todo sale bien → "Compra exitosa"
5. Si algo falla → "Compra cancelada: [razón]"
6. SIEMPRE al final → "Proceso finalizado"
 */

const producto = {
  nombre: "Notebook",
  stock: 5,
  precio: 1000
};

function verificarStock(prod) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (prod.stock > 0) {
        resolve(prod);
      } else {
        reject('Sin stock disponible');
      }
    }, 500);
  });
}

function aplicarDescuento(prod) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const precioFinal = prod.precio * 0.9;  // 10% desc
      resolve({ ...prod, precio: precioFinal });
    }, 500);
  });
}

function procesarPago(prod) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fallo = Math.random() < 0.3;  // 30% falla
      if (fallo) {
        reject('Error en el procesamiento del pago');
      } else {
        resolve(prod);
      }
    }, 500);
  });
}

// TODO: Crear el chain completo con manejo de errores
verificarStock(producto)
  .then((prod) => {
    // TU CÓDIGO AQUÍ
    return aplicarDescuento(prod);
  })
  .then((prod) => {
    // TU CÓDIGO AQUÍ
    return procesarPago(prod);
  })
  .then((/* ... */) => {
    // TU CÓDIGO AQUÍ
    console.log("Compra exitosa");
  })
  .catch((error) => {
    // TU CÓDIGO AQUÍ
    console.log(`Compra cancelada: [${error}]`);
  })
  .finally(() => {
    // TU CÓDIGO AQUÍ
    console.log("Proceso finalizado");
  });


