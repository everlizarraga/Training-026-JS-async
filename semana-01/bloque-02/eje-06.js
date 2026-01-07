/**
**CONSIGNA:**
Tenés un objeto con datos de un producto. Creá un chain que:
1. Extraiga el precio
2. Aplique un 10% de descuento
3. Agregue 21% de IVA
4. Redondee el resultado a 2 decimales
5. Imprima: "Precio final: $X"
 */

const producto = {
  nombre: "Notebook",
  precio: 1000,
  categoria: "Electrónica"
};

Promise.resolve(producto)
  .then((prod) => {
    // TODO: Extraer precio
    return prod.precio;
  })
  .then((precio) => {
    // TODO: Aplicar 10% descuento
    return precio * 0.9
  })
  .then((precioConDesc) => {
    // TODO: Agregar 21% IVA
    return precioConDesc * 1.21;
  })
  .then((precioConIVA) => {
    // TODO: Redondear a 2 decimales
    return precioConIVA.toFixed(2);
  })
  .then((precioFinal) => {
    // TODO: Imprimir resultado
    // console.log("Precio final: $%s", precioFinal);
    console.log(`Precio final: $${precioFinal}`);
  });

