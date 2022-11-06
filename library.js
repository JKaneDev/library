const container = document.querySelector('.container');
const table = document.querySelector('.books');
const thead = document.querySelector('.thead');
const tbody = document.querySelector('.books').getElementsByTagName('tbody')[0];
const addBook = document.getElementById('add-book');
const modal = document.getElementById('addBook');
const modalEdit = document.getElementById('edit-book');
const rowEdit = document.querySelector('.edit-svg');
const exitModal = document.getElementById('exit-modal');
const exitEditModal = document.getElementById('exit-edit-modal');
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
rowEdit.addEventListener('click', editBook);
exitModal.addEventListener('click', closeModal);
exitEditModal.addEventListener('click', closeEditModal);

let myLibrary = [];
let myDeletedBooks = [];

addAllBooksToLibrary();

function Book(title, author, pages, published, acquired, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.published = published;
	this.acquired = acquired;
	this.status = status;
}

function populateLibrary() {
	const theBookOfNotKnowing = new Book('The Book Of Not Knowing', 'Peter Ralston', '601', '21/08/2010', '10/10/2020', 'Read');
	const fireAndBlood = new Book('Fire & Blood', 'George R.R Martin', '738', '20/11/2018', '18/10/2022', 'Not Read');
	const theGeniusOfBeing = new Book('The Genius Of Being', 'Peter Ralston', '207', '28/02/2017', '21/08/2020', 'Read');
	const theRiseOfTheDragon = new Book('The Rise Of The Dragon', 'George R.R Martin', '350', '25/10/2022', '27/10/2022', 'Not Read');

	myLibrary.push(theBookOfNotKnowing, fireAndBlood, theGeniusOfBeing, theRiseOfTheDragon);
}

function createCheckbox() {
	let checkbox = document.createElement('input');

	checkbox.type = 'checkbox';
	checkbox.className = 'tbody-checkboxes';

	return checkbox;
}

function createEditFunctions() {
	let cell = document.createElement('div');

	let trash = document.createElement('img');
	trash.setAttribute('src', 'img/delete.svg');
	trash.classList.add('table-svgs');
	trash.classList.add('delete-svg');
	trash.setAttribute('alt', 'Delete SVG');
	trash.addEventListener('click', (ev) => {
		let iconContainer = ev.target.parentNode;
		let td = iconContainer.parentNode;
		let tr = td.parentNode;
		tr.remove();
	});

	let edit = document.createElement('img');
	edit.setAttribute('src', 'img/edit.svg');
	edit.classList.add('table-svgs');
	edit.classList.add('edit-svg');
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

function closeEditModal() {
	modalEdit.style.display = 'none';
	container.style.opacity = '1';
}

function addAllBooksToLibrary() {
	// Loop through library

	populateLibrary();

	for (let book of myLibrary) {
		//Create new row in table
		let newRow = tbody.insertRow();
		newRow.classList.add(`${book.title.split(' ').join('-').toLowerCase()}`);

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
	newRow.classList.add(`${newBook.title.toLowerCase().split(' ').join('-')}`);

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

	myLibrary.push(newBook);
	console.log(myLibrary);
	console.log(tbody);
	console.log(newRow.classList);
}

function deleteThisRow(ev) {
	let td = ev.target.parentNode;
	let tr = td.parentNode;

	tr.remove();
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

	console.log(myLibrary);
}

function editBook(ev) {
	modalEdit.style.display = 'block';
	container.style.opacity = '0.5';

	
}
