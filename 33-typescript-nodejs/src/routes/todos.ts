import { Router } from 'express';

import { Todo, TodoImpl, todos } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

const router = Router();

router.get('/', (req, res, next) => {
  return res.status(200).json({ todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = new TodoImpl(
    new Date().toISOString(),
    body.text
  );
  res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const body = req.body as RequestBody;
  const todo = todos.find((todoItem) => todoItem.id === tid);
  if (todo) {
    todo.text = body.text;
    return res.status(200).json({ message: 'Updated todo', todos: todos });
  }
  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  todos.find((todoItem) => todoItem.id === params.todoId)?.delete()
  res.status(200).json({ message: 'Deleted todo', todos: todos });
});

export default router;
