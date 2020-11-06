import { v4 as uuidv4 } from 'uuid';

let todoList = [];

todoList.push({id: 0, title: 'Test', eventDate: new Date(), checked: false, description: 'Some description text'});
todoList.push({id: 1, title: 'Works', eventDate: new Date(), checked: true, description: 'This works too!'});

const todoElm = document.querySelector('.todo-list');
const popupElm = document.querySelector('.popup');
const addItemButtonElm = document.querySelector('#add-item-button')
const addPopupButtonElm = document.querySelector('#add-popup-button');
const closePopupElm = document.querySelector('#close-popup-button');
const todoTitleElm = document.querySelector('.input-title');
const todoDescriptionElm = document.querySelector('.input-description');
const todoTimeElm = document.querySelector('.input-time');

function showPopup() {
    popupElm.style.display = 'flex';
    console.log(closePopupElm);
}

function closePopup() {
    popupElm.style.display = 'none';
}

function addTodoItem() {
    const title = todoTitleElm.value;
    const description = todoDescriptionElm.value;
    const time = todoTimeElm.value;
    let item = {
        id: uuidv4(),
        title: title,
        eventDate: time,
        checked: false,
        description: description
    };
    todoList.push(item);
    closePopup();
}

function populateTodoItem(item) {
    let iconHTML = '';
    if (item.checked) {
        iconHTML = '<i class="fas fa-check"></i>';
    }

    return `<li><div><span>Title: ${item.title}</span> <span>${iconHTML} <span>${item.eventDate.toUTCString()}</span><br>${item.description}<div></li>`;
}

function populateList() {
    todoElm.innerHTML = '';
    todoList.forEach((item) => {
        todoElm.innerHTML += populateTodoItem(item);
    });
}

function populateUI() {
    populateList();
}

function loadEventListeners() {
    addItemButtonElm.addEventListener('click', showPopup);
    addPopupButtonElm.addEventListener('click', addTodoItem);
    todoAddButtonElm.addEventListener('click', addTodoItem);
    closePopupElm.addEventListener('click', closePopup);
    document.addEventListener('DOMContentLoaded', populateUI);
}

loadEventListeners();
