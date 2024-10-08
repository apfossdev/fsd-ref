// now we need to make it persistent, make it read from a todos.json file

const fs = require('fs').promises; //to get to use promise based functions
const path = './todos.json';

const express = require('express');
const app = express();

const bodyParser = require('body-parser'); //it is to read body requests, it is a middleware
app.use(bodyParser.json()); //this automatically parses the json data from the req body (is a middleware)

let allTodos = {};
loadAllTodos();

async function loadAllTodos(){
    const data = await fs.readFile(path, 'utf-8');
    allTodos = JSON.parse(data);
} 

async function saveTodos(){
    await fs.writeFile(path, JSON.stringify(allTodos));
}

//route handlers

app.post('/:userID/create', (req,res) => {
    const userID = req.params.userID;
    const newTodo = req.body;
    const newID = Math.floor(Math.random() * 1000000);
    newTodo["id"] = newID;
    // const allTodos = {};
    if(!allTodos.hasOwnProperty(userID)){
        allTodos[userID] = [];
    }
    allTodos[userID].push(newTodo);
    saveTodos();
    res.send(`The new todo is created with the id ${newID}`);
});

app.delete('/:userID/delete/:id', (req,res) => {
    const userID = req.params.userID;
    const id = req.params.id;
    if(allTodos.hasOwnProperty(userID)) {
        for (let i = 0; i < allTodos[userID].length; i++) {
          if (allTodos[userID][i]["id"] == id) {
            allTodos[userID].splice(i, 1);
            res.send("The required todo is deleted");
          }
        }
    }
    saveTodos();
});

app.get('/todos', (req,res) => {
    res.send(allTodos);
});

app.get("/:userID/todos", (req, res) => {
  const userID = req.params.userID;
  if (allTodos.hasOwnProperty(userID)) {
    res.send(allTodos[userID]);
  }
});

app.put("/:userID/update/:id", (req, res) => {  
  const userID = req.params.userID;
  const updatedTodo = req.body;
  const id = req.params.id;
  if (allTodos.hasOwnProperty(userID)) {
    for (let i = 0; i < allTodos[userID].length; i++) {
      if (allTodos[userID][i]["id"] == id) {
        allTodos[userID][i]["title"] = updatedTodo["title"];
        allTodos[userID][i]["description"] = updatedTodo["description"];
        res.send("The required todo is updated");
      }
    }
  }
  saveTodos();
});

app.listen(3000);


// req.query is used to access query parameters, which are key-value pairs appended to the end of the URL with a "?" character. For example, in the URL http://example.com/search?q=express, "q=express" is a query parameter and can be accessed using req.query.q.

// req.params is used to access parameters in the route path, which are placeholders in the URL that can be matched to values. For example, in the route app.get('/users/:id', ...), ":id" is a parameter and the value can be accessed using req.params.id.

// In short req.query is used for getting the query string values and req.params is used for getting the route parameters.