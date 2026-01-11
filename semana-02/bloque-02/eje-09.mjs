/**
**CONSIGNA:**
Convertí este código a usar top-level await.

**TU TAREA:**
Reescribí sin la función `inicializar()` usando top-level await.

**NOTA:** Para probar esto necesitás:
- Archivo .mjs, o
- `<script type="module">` en HTML
 */

async function inicializar() {
  const usuarios = await fetch('https://jsonplaceholder.typicode.com/users');
  const configuracion = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  const usuariosData = await usuarios.json();
  const configData = await configuracion.json();

  const usuariosSimplificados = usuariosData.map((user) => {
    return { id: user.id, name: user.name }
  });

  console.log('Usuarios:', usuariosSimplificados);
  console.log('Configuración:', configData);

  return { usuarios: usuariosSimplificados, configuracion: configData };
}

// inicializar().then((datos) => {
//   console.log('App inicializada:', datos);
// });


const usuarios = await fetch('https://jsonplaceholder.typicode.com/users');
const configuracion = await fetch('https://jsonplaceholder.typicode.com/todos/1');

const usuariosData = await usuarios.json();
const configData = await configuracion.json();

const usuariosSimplificados = usuariosData.map((user) => {
  return { id: user.id, name: user.name }
});

console.log('Usuarios:', usuariosSimplificados);
console.log('Configuración:', configData);

const datos = { usuarios: usuariosSimplificados, configuracion: configData };
console.log('App inicializada:', datos);