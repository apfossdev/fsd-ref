const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'super_secret_jwt_secret';
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://apfossdev:wSIwmkMPb0FmB7b0@cluster0.wjfk9.mongodb.net/todo-annamalai-app" 
);

// todo-annamalai-app is the name of the database, will create one with this name, if one already doesn't exist with this name
// if nothing is visible on the database, then check your connection request once again
const app = express();
app.use(express.json());

//importing the data models here from db.js
const {UserModel, TodoModel} = require('./db');

function auth(req, res, next) {
  // const token = localStorage.getItem('token'); //this won't work on the backend, will work only on the frontend
  const token = req.headers["authorization"]; //the convention is to use lower case authorization here NOT AUTHORIZATION //we get the token from the req headers which is sent to us with an axios method

  if (!token) {
    return res.status(400).json({ message: "Token not provided!" });
  }

  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData.userId) {
    req.userId = decodedData.userId; 
    next();
  } else {
    res.status(403).json({ message: "Incorrect credentials" });
  }
}

app.post("/signup", async (req, res) => { //make it async here
    //get the data from the body
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    //insert the above data into the data model of mongo
    //this is an async operation
    await UserModel.create({ //so it is a good idea to await this async promise
        username: username,
        password: password,
        name: name
    }); //if you don't await, then it will still print You are signed up without actually signing up

    res.json({
        message: "You are signed up"
    });
});
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   
    //check if user exists in the db
    const checkUser = await UserModel.findOne({
        username: username,
        password: password
    });

    console.log(checkUser);

    if(checkUser){
        const token = jwt.sign({
            userId: checkUser._id.toString()//this must be converted to a string to work as it is an object id, an object of a class //this is the payload on which we sign/create the token
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }
    else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});
app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;

  //get the data from the body
  const description = req.body.description;
  const done = req.body.done;

  await TodoModel.create({
    //so it is a good idea to await this async promise
    description: description,
    done: done,
    userId: userId
  });

  res.json({
    message: "The new todo has been created"
  });

});
app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    });
    res.json({
      todos
    }); //this logic for printing all the todos is slightly wrong fix it
});

app.listen(3000);