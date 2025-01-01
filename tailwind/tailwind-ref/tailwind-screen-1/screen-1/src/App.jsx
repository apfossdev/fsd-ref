import { Button } from "../src/components/Buttons"
import { Input } from "../src/components/Input"
import { Otp } from "./components/Otp";

function App() {

  return (
    <div className="h-screen bg-blue-700">
      <br />
      <br />
      <br />
      <br />
      {/* <Input type="text" placeholder={"Username"}></Input> 
      <Button disabled={false}>Sign up</Button>
      */}
      <Otp />
    </div>
  );
}

export default App
