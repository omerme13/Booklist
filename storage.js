class Storage {

    initBooks(books) {
        if (localStorage.getItem('books') === null) {
            return books = [];
        } else {
            return books = JSON.parse(localStorage.getItem('books'));
        }
    }

    removeBook(isbn) {
        let books;

        books = this.initBooks(books);
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {                
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

    storeInLS(book) {
        let books;

        books = this.initBooks(books);
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
}
