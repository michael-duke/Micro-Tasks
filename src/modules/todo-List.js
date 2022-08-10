import DynamicTodo from './dynamic-Todo';
import CreateTodo from './create-Todo';

const dynamicTodo = new DynamicTodo();
class TodoList {
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem('todos')) || [];
  }

  // Model
  addTodo(todo) {
    this.todoList.push(todo);
    this.saveTodos();
    dynamicTodo.render(this.todoList, this);
  }

  removeTodo(todoId) {
    this.todoList = this.todoList.filter(({ id }) => id !== todoId);
    this.reindexTodos();
    this.saveTodos();
  }

  // Sets Todo for Editing
  setEditing(todoToEdit) {
    this.todoList[todoToEdit - 1].isEditing = true;
    this.saveTodos();
  }

  // Updates a Todo
  updateTodo(id, description) {
    this.todoList[id].description = description;
    this.todoList[id].isEditing = false;
    this.saveTodos();
  }

  onEdit(todoId) {
    this.setEditing(todoId);
    dynamicTodo.render(this.todoList, this);
  }

  onDelete(todoToDelete) {
    this.removeTodo(todoToDelete);
    dynamicTodo.render(this.todoList, this);
    // this.isCollectionEmpty();
  }

  onUpdate(todoToUpdate) {
    const newTodoDesc = document.getElementById(`edit-todo-${todoToUpdate}`);
    const { value: description } = newTodoDesc;
    this.updateTodo(todoToUpdate - 1, description);
    dynamicTodo.render(this.todoList, this);
  }

  getInput() {
    const id = this.todoList.length + 1;

    const todoDesc = document.getElementById('todo-desc');
    const { value: description } = todoDesc;

    const newTodo = new CreateTodo(id, description);
    this.addTodo(newTodo);
    todoDesc.value = '';
  }

  reindexTodos() {
    for (let i = 0; i < this.todoList.length; i += 1) {
      this.todoList[i].id = i + 1;
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todoList));
  }
}

export { TodoList, dynamicTodo };
