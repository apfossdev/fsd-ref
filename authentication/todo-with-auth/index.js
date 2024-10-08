const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

const users = []; //our super amazing db for now

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

