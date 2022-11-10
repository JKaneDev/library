class Book {
	constructor(
		title = 'Unknown',
		author = 'Unknown',
		pages = '0',
		published = 'Unknown',
		isRead = false
	) {
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
		this.books = [];
	}

	addBook(newBook) {
		this.books.push(newBook);
	}

	removeBook(title) {
		let books = Array.from(this.books);
		this.books = this.books.filter((book) => book.title !== title);
	}

	getBook(title) {
		let books = Array.from(this.books);
		return (books = books.find((book) => book.title == title));
	}
}

const library = new Library();

//Building library table

const container = document.querySelector('.container');
const table = document.querySelector('.books');
const tbody = document.getElementById('tbody');
const deleteSelected = document.getElementById('delete-selected');
const addBookModal = document.querySelector('.add-book-modal');
const addBookForm = document.getElementById('add-book-to-library');
const addBookBtn = document.getElementById('add-book');
const deleteSelectedBooksBtn = document.getElementById('delete-selected');
const addBookToLibraryBtn = document.getElementById('submit-book');
const exitModalBtn = document.getElementById('exit-modal');

const openAddBookModal = (e) => {
	addBookForm.reset();
	addBookModal.classList.add('active');
	addBookModal.style.display = 'block';
	container.style.opacity = '0.5';
};

const closeAddBookModal = () => {
	addBookForm.classList.remove('active');
	addBookModal.style.display = 'none';
	container.style.opacity = '1';
};

const updateLibrary = () => {
	resetLibrary();
	for (let book of library.books) {
		createRow(book);
	}
};

const resetLibrary = () => {
	tbody.innerHTML = '';
};

const escapeModal = (e) => {
	if (e.key === 'Escape') closeAddBookModal();
};

const createRow = (book) => {
	const checkbox = document.createElement('input');
	const deleteIcon = document.createElement('img');
	const deleteContainer = document.createElement('div');
	const row = tbody.insertRow();
	const checkboxCell = row.insertCell();
	const titleCell = row.insertCell();
	const authorCell = row.insertCell();
	const pagesCell = row.insertCell();
	const publishedCell = row.insertCell();
	const acquiredCell = row.insertCell();
	const statusCell = row.insertCell();
	const toggleStatusBtn = document.createElement('button');
	const deleteCell = row.insertCell();

	checkbox.setAttribute('type', 'checkbox');
	checkbox.classList.add('tbody-checkboxes');
	deleteIcon.setAttribute('src', 'img/delete.svg');
	deleteIcon.classList.add('delete-svg', 'table-svgs');
	deleteIcon.onclick = deleteBook;
	statusCell.classList.add('status-cell');
	toggleStatusBtn.classList.add('toggle-status');
	toggleStatusBtn.onclick = toggleStatus;

	titleCell.textContent = `${book.title}`;
	authorCell.textContent = `${book.author}`;
	pagesCell.textContent = `${book.pages}`;
	publishedCell.textContent = `${book.published}`;
	acquiredCell.textContent = `${book.acquired}`;
	toggleStatusBtn.textContent = `${book.isRead}`;

	if (book.isRead) {
		toggleStatusBtn.textContent = 'Read';
		toggleStatusBtn.classList.add('btn-read-color');
	} else {
		toggleStatusBtn.textContent = 'Unread';
		toggleStatusBtn.classList.add('btn-unread-color');
	}

	checkboxCell.appendChild(checkbox);
	deleteContainer.appendChild(deleteIcon);
	deleteCell.appendChild(deleteContainer);
	statusCell.appendChild(toggleStatusBtn);
};

//Add individual book to library & table modal

const getBookFromModalInput = () => {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = document.getElementById('pages').value;
	const published = document.getElementById('published').value;
	const acquired = document.getElementById('acquired').value;
	const isRead = document.getElementById('status').value;

	return new Book(title, author, pages, published, acquired, isRead);
};

const addBookToLibrary = (e) => {
	e.preventDefault();

	const newBook = getBookFromModalInput();

	library.addBook(newBook);

	updateLibrary();

	closeAddBookModal();

	return;
};

const deleteBook = (e) => {
	const title =
		e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.innerHTML.replaceAll(
			'"',
			''
		);

	library.removeBook(title);
	updateLibrary();
};

const toggleStatus = (e) => {
	const title = e.target.parentNode.parentNode.firstChild.nextSibling.innerText;

	const book = library.getBook(title);

	book.isRead = !book.isRead;
	updateLibrary();
};

const deleteSelectedBooks = (e) => {
	let rows = Array.from(tbody.rows);

	rows.forEach((row) => {
		let title = row.firstChild.nextSibling.innerText;
		let checkbox = row.firstChild.firstChild;
		if (checkbox.checked) library.removeBook(title);
	});
	updateLibrary();
};

addBookBtn.addEventListener('click', openAddBookModal);
exitModalBtn.addEventListener('click', closeAddBookModal);
deleteSelectedBooksBtn.addEventListener('click', deleteSelectedBooks);
addBookForm.addEventListener('submit', addBookToLibrary);
window.onkeydown = escapeModal;

const populateLibrary = () => {
	const theBookOfNotKnowing = {
		title: 'The Book Of Not Knowing',
		author: 'Peter Ralston',
		pages: '601',
		published: '2010-08-31',
		acquired: '2020-08-21',
		isRead: true,
	};

	const fireAndBlood = {
		title: 'Fire & Blood',
		author: 'George R.R Martin',
		pages: '738',
		published: '2018-11-20',
		acquired: '2022-08-21',
		isRead: false,
	};

	const theGeniusOfBeing = {
		title: 'The Genius Of Being',
		author: 'Peter Ralston',
		pages: '207',
		published: '2017-02-28',
		acquired: '2020-12-25',
		isRead: true,
	};

	const theRiseOfTheDragon = {
		title: 'The Rise Of The Dragon',
		author: 'George R.R Martin',
		pages: '350',
		published: '2022-10-25',
		acquired: '2022-11-01',
		isRead: false,
	};

	library.addBook(theBookOfNotKnowing);
	library.addBook(fireAndBlood);
	library.addBook(theGeniusOfBeing);
	library.addBook(theRiseOfTheDragon);

	updateLibrary();
};

populateLibrary();
