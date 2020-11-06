import { v4 as uuidv4 } from 'uuid';

let todoList = [];

todoList.push({id: 0, title: 'Test', eventDate: new Date(), checked: false, description: 'Some description text'});

const todoElm = document.querySelector('.todo-list');
const openPopupButtonElm = document.querySelector('.open-popup-button');
const closePopupButtonElm = document.querySelector('.close-popup-button');
const addItemButtonElm = document.querySelector('.add-item-button');
const popupElm = document.querySelector('.popup');
const todoTitleElm = document.querySelector('.input-title');
const todoDescriptionElm = document.querySelector('.input-description');
const todoTimeHoursElm = document.querySelector('.input-time-hours');
const todoTimeMinutesElm = document.querySelector('.input-time-minutes');

function showPopup() {
    popupElm.style.display = 'flex';
}

function closePopup() {
    popupElm.style.display = 'none';
    todoTitleElm.value = 'Title';
    todoTimeHoursElm.value = 'Hours';
    todoTimeMinutesElm.value = 'Minutes';
    todoDescriptionElm.value = 'Description';
}

function addTodoItem() {
    const title = todoTitleElm.value;
    const description = todoDescriptionElm.value;
    const time = new Date();
    time.setHours(Number(todoTimeHoursElm.value));
    time.setMinutes(Number(todoTimeMinutesElm.value));
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
    todoElm.innerHTML = '';
    todoList.forEach((item) => {
        todoElm.innerHTML += populateTodoItem(item);
    });
}

function populateUI() {
    populateList();
}

function loadEventListeners() {
    openPopupButtonElm.addEventListener('click', showPopup);
    closePopupButtonElm.addEventListener('click', closePopup);
    addItemButtonElm.addEventListener('click', addTodoItem);
    document.addEventListener('DOMContentLoaded', populateUI);
}

loadEventListeners();
