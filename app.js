//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addToDo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo);


//functions
function addToDo(event){
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //add new todo item 
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //save to local storage
    saveTodo(todoInput.value);
    //add completed button
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkBtn);
    //add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteBtn);

    todoList.appendChild(todoDiv);
    //clear input value after adding
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;
    const todo = item.parentElement;

    //delete todo
    if(item.classList[0]==="delete-btn"){
        //animation
        todo.classList.add("fall");
        deleteTodo(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
        
    }

    //check todo
    if(item.classList[0] === "check-btn"){
        todo.classList.toggle("completed");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if(todo.style!=undefined && todo.style!=null){
            switch(event.target.value){
                case 'all':
                    todo.style.display= "flex";
                    break;
                case 'completed':
                    if(todo.classList.contains('completed')){
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                case 'uncompleted':
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
        
    })

}

//local storage 
function checkTodoinStorage(){
    let todos;

    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    return todos;
}

function saveTodo(todo){
    let todos = checkTodoinStorage();

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos = checkTodoinStorage();

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //add new todo item 
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        
        //add completed button
        const checkBtn = document.createElement("button");
        checkBtn.classList.add("check-btn");
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(checkBtn);
        //add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);
    })
}

function deleteTodo(todo){
    let todos = checkTodoinStorage();

    console.log(todo.childNodes[0]);
    let index = todos.indexOf(todo.childNodes[0].innerText);
    todos.splice(index,1);

    localStorage.setItem('todos',JSON.stringify(todos));


}

