const { Command } = require("commander");
const program = new Command(); //here program is a new class
const fs = require("fs").promises //to import promises;

program
  .name("todo-cli")
  .description("used to add, delete and mark as done tasks from cli")
  .version("0.9.0");

program
  .command("add")
  .description("used to add tasks from cli")
  .argument("<task_name>", "the task to be added")
  .action(async (task_name) => {
    const jsonFilePath = "/home/annamalai/100xdevs/node-js/todo-cli/todos.json";

    const data = await fs.readFile(jsonFilePath, "utf-8");
    const dataArr = JSON.parse(data); //converts strings into JSON objects as fs reads it as a string only
    // console.log(dataArr);
    const contents = {
      task: task_name,
      completed: "no",
    };
    dataArr.push(contents);
    // console.log(dataArr);
    const updatedJSON = JSON.stringify(dataArr, null, 2); //converts updated json data back to string so fs.writeFile can be used
    await fs.writeFile(jsonFilePath, updatedJSON, 'utf-8')
    console.log("your todo has been added");
  });

  program
    .command("delete")
    .description("delete tasks from cli")
    .argument("<task_name", "the task to be deleted")
    .action(async (task_name) => {
        const jsonFilePath =
          "/home/annamalai/100xdevs/node-js/todo-cli/todos.json";

        const data = await fs.readFile(jsonFilePath, "utf-8");
        const dataArr = JSON.parse(data); //converts strings into JSON objects as fs reads it as a string only
        // console.log(dataArr);
        for(let i = 0; i < dataArr.length; i++){
            if(dataArr[i]["task"] == task_name){
                dataArr.splice(i,1);
            }
        }
        // console.log(dataArr);
        const updatedJSON = JSON.stringify(dataArr, null, 2); //converts updated json data back to string so fs.writeFile can be used
        await fs.writeFile(jsonFilePath, updatedJSON, "utf-8");
        console.log("your todo has been deleted");
    })
     program
       .command("mark-as-done")
       .description("marks tasks as done using cli")
       .argument("<task_name", "the task to be marked as done")
       .action(async (task_name) => {
        const jsonFilePath =
          "/home/annamalai/100xdevs/node-js/todo-cli/todos.json";

        const data = await fs.readFile(jsonFilePath, "utf-8");
        const dataArr = JSON.parse(data); //converts strings into JSON objects as fs reads it as a string only
        console.log(dataArr);
        for(let i = 0; i < dataArr.length; i++){
            if(dataArr[i]["task"] == task_name){
                dataArr[i]["completed"] = "yes";
                // console.log(dataArr[i]);
            }
        }
        // console.log(dataArr);
        const updatedJSON = JSON.stringify(dataArr, null, 2); //converts updated json data back to string so fs.writeFile can be used
        await fs.writeFile(jsonFilePath, updatedJSON, "utf-8");
        console.log("your todo has been marked as done");
    })

  program.parse(); //very important step, need to convert program object{now presently a json string} to a json object 
