import { useEffect, useState } from "react";

function App() {
  //conditional rendering, based on a particular condition, a component is rendered
  
  // let [counterVisible, setCounterVisible] = useState(true);

  // useEffect(()=>{
  //   setInterval(() => {
  //     setCounterVisible(counterVisible => !counterVisible) //flip it's value here
  //   }, 5000);
  // }, []);

  const [count, setCount] = useState(0);

  function increase(){
    setCount(c => c+1);
  }

  return (
    <div>
      {/* {counterVisible ? <Counter></Counter> : null} */}
      <Counter count={count} />
      <button onClick={increase}>Increase Count</button>
      {/* here we are passing count as PROPS */}
    </div>
  );
}


//return <div> must be on the same line to be displayed
//mounting, re-rendering, unmounting -> lifecycle events
function Counter(props) {
  // const [count, setCount] = useState(0);
  // console.log('inside counter component'); //react calls these component functions whenver the state variables setCount it will call again
  // let count = 0; raw variables won't work in the dynamic part of react
  // function increaseCount(){ //here am placing a function inside a component, that is best practice
  //   setCount(count + 1); //it sets the count to the new value which is original value + 1
  // }
  // function decreaseCount(){
  //   setCount(count - 1);
  // }
  // function resetCount(){
  //   setCount(0);
  // }

  //setInterval breaks the application if use it directly
  // we need to hook it into the lifecycle events of react
  //so whatever part of the code you want to use only on the MOUNTING OF THE COMPONENT COUNTER, WE USE
  // USE EFFECT HOOK
  //so every time setCount is called inside the component the whole function is re-rendered 
  // except the part inside the useEffect which is only called once at the start,
  // and by default the INITIALIZATION OF THE STATE VARIABLE TOO ALSO HAPPENS ONLY ONCE EVEN IF OUTSIDE THE useEffect HOOK
  useEffect(()=>{
    let clock = setInterval(() => {
      setCount(count => count + 1); //this syntax only will work here as the setCount function can take inputs in 2 ways 1. direct value as parameter 2. value1 => (will become) value2 in this syntax, this is shorthand to represent if value1 is input to the function then value2 should be returned
    }, 1000);
    console.log('above logic runs on mount');

    //manual CLEANUP SHOULD BE DONE BY THE DEVELOPER TO INCREASE PERFORMANCE
    return () => { //this also should be inside the USE EFFECT HOOK
      clearInterval(clock);
      console.log("above logic runs on UNmount");
    }
  }, []); //dependency array is used to pass all the dependency STATE variables we will use in the function beside it

  useEffect(() => {
    console.log('count has changed');
  },[props.count]); //HERE USE EFFECT IS ALSO USED TO RUN SOME LOGIC WHENEVER THIS STATE VARIABLE props.count CHANGES 
  // useEffect is more generic, whenever you want to run some logic on changing state variables, you use USE EFFECT

  return (
    <div>
      {/* <h1>{count}</h1> */}
      Counter {props.count}
      {/* <button onClick={increaseCount}>Increase count</button> */}
      {/* <button onClick={decreaseCount}>Decrease count</button>
      <button onClick={resetCount}>Reset count</button> */}
    </div>
  );
}

export default App