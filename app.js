const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let tasks = [];


app.get("/", (req, res) => {
  res.render("index", { tasks });
});


app.post("/tasks", (req, res) => {
  const { title, dueDate, dueTime } = req.body;
  tasks.push({
    id: Date.now().toString(),
    title,
    completed: false,
    dueDate,
    dueTime
  });
  res.redirect("/");
});


app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (task) task.completed = !task.completed;
  res.redirect("/");
});


app.get("/tasks/:id/edit", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  res.render("edit", { task });
});

app.put("/tasks/:id/edit", (req, res) => {
  const { title, dueDate, dueTime } = req.body;
  const task = tasks.find((t) => t.id === req.params.id);
  if (task) {
    task.title = title;
    task.dueDate = dueDate;
    task.dueTime = dueTime;
  }
  res.redirect("/");
});


app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
