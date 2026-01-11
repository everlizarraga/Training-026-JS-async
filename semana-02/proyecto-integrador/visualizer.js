// ============================================
// CLASE TASK (representa una operación)
// ============================================
/**@typedef {'sync'|'micro'|'macro'} TypeTask */

class Task {
  /**
   * @param {TypeTask} type - Tipo de tarea
   * @param {string} code - Código a ejecutar
   * @param {number} [delay=0] - Delay en ms
   */
  constructor(type, code, delay = 0) {
    /**@type {number} */
    this.id = Date.now() + Math.random();
    /**@type {TypeTask} */
    this.type = type;  // 'sync', 'micro', 'macro'
    /**@type {string} */
    this.code = code;  // String del código
    /**@type {number} */
    this.delay = delay;
    /**@type {boolean} */
    this.executed = false;
  }
}

// ============================================
// CLASE EVENT LOOP SIMULATOR
// ============================================
/**@typedef {'idle'|'running'|'finished'} StateTask*/

class EventLoopSimulator {
  constructor() {
    // Queues
    /**@type {Task[]} */
    this.callStack = [];
    /**@type {Task[]} */
    this.microtaskQueue = [];
    /**@type {Task[]} */
    this.macrotaskQueue = [];

    // Estado
    /**@type {StateTask} */
    this.state = 'idle';  // idle, running, finished
    this.stepCount = 0;
    this.consoleOutput = [];

    // Código original parseado
    /**@type {Task[]} */
    this.parsedOperations = [];
    this.currentOperationIndex = 0;
  }

  // ============================================
  // PARSEAR CÓDIGO
  // ============================================
  parseCode(code) {
    // TODO DÍA 2: Implementar parser
    // 1. Dividir código en líneas
    // 2. Por cada línea, detectar tipo:
    //    - console.log(...) → sync
    //    - setTimeout(...) → macro
    //    - Promise.resolve().then(...) → micro
    // 3. Crear Task por cada operación
    // 4. Guardar en this.parsedOperations

    console.log('Parseando código:', code);
    this.parsedOperations = [];

    const lines = code.split('\n');
    lines.forEach(line => {
      line = line.trim();
      if (line.includes('setTimeout')) {
        const task = new Task('macro', line);
        this.parsedOperations.push(task);
      } else if (line.includes('Promise.resolve().then') || line.includes('.then(')) {
        const task = new Task('micro', line);
        this.parsedOperations.push(task);
      } else if (line.includes('console.log')) {
        const task = new Task('sync', line);
        this.parsedOperations.push(task);
      }
    });

    // Hint: usar regex o string.includes()
    // Ejemplo: if (line.includes('console.log'))
  }

  // ============================================
  // EJECUTAR SIGUIENTE PASO
  // ============================================
  executeNextStep() {
    // TODO DÍA 3: Implementar lógica del Event Loop
    // Orden: Call Stack → Microtasks → Macrotasks

    this.stepCount++;

    // 1. Si hay operaciones sin procesar → agregar a call stack
    if (this.currentOperationIndex < this.parsedOperations.length) {
      const op = this.parsedOperations[this.currentOperationIndex];

      if (op.type === 'sync') {
        this.addToCallStack(op);
        // this.currentOperationIndex++;
      } else if (op.type === 'micro') {
        this.addToMicrotaskQueue(op);
        // this.currentOperationIndex++;
      } else if (op.type === 'macro') {
        this.addToMacrotaskQueue(op);
        // this.currentOperationIndex++;
      }
      this.currentOperationIndex++;
      this.render();  // ← Renderizar DESPUÉS de agregar
      return;  // ← IMPORTANTE: Salir aquí (no ejecutar todavía)
    }

    // 2. Ejecutar call stack (sync)
    if (this.callStack.length > 0) {
      // const task = this.callStack.pop();
      const task = this.callStack.shift();
      this.executeTask(task);
      this.render();
      return;
    }

    // 3. Ejecutar microtasks (TODAS)
    if (this.microtaskQueue.length > 0) {
      const task = this.microtaskQueue.shift();
      this.executeTask(task);
      this.render();
      return;
    }

    // 4. Ejecutar UNA macrotask
    if (this.macrotaskQueue.length > 0) {
      const task = this.macrotaskQueue.shift();
      this.executeTask(task);
      this.render();
      return;
    }

    // 5. Si no hay nada → terminado
    // if (this.currentOperationIndex >= this.parsedOperations.length) {
    //   this.state = 'finished';
    //   this.updateStatus('Ejecución completada');
    //   this.render();
    // }
    this.state = 'finished';
    this.updateStatus('Ejecución completada');
    this.render();
  }

  // ============================================
  // AGREGAR A QUEUES
  // ============================================
  addToCallStack(task) {
    this.callStack.push(task);
    this.log(`➕ Agregado a Call Stack: ${task.code}`, 'info');
  }

  addToMicrotaskQueue(task) {
    this.microtaskQueue.push(task);
    this.log(`➕ Agregado a Microtask Queue: ${task.code}`, 'info');
  }

  addToMacrotaskQueue(task) {
    this.macrotaskQueue.push(task);
    this.log(`➕ Agregado a Macrotask Queue: ${task.code}`, 'info');
  }

  // ============================================
  // EJECUTAR TAREA
  // ============================================
  executeTask(task) {
    // TODO DÍA 3: Ejecutar la tarea y loguear resultado
    // Simular ejecución sin ejecutar código real

    task.executed = true;

    // Si es console.log → extraer mensaje y mostrarlo
    if (task.code.includes('console.log')) {
      const message = this.extractConsoleMessage(task.code);
      this.log(`✅ ${message}`, 'success');
    } else {
      this.log(`✅ Ejecutado: ${task.code}`, 'success');
    }
  }

  // ============================================
  // EXTRAER MENSAJE DE console.log()
  // ============================================
  extractConsoleMessage(code) {
    // TODO DÍA 3: Extraer el string dentro de console.log('...')
    // Ejemplo: "console.log('Hola')" → "Hola"

    const match = code.match(/console\.log\(['"](.+)['"]\)/);
    return match ? match[1] : code;
  }

  // ============================================
  // LOGGING
  // ============================================
  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    this.consoleOutput.push({ timestamp, message, type });
    this.renderConsole();
  }

  // ============================================
  // RESET
  // ============================================
  reset() {
    this.callStack = [];
    this.microtaskQueue = [];
    this.macrotaskQueue = [];
    this.parsedOperations = [];
    this.currentOperationIndex = 0;
    this.stepCount = 0;
    this.consoleOutput = [];
    this.state = 'idle';

    this.updateStatus('Listo');
    this.render();
    this.renderConsole();
  }

  // ============================================
  // RENDERIZAR UI
  // ============================================
  render() {
    // TODO DÍA 1: Renderizar las 3 columnas
    this.renderCallStack();
    this.renderMicrotaskQueue();
    this.renderMacrotaskQueue();
    this.updateStepCounter();
  }

  renderCallStack() {
    const container = document.getElementById('call-stack-items');

    if (this.callStack.length === 0) {
      container.innerHTML = '<div class="empty-state">Vacío</div>';
      return;
    }

    container.innerHTML = this.callStack
      .map(task => `
        <div class="queue-item sync">
          ${task.code}
        </div>
            `)
      .join('');
  }

  renderMicrotaskQueue() {
    const container = document.getElementById('microtask-items');

    if (this.microtaskQueue.length === 0) {
      container.innerHTML = '<div class="empty-state">Vacío</div>';
      return;
    }

    container.innerHTML = this.microtaskQueue
      .map(task => `
        <div class="queue-item micro">
          ${task.code}
        </div>
        `)
      .join('');
  }

  renderMacrotaskQueue() {
    const container = document.getElementById('macrotask-items');

    if (this.macrotaskQueue.length === 0) {
      container.innerHTML = '<div class="empty-state">Vacío</div>';
      return;
    }

    container.innerHTML = this.macrotaskQueue
      .map(task => `
        <div class="queue-item macro">
          ${task.code}
        </div>
        `)
      .join('');
  }

  renderConsole() {
    const container = document.getElementById('console-output');

    if (this.consoleOutput.length === 0) {
      container.innerHTML = '<div class="console-welcome">Esperando ejecución...</div>';
      return;
    }

    container.innerHTML = this.consoleOutput
      .map(log => `
        <div class="console-log ${log.type}">
          <span class="console-timestamp">[${log.timestamp}]</span>
          ${log.message}
        </div>
        `)
      .join('');

    container.scrollTop = container.scrollHeight;
  }

  updateStatus(message) {
    document.getElementById('status-text').textContent = `Estado: ${message}`;
  }

  updateStepCounter() {
    document.getElementById('step-counter').textContent = `Paso: ${this.stepCount}`;
  }
}

// ============================================
// EJEMPLOS PRE-CARGADOS
// ============================================
const EXAMPLES = {
  1: `console.log('A');
console.log('B');
console.log('C');`,

  2: `console.log('Start');
Promise.resolve().then(() => console.log('Promise'));
console.log('End');`,

  3: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,

  //   4: `console.log('1');
  // Promise.resolve().then(() => {
  //     console.log('2');
  //     Promise.resolve().then(() => console.log('3'));
  // });
  // console.log('4');`,
  4: `console.log('1');
Promise.resolve().then(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
console.log('4');`,

  5: `console.log('Start');
setTimeout(() => console.log('Timeout 1'), 0);
Promise.resolve()
    .then(() => console.log('Promise 1'))
    .then(() => console.log('Promise 2'));
setTimeout(() => console.log('Timeout 2'), 0);
console.log('End');`
};

// ============================================
// INICIALIZACIÓN
// ============================================
const simulator = new EventLoopSimulator();

// Event listeners
document.getElementById('btn-step').addEventListener('click', () => {
  if (simulator.state === 'idle') {
    const code = document.getElementById('code-editor').value.trim();
    if (!code) {
      alert('Escribí código primero');
      return;
    }
    simulator.parseCode(code);
    simulator.state = 'running';
    simulator.updateStatus('Ejecutando...');
  }

  if (simulator.state === 'running') {
    simulator.executeNextStep();
  }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  simulator.reset();
});

document.getElementById('examples-selector').addEventListener('change', (e) => {
  const exampleNum = e.target.value;
  if (exampleNum) {
    document.getElementById('code-editor').value = EXAMPLES[exampleNum];
    simulator.reset();
    e.target.value = '';
  }
});

// Render inicial
simulator.render();
simulator.renderConsole();

