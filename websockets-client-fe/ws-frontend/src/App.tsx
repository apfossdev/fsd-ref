import { useEffect, useState, useRef } from "react";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  const sendMessage = () => {
    if (!socket) {
      return;
    }
    const message = inputRef.current.value;
    //@ts-ignore -> use generics here instead of this comment to fix this instead
    socket.send(message);
  };

  //connect only when the user mounts onto the screen not on every re-render
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    //in web sockets frontend need to create own event handler like this unlike easily for http using postman
    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
