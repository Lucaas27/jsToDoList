// Selectors
const todoBtn = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const msg = document.getElementById("todo-msg");
const todoFilter = document.querySelector('.todo-filter');

//Event Listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', changeState);
todoFilter.addEventListener('click', filterList);


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
    console.log(action)
    if (action.classList[0] === 'todo-del') {
        const task = action.parentElement;
        task.classList.add('delete')
        task.addEventListener('transitionend', () => task.remove())
    }
    else if (action.classList[0] === 'todo-check') {
        const task = action.parentElement;
        task.classList.toggle('completed');
    }
}

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