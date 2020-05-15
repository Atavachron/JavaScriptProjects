'use strict';

const $displayButton = document.getElementById('display-btn');
const $toggleButton = document.getElementById('toggle-btn');

const todoList = {
  todos: [],

  displayTodos() {
    if (this.todos.length) {
      console.log('My todos:');
      this.todos.forEach((todo) => {
        todo.isCompleted
          ? console.log(`(X) ${todo.todoText}`)
          : console.log(`( ) ${todo.todoText}`);
      });
    } else {
      console.log('Your list is empty.');
    }
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

  toggleAll() {
    if (this.todos.every((todo) => todo.isCompleted)) {
      this.todos = this.todos.map((todo) => ({ ...todo, isCompleted: false }));
    } else {
      this.todos = this.todos.map((todo) => ({ ...todo, isCompleted: true }));
    }
    this.displayTodos();
  },
};

$displayButton.addEventListener('click', () => {
  todoList.displayTodos();
});

$toggleButton.addEventListener('click', () => {
  todoList.toggleAll();
});
