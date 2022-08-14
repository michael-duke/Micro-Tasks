import DynamicTodo from './dynamic-Todo';
import CreateTodo from './create-Todo';
import TodoStatus from './todo-Status';
import { rotate, rotateReverse } from './rotate-RefreshBtn';

const dynamicTodo = new DynamicTodo();

class TodoList {
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem('todos')) || [];
  }

  // Model
  addTodo(todo) {
    this.todoList.push(todo);
    this.saveTodos();
    rotate();
    dynamicTodo.render(this.todoList, this);
  }

  removeTodo(todoId) {
    this.todoList = this.todoList.filter(({ id }) => id !== todoId);
    this.reindexTodos();
    this.saveTodos();
    rotateReverse();
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
  }

  onUpdate(todoToUpdate) {
    const newTodoDesc = document.getElementById(`edit-todo-${todoToUpdate}`);
    const { value: description } = newTodoDesc;
    this.updateTodo(todoToUpdate - 1, description);
    dynamicTodo.render(this.todoList, this);
  }

  onChange(event) {
    const todoStatus = new TodoStatus(this);
    todoStatus.checkTodo(event, this);
    dynamicTodo.render(this.todoList, this);
  }

  clearAllCompleteTodos() {
    this.todoList = this.todoList.filter(
      ({ isComplete }) => isComplete === false,
    );
    this.reindexTodos();
    this.saveTodos();
  }

  onClear() {
    this.clearAllCompleteTodos();
    rotateReverse();
    dynamicTodo.render(this.todoList, this);
  }

  sortDraggedTodos(newTodoList) {
    this.todoList = this.todoList.map((todo, i) => {
      todo = this.todoList[newTodoList[i]];
      return todo;
    });
    this.reindexTodos();
    this.saveTodos();
  }

  onDrag(todoIds) {
    this.sortDraggedTodos(todoIds);
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
    this.todoList = this.todoList.map((todo, index) => {
      todo.id = index + 1;
      return todo;
    });
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todoList));
  }
}

export { TodoList, dynamicTodo };
