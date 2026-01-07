/**
**CONSIGNA:**
Simulá subir una foto a Instagram:
1. Mostrar "📤 Subiendo foto..."
2. La subida puede fallar (50% de probabilidad)
3. Si funciona → "✅ Foto subida"
4. Si falla → "❌ Error al subir"
5. SIEMPRE al final → "🔓 Liberando recursos..."
 */

// TODO: Imprimir mensaje de inicio
console.log("📤 Subiendo foto...");

const subirFoto = new Promise((resolve, reject) => {
  setTimeout(() => {
    // TODO: 50% éxito, 50% error
    const exito = Math.random() >= 0.5;
    if(exito) {
      resolve("✅ Foto subida");
    } else {
      reject("❌ Error al subir");
    }
  }, 2000);
});

// TODO: Consumir con .then(), .catch() y .finally()
subirFoto
  .then((mensaje) => {
    // TU CÓDIGO AQUÍ
    console.log("Exito:", mensaje);
  })
  .catch((error) => {
    // TU CÓDIGO AQUÍ
    console.log("Error:", error);
  })
  .finally(() => {
    // TU CÓDIGO AQUÍ
    console.log("🔓 Liberando recursos...");
  });

