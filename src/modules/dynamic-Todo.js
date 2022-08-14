import DraggableTodo from './draggable-Todo';

const draggableTodo = new DraggableTodo();
export default class DynamicTodo {
  resetTodoDisplay = () => {
    const todoDisplay = document.querySelector('.todos-display');
    todoDisplay.innerHTML = '';
    return todoDisplay;
  };

  render(list, todoInstance) {
    const todoList = this.resetTodoDisplay();
    todoList.ondragover = (e) => DraggableTodo.dragOverTodo(e);
    list.forEach((todo) => {
      const { id, description, isComplete } = todo;

      const todoContainer = document.createElement('div');
      todoContainer.setAttribute('draggable', true);
      todoContainer.ondragstart = (e) => draggableTodo.dragStartTodo(e);
      todoContainer.ondragend = (e) => draggableTodo.dragEndTodo(e, todoInstance);
      todoContainer.id = id;
      todoContainer.classList = 'todos-container cursor-move draggable flex justify-between border border-x-0 px-4 py-6 space-x-3';

      if (todo.isEditing) {
        const newTextbox = document.createElement('input');
        newTextbox.id = `edit-todo-${id}`;
        newTextbox.value = description;
        newTextbox.classList = `block w-10/12 text-base font-normal pl-3 text-sky-700 outline outline-amber-300 bg-slate-100 bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700
        `;

        const updateButton = document.createElement('button');
        updateButton.innerText = 'UPDATE';
        updateButton.classList = `
        py-2
        px-4
        font-normal
        rounded
        text-gray-400
        whitespace-nowrap
        bg-slate-100
        focus:bg-amber-400 focus:text-white focus:outline-none  focus:shadow-lg
        transition
        duration-150
        hover:bg-amber-500 hover:text-white`;
        updateButton.onclick = () => todoInstance.onUpdate(id);

        todoContainer.append(newTextbox, updateButton);
      } else {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = id;
        checkBox.checked = isComplete;
        checkBox.onchange = (e) => todoInstance.onChange(e);
        checkBox.addEventListener('change', (event) => {
          const {
            target: { checked, nextSibling },
          } = event;
          return checked
            ? nextSibling.classList.add('line-through')
            : nextSibling.classList.remove('line-through');
        });
        checkBox.className = 'checktodo h-4 w-4 accent-red-500 cursor-pointer';

        const todoDesc = document.createElement('span');
        todoDesc.innerText = description;
        todoDesc.className = 'todo-desc ml-2';
        if (isComplete) todoDesc.classList.add('line-through');

        const todoLabel = document.createElement('label');
        todoLabel.append(checkBox, todoDesc);

        const dotBtn = document.createElement('button');
        dotBtn.type = 'button';
        dotBtn.id = `dropBtn ${id}`;
        dotBtn.ariaExpanded = 'false';
        dotBtn.setAttribute('data-mdb-ripple', 'true');
        dotBtn.setAttribute('data-mdb-ripple-color', 'light');
        dotBtn.setAttribute('data-bs-toggle', 'dropdown');
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
        dotBtn.classList = `dropdown-toggle
      px-1
      py-1
      bg-slate-100
      text-gray-400
      font-medium
      text-xs
      leading-tight
      rounded
      shadow-md
      hover:bg-slate-300 hover:shadow-lg
      focus:bg-slate-300 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-slate-300 active:shadow-lg active:text-white
      transition
      duration-150
      ease-in-out
      flex
      items-center
      whitespace-nowrap`;

        const dropItemDel = document.createElement('li');
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg> 
      <span>DEL</span>`;
        delBtn.classList = `del-btn dropdown-item flex items-center space-x-2
      text-sm
      py-2
      px-4
      font-normal
      w-full
      whitespace-nowrap
      bg-transparent
      text-gray-700
      transition
      duration-150
      hover:bg-red-500 hover:text-white`;
        delBtn.onclick = () => todoInstance.onDelete(id);
        dropItemDel.appendChild(delBtn);

        const dropItemEdit = document.createElement('li');
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    <span>EDIT</span>`;
        editBtn.classList = `edit-btn dropdown-item flex items-center space-x-2
      text-sm
      py-2
      px-4
      font-normal
      w-full
      whitespace-nowrap
      bg-transparent
      text-gray-700
      transition
      duration-150
      hover:bg-amber-500 hover:text-white`;
        editBtn.onclick = () => todoInstance.onEdit(id);
        dropItemEdit.appendChild(editBtn);

        const dropmenu = document.createElement('ul');
        dropmenu.setAttribute('aria-labelledby', `dropBtn ${id}`);
        dropmenu.classList = `dropdown-menu
      min-w-max
      absolute
      hidden
      bg-white
      text-base
      z-50
      float-left
      right-full
      py-2
      list-none
      text-left
      rounded-lg
      shadow-lg
      mt-1
      m-0
      bg-clip-padding
      border-none`;
        dropmenu.append(dropItemDel, dropItemEdit);

        const dropdown = document.createElement('div');
        dropdown.classList = 'dropstart relative';
        dropdown.append(dotBtn, dropmenu);

        todoContainer.append(todoLabel, dropdown);
      }
      todoList.appendChild(todoContainer);
    });
  }
}
