/**
**CONSIGNA:**
Creá un nuevo usuario con estos datos:
```javascript
{
  name: 'Tu Nombre',
  email: 'tu@email.com',
  username: 'tunombre123'
}
```
Hacé POST a: `https://jsonplaceholder.typicode.com/users`
Mostrá el ID del usuario creado.

**RESULTADO ESPERADO:**
```
Usuario creado con ID: 11
Nombre: Tu Nombre
Email: tu@email.com
```
 */

async function crearUsuario() {
  const nuevoUsuario = {
    // Tu objeto aquí
    name: 'Ever Lizarraga',
    email: 'everlizarraga@email.com',
    username: 'tunombre123'
  };

  try {
    // Tu fetch POST aquí
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario)
    });
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userCreado = await response.json();
    // console.log('USER:', userCreado);
    console.log("Usuario creado con ID:", userCreado.id);
    console.log("Nombre:", userCreado.name);
    console.log("Email:", userCreado.email);

  } catch (error) {
    console.error('Error:', error);
  }
}

crearUsuario();
