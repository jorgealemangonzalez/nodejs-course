import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import { todoDAO } from '../storage/TodoDAO';

describe('App should', () => {

    afterEach(() => {
        todoDAO.clearStorage()
    })

    after((done) => {
        app.close(done)
    });

    it('get empty list of todos', async () => {
        const allTodos = await getAllTodos()
        expect(allTodos).to.have.lengthOf(0)
    })

    it('create todo', async () => {
        const res = await createTodo('created')
        expect(res.body.todos).to.have.lengthOf(1)
        expect(res.body.todos[0].text).to.eq('created')
    })

    it('update todo', async () => {
        const todoCreated = await createTodo('created')
        const res = await updateTodo(todoCreated.body.todos[0].id, 'updated')
        expect(res.body.todos).to.have.lengthOf(1)
        expect(res.body.todos[0].text).to.eq('updated')
    })
})

async function getAllTodos() {
    const res = await request(app)
    .get('/')
    .expect(200)
    return res.body.todos;
}

async function createTodo(text: string) {
    return await request(app)
        .post('/todo')
        .send({ text })
        .expect(201);
}


async function updateTodo(id: string, text: string) {
    return await request(app)
        .put('/todo/' + id)
        .send({ text })
        .expect(200);
}