// FIX: Use 'let' because we will re-assign this array when we filter it.
// Also, using lowercase 'myLibrary' is a more common convention.
let myLibrary = [];

// FIX: The class and function definitions must come BEFORE we try to use them.
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  // FIX: Use the consistently named 'myLibrary'
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById("library-container");
  libraryContainer.innerHTML = "";

  // FIX: Use the consistently named 'myLibrary'
  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = book.id;

    // FIX: Added the missing closing quote for the 'remove-btn' class.
    bookCard.innerHTML = `
       <h3>${book.title}</h3>
       <p>by ${book.author}</p>
       <p>${book.pages} Pages</p>
       <p>status: ${book.read ? "Read" : "Not Read Yet"}</p>
       <button class="toggle-read-btn">Toggle Read</button>
       <button class="remove-btn">Remove</button>
       `;
    libraryContainer.appendChild(bookCard);
  });
}

const newBookBtn = document.getElementById("newBookBtn");
const bookFormDialog = document.getElementById("bookFormDialog");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener('click', () => {
  // FIX: Use the correct case for the variable name.
  bookFormDialog.showModal();
});

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, isRead);

  bookForm.reset();
  // FIX: Use the .close() method to close a dialog.
  bookFormDialog.close();
});

const libraryContainer = document.getElementById('library-container');

libraryContainer.addEventListener('click', (event) => {

  // FIX: 'remove-btn' needs to be a string in quotes.
  if (event.target.classList.contains('remove-btn')) {
    const bookCard = event.target.closest('.book-card');
    const bookIdToRemove = bookCard.dataset.id;

    // FIX: Use the correctly named 'myLibrary' and provide the correct
    // function syntax for .filter().
    myLibrary = myLibrary.filter(book => book.id !== bookIdToRemove);

    displayBooks();
  }

  if (event.target.classList.contains('toggle-read-btn')) {
    const bookCard = event.target.closest('.book-card');
    const bookIdToToggle = bookCard.dataset.id;

    // FIX: Use the correctly named 'myLibrary'.
    const bookToToggle = myLibrary.find(book => book.id === bookIdToToggle);

    // Use the function we built into our Book class!
    bookToToggle.toggleReadStatus();

    // Update the display
    displayBooks();
  }
});

// FIX: Move the test calls to the very end, after everything is defined.
// Manually add a couple of books for testing
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('1984', 'George Orwell', 328, true);


