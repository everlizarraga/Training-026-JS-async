# 🎨 PROYECTO 2: Visualizador de Event Loop

**Duración:** 4 días máximo (12 horas)  
**Objetivo:** Construir herramienta interactiva que MUESTRA cómo funciona el Event Loop en tiempo real: Call Stack, Microtask Queue, Macrotask Queue, y orden de ejecución.

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un **Event Loop Visualizer** similar a Loupe pero simplificado.

**Permite:**
- Escribir código JavaScript
- Ver cómo se ejecuta paso a paso
- Visualizar Call Stack, Microtasks, Macrotasks
- Entender orden de ejecución visualmente
- Cargar ejemplos pre-hechos

**Demo visual:**
```
┌─────────────────────────────────────────────────────────┐
│             EVENT LOOP VISUALIZER                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐    ┌──────────────────────────┐ │
│  │  CÓDIGO          │    │  CONTROLES                │ │
│  ├──────────────────┤    ├──────────────────────────┤ │
│  │ console.log('A') │    │ ▶️ Ejecutar Paso a Paso  │ │
│  │ setTimeout(...)  │    │ ⏯️ Ejecutar Auto        │ │
│  │ Promise.then(..) │    │ 🔄 Reset                 │ │
│  │ console.log('B') │    │ 📚 Ejemplos              │ │
│  └──────────────────┘    └──────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📚 CALL STACK                                  │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  → console.log('A')    [ejecutando...]          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ⚡ MICROTASK QUEUE                             │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  → Promise.then(() => console.log('C'))         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📋 MACROTASK QUEUE                             │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  → setTimeout(() => console.log('B'), 0)        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  📝 CONSOLE OUTPUT                              │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  [10:30:15] A                                   │   │
│  │  [10:30:16] C                                   │   │
│  │  [10:30:17] B                                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
- [x] **Editor de código**: Textarea para escribir JS
- [x] **Parser básico**: Detectar console.log, setTimeout, Promise.then
- [x] **3 Visualizaciones**: Call Stack, Microtask Queue, Macrotask Queue
- [x] **Ejecución paso a paso**: Botón "Next Step"
- [x] **Console output**: Mostrar logs con timestamps
- [x] **5 Ejemplos pre-cargados**: Del simple al complejo
- [x] **Reset**: Limpiar todo y volver a empezar

### Nice to Have (si sobra tiempo):
- [ ] **Ejecución automática**: Play/Pause con velocidad ajustable
- [ ] **Highlighting**: Resaltar línea actual en el código
- [ ] **Animaciones**: Transiciones suaves entre queues
- [ ] **Estadísticas**: Contador de operaciones
- [ ] **Export**: Descargar como imagen o video

---

## 🎯 PATTERNS QUE VAS A APRENDER

### 1. INTERPRETER PATTERN
**Qué es:** Parsear y ejecutar código de un lenguaje  
**Por qué:** Necesitás "leer" el código JS y entenderlo  
**Dónde lo ves:** Función `parseCode()` que detecta console.log, setTimeout, etc.

**Analogía:** Google Translate lee español y lo convierte a inglés

```javascript
// Input (string):
"console.log('Hola')"

// Parser lo convierte a:
{
    type: 'console',
    action: 'log',
    args: ['Hola']
}
```

---

### 2. STATE MACHINE PATTERN
**Qué es:** Sistema con estados definidos y transiciones  
**Por qué:** El Event Loop tiene estados: sync → microtasks → macrotasks  
**Dónde lo ves:** Variable `state` que cambia: 'idle', 'running-sync', 'running-micro', etc.

**Analogía:** Semáforo - Verde → Amarillo → Rojo (estados)

```javascript
// Estados posibles:
'idle'            // Esperando
'parsing'         // Parseando código
'executing-sync'  // Ejecutando sync
'executing-micro' // Ejecutando microtasks
'executing-macro' // Ejecutando macrotasks
'finished'        // Terminado
```

---

### 3. ANIMATION PATTERN
**Qué es:** Visualizar transiciones de estado  
**Por qué:** Para que el usuario VEA cómo se mueven items entre queues  
**Dónde lo ves:** CSS transitions, animaciones de items

**Analogía:** Videojuego - sprites se mueven de un lugar a otro

---

### 4. COMMAND PATTERN
**Qué es:** Encapsular acciones como objetos  
**Por qué:** Cada operación (console.log, setTimeout) es un "comando"  
**Dónde lo ves:** Objetos que representan operaciones

```javascript
{
    type: 'log',
    execute: () => console.log('Hola')
}
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### DÍA 1: UI Base + Estructura
**Objetivo:** Crear interfaz visual y estructura de datos

**Tareas:**
1. [ ] Copiar HTML/CSS base (provisto abajo)
2. [ ] Crear clases: `EventLoopSimulator`, `Task`
3. [ ] Implementar métodos vacíos (addToCallStack, addToMicrotasks, etc.)
4. [ ] Renderizar items en las 3 columnas
5. [ ] Botón Reset funcional

**Checkpoint:**
- [ ] Veo las 3 columnas vacías
- [ ] Puedo agregar items manualmente (hardcodeados)
- [ ] Se visualizan correctamente

---

### DÍA 2: Parser de Código
**Objetivo:** Leer código JS y convertirlo a operaciones

**Tareas:**
1. [ ] Implementar `parseCode()` básico
2. [ ] Detectar `console.log(...)`
3. [ ] Detectar `setTimeout(...)`
4. [ ] Detectar `Promise.resolve().then(...)`
5. [ ] Crear objetos Task para cada operación

**Checkpoint:**
- [ ] Escribo código en el editor
- [ ] Parser lo convierte correctamente
- [ ] Veo las operaciones en console

**Código de prueba:**
```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
```

---

### DÍA 3: Ejecución Paso a Paso
**Objetivo:** Ejecutar código simulando el Event Loop

**Tareas:**
1. [ ] Implementar `executeNextStep()`
2. [ ] Lógica: sync → microtasks → macrotasks
3. [ ] Mover items entre queues
4. [ ] Actualizar UI en cada paso
5. [ ] Botón "Next Step" funcional

**Checkpoint:**
- [ ] Click en "Next Step" ejecuta UNA operación
- [ ] Los items se mueven entre columnas
- [ ] Console output se actualiza
- [ ] Respeta orden: sync → micro → macro

---

### DÍA 4: Ejemplos + Pulido
**Objetivo:** Cargar ejemplos y mejorar UX

**Tareas:**
1. [ ] Implementar 5 ejemplos pre-cargados
2. [ ] Botón "Cargar Ejemplo" funcional
3. [ ] Mejorar visualización (colores, spacing)
4. [ ] Agregar mensajes de ayuda
5. [ ] Testing final

**Checkpoint:**
- [ ] Los 5 ejemplos funcionan correctamente
- [ ] UI se ve profesional
- [ ] Todo funciona sin errores

---

## 📁 ARCHIVOS

```
proyecto-2/
├── index.html
├── styles.css
└── visualizer.js
```

---

## 🎨 HTML COMPLETO (copiar tal cual)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Loop Visualizer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🔄 Event Loop Visualizer</h1>
            <p class="subtitle">Visualiza cómo JavaScript ejecuta código asíncrono</p>
        </header>

        <div class="main-content">
            <!-- Editor de código -->
            <section class="editor-section">
                <h2>📝 Editor de Código</h2>
                <textarea id="code-editor" placeholder="Escribí tu código JavaScript aquí...
Ejemplo:
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');"></textarea>
                
                <div class="editor-controls">
                    <button id="btn-step" class="btn btn-primary">⏭️ Siguiente Paso</button>
                    <button id="btn-reset" class="btn btn-secondary">🔄 Reset</button>
                    <select id="examples-selector" class="btn btn-secondary">
                        <option value="">📚 Cargar Ejemplo...</option>
                        <option value="1">Ejemplo 1: Básico</option>
                        <option value="2">Ejemplo 2: Microtasks</option>
                        <option value="3">Ejemplo 3: Mixed</option>
                        <option value="4">Ejemplo 4: Anidado</option>
                        <option value="5">Ejemplo 5: Complejo</option>
                    </select>
                </div>

                <div class="status-bar">
                    <span id="status-text">Estado: Listo</span>
                    <span id="step-counter">Paso: 0</span>
                </div>
            </section>

            <!-- Visualizaciones -->
            <section class="visualizations">
                <div class="queue-container">
                    <div class="queue call-stack">
                        <h3>📚 Call Stack</h3>
                        <div class="queue-label">Código Síncrono</div>
                        <div id="call-stack-items" class="queue-items">
                            <div class="empty-state">Vacío</div>
                        </div>
                    </div>

                    <div class="queue microtask-queue">
                        <h3>⚡ Microtask Queue</h3>
                        <div class="queue-label">Promises (ALTA prioridad)</div>
                        <div id="microtask-items" class="queue-items">
                            <div class="empty-state">Vacío</div>
                        </div>
                    </div>

                    <div class="queue macrotask-queue">
                        <h3>📋 Macrotask Queue</h3>
                        <div class="queue-label">setTimeout (NORMAL prioridad)</div>
                        <div id="macrotask-items" class="queue-items">
                            <div class="empty-state">Vacío</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Console Output -->
            <section class="console-section">
                <h2>📝 Console Output</h2>
                <div id="console-output" class="console-output">
                    <div class="console-welcome">
                        Esperando ejecución...
                    </div>
                </div>
            </section>
        </div>

        <footer>
            <p>Construido para entender el Event Loop de JavaScript</p>
        </footer>
    </div>

    <script src="visualizer.js"></script>
</body>
</html>
```

---

## 🎨 CSS COMPLETO (copiar tal cual)

Crear archivo `styles.css`:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #1f2937;
    --light: #f9fafb;
    --border: #e5e7eb;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--border);
}

h1 {
    color: var(--dark);
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.subtitle {
    color: #6b7280;
    font-size: 1.1rem;
}

.main-content {
    display: grid;
    gap: 20px;
}

/* Editor Section */
.editor-section {
    background: var(--light);
    padding: 20px;
    border-radius: 10px;
}

.editor-section h2 {
    color: var(--dark);
    margin-bottom: 15px;
}

#code-editor {
    width: 100%;
    height: 200px;
    padding: 15px;
    border: 2px solid var(--border);
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    resize: vertical;
    background: white;
}

#code-editor:focus {
    outline: none;
    border-color: var(--primary);
}

.editor-controls {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.btn-primary {
    background: var(--success);
    color: white;
}

.btn-primary:hover {
    background: #059669;
    transform: translateY(-2px);
}

.btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
}

.btn-secondary {
    background: #6b7280;
    color: white;
}

.btn-secondary:hover {
    background: #4b5563;
}

#examples-selector {
    flex: 1;
    min-width: 200px;
}

.status-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding: 10px 15px;
    background: white;
    border-radius: 8px;
    border: 2px solid var(--border);
}

#status-text {
    font-weight: 600;
    color: var(--dark);
}

#step-counter {
    color: #6b7280;
}

/* Visualizations */
.visualizations {
    background: var(--light);
    padding: 20px;
    border-radius: 10px;
}

.queue-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

@media (max-width: 1024px) {
    .queue-container {
        grid-template-columns: 1fr;
    }
}

.queue {
    background: white;
    border-radius: 10px;
    padding: 15px;
    border: 2px solid var(--border);
}

.queue h3 {
    margin-bottom: 5px;
    color: var(--dark);
}

.queue-label {
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 15px;
    font-style: italic;
}

.call-stack {
    border-left: 4px solid #3b82f6;
}

.microtask-queue {
    border-left: 4px solid var(--warning);
}

.macrotask-queue {
    border-left: 4px solid #8b5cf6;
}

.queue-items {
    min-height: 150px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.queue-item {
    padding: 12px;
    background: var(--light);
    border-radius: 6px;
    border-left: 3px solid currentColor;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.queue-item.sync {
    color: #3b82f6;
    background: #dbeafe;
}

.queue-item.micro {
    color: var(--warning);
    background: #fef3c7;
}

.queue-item.macro {
    color: #8b5cf6;
    background: #ede9fe;
}

.queue-item.executing {
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.7;
        transform: scale(0.98);
    }
}

.empty-state {
    text-align: center;
    color: #9ca3af;
    padding: 40px 10px;
    font-style: italic;
}

/* Console Section */
.console-section {
    background: var(--dark);
    padding: 20px;
    border-radius: 10px;
}

.console-section h2 {
    color: white;
    margin-bottom: 15px;
}

.console-output {
    background: #111827;
    padding: 20px;
    border-radius: 8px;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #d1d5db;
}

.console-welcome {
    color: #6b7280;
    text-align: center;
    padding: 40px;
}

.console-log {
    margin-bottom: 8px;
    padding: 5px;
    border-radius: 3px;
}

.console-log.info {
    color: #60a5fa;
}

.console-log.success {
    color: #34d399;
}

.console-log.warning {
    color: #fbbf24;
}

.console-log.error {
    color: #f87171;
}

.console-timestamp {
    color: #6b7280;
    margin-right: 10px;
}

footer {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 2px solid var(--border);
    color: #6b7280;
}
```

---

## 💻 JAVASCRIPT - ESTRUCTURA BASE

Crear archivo `visualizer.js`:

```javascript
// ============================================
// CLASE TASK (representa una operación)
// ============================================
class Task {
    constructor(type, code, delay = 0) {
        this.id = Date.now() + Math.random();
        this.type = type;  // 'sync', 'micro', 'macro'
        this.code = code;  // String del código
        this.delay = delay;
        this.executed = false;
    }
}

// ============================================
// CLASE EVENT LOOP SIMULATOR
// ============================================
class EventLoopSimulator {
    constructor() {
        // Queues
        this.callStack = [];
        this.microtaskQueue = [];
        this.macrotaskQueue = [];
        
        // Estado
        this.state = 'idle';  // idle, running, finished
        this.stepCount = 0;
        this.consoleOutput = [];
        
        // Código original parseado
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
                this.currentOperationIndex++;
            } else if (op.type === 'micro') {
                this.addToMicrotaskQueue(op);
                this.currentOperationIndex++;
            } else if (op.type === 'macro') {
                this.addToMacrotaskQueue(op);
                this.currentOperationIndex++;
            }
        }
        
        // 2. Ejecutar call stack (sync)
        if (this.callStack.length > 0) {
            const task = this.callStack.pop();
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
        if (this.currentOperationIndex >= this.parsedOperations.length) {
            this.state = 'finished';
            this.updateStatus('Ejecución completada');
            this.render();
        }
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

    4: `console.log('1');
Promise.resolve().then(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
});
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
```

---

## 💡 HINTS POR DÍA

### Hints Día 2: Parser

**Hint 1 - Detectar console.log:**
```javascript
parseCode(code) {
    const lines = code.split('\n');
    
    lines.forEach(line => {
        line = line.trim();
        
        if (line.includes('console.log')) {
            const task = new Task('sync', line);
            this.parsedOperations.push(task);
        }
    });
}
```

**Hint 2 - Detectar setTimeout:**
```javascript
if (line.includes('setTimeout')) {
    const task = new Task('macro', line);
    this.parsedOperations.push(task);
}
```

**Hint 3 - Detectar Promise.then:**
```javascript
if (line.includes('Promise.resolve().then') || line.includes('.then(')) {
    const task = new Task('micro', line);
    this.parsedOperations.push(task);
}
```

---

### Hints Día 3: Ejecución

**Hint 1 - Lógica del Event Loop:**
```javascript
// Orden CRÍTICO:
// 1. Agregar operaciones sync a Call Stack
// 2. Ejecutar Call Stack (sync)
// 3. Ejecutar Microtasks (TODAS)
// 4. Ejecutar UNA Macrotask
// 5. Volver a paso 3
```

**Hint 2 - Extraer mensaje:**
```javascript
extractConsoleMessage(code) {
    // Buscar entre comillas simples o dobles
    const match = code.match(/console\.log\(['"](.+?)['"]\)/);
    if (match) {
        return match[1];
    }
    return code;
}
```

---

## 🎓 CONCEPTOS CLAVE

### Parser Básico

**NO necesitás un parser completo de JavaScript.**  
Solo detectar patrones simples:

```javascript
// Detectar:
- "console.log('...')"
- "setTimeout(() => ..., 0)"
- "Promise.resolve().then(() => ...)"

// NO necesitás manejar:
- Variables
- Funciones complejas
- Loops
- Condicionales
```

**Enfoque:** Buscar strings específicos con `.includes()` o regex simple.

---

### State Machine

**Estados del simulador:**
```
idle       → Esperando código
running    → Ejecutando paso a paso
finished   → Todo completado
```

**Transiciones:**
```
idle → (click Step) → running
running → (sin operaciones) → finished
finished → (click Reset) → idle
```

---

## ✅ CHECKLIST FINAL

### Día 1:
- [ ] UI renderiza correctamente
- [ ] 3 columnas visibles
- [ ] Botón Reset funciona
- [ ] Puedo agregar items manualmente

### Día 2:
- [ ] Parser detecta console.log
- [ ] Parser detecta setTimeout
- [ ] Parser detecta Promise.then
- [ ] Crea Tasks correctamente

### Día 3:
- [ ] Ejecuta operaciones en orden correcto
- [ ] Items se mueven entre queues
- [ ] Console output funciona
- [ ] Respeta sync → micro → macro

### Día 4:
- [ ] 5 ejemplos cargan correctamente
- [ ] UI pulida y clara
- [ ] Sin errores en consola
- [ ] Readme con instrucciones

---

## 💪 GOVERNOR REMINDER

**Límites:**
- Día 1-2: Estructura + Parser (80%)
- Día 3: Ejecución funcional (85%)
- Día 4: Ejemplos + Pulido (90%)
- **NO iterar más de 2 veces**

**Si funciona al 80% → SUBIR Y AVANZAR**

---

## 🚀 DESPUÉS DE COMPLETAR

**¡Felicitaciones!** Al completar este proyecto habrás:

✅ Construido un visualizador funcional del Event Loop  
✅ Implementado un parser básico de JS  
✅ Aplicado State Machine pattern  
✅ Entendido Event Loop VISUALMENTE  
✅ Creado herramienta educativa real  

**Nivel alcanzado:** Avanzado en Event Loop + Patterns ⭐⭐⭐⭐

---

## 📝 NOTA IMPORTANTE

Este proyecto es **MÁS DIFÍCIL** que el Proyecto 1.  
Si te trabás más de 1 hora en algo → preguntá.  
**NO intentes hacer un parser perfecto** → simple es suficiente.

---

**FIN DEL BRIEF**

Versión: 1.0  
Duración: 4 días (12 horas)  
Complejidad: Media-Alta  
Governor: ACTIVO ⚠️
