/**
**CONSIGNA:**
Implementá un sistema de login con 3 pasos que puede fallar en cualquiera:
1. Validar credenciales (puede fallar)
2. Obtener datos del usuario (puede fallar)
3. Cargar preferencias (puede fallar)

Requisitos:
- Si falla paso 1 → Usar usuario "guest" y continuar
- Si falla paso 2 → Usar datos vacíos y continuar
- Si falla paso 3 → Usar preferencias por defecto
- Al final imprimir el resultado final
 */

function validarCredenciales() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3;  // 70% éxito
      if (exito) {
        resolve({ username: 'juan123' });
      } else {
        reject('Credenciales inválidas');
      }
    }, 500);
  });
}

function obtenerDatosUsuario(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3;  // 70% éxito
      if (exito) {
        resolve({ username, email: 'juan@email.com' });
      } else {
        reject('Error obteniendo datos');
      }
    }, 500);
  });
}

function cargarPreferencias(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3;  // 70% éxito
      if (exito) {
        resolve({ tema: 'oscuro', idioma: 'es' });
      } else {
        reject('Error cargando preferencias');
      }
    }, 500);
  });
}

// TODO: Implementar con múltiples .catch() para recuperación
let datosUsuario = {};

validarCredenciales()
  .catch((error) => {
    console.log('❌', error, '- Usando guest');
    return { username: 'guest' };
  })
  .then((usuario) => {
    datosUsuario.username = usuario.username;
    return obtenerDatosUsuario(usuario.username);
  })
  .catch((error) => {
    console.log('❌', error, '- Usando datos vacíos');
    return {
      username: datosUsuario.username,
      email: 'guest@app.com'
    };
  })
  .then((datos) => {
    datosUsuario.email = datos.email;
    return cargarPreferencias(datos.username);
  })
  .catch((error) => {
    console.log('❌', error, '- Usando preferencias default');
    return { tema: 'claro', idioma: 'es' };
  })
  .then((preferencias) => {
    const resultado = {
      ...datosUsuario,
      ...preferencias
    };
    console.log('Login completo:', resultado);
  });

