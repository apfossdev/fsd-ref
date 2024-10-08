const express = require("express");
const cors = require("cors"); //npm install cors
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    domains: "http://192.168.1.6:36901/", //for multiple whitelisted domains
  })
);

app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.json({
    ans: a + b,
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
