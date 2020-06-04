//User Interface Variables

const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

//Load event listeners

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  filter.addEventListener('blur', clearFilterInput);
}

//Get the tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    //Create the list element
    const li = document.createElement('li');
    //Add a class name to the li element
    li.className = 'collection-item';
    //Create text node and append it to the li
    li.appendChild(document.createTextNode(task));
    //Create a link element
    const link = document.createElement('a');
    //Add a class name to the link element
    link.className = 'delete-item secondary-content';
    //Add inner html to the link element - Font Awesome Icon
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    //Append the link the li
    li.appendChild(link);

    //Append the list element to the list (ul)
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please, add a task!');
  }

  //Create the list element
  const li = document.createElement('li');
  //Add a class name to the li element
  li.className = 'collection-item';
  //Create text node and append it to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create a link element
  const link = document.createElement('a');
  //Add a class name to the link element
  link.className = 'delete-item secondary-content';
  //Add inner html to the link element - Font Awesome Icon
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  //Append the link the li
  li.appendChild(link);

  //Append the list element to the list (ul)
  taskList.appendChild(li);

  //Store in local Storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear the input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete Task
function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete the task?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.firstChild.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.removeItem('tasks');
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    //Get the content of the first Child - the text node
    const item = task.firstChild.textContent;
    if (item.toLowerCase().includes(text)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function clearFilterInput() {
  filter.value = '';
}
