class TodoApp {
  constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.initElements();
      this.initEventListeners();
      this.render();
  }

  initElements() {
      this.elements = {
          taskInput: document.getElementById('taskInput'),
          addTask: document.getElementById('addTask'),
          taskList: document.getElementById('taskList'),
          prioritySelect: document.getElementById('prioritySelect'),
          dueDate: document.getElementById('dueDate'),
          totalTasks: document.getElementById('totalTasks'),
          completedTasks: document.getElementById('completedTasks'),
          progressFill: document.getElementById('progressFill'),
          emptyState: document.getElementById('emptyState')
      };
  }

  initEventListeners() {
      this.elements.addTask.addEventListener('click', (e) => {
          e.preventDefault();
          this.addTask();
      });

      this.elements.taskInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              e.preventDefault();
              this.addTask();
          }
      });

      this.elements.taskList.addEventListener('click', (e) => {
          if (e.target.closest('.delete-btn')) {
              const taskId = parseInt(e.target.closest('.task-item').dataset.id);
              this.deleteTask(taskId);
          }
          
          if (e.target.matches('input[type="checkbox"]')) {
              const taskId = parseInt(e.target.closest('.task-item').dataset.id);
              this.toggleComplete(taskId);
          }
      });
  }

  addTask() {
      const text = this.elements.taskInput.value.trim();
      if (!text) return;

      const newTask = {
          id: Date.now(),
          text,
          priority: this.elements.prioritySelect.value,
          dueDate: this.elements.dueDate.value || 'No deadline',
          completed: false,
          createdAt: new Date().toISOString()
      };

      this.tasks = [...this.tasks, newTask];
      this.saveTasks();
      this.render();
      this.animateTaskAddition(newTask.id);
      this.clearInputs();
  }

  deleteTask(taskId) {
      const taskElement = document.querySelector(`[data-id="${taskId}"]`);
      if (taskElement) {
          taskElement.classList.add('exiting');
          setTimeout(() => {
              this.tasks = this.tasks.filter(task => task.id !== taskId);
              this.saveTasks();
              this.render();
          }, 300);
      }
  }

  toggleComplete(taskId) {
      this.tasks = this.tasks.map(task => 
          task.id === taskId ? {...task, completed: !task.completed} : task
      );
      this.saveTasks();
      this.render();
      this.animateCheckbox(taskId);
  }

  animateTaskAddition(taskId) {
      const taskElement = document.querySelector(`[data-id="${taskId}"]`);
      if (taskElement) {
          taskElement.animate([
              { transform: 'scale(0.9)', opacity: 0 },
              { transform: 'scale(1)', opacity: 1 }
          ], { duration: 300, easing: 'ease-out' });
      }
  }

  animateCheckbox(taskId) {
      const checkbox = document.querySelector(`[data-id="${taskId}"] input[type="checkbox"]`);
      if (checkbox) {
          checkbox.animate([
              { transform: 'scale(1)' },
              { transform: 'scale(1.2)' },
              { transform: 'scale(1)' }
          ], { duration: 300, easing: 'ease-out' });
      }
  }

  clearInputs() {
      this.elements.taskInput.value = '';
      this.elements.dueDate.value = '';
      this.elements.taskInput.focus();
  }

  saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  render() {
      this.elements.taskList.innerHTML = this.tasks
          .map(task => `
              <li class="task-item" data-id="${task.id}">
                  <input type="checkbox" ${task.completed ? 'checked' : ''}>
                  <div class="task-content">
                      <div class="task-text" style="${task.completed ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
                          ${task.text}
                      </div>
                      <div class="task-meta">
                          <span class="priority-tag priority-${task.priority}">
                              ${task.priority.toUpperCase()}
                          </span>
                          <span class="due-date">
                              <i class="fas fa-calendar-day"></i>
                              ${task.dueDate}
                          </span>
                      </div>
                  </div>
                  <button class="delete-btn">
                      <i class="fas fa-trash"></i>
                  </button>
              </li>
          `).join('');

      this.updateStats();
      this.toggleEmptyState();
  }

  updateStats() {
      const total = this.tasks.length;
      const completed = this.tasks.filter(task => task.completed).length;
      const progress = total > 0 ? (completed / total) * 100 : 0;

      this.elements.totalTasks.textContent = total;
      this.elements.completedTasks.textContent = completed;
      this.elements.progressFill.style.width = `${progress}%`;
  }

  toggleEmptyState() {
      this.elements.emptyState.classList.toggle('visible', this.tasks.length === 0);
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
});