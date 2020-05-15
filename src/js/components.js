import { Todo } from "../classes";
import { todoList } from "../index";

// References in HTML
const divTodoList = document.querySelector(".todo-list");
const inputNewTodo = document.querySelector(".new-todo");
const btnClearCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const anchorFilters = document.querySelectorAll(".filter");
const spanCount = document.querySelector(".todo-count");

// Draw logic
export const drawTodo = (todo) => {
  const htmlTodo = `<li class="${todo.completed ? "completed" : ""}" data-id="${
    todo.id
  }">
  <div class="view">
      <input class="toggle" type="checkbox" ${
        todo.completed ? "checked" : ""
      } />
      <label>${todo.task}</label>
      <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template" />
  </li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);
  spanCount.firstChild.textContent = todoList.todosCount();
  return div.firstElementChild;
};

// New todo
inputNewTodo.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && e.target.value.length > 0) {
    const newTodo = new Todo(e.target.value);
    todoList.newTodo(newTodo);
    drawTodo(newTodo);
    e.target.value = "";
  }
});

// Check y delete
divTodoList.addEventListener("click", (e) => {
  const nameElement = e.target.localName;
  const todoElement = e.target.parentElement.parentElement;
  const todoElementId = todoElement.dataset.id;

  if (nameElement.includes("input")) {
    todoList.toggleTodo(todoElementId);
    todoElement.classList.toggle("completed");
    spanCount.firstChild.textContent = todoList.todosCount();
  }

  if (nameElement.includes("button")) {
    todoList.deleteTodo(todoElementId);
    divTodoList.removeChild(todoElement);
    spanCount.firstChild.textContent = todoList.todosCount();
  }
});

// Delete completes
btnClearCompleted.addEventListener("click", () => {
  todoList.deleteAllCompleted();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const el = divTodoList.children[i];
    if (el.classList.contains("completed")) {
      divTodoList.removeChild(el);
    }
  }
});

// pending, completed, all
ulFilters.addEventListener("click", (e) => {
  const filter = e.target.hash;
  if (!filter) return;

  anchorFilters.forEach((el) => el.classList.remove("selected"));
  e.target.classList.add("selected");

  for (const el of divTodoList.children) {
    el.classList.remove("hidden");
    const completed = el.classList.contains("completed");

    switch (filter) {
      case "#/active":
        if (completed) {
          el.classList.add("hidden");
        }
        break;
      case "#/completed":
        if (!completed) {
          el.classList.add("hidden");
        }
        break;
    }
  }
});
