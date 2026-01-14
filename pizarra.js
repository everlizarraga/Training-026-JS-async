async function fecthConRetry(url, opciones = {}, reintentos = 3) {
  let lastError;
  for (let i = 1; i <= reintentos; i++) {
    try {
      console.log(`Intento ${i}...`);
      const response = await fetch(url, opciones);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('Data:', data);
      return data
    } catch (error) {
      lastError = error;
      console.log(`❌ Falló: ${error.message}`);
      //Si deseo algoritmo para generar delay
    }
  }
  console.error('❌ Todos los intentos fallaron')
  throw new Error('Todos los intentos fallaron');
}

