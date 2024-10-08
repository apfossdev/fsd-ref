//try and catch  

//when an exception is raised the process exits since the js program doesn't want to proceed anymore
//but you might want to still execute the program, that's why we use try catch
//when you know some code blocks will lead to errors at some definite future probabilities then you surely use try catch

try {
    let a;
    console.log(a.length);
    console.log('hi there from inside');
} catch(e) {
    console.log('inside catch statement');
}

console.log('hi there')