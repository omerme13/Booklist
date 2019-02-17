class UI {
    
    showAlert(message, className) {
        const div = document.createElement('div');

        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, table);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    addRowToList(book) {
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

    clearFields() {
        title.value = '';
        author.value = '';
        isbn.value = '';
    }

    deleteRow(target) {
        if (target.classList.contains('icon-delete')) {
            target.parentElement.parentElement.remove();
            return 'success';
        }
    }
}
