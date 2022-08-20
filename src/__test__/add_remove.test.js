/**
 * @jest-environment jsdom
 */

const CreateTodo = require('../modules/create-Todo').default;
const { TodoList } = require('../modules/todo-List');

const taskList = new TodoList();

//Test for Adding Todo
describe('Add todos', () => {
  it('Renders todos to the DOM', () => {
    document.body.innerHTML = ` 
    <svg class="refresh"></svg> 
    <input type="text" id="todo-desc"/> 
    <button class="add-btn"></button>
    <div class="todos-display"></div>
  `;
    let todoDesc = document.getElementById('todo-desc');

    const addBtn = document.querySelector('.add-btn');
    addBtn.onclick = () => taskList.getInput();

    todoDesc.value = 'Hello World';
    addBtn.click();
    todoDesc.value = 'Get groceries';
    addBtn.click();
    todoDesc.value = 'Make the bed';
    addBtn.click();
    const todos = document.querySelectorAll('.todos-display div label span');
    expect(todos).toHaveLength(3);
  });

  it('Persists todos to localStorage after add and updates the instance array', () => {
    const savedTodosBefore = JSON.parse(localStorage.getItem('todos')).length;
    const listBefore = taskList.todoList.length;

    taskList.addTodo(
      new CreateTodo(savedTodosBefore + 1, 'Make a call to the storage', true)
    );

    const savedTodosAfter = JSON.parse(localStorage.getItem('todos')).length;
    const listAfter = taskList.todoList.length;

    expect(savedTodosAfter).toEqual(savedTodosBefore + 1);
    expect(listAfter).toEqual(listBefore + 1);
  });
});

//Test for Removing Todo
describe('Remove todos', () => {
  it('Remove todo from the DOM', () => {
    document.body.innerHTML = ` 
    <svg class="refresh"></svg> 
    <input type="text" id="todo-desc"/> 
    <button class="add-btn"></button>
    <div class="todos-display"></div>
  `;

    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Remove this todo with id:5', true)
    );
    taskList.onDelete(5);
    const newtodos = document.querySelectorAll('.todos-display div label span');
    expect(newtodos).toHaveLength(4);
  });

  it('Remove todo from the localStorage', () => {
    document.body.innerHTML = ` 
    <svg class="refresh"></svg> 
    <input type="text" id="todo-desc"/> 
    <button class="add-btn"></button>
    <div class="todos-display"></div>
  `;

    taskList.addTodo(
      new CreateTodo(taskList.todoList.length + 1, 'Remove this todo with id:5', true)
    );
    const savedTodosBefore = JSON.parse(localStorage.getItem('todos')).length;
    taskList.removeTodo(5);
    const savedTodosAfter = JSON.parse(localStorage.getItem('todos'));
    expect(savedTodosAfter).toHaveLength(savedTodosBefore-1);
  });
});
