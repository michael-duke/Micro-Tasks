/**
 * @jest-environment jsdom
 */

const { internalIP } = require('webpack-dev-server');
const { default: CreateTodo } = require('../modules/create-Todo');
const { default: TodoStatus } = require('../modules/todo-Status');
const { TodoList } = require('../modules/todo-List');
const taskList = new TodoList();

describe('Edit Todo', () => {
  it('Edits a todo and updates the value in the DOM', () => {
    document.body.innerHTML = ` 
    <svg class="refresh"></svg> 
    <input type="text" id="todo-desc"/> 
    <button class="add-btn"></button>
    <div class="todos-display"></div>
   `;

    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'This Todo will be edited')
    );

    const [todo] = taskList.todoList;
    taskList.onEdit(todo.id);

    const todoOnEdit = document.getElementById(`edit-todo-${todo.id}`);
    todoOnEdit.value = 'Check out API tutorials';
    taskList.onUpdate(todo.id);

    const editedTodo = document.querySelectorAll(
      '.todos-display div label span'
    )[todo.id - 1];
    expect(editedTodo.innerText).toMatch('Check out API tutorials');
  });

  it('Edits a todo and check if localStorage is current', () => {
    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Make lunch before meeting')
    );
    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Hello Todos')
    );

    taskList.updateTodo(
      taskList.todoList.length - 2,
      'Lunch is done, start the meeting'
    );
    const [, todo] = JSON.parse(localStorage.getItem('todos'));

    expect(todo.description).toMatch('Lunch is done, start the meeting');
  });
});

describe('Completed flag Test', () => {
  document.body.innerHTML = ` 
  <svg class="refresh"></svg> 
  <input type="text" id="todo-desc"/> 
  <button class="add-btn"></button>
  <div class="todos-display"></div>
  `;
  it('isComplete flag is set to false by default', () => {
    taskList.todoList = [];
    let todoDesc = document.getElementById('todo-desc');

    const addBtn = document.querySelector('.add-btn');
    addBtn.onclick = () => taskList.getInput();

    todoDesc.value = 'Hello World';
    addBtn.click();
    todoDesc.value = 'Get groceries';
    addBtn.click();
    todoDesc.value = 'Make the bed';
    addBtn.click();

    taskList.todoList.forEach(({ isComplete }) => {
      expect(isComplete).toBeFalsy();
    });
  });

  it('isComplete flag is changed on check', () => {
    const checkbox2 = document.querySelectorAll('.checktodo')[1];
    checkbox2.click();
    const [, todo] = taskList.todoList;
    expect(todo.isComplete).toBeTruthy();
  });
  it('isComplete flag is changed in the localStorage', () => {
    const checkbox3 = document.querySelectorAll('.checktodo')[2];
    checkbox3.checked = true;

    const todoStatus = new TodoStatus(taskList);
    todoStatus.toggleTodo(2, checkbox3.checked);

    const [, , todo] = JSON.parse(localStorage.getItem('todos'));
    expect(todo.isComplete).toBeTruthy();
  });
});
describe('ClearAll completed tasks', () => {
  it('Clear all completed task from the DOM', () => {
    document.body.innerHTML = ` 
    <svg class="refresh"></svg> 
    <input type="text" id="todo-desc"/> 
    <button class="add-btn"></button>
    <div class="todos-display"></div>
    <button id="clear-btn"></button>
    `;
    taskList.todoList = [];
    taskList.addTodo(
      new CreateTodo(
        taskList.todoList.length + 1,
        'Make lunch before meeting',
        true
      )
    );
    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Finish Microverse in JAN')
    );
    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Complete Task 1', true)
    );
    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Complete Task 2')
    );

    const clearBtn = document.querySelector('#clear-btn');
    clearBtn.onclick = () => taskList.onClear();
    clearBtn.click();
    const todos = document.querySelectorAll('.todos-display div label span');
    expect(todos).toHaveLength(2);
  });

  it('Clear completed task from the localStorage', () => {
    taskList.todoList.forEach(todo => todo.isComplete=true);
    taskList.clearAllCompleteTodos();
    const savedTodos = JSON.parse(localStorage.getItem('todos'));

    expect(savedTodos).toHaveLength(0)
  });
});
