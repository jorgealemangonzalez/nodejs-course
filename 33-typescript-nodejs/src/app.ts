import bodyParser from 'body-parser';
import express from 'express';
import todosRoutes from './routes/todos';



const app = express();

app.use(bodyParser.json());

app.use(todosRoutes);

export default app.listen(3000);
