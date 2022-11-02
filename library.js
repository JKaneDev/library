const container = document.querySelector('.container');
const table = document.querySelector('.books');
const tbody = document.querySelector('.books').getElementsByTagName('tbody')[0];
const addBook = document.getElementById('add-book');
const modal = document.getElementById('addBook');
const exitModal = document.getElementById('exit-modal');
const darkenDiv = document.querySelector('.darken');

//Event Listeners
addBook.addEventListener('click', openModal);
exitModal.addEventListener('click', closeModal);


let myLibrary = [];

function Book(title, author, pages, published, acquired, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.acquired = acquired;
    this.status = status;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '310', '20/04/2009', '21/10/2016', 'Read');
myLibrary.push(theHobbit);

function createCheckbox() {
    let checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.className = 'checkboxes'; 

    return checkbox;
}

function createEditFunctions() {
    let cell = document.createElement('div')

    let trash = document.createElement('img');
    trash.setAttribute('src', 'img/delete.svg');
    trash.classList.add('table-svgs');
    trash.setAttribute('alt', 'Delete SVG');

    let edit = document.createElement('img');
    edit.setAttribute('src', 'img/edit.svg');
    edit.classList.add('table-svgs');
    edit.setAttribute('alt', 'Edit SVG');

    cell.appendChild(trash);
    cell.appendChild(edit);
    
    return cell;
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


function openModal() {
    modal.style.display = 'block';
    container.style.opacity = '0.5';
}

function closeModal() {
    modal.style.display = 'none';
    container.style.opacity = '1';
}