import { Todo, TodoId, isTodoId } from "../models/todo";


export interface TodoDAO {
  create(todo: Todo): Todo
  update(todoId: TodoId, updateFun: (todo: Todo) => Todo): Todo | undefined
  delete(toDelete: TodoId | Todo): void;
  clearStorage(): void;
  find(toFind: TodoId | Todo): Todo | undefined
  get all(): Todo[]
}

class TodoDAOImpl implements TodoDAO {
  constructor(private storage: Array<Todo>) { }

  create(todo: Todo): Todo {
    this.storage.push(todo)
    return todo
  }
  
  update(todoId: string, updateFun: (todo: Todo) => Todo): Todo | undefined {
    const todoInStorage = this.find(todoId);
    if (!todoInStorage) return undefined
    const index = this.storage.indexOf(todoInStorage)
    return this.storage[index] = updateFun(todoInStorage)
  }

  delete(toDelete: TodoId | Todo) {

    if (!isTodoId(toDelete)) {
      toDelete = toDelete.id
    }

    this.storage.forEach((item, index) => {
      if (item.id === toDelete) this.storage.splice(index, 1);
    });

  }

  clearStorage() {
    this.storage.splice(0, this.storage.length)
  }

  find(toFind: string | Todo): Todo | undefined {
    if (!isTodoId(toFind)) {
      toFind = toFind.id
    }

    return this.storage.find((todoItem) => todoItem.id === toFind)
  }

  get all(): Todo[] {
    return [...this.storage]
  }
}

export const todoDAO: TodoDAO = new TodoDAOImpl([])