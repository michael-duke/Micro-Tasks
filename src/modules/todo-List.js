import DynamicTodo from './dynamic-Todo';

const DEFAULTlIST = [
  {
    id: 1,
    description: 'Take out the trash',
    isComplete: false,
  },
  { id: 2, description: 'Make the bed', isComplete: true },
  { id: 3, description: 'Buy some groceries', isComplete: false },
  {
    id: 4,
    description: 'Write in my journal',
    isComplete: false,
  },
  { id: 5, description: 'Clean my laptop', isComplete: true },
  { id: 6, description: 'Pay the bills', isComplete: false },
];

const dynamicTodo = new DynamicTodo();

class TodoList {
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem('todos')) || DEFAULTlIST;
  }

  // Model
  addTodo(todo) {
    this.todoList.push(todo);
    this.saveCollection();
    dynamicTodo.render(this.todoList, this);
  }

  saveCollection() {
    localStorage.setItem('todos', JSON.stringify(this.todoList));
  }
}

export { TodoList, dynamicTodo };