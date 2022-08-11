export default class DraggableTodo {
  dragTodo(todoInstance) {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach((todo) => {
      todo.addEventListener('dragstart', () => {
        todo.classList.add('dragging');
      });
      todo.addEventListener('dragend', () => {
        todo.classList.remove('dragging');
        draggables.forEach((draggable) => draggable.classList.remove('bg-orange-100'));
        const { todoList } = todoInstance;

        const newTodoList = [];
        const toIdices = this.getTodoId();
        toIdices.forEach((index) => {
          newTodoList.push(todoList[index]);
        });
        todoInstance.onDrag(newTodoList);
      });
    });

    const todosContainer = document.querySelector('.todos-display');
    todosContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggableTodos = [...todosContainer.querySelectorAll('.draggable:not(.dragging)')];
      draggableTodos.forEach((draggableTodo) => draggableTodo.classList.add('bg-orange-100'));

      const afterTodo = this.getDragAfterTodo(draggableTodos, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterTodo === null) {
        todosContainer.appendChild(draggable);
      } else {
        todosContainer.insertBefore(draggable, afterTodo);
      }
    });
  }

  getDragAfterTodo(draggableTodos, y) {
    return draggableTodos.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return offset < 0 && offset > closest.offSet
          ? { offset, element: child }
          : closest;
      },
      { offSet: Number.NEGATIVE_INFINITY },
    ).element;
  }

  getTodoId() {
    const draggables = [...document.querySelectorAll('.draggable')];
    return draggables.reduce((idList, todo) => {
      idList.push(+todo.id - 1);
      return idList;
    }, []);
  }
}
