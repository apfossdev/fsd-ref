const express = require('express');
const port = 3000;

const jwt = require('jsonwebtoken');
const JWT_SECRET = "iloveneha";

const app = express();
app.use(express.json());

const users = []; //our super amazing db for now

//auth middleware to verify each request using the token in local storage

function authMiddleware(req, res, next){
    const token = localStorage.getItem('token');
    if (!token) {
      return res.status(400).json({ message: "Token not provided!" });
    }

    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData.username){
      req.username = decodedData.username; //to send the username to the next routes through the req by updating the req object
      res.status(200).json({ message: "Authentication successful" });
      next();
    }
    else{
        res.status(401).json({ message: "You are not logged in!" });
    }

}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/signup', (req, res) => {
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
        message: "Account created successfully"
      });
    }
    //if exists, tell frontend to not accept the current uname
    else {
        res.status(200).json({ //if you send status 409, then the alert message won't show, don't know why also people say this is better practice
          message: "Username already exists!",
        });
    }
});

app.post('/signin', (req, res) => {
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
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.status(200).json({
            message: "You are logged in successfully!",
            token: token
        });
    }
    //else if username exists, password wrong, respond wrong password
    else{
        res.status(400).json({
            message: "Wrong password! Try again."
        })
    }
  } 
  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

