document.addEventListener("DOMContentLoaded", () => {

    const myLibrary = [];

    function Book(title = "New Book", author = "Author", pages = "0", read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = () => {
            return `${this.title} ${this.author} ${this.pages} ${this.read}`
        }
        this.toggleRead = () => {
            this.read = !this.read;
            // console.log(this.read);
        }
    }

    function displayBooks() {

        const libraryView = document.getElementById("library-view");
        libraryView.innerHTML = "";

        myLibrary.forEach((book, index) => {
            const bookItem = document.createElement("div");

            bookItem.id = `book-${index}`;
            bookItem.classList.add("book-item");
            bookItem.innerHTML = `
                <h2 class="title">${book.title}</h2>
                <p class="author">${book.author}</p>
                <p class="pages">${book.pages}</p>
                <p class="read ${book.read ? "read-true" : ""}">${book.read ? "Read" : "Not Read"}</p>
                <button data-index="${index}" class="read-book">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
                <button data-index="${index}" class="delete-book">Delete</button>
            `;
        
            libraryView.appendChild(bookItem);
        });

        console.log(myLibrary);

        document.querySelectorAll(".delete-book").forEach( button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                removeBookFromLibrary(index);
            })
        })

        document.querySelectorAll(".read-book").forEach( button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                myLibrary[index].toggleRead();
                displayBooks();
            })
        })
    }

    function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        displayBooks();
    }

    function removeBookFromLibrary(bookIndex) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }

    const openDialogBtn = document.getElementById("add-book-button");
    const addBookDialog = document.getElementById("add-book-dialog");
    const closeDialogBtn = document.getElementById("close-dialog-button");
    const confirmAddBookBtn = document.getElementById("confirm-add-book-button");

    confirmAddBookBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let read = document.getElementById("read").checked;

        // Testing only
        if ( title == "" && author == "" && pages == "" ) {
            title = "Sample Book Title " + myLibrary.length;
            author = "Sample Author";
            pages = "100";
            read = true;
        }

        addBookToLibrary(title, author, pages, read);

    });

    openDialogBtn.addEventListener("click", (e) => {
        addBookDialog.setAttribute("open", true);
    });

    closeDialogBtn.addEventListener("click", (e) => {
        addBookDialog.removeAttribute("open");
    });

});
