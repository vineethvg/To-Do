'use strict';

class Task {
    id = (Date.now() + '').slice(-10);

    constructor(title, date, time, description, type) {
        this.title = title;
        this.time = time;
        this.date = date;
        this.description = description;
        this.type = type;
    }
}

//Architecture
const form = document.querySelector('.form');
const form2 = document.querySelector('.form2');
const inputTitle = document.querySelector('.form__input--title');
const inputDate = document.querySelector('.form__input--date');
const inputTime = document.querySelector('.form__input--time');
const inputDesc = document.querySelector('.form__input--desc');
const inputType = document.querySelector('.form__input--type');


class App {
    #tasks = [];

    constructor() {

        this._setDate();
        this._getLocalStorage();
        form.addEventListener('submit', this._newTask.bind(this));
    }

    _setDate() {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
        document.querySelector('#time').value = time;
    }

    _emptyValue() {
        inputTitle.value = inputDate.value = inputTime.value = inputDesc.value = inputType.value = '';
    }

    _newTask(e) {
        e.preventDefault();

        //getting data from the form
        const title = inputTitle.value;
        const date = inputDate.value;
        const time = inputTime.value;
        const description = inputDesc.value;
        const type = inputType.value;
        let task;

        task = new Task(title, date, time, description, type);

        //adding
        this.#tasks.push(task);

        //rendering
        this._renderTask(task);

    }

    //render function
    _renderTask(task) {
        let html = `
        <ul class="task task--${task.type}" data-id="${task.id}">
        <div class="task__details">
            <div class="task__2holder">
                <span class="task__title">${task.title}</span>  
                <span class="task__date">${task.date}</span>
                <span class="task__time">${task.time}</span>
            </div>
            <div class="task__2holder">
                <span class="task__desc">${task.description}</span>
                <span class="task__type">${task.type}</span>
            </div>
        </div>    
        </ul>
        `;
        form2.insertAdjacentHTML('afterend', html);

        this._setLocalStorage();

        this._emptyValue();
    }

    _setLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.#tasks));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('tasks'));
        if (!data) return;
        this.#tasks = data;
        this.#tasks.forEach(task => {
            this._renderTask(task);
        });
    }

    reset() {
        localStorage.removeItem('tasks');
        location.reload();
    }
}
const app = new App();