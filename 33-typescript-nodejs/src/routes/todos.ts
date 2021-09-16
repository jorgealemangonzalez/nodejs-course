import { Router } from 'express';
import { Todo } from '../models/todo';
import { todoDAO } from '../storage/TodoDAO';


type RequestBody = { text: string };
type RequestParams = { todoId: string };

const router = Router();

router.get('/', (req, res, next) => {
  return res.status(200).json({ todos: todoDAO.all });
});

router.post('/todo', (req, res, next) => {
  const text = (req.body as RequestBody).text
  const id = new Date().toISOString()
  res.status(201).json(mapToAddedTodoDTO(todoDAO.create({ id, text })));
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const text = (req.body as RequestBody).text;
  const updated = todoDAO.update(tid, (t) => { return { ...t, text } })
  if (updated !== undefined) {
    return res.status(200).json({ message: 'Updated todo', todos: todoDAO.all });
  }
  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  var todo = todoDAO.find(params.todoId)
  todo && todoDAO.delete(todo)

  res.status(200).json({ message: 'Deleted todo', todos: todoDAO });
});

export default router;

type AddedTodoDTO = {
  message: string,
  todo: Todo,
  todos: Todo[]
}

function mapToAddedTodoDTO(newTodo: Todo): AddedTodoDTO {
  return { message: 'Added Todo', todo: newTodo, todos: todoDAO.all };
}

