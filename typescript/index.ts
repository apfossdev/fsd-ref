// const greetUser = (userName: string) => {
//   console.log("Hello ", userName);
// };

// const sumOfTwoNumbers = (num1: number, num2: number) => {
//   console.log(num1 + num2);
// };

// const delayedCall = (fn: () => void) => {
//   setTimeout(fn, 1000);
// };

// const greet = () => {
//   console.log("Hello");
// };

// const helloUser = (user: { name: string; age: number }) => {
//   console.log("hello " + user.name);
// };

// const user: {
//   name: string,
//   age: number
// } = {
//   name: "harkirat",
//   age: 21
// } // but this is less readable here

// // interface UserType {
// //   firstName: string,
// //   lastName: string,
// //   age: number
// // }

// const greetAgain = (user: UserType) => {
//   //much neater above in the params as we are using an interface here
// }

// // Todo.tsx
// interface TodoType {
//   title: string;
//   description: string;
//   done: boolean;
// }

// interface TodoInput {
//   todo: TodoType;
// }

// // function Todo({ todo }: TodoInput) {
// //   return <div>
// //     <h1>{todo.title}</h1>
// //     <h2>{todo.description}</h2>
    
// //   </div>
// // }

// //Interfaces and Types

// interface UserInterface {
//   name: string,
//   age: number
// }

// type UserType = {
//   name: string,
//   age: number
// }

// //In Types we can use & and | operators (Unions and Intersections)
// //Union
// type SumInput = string | number;

// // const sum = (a: SumInput, b:SumInput) => {
// //   return a + b;
// // } // as ts can't sum (string | number) + (string | number)

// //Intersection
// // can merge 2 types as well or one interface and one type as done below
// interface Manager {
//   name: string,
//   age: number
// }

// type Employee = {
//   name: string,
//   department: string
// }

// type TeamLead = Manager & Employee //here will take name from left to right if both use same keys so name will be used from Manager

// // we can use interfaces in interfaces
// // we can implement interfaces as a class
// interface People {
//   name: string,
//   age: number,
//   // greet: () => string,
// }

// // let person: People = {
// //   name: "harkirat",
// //   age: 21,
// //   // greet: () => {
// //   //   return "hi"
// //   // } //but we can't use the name in this function itself here, HENCE CLASSES WERE INTRODUCED
// // }

// class Manager implements People {
//   name: string;
//   age: number;
//   address: string; // extra keys can be implemented in this class but all the keys of People interface here name and age must definitely be implemented


//   constructor(name: string, age: number, address: string) {
//     this.name = name;
//     this.age = age;
//     this.address = address;
//   }
// }

// let newUser = new Manager("John", 30, "Gangnam Street" );
// console.log(newUser.age);

// // let greeting = person.greet();
// // console.log(greeting);


// greetUser("Annamalai");
// sumOfTwoNumbers(6, 8);
// delayedCall(greet);
// helloUser({ name: "prabu", age: 22 });

// abstract class Player {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }

//   abstract greet: () => string;
//   hello() {
//     console.log("hi there");
//   }
// }

// // class Gamer implements Player {
// //   name: string;
// //   constructor (name: string) {
// //     // super(name)
// //     this.name = name;
// //   }

// //   greet() {
// //     return "hi " + this.name; 
// //   }
// // }


//assignment
//interfaces vs types

interface User {
  name: string;
  age: number;
}

interface Admin {
  name: string;
  permissions: string;
}

type UserOrAdmin = User | Admin; //this | operator usage as done here can only be done in Types

const greeting = (user : UserOrAdmin) => {
  console.log(user.name);
}

interface User1 {
  age: number | string;
}

//arrays

const getMax = (nums: number[]) => {
  let maxValue = -1000000000000;

  for(let i = 0; i < nums.length; i++){
    if(nums[i] > maxValue){
      maxValue = nums[i];
    }
  }
  console.log(maxValue);
}

getMax([1,2,3]);

