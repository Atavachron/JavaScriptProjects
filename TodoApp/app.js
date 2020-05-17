'use strict';

const $toggleButton = document.getElementById('toggle-btn');
const $addButton = document.getElementById('add-todo');
const $todoInput = document.getElementById('todo-input');
const $changeButton = document.getElementById('change-todo');
const $changeIndex = document.getElementById('change-todo-index');
const $changeInput = document.getElementById('change-todo-input');
const $toggleOneButton = document.getElementById('toggle-todo');
const $toggleOneIndex = document.getElementById('toggle-todo-index');
const $todosUl = document.getElementById('output');

const todoList = {
  todos: [],

  addTodo(todoText) {
    this.todos = [...this.todos, { todoText, isCompleted: false }];
  },

  changeTodo(index, todoText) {
    let todo = this.todos[index];

    todo = { ...todo, todoText };

    this.updateTodoArray(index, todo);
  },

  deleteTodo(index) {
    this.updateTodoArray(index);
  },

  toggleCompleted(index) {
    let todo = this.todos[index];

    todo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    this.updateTodoArray(index, todo);
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
  },
};

const view = {
  displayTodos() {
    let $output = document.getElementById('output');
    $output.innerHTML = todoList.todos
      .map(
        (todo, index) =>
          `<li id="${index}">${todo.isCompleted ? '(x)' : '( )'} ${
            todo.todoText
          }<button class="delete-button">Delete</button></li>`
      )
      .join('');
  },
};

//Event Handlers

$toggleButton.addEventListener('click', () => {
  todoList.toggleAll();
  view.displayTodos();
});

$addButton.addEventListener('click', (e) => {
  e.preventDefault();
  if ($todoInput.value) {
    todoList.addTodo($todoInput.value);
    $todoInput.value = '';
  }
  view.displayTodos();
});

$changeButton.addEventListener('click', (e) => {
  e.preventDefault();
  todoList.changeTodo($changeIndex.valueAsNumber, $changeInput.value);
  $changeIndex.value = '';
  $changeInput.value = '';
  view.displayTodos();
});

$toggleOneButton.addEventListener('click', (e) => {
  e.preventDefault();
  todoList.toggleCompleted($toggleOneIndex.valueAsNumber);
  $toggleOneIndex.value = '';
  view.displayTodos();
});

$todosUl.addEventListener('click', (e) => {
  if (e.target.className === 'delete-button') {
    todoList.deleteTodo(Number(e.target.parentElement.id));
    view.displayTodos();
  }
});
