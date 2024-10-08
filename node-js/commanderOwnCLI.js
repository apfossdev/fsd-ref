//best practices
//always read to the file only once and write to the file only once avoiding multiple redundant operations and potentially overwriting the previous operations
//if you reading and writing simultaneously to multiple files using fs.readFile and fs.writeFile, many problems can occur and overwriting and race-problems may occur be careful

const { Command } = require ('commander');
const program = new Command();  
const fs = require('fs');

// const args = process.argv;
// const myArgs = args.slice(2);

// let filepath = myArgs[0];

program
.name('counter')
.description('CLI to do file based tasks')
.version('0.8.0');

program.command('count')
.description('Count the number of words in a file')
.argument('<filepath>','file to count')
.action((filepath) => {
  fs.readFile(filepath, "utf-8", (err, data) => {
    let contents = data.replace(/\s+/g, " ").trim();
    let wordCount = 1;
    let dataArr = contents.split("");
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i] == " ") wordCount++;
    }
    // console.log(dataArr);
    console.log(`You have ${wordCount} words in this file.`);
    // fs.writeFile(filepath, contents, () => {}); //we use an empty callback function
  }); //we can pass filepath like this as an argument as wordCounter(filepath) executes immediately and we don't want that
});

program.parse();


    

