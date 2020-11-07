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

function showPopup(event) {
    event.preventDefault();
    popupE.style.display = 'flex';
}

function closePopup() {
    event.preventDefault();
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
        done: false,
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

function doneTodoItem(id) {
    const index = todoList.findIndex((item) => {
        return item.id == id;
    });
    todoList[index].done = true;
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    populateUI();
}

function populateCurrentDate() {
    let options = { month: 'long', weekday: 'long'};
    const currentDate = new Date();
    currentDateE.innerHTML = `
        <div class="current-date-date">${currentDate.getDate()}</div>
        <div class="current-date-month-year">
            <div class="current-date-month">${currentDate.getMonth()}</div>
            <div class="current-date-year">${currentDate.getFullYear()}</div>
        </div>
        <div class="current-date-time">${currentDate.getHours()}:${currentDate.getMinutes()}</div>
        <div class="current-date-day">${currentDate.getDay()}</div>
    `;
}

function populateTodoItem(item) {
    let done = '';
    if (item.done) done = ' list-item-done';
    const HTML = `
        <li id="${item.id}" class="list-item${done}">
            <div class="list-item-main">
                <div class="list-item-title">${item.title}</div>
                <div class="list-item-description">${item.description}</div>
                <div class="list-item-time">${item.eventDate.getHours()}:${item.eventDate.getMinutes()}</div>
            </div>
            <div class="list-item-secondary">
                <i class="fas fa-check list-item-checkmark"></i>
                <i class="fas fa-trash list-item-delete"></i>
            </div>
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
        }
    });
}

function populateUI() {
    populateCurrentDate();
    populateList();
    loadItemEventListeners();
}

function loadEventListeners() {
    openPopupButtonE.addEventListener('click', showPopup);
    closePopupButtonE.addEventListener('click', closePopup);
    addItemButtonE.addEventListener('click', addTodoItem);
    searchInputE.addEventListener('input', populateUI);
    document.addEventListener('DOMContentLoaded', populateUI);
}

function loadItemEventListeners() {
    todoList.forEach((item) => {
        const liItemE = document.getElementById(item.id);
        const checkmarkE = liItemE.querySelector('.list-item-checkmark');
        const trashE = liItemE.querySelector('.list-item-delete');
        checkmarkE.addEventListener('click', () => doneTodoItem(item.id));
        trashE.addEventListener('click', () => deleteTodoItem(item.id));
    });
}

setInterval(() => {
    populateUI();
}, 10000);

populateUI();
loadEventListeners();
