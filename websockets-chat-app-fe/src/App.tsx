import { useEffect, useState, useRef } from "react";

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef(); //useRefs when something that doesn't trigger a re render but changes 

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    }
    //cleanup function
    return () => {
      ws.close();
    }
  }, []);

  return (
    <div className="h-screen bg-black">
      <br />
      <br />
      <br />
      <div className="h-[85vh]">
        {messages.map((message) => (
          <div className="m-8">
            <span className="bg-white text-black rounded p-4 m-8">
              {message}{" "}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-white flex p-4">
        <input ref={inputRef} type="text" className="flex-1 p-4" />
        <button onClick={() => {
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: inputRef.current.value
            }
          }))
          inputRef.current.value = '';
        }} className="bg-purple-600 text-white">Send message</button>
      </div>
    </div>
  );
}

export default App;
