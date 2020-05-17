class App {
  constructor() {
    this.$todoInput = document.getElementById('todo-input');
    this.$addForm = document.getElementById('add-form');
    this.$changeTextInput = document.getElementById('change-text-input');
    this.$changeIndexInput = document.getElementById('change-index-input');
    this.$changeForm = document.getElementById('change-form');
    this.$output = document.getElementById('output');
    this.$toggleAll = document.getElementById('toggle-all');

    this.todos = JSON.parse(localStorage.getItem('todos')) || [];

    this.eventListeners();
    this.render();
  }

  eventListeners() {
    this.$addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.$todoInput.value;
      if (text) {
        this.addTodo({ text, isCompleted: false });
      }
      this.$todoInput.value = '';
    });

    this.$changeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const index = this.$changeIndexInput.valueAsNumber;
      const text = this.$changeTextInput.value;
      this.changeTodo(index, text);
      this.$changeIndexInput.value = '';
      this.$changeTextInput.value = '';
    });

    this.$toggleAll.addEventListener('submit', (e) => {
      e.preventDefault();
      this.toggleAll();
    });

    this.$output.addEventListener('click', (e) => {
      const id = Number(e.target.parentNode.id);
      if (e.target.className === 'delete') {
        this.deleteTodo(id);
      }
      if (e.target.className === 'toggle') {
        this.toggleTodo(id);
      }
    });
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.render();
  }

  deleteTodo(index) {
    if (this.todos.length && index + 1 > 0) {
      this.todos.splice(index, 1);
    }
    this.render();
  }

  toggleTodo(index) {
    if (this.todos.length && index + 1 > 0) {
      const todo = this.todos[index];
      todo.isCompleted = !todo.isCompleted;
    }
    this.render();
  }

  changeTodo(index, text) {
    if (this.todos.length) {
      const todo = this.todos[index];
      todo.text = text;
    }
    this.render();
  }

  toggleAll() {
    this.todos.every((todo) => todo.isCompleted)
      ? this.todos.map((todo) => (todo.isCompleted = false))
      : this.todos.map((todo) => (todo.isCompleted = true));
    this.render();
  }

  displayTodos() {
    if (!this.todos.length) {
      this.$output.textContent = 'Your list is empty';
    } else {
      this.$output.innerHTML = this.todos
        .map((todo, index) => {
          return `<li id=${index}>${
            todo.isCompleted
              ? '<span class="check">(x)</span>'
              : '<span class="check">( )</span>'
          } ${
            todo.text
          } <button class="delete">Delete</button><button class="toggle">Toggle</button></li>`;
        })
        .join('');
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  render() {
    this.displayTodos();
    this.saveTodos();
  }
}

new App();
