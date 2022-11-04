const container = document.querySelector('.container');
const table = document.querySelector('.books');
const thead = document.querySelector('.thead');
const tbody = document.querySelector('.books').getElementsByTagName('tbody')[0];
const addBook = document.getElementById('add-book');
const modal = document.getElementById('addBook');
const exitModal = document.getElementById('exit-modal');
const darkenDiv = document.querySelector('.darken');
const addBookToLibrary = document.getElementById('submit-book');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookPublished = document.getElementById('published');
const bookAcquired = document.getElementById('acquired');
const bookStatus = document.getElementById('read-status');
const deleteRows = document.querySelectorAll('.delete-svg');
const selectRows = document.querySelectorAll('.tbody-checkboxes');
const selectAllRows = document.querySelector('.select-all');
const deleteAllRows = document.getElementById('delete-all');

//Event Listeners
addBook.addEventListener('click', openModal);
exitModal.addEventListener('click', closeModal);
addBookToLibrary.addEventListener('click', addIndividualBook);
deleteRows.forEach((deleteRow) =>
	deleteRow.addEventListener('click', deleteThisRow)
);
selectRows.forEach((selectRow) =>
	selectRow.addEventListener('click', toggleDelete)
);
selectAllRows.addEventListener('click', selectAll);
deleteAllRows.addEventListener('click', deleteAll);

let myLibrary = [];
let myDeletedBooks = [];

function Book(title, author, pages, published, acquired, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.published = published;
	this.acquired = acquired;
	this.status = status;
}

function createCheckbox() {
	let checkbox = document.createElement('input');

	checkbox.type = 'checkbox';
	checkbox.className = 'checkboxes';

	return checkbox;
}

function createEditFunctions() {
	let cell = document.createElement('div');

	let trash = document.createElement('img');
	trash.setAttribute('src', 'img/delete.svg');
	trash.classList.add('table-svgs');
	trash.classList.add('delete-svg');
	trash.setAttribute('alt', 'Delete SVG');

	let edit = document.createElement('img');
	edit.setAttribute('src', 'img/edit.svg');
	edit.classList.add('table-svgs');
	edit.setAttribute('alt', 'Edit SVG');

	cell.appendChild(trash);
	cell.appendChild(edit);

	return cell;
}

function openModal() {
	modal.style.display = 'block';
	container.style.opacity = '0.5';
}

function closeModal() {
	modal.style.display = 'none';
	container.style.opacity = '1';
}

function addAllBooksToLibrary() {
	// Loop through library
	for (let book of myLibrary) {
		//Create new row in table
		let newRow = tbody.insertRow();

		//Create checkbox for first cell
		let checkbox = createCheckbox();

		//Insert all book data with checkbox and edit functions
		newRow.insertCell().appendChild(checkbox);
		newRow.insertCell().textContent = book.title;
		newRow.insertCell().textContent = book.author;
		newRow.insertCell().textContent = book.pages;
		newRow.insertCell().textContent = book.published;
		newRow.insertCell().textContent = book.acquired;
		newRow.insertCell().textContent = book.status;

		let editFunctions = createEditFunctions();
		newRow.insertCell().appendChild(editFunctions);
	}
}

addAllBooksToLibrary();

function addIndividualBook() {
	//Create new book object
	let newBook = new Book(
		bookTitle.value,
		bookAuthor.value,
		bookPages.value,
		bookPublished.value,
		bookAcquired.value,
		bookStatus.options[bookStatus.selectedIndex].value
	);

	console.log(newBook);

	let newRow = tbody.insertRow();

	//Create checkbox for first cell
	let checkbox = createCheckbox();

	//Insert all book data with checkbox and edit functions
	newRow.insertCell().appendChild(checkbox);
	newRow.insertCell().textContent = newBook.title;
	newRow.insertCell().textContent = newBook.author;
	newRow.insertCell().textContent = newBook.pages;
	newRow.insertCell().textContent = newBook.published;
	newRow.insertCell().textContent = newBook.acquired;
	newRow.insertCell().textContent = newBook.status;

	let editFunctions = createEditFunctions();
	newRow.insertCell().appendChild(editFunctions);

	closeModal();
}

function deleteThisRow(ev) {
	let td = ev.target.parentNode;
	let tr = td.parentNode;

	if (tr.classList.contains('delete')) {
		tr.remove();
	}
}

function toggleDelete(ev) {
	let td = ev.target.parentNode;
	let tr = td.parentNode;

    if (!tr.classList.contains('select-all')) {
	tr.classList.toggle('delete');
    }

    console.log(tr.classList);
}

function selectAll(ev) {
	let rows = tbody.rows;
	const isChecked = selectAllRows.checked;

	for (i = 0; i < rows.length; i++) {
		rows[i].classList.toggle('delete');

		rows[i].querySelector('.tbody-checkboxes').checked = isChecked;
	}
}

function deleteAll(ev) {
	let rows = Array.from(tbody.rows);

	for (let i = 0; i < rows.length; i++) {
        console.log(rows[i]);
		if (rows[i].classList.contains('delete')) {
			rows[i].remove();
		}
	}
}
