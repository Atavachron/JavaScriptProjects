//Create a book Class

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Create a UI class

class UI {
  addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a class="delete" href="#">X</a></td>
    `;

    list.appendChild(row);
  }

  clearInputFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  showAlert(msg, className) {
    //Create a new element where the alert will be displayed
    const div = document.createElement('p');
    //Give a class name to the div
    div.className = `alert ${className}`;
    //Create a text node and append to the div
    div.appendChild(document.createTextNode(msg));
    //Insert the div into the DOM
    const form = document.querySelector('#book-form');
    form.insertAdjacentElement('beforebegin', div);

    //Remove the alert after a time out
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }
}

//Instantiate a UI object
const ui = new UI();

document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Get the input values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //Create an instance of Book
  const book = new Book(title, author, isbn);

  //Call the method from the UI prototype
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please make sure all fields are filled', 'error');
  } else {
    ui.addBookToList(book);
    ui.clearInputFields();
    ui.showAlert('Book added', 'success');
  }

  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    ui.deleteBook(e.target);
    ui.showAlert('Book deleted', 'success');
  }
  e.preventDefault();
});
