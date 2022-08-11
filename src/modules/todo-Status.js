export default class TodoStatus {
  constructor(todoInstance) {
    this.todoInstance = todoInstance;
  }

  toggleTodo(todoId, checked) {
    this.todoInstance.todoList[todoId].isComplete = checked;
    this.todoInstance.saveTodos();
  }

  checkTodo(e) {
    const { target: { id: todoId, checked } } = e;
    this.toggleTodo(todoId - 1, checked);
  }
}
