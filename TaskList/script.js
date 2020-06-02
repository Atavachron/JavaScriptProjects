//User Interface Variables

const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

//Load event listeners

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
}

//Add Task Function
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

  //Clear the input
  taskInput.value = '';

  e.preventDefault();
}
