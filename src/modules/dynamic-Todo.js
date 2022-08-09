export default class DynamicTodo {
  resetTodoDisplay = () => {
    const todoDisplay = document.querySelector('.todos-display');
    todoDisplay.innerHTML = '';
    return todoDisplay;
  };

  render(list) {
    const todoList = this.resetTodoDisplay();
    list.forEach((todo) => {
      const { description } = todo;

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.className = 'accent-red-500';

      const todoDesc = document.createElement('span');
      todoDesc.innerText = description;
      todoDesc.className = 'todo-desc ml-2';

      const todoLabel = document.createElement('label');
      todoLabel.append(checkBox, todoDesc);

      const dotBtn = document.createElement('button');
      dotBtn.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      >
      <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
      </svg>`;

      const todoContainer = document.createElement('div');
      todoContainer.classList = 'todos-container flex justify-between border border-x-0 px-4 py-4';

      todoContainer.append(todoLabel, dotBtn);
      todoList.appendChild(todoContainer);
    });
  }
}
