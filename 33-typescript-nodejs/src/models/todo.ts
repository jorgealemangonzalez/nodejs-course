export interface Todo {
  id: string;
  text: string;
  delete: () => void
}

export const todos: Todo[] = []

export class TodoImpl implements Todo {
  constructor(public readonly id: string, public readonly text: string) {
    todos.push(this)
  }

  delete() {
    todos.forEach((item, index) => {
      if (item.id === this.id) todos.splice(index, 1);
    });
  }
}

export const clearDB = () => {
  todos.splice(0, todos.length)
}