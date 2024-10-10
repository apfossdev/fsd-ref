//for all the db logic

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //here Schema is a class
const ObjectId = Schema.ObjectId; //need to import object ids from the created schema from mongoose library

const User = new Schema({
    username: {type: String, unique: true}, //won't allow 2 or more duplicate requests of usernames
    password: String,
    name: String
});

const Todo = new Schema({
    description: String,
    done: Boolean,
    userId: ObjectId
});

const UserModel = mongoose.model('users', User); //mongoose.model allows us to insert data into the users collections following User schema
const TodoModel = mongoose.model('todos', Todo);

//we are exporting an object here with the keys UserModel and TodoModel to use in the index.js file
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}