"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function App() {
    const [socket, setSocket] = (0, react_1.useState)();
    const sendMessage = () => {
        if (!socket) {
            return;
        }
        //@ts-ignore -> use generics here instead of this comment to fix this instead
        socket.send("ping");
    };
    //connect only when the user mounts onto the screen not on every re-render
    (0, react_1.useEffect)(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);
        //in web sockets frontend need to create own event handler like this unlike easily for http using postman
        ws.onmessage = (e) => {
            alert(e.data);
        };
    }, []);
    return (<div>
      <input type="text" placeholder="Message..."/>
      <button onClick={sendMessage}>Send</button>
    </div>);
}
exports.default = App;
