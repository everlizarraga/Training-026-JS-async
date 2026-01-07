# 📚 WARMUP SEMANA 1: Promises desde Cero

**Duración total:** 9-12 horas (distribuido en 3 días)  
**Objetivo:** Dominar creación y consumo de promises en múltiples escenarios

---

## 🎯 DISTRIBUCIÓN DE EJERCICIOS

**BLOQUE 1 (Ejercicios 1-5):** Fundamentos - Crear y consumir promises
**BLOQUE 2 (Ejercicios 6-8):** Chaining - Encadenar y transformar
**BLOQUE 3 (Ejercicios 9-12):** Error Handling - Manejo de errores

---

# 📘 BLOQUE 1: FUNDAMENTOS (Ejercicios 1-5)

**Duración:** 2-3 horas  
**Conceptos:** Constructor, estados, consumo básico

---

## Ejercicio 1: Crear Promise Básica

⏱️ **TIEMPO LÍMITE:** 20 minutos

---

### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Promise que se resuelve después de 2 segundos
// ============================================

// 1. Crear una promise usando el constructor new Promise()
const miPromesa = new Promise((resolve, reject) => {
    // 2. Esta función se ejecuta inmediatamente
    console.log('Promise creada, iniciando operación...');
    
    // 3. Simulamos una operación asíncrona con setTimeout
    setTimeout(() => {
        // 4. Después de 2 segundos, "resolvemos" la promise
        resolve('¡Operación completada con éxito!');
    }, 2000);
});

// 5. En este punto, la promise está en estado "pending" (pendiente)
console.log('Promise creada. Estado: pending');

// 6. Consumimos la promise con .then()
miPromesa.then((resultado) => {
    // 7. Este código se ejecuta cuando la promise se resuelve
    console.log('Resultado:', resultado);
    // Output: "¡Operación completada con éxito!"
});

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// 1. new Promise() crea una promise
// 2. Recibe una función con dos parámetros: resolve y reject
// 3. resolve() se llama cuando la operación es exitosa
// 4. reject() se llama cuando hay un error (no usado en este ejemplo)
// 5. La promise empieza en estado "pending"
// 6. Cuando se llama resolve() → cambia a "fulfilled"
// 7. El .then() se ejecuta cuando la promise está "fulfilled"

// ============================================
// FLUJO DE EJECUCIÓN
// ============================================
/*
Tiempo 0ms:
  → Se crea la promise (estado: pending)
  → Se ejecuta console.log('Promise creada, iniciando...')
  → Se inicia setTimeout de 2 segundos
  → Se ejecuta console.log('Promise creada. Estado: pending')

Tiempo 2000ms (2 segundos después):
  → setTimeout se ejecuta
  → Se llama resolve('¡Operación completada con éxito!')
  → Promise cambia de pending a fulfilled
  → Se ejecuta el .then()
  → Se imprime: "Resultado: ¡Operación completada con éxito!"
*/
```

**Analogía:**
```
Una promise es como pedir comida a domicilio:

1. Hacés el pedido (new Promise)
2. El restaurante confirma que lo recibió (pending)
3. Mientras esperás, podés hacer otras cosas
4. Cuando llega la comida → resolve("Pizza caliente")
5. Si hay un problema → reject("No tenemos más pizza")
6. Cuando llega (o falla) → se ejecuta tu .then() o .catch()
```

**Diagrama del flujo:**
```
new Promise((resolve, reject) => {...})
           ↓
    [PENDING STATE]
     (esperando)
           ↓
   setTimeout ejecuta
           ↓
    resolve(valor)
           ↓
   [FULFILLED STATE]
    (completada)
           ↓
   .then() se ejecuta
           ↓
   Recibes el valor
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Creá una promise que simule descargar un archivo. La descarga debe:
- Tomar 3 segundos (usar setTimeout)
- Al completar, resolver con el mensaje: "archivo.pdf descargado correctamente"
- Imprimir el mensaje cuando se complete

**PLANTILLA:**
```javascript
// TODO: Crear la promise
const descargarArchivo = new Promise((resolve, reject) => {
    // TU CÓDIGO AQUÍ
});

// TODO: Consumir la promise
descargarArchivo.then((mensaje) => {
    // TU CÓDIGO AQUÍ
});
```

**RESULTADO ESPERADO:**
```
(Espera 3 segundos)
Output: "archivo.pdf descargado correctamente"
```

---

### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** Necesitás usar `setTimeout(() => { resolve(...) }, 3000)` dentro del constructor de la promise

**Hint 2:** El `.then()` recibe el valor que le pasás a `resolve()`. Solo necesitás hacer `console.log()` de ese valor

**Hint 3:** La estructura es: crear promise con setTimeout → llamar resolve con el mensaje → en .then() imprimir lo que recibís

---

## Ejercicio 2: Consumir con .then()

⏱️ **TIEMPO LÍMITE:** 20 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Consumir promise con transformación de datos
// ============================================

// Promise que retorna un número
const obtenerNumero = new Promise((resolve) => {
    setTimeout(() => {
        resolve(5);  // Resuelve con el número 5
    }, 1000);
});

// ============================================
// FORMA 1: Consumir directamente
// ============================================
obtenerNumero.then((numero) => {
    console.log('Número recibido:', numero);  // Output: 5
});

// ============================================
// FORMA 2: Transformar el valor en .then()
// ============================================
obtenerNumero.then((numero) => {
    const doble = numero * 2;
    console.log('El doble es:', doble);  // Output: 10
    return doble;  // Podemos retornar un valor para el siguiente .then()
});

// ============================================
// FORMA 3: Encadenar múltiples .then()
// ============================================
obtenerNumero
    .then((numero) => {
        console.log('Número original:', numero);  // Output: 5
        return numero * 2;  // Retornamos el doble
    })
    .then((numeroDoble) => {
        console.log('Número duplicado:', numeroDoble);  // Output: 10
        return numeroDoble + 10;  // Retornamos +10
    })
    .then((numeroFinal) => {
        console.log('Número final:', numeroFinal);  // Output: 20
    });

// ============================================
// ¿CÓMO FUNCIONA .then()?
// ============================================
/*
1. .then() recibe una función callback
2. Esa función se ejecuta SOLO cuando la promise se resuelve
3. El valor pasado a resolve() llega como parámetro del callback
4. Podés transformar el valor antes de retornarlo
5. Si retornás un valor → el siguiente .then() lo recibe
6. Si NO retornás nada → el siguiente .then() recibe undefined
*/

// ============================================
// CONCEPTO CLAVE: .then() TAMBIÉN RETORNA UNA PROMISE
// ============================================
const promesa1 = obtenerNumero;
const promesa2 = promesa1.then((n) => n * 2);
const promesa3 = promesa2.then((n) => n + 10);

// promesa1, promesa2, promesa3 son TODAS promises
// Por eso podemos encadenar: .then().then().then()
```

**Analogía:**
```
.then() es como una cinta transportadora en una fábrica:

Materia prima → [MÁQUINA 1] → Producto intermedio → [MÁQUINA 2] → Producto final
     5        →   [x 2]     →         10         →   [+ 10]    →      20

Cada .then() es una máquina que:
1. Recibe un producto (el valor anterior)
2. Lo procesa/transforma
3. Lo pasa a la siguiente máquina (return)
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Tenés una promise que retorna tu edad. Creá un chain de `.then()` que:
1. Reciba la edad
2. Calcule cuántos años tendrás en 10 años
3. Imprima: "En 10 años tendrás X años"

**PLANTILLA:**
```javascript
const obtenerEdad = new Promise((resolve) => {
    setTimeout(() => {
        resolve(25);  // Tu edad actual
    }, 1000);
});

// TODO: Encadenar .then() para calcular e imprimir
obtenerEdad
    .then((edad) => {
        // TU CÓDIGO AQUÍ
    })
    .then((edadFutura) => {
        // TU CÓDIGO AQUÍ
    });
```

**RESULTADO ESPERADO:**
```
(Espera 1 segundo)
Output: "En 10 años tendrás 35 años"
```

---

### 💡 HINTS:

**Hint 1:** En el primer `.then()` sumá 10 a la edad y retorná el resultado

**Hint 2:** El segundo `.then()` recibe la edad futura. Solo necesitás hacer `console.log()` con un template string

**Hint 3:** Recordá que para pasar valores entre `.then()` necesitás usar `return`

---

## Ejercicio 3: Consumir con .catch()

⏱️ **TIEMPO LÍMITE:** 25 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promise que puede fallar
// ============================================

// Simulamos una operación que puede fallar (50% de probabilidad)
const operacionArriesgada = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = Math.random() > 0.5;  // 50% de probabilidad
        
        if (exito) {
            resolve('✅ Operación exitosa');
        } else {
            reject('❌ La operación falló');  // Rechazamos la promise
        }
    }, 1000);
});

// ============================================
// FORMA 1: Manejar error con .catch()
// ============================================
operacionArriesgada
    .then((mensaje) => {
        console.log('Éxito:', mensaje);
    })
    .catch((error) => {
        console.log('Error capturado:', error);
    });

// ============================================
// FORMA 2: .then() con dos callbacks
// ============================================
operacionArriesgada.then(
    (mensaje) => {
        console.log('Éxito:', mensaje);
    },
    (error) => {
        console.log('Error:', error);
    }
);

// ============================================
// FORMA 3: Combinado con múltiples .then()
// ============================================
operacionArriesgada
    .then((mensaje) => {
        console.log('Paso 1:', mensaje);
        return mensaje.toUpperCase();
    })
    .then((mensajeMayus) => {
        console.log('Paso 2:', mensajeMayus);
        return mensajeMayus.length;
    })
    .then((longitud) => {
        console.log('Longitud:', longitud);
    })
    .catch((error) => {
        // Este .catch() captura errores de CUALQUIER .then() anterior
        console.log('❌ Error en algún paso:', error);
    });

// ============================================
// ¿CÓMO FUNCIONA .catch()?
// ============================================
/*
1. .catch() se ejecuta cuando:
   - La promise es rechazada (reject() fue llamado)
   - Se lanza un error dentro de un .then()
   
2. .catch() captura el error más cercano hacia arriba

3. Si hay múltiples .then() → un solo .catch() al final
   captura errores de TODOS los .then()

4. .catch() es equivalente a: .then(null, errorCallback)
*/

// ============================================
// CONCEPTO CLAVE: PROPAGACIÓN DE ERRORES
// ============================================
const promesaConError = new Promise((resolve, reject) => {
    reject('Error inicial');
});

promesaConError
    .then((valor) => {
        console.log('Este .then() NO se ejecuta');
        return valor * 2;
    })
    .then((valor) => {
        console.log('Este tampoco');
        return valor + 10;
    })
    .catch((error) => {
        console.log('Capturé el error aquí:', error);
        // Output: "Capturé el error aquí: Error inicial"
    });

// Los .then() se saltean porque la promise fue rechazada
// El error "viaja" directo al .catch()
```

**Analogía:**
```
.catch() es como una red de seguridad en un circo:

Acróbata salta → [TRAPECIO 1] → [TRAPECIO 2] → [TRAPECIO 3] → ✅ Llegó al final
                                   ↓ (si cae)
                              [RED DE SEGURIDAD]
                                 .catch()

- Si todo sale bien → llega al final
- Si falla en cualquier punto → cae a la red (catch)
- La red está al final y atrapa cualquier caída
```

**Diagrama del flujo:**
```
new Promise()
      ↓
   resolve()  o  reject()
      ↓              ↓
   .then()         (saltea todos los .then())
      ↓              ↓
   .then()         (va directo a catch)
      ↓              ↓
   .catch() ←───────┘
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Creá una promise que simule un login de usuario:
- Si el username es "admin" → resolve("Login exitoso")
- Si el username es cualquier otro → reject("Usuario no autorizado")
- Manejá ambos casos con .then() y .catch()

**PLANTILLA:**
```javascript
const username = "admin";  // Cambiá esto para probar

const login = new Promise((resolve, reject) => {
    setTimeout(() => {
        // TODO: Verificar el username y resolver o rechazar
    }, 1000);
});

// TODO: Consumir con .then() y .catch()
login
    .then((mensaje) => {
        // TU CÓDIGO AQUÍ
    })
    .catch((error) => {
        // TU CÓDIGO AQUÍ
    });
```

**RESULTADO ESPERADO:**
```
Si username = "admin":
  Output: "✅ Login exitoso"

Si username = "otro":
  Output: "❌ Usuario no autorizado"
```

---

### 💡 HINTS:

**Hint 1:** Usá un `if (username === "admin")` dentro de la promise para decidir si llamar `resolve()` o `reject()`

**Hint 2:** `.then()` se ejecuta cuando llamás `resolve()`, `.catch()` cuando llamás `reject()`

**Hint 3:** Probá cambiar el valor de `username` para ver ambos caminos (éxito y error)

---

## Ejercicio 4: Consumir con .finally()

⏱️ **TIEMPO LÍMITE:** 20 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Mostrar loading spinner con .finally()
// ============================================

// Simulamos mostrar un spinner de carga
console.log('🔄 Cargando...');

const cargarDatos = new Promise((resolve, reject) => {
    setTimeout(() => {
        const exito = Math.random() > 0.3;  // 70% de éxito
        
        if (exito) {
            resolve({ usuario: 'Juan', edad: 25 });
        } else {
            reject('Error de red');
        }
    }, 2000);
});

cargarDatos
    .then((datos) => {
        console.log('✅ Datos cargados:', datos);
    })
    .catch((error) => {
        console.log('❌ Error:', error);
    })
    .finally(() => {
        // Este código se ejecuta SIEMPRE
        // No importa si hubo éxito o error
        console.log('⏹️ Carga finalizada. Ocultando spinner...');
    });

// ============================================
// ¿CÓMO FUNCIONA .finally()?
// ============================================
/*
1. .finally() se ejecuta SIEMPRE al final
   - No importa si la promise fue resuelta (resolve)
   - No importa si fue rechazada (reject)
   
2. NO recibe ningún parámetro
   - No sabe si hubo éxito o error
   - Es solo para "limpieza" (cleanup)
   
3. Casos de uso típicos:
   - Ocultar spinner de carga
   - Cerrar conexiones
   - Limpiar recursos temporales
   - Re-habilitar botones
*/

// ============================================
// EJEMPLO 2: Con y sin .finally()
// ============================================

// ❌ SIN .finally() (duplicación de código)
cargarDatos
    .then((datos) => {
        console.log('Datos:', datos);
        console.log('Ocultando spinner...');  // Duplicado
    })
    .catch((error) => {
        console.log('Error:', error);
        console.log('Ocultando spinner...');  // Duplicado
    });

// ✅ CON .finally() (sin duplicación)
cargarDatos
    .then((datos) => {
        console.log('Datos:', datos);
    })
    .catch((error) => {
        console.log('Error:', error);
    })
    .finally(() => {
        console.log('Ocultando spinner...');  // Una sola vez
    });

// ============================================
// CONCEPTO CLAVE: .finally() NO MODIFICA EL VALOR
// ============================================
const promesa = Promise.resolve(42);

promesa
    .finally(() => {
        console.log('Pasando por finally');
        return 999;  // Este valor se IGNORA
    })
    .then((valor) => {
        console.log('Valor:', valor);  // Output: 42 (no 999)
    });

// .finally() no puede cambiar el valor de la promise
// Es solo para efectos secundarios (side effects)
```

**Analogía:**
```
.finally() es como lavarte las manos después de comer:

Comida → [¿Éxito? ¿Te gustó?] → [¿Error? ¿Te cayó mal?] → Lavarte las manos
                ↓                           ↓                      ↓
           Feliz 😊                    Triste 😞              Siempre te lavás
                ↓                           ↓                      ↓
                └───────────────────────────┴────────────→ .finally()

No importa si la comida te gustó o no → te lavás las manos igual
No importa si la promise fue éxito o error → .finally() se ejecuta igual
```

**Diagrama del flujo:**
```
Promise
   ↓
resolve() o reject()
   ↓            ↓
.then()      .catch()
   ↓            ↓
   └────┬───────┘
        ↓
    .finally()
   (siempre se ejecuta)
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Simulá subir una foto a Instagram:
1. Mostrar "📤 Subiendo foto..."
2. La subida puede fallar (50% de probabilidad)
3. Si funciona → "✅ Foto subida"
4. Si falla → "❌ Error al subir"
5. SIEMPRE al final → "🔓 Liberando recursos..."

**PLANTILLA:**
```javascript
// TODO: Imprimir mensaje de inicio
console.log(/* ... */);

const subirFoto = new Promise((resolve, reject) => {
    setTimeout(() => {
        // TODO: 50% éxito, 50% error
    }, 2000);
});

// TODO: Consumir con .then(), .catch() y .finally()
subirFoto
    .then((mensaje) => {
        // TU CÓDIGO AQUÍ
    })
    .catch((error) => {
        // TU CÓDIGO AQUÍ
    })
    .finally(() => {
        // TU CÓDIGO AQUÍ
    });
```

**RESULTADO ESPERADO:**
```
Inmediatamente:
  "📤 Subiendo foto..."

Después de 2 segundos (si éxito):
  "✅ Foto subida"
  "🔓 Liberando recursos..."

Después de 2 segundos (si error):
  "❌ Error al subir"
  "🔓 Liberando recursos..."
```

---

### 💡 HINTS:

**Hint 1:** Usá `Math.random() > 0.5` para el 50% de probabilidad

**Hint 2:** El mensaje "Liberando recursos" va en `.finally()` porque se ejecuta SIEMPRE

**Hint 3:** `.finally()` NO recibe parámetros, así que no podés usar el valor de resolve/reject dentro

---

## Ejercicio 5: Promise.resolve() y Promise.reject()

⏱️ **TIEMPO LÍMITE:** 20 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Shortcuts para crear promises
// ============================================

// ============================================
// FORMA LARGA (la que ya conocés)
// ============================================
const promesaLarga = new Promise((resolve) => {
    resolve('Hola');
});

// ============================================
// FORMA CORTA con Promise.resolve()
// ============================================
const promesaCorta = Promise.resolve('Hola');

// Ambas son EXACTAMENTE iguales
// Promise.resolve() es solo un atajo

promesaCorta.then((valor) => {
    console.log(valor);  // Output: "Hola"
});

// ============================================
// EJEMPLO: Promise.reject()
// ============================================

// Forma larga
const errorLargo = new Promise((resolve, reject) => {
    reject('Error!');
});

// Forma corta
const errorCorto = Promise.reject('Error!');

errorCorto.catch((error) => {
    console.log(error);  // Output: "Error!"
});

// ============================================
// ¿CUÁNDO USAR CADA UNO?
// ============================================

// ❌ NO uses Promise.resolve() si necesitás delay
// (esto se resuelve INMEDIATAMENTE)
const mal = Promise.resolve('Dato');

// ✅ Usá new Promise() si necesitás setTimeout
const bien = new Promise((resolve) => {
    setTimeout(() => resolve('Dato'), 1000);
});

// ============================================
// USO REAL: Convertir valores a promises
// ============================================

function obtenerUsuario(id) {
    // Si el usuario está en caché → retornar inmediatamente
    if (usuariosCache[id]) {
        return Promise.resolve(usuariosCache[id]);
    }
    
    // Si no está en caché → hacer request (demora)
    return fetch(`/api/usuarios/${id}`)
        .then(response => response.json());
}

// Ahora obtenerUsuario() SIEMPRE retorna una promise
// No importa si viene del caché o del servidor
// El código que lo consume es el mismo:
obtenerUsuario(123).then((usuario) => {
    console.log(usuario);
});

// ============================================
// USO REAL: Validaciones que pueden fallar rápido
// ============================================

function dividir(a, b) {
    // Si b es 0 → rechazar inmediatamente
    if (b === 0) {
        return Promise.reject('No se puede dividir por cero');
    }
    
    // Si es válido → resolver con el resultado
    return Promise.resolve(a / b);
}

dividir(10, 2)
    .then((resultado) => console.log('Resultado:', resultado))  // 5
    .catch((error) => console.log('Error:', error));

dividir(10, 0)
    .then((resultado) => console.log('Resultado:', resultado))
    .catch((error) => console.log('Error:', error));  // "No se puede dividir por cero"

// ============================================
// CONCEPTO CLAVE: CONSISTENCIA EN RETORNOS
// ============================================

// ❌ MAL: A veces retorna promise, a veces retorna valor
function mal_ejemplo(id) {
    if (cache[id]) {
        return cache[id];  // Valor directo
    }
    return fetch(`/api/${id}`);  // Promise
}

// Problema: el código que lo consume no sabe qué esperar
const resultado = mal_ejemplo(123);
resultado.then(...);  // ¿Funciona? Depende...

// ✅ BIEN: SIEMPRE retorna promise
function buen_ejemplo(id) {
    if (cache[id]) {
        return Promise.resolve(cache[id]);  // Promise
    }
    return fetch(`/api/${id}`);  // Promise
}

// Ahora el código que lo consume es consistente
const resultado = buen_ejemplo(123);
resultado.then(...);  // SIEMPRE funciona
```

**Analogía:**
```
Promise.resolve() es como una máquina expendedora instantánea:

Normal: Hacés el pedido → cocinero lo prepara → te lo dan (demora)
        new Promise() con setTimeout

Express: Está ya preparado → te lo dan al instante
         Promise.resolve()

Ambos te dan comida
Pero uno es inmediato, el otro demora

Igual con promises:
- new Promise() cuando hay operación asíncrona (demora)
- Promise.resolve() cuando ya tenés el valor (inmediato)
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `obtenerPrecio(producto)` que:
- Si el producto es "notebook" → retornar inmediatamente 50000 (usando Promise.resolve)
- Si el producto es "celular" → retornar inmediatamente 30000
- Si es otro producto → rechazar con "Producto no encontrado" (usando Promise.reject)
- Probá los 3 casos

**PLANTILLA:**
```javascript
function obtenerPrecio(producto) {
    // TODO: Implementar lógica con Promise.resolve() y Promise.reject()
}

// TODO: Probar con "notebook"
obtenerPrecio("notebook")
    .then((precio) => console.log(`Precio: $${precio}`))
    .catch((error) => console.log(`Error: ${error}`));

// TODO: Probar con "celular"
obtenerPrecio("celular")
    .then((precio) => console.log(`Precio: $${precio}`))
    .catch((error) => console.log(`Error: ${error}`));

// TODO: Probar con "mouse" (producto no encontrado)
obtenerPrecio("mouse")
    .then((precio) => console.log(`Precio: $${precio}`))
    .catch((error) => console.log(`Error: ${error}`));
```

**RESULTADO ESPERADO:**
```
Precio: $50000
Precio: $30000
Error: Producto no encontrado
```

---

### 💡 HINTS:

**Hint 1:** Usá `if...else if...else` para los 3 casos

**Hint 2:** Para los casos válidos usá `return Promise.resolve(precio)`

**Hint 3:** Para el caso inválido usá `return Promise.reject("mensaje")`

**Hint 4:** NO necesitás `new Promise()` ni `setTimeout()` en este ejercicio - todo es inmediato

---

# 📘 BLOQUE 2: CHAINING (Ejercicios 6-8)

**Duración:** 3-4 horas  
**Conceptos:** Encadenar, transformar, aplanar promises

---

## Ejercicio 6: Chaining Simple

⏱️ **TIEMPO LÍMITE:** 25 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Cadena de transformaciones
// ============================================

// Promise que retorna un texto
const obtenerTexto = Promise.resolve("hola mundo");

// Cadena de transformaciones
obtenerTexto
    .then((texto) => {
        console.log('1. Texto original:', texto);
        // Output: "hola mundo"
        return texto.toUpperCase();  // Convertir a mayúsculas
    })
    .then((textoMayus) => {
        console.log('2. En mayúsculas:', textoMayus);
        // Output: "HOLA MUNDO"
        return textoMayus.split(' ');  // Dividir en array
    })
    .then((palabras) => {
        console.log('3. Array de palabras:', palabras);
        // Output: ["HOLA", "MUNDO"]
        return palabras.length;  // Contar palabras
    })
    .then((cantidad) => {
        console.log('4. Cantidad de palabras:', cantidad);
        // Output: 2
    });

// ============================================
// ¿CÓMO FUNCIONA EL CHAINING?
// ============================================
/*
1. Cada .then() recibe el valor del .then() anterior
2. Lo que retornás en un .then() pasa al siguiente
3. Si NO retornás nada → el siguiente recibe undefined
4. La cadena se ejecuta EN ORDEN (uno después del otro)
*/

// ============================================
// CONCEPTO CLAVE: CADA .then() RETORNA UNA NUEVA PROMISE
// ============================================

const p1 = Promise.resolve(10);
const p2 = p1.then((n) => n * 2);      // Nueva promise
const p3 = p2.then((n) => n + 5);      // Otra promise
const p4 = p3.then((n) => n / 5);      // Otra promise

p4.then((resultado) => {
    console.log(resultado);  // Output: 5
});

// Esto es lo mismo que:
Promise.resolve(10)
    .then((n) => n * 2)   // 20
    .then((n) => n + 5)   // 25
    .then((n) => n / 5)   // 5
    .then((resultado) => console.log(resultado));

// ============================================
// EJEMPLO: Pipeline de procesamiento de datos
// ============================================

// Simulamos obtener datos de un usuario
const obtenerDatosUsuario = Promise.resolve({
    nombre: "Juan",
    apellido: "Pérez",
    edad: 25,
    email: "juan@email.com"
});

obtenerDatosUsuario
    .then((usuario) => {
        // Paso 1: Extraer nombre completo
        console.log('Usuario recibido:', usuario);
        return `${usuario.nombre} ${usuario.apellido}`;
    })
    .then((nombreCompleto) => {
        // Paso 2: Convertir a mayúsculas
        console.log('Nombre completo:', nombreCompleto);
        return nombreCompleto.toUpperCase();
    })
    .then((nombreMayus) => {
        // Paso 3: Crear mensaje de bienvenida
        console.log('En mayúsculas:', nombreMayus);
        return `Bienvenido, ${nombreMayus}!`;
    })
    .then((mensaje) => {
        // Paso 4: Mostrar mensaje final
        console.log('Mensaje final:', mensaje);
    });

// Output secuencial:
// Usuario recibido: { nombre: "Juan", apellido: "Pérez", edad: 25, email: "juan@email.com" }
// Nombre completo: Juan Pérez
// En mayúsculas: JUAN PÉREZ
// Mensaje final: Bienvenido, JUAN PÉREZ!

// ============================================
// ERROR COMÚN: Olvidar el return
// ============================================

// ❌ MAL (sin return)
Promise.resolve(10)
    .then((n) => {
        const resultado = n * 2;
        // Falta el return!
    })
    .then((valor) => {
        console.log(valor);  // Output: undefined
    });

// ✅ BIEN (con return)
Promise.resolve(10)
    .then((n) => {
        const resultado = n * 2;
        return resultado;  // Importante!
    })
    .then((valor) => {
        console.log(valor);  // Output: 20
    });
```

**Analogía:**
```
Promise chaining es como una línea de ensamblaje:

Materia prima → [Estación 1] → [Estación 2] → [Estación 3] → Producto final
    10        →    (x 2)     →    (+ 5)     →    (/ 5)     →      5

Cada estación:
1. Recibe el producto de la estación anterior
2. Lo procesa/transforma
3. Lo pasa a la siguiente estación

Si una estación NO pasa nada → la siguiente recibe "nada" (undefined)
```

**Diagrama del flujo:**
```
Promise.resolve(valor)
        ↓
    .then((v1) => {
        return transformacion1(v1);
    })
        ↓
    .then((v2) => {
        return transformacion2(v2);
    })
        ↓
    .then((v3) => {
        return transformacion3(v3);
    })
        ↓
    .then((resultado_final) => {
        // Aquí tenés el resultado
    })
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Tenés un objeto con datos de un producto. Creá un chain que:
1. Extraiga el precio
2. Aplique un 10% de descuento
3. Agregue 21% de IVA
4. Redondee el resultado a 2 decimales
5. Imprima: "Precio final: $X"

**PLANTILLA:**
```javascript
const producto = {
    nombre: "Notebook",
    precio: 1000,
    categoria: "Electrónica"
};

Promise.resolve(producto)
    .then((prod) => {
        // TODO: Extraer precio
    })
    .then((precio) => {
        // TODO: Aplicar 10% descuento
    })
    .then((precioConDesc) => {
        // TODO: Agregar 21% IVA
    })
    .then((precioConIVA) => {
        // TODO: Redondear a 2 decimales
    })
    .then((precioFinal) => {
        // TODO: Imprimir resultado
    });
```

**RESULTADO ESPERADO:**
```
Precio final: $1089.00
```

*Cálculo: 1000 - 10% = 900, 900 + 21% = 1089*

---

### 💡 HINTS:

**Hint 1:** Descuento 10% = `precio * 0.9`

**Hint 2:** IVA 21% = `precio * 1.21`

**Hint 3:** Redondear a 2 decimales = `Math.round(precio * 100) / 100` o `precio.toFixed(2)`

**Hint 4:** Acordate de usar `return` en CADA `.then()` para pasar el valor al siguiente

---

## Ejercicio 7: Chaining con Transformación

⏱️ **TIEMPO LÍMITE:** 30 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Transformar datos de API
// ============================================

// Simulamos datos que vienen de una API
const datosDeAPI = Promise.resolve({
    users: [
        { id: 1, name: "Ana", age: 28, active: true },
        { id: 2, name: "Luis", age: 35, active: false },
        { id: 3, name: "María", age: 22, active: true },
        { id: 4, name: "Carlos", age: 40, active: true }
    ]
});

// Pipeline de transformación
datosDeAPI
    .then((data) => {
        // Paso 1: Filtrar solo usuarios activos
        console.log('Datos originales:', data.users.length, 'usuarios');
        return data.users.filter(user => user.active);
    })
    .then((usuariosActivos) => {
        // Paso 2: Extraer solo los nombres
        console.log('Usuarios activos:', usuariosActivos.length);
        return usuariosActivos.map(user => user.name);
    })
    .then((nombres) => {
        // Paso 3: Convertir a mayúsculas
        console.log('Nombres:', nombres);
        return nombres.map(nombre => nombre.toUpperCase());
    })
    .then((nombresEnMayus) => {
        // Paso 4: Crear mensaje
        console.log('En mayúsculas:', nombresEnMayus);
        return `Usuarios activos: ${nombresEnMayus.join(', ')}`;
    })
    .then((mensaje) => {
        // Paso 5: Mostrar resultado final
        console.log('Mensaje final:', mensaje);
    });

// Output:
// Datos originales: 4 usuarios
// Usuarios activos: 3
// Nombres: ["Ana", "María", "Carlos"]
// En mayúsculas: ["ANA", "MARÍA", "CARLOS"]
// Mensaje final: Usuarios activos: ANA, MARÍA, CARLOS

// ============================================
// CONCEPTO: ARRAY METHODS EN PROMISES
// ============================================

// Recordá que podés usar todos los métodos de arrays:
// - .filter() → Filtrar elementos
// - .map() → Transformar elementos
// - .reduce() → Reducir a un solo valor
// - .find() → Buscar un elemento
// - .some() → Ver si alguno cumple condición
// - .every() → Ver si todos cumplen condición

Promise.resolve([1, 2, 3, 4, 5])
    .then((numeros) => numeros.filter(n => n > 2))     // [3, 4, 5]
    .then((filtrados) => filtrados.map(n => n * 2))    // [6, 8, 10]
    .then((duplicados) => duplicados.reduce((a, b) => a + b))  // 24
    .then((suma) => console.log('Suma:', suma));

// ============================================
// EJEMPLO: Procesamiento complejo
// ============================================

const pedidos = Promise.resolve([
    { id: 1, cliente: "Ana", monto: 100, pagado: true },
    { id: 2, cliente: "Luis", monto: 250, pagado: false },
    { id: 3, cliente: "María", monto: 180, pagado: true },
    { id: 4, cliente: "Carlos", monto: 320, pagado: true }
]);

pedidos
    .then((listaPedidos) => {
        // Paso 1: Filtrar solo pedidos pagados
        return listaPedidos.filter(pedido => pedido.pagado);
    })
    .then((pedidosPagados) => {
        // Paso 2: Extraer solo los montos
        return pedidosPagados.map(pedido => pedido.monto);
    })
    .then((montos) => {
        // Paso 3: Calcular total
        return montos.reduce((total, monto) => total + monto, 0);
    })
    .then((totalPagado) => {
        // Paso 4: Formatear resultado
        console.log(`Total recaudado: $${totalPagado}`);
        // Output: Total recaudado: $600
    });

// ============================================
// PATRON: Validación + Transformación + Cálculo
// ============================================

Promise.resolve({ ventas: [10, 20, 30, 40, 50] })
    .then((data) => {
        // Validar que ventas sea un array
        if (!Array.isArray(data.ventas)) {
            throw new Error('ventas debe ser un array');
        }
        return data.ventas;
    })
    .then((ventas) => {
        // Transformar: aplicar impuesto 21%
        return ventas.map(venta => venta * 1.21);
    })
    .then((ventasConImpuesto) => {
        // Calcular: sumar todo
        return ventasConImpuesto.reduce((sum, v) => sum + v, 0);
    })
    .then((total) => {
        console.log('Total con impuestos:', total.toFixed(2));
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
```

**Analogía:**
```
Transformar datos con promises es como cocinar:

Ingredientes crudos → [Lavar] → [Cortar] → [Cocinar] → [Emplatado] → Plato final
   (array crudo)      filter     map       reduce      formato      resultado

Cada paso:
1. Recibe lo que viene del paso anterior
2. Lo transforma de alguna manera
3. Lo pasa al siguiente paso

No podés saltear pasos ni cambiar el orden
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Tenés un array de estudiantes con sus notas. Creá un chain que:
1. Filtre solo estudiantes con nota >= 7 (aprobados)
2. Extraiga solo los nombres de esos estudiantes
3. Ordene los nombres alfabéticamente
4. Cree un string: "Aprobados: nombre1, nombre2, nombre3"
5. Imprima el resultado

**PLANTILLA:**
```javascript
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
    })
    .then((aprobados) => {
        // TODO: Extraer solo nombres
    })
    .then((nombres) => {
        // TODO: Ordenar alfabéticamente
    })
    .then((nombresOrdenados) => {
        // TODO: Crear string con formato
    })
    .then((mensaje) => {
        // TODO: Imprimir
    });
```

**RESULTADO ESPERADO:**
```
Aprobados: Carlos, Lucía, Sofía
```

---

### 💡 HINTS:

**Hint 1:** Para filtrar usá `.filter(est => est.nota >= 7)`

**Hint 2:** Para extraer nombres usá `.map(est => est.nombre)`

**Hint 3:** Para ordenar usá `.sort()` (ordena alfabéticamente por defecto)

**Hint 4:** Para crear el string usá `.join(', ')` y template strings

---

## Ejercicio 8: Chaining con Promises Anidadas

⏱️ **TIEMPO LÍMITE:** 35 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Promises dentro de promises
// ============================================

// Simulamos 3 operaciones asíncronas secuenciales
function obtenerUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, nombre: "Ana" });
        }, 1000);
    });
}

function obtenerPedidos(usuarioId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 101, producto: "Notebook", precio: 1000 },
                { id: 102, producto: "Mouse", precio: 50 }
            ]);
        }, 1000);
    });
}

function calcularTotal(pedidos) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const total = pedidos.reduce((sum, p) => sum + p.precio, 0);
            resolve(total);
        }, 1000);
    });
}

// ============================================
// ❌ MAL: Promise Hell (Pyramid of Doom)
// ============================================
obtenerUsuario().then((usuario) => {
    console.log('Usuario:', usuario.nombre);
    obtenerPedidos(usuario.id).then((pedidos) => {
        console.log('Pedidos:', pedidos.length);
        calcularTotal(pedidos).then((total) => {
            console.log('Total:', total);
        });
    });
});

// Problema: Se parece al Callback Hell
// Difícil de leer, difícil de debuggear

// ============================================
// ✅ BIEN: Aplanar promises (Flat chaining)
// ============================================
obtenerUsuario()
    .then((usuario) => {
        console.log('Usuario:', usuario.nombre);
        // Retornamos una NUEVA promise
        return obtenerPedidos(usuario.id);
    })
    .then((pedidos) => {
        console.log('Pedidos:', pedidos.length);
        // Retornamos otra promise
        return calcularTotal(pedidos);
    })
    .then((total) => {
        console.log('Total:', total);
    });

// Mucho más limpio y fácil de leer

// ============================================
// CONCEPTO CLAVE: RETORNAR PROMISES
// ============================================

// Cuando retornás una promise en un .then():
// → El siguiente .then() espera a que esa promise se resuelva
// → Recibe el valor resuelto (no la promise)

Promise.resolve(1)
    .then((n) => {
        console.log('Paso 1:', n);  // 1
        // Retornamos una promise que se resuelve con 2
        return Promise.resolve(2);
    })
    .then((n) => {
        // Recibimos directamente el 2 (no la promise)
        console.log('Paso 2:', n);  // 2
        return Promise.resolve(3);
    })
    .then((n) => {
        console.log('Paso 3:', n);  // 3
    });

// ============================================
// EJEMPLO: Flujo completo con datos reales
// ============================================

// Simulamos llamadas a una API
function buscarUsuarioPorEmail(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 123, email: email, nombre: "Juan" });
        }, 500);
    });
}

function obtenerPerfilCompleto(usuarioId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: usuarioId,
                bio: "Desarrollador",
                seguidores: 150,
                siguiendo: 200
            });
        }, 500);
    });
}

function obtenerPostsRecientes(usuarioId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, titulo: "Mi primer post" },
                { id: 2, titulo: "Aprendiendo promises" }
            ]);
        }, 500);
    });
}

// Flujo completo
const email = "juan@email.com";

buscarUsuarioPorEmail(email)
    .then((usuario) => {
        console.log('1. Usuario encontrado:', usuario.nombre);
        return obtenerPerfilCompleto(usuario.id);
    })
    .then((perfil) => {
        console.log('2. Perfil:', perfil.bio);
        console.log('   Seguidores:', perfil.seguidores);
        return obtenerPostsRecientes(perfil.id);
    })
    .then((posts) => {
        console.log('3. Posts recientes:', posts.length);
        posts.forEach(post => {
            console.log('   -', post.titulo);
        });
    })
    .catch((error) => {
        console.error('Error en algún paso:', error);
    });

// Output (después de 1.5 segundos total):
// 1. Usuario encontrado: Juan
// 2. Perfil: Desarrollador
//    Seguidores: 150
// 3. Posts recientes: 2
//    - Mi primer post
//    - Aprendiendo promises

// ============================================
// PATRÓN: Pasar datos entre múltiples .then()
// ============================================

// Problema: Necesitamos datos de múltiples pasos

// ❌ Solución fea (promise hell)
obtenerUsuario().then((usuario) => {
    obtenerPedidos(usuario.id).then((pedidos) => {
        // Aquí tengo usuario Y pedidos
        console.log(usuario.nombre, 'tiene', pedidos.length, 'pedidos');
    });
});

// ✅ Solución 1: Retornar un objeto con ambos
obtenerUsuario()
    .then((usuario) => {
        return obtenerPedidos(usuario.id)
            .then((pedidos) => {
                // Retornamos un objeto con ambos
                return { usuario, pedidos };
            });
    })
    .then(({ usuario, pedidos }) => {
        console.log(usuario.nombre, 'tiene', pedidos.length, 'pedidos');
    });

// ✅ Solución 2: Usar una variable externa (si es necesario)
let usuarioData;

obtenerUsuario()
    .then((usuario) => {
        usuarioData = usuario;  // Guardamos para después
        return obtenerPedidos(usuario.id);
    })
    .then((pedidos) => {
        // Ahora tenemos acceso a usuarioData
        console.log(usuarioData.nombre, 'tiene', pedidos.length, 'pedidos');
    });
```

**Analogía:**
```
Promises anidadas vs aplanadas es como seguir instrucciones:

❌ ANIDADO (Confuso):
"Andá al supermercado. Cuando llegues:
  Comprá pan. Cuando lo compres:
    Pagá. Cuando pagues:
      Volvé a casa."

✅ APLANADO (Claro):
1. Andá al supermercado
2. Comprá pan
3. Pagá
4. Volvé a casa

Cada paso retorna la promise del siguiente paso
→ El flujo se mantiene "plano" y fácil de leer
```

**Diagrama:**
```
❌ Promise Hell:
obtenerA().then((a) => {
    obtenerB().then((b) => {
        obtenerC().then((c) => {
            // código anidado
        });
    });
});

✅ Flat Chaining:
obtenerA()
    .then((a) => obtenerB())
    .then((b) => obtenerC())
    .then((c) => { /* código */ });
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Simulá este flujo:
1. Buscar una receta por nombre (toma 1 segundo) → retorna { id: 1, nombre: "Pizza" }
2. Obtener ingredientes de esa receta (toma 1 segundo) → retorna ["harina", "tomate", "queso"]
3. Calcular costo total (toma 1 segundo) → suma: $500
4. Imprimir: "La receta {nombre} con {cantidad} ingredientes cuesta ${costo}"

**PLANTILLA:**
```javascript
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
    })
    .then((/* ... */) => {
        // TU CÓDIGO AQUÍ
    })
    .then((/* ... */) => {
        // TU CÓDIGO AQUÍ
    });
```

**RESULTADO ESPERADO:**
```
(Después de 3 segundos)
La receta Pizza con 3 ingredientes cuesta $300
```

---

### 💡 HINTS:

**Hint 1:** Para pasar datos entre .then(), guardá `receta` en una variable externa al inicio

**Hint 2:** En el primer .then() retorná `obtenerIngredientes(receta.id)`

**Hint 3:** En el segundo .then() guardá los ingredientes en otra variable y retorná `calcularCosto(ingredientes)`

**Hint 4:** En el último .then() tenés acceso a `receta` (variable externa), `ingredientes` (variable externa) y `costo` (parámetro)

---

# 📘 BLOQUE 3: ERROR HANDLING (Ejercicios 9-12)

**Duración:** 4-5 horas  
**Conceptos:** Propagación de errores, múltiples catches, debugging

---

## Ejercicio 9: Error Propagation

⏱️ **TIEMPO LÍMITE:** 30 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Cómo se propagan los errores
// ============================================

// ============================================
// CASO 1: Error en la promise inicial
// ============================================
const promesaConError = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Error en la promise inicial');
    }, 1000);
});

promesaConError
    .then((valor) => {
        console.log('Este .then() NO se ejecuta');
        return valor * 2;
    })
    .then((valor) => {
        console.log('Este tampoco');
        return valor + 10;
    })
    .then((valor) => {
        console.log('Este tampoco');
        return valor / 2;
    })
    .catch((error) => {
        console.log('El error llegó acá:', error);
        // Output: "El error llegó acá: Error en la promise inicial"
    });

// El error "salta" todos los .then() y va directo al .catch()

// ============================================
// CASO 2: Error en un .then() intermedio
// ============================================
Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);  // Se ejecuta: 10
        return n * 2;
    })
    .then((n) => {
        console.log('Paso 2:', n);  // Se ejecuta: 20
        throw new Error('Error en paso 2');  // Lanzamos error
    })
    .then((n) => {
        console.log('Paso 3:', n);  // NO se ejecuta
        return n + 10;
    })
    .then((n) => {
        console.log('Paso 4:', n);  // NO se ejecuta
        return n / 2;
    })
    .catch((error) => {
        console.log('Error capturado:', error.message);
        // Output: "Error capturado: Error en paso 2"
    });

// Los .then() DESPUÉS del error no se ejecutan
// El error va directo al .catch()

// ============================================
// CASO 3: Recuperarse de un error
// ============================================
Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);  // 10
        throw new Error('Error!');
    })
    .catch((error) => {
        console.log('Error capturado:', error.message);
        return 999;  // Recuperarse retornando un valor
    })
    .then((n) => {
        console.log('Paso 2 (después del catch):', n);  // 999
        return n * 2;
    })
    .then((n) => {
        console.log('Paso 3:', n);  // 1998
    });

// Después del .catch(), la cadena continúa normalmente
// Es como "atrapar" el error y seguir adelante

// ============================================
// CASO 4: Múltiples catches
// ============================================
Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);
        throw new Error('Error en paso 1');
    })
    .catch((error) => {
        console.log('Catch 1:', error.message);
        return 20;  // Recuperamos
    })
    .then((n) => {
        console.log('Paso 2:', n);  // 20
        throw new Error('Error en paso 2');
    })
    .catch((error) => {
        console.log('Catch 2:', error.message);
        return 30;  // Recuperamos otra vez
    })
    .then((n) => {
        console.log('Paso 3:', n);  // 30
    });

// Output:
// Paso 1: 10
// Catch 1: Error en paso 1
// Paso 2: 20
// Catch 2: Error en paso 2
// Paso 3: 30

// ============================================
// CONCEPTO: finally SIEMPRE SE EJECUTA
// ============================================

// Con éxito
Promise.resolve(10)
    .then((n) => {
        console.log('Éxito:', n);
    })
    .catch((error) => {
        console.log('Error:', error);  // NO se ejecuta
    })
    .finally(() => {
        console.log('Finally SIEMPRE se ejecuta');  // Se ejecuta
    });

// Con error
Promise.reject('Error!')
    .then((n) => {
        console.log('Éxito:', n);  // NO se ejecuta
    })
    .catch((error) => {
        console.log('Error:', error);  // Se ejecuta
    })
    .finally(() => {
        console.log('Finally SIEMPRE se ejecuta');  // Se ejecuta
    });

// ============================================
// PATRON: Validación + Procesamiento + Error handling
// ============================================
function procesarDatos(datos) {
    return Promise.resolve(datos)
        .then((d) => {
            // Validación
            if (!d || !Array.isArray(d)) {
                throw new Error('Datos inválidos');
            }
            console.log('✅ Datos válidos');
            return d;
        })
        .then((d) => {
            // Procesamiento
            console.log('Procesando...');
            return d.map(x => x * 2);
        })
        .then((resultado) => {
            console.log('✅ Resultado:', resultado);
            return resultado;
        })
        .catch((error) => {
            console.log('❌ Error:', error.message);
            return [];  // Valor por defecto en caso de error
        })
        .finally(() => {
            console.log('Proceso finalizado');
        });
}

// Prueba con datos válidos
procesarDatos([1, 2, 3]);
// Output:
// ✅ Datos válidos
// Procesando...
// ✅ Resultado: [2, 4, 6]
// Proceso finalizado

// Prueba con datos inválidos
procesarDatos(null);
// Output:
// ❌ Error: Datos inválidos
// Proceso finalizado
```

**Analogía:**
```
Error propagation es como caer de una escalera:

Piso 5 → [.then()] Todo bien
   ↓
Piso 4 → [.then()] Todo bien
   ↓
Piso 3 → [.then()] ¡RESBALO! (throw error)
   ↓
Piso 2 → [.then()] Me salto (no se ejecuta)
   ↓
Piso 1 → [.then()] Me salto (no se ejecuta)
   ↓
Planta baja → [.catch()] Me atrapo aquí

Si después del .catch() hay más pisos:
→ Puedo levantarme (return valor) y seguir subiendo
```

**Diagrama:**
```
Promise
   ↓
.then()  (✅ se ejecuta)
   ↓
.then()  (✅ se ejecuta)
   ↓
.then()  (❌ ERROR - throw)
   ↓
.then()  (❌ se saltea)
   ↓
.then()  (❌ se saltea)
   ↓
.catch() (✅ atrapa el error)
   ↓
.then()  (✅ continúa si catch retorna valor)
   ↓
.finally() (✅ SIEMPRE se ejecuta)
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Simulá un proceso de compra con validaciones:
1. Verificar stock (si no hay stock → throw error)
2. Aplicar descuento
3. Procesar pago (puede fallar 30% de las veces)
4. Si todo sale bien → "Compra exitosa"
5. Si algo falla → "Compra cancelada: [razón]"
6. SIEMPRE al final → "Proceso finalizado"

**PLANTILLA:**
```javascript
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
    .then((/* ... */) => {
        // TU CÓDIGO AQUÍ
    })
    .then((/* ... */) => {
        // TU CÓDIGO AQUÍ
    })
    .then((/* ... */) => {
        // TU CÓDIGO AQUÍ
    })
    .catch((/* ... */) => {
        // TU CÓDIGO AQUÍ
    })
    .finally(() => {
        // TU CÓDIGO AQUÍ
    });
```

**RESULTADO ESPERADO:**
```
(Si todo sale bien)
✅ Compra exitosa
Proceso finalizado

(Si falla verificarStock)
❌ Compra cancelada: Sin stock disponible
Proceso finalizado

(Si falla procesarPago)
❌ Compra cancelada: Error en el procesamiento del pago
Proceso finalizado
```

---

### 💡 HINTS:

**Hint 1:** En cada `.then()` retorná la promise de la siguiente función

**Hint 2:** El `.catch()` atrapa errores de CUALQUIER paso anterior

**Hint 3:** En el `.catch()` imprimí el mensaje con el error recibido

**Hint 4:** `.finally()` se ejecuta SIEMPRE, sin importar si hubo error o no

**Hint 5:** Para probar el caso sin stock, cambiá `stock: 5` a `stock: 0`

---

## Ejercicio 10: Return vs No Return en .then()

⏱️ **TIEMPO LÍMITE:** 25 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: La importancia del return
// ============================================

// ============================================
// CASO 1: CON return
// ============================================
console.log('=== CON RETURN ===');

Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);  // 10
        return n * 2;  // ✅ RETURN
    })
    .then((n) => {
        console.log('Paso 2:', n);  // 20
        return n + 5;  // ✅ RETURN
    })
    .then((n) => {
        console.log('Paso 3:', n);  // 25
    });

// Output:
// Paso 1: 10
// Paso 2: 20
// Paso 3: 25

// ============================================
// CASO 2: SIN return
// ============================================
console.log('=== SIN RETURN ===');

Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);  // 10
        n * 2;  // ❌ NO HAY RETURN
    })
    .then((n) => {
        console.log('Paso 2:', n);  // undefined
        n + 5;  // ❌ NO HAY RETURN
    })
    .then((n) => {
        console.log('Paso 3:', n);  // undefined
    });

// Output:
// Paso 1: 10
// Paso 2: undefined
// Paso 3: undefined

// ============================================
// CASO 3: return implícito con arrow functions
// ============================================

// Sin llaves → return implícito
Promise.resolve(10)
    .then(n => n * 2)  // ✅ Equivalente a: .then(n => { return n * 2; })
    .then(n => n + 5)  // ✅ Equivalente a: .then(n => { return n + 5; })
    .then(n => console.log('Resultado:', n));  // 25

// Con llaves → necesitas return explícito
Promise.resolve(10)
    .then(n => {
        const resultado = n * 2;
        return resultado;  // ✅ Necesario porque usamos llaves
    })
    .then(n => {
        const resultado = n + 5;
        return resultado;  // ✅ Necesario
    })
    .then(n => console.log('Resultado:', n));  // 25

// ============================================
// CASO 4: return en medio de operaciones
// ============================================

// ❌ ERROR COMÚN: Hacer cosas pero no retornar
Promise.resolve([1, 2, 3])
    .then(arr => {
        const duplicados = arr.map(n => n * 2);
        console.log('Duplicados:', duplicados);  // [2, 4, 6]
        // ❌ Falta el return!
    })
    .then(arr => {
        console.log('Siguiente paso:', arr);  // undefined
    });

// ✅ CORRECTO: Retornar el resultado
Promise.resolve([1, 2, 3])
    .then(arr => {
        const duplicados = arr.map(n => n * 2);
        console.log('Duplicados:', duplicados);  // [2, 4, 6]
        return duplicados;  // ✅ Retornamos
    })
    .then(arr => {
        console.log('Siguiente paso:', arr);  // [2, 4, 6]
    });

// ============================================
// CASO 5: return de una promise
// ============================================

function obtenerDato() {
    return new Promise(resolve => {
        setTimeout(() => resolve(42), 1000);
    });
}

// ❌ NO retornar la promise
Promise.resolve()
    .then(() => {
        obtenerDato();  // ❌ No hay return
    })
    .then((valor) => {
        console.log('Valor:', valor);  // undefined (no esperó)
    });

// ✅ Retornar la promise
Promise.resolve()
    .then(() => {
        return obtenerDato();  // ✅ Return
    })
    .then((valor) => {
        console.log('Valor:', valor);  // 42 (después de 1 seg)
    });

// ============================================
// CASO 6: No necesitás return si no hay más .then()
// ============================================

Promise.resolve(10)
    .then((n) => {
        console.log('Último paso:', n);
        // ⚠️ No necesito return porque no hay más .then()
        // Pero tampoco hace daño ponerlo
    });

// Esto es equivalente a:
Promise.resolve(10)
    .then((n) => {
        console.log('Último paso:', n);
        return n;  // ⚠️ No hace nada, pero no rompe nada
    });
```

**Analogía:**
```
Return en .then() es como pasarle la posta en una carrera de relevos:

Con return:
Corredor 1 → [pasa posta] → Corredor 2 → [pasa posta] → Corredor 3
   (10)    →    [return]   →    (20)    →   [return]   →   (25)

Sin return:
Corredor 1 → [no pasa nada] → Corredor 2 tiene las manos vacías
   (10)    →   [no return]   →    (undefined)

Si no pasás la posta (return), el siguiente corredor no tiene nada
```

**Regla simple:**
```
¿El siguiente .then() necesita el valor?
  → SÍ: Usar return
  → NO: No hace falta return (pero no hace daño ponerlo)
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Analizá y arreglá este código que tiene problemas con returns:

```javascript
// ❌ CÓDIGO CON ERRORES
Promise.resolve(100)
    .then((n) => {
        console.log('Inicial:', n);
        const mitad = n / 2;  // No hay return
    })
    .then((n) => {
        console.log('Mitad:', n);  // ¿Qué imprime?
        n * 3;  // No hay return
    })
    .then((n) => {
        console.log('Triple:', n);  // ¿Qué imprime?
        return n + 10;
    })
    .then((n) => {
        console.log('Final:', n);  // ¿Qué imprime?
    });
```

**TAREAS:**
1. Predecí qué va a imprimir cada console.log() ANTES de ejecutar
2. Ejecutá el código y confirmá tu predicción
3. Arreglá el código agregando los returns necesarios
4. Volvé a ejecutar y verificá que ahora funcione correctamente

**RESULTADO ESPERADO (después de arreglar):**
```
Inicial: 100
Mitad: 50
Triple: 150
Final: 160
```

---

### 💡 HINTS:

**Hint 1:** Cuando no hay `return`, el siguiente `.then()` recibe `undefined`

**Hint 2:** `undefined * 3 = NaN` (Not a Number)

**Hint 3:** `NaN + 10 = NaN`

**Hint 4:** En los 3 primeros `.then()` falta el `return` de los valores calculados

---

## Ejercicio 11: Multiple .catch()

⏱️ **TIEMPO LÍMITE:** 30 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Comportamiento de múltiples .catch()
// ============================================

// ============================================
// CASO 1: Un solo .catch() al final
// ============================================
Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);
        return n * 2;
    })
    .then((n) => {
        console.log('Paso 2:', n);
        throw new Error('Error en paso 2');
    })
    .then((n) => {
        console.log('Paso 3:', n);  // NO se ejecuta
        return n + 10;
    })
    .catch((error) => {
        console.log('Catch único:', error.message);
    });

// Output:
// Paso 1: 10
// Paso 2: 20
// Catch único: Error en paso 2

// ============================================
// CASO 2: Múltiples .catch() en la cadena
// ============================================
Promise.resolve(10)
    .then((n) => {
        console.log('Paso 1:', n);  // 10
        throw new Error('Error en paso 1');
    })
    .catch((error) => {
        console.log('Catch 1:', error.message);
        return 20;  // Recuperar con un nuevo valor
    })
    .then((n) => {
        console.log('Paso 2:', n);  // 20
        throw new Error('Error en paso 2');
    })
    .catch((error) => {
        console.log('Catch 2:', error.message);
        return 30;  // Recuperar otra vez
    })
    .then((n) => {
        console.log('Paso 3:', n);  // 30
    });

// Output:
// Paso 1: 10
// Catch 1: Error en paso 1
// Paso 2: 20
// Catch 2: Error en paso 2
// Paso 3: 30

// ============================================
// CASO 3: ¿Qué pasa si .catch() NO retorna valor?
// ============================================
Promise.resolve(10)
    .then((n) => {
        throw new Error('Error!');
    })
    .catch((error) => {
        console.log('Catch:', error.message);
        // No hay return
    })
    .then((n) => {
        console.log('Después del catch:', n);  // undefined
    });

// ============================================
// CASO 4: Error dentro de un .catch()
// ============================================
Promise.reject('Error inicial')
    .catch((error) => {
        console.log('Catch 1:', error);
        throw new Error('Error en el catch!');  // Lanzamos OTRO error
    })
    .then((n) => {
        console.log('Este .then() NO se ejecuta');
    })
    .catch((error) => {
        console.log('Catch 2:', error.message);  // Atrapa el error del catch
    });

// Output:
// Catch 1: Error inicial
// Catch 2: Error en el catch!

// ============================================
// CASO 5: .catch() intermedio vs .catch() final
// ============================================

// Con .catch() intermedio (recuperación)
console.log('=== Con catch intermedio ===');
Promise.reject('Error!')
    .catch((error) => {
        console.log('Catch intermedio:', error);
        return 100;  // Recuperamos
    })
    .then((n) => {
        console.log('Continúa:', n);  // 100
        return n * 2;
    })
    .then((n) => {
        console.log('Final:', n);  // 200
    });

// Output:
// Catch intermedio: Error!
// Continúa: 100
// Final: 200

// Con .catch() solo al final (no recuperación)
console.log('=== Con catch al final ===');
Promise.reject('Error!')
    .then((n) => {
        console.log('No se ejecuta');
        return n * 2;
    })
    .then((n) => {
        console.log('Tampoco');
        return n + 10;
    })
    .catch((error) => {
        console.log('Catch final:', error);
    });

// Output:
// Catch final: Error!

// ============================================
// PATRON: Error handling por sección
// ============================================

function flujoComplejo() {
    return Promise.resolve()
        // Sección 1: Validación
        .then(() => {
            console.log('Validando...');
            throw new Error('Validación falló');
        })
        .catch((error) => {
            console.log('Error en validación:', error.message);
            console.log('Usando datos por defecto');
            return { datos: 'default' };  // Recuperar
        })
        // Sección 2: Procesamiento
        .then((datos) => {
            console.log('Procesando:', datos);
            // Simulamos otro error
            throw new Error('Error de procesamiento');
        })
        .catch((error) => {
            console.log('Error en procesamiento:', error.message);
            console.log('Saltando este paso');
            return null;  // Recuperar con null
        })
        // Sección 3: Finalización
        .then((resultado) => {
            console.log('Finalizando con:', resultado);
            return 'COMPLETADO';
        })
        .catch((error) => {
            // Catch final por si hay errores no manejados
            console.log('Error no manejado:', error.message);
        });
}

flujoComplejo();

// Output:
// Validando...
// Error en validación: Validación falló
// Usando datos por defecto
// Procesando: { datos: 'default' }
// Error en procesamiento: Error de procesamiento
// Saltando este paso
// Finalizando con: null

// ============================================
// REGLA PRÁCTICA
// ============================================
/*
1. UN .catch() al final:
   → Para manejar CUALQUIER error de la cadena
   → No recupera, solo reporta

2. MÚLTIPLES .catch():
   → Para recuperarse de errores específicos
   → Cada .catch() puede retornar un valor para continuar
   → Útil para flujos que deben seguir aunque falle algo

3. .catch() INTERMEDIO + .catch() FINAL:
   → catch intermedio: recuperación de errores esperados
   → catch final: safety net para errores inesperados
*/
```

**Analogía:**
```
Múltiples .catch() es como tener varias redes de seguridad:

Trapecio 1
    ↓
Trapecio 2 (caída) → [Red 1] → Me levanto y sigo
    ↓
Trapecio 3
    ↓
Trapecio 4 (caída) → [Red 2] → Me levanto y sigo
    ↓
Trapecio 5
    ↓
Llegué al final

Cada red (catch):
- Atrapa la caída (error)
- Te permite levantarte (return valor)
- Continuar con el show (siguiente .then())
```

---

### 🎯 TU TURNO:

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

**PLANTILLA:**
```javascript
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
validarCredenciales()
    .catch((error) => {
        // TODO: Manejar error y retornar usuario guest
    })
    .then((usuario) => {
        // TODO: Obtener datos del usuario
    })
    .catch((error) => {
        // TODO: Manejar error y retornar datos vacíos
    })
    .then((datos) => {
        // TODO: Cargar preferencias
    })
    .catch((error) => {
        // TODO: Manejar error y retornar preferencias default
    })
    .then((todosLosDatos) => {
        // TODO: Imprimir resultado final
    });
```

**RESULTADO ESPERADO (varía por el random):**
```
Ejemplo 1 (todo OK):
Login completo: {username: "juan123", email: "juan@email.com", tema: "oscuro", idioma: "es"}

Ejemplo 2 (falló paso 1):
❌ Credenciales inválidas - Usando guest
Login completo: {username: "guest", email: "guest@app.com", tema: "claro", idioma: "es"}

Ejemplo 3 (falló paso 2):
❌ Error obteniendo datos - Usando datos vacíos
Login completo: {username: "juan123", email: "", tema: "oscuro", idioma: "es"}
```

---

### 💡 HINTS:

**Hint 1:** Cada `.catch()` debe retornar un valor por defecto para que la cadena continúe

**Hint 2:** Si falla validación, retorná `{ username: 'guest' }` en el primer catch

**Hint 3:** Necesitás ir acumulando los datos en cada paso (combinar objetos con spread)

**Hint 4:** El último `.then()` debe recibir un objeto con todos los datos combinados

---

## Ejercicio 12: Promise States Debugging

⏱️ **TIEMPO LÍMITE:** 30 minutos

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Entender los estados de una promise
// ============================================

// ============================================
// Los 3 estados de una promise:
// ============================================
// 1. PENDING (pendiente) - Todavía no se resolvió ni rechazó
// 2. FULFILLED (cumplida) - Se resolvió exitosamente (resolve)
// 3. REJECTED (rechazada) - Fue rechazada (reject)

// ============================================
// CASO 1: Observar los estados
// ============================================

const promesaPendiente = new Promise((resolve) => {
    // No resuelvo ni rechazo → queda PENDING forever
});

console.log('Promesa pendiente:', promesaPendiente);
// Output: Promise { <pending> }

const promesaResuelta = Promise.resolve('Éxito');
console.log('Promesa resuelta:', promesaResuelta);
// Output: Promise { 'Éxito' }

const promesaRechazada = Promise.reject('Error');
console.log('Promesa rechazada:', promesaRechazada);
// Output: Promise { <rejected> 'Error' }

// ============================================
// CASO 2: Debugging con console.log
// ============================================

function operacionAsincrona() {
    console.log('[1] Creando promise');
    
    const promesa = new Promise((resolve, reject) => {
        console.log('[2] Ejecutor de la promise (síncrono)');
        
        setTimeout(() => {
            console.log('[4] setTimeout ejecutándose');
            resolve('Completado');
            console.log('[5] Después de resolve()');
        }, 1000);
        
        console.log('[3] Después del setTimeout');
    });
    
    console.log('[6] Promise creada, retornando');
    return promesa;
}

console.log('[0] Inicio');
const resultado = operacionAsincrona();
console.log('[7] Promise retornada:', resultado);  // <pending>

resultado.then((valor) => {
    console.log('[8] .then() ejecutándose:', valor);
});

console.log('[9] Fin del código síncrono');

// Orden de ejecución:
// [0] Inicio
// [1] Creando promise
// [2] Ejecutor de la promise (síncrono)
// [3] Después del setTimeout
// [6] Promise creada, retornando
// [7] Promise retornada: Promise { <pending> }
// [9] Fin del código síncrono
// ... (1 segundo después)
// [4] setTimeout ejecutándose
// [5] Después de resolve()
// [8] .then() ejecutándose: Completado

// ============================================
// CASO 3: Inspeccionar promise en diferentes momentos
// ============================================

const promesa = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Listo!');
    }, 2000);
});

console.log('Estado inicial:', promesa);  // <pending>

promesa.then((valor) => {
    console.log('Estado al resolver:', promesa);  // Listo!
    console.log('Valor recibido:', valor);
});

// Después de 2 segundos:
// Estado al resolver: Promise { 'Listo!' }
// Valor recibido: Listo!

// ============================================
// CASO 4: Promise que cambia de pending a rejected
// ============================================

const promesaConError = new Promise((resolve, reject) => {
    console.log('Estado: pending');
    
    setTimeout(() => {
        reject('Falló!');
        console.log('Estado: rejected');
    }, 1000);
});

console.log('Promesa creada:', promesaConError);  // <pending>

promesaConError
    .catch((error) => {
        console.log('Error capturado:', error);
        console.log('Promesa después del catch:', promesaConError);  // <rejected>
    });

// ============================================
// PATRON: Debugging de chains complejos
// ============================================

function debugPromise(nombre, promesa) {
    console.log(`[${nombre}] Estado:`, promesa);
    return promesa;
}

const p1 = Promise.resolve(10);
debugPromise('p1', p1);  // Promise { 10 }

const p2 = p1.then((n) => {
    console.log('Transformando:', n);
    return n * 2;
});
debugPromise('p2', p2);  // Promise { <pending> }

const p3 = p2.then((n) => {
    console.log('Sumando:', n);
    return n + 5;
});
debugPromise('p3', p3);  // Promise { <pending> }

p3.then((resultado) => {
    console.log('Resultado final:', resultado);  // 25
    debugPromise('p3 resuelto', p3);  // Promise { 25 }
});

// ============================================
// HERRAMIENTA: Promise inspector utility
// ============================================

function inspectPromise(promesa, nombre = 'Promise') {
    console.log(`\n=== Inspeccionando: ${nombre} ===`);
    console.log('Promesa:', promesa);
    
    // Intentar obtener el valor
    promesa
        .then((valor) => {
            console.log(`✅ ${nombre} resuelta con:`, valor);
        })
        .catch((error) => {
            console.log(`❌ ${nombre} rechazada con:`, error);
        })
        .finally(() => {
            console.log(`Inspección de ${nombre} completada\n`);
        });
}

// Uso:
inspectPromise(Promise.resolve(42), 'Test 1');
inspectPromise(Promise.reject('Error!'), 'Test 2');
inspectPromise(
    new Promise(resolve => setTimeout(() => resolve('Demorado'), 1000)),
    'Test 3'
);

// ============================================
// CONCEPTO: Una promise solo cambia de estado UNA VEZ
// ============================================

const promesaUnica = new Promise((resolve, reject) => {
    resolve('Primero');
    resolve('Segundo');  // Ignorado
    reject('Error');     // Ignorado
});

promesaUnica.then((valor) => {
    console.log(valor);  // Output: "Primero"
});

// Solo el PRIMER resolve/reject cuenta
// Los demás se ignoran

// ============================================
// DEBUGGING TIPS
// ============================================
/*
1. Usar console.log() ANTES de .then() para ver estado inicial
2. Usar console.log() DENTRO de .then() para ver cuando se resuelve
3. Inspeccionar la promise en diferentes puntos del código
4. Recordar: .then() retorna una NUEVA promise (también puede inspeccionarse)
5. Usar debugger; dentro de .then() para pausar en DevTools
6. En Chrome DevTools: inspeccionar promise muestra su estado actual
*/

// Ejemplo con debugger:
Promise.resolve(10)
    .then((n) => {
        debugger;  // Pausa aquí para inspeccionar en DevTools
        return n * 2;
    })
    .then((n) => {
        debugger;  // Pausa aquí
        console.log(n);
    });
```

**Analogía:**
```
Los estados de una promise son como el estado de un pedido de delivery:

1. PENDING (Pendiente):
   "Tu pedido está siendo preparado"
   → Todavía no sabés si llegará o se cancelará

2. FULFILLED (Cumplido):
   "Tu pedido llegó! ✅"
   → Éxito, tenés tu comida

3. REJECTED (Rechazado):
   "Tu pedido fue cancelado ❌"
   → Falló, no llegó

El pedido solo puede terminar en UNO de estos dos estados
Una vez que está en fulfilled o rejected, NO puede cambiar
```

**Diagrama de transiciones:**
```
    new Promise()
          ↓
      [PENDING]
     (esperando)
          ↓
    /────────────\
    ↓            ↓
resolve()    reject()
    ↓            ↓
[FULFILLED]  [REJECTED]
(cumplida)   (rechazada)
    ↓            ↓
  .then()     .catch()

✅ PENDING → FULFILLED (solo una vez)
✅ PENDING → REJECTED (solo una vez)
❌ FULFILLED → REJECTED (no puede cambiar)
❌ REJECTED → FULFILLED (no puede cambiar)
```

---

### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `rastrearPromise(nombre, promesa)` que:
1. Imprima el estado inicial de la promise
2. Cuando se resuelva/rechace, imprima el estado final
3. Mida cuánto tiempo tardó en resolverse/rechazarse
4. Imprima un resumen completo al final

**PLANTILLA:**
```javascript
function rastrearPromise(nombre, promesa) {
    const inicio = Date.now();
    
    // TODO: Imprimir estado inicial
    console.log(`[${nombre}] Estado inicial:`, /* ... */);
    
    // TODO: Esperar resolución/rechazo y medir tiempo
    return promesa
        .then((valor) => {
            // TODO: Calcular tiempo transcurrido
            // TODO: Imprimir resultado
        })
        .catch((error) => {
            // TODO: Calcular tiempo transcurrido
            // TODO: Imprimir error
        });
}

// TODO: Probar con diferentes promises

// Test 1: Promise inmediata
rastrearPromise('Test 1', Promise.resolve('OK'));

// Test 2: Promise con delay
rastrearPromise(
    'Test 2',
    new Promise(resolve => setTimeout(() => resolve('Demorado'), 1500))
);

// Test 3: Promise que falla
rastrearPromise('Test 3', Promise.reject('Error!'));
```

**RESULTADO ESPERADO:**
```
[Test 1] Estado inicial: Promise { 'OK' }
[Test 1] ✅ Resuelta con: OK (0ms)

[Test 2] Estado inicial: Promise { <pending> }
... (1.5 segundos después)
[Test 2] ✅ Resuelta con: Demorado (1502ms)

[Test 3] Estado inicial: Promise { <rejected> 'Error!' }
[Test 3] ❌ Rechazada con: Error! (0ms)
```

---

### 💡 HINTS:

**Hint 1:** Usá `Date.now()` al inicio y dentro de `.then()`/`.catch()` para calcular el tiempo

**Hint 2:** Tiempo transcurrido = `Date.now() - inicio`

**Hint 3:** Podés hacer `console.log(promesa)` directamente para ver su estado

**Hint 4:** En `.then()` y `.catch()` tenés que retornar el valor/error para no romper la cadena

---

# ✅ CHECKPOINT: Completaste el Warmup Semana 1

**¡Felicitaciones!** Completaste los 12 ejercicios de Promises desde Cero.

**Lo que dominás ahora:**
- ✅ Crear promises con `new Promise()`
- ✅ Consumir con `.then()`, `.catch()`, `.finally()`
- ✅ Shortcuts con `Promise.resolve()` y `Promise.reject()`
- ✅ Encadenar promises correctamente
- ✅ Transformar datos en chains
- ✅ Aplanar promises anidadas
- ✅ Manejo robusto de errores
- ✅ Propagación de errores
- ✅ Importancia del `return` en `.then()`
- ✅ Múltiples `.catch()` para recuperación
- ✅ Debugging de promise states

---

## 🎯 Próximos Pasos

**Estás listo para:**
→ **Proyecto 1: Sistema de Tareas Asíncronas Custom**

Este proyecto integrará TODO lo que practicaste:
- Crear promises desde cero
- Chaining complejo
- Error handling robusto
- Retry logic
- Queue de tareas
- Patterns de producción

**Duración estimada:** 4 días (12 horas)

---

## 💪 Tips para el Proyecto

**Governor activo:**
- Día 1-2: MVP funcional (80%)
- Día 3: Pulir y agregar features
- Día 4: Testing y documentación
- **No iterar más de 2 veces**

**Recordá:**
- Funcional > Perfecto
- 80% y avanzar > 100% que nunca termina
- Si funciona → NEXT

---

**¿Listo para el Proyecto 1?** 🚀
