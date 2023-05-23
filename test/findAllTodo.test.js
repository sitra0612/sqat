const { findAllTodo } = require('../server/controller/controller');
const Todo = require('../server/model/todos');

jest.mock('../server/model/todos', () => ({
  find: jest.fn(() => [{ id: 1, title: 'Test Todo' }])
}));

describe('findAllTodo', () => {
  test('renders index page with todos', async () => {
    const req = {};
    const res = {
      render: jest.fn()
    };

    await findAllTodo(req, res);

    expect(Todo.find).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('index', {
      title: 'Node JS Todo App',
      layout: 'layouts/mainLayout',
      todos: [{ id: 1, title: 'Test Todo' }]
    });
  });
});




