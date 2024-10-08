// function random(resolve){ //resolve is a function too
//     //resolve(); //it is called immediately
//     setTimeout(resolve,3000); //here the resolve function is called immediately
// }

// let p = new Promise(random); //random function decides when the promise will get over

// function callback(){ // this is the .then() function used and called when the resolve function is called 
//     console.log("Promise succeeded");
// }
// p.then(callback);


// function waitForNSeconds(resolve, n) {
//   setTimeout(resolve, n * 1000);
// }

// function wait(n) {
//   return new Promise(waitForNSeconds, n);
// }


// // promise chaining understood easily

// //     e.g. Q: Write code that

// //     logs hi after 1 second

// //     logs hello 3 seconds after step 1

// //     logs hello there 5 seconds after step 2



// function setTimeoutPromisified(durationInMS){
//     return new Promise((resolve)=>{
//         setTimeout(resolve,durationInMS);
//     });
// }

// setTimeoutPromisified(1000)
//     .then(() => {
//         console.log("hi");
//         return setTimeoutPromisified(3000);
//     })
//     .then(() => {
//         console.log("hello");
//         return setTimeoutPromisified(5000);
//     })
//     .then(() => {
//         console.log("hello there");
//     }); //semicolon at the end

// // async await syntax (prettier async code compared to promise chaining)

// function setTimeoutPromisified(durationInMS){
//     return new Promise((resolve)=>{
//         setTimeout(resolve,durationInMS);
//     });
// }

// async function solve(){
//     await setTimeoutPromisified(1000); //it appears sync code and the thread is stuck here but after solve function gets printed first
//     console.log("hi");
//     await setTimeoutPromisified(3000);
//     console.log("hello");
//     await setTimeoutPromisified(5000);
//     console.log("hello there");
// }

// solve();

// console.log("after solve function");

// // //async cleanFile

const fs = require("fs");

function cleanFile(filePath, callback){
    return new Promise((resolve) => {
        fs.readFile("a.txt","utf-8", (err,data) => {
           let contents = data.replace(/\s+/g, " ").trim();
           fs.writeFile("a.txt",contents,"utf-8",() => {
            resolve(); 
           }); 
        });
    });
}

async function main() {
  await cleanFile("a.txt");
  console.log("Done cleaning file");
}

main();

// //async readFile

//how to handle errors and rejects in promises
const fs = require('fs');

function readFilePromisified(filepath){
    return new Promise((resolve,reject) => {
        fs.readFile(filepath, "utf-8", (err,data) => {
            if(err){
            reject("Error while reading file");
            }
            else{
            resolve(data);
            }
        });
    });
}


// function onDone(data) {
//   console.log(data);
// }

// function onError(err) {
//   console.log("Error: " + err);
// }

// readFilePromisified("add.txt").then(onDone).catch(onError);

// async (promisified) fetch

const fetchURL = "https://jsonplaceholder.typicode.com/todos/2";

function promisifiedFetch(URL){
    return new Promise((resolve, reject) => {
        fetch(URL) //as fetch is async by nature we can use .then directly on it
        .then(response => {
            if (!response.ok) {
                throw new Error ('Network response not ok')
            }
            return response.json();
        })
        //then resolve the promise by sending the data
        .then(data => resolve(data)) //if you are getting any data from the function like fetch or readFile, you must also pass it to resolve else it wont work, if no data then no need to pass
        .catch(error => console.error('Error:',error));
    })
}

//see previous return new promise functions you will get a good idea of how the promises are working but switching to async await is much simpler and easier in the long run

promisifiedFetch(fetchURL)
.then((data) => console.log(data))
.catch((error) => console.error('Error:',error));
