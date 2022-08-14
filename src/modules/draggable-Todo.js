import { rotate } from './rotate-RefreshBtn';

export default class DraggableTodo {
  constructor() {
    this.draggingTodo = null;
  }

  dragStartTodo(e) {
    const { target: todo } = e;
    this.draggingTodo = todo;
    todo.classList.add('dragging');
  }

  dragEndTodo(e, todoInstance) {
    const { target: todo } = e;
    this.draggingTodo = todo;
    const draggables = document.querySelectorAll('.draggable');
    todo.classList.remove('dragging');
    draggables.forEach((draggable) => draggable.classList.remove('bg-orange-100'));
    rotate();
    todoInstance.onDrag(DraggableTodo.getTodoIds());
  }

  static dragOverTodo(e) {
    e.preventDefault();
    const todosContainer = document.querySelector('.todos-display');
    const draggableTodos = [
      ...todosContainer.querySelectorAll('.draggable:not(.dragging)'),
    ];
    draggableTodos.forEach((draggableTodo) => draggableTodo.classList.add('bg-orange-100'));

    const afterTodo = DraggableTodo.getDragAfterTodo(draggableTodos, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterTodo) {
      afterTodo.parentNode.insertBefore(draggable, afterTodo);
    } else {
      todosContainer.appendChild(draggable);
    }
  }

  static getDragAfterTodo(draggables, y) {
    return draggables.reduce(
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

  static getTodoIds() {
    const draggables = [...document.querySelectorAll('.draggable')];
    return draggables.reduce((indices, { id }) => {
      indices.push(+id - 1);
      return indices;
    }, []);
  }
}
