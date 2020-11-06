let todoList = [];

todoList.push({id: 0, title: 'Test', eventDate: new Date(), description: 'Some description text'});
todoList.push({id: 1, title: 'Works', eventDate: new Date(), description: 'This works too!'});

const todoElm = document.querySelector('.todo-list');
const close = document.querySelector('.close')
const button = document.querySelector('.button')

function addTodoItem() {
    
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
    button.addEventListener('click', function(){
        document.querySelector('.popup').style.display = 'flex'
    })
    
    close.addEventListener('click', function(){
        document.querySelector('.popup').style.display = 'none'
    })
    addButtonElm.addEventListener('click', addTodoItem);
    document.addEventListener('DOMContentLoaded', populateUI);
}

loadEventListeners();
