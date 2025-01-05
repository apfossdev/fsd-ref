"use strict";
// const greetUser = (userName: string) => {
//   console.log("Hello ", userName);
// };
const greeting = (user) => {
    console.log(user.name);
};
//arrays
const getMax = (nums) => {
    let maxValue = -1000000000000;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > maxValue) {
            maxValue = nums[i];
        }
    }
    console.log(maxValue);
};
getMax([1, 2, 3]);
