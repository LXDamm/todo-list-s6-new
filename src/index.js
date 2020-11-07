import { v4 as uuidv4 } from 'uuid';

let todoList = [];

const searchInputE = document.querySelector('.search-input');
const currentDateE = document.querySelector('.current-date');
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
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    closePopup();
    populateUI();
}

function deleteTodoItem(id) {
    const index = todoList.findIndex((item) => {
        return item.id == id;
    });
    todoList.splice(index, 1);
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    populateUI();
}

function populateCurrentDate() {
    const currentDate = new Date();
    currentDateE.innerHTML = `
        <div class="current-date-date">${currentDate.getDate()}</div>
        <div class="current-date-month">${currentDate.getMonth()}</div>
        <div class="current-date-time">${currentDate.getHours()}:${currentDate.getMinutes()}</div>
        <div class="current-date-year">${currentDate.getFullYear()}</div>
        <div class="current-date-day">${currentDate.getDay()}</div>
    `;
}

function populateTodoItem(item) {
    let done = '';
    let iconHTML = '';
    if (item.checked) {
        done = ' list-item-done';
        iconHTML = '<i class="fas fa-check list-item-checked"></i>';
    }
    const HTML = `
        <li id="${item.id}" class="list-item${done}">
            <div class="list-item-title">${item.title}</div>
            <div class="list-item-description">${item.description}</div>
            <div class="list-item-time">${item.eventDate.getHours()}:${item.eventDate.getMinutes()}</div>
            ${iconHTML}
            <i class="fas fa-trash list-item-delete"></i>
        </li>
    `;
    return HTML;
}

function populateList() {
    todoE.innerHTML = '';
    todoList = JSON.parse(localStorage.getItem('todo-list'));
    todoList.forEach((item) => {
        if (filterSearch(item.title) == true) {
            item.eventDate = new Date(item.eventDate);
            todoE.innerHTML += populateTodoItem(item);
            const liItemE = document.getElementById(item.id);
            const trashE = liItemE.querySelector('.list-item-delete');
            trashE.addEventListener('click', () => {
                let id = item.id;
                deleteTodoItem(id);
            });
        }
    });
}

function populateUI() {
    populateCurrentDate();
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