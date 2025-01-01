import { SidebarClass1 } from "./components/answers/1-basic-project";

function App() {
  // dark mode
  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white ">
      {/* <SidebarClass1 /> */}
      <button onClick={() => {
        document.querySelector("html").classList.toggle("dark")
      }} className="dark:text-white">Toggle Theme</button>
    </div>
  );
}

export default App;
