const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const container = document.querySelector('.container');
const table = document.querySelector('table');
const list = document.querySelector('#book-list');
const filterInput = document.querySelector('#filter');


function createBook(e) {
    const book = new Book(title.value, author.value, isbn.value);
    const ui = new UI();
    const storage = new Storage();

    if (title.value === '' || author.value === '' || isbn.value === '') {
        ui.showAlert('Please fill all fields', 'error');
    } else {
        ui.addRowToList(book);
        ui.clearFields();
        ui.showAlert('Added successfully', 'success');
        storage.storeInLS(book);
    }
    e.preventDefault();
}

function filterBooks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('tbody tr').forEach(function(book) {
        const data = book.textContent;
        if (data.toLowerCase().indexOf(text) > -1) {
            book.style.display = 'table-row';
        }
        else {            
            book.style.display = 'none';
        }
    });
}

function removeBook(e) {
    const ui = new UI();
    const storage = new Storage();
    const result = ui.deleteRow(e.target);

    if (result === 'success') {
        ui.showAlert('Removed successfully', 'success');
        storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    }
}

function getBooks(e) {
    let books;
    const ui = new UI();
    const storage = new Storage();

    books = storage.initBooks(books);
    books.forEach(function(book) {
        ui.addRowToList(book);
    });
}

function loadEventListeners() {
    form.addEventListener('submit', createBook);
    filterInput.addEventListener('keyup', filterBooks);
    list.addEventListener('click', removeBook);
    document.addEventListener('DOMContentLoaded', getBooks);
}

loadEventListeners();
