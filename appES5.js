const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const container = document.querySelector('.container');
const table = document.querySelector('table');
const list = document.querySelector('#book-list');
const filterInput = document.querySelector('#filter');

/* ----- CONSTRUCTORS  ----- */
function Book(title, author, isbn)
{
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

UI.prototype.ShowAlert = function(message, className)
{
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, table);
    setTimeout(function()
    {
        document.querySelector('.alert').remove();
    }, 2000);
}

UI.prototype.AddBookToList = function(book)
{
    const row = document.createElement('tr');
    row.innerHTML =
    `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#/" class='ion-trash-a icon-delete'></a></td>
    `;

    list.appendChild(row);
}

UI.prototype.ClearFields = function()
{
    title.value = '';
    author.value = '';
    isbn.value = '';
}

UI.prototype.DeleteRow = function(target)
{
    if (target.classList.contains('icon-delete'))
    {
        target.parentElement.parentElement.remove();
        return 'success';
    }
}

/* ----- EVENT FUNCTIONS  ----- */
function CreateBook(e)
{
    const book = new Book(title.value, author.value, isbn.value);
    const ui = new UI();

    if (title.value === '' || author.value === '' || isbn.value === '')
        ui.ShowAlert('Please fill all fields', 'error');
    else
    {
        ui.AddBookToList(book);
        ui.ClearFields();
        ui.ShowAlert('Added successfully', 'success');
    }
    e.preventDefault();
}

function FilterBooks(e)
{
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('tbody tr').forEach(function(book)
    {
        const data = book.textContent;
        if (data.toLowerCase().indexOf(text) > -1)
            book.style.display = 'table-row';
        else
            book.style.display = 'none';
    });
}

function RemoveBook(e)
{
    const ui = new UI();
    const result = ui.DeleteRow(e.target);
    if (result === 'success')
        ui.ShowAlert('Removed successfully', 'success');
}

function loadEventListeners()
{
    form.addEventListener('submit', CreateBook);
    filterInput.addEventListener('keyup', FilterBooks);
    list.addEventListener('click', RemoveBook);
}

loadEventListeners();
