let id_gen = 1;
function createTodo() {
  const newTodoValue = document.querySelector("input").value;
  // console.log(newTodoValue.value);

  const newTodoNode = document.createElement("div");
  newTodoNode.style.display = "flex";
  newTodoNode.setAttribute("id", id_gen);
  const newTodoTextNode = document.createElement("div");
  const deleteTodo = document.createElement("button");
  deleteTodo.setAttribute("id", id_gen);
  // console.log(id_gen);
  deleteTodo.setAttribute("onclick", "deleteTodo(" + id_gen + ")");
  deleteTodo.textContent = "Delete";
  newTodoTextNode.innerHTML = newTodoValue;
  // console.log(newTodoNode.innerHTML);

  const parentNode = document.querySelector("#todos");
  parentNode.appendChild(newTodoNode);
  newTodoNode.appendChild(newTodoTextNode);
  newTodoNode.appendChild(deleteTodo);
  id_gen++;
  document.querySelector("input").value = '';
}

function deleteTodo(id){
    const todoToDelete = document.getElementById(id);
    if(todoToDelete){
        todoToDelete.parentNode.removeChild(todoToDelete);
    }
}
