const todoInput = document.querySelector(".todo-input")
const addTodoBtn = document.querySelector(".todo-btn")
const todolist = document.querySelector('.todolist')
const filter = document.querySelector('.filter')

addTodoBtn.addEventListener('click', addTodo)
todolist.addEventListener('click', checkRemove)
filter.addEventListener('click', filterFunc)
document.addEventListener('DOMContentLoaded', getLocalTodos)
function addTodo(e){
    e.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = `
    <li>${todoInput.value}</li>
    <div class="mark">
    <span class="btn"><i class="fa-regular fa-square-check"></i></span>
    <span class="btn"><i class="fa-regular fa-square-minus"></i></span>
    </div>`;
    todoDiv.innerHTML = newTodo;
    todolist.appendChild(todoDiv);
    saveLocalTodos(todoInput.value)
    todoInput.value = " ";
}

function checkRemove(e){
    const classList = [...e.target.classList]
    console.log(e.target.classList);
    const item = e.target;
    if(classList[1]==="fa-square-check" ){
        const todo = item.parentElement.parentElement.parentElement;
        todo.classList.toggle('completed')

    }else if(classList[1]==="fa-square-minus"){
        const todo = item.parentElement.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
        
    }
}
function filterFunc(e){
    
    const todos = [...todolist.childNodes];
    todos.forEach((todo) => {
        switch(e.target.value){
            case "all":
                todo.style.display ="flex";
                break;
            case "complete":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }else{
                    todo.style.display = 'none';
                }
                break;
            
            case "uncomplete":
                if(!todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }else{
                    todo.style.display = 'none';
                }     
                break;

        }
    });    


}
function saveLocalTodos(todo){
    let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.push(todo)
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}
function getLocalTodos(){
    let savedTodos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    savedTodos.forEach((todos) =>{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = `
        <li>${todos}</li>
        <div class="mark">
        <span class="btn"><i class="fa-regular fa-square-check"></i></span>
        <span class="btn"><i class="fa-regular fa-square-minus"></i></span>
        </div>`;
        todoDiv.innerHTML = newTodo;
        todolist.appendChild(todoDiv);
    })

}
function removeLocalTodos(todo){
    let savedTodos = localStorage.getItem('todos')
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
        console.log(todo.children[0].innerText)
    const filteredTodos = savedTodos.filter(
        
        (e) => e != todo.children[0].innerText
    );
    localStorage.setItem("todos", JSON.stringify(filteredTodos));

}