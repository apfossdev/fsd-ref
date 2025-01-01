import { useState, memo, useEffect } from "react";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "./store/atoms/counter";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    </div>
  );
}

const CurrentCount = memo(({count}) => {
  return <div>Count: {count}</div>;
});

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(c => c+1)
    }, 2000)
  }, [])
  return (
    <div>
      <CurrentCount />
      <Increase />
      <Decrease />
    </div>
  );
}

const MemoizedCurrentCount = memo(CurrentCount);

const Increase = memo(() => {
  const handleIncrease = () => {};

  return (
    <div>
      <button onClick={handleIncrease}>Increase</button>
    </div>
  );
});

const Decrease = memo(() => {
  const handleDecrease = () => {};

  return (
    <div>
      <button onClick={handleDecrease}>Decrease</button>
    </div>
  );
});

export default App;


