import './style.css';
import { TodoList, dynamicTodo } from './modules/todo-List';

const taskList = new TodoList();
const { todoList } = taskList;
document.addEventListener(
  'DOMContentLoaded',
  dynamicTodo.render(todoList),
);
