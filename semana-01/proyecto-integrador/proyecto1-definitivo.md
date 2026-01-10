# 🚀 PROYECTO 1: Sistema de Tareas Asíncronas Custom

**Duración:** 4 días máximo (12 horas)  
**Objetivo:** Construir un sistema que simula operaciones asíncronas (como fetch) usando Promises desde cero. Implementar queue, retry logic y logging.

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un sistema de gestión de tareas asíncronas similar a las librerías profesionales (Axios, Bull, RxJS).

**Casos de uso reales:**
- Sistema de colas de trabajos (Bull/Bee-Queue en Node.js)
- Retry de requests HTTP (Axios retry)
- Job processing en background
- Task schedulers

**Visualización del sistema:**
```
┌─────────────────────────────────────────┐
│     TASK MANAGER DASHBOARD              │
├─────────────────────────────────────────┤
│                                         │
│  [Crear Tarea] [Ejecutar Todo]         │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  TAREAS ACTIVAS                 │   │
│  ├─────────────────────────────────┤   │
│  │ ⏳ Tarea 1 - Pending (2s)       │   │
│  │ ✅ Tarea 2 - Completed (1.5s)   │   │
│  │ ❌ Tarea 3 - Failed (retry 2/3) │   │
│  │ ⏳ Tarea 4 - Pending (3s)       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  ESTADÍSTICAS                   │   │
│  ├─────────────────────────────────┤   │
│  │ Total: 10 tareas                │   │
│  │ Exitosas: 7 (70%)               │   │
│  │ Fallidas: 3 (30%)               │   │
│  │ Tiempo promedio: 2.3s           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [LOG DE ACTIVIDAD]                    │
│  → 10:30:15 - Tarea 1 iniciada        │
│  → 10:30:17 - Tarea 1 completada ✅   │
│  → 10:30:17 - Tarea 2 iniciada        │
│  → 10:30:18 - Tarea 2 falló (retry)   │
│  → 10:30:20 - Tarea 2 completada ✅   │
└─────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
- [x] **Clase Task**: Crear tareas asíncronas con delay configurable
- [x] **Ejecución Paralela**: Ejecutar múltiples tareas al mismo tiempo (Promise.allSettled)
- [x] **Ejecución Secuencial**: Ejecutar tareas una tras otra
- [x] **Retry Logic**: Reintentar automáticamente tareas que fallan (max 3 reintentos)
- [x] **Logging**: Registrar cada cambio de estado (pending → fulfilled/rejected)
- [x] **Estadísticas**: Mostrar total, exitosas, fallidas, tiempo promedio
- [x] **UI Simple**: Visualizar todo en pantalla (no consola)

### Nice to Have (si sobra tiempo):
- [ ] **Exponential Backoff**: Delay progresivo entre reintentos (1s, 2s, 4s)
- [ ] **Cancelación**: Cancelar tareas en progreso
- [ ] **Prioridades**: Tareas high/medium/low priority
- [ ] **Filtros**: Ver solo exitosas, solo fallidas, etc.

---

## 🎯 PATTERNS QUE VAS A APRENDER

### 1. FACTORY PATTERN
**Qué es:** Función que crea objetos con configuración  
**Por qué:** Evita repetir código al crear tareas similares  
**Dónde lo ves:** `createTask(config)` crea tasks configurables

**Analogía:** Fábrica de autos que produce autos personalizados
```javascript
// Sin Factory (repetitivo)
const task1 = new Task('Tarea 1', 2000, false);
const task2 = new Task('Tarea 2', 3000, true);
const task3 = new Task('Tarea 3', 1000, false);

// Con Factory (flexible)
const task1 = createTask({ name: 'Tarea 1', delay: 2000 });
const task2 = createTask({ name: 'Tarea 2', delay: 3000, shouldFail: true });
```

---

### 2. QUEUE PATTERN
**Qué es:** Cola FIFO (First In, First Out) que procesa items  
**Por qué:** Gestionar múltiples tareas de forma ordenada  
**Dónde lo ves:** `TaskQueue` que almacena y ejecuta tasks

**Analogía:** Cola del supermercado - primero en llegar, primero en pagar
```javascript
queue.add(task1);  // Llega primero
queue.add(task2);  // Llega segundo
queue.add(task3);  // Llega tercero
queue.executeAll(); // Ejecuta en orden: task1 → task2 → task3
```

---

### 3. RETRY PATTERN
**Qué es:** Reintentar operación fallida con límite máximo  
**Por qué:** Operaciones de red pueden fallar temporalmente  
**Dónde lo ves:** Retry automático cuando una task falla

**Analogía:** Llamar a alguien - si no contesta, intentar 2-3 veces más
```javascript
// Intento 1: ❌ Falla
// Intento 2: ❌ Falla
// Intento 3: ✅ Éxito
```

---

### 4. OBSERVER PATTERN
**Qué es:** Notificar cambios de estado a "observadores"  
**Por qué:** Actualizar UI cuando cambia el estado interno  
**Dónde lo ves:** Cuando una task cambia de estado → se actualiza UI

**Analogía:** Notificaciones del celular - una app avisa cuando hay cambios
```javascript
task.onStateChange((newState) => {
    updateUI(newState);  // Observer reacciona al cambio
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### DÍA 1: Clase Task + Ejecución básica
**Objetivo:** Crear tareas y ejecutarlas individualmente

**Tareas:**
1. [ ] Crear clase `Task` con constructor
2. [ ] Implementar método `execute()` que retorna Promise
3. [ ] Simular delay con `setTimeout`
4. [ ] Simular fallas aleatorias (30% de probabilidad)
5. [ ] Probar ejecutar tareas individuales

**Checkpoint:**
- [ ] Puedo crear una task: `new Task('Mi tarea', 2000)`
- [ ] Puedo ejecutarla: `task.execute().then(...)`
- [ ] Veo logs en consola: "Tarea iniciada", "Tarea completada"

**Código base:**
```javascript
class Task {
    constructor(name, delay, shouldFail = false) {
        this.name = name;
        this.delay = delay;
        this.shouldFail = shouldFail;
        this.status = 'pending';  // pending, running, completed, failed
    }

    execute() {
        // TODO: Implementar lógica de ejecución
        // 1. Cambiar status a 'running'
        // 2. Crear Promise con setTimeout
        // 3. Si shouldFail o random → reject
        // 4. Si no → resolve
        // 5. Cambiar status a 'completed' o 'failed'
    }
}

// Prueba
const task1 = new Task('Descargar archivo', 2000);
task1.execute()
    .then(() => console.log('✅ Completada'))
    .catch(() => console.log('❌ Falló'));
```

---

### DÍA 2: TaskQueue + Parallel vs Sequential
**Objetivo:** Ejecutar múltiples tareas en paralelo o secuencial

**Tareas:**
1. [ ] Crear clase `TaskQueue` con array de tasks
2. [ ] Implementar `add(task)` para agregar tareas
3. [ ] Implementar `executeParallel()` (Promise.allSettled)
4. [ ] Implementar `executeSequential()` (recursión)
5. [ ] Comparar tiempos de ejecución

**Checkpoint:**
- [ ] `executeParallel()` corre todas al mismo tiempo
- [ ] `executeSequential()` corre una tras otra
- [ ] Veo tiempos: parallel más rápido que sequential

**Código base:**
```javascript
class TaskQueue {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        this.tasks.push(task);
    }

    executeParallel() {
        // TODO: Usar Promise.allSettled con this.tasks
        // Medir tiempo inicio/fin
    }

    executeSequential() {
        // TODO: Ejecutar tareas una tras otra con recursión
        // Medir tiempo inicio/fin
    }
}

// Prueba
const queue = new TaskQueue();
queue.add(new Task('Task 1', 2000));
queue.add(new Task('Task 2', 1500));
queue.add(new Task('Task 3', 3000));

console.log('=== PARALLEL ===');
queue.executeParallel();  // 3 segundos total

console.log('=== SEQUENTIAL ===');
queue.executeSequential();  // 6.5 segundos total
```

---

### DÍA 3: Retry Logic + Error Handling
**Objetivo:** Reintentar tareas fallidas automáticamente

**Tareas:**
1. [ ] Agregar propiedad `maxRetries` a Task (default: 3)
2. [ ] Agregar propiedad `currentRetry` (contador)
3. [ ] Implementar función `executeWithRetry()`
4. [ ] Reintentar en caso de falla hasta max
5. [ ] Loguear cada reintento

**Checkpoint:**
- [ ] Si una task falla → se reintenta automáticamente
- [ ] Después de 3 fallos → se marca como failed definitivo
- [ ] Veo logs: "Reintento 1/3", "Reintento 2/3", etc.

**Código base:**
```javascript
class Task {
    constructor(name, delay, shouldFail = false, maxRetries = 3) {
        this.name = name;
        this.delay = delay;
        this.shouldFail = shouldFail;
        this.maxRetries = maxRetries;
        this.currentRetry = 0;
        this.status = 'pending';
    }

    execute() {
        // Lógica de ejecución (del Día 1)
    }

    executeWithRetry() {
        // TODO: Implementar retry logic
        // 1. Intentar execute()
        // 2. Si falla Y currentRetry < maxRetries:
        //    → incrementar currentRetry
        //    → llamar executeWithRetry() recursivamente
        // 3. Si falla Y currentRetry >= maxRetries:
        //    → retornar Promise.reject()
    }
}

// Prueba
const taskPropensa = new Task('Task propensa a fallar', 1000, true);
taskPropensa.executeWithRetry()
    .then(() => console.log('✅ Completada después de reintentos'))
    .catch(() => console.log('❌ Falló definitivamente'));
```

---

### DÍA 4: Logger + Estadísticas + UI Simple
**Objetivo:** Visualizar todo y mostrar estadísticas

**Tareas:**
1. [ ] Crear clase `TaskLogger` que registra eventos
2. [ ] Agregar timestamps a cada log
3. [ ] Calcular estadísticas (total, exitosas, fallidas, tiempo promedio)
4. [ ] Crear HTML con divs para mostrar info
5. [ ] Actualizar UI en tiempo real cuando cambian estados

**Checkpoint:**
- [ ] Veo logs con timestamps en pantalla
- [ ] Veo estadísticas actualizadas
- [ ] UI se actualiza automáticamente (Observer pattern)

**Código base HTML:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5rem;
        }

        .controls {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        button {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .btn-create {
            background: #10b981;
            color: white;
        }

        .btn-create:hover {
            background: #059669;
            transform: translateY(-2px);
        }

        .btn-parallel {
            background: #3b82f6;
            color: white;
        }

        .btn-parallel:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        .btn-sequential {
            background: #8b5cf6;
            color: white;
        }

        .btn-sequential:hover {
            background: #7c3aed;
            transform: translateY(-2px);
        }

        .content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .content {
                grid-template-columns: 1fr;
            }
        }

        .section {
            background: #f9fafb;
            border-radius: 10px;
            padding: 20px;
        }

        .section h2 {
            color: #1f2937;
            margin-bottom: 15px;
            font-size: 1.5rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
        }

        #task-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .task-item {
            padding: 15px;
            background: white;
            border-radius: 8px;
            border-left: 4px solid #94a3b8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }

        .task-item:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateX(5px);
        }

        .task-item.pending {
            border-left-color: #f59e0b;
        }

        .task-item.running {
            border-left-color: #3b82f6;
            animation: pulse 1.5s infinite;
        }

        .task-item.completed {
            border-left-color: #10b981;
        }

        .task-item.failed {
            border-left-color: #ef4444;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        .task-name {
            font-weight: 600;
            color: #1f2937;
        }

        .task-status {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
            color: #6b7280;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #e5e7eb;
        }

        .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 5px;
        }

        .stat-label {
            color: #6b7280;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        #log-container {
            background: #1f2937;
            color: #d1d5db;
            padding: 20px;
            border-radius: 10px;
            height: 300px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
        }

        .log-entry {
            margin-bottom: 5px;
            padding: 5px;
            border-radius: 3px;
        }

        .log-entry.info {
            color: #60a5fa;
        }

        .log-entry.success {
            color: #34d399;
        }

        .log-entry.error {
            color: #f87171;
        }

        .log-entry.warning {
            color: #fbbf24;
        }

        .empty-state {
            text-align: center;
            padding: 40px;
            color: #9ca3af;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Task Manager System</h1>

        <div class="controls">
            <button class="btn-create" onclick="createRandomTask()">
                ➕ Crear Tarea
            </button>
            <button class="btn-parallel" onclick="executeParallel()">
                ⚡ Ejecutar Paralelo
            </button>
            <button class="btn-sequential" onclick="executeSequential()">
                📋 Ejecutar Secuencial
            </button>
        </div>

        <div class="content">
            <div class="section">
                <h2>Tareas Activas</h2>
                <div id="task-list">
                    <div class="empty-state">
                        No hay tareas. Crea una para comenzar.
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Estadísticas</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value" id="stat-total">0</div>
                        <div class="stat-label">Total</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="stat-completed">0</div>
                        <div class="stat-label">Exitosas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="stat-failed">0</div>
                        <div class="stat-label">Fallidas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="stat-avg">0s</div>
                        <div class="stat-label">Tiempo Prom.</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Log de Actividad</h2>
            <div id="log-container"></div>
        </div>
    </div>

    <script src="task-system.js"></script>
</body>
</html>
```

**Código base JavaScript:**
```javascript
// ============================================
// CLASE TASK (con todo lo del Día 1-3)
// ============================================
class Task {
    constructor(name, delay, shouldFail = false, maxRetries = 3) {
        this.id = Date.now() + Math.random();
        this.name = name;
        this.delay = delay;
        this.shouldFail = shouldFail;
        this.maxRetries = maxRetries;
        this.currentRetry = 0;
        this.status = 'pending';
        this.startTime = null;
        this.endTime = null;
    }

    execute() {
        // TODO: Implementar del Día 1
    }

    executeWithRetry() {
        // TODO: Implementar del Día 3
    }

    getDuration() {
        if (this.startTime && this.endTime) {
            return ((this.endTime - this.startTime) / 1000).toFixed(2);
        }
        return 0;
    }
}

// ============================================
// CLASE TASK QUEUE (con todo lo del Día 2-3)
// ============================================
class TaskQueue {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        // TODO: Implementar
    }

    executeParallel() {
        // TODO: Implementar del Día 2
        // IMPORTANTE: Usar Promise.allSettled (no Promise.all)
        // IMPORTANTE: Usar task.executeWithRetry() (no task.execute())
    }

    executeSequential() {
        // TODO: Implementar del Día 2
        // IMPORTANTE: Usar task.executeWithRetry() (no task.execute())
    }

    getStats() {
        // TODO: Calcular estadísticas
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.status === 'completed').length;
        const failed = this.tasks.filter(t => t.status === 'failed').length;
        
        const durations = this.tasks
            .filter(t => t.endTime)
            .map(t => t.getDuration());
        
        const avgTime = durations.length > 0
            ? (durations.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / durations.length).toFixed(2)
            : 0;

        return { total, completed, failed, avgTime };
    }
}

// ============================================
// CLASE LOGGER
// ============================================
class TaskLogger {
    constructor() {
        this.logs = [];
    }

    log(message, type = 'info') {
        // TODO: Agregar log con timestamp
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = {
            timestamp,
            message,
            type
        };
        
        this.logs.push(logEntry);
        this.renderLog(logEntry);
    }

    renderLog(entry) {
        // TODO: Agregar al DOM
        const container = document.getElementById('log-container');
        const logElement = document.createElement('div');
        logElement.className = `log-entry ${entry.type}`;
        logElement.textContent = `[${entry.timestamp}] ${entry.message}`;
        container.appendChild(logElement);
        container.scrollTop = container.scrollHeight;
    }

    clear() {
        this.logs = [];
        document.getElementById('log-container').innerHTML = '';
    }
}

// ============================================
// INSTANCIAS GLOBALES
// ============================================
const queue = new TaskQueue();
const logger = new TaskLogger();

// ============================================
// FUNCIONES AUXILIARES PARA UI
// ============================================
function createRandomTask() {
    // TODO: Crear task con valores random
    const name = `Tarea ${queue.tasks.length + 1}`;
    const delay = Math.random() * 3000 + 1000;  // 1-4 segundos
    const shouldFail = Math.random() < 0.3;  // 30% de fallo
    
    const task = new Task(name, delay, shouldFail);
    queue.add(task);
    
    logger.log(`Tarea creada: ${name} (${(delay/1000).toFixed(1)}s)`, 'info');
    updateUI();
}

function updateUI() {
    // TODO: Actualizar lista de tareas
    const taskList = document.getElementById('task-list');
    
    if (queue.tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No hay tareas. Crea una para comenzar.</div>';
        return;
    }
    
    taskList.innerHTML = queue.tasks.map(task => `
        <div class="task-item ${task.status}">
            <div>
                <div class="task-name">${task.name}</div>
                <div class="task-status">
                    ${getStatusIcon(task.status)} 
                    ${task.status.toUpperCase()}
                    ${task.currentRetry > 0 ? `(retry ${task.currentRetry}/${task.maxRetries})` : ''}
                </div>
            </div>
            <div>${(task.delay/1000).toFixed(1)}s</div>
        </div>
    `).join('');
    
    // Actualizar estadísticas
    const stats = queue.getStats();
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-completed').textContent = stats.completed;
    document.getElementById('stat-failed').textContent = stats.failed;
    document.getElementById('stat-avg').textContent = stats.avgTime + 's';
}

function getStatusIcon(status) {
    const icons = {
        pending: '⏳',
        running: '▶️',
        completed: '✅',
        failed: '❌'
    };
    return icons[status] || '❓';
}

function executeParallel() {
    // TODO: Ejecutar todas las tareas en paralelo
    logger.log('Iniciando ejecución PARALELA', 'info');
    const startTime = Date.now();
    
    queue.executeParallel()
        .then(() => {
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            logger.log(`Ejecución paralela completada en ${duration}s`, 'success');
        })
        .catch(() => {
            logger.log('Algunas tareas fallaron', 'error');
        });
}

function executeSequential() {
    // TODO: Ejecutar tareas secuencialmente
    logger.log('Iniciando ejecución SECUENCIAL', 'info');
    const startTime = Date.now();
    
    queue.executeSequential()
        .then(() => {
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            logger.log(`Ejecución secuencial completada en ${duration}s`, 'success');
        })
        .catch(() => {
            logger.log('Algunas tareas fallaron', 'error');
        });
}

// Inicializar
logger.log('Sistema iniciado correctamente', 'success');
```

---

## 💡 HINTS GENERALES

### Hint 1: Implementar Task.execute()
```javascript
execute() {
    this.status = 'running';
    this.startTime = Date.now();
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.endTime = Date.now();
            
            // Simular fallo aleatorio o forzado
            const shouldFail = this.shouldFail || Math.random() < 0.3;
            
            if (shouldFail) {
                this.status = 'failed';
                reject(`${this.name} falló`);
            } else {
                this.status = 'completed';
                resolve(`${this.name} completada`);
            }
        }, this.delay);
    });
}
```

### Hint 2: Implementar executeParallel()
```javascript
executeParallel() {
    // IMPORTANTE: Usar Promise.allSettled (NO Promise.all)
    const promises = this.tasks.map(task => 
        task.executeWithRetry()  // IMPORTANTE: executeWithRetry, NO execute
            .then(() => {
                updateUI();
                logger.log(`${task.name} completada`, 'success');
            })
            .catch(() => {
                updateUI();
                logger.log(`${task.name} falló definitivamente`, 'error');
            })
    );
    
    return Promise.allSettled(promises);  // Espera todas aunque fallen
}
```

### Hint 3: Implementar executeSequential()
```javascript
executeSequential() {
    return this.tasks.reduce((promise, task) => {
        return promise.then(() => {
            return task.executeWithRetry()  // IMPORTANTE: executeWithRetry, NO execute
                .then(() => {
                    updateUI();
                    logger.log(`${task.name} completada`, 'success');
                })
                .catch(() => {
                    updateUI();
                    logger.log(`${task.name} falló`, 'error');
                });
        });
    }, Promise.resolve());
}
```

### Hint 4: Implementar executeWithRetry()
```javascript
executeWithRetry() {
    return this.execute()
        .catch((error) => {
            this.currentRetry++;
            
            if (this.currentRetry < this.maxRetries) {
                logger.log(`${this.name} - Reintento ${this.currentRetry}/${this.maxRetries}`, 'warning');
                updateUI();
                return this.executeWithRetry();  // Recursión
            } else {
                throw error;  // Falló definitivamente
            }
        });
}
```

---

## 🎓 CONCEPTOS CLAVE

### 1. Promise.allSettled() vs Promise.all()

**Promise.allSettled() - LO QUE USAMOS EN ESTE PROYECTO:**
```javascript
// Espera TODAS las promises (fallen o no)
Promise.allSettled([task1, task2, task3])
    .then((results) => {
        // SIEMPRE llega acá
        // results = [
        //   { status: 'fulfilled', value: resultado1 },
        //   { status: 'rejected', reason: error2 },
        //   { status: 'fulfilled', value: resultado3 }
        // ]
    });
```

**Promise.all() - NO lo usamos aquí:**
```javascript
// Si UNA falla, TODO falla
Promise.all([task1, task2, task3])
    .then((results) => {
        // Solo llega si TODAS exitosas
    })
    .catch((error) => {
        // Si UNA falla → cae acá
        // Pierde los resultados de las exitosas
    });
```

**Por qué usamos allSettled en este proyecto:**
- Necesitamos estadísticas completas (exitosas + fallidas)
- Una tarea fallida no debe detener las demás
- El logger necesita registrar TODOS los resultados

---

### 2. Recursión con Promises

**Patrón de retry:**
```javascript
function executeWithRetry(maxRetries = 3, currentRetry = 0) {
    return doSomething()
        .catch((error) => {
            if (currentRetry < maxRetries) {
                return executeWithRetry(maxRetries, currentRetry + 1);
            }
            throw error;
        });
}
```

**Por qué funciona:**
- Cada llamada retorna una Promise
- Si falla → retorna `executeWithRetry()` recursivamente
- La cadena espera toda la recursión
- Solo rechaza cuando se agotan reintentos

---

### 3. Observer Pattern Simplificado

**Implementación simple en este proyecto:**
```javascript
task.status = 'running';  // Cambio de estado
updateUI();  // Notificación manual
```

**Implementación avanzada (opcional):**
```javascript
class Task {
    set status(newStatus) {
        this._status = newStatus;
        this.notifyObservers();  // Automático
    }
}
```

En este proyecto usamos la versión simple.

---

## ✅ CHECKLIST FINAL

Antes de dar por terminado el proyecto:

### Funcionalidad:
- [ ] Puedo crear tareas con diferentes configuraciones
- [ ] Ejecutar paralelo funciona (todas al mismo tiempo)
- [ ] Ejecutar secuencial funciona (una tras otra)
- [ ] Retry funciona (máximo 3 reintentos)
- [ ] Logs aparecen en pantalla con timestamps
- [ ] Estadísticas se actualizan correctamente
- [ ] UI se actualiza en tiempo real

### Código:
- [ ] No hay errores en consola
- [ ] Código comentado en partes clave
- [ ] Variables con nombres descriptivos
- [ ] Funciones pequeñas y enfocadas

### Aprendizaje:
- [ ] Entiendo qué hace cada función
- [ ] Puedo explicar cómo funciona el retry
- [ ] Entiendo la diferencia paralelo vs secuencial
- [ ] Reconozco los 4 patterns usados

---

## 💪 GOVERNOR REMINDER

**Límites estrictos:**
- Día 1-2: MVP funcional (80%)
- Día 3: Pulir features principales
- Día 4: UI + Testing
- **NO iterar más de 2 veces**

**Si llegás al Día 4 y funciona al 80% → SUBIR Y AVANZAR**

Funcional > Perfecto que nunca termina.

---

## 🚀 DESPUÉS DE COMPLETAR

**¡Felicitaciones!** Al completar este proyecto habrás:

✅ Construido un sistema funcional de tareas asíncronas  
✅ Implementado retry logic profesional  
✅ Dominado Promise.allSettled() y recursión  
✅ Creado UI interactiva con estadísticas  
✅ Aplicado 4 patterns de producción  

**Nivel alcanzado:** Intermedio-Avanzado en Promises ⭐⭐⭐

---

**FIN DEL DOCUMENTO**

Versión: Definitiva  
Basado en: Primer documento (corregido)  
Cambios: Solo inconsistencias arregladas  
Promise.allSettled: ✅ Consistente  
executeWithRetry: ✅ Consistente  
Código de ejemplo: ✅ Incluido  
Hints prácticos: ✅ Incluidos
