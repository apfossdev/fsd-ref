"use strict";
const sumOfAge = (user1, user2) => {
    return user1.age + user2.age;
};
const age = sumOfAge({
    name: 'Taro',
    age: 20
}, {
    name: "bala",
    age: 40
});
console.log(age);
