class Book {

	constructor (

		title = 'Unknown',
		author = 'Unknown',
		pages = '0',
		published = 'Unknown',
		isRead = false)

		{
			this.title = title;
			this.author = author;
			this.pages = pages;
			this.published = published;
			this.acquired = acquired;
			this.isRead = isRead;
		}

}


class Library {

	constructor() {
		this.books = []
	}

	addBook(newBook) {
		this.books.push(newBook);
	}

	removeBook(title) {
		this.books = this.books.filter(book => book.title !== title);
	}

	getBook(title) {
		this.books = this.books.find(book => book.title === title);
	}

}

const library = new Library();

//Building table

const table = document.getElementsByClassName('books');
const tbody = document.getElementById('tbody');
const deleteSelected = document.getElementById('delete-selected');
const addBook = document.getElementsByClassName('add-book-modal');

