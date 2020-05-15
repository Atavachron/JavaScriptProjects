'use strict';

const todoList = {
  todos: [],

  displayTodos() {
    console.log('My todos: ', this.todos);
  },

  addTodo(todoText) {
    this.todos = [...this.todos, { todoText, isCompleted: false }];
    this.displayTodos();
  },

  changeTodo(index, todoText) {
    let todo = this.todos[index];

    todo = { ...todo, todoText };

    this.updateTodoArray(index, todo);
    this.displayTodos();
  },

  deleteTodo(index) {
    this.updateTodoArray(index);
    this.displayTodos();
  },

  toggleCompleted(index) {
    let todo = this.todos[index];

    todo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    this.updateTodoArray(index, todo);
    this.displayTodos();
  },

  updateTodoArray(index, todo) {
    if (todo) {
      this.todos = [
        ...this.todos.slice(0, index),
        todo,
        ...this.todos.slice(index + 1),
      ];
    } else {
      this.todos = [
        ...this.todos.slice(0, index),
        ...this.todos.slice(index + 1),
      ];
    }
  },
};
