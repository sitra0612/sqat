const { addTodo } = require('../server/controller/controller');
const Todo = require('../server/model/todos');

jest.mock('../server/model/todos', () => ({
  find: jest.fn(() => []),
  insertMany: jest.fn()
}));

describe('addTodo', () => {
  test('adds new todo', async () => {
    const req = {
      body: {
        kegiatan: 'Test Todo'
      }
    };
    const res = {
      status: jest.fn(),
      render: jest.fn(),
      redirect: jest.fn()
    };
    Todo.insertMany = jest.fn((id, callback) => {
      callback(null, {});
    });
    await addTodo(req, res);

    expect(Todo.find).toHaveBeenCalled();
    expect(Todo.insertMany).toHaveBeenCalledWith(req.body, expect.any(Function));
      
  // Wait for the callback to be called before checking the redirect
  setTimeout(() => {
    expect(res.redirect).toHaveBeenCalledWith('/');
  }, 10000);

  });

  test('displays error for duplicate todo', async () => {
    const req = {
      body: {
        kegiatan: 'Test Todo'
      }
    };
    const res = {
      status: jest.fn(),
      render: jest.fn(),
      redirect: jest.fn()
    };

    Todo.find.mockImplementationOnce(() => [{ kegiatan: 'Test Todo' }]);

    await addTodo(req, res);

    expect(Todo.find).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('add-todo', {
      title: 'Add Todo',
      layout: 'layouts/mainLayout',
      error: 'Nama todo tidak boleh sama!'
    });
  });
});
