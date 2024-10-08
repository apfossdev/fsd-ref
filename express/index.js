//express is an external lib to create http servers
//npm init -y to initialize a node js project
//always restart server after making changes to the server code

const express = require('express');

const app = express();

function sum(n){
    return n*(n+1)/2;
}
app.get("/", (req, res) => { // call back function
    const n = parseInt(req.query.n); //as req.query always inputs as a string
    const ans = sum(n);
    res.send("hi your answer is " + ans);

})


app.listen(3000);