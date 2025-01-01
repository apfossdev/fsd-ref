import { useRef, useState } from 'react'


const App = () => {
  // // this is the ugly way to focus on an element using DOM Manipulation
  // // const focusOnInput = () => {
  // //   document.getElementById('name').focus()
  // // }

  // //I want to create a reference
  // const inputRef = useRef();

  // const focusOnInput = () => {
  //   // document.getElementById('name').focus()
  //   // instead of above we can use the below
  //   inputRef.current.focus();
  // }

  // return (
  //   <div>
  //     Sign up
  //     {/* the attribute below is called as ref */}
  //     <input ref={inputRef} type="text" id="name" />
  //     <input type="text" />
  //     <button onClick={focusOnInput}>submit</button>
  //   </div>
  // );

  // a clock with start and stop button
  const [currentCount, setCurrentCount] = useState(0);

  // let timer = 0; //this wont work as every time the component is re-rendered which happens a lot in React on its own, it will be initialized to 0
  // const [timer, setTimer] = useState(0); //this should work now as state variables are guarded during re renders
  //but this is slightly unoptimized as here an extra re render
  //when the html same, why re-render, HENCE TO SOLVE THIS WE USE useRef Hook

  const timer = useRef();

  const startClock = () => {
    let value = setInterval(() => {
      setCurrentCount(c => c+1);
    }, 1000);
    // setTimer(value); //this setTimer will cause a re render as setState, 
    timer.current = value; //
  }

  const stopClock = () => {
    // clearInterval(timer);
    clearInterval(timer.current); //thus useRef is a good middle ground between normal variables and state variables
  }

  return <div>
    {currentCount}
    <br />
    <button onClick={startClock}>Start</button>
    <button onClick={stopClock}>Stop</button>
  </div>
}

export default App