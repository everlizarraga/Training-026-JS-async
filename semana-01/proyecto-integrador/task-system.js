// ============================================
// CLASE TASK (con todo lo del Día 1-3)
// ============================================
/**@typedef {'pending'|'running'|'completed'|'failed'} TaskStatus */

class Task {
  constructor(name, delay, shouldFail = false, maxRetries = 3) {
    this.id = Date.now() + Math.random();
    this.name = name;
    this.delay = delay;
    this.shouldFail = shouldFail;
    this.maxRetries = maxRetries;
    this.currentRetry = 0;
    /**@type {TaskStatus} */
    this.status = 'pending';
    this.startTime = null;
    this.endTime = null;
  }

  execute() {
    // TODO: Implementar del Día 1
    this.startTime = Date.now();
    this.status = 'running';
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.endTime = Date.now();
        const falla = this.shouldFail || Math.random() < 0.5;
        if (falla) {
          this.status = 'failed'
          // console.log(`Task[${this.name}] ❌ Falla`);
          reject(`Task[${this.name}] ${this.status}`);
        } else {
          this.status = 'completed'
          // console.log(`Task[${this.name}] ✅ Éxito`);
          resolve(`Task[${this.name}] ${this.status}`);
        }
      }, this.delay);
    });
  }

  executeWithRetry() {
    // TODO: Implementar del Día 3
    let inicio = Date.now();

    const trabjando = () => {
      this.currentRetry += 1;
      return this.execute()
        .then((response) => {
          console.log(`Intento: ${this.currentRetry}/${this.maxRetries}: ${response}`);
          this.startTime = inicio;
          updateUI();
          return (response);
        })
        .catch((error) => {
          console.log(`Intento: ${this.currentRetry}/${this.maxRetries}: ${error}`);
          if (this.currentRetry < this.maxRetries) {
            updateUI();
            return trabjando();
          } else {
            this.startTime = inicio;
            return Promise.reject(`TODOS los intentos Fallaron ❌ ${error}`);
          }
        });
    }
    return trabjando();
  }

  getDuration() {
    if (this.startTime && this.endTime) {
      return ((this.endTime - this.startTime) / 1000).toFixed(2);
    }
    return 0;
  }
}

// Prueba

// const task1 = new Task('Descargar archivo', 2000, false);
// task1.executeWithRetry()
//   .then((rpta) => console.log(rpta))
//   .catch((error) => console.log(error))
//   .then(() => {console.log(`Duracion: ${task1.getDuration()}`)});

// ============================================
// CLASE TASK QUEUE (con todo lo del Día 2-3)
// ============================================
class TaskQueue {
  constructor() {
    /**@type {Task[]} */
    this.tasks = [];
  }

  /**
   * Agregar Task a la Queue
   * @param {Task} task 
   */
  add(task) {
    // TODO: Implementar
    this.tasks.push(task);
  }

  executeParallel() {
    // TODO: Implementar del Día 2
    // IMPORTANTE: Usar Promise.allSettled (no Promise.all)
    // IMPORTANTE: Usar task.executeWithRetry() (no task.execute())
    const listaPromessas = this.tasks.map(task =>
      task.executeWithRetry()
        .then(() => {
          updateUI();
          logger.log(`${task.name} completada`, 'success');
        })
        .catch(() => {
          updateUI();
          logger.log(`${task.name} falló definitivamente`, 'error');
        }));

    return Promise.allSettled(listaPromessas);
  }

  executeSequential() {
    // TODO: Implementar del Día 2
    // IMPORTANTE: Usar task.executeWithRetry() (no task.execute())
    return this.tasks.reduce((promise, task) => {
      return promise.then(() => {
        return task.executeWithRetry()
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

  logger.log(`Tarea creada: ${name} (${(delay / 1000).toFixed(1)}s)`, 'info');
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
            <div>${(task.delay / 1000).toFixed(1)}s</div>
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