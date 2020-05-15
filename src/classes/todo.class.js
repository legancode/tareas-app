export class Todo {
  // Creando un metodo estatico para transformar objetos
  // del localstorage en instancias de clase Todo
  static localTodo({ task, id, completed, created }) {
    const todo = new Todo(task);
    todo.id = id;
    todo.completed = completed;
    todo.created = created;

    return todo;
  }

  constructor(task) {
    this.task = task;

    this.id = new Date().getTime();
    this.completed = false;
    this.created = new Date();
  }
}
