// import { useState } from 'react'
// import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil'
// import { counterAtom } from './store/atoms/counter';

// function App() {

//   return (
//     <div>
//       <RecoilRoot>
//         <Counter />
//       </RecoilRoot>
//     </div>
//   );
// }

// function Counter () {
//   const [count, setCount] = useState(0);
//   return <div>
//     <CurrentCount />
//     <Increase />
//     <Decrease/>
//   </div>
// }

// function CurrentCount () {
//   const count = useRecoilValue(counterAtom); //we are importing the counterAtom here in this function using the useRecoilValue hook
//   // this element has now subscribed to the value of this atom
//   // so if the value changes then this element will re render
//   return <div>
//     Count: {count}
//   </div>
// }

// function Increase () {

//   const setCount = useSetRecoilState(counterAtom); //now this element is sort of subscribed to the setter as we needed it here BUT NOT THE VALUE, SO THEY WON'T BE RE RENDERED WHEN THE VALUE CHANGES UNLIKE CONTEXT API

//   const handleIncrease = () => {
//     setCount((count) => count + 1);
//   };

//   return <div>
//     <button onClick={handleIncrease}>Increase</button>
//   </div>
// }

// function Decrease () {

//   const setCount = useSetRecoilState(counterAtom);

//   const handleDecrease = () => {
//     setCount((count) => count - 1);
//   };

//   return <div>
//     <button onClick={handleDecrease}>Decrease</button>
//   </div>
// }

// export default App

//MEMOIZED APP

// import { useState, memo, useEffect } from "react";
// import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
// import { counterAtom } from "./store/atoms/counter";

// function App() {
//   return (
//     <div>
//       <RecoilRoot>
//         <Counter />
//       </RecoilRoot>
//     </div>
//   );
// }

// const CurrentCount = memo(({ count }) => {
//   return <div>Count: {count}</div>;
// });

// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setInterval(() => {
//       setCount((c) => c + 1);
//     }, 2000);
//   }, []);
//   return (
//     <div>
//       <CurrentCount count={count} />
//       <Increase />
//       <Decrease />
//     </div>
//   );
// }

// const MemoizedCurrentCount = memo(CurrentCount);

// const Increase = memo(() => {
//   const handleIncrease = () => {};

//   return (
//     <div>
//       <button onClick={handleIncrease}>Increase</button>
//     </div>
//   );
// });

// const Decrease = memo(() => {
//   const handleDecrease = () => {};

//   return (
//     <div>
//       <button onClick={handleDecrease}>Decrease</button>
//     </div>
//   );
// });

// export default App;

// //using the above code only the outer box re renders
// // if you pass a prop to memo and the prop changes then it has to re render like count above

// Code for Selectors
import { useEffect, useState, memo } from "react";
import { counterAtom, evenSelector } from "./store/atoms/counter";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

const Buttons = () => {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 2)}>Increase</button>
      <button onClick={() => setCount((count) => count - 1)}>Decrease</button>
    </div>
  );
};

const Counter = () => {
  const count = useRecoilValue(counterAtom);
  return <div>Count: {count}</div>
};

const IsEven = () => {
  const even = useRecoilValue(evenSelector); //here we use the same useRecoilValue hook but use the evenSelector from the counter.js file instead of the atom

  return <div>{even ? "Even" : "Odd"}</div>;
};

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Buttons />
        <Counter />
        <IsEven />
      </RecoilRoot>
    </div>
  );
};

export default App;