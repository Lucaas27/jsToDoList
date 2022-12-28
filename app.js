
/*************************Selectors*********************/
const todoBtn = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');
let tasks;


/*************************Event Listeners******************/
document.addEventListener('DOMContentLoaded', displayList)
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', changeState);
todoFilter.addEventListener('click', filterList);



/*************************Functions************************/

//Get tasks from the local storage
function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

//add tasks to the local storage
function addTodo(e) {
    //Prevent form from reloading
    e.preventDefault();
    // save input to local storage
    saveToLocalStorage(todoInput.value);
    //clear input value
    todoInput.value = '';

}

//Save tasks to the local storage
function saveToLocalStorage(singleTask) {
    tasks = getFromLocalStorage();
    const newTasks = [...tasks, singleTask];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    displayTask(singleTask);
}


//Displays task in the page
function displayTask(task) {
    //Container for todo-task
    const taskContainer = document.createElement('article');
    taskContainer.classList.add('todo-task-container');
    //Individual tasks
    const newTask = document.createElement('li');
    newTask.classList.add('todo-task');
    newTask.innerText = task;
    taskContainer.appendChild(newTask);
    // Check Button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('todo-check');
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    taskContainer.appendChild(checkBtn);
    //Edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('todo-edit');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    taskContainer.appendChild(editBtn);
    //Delete button
    const delBtn = document.createElement('button');
    delBtn.classList.add('todo-del');
    delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    taskContainer.appendChild(delBtn);
    // Append articles(tasks) to list
    todoList.appendChild(taskContainer);
}

//Fetch ALL tasks from the local storage
function displayList(tasks) {
    tasks = getFromLocalStorage();
    tasks.forEach(task => {
        displayTask(task)
    })
}


//Delete Tasks, edit or mark as completed
function changeState(e) {
    const action = e.target;
    const taskText = action.parentElement.firstChild.innerText;

    if (action.classList[0] === 'todo-del') {
        const task = action.parentElement;
        task.classList.add('delete');
        //remove from the page
        task.addEventListener('transitionend', () => task.remove());
        //get list of tasks
        tasks = getFromLocalStorage();
        // filter local storage array and remove the item from local storage
        let newList = tasks.filter((value) => value !== taskText);
        // set a new list in local storage without removed item
        localStorage.setItem('tasks', JSON.stringify(newList));

    }
    else if (action.classList[0] === 'todo-check') {
        const task = action.parentElement;
        task.classList.toggle('completed');
    }
    else if (action.classList[0] === 'todo-edit') {
        todoInput.value = taskText;
    }
}

// Filter tasks based on the value in the select element
function filterList(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "todo":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            default:
                todo.style.display = 'flex';
        }
    })
}
