class Book {
	constructor(
		title = 'Unknown',
		author = 'Unknown',
		pages = '0',
		published = 'Unknown',
		acquired = 'Unknown',
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
		this.deletedBooks = [];
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

	getTotalBooks() {
		let total = this.books.length;
		return total;
	}

	getTotalPagesRead() {
		let total = 0;
		let books = this.books;
		books.forEach((book) => (total += parseInt(book.pages)));
		return total;
	}

	getTotalUniqueAuthors() {
		let total;
		let uniqueAuthors = [];
		let books = this.books;

		for (let i = 0; i < books.length; i++) {
			if (!uniqueAuthors.includes(books[i].author)) {
				uniqueAuthors.push(books[i].author);
			}
			total = uniqueAuthors.length;
		}
		if (total > 0) return total; else return 0;
	}

	getTotalReadBooks() {
		let total = 0;
		let books = this.books;

		for (let i = 0; i < books.length; i++) {
			if (books[i].isRead) {
				total++;
			}
		}
		return total; 
	}

	getTotalUnreadBooks() {
		let total = 0;
		let books = this.books;

		for (let i = 0; i < books.length; i++) {
			if (!books[i].isRead) {
				total++;
			}
		}
		return total; 
	}

	getTotalDeletedBooks() {
		let total = this.deletedBooks.length;
		return total;
	}

	pushToDeleted(title) {
		let book = this.getBook(title);
		this.deletedBooks.push(book);
	}


	sortLibrary(e, property) {
		library.books.sort((a, b) => (a[property] > b[property] ? 1 : -1));

		const sortBy = e.target;

		if (sortBy.classList.contains('asc')) {
			sortBy.classList.remove('asc');
			sortBy.classList.add('desc');
			library.books.reverse();
		} else if (sortBy.classList.contains('desc')) {
			sortBy.classList.remove('desc');
			sortBy.classList.add('asc');
		} else {
			for (let i = 0; i < sortByLinks.length; i++) {
				sortByLinks[i].classList.remove('asc');
				sortByLinks[i].classList.remove('desc');
			}

			sortBy.classList.add('asc');
		}

		updateLibrary();
	}

}

const library = new Library();

//Building library table

const container = document.querySelector('.container');
const gitHub = document.getElementById('github-svg');
const refresh = document.getElementById('refresh-svg');
const table = document.querySelector('.books');
const selectAll = document.querySelector('.select-all');
const theadTitle = document.getElementById('sort-by-title');
const theadAuthor = document.getElementById('sort-by-author');
const theadPages = document.getElementById('sort-by-pages');
const theadPublished = document.getElementById('sort-by-published');
const theadAcquired = document.getElementById('sort-by-acquired');
const sortByLinks = document.querySelectorAll('.thead-sort');
const tbody = document.getElementById('tbody');
const addBookModal = document.querySelector('.add-book-modal');
const addBookForm = document.getElementById('add-book-to-library');
const addBookBtn = document.getElementById('add-book');
const deleteSelectedBooksBtn = document.getElementById('delete-selected');
const addBookToLibraryBtn = document.getElementById('submit-book');
const exitModalBtn = document.getElementById('exit-modal');

const reloadPage = () => {
	window.location.reload();
}

const openRepo = (e) => {
	window.location.href = 'https://github.com/JamesKane00/library';
}

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
	updateStats();
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
	} else {
		toggleStatusBtn.textContent = 'Unread';
	}

	checkboxCell.appendChild(checkbox);
	deleteContainer.appendChild(deleteIcon);
	deleteCell.appendChild(deleteContainer);
	statusCell.appendChild(toggleStatusBtn);
};

const deleteBook = (e) => {
	const title =
		e.target.parentNode.parentNode.parentNode.firstChild.nextSibling.innerText;

	library.pushToDeleted(title);
	library.removeBook(title);

	updateLibrary();
	updateStats();
};

const toggleStatus = (e) => {
	const title = e.target.parentNode.parentNode.firstChild.nextSibling.innerText;

	const book = library.getBook(title);

	book.isRead = !book.isRead;
	updateLibrary();
	updateStats();
};

//Add individual book to library, add book modal

const getBookFromModalInput = () => {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = document.getElementById('pages').value;
	const published = document.getElementById('published').value;
	const acquired = document.getElementById('acquired').value;
	let isRead = document.getElementById('read-status').value;

	if (isRead === 'Read') isRead = true;
	else if (isRead === 'Unread') isRead = false;

	return new Book(title, author, pages, published, acquired, isRead);
};

const addBookToLibrary = (e) => {
	e.preventDefault();

	const newBook = getBookFromModalInput();

	library.addBook(newBook);

	console.table(library.books);

	updateLibrary();

	closeAddBookModal();

	return;
};

const deleteSelectedBooks = (e) => {
	let rows = Array.from(tbody.rows);

	rows.forEach((row) => {
		let title = row.firstChild.nextSibling.innerText;
		let checkbox = row.firstChild.firstChild;
		library.pushToDeleted(title);
		if (checkbox.checked) library.removeBook(title);
	});
	updateLibrary();
};

const selectAllBooks = (e) => {
	let rows = tbody.rows;
	const isChecked = selectAll.checked;

	for (let i = 0; i < rows.length; i++) {
		rows[i].querySelector('.tbody-checkboxes').checked = isChecked;
	}
};

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

//Library statistics

const totalBooks = document.querySelector('.total-books');
const totalPages = document.querySelector('.total-pages');
const uniqueAuthors = document.querySelector('.unique-authors');
const readBooksTotal = document.querySelector('.read-books');
const unreadBooksTotal = document.querySelector('.unread-books');
const deletedBooksTotal = document.querySelector('.deleted-books');

const updateStats = () => {
	totalBooks.value = library.getTotalBooks();
	totalPages.value = library.getTotalPagesRead();
	uniqueAuthors.value = library.getTotalUniqueAuthors();
	readBooksTotal.value = library.getTotalReadBooks();
	unreadBooksTotal.value = library.getTotalUnreadBooks();
	deletedBooksTotal.value = library.getTotalDeletedBooks();
};

//Event Listeners
refresh.addEventListener('click', reloadPage);
gitHub.addEventListener('click', openRepo)
addBookBtn.addEventListener('click', openAddBookModal);
exitModalBtn.addEventListener('click', closeAddBookModal);
selectAll.addEventListener('click', selectAllBooks);
sortByLinks.forEach((sortByLink) => {
	sortByLink.addEventListener('click', (e) => {
		const property = e.target.innerText.toLowerCase();
		library.sortLibrary(e, property);
	});
});
deleteSelectedBooksBtn.addEventListener('click', deleteSelectedBooks);
addBookForm.addEventListener('submit', addBookToLibrary);
window.onkeydown = escapeModal;

populateLibrary();
updateStats();