import "./styles.css";
import { TodoList } from "./classes";
import { drawTodo } from "./js/components";

export const todoList = new TodoList();

todoList.todos.forEach(drawTodo);
