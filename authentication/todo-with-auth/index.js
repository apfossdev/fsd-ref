const express = require("express");
const port = 3000;

const jwt = require("jsonwebtoken");
const JWT_SECRET = "iloveneha";

const app = express();
app.use(express.json());

const users = []; //our super amazing db for now

//auth middleware to verify each request using the token in local storage

function authMiddleware(req, res, next) {
  // const token = localStorage.getItem('token'); //this won't work on the backend, will work only on the frontend
  const token = req.headers["authorization"]; //the convention is to use lower case authorization here NOT AUTHORIZATION //we get the token from the req headers which is sent to us with an axios method

  if (!token) {
    return res.status(400).json({ message: "Token not provided!" });
  }

  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData.username) {
    req.username = decodedData.username; //to send the username to the next routes through the req by updating the req object
    next();
    // res.status(200).json({ message: "Authentication successful" }); //res or response should always be the last line in a code block //But that too is causing problems here, as next is supposed to be the last line, so if correct 200, no need to send message for now
  } else {
    res.status(401).json({ message: "You are not logged in!" });
  }
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //to check if user already exists
  const foundUser = users.find((u) => {
    if (u.username == username) {
      return true;
    } else {
      return false;
    }
  });

  //if doesn't, create user and alert user, that it is done successfully
  if (!foundUser) {
    users.push({
      username: username,
      password: password,
    });
    res.status(201).json({
      message: "Account created successfully",
    });
  }
  //if exists, tell frontend to not accept the current uname
  else {
    res.status(200).json({
      //if you send status 409, then the alert message won't show, don't know why also people say this is better practice
      message: "Username already exists!",
    });
  }
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //to check if username and password exist in db and are correct

  //to check if user exists
  const foundUser = users.find((u) => {
    if (u.username == username) {
      return true;
    } else {
      return false;
    }
  });

  // if username doesn't exist, respond user doesn't exist
  if (!foundUser) {
    res.status(400).json({
      message: "User doesn't exist!",
    });
  }

  //if pass correct, generate jwt and store it in local storage
  else {
    if (foundUser.password == password) {
      const token = jwt.sign(
        {
          username,
        },
        JWT_SECRET
      );
      res.status(200).json({
        message: "You are logged in successfully!",
        token: token,
      });
    }
    //else if username exists, password wrong, respond wrong password
    else {
      res.status(400).json({
        message: "Wrong password! Try again.",
      });
    }
  }
});

app.post("/createTodo", authMiddleware, (req, res) => {
  // get input on todo title from html page through axios
  const newTodoTitle = req.body.title;
  // for the particular username add new todo in a new db or existing db
  for (let obj in users) {
    if (users[obj].username == req.username) {
      if (!users[obj].todos) {
        //here it is todos is meant to be a string key so we keep it like that in inverted commas
        users[obj].todos = []; // Initialize the array if it doesn't exist
      }
      users[obj].todos.push(newTodoTitle);
      break; // Exit the loop once you find the match
    }
  }
  console.log(users);
  res.status(200).json({
    message: "Your new todo is created!",
    username: req.username,
  });
});

app.get("/printTodos", authMiddleware, (req, res) => {
  //sends response with todos in json format
  for (let obj in users) {
    if (users[obj].username == req.username) {
      console.log(users[obj].todos);
      res.json(users[obj].todos);
    }
  }
});

app.delete("/deleteTodo", authMiddleware, (req, res) => {
  console.log("Delete request received");
  // get the name of the todo from the axios req and delete it from the db accordingly
  const todoToBeDeleted = req.body.todoToBeDeleted;
  //find the obj with the username and delete this value from it
  for (let obj in users) {
    if (users[obj].username == req.username) {
      // now loop through this objects todos and when you find it delete it
      for (let i = 0; i < users[obj].todos.length; i++) {
        if (todoToBeDeleted == users[obj].todos[i]) {
          users[obj].todos.splice(i, 1);
          console.log(users[obj].todos);
          res.json({
            message: "The todo has been deleted successfully"
          });
        }
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
