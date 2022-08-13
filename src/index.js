import './style.css';
import 'tw-elements';
import { TodoList, dynamicTodo } from './modules/todo-List';

const taskList = new TodoList();
const { todoList } = taskList;
document.addEventListener('DOMContentLoaded', dynamicTodo.render(todoList, taskList));

const addBtn = document.querySelector('.add-btn');
addBtn.onclick = () => taskList.getInput();

const todoDesc = document.getElementById('todo-desc');
todoDesc.addEventListener('keypress', (event) => {
  const { key } = event;
  if (key === 'Enter') taskList.getInput();
});

const clearBtn = document.querySelector('.clear-all-btn');
clearBtn.onclick = () => taskList.onClear();