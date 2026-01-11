/**
**CONSIGNA:**
Te doy código con `.then()`. Convertilo a `async/await`.
**TU TAREA:**
Convertí la función `autenticar()` a async/await manteniendo la misma funcionalidad.
 */

function login(username) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ token: 'abc123', username }), 1000);
  });
}

function obtenerPerfil(token) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ nombre: 'Juan', edad: 30 }), 1000);
  });
}

// Versión con .then()
function autenticar(username) {
  return login(username)
    .then((auth) => {
      console.log('Token:', auth.token);
      return obtenerPerfil(auth.token);
    })
    .then((perfil) => {
      console.log('Perfil:', perfil);
      return perfil;
    });
}

async function autenticar2(username) {
  try {
    const auth = await login(username);
    console.log('Token:', auth.token);
    const perfil = await obtenerPerfil(auth.token);
    console.log('Perfil:', perfil);
    return perfil;
  } catch (error) {
    console.log(error);
    return null;
  }

}

// autenticar('juan123');
autenticar2('juan123');

