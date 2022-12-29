
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
    const task = action.parentElement;

    if (action.classList[0] === 'todo-del') {
        //create a modal with two buttons and attach event listeners to it
        const modal = document.createElement('dialog');
        const btns = document.createElement('div');
        btns.classList.add('modal-btns');
        const modalEditBtn = document.createElement('button');
        modalEditBtn.classList.add('modal-del-btn');
        modalEditBtn.textContent = 'Delete';
        const modalCancelBtn = document.createElement('button');
        modalCancelBtn.classList.add('modal-cancel-btn');
        modalCancelBtn.textContent = 'Cancel';
        const text = document.createTextNode('Are you sure you want to delete this task?')
        btns.append(modalEditBtn, modalCancelBtn)
        modal.append(text, btns);
        todoList.append(modal);
        modal.showModal();
        // Allow modal to be removed if clicked outside main window
        modal.addEventListener("click", event => {
            const rect = modal.getBoundingClientRect();
            if (event.clientY < rect.top || event.clientY > rect.bottom ||
                event.clientX < rect.left || event.clientX > rect.right) {
                modal.remove();
            }
        });
        btns.addEventListener('click', (e) => {
            if (e.target.classList[0] === 'modal-del-btn') {
                modal.remove();
                const taskText = action.parentElement.firstChild.innerText;
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
            else if (e.target.classList[0] === 'modal-cancel-btn') { modal.remove() }
        });
    }
    else if (action.classList[0] === 'todo-check') {
        const task = action.parentElement;
        task.classList.toggle('completed');
    }
    else if (action.classList[0] === 'todo-edit') {
        //create a modal with two buttons and attach event listeners to it
        const modal = document.createElement('dialog');
        const taskText = action.parentElement.firstChild.innerText;
        const btns = document.createElement('div');
        btns.classList.add('modal-btns');
        const modalEditBtn = document.createElement('button');
        modalEditBtn.classList.add('modal-edit-btn');
        modalEditBtn.textContent = 'Confirm';
        const modalCancelBtn = document.createElement('button');
        modalCancelBtn.classList.add('modal-cancel-btn');
        modalCancelBtn.textContent = 'Cancel';
        const text = document.createTextNode('Edit Task');
        const input = document.createElement('div');
        input.innerHTML = '<input type="text" name="edit-task" class="modal-edit-input">'
        btns.append(modalEditBtn, modalCancelBtn)
        modal.append(text, input, btns);
        todoList.append(modal);
        modal.showModal();
        const modalEditInput = document.querySelector('.modal-edit-input');
        modalEditInput.value = taskText;
        // Allow modal to be removed if clicked outside main window
        modal.addEventListener("click", event => {
            const rect = modal.getBoundingClientRect();
            if (event.clientY < rect.top || event.clientY > rect.bottom ||
                event.clientX < rect.left || event.clientX > rect.right) {
                modal.remove();
            }
        });
        btns.addEventListener('click', (e) => {
            if (e.target.classList[0] === 'modal-edit-btn') {
                const todoTask = document.querySelectorAll('.todo-task');
                tasks = getFromLocalStorage();
                //edit the task
                tasks[tasks.indexOf(taskText)] = modalEditInput.value;
                //send new list to local storage

                //display edited tasks in the page
                todoTask.forEach((task, frontEndIndex) => { //loop through elements in the todo-container
                    tasks.forEach((localStorageTask, BackEndIndex) => { //loop through values in the local storage
                        if (frontEndIndex === BackEndIndex) {
                            // if the indexes match for the records then update the front end to match the values in the local storage
                            task.innerText = localStorageTask;
                        }

                    })
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                //remove modal from the page
                modal.remove();
            }
            else if (e.target.classList[0] === 'modal-cancel-btn') { modal.remove() }
        });
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
