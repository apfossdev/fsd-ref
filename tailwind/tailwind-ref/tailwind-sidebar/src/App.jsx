import { useEffect, useState } from "react";
import { SidebarClass1 } from "./components/answers/1-basic-project";
import { SidebarToggle } from "./components/icons/SidebarToggle";


//useMediaQueries -> Custom hook for media query
//This code defines a custom React hook called useMediaQuery that helps you determine if a specific CSS media query matches the current screen size.
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}


function App() {
  // dark mode

  const [sidebarOpen, setSidebarOpen] = useState(true); //ideally should be in a context api
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop == false) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isDesktop]);
  return (
    // <div className="h-screen bg-white dark:bg-black text-black dark:text-white ">
    //   {/* <SidebarClass1 /> */}
    //   {/* <button onClick={() => {
    //     document.querySelector("html").classList.toggle("dark")
    //   }} className="dark:text-white">Toggle Theme</button> */}
    // </div>

    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <MainContent sidebarOpen={sidebarOpen}/>
    </div>
  );
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  if (!sidebarOpen) {
      return (
        <div className="fixed top-0 left-0">
          <div
            className="cursor-pointer hover:bg-slate-200"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <SidebarToggle />
          </div>
        </div>
      );
  }

  //if sidebar open
    return (
      <div className="w-96 h-screen bg-red-100 fixed top-0 left-0 md:relative">
        <div
          className="cursor-pointer hover:bg-slate-200"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <SidebarToggle />
        </div>
      </div>
    );
}

const MainContent = () => {
  return (
    <div className="w-full">
      <div className="h-72 bg-black hidden md:block"></div>
      <div className="grid grid-cols-11 gap-8 p-8">
        <div className="h-96 rounded-2xl shadow-lg bg-red-200 md:col-span-2 -translate-y-24 col-span-11 hidden md:block"></div>
        <div className="h-96 rounded-2xl shadow-lg bg-green-200 md:col-span-6 col-span-11"></div>
        <div className="h-96 rounded-2xl shadow-lg bg-yellow-200 md:col-span-3 col-span-11"></div>
      </div>
    </div>
  );
}
 
export default App;
