import { useState, createContext, useContext } from 'react'
import './App.css'

const BulbContext = createContext();

// we create a wrapper here and use export to write the logic for the context provider separately, so the App is cleaner and can be exported to other files and used easily there as well
export const BulbProvider = ({ children }) => {
  const [bulbOn, setBulbOn] = useState(true);

  return <BulbContext.Provider value={{
    bulbOn: bulbOn,
    setBulbOn: setBulbOn
  }}>
    {children}
  </BulbContext.Provider>
}

function App() {
  return (
    // as the children of the LightBulb want to access the states, so we wrap their least common parent in the context.provider tags
    <div>
      {/* we pass the variables that need to be accessed by the children in the object format below */}
      <BulbProvider>
        <LightBulb /> 
      </BulbProvider>
    </div>
  );
}

const LightBulb = () => {
  // const [bulbOn, setBulbOn] = useState(true); //we have moved it up the state and are now passing it everywhere required down through props
  return <div>
    {/* below are good examples of unnecessary prop drilling after the use of context api*/}
    {/* <BulbState bulbOn={bulbOn}/>
    <ToggleBulbState setBulbOn={setBulbOn}/> */}
    <BulbState />
    <ToggleBulbState />
  </div>
}

const BulbState = () => {
  // const [bulbOn, setBulbOn] = useState(true);
  const { bulbOn } = useContext(BulbContext);
  return <div>
    {bulbOn ? "Bulb on" : "Bulb off"}
  </div>
}

const ToggleBulbState = () => {
  const { setBulbOn } = useContext(BulbContext);

  const handleToggleBulb = () => {
    setBulbOn(currentState => !currentState) //if true, then false and if false, then true
  }
  return (
    <div>
      <button onClick={handleToggleBulb}>Toggle the bulb</button>
    </div>
  );

}

export default App
