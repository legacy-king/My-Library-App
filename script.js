// ==================== CLASSES ====================

/**
 * Book Class: The blueprint for a book object.
 * This remains largely the same, as it was already a class.
 */
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

/**
 * Library Class: Manages the collection of books (the data).
 * This replaces the simple `myLibrary` array and its associated functions.
 */
class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    this.books.push(newBook);
  }

  removeBook(bookId) {
    this.books = this.books.filter(book => book.id !== bookId);
  }

  findBookById(bookId) {
    return this.books.find(book => book.id === bookId);
  }
}

/**
 * DisplayController Class: Manages everything the user sees.
 * It takes a `library` instance in its constructor (Dependency Injection!).
 * This replaces the old DisplayController IIFE.
 */
class DisplayController {
  constructor(library) {
    this.library = library;
    this.libraryContainer = document.getElementById('library-container');
    this.bookFormDialog = document.getElementById('bookFormDialog');
    this.bookForm = document.getElementById('bookForm');
    this.newBookBtn = document.getElementById('newBookBtn');

    this.bindEvents();
  }

  // A method to set up all event listeners
  bindEvents() {
    this.newBookBtn.addEventListener('click', () => this.bookFormDialog.showModal());

    this.bookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit();
    });

    this.libraryContainer.addEventListener('click', (event) => this.handleBoardClick(event));
  }

  // Renders the entire library to the page
  render() {
    this.libraryContainer.innerHTML = '';

    this.library.books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.dataset.id = book.id;

      bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p>${book.pages} Pages</p>
        <p>Status: ${book.isRead ? "Read" : "Not Read Yet"}</p>
        <button class="toggle-read-btn">Toggle Read</button>
        <button class="remove-btn">Remove</button>
      `;
      this.libraryContainer.appendChild(bookCard);
    });
  }

  handleFormSubmit() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read').checked;

    this.library.addBook(title, author, pages, isRead);
    this.render();

    this.bookForm.reset();
    this.bookFormDialog.close();
  }

  handleBoardClick(event) {
    const bookCard = event.target.closest('.book-card');
    if (!bookCard) return;

    const bookId = bookCard.dataset.id;
    const book = this.library.findBookById(bookId);

    if (event.target.classList.contains('remove-btn')) {
      this.library.removeBook(bookId);
      this.render();
    }

    if (event.target.classList.contains('toggle-read-btn')) {
      book.toggleReadStatus();
      this.render(); // Re-render to show the updated status
    }
  }
}


// ==================== INITIALIZE APP ====================

// The main application logic is now much simpler.
// We create instances of our classes and tie them together.
document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = new Library();
  const display = new DisplayController(myLibrary);

  // Add some initial books for testing
  myLibrary.addBook('The Hobbit', 'J.R.R. Tolkien', 310, false);
  myLibrary.addBook('1984', 'George Orwell', 328, true);

  // Initial render
  display.render();
});