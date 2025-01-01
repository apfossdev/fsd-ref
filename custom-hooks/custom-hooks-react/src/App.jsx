import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useFetch, usePostTitle } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";

//custom hook -> we use this to encapsulate the logic so that we can reuse it much simpler in the future
// function useCounter () {
//   const [count, setCount] = useState(0);

//   function increaseCount() {
//     setCount((count) => count + 1);
//   };

//   return {
//     count: count,
//     increaseCount: increaseCount
//   }
// }

// function useDebounce (callbackFn) {
//   const currentClock = useRef(); //this component is going to change a lot but I don't want my component to change based on the rendering of this component

//   const fn = () => {
//     clearTimeout(currentClock.current);
//     currentClock.current = setTimeout(callbackFn, 200);
//   }

//   return fn;

// }

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


function App() {

  const [inputVal, setInputVal] = useState("");
  const debouncedValue = useDebounce(inputVal, 200);

  const changeFn = (e) => {
    setInputVal(e.target.value);
  }

  



  useEffect(() => {
    //expensive operation
    //like fetch

    // we should do the expensive operation when the debounced value changes
    // not when the original value changes
    // that is the logic used here
    console.log("expensive operation");
  }, [debouncedValue]); //that is why we have included the debouncedValue in the dependency array here

  function sendDataToBackend() {
    fetch("api.amazon.com/search/");
  }

  // const debouncedFn = useDebounce(sendDataToBackend);

  return (
    <div>
      {/* <input type="text" onChange={debouncedFn}></input> */}
      <input type="text" onChange={changeFn}></input>
    </div>
  );



}






  // const [state, setState] = useState(0);
  // const prev = usePrev(state);

  // return (
  //   <>
  //     <p>{state}</p>
  //     <button
  //       onClick={() => {
  //         setState((curr) => curr + 1)
  //       }}
  //     >
  //       Click me
  //     </button>
  //     <p>The previous value was {prev}</p>
  //   </>
  // );


  // const { finalData, loading } = useFetch(
  //   "https://jsonplaceholder.typicode.com/posts/1"
  // );

  // if(loading){
  //   return(
  //     <div>
  //       Loading................
  //     </div>
  //   )
  // }

  // return (
  //   <div>
  //     {JSON.stringify(finalData)}
  //   </div>
  // )

  // const postTitle = usePostTitle();

  // return (
  //   <div>
  //     {postTitle}
  //   </div>
  // )

  // const {count, increaseCount} = useCounter(); //see now this app component looks so much cleaner

  // return (
  //   <div>
  //     {/* here each of these counters have their own state variables created so if you increase one counter only that counter alone will increase */}
  //     <Counter/>
  //     <Counter/>
  //   </div>
  // )

// function Counter() {
//   const {count, increaseCount} = useCounter();

//   return (
//     <div>
//       <button onClick={increaseCount}>Increase {count}</button>
//     </div>
//   );
// }

export default App
