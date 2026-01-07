/**
**CONSIGNA:**
Tenés un array de estudiantes con sus notas. Creá un chain que:
1. Filtre solo estudiantes con nota >= 7 (aprobados)
2. Extraiga solo los nombres de esos estudiantes
3. Ordene los nombres alfabéticamente
4. Cree un string: "Aprobados: nombre1, nombre2, nombre3"
5. Imprima el resultado
 */

const estudiantes = [
  { nombre: "Carlos", nota: 8 },
  { nombre: "Ana", nota: 6 },
  { nombre: "Lucía", nota: 9 },
  { nombre: "Miguel", nota: 5 },
  { nombre: "Sofía", nota: 7 }
];

Promise.resolve(estudiantes)
  .then((lista) => {
    // TODO: Filtrar aprobados (nota >= 7)
    return lista.filter(e => e.nota >= 7);
  })
  .then((aprobados) => {
    // TODO: Extraer solo nombres
    return aprobados.map(e => e.nombre);
  })
  .then((nombres) => {
    // TODO: Ordenar alfabéticamente
    return nombres.sort((a,b) => a>b);
  })
  .then((nombresOrdenados) => {
    // TODO: Crear string con formato
    return `Aprobados: ${nombresOrdenados.join(", ")}`
  })
  .then((mensaje) => {
    // TODO: Imprimir
    console.log(mensaje);
  });

