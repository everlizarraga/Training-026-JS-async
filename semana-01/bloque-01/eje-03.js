/**
**CONSIGNA:**
Creá una promise que simule un login de usuario:
- Si el username es "admin" → resolve("Login exitoso")
- Si el username es cualquier otro → reject("Usuario no autorizado")
- Manejá ambos casos con .then() y .catch()
 */

const username = "admin";  // Cambiá esto para probar

const login = new Promise((resolve, reject) => {
  setTimeout(() => {
    // TODO: Verificar el username y resolver o rechazar
    if(username === 'admin') {
      resolve("Login exitoso");
    } else {
      reject("Usuario no autorizado");
    }
  }, 1000);
});

// TODO: Consumir con .then() y .catch()
login
  .then((mensaje) => {
    // TU CÓDIGO AQUÍ
    console.log("OK:", mensaje);
  })
  .catch((error) => {
    // TU CÓDIGO AQUÍ
    console.error("Error:", error);
  });

