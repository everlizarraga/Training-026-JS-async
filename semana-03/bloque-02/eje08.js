/**
**CONSIGNA:**
Intentá obtener 5 usuarios (IDs: 1, 2, 999, 3, 998).
Los IDs 999 y 998 no existen (404).

Mostrá:
1. Cuántos se obtuvieron exitosamente
2. Cuántos fallaron
3. Los nombres de los exitosos

**RESULTADO ESPERADO:**
```
Exitosos: 3
Fallidos: 2
Usuarios obtenidos:
- Leanne Graham
- Ervin Howell
- Clementine Bauch
```
 */

async function obtenerUsuariosConErrores() {
  const ids = [1, 2, 999, 3, 998];

  const resultados = await Promise.allSettled(
    ids.map(id =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(r => {
          if (!r.ok) throw new Error(`[Status${r.status}] - Usuario ${id} no encontrado`);
          return r.json();
        })
    )
  );

  // Analizar resultados
  // Tu código aquí
  //    { status: 'fulfilled', value: resultado }
  //    { status: 'rejected', reason: error }
  const exitosos = resultados.filter(r => r.status === 'fulfilled');
  const fallidos = resultados.filter(r => r.status === 'rejected');
  console.log(`Exitosos: ${exitosos.length}`);
  console.log(`Fallidos: ${fallidos.length}`);
  console.log("Usuarios obtenidos:");
  exitosos.forEach(user => {
    console.log(`- ${user.value.name}`);
  });
}

obtenerUsuariosConErrores();

