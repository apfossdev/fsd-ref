const express = require('express');
const app = express();

// middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
function middlewareLog(req, res, next){
  console.log(`${req.method} ${req.originalUrl} ${Date.now()}`);
  next(); // o move the execution to the next function(middleware or not)
}

// app.use(middlewareLog); // for all the endpoints to globally go through this middleware before the route handler function

// middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

let totalNumberOfRequests = 0;

function requestCounterMiddleware(req, res, next){
  totalNumberOfRequests++;
  next();
}

app.use(requestCounterMiddleware);

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans:a + b
    });
})

app.get("/subtract", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
      ans: a - b
    });
});

app.get("/multiply", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
      ans: a * b
    });
});

app.get("/divide", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
      ans: a / b
    });
});

app.get('/admin', (req, res) => {
  console.log(`Total no. of requests to the server ${totalNumberOfRequests}`);
});


app.listen(3000);