const todoList = {
  todos: [],

  displayTodos() {
    console.log('My todos: ', this.todos);
  },

  addTodo(todo) {
    this.todos = [...this.todos, todo];
    this.displayTodos();
  },

  changeTodo(index, newValue) {
    this.todos = [
      ...this.todos.slice(0, index),
      newValue,
      ...this.todos.slice(index + 1),
    ];
    this.displayTodos();
  },

  deleteTodo(index) {
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index + 1),
    ];
    this.displayTodos();
  },
};
