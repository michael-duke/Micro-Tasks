export default class TodoStatus {
  static toggleTodo(todoId, checked, todoInstance) {
    todoInstance.todoList[todoId].isComplete = checked;
    todoInstance.saveTodos();
  }

  checkTodo(e, todoInstance) {
    const { target: { id: todoId, checked } } = e;
    this.toggleTodo(todoId - 1, checked, todoInstance);
  }
}
