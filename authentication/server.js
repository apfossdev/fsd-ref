const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "annamalai@123";

const app = express();
app.use(express.json());

const users = [];

function auth(req, res, next) { //ideally wrap it in a try catch block
    try{
        const token = req.headers.token;
        if(!token) {
            return res.status(401).json({ message: 'Token not provided!' });
        }
        const decodedData = jwt.verify(token, JWT_SECRET); //HERE VERIFY NOT DECODE (JWT.DECODE), IT WILL LEAD TO  A SECURITY VULNERABILITY
        
        if(decodedData.username) {
            req.username = decodedData.username; //to send the username to the next routes through the req by updating the req object
            next();
        }
        else{
            res.status(401).json({ message: 'You are not logged in!' })
        }
    }catch(e){
        //catch any errors in token verification
        res.status(401).json({message: 'Invalid token'});
    }
    
}

function logger(req, res, next){
    console.log(req.method + " request came");
    next();
}

// we do the below, to serve the following html page at the same localhost:3000 where the backend is hosted at for the '/' endpoint/route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index1.html");
});

app.post('/signup', logger, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  //check if username already exists
  const foundUser = users.find((u) => {
      if (u.username == username) {
        return true;
      } else {
        return false;
      }
  });
  if(!foundUser){
    users.push({
    username: username,
    password: password,
  });
  res.json({
    message: "You are signed up!",
  });
  }
  else{
    res.json({
      message: "An account already exists with the same email!"
    });
  }
  
}); 

app.post('/signin', logger, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const foundUser = users.find((u) => {
        if(u.username == username && u.password == password){
            return true;
        }
        else{
            return false;
        }
    });

    if(!foundUser){
        res.json({
            message: "Credentials incorrect!"
        });
        // return
    }else{
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token: token
        })
    }
});

app.get('/me', logger, auth, (req, res) => {

    
    const foundUser = users.find((u) => {
      if (u.username == req.username) {
        return true;
      } else {
        return false;
      }
    });
    if (foundUser) {
      const username = foundUser.username;
      const password = foundUser.password;
      res.json({
        username: username,
        password: password,
      });
    } else {
      res.status(403).send({
        message: "Invalid username or password",
      });
    }
});

app.listen(3000);