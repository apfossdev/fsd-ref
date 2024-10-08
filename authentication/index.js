const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const JWT_SECRET = "annamalailovesneha";

app.use(express.json()); //helps you parse any POST body

const users = [];
// const characters =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//generate a long random string
// function generateToken(){
//     const length = 32;
//     let token = "";
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       token += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return token;
// }

app.post('/signup', (req, res) => {
    //input validations later with zod
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "You are signed up!"
    })

    console.log(users);
});

app.post("/signin", (req, res) => {
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

    if(foundUser) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET); //only username here, convert username over to a jwt with a secret 
        // foundUser.token = token; don't need to store it explicitly as in stateful basic tokens

        res.json({
            token: token
        });
    }
    else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users);
});

app.get("/me", (req, res) => {
    const token = req.headers.token; //headers work on all endpoints, background meta data
    const decodedInformation = jwt.verify(token, JWT_SECRET); //{username: annamalai@gmail.com}
    const username = decodedInformation.username;
    
    const foundUser = users.find((u) => {
        if(u.username == username){
            return true;
        }
        else{
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
    console.log(users);
});

app.listen(3000);