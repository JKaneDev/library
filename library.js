const container = document.querySelector('.container');
const table = document.querySelector('.books');
const thead = document.querySelector('.thead');
const tbody = document.querySelector('.books').getElementsByTagName('tbody')[0];
const addBook = document.getElementById('add-book');
const modal = document.getElementById('addBook');
const modalEdit = document.getElementById('edit-book');

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
const editTitle = document.getElementById('edit-title');
const editAuthor = document.getElementById('edit-author');
const editPages = document.getElementById('edit-pages');
const editPublished = document.getElementById('edit-published');
const editAcquired = document.getElementById('edit-acquired');
const editStatus = document.getElementById('edit-status');

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
	const theBookOfNotKnowing = new Book(
		'The Book Of Not Knowing',
		'Peter Ralston',
		'601',
		'2010-08-21',
		'2020-10-10',
		'Read'
	);
	const fireAndBlood = new Book(
		'Fire & Blood',
		'George R.R Martin',
		'738',
		'2018-11-20',
		'2022-10-18',
		'Not Read'
	);
	const theGeniusOfBeing = new Book(
		'The Genius Of Being',
		'Peter Ralston',
		'207',
		'2017-02-28',
		'2020-08-21',
		'Read'
	);
	const theRiseOfTheDragon = new Book(
		'The Rise Of The Dragon',
		'George R.R Martin',
		'350',
		'2022-10-25',
		'2022-10-27',
		'Not Read'
	);

	myLibrary.push(
		theBookOfNotKnowing,
		fireAndBlood,
		theGeniusOfBeing,
		theRiseOfTheDragon
	);
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

	edit.addEventListener('click', editBook);

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

		//Create checkbox for first cell
		let checkbox = createCheckbox();

		//Insert all book data with checkbox and edit functions
		newRow.insertCell().appendChild(checkbox);

		//Creating and dding each cell, giving relevant class name and content

		let titleCell = newRow.insertCell();
		titleCell.textContent = book.title;
		titleCell.classList.add(`${book.title.toLowerCase().split(' ').join('-')}`);

		let authorCell = newRow.insertCell();
		authorCell.textContent = book.author;
		authorCell.classList.add(
			`${book.author.toLowerCase().split(' ').join('-')}`
		);

		let pagesCell = newRow.insertCell();
		pagesCell.textContent = book.pages;
		pagesCell.classList.add(`${book.pages.toLowerCase().split(' ').join('-')}`);

		let publishedCell = newRow.insertCell();
		publishedCell.textContent = book.published;
		publishedCell.classList.add(
			`${book.published.toLowerCase().split(' ').join('-')}`
		);

		let acquiredCell = newRow.insertCell();
		acquiredCell.textContent = book.acquired;
		acquiredCell.classList.add(
			`${book.acquired.toLowerCase().split(' ').join('-')}`
		);

		let statusCell = newRow.insertCell();
		statusCell.textContent = book.status;
		statusCell.classList.add(
			`${book.status.toLowerCase().split(' ').join('-')}`
		);

		let editFunctions = createEditFunctions();
		newRow.insertCell().appendChild(editFunctions);
	}

	// enumeratorForEditSVG();
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

	let titleCell = newRow.insertCell();
	titleCell.textContent = newBook.title;
	titleCell.classList.add(
		`${newBook.title.toLowerCase().split(' ').join('-')}`
	);

	let authorCell = newRow.insertCell();
	authorCell.textContent = newBook.author;
	authorCell.classList.add(
		`${newBook.author.toLowerCase().split(' ').join('-')}`
	);

	let pagesCell = newRow.insertCell();
	pagesCell.textContent = newBook.pages;
	pagesCell.classList.add(
		`${newBook.pages.toLowerCase().split(' ').join('-')}`
	);

	let publishedCell = newRow.insertCell();
	publishedCell.textContent = newBook.published;
	publishedCell.classList.add(
		`${newBook.published.toLowerCase().split(' ').join('-')}`
	);

	let acquiredCell = newRow.insertCell();
	acquiredCell.textContent = newBook.acquired;
	acquiredCell.classList.add(
		`${newBook.acquired.toLowerCase().split(' ').join('-')}`
	);

	let statusCell = newRow.insertCell();
	statusCell.textContent = newBook.status;
	statusCell.classList.add(
		`${newBook.status.toLowerCase().split(' ').join('-')}`
	);

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

	let editContainer = ev.target.parentNode;
	let td = editContainer.parentNode;
	let tr = td.parentNode;

	let thisBook = myLibrary.find(
		(book) => tr.querySelector('tr :nth-child(2)').textContent
	);

	let thisModal = {
		title: thisBook.title,
		author: thisBook.author,
		pages: thisBook.pages,
		published: thisBook.published,
		acquired: thisBook.acquired,
		status: thisBook.status,
	};

	editTitle.setAttribute('placeholder', `${thisBook.title}`);
	editAuthor.setAttribute('placeholder', `${thisBook.author}`);
	editPages.setAttribute('placeholder', `${thisBook.pages}`);
	editPublished.setAttribute('value', `${thisBook.published}`);
	editAcquired.setAttribute('value', `${thisBook.acquired}`);
	// editStatus.options[bookStatus.selectedIndex].value = `${thisBook.status}`;

	console.log(ev.target.id);
}

// function enumeratorForEditSVG() {
// 	let count = 0;
// 	for (let i in tbody.rows) {
// 		let row = tbody.rows[i];
// 		count++;
// 		let thisSVG = row.querySelector('.edit-svg');
// 		thisSVG.setAttribute('id', `${count}`);
// 		thisSVG.addEventListener('click', editBook);
// 	}
// }
