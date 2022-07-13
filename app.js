//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
// const filterOption = document.querySelector('.filter-todos');

//Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTask);
// filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


//Functions

function addTodo(event) {

    //prevent form from submitting
    event.preventDefault();

    //add div
    const todoDiv = document.createElement('div');
    //add class
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    if (todoInput.value == "") {
        alert("Enter some text")
    }

    else {
        newTodo.innerText = todoInput.value;

        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        saveLocalTodos(todoInput.value);
        //add cretebutton
        const createButton = document.createElement('button');
        createButton.classList.add('create-btn');
        createButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        todoDiv.appendChild(createButton);

        //add delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteButton);

        //append to list
        todoList.append(todoDiv)
    }
    //clear input
    todoInput.value = "";
}


function deleteTask(e) {
    const item = e.target;
    // console.log(item);
    //delete todo
    if (item.classList[0] == "delete-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function (event) {
            todo.remove();
        })
    }


    if (item.classList[0] == "create-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


// function filterTodo(e) {
//     const todos = todoList.childNodes;
//     todos.forEach(function(todo) {
//         switch (e.target.value) {
//             case "all":
//                todo.style.display = "flex";
//             // case "completed":

//             //     if (todo.classList.contains("completed")) {
//             //         todo.style.display = "flex";
//             //     }
//             //     else {
//             //         todo.style.display = "none";
//             //     }
//         }
//     });
// }


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        //add class
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');


        newTodo.innerText = todo;

        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);


        //add cretebutton
        const createButton = document.createElement('button');
        createButton.classList.add('create-btn');
        createButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        todoDiv.appendChild(createButton);

        //add delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteButton);

        //append to list
        todoList.append(todoDiv)

    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    todos.push(todos);
}