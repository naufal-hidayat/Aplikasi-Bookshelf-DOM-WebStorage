document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});
  
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value, 10);
    const isComplete = document.getElementById('isComplete').checked;
  
    if (title && author && year) {
      const book = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };
  
      saveBook(book);
      loadBooks();
      clearForm();
    }
}
  
function saveBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
  
function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}
  
function loadBooks() {
    const unfinishedShelf = document.getElementById('unfinishedShelf');
    const finishedShelf = document.getElementById('finishedShelf');
  
    unfinishedShelf.innerHTML = '';
    finishedShelf.innerHTML = '';
  
    const books = getBooks();
  
    books.forEach((book) => {
      const bookElement = createBookElement(book);
      if (book.isComplete) {
        finishedShelf.appendChild(bookElement);
      } else {
        unfinishedShelf.appendChild(bookElement);
      }
    });
}
  
function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis: ${book.author}</p>
      <p>Tahun Terbit: ${book.year}</p>
      <button onclick="moveBook(${book.id})">Pindahkan</button>
      <button onclick="openModal(${book.id})">Hapus</button>
    `;
    return bookElement;
}
  
function moveBook(bookId) {
    const books = getBooks();
    const index = books.findIndex((book) => book.id === bookId);
  
    if (index !== -1) {
      books[index].isComplete = !books[index].isComplete;
      localStorage.setItem('books', JSON.stringify(books));
      loadBooks();
    }
}
  
function openModal(bookId) {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'block';
    modal.dataset.bookId = bookId;
}
  
function closeModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
}
  
function deleteBook() {
    const modal = document.getElementById('deleteModal');
    const bookId = modal.dataset.bookId;
    const books = getBooks();
    const index = books.findIndex((book) => book.id === +bookId);
  
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      loadBooks();
      closeModal();
    }
}
  
function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isComplete').checked = false;
}
  
function searchBook() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const books = getBooks();
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm));
    loadFilteredBooks(filteredBooks);
}

function searchBooks() {
    searchBook();
}
  
function loadFilteredBooks(filteredBooks) {
    const unfinishedShelf = document.getElementById('unfinishedShelf');
    const finishedShelf = document.getElementById('finishedShelf');
  
    unfinishedShelf.innerHTML = '';
    finishedShelf.innerHTML = '';
  
    filteredBooks.forEach((book) => {
      const bookElement = createBookElement(book);
      if (book.isComplete) {
        finishedShelf.appendChild(bookElement);
      } else {
        unfinishedShelf.appendChild(bookElement);
      }
    });
}  