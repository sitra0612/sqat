const controller = require('../server/controller/controller');
const Todo = require('../server/model/todos');

jest.mock('../server/model/todos', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteTodo', () => {
  test('deletes an existing todo', () => {
    const req = { body: { _id: '123' } };
    const res = { redirect: jest.fn() };
    Todo.findByIdAndDelete = jest.fn((id, callback) => {
      callback(null, {});
    });
    Todo.findByIdAndDelete.mockResolvedValueOnce(true);
    controller.deleteTodo(req, res);

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('123', expect.any(Function));
    
  // Wait for the callback to be called before checking the redirect
  setTimeout(() => {
    expect(res.redirect).toHaveBeenCalledWith('/');
  }, 10000);
  });
});