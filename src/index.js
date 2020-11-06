import { v4 as uuidv4 } from 'uuid';

let todoList = [];

todoList.push({id: 0, title: 'Test', eventDate: new Date(), checked: false, description: 'Some description text'});

const searchInputE = document.querySelector('.search-input');
const todoE = document.querySelector('.todo-list');
const openPopupButtonE = document.querySelector('.open-popup-button');
const closePopupButtonE = document.querySelector('.close-popup-button');
const addItemButtonE = document.querySelector('.add-item-button');
const popupE = document.querySelector('.popup');
const todoTitleE = document.querySelector('.input-title');
const todoDescriptionE = document.querySelector('.input-description');
const todoTimeHoursE = document.querySelector('.input-time-hours');
const todoTimeMinutesE = document.querySelector('.input-time-minutes');

function filterSearch(title) {
    const searchRE = new RegExp(`^${searchInputE.value.toLowerCase()}.*`, 'gm');
    if (title.toLowerCase().match(searchRE)) return true;
    return false;
}

function showPopup() {
    popupE.style.display = 'flex';
}

function closePopup() {
    popupE.style.display = 'none';
    todoTitleE.value = '';
    todoTimeHoursE.value = '';
    todoTimeMinutesE.value = '';
    todoDescriptionE.value = '';
}

function addTodoItem() {
    const title = todoTitleE.value;
    const description = todoDescriptionE.value;
    const time = new Date();
    time.setHours(Number(todoTimeHoursE.value));
    time.setMinutes(Number(todoTimeMinutesE.value));
    time.setSeconds(0);
    let item = {
        id: uuidv4(),
        title: title,
        eventDate: time,
        checked: false,
        description: description
    };
    todoList.push(item);
    closePopup();
    populateUI();
}

function populateTodoItem(item) {
    let iconHTML = '';
    if (item.checked) {
        iconHTML = '<i class="fas fa-check"></i>';
    }

    return `<li class="list-item"><div><span>Title: ${item.title}</span> <span>${iconHTML} <span>${item.eventDate.toUTCString()}</span><br>${item.description}<div></li>`;
}

function populateList() {
    todoE.innerHTML = '';
    todoList.forEach((item) => {
        if (filterSearch(item.title) == true) {
            todoE.innerHTML += populateTodoItem(item);
        }
    });
}

function populateUI() {
    populateList();
}

function loadEventListeners() {
    openPopupButtonE.addEventListener('click', showPopup);
    closePopupButtonE.addEventListener('click', closePopup);
    addItemButtonE.addEventListener('click', addTodoItem);
    searchInputE.addEventListener('input', populateList);
    document.addEventListener('DOMContentLoaded', populateUI);
}

loadEventListeners();
