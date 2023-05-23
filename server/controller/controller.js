const Todo = require("../model/todos");

// Show All Documents || Home page
exports.findAllTodo = async function (req, res) {
  const todos = await Todo.find({});
  // res.status(200);
  res.render("index", {
    title: "Node JS Todo App",
    layout: "layouts/mainLayout",
    todos,
  });
 
};

// Add todo page
exports.addTodoRoutes = function (req, res) {
  // res.status(200);
  res.render("add-todo", {
    title: "Add Todo",
    layout: "layouts/mainLayout",
  });
};

// Add new todo
exports.addTodo = async function (req, res) {
  const todos = await Todo.find({});
  const duplicateTodos = todos.find(
    (todo) => todo.kegiatan.toLowerCase() === req.body.kegiatan.toLowerCase()
  );

  if (duplicateTodos) {
    // res.status(200);
    res.render("add-todo", {
      title: "Add Todo",
      layout: "layouts/mainLayout",
      error: "Nama todo tidak boleh sama!",
    });
    return false;
  } else {
    Todo.insertMany(req.body, function (err, result) {
      if (err) {
        console.log('Error:', err);
        return false;
      }
      if (!result) {
        console.log('Error: result is undefined');
        return false;
      }
      res.redirect("/");
    });
  }
};

// Edit todo page
exports.editTodoRoutes = async function (req, res) {
  const todo = await Todo.findById(req.params.id);
  // res.status(200);
  res.render("edit-todo", {
    title: "Edit Todo",
    layout: "layouts/mainLayout",
    todo,
  });
 
};

// edit todo
exports.editTodo = async function (req, res) {
  const todos = await Todo.find({});
  const duplicateTodos = todos.find(
    (todo) => todo.kegiatan.toLowerCase() === req.body.kegiatan.toLowerCase()
  );

  if (duplicateTodos) {
    // res.status(200);
    res.render("edit-todo", {
      title: "Edit Todo",
      layout: "layouts/mainLayout",
      error: "Nama todo tidak boleh sama!",
      todo: req.body,
    });
    return false;
  } else {
      Todo.findByIdAndUpdate(req.body._id,req.body, function(err, result) {
        if (err) {
          console.log('Error:', err);
          return false;
        }
        if (!result) {
          console.log('Error: result is undefined');
          return false;
        }
        res.redirect("/");
      });
    }
};

// delete todo
exports.deleteTodo = function (req, res) {
  if (!Todo.findByIdAndDelete) {
    return res.status(500).send('Todo model does not have findByIdAndDelete method');
  } else {
    Todo.findByIdAndDelete(req.body._id, function(err, result) {
      if (err) {
        console.log('Error:', err);
        return false;
      }
      if (!result) {
        console.log('Error: result is undefined');
        return false;
      }
      res.redirect("/");
    });
  }
};

// Page not found
exports.pageNotFound = function (req, res) {
  res.render("404", {
    title: "404 Not Found Page :(",
    layout: "layouts/mainLayout",
  });
};