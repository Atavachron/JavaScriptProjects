//Create a book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//Create a UI constructor
function UI() {}

//Instantiate a UI object
const ui = new UI();

//Add UI methods to the UI prototype
UI.prototype.addBookToList = function (book) {
  const list = document.querySelector('#book-list');

  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="delete" href="#">X</a></td>
  `;

  list.appendChild(row);
};

UI.prototype.clearInputFields = function () {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Get the input values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //Create an instance of Book
  const book = new Book(title, author, isbn);

  //Call the method from the UI prototype
  ui.addBookToList(book);
  ui.clearInputFields();

  e.preventDefault();
});
