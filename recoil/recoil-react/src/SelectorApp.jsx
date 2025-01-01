import { useEffect, useState, memo } from "react";
import { counterAtom, evenSelector } from './store/atoms/counter'
import { useRecoilValue } from "recoil";

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
} 

const Buttons = () => {

  const setCount = useSetRecoilState(counterAtom);

  return <div>
    <button onClick={(count)=>(count+2)}>Increase</button>
    <button onClick={(count)=>(count-1)}>Decrease</button>
  </div>
}

const Counter = () => {

}

const IsEven = () => {
  const even = useRecoilValue(evenSelector); //here we use the same useRecoilValue hook but use the evenSelector from the counter.js file instead of the atom
  
  return <div>
    {even ? "Even" : "Odd"}
  </div>
}

export default App;