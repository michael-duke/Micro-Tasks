// Controller
class CreateTodo {
  constructor(id, description, isComplete = false) {
    this.id = id;
    this.description = description;
    this.isComplete = isComplete;
  }
}

export default CreateTodo;