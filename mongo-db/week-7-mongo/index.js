const bcrypt = require('bcrypt');
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require('zod');

//don't push your credentials too, onto your github
mongoose.connect(
  "mongodb+srv://apfossdev:QQneHUwQNeZlJl8s@cluster0.wjfk9.mongodb.net/week-7-mongo"
);

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
  // input validation
  //defining the zod schema is step 1
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });

  // step 2 is parsing the data
//   const parsedData = requiredBody.parse(req.body); //this will throw an error straight away if input is not validated, so we need to wrap it in a try catch block, thus we prefer to use safe parse 
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  //it returns an object like this 
//   {
//     success: true || false,
//     data: {},
//     errors: []
//   }


  //here we use the safeParse function, there is small diff between parse and safeParse function
  if(!parsedDataWithSuccess.success) {
    res.json({
        message: "Incorrect format",
        error: parsedDataWithSuccess.error //to show the user why his input was not validated
    });
    return;
  }


  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  let errorThrown = false;

  try {
    //before storing the pass, we need to hash the password
    const hashedPassword = await bcrypt.hash(password, 5); //in this promisified argument we don't need the 3rd argument //5 is the number of salt rounds, more rounds, more complex to break// if you don't use salt rounds, we don't need to await as well
    console.log(hashedPassword);

    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name
    });
  } catch (e) {
    errorThrown = true;
    res.json({
      message: "User already exists",
    });
  }

  //for every route you can have only 1 response res
  //hence we use this errorThrown bool variable
  //ideally every code you know is going to throw some error, should be in a try catch block

  if (!errorThrown) {
    res.json({
      message: "You are signed up",
    });
  }
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email
        // ,password: password we don't use this anymore, as we compare the salted hashed passwords
    });

    if(!response){
        res.status(403).json({
            message: "User doesn't not exist in your db"
        });
        return;
    }

    //here we compare the password converted to the pass string and the entry from db

    const passwordMatch = await bcrypt.compare(password, response.password); //if you don't await this, IT WILL ALWAYS BE TRUE AS IT RETURNS A PROMISE, AND IT WILL BE TRUE ALWAYS, AND YOU MIGHT LOSE YOUR JOB BECAUSE OF THIS, THAT'S WHY ALWAYS TEST ALL THE EDGE CASES AND FUNCTIONALITIES BEFORE PRODUCTION

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);