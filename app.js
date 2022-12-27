// Selectors
const todoBtn = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

//Event Listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', changeState);


//Functions
function addTodo(e) {
    //Prevent form from reloading
    try {
        e.preventDefault();

    } catch (error) {
        console.error(error)
        alert('An error occurred and I need to write some code to handle this!');
    }
    //Container for todo-task
    const taskContainer = document.createElement('article');
    taskContainer.classList.add('todo-task-container');
    //Individual tasks
    const newTask = document.createElement('li');
    newTask.classList.add('todo-task');
    newTask.innerText = todoInput.value;
    taskContainer.appendChild(newTask);
    // Check Button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('todo-check');
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    taskContainer.appendChild(checkBtn);
    //Delete button
    const delBtn = document.createElement('button');
    delBtn.classList.add('todo-del');
    delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    taskContainer.appendChild(delBtn);

    // Append articles to list
    todoList.appendChild(taskContainer);
    //clear input value
    todoInput.value = '';
}

function changeState(e) {
    const action = e.target;
    // console.log(action)
}