document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            return `${this.title} ${this.author} ${this.pages} ${this.read}`
        }
    }

    function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        const bookIndex = myLibrary.indexOf(newBook) + 1;

        const libraryView = document.getElementById("library-view");
        const bookItem = document.createElement("div");
        bookItem.setAttribute("class", "book-item");
        bookItem.setAttribute("id", `book-${myLibrary.length}`);

        const titleItem = document.createElement("h2");
        titleItem.setAttribute("class", "title");
        titleItem.textContent = title;

        const authorItem = document.createElement("p");
        authorItem.setAttribute("class", "author");
        authorItem.textContent = author;

        const pagesItem = document.createElement("p");
        pagesItem.setAttribute("class", "pages");
        pagesItem.textContent = pages;

        const readItem = document.createElement("p");
        readItem.setAttribute("class", "read");
        readItem.textContent = read ? "Read" : "Not Read";

        const readButton = document.createElement("button");
        readButton.setAttribute("id", `read-book-${bookIndex}`);
        readButton.textContent = read ? "Mark as Unread" : "Mark as Read";

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", `delete-book-${bookIndex}`);
        deleteButton.textContent = "Delete";

        bookItem.appendChild(titleItem);
        bookItem.appendChild(authorItem);
        bookItem.appendChild(pagesItem);
        bookItem.appendChild(readItem);
        bookItem.appendChild(readButton);
        bookItem.appendChild(deleteButton);

        libraryView.appendChild(bookItem);
        console.log(myLibrary);

        deleteButton.addEventListener("click", () => {
            if (bookIndex > -1) {
                myLibrary.splice(bookIndex, 1);
            }
            libraryView.removeChild(bookItem);
            console.log(myLibrary);
        })

        readButton.addEventListener("click", () => {
            newBook.read = !newBook.read;
            readItem.textContent = newBook.read ? "Read" : "Not Read";
            readButton.textContent = newBook.read ? "Mark as Unread" : "Mark as Read";
            console.log(newBook);
        });

    }

    const addBookDialog = document.getElementById("add-book-dialog");
    const closeDialog = document.getElementById("close-dialog");
    const addBookBtn = document.getElementById("add-book");
    const confirmAddBookBtn = document.getElementById("confirm-add-book");

    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");

    // Testing only
    const dummyTitle = "Sample Book Title " + parseInt(myLibrary.length + 1);
    const dummyAuthor = "Sample Author";
    const dummyPages = "100";

    // Add a dummy book to the library
    addBookToLibrary(dummyTitle, dummyAuthor, dummyPages, true);

    // Testing only
    titleInput.value = "Sample Book Title " + parseInt(myLibrary.length + 1);
    authorInput.value = dummyAuthor;
    pagesInput.value = dummyPages;

    addBookDialog.toggleAttribute("open");

    addBookBtn.addEventListener("click", (e) => {
        addBookDialog.toggleAttribute("open");
    });

    closeDialog.addEventListener("click", (e) => {
        addBookDialog.toggleAttribute("open");
    });

    confirmAddBookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;

        addBookToLibrary(title, author, pages, read);
        
        // For testing only
        titleInput.value = "Sample Book Title " + parseInt(myLibrary.length + 1);
    });

});
