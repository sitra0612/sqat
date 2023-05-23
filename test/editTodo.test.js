const { editTodo } = require('../server/controller/controller');
const Todo = require('../server/model/todos');

jest.mock('../server/model/todos', () => ({
  find: jest.fn(() => []),
  findByIdAndUpdate: jest.fn()
}));

describe('editTodo', () => {
  test('updates existing todo', async () => {
    const req = {
      body: {
        _id: '1',
        kegiatan: 'Updated Todo'
      }
    };
    const res = {
      status: jest.fn(),
      render: jest.fn(),
      redirect: jest.fn()
    };
    Todo.findByIdAndUpdate = jest.fn((id, callback) => {
      callback(null, {});
    });
    await editTodo(req, res);

    expect(Todo.find).toHaveBeenCalled();
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(req.body._id, expect.any(Function));
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('displays error for duplicate todo', async () => {
    const req = {
      body: {
        _id: '1',
        kegiatan: 'Test Todo'
      }
    };
    const res = {
      status: jest.fn(),
      render: jest.fn(),
      redirect: jest.fn()
    };

    Todo.find.mockImplementationOnce(() => [{ kegiatan: 'Test Todo' }]);

    await editTodo(req, res);

    expect(Todo.find).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith('edit-todo', {
      title: 'Edit Todo',
      layout: 'layouts/mainLayout',
      error: 'Nama todo tidak boleh sama!',
      todo: req.body,
    });
  });
});