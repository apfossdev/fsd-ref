import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {

  // const router = [{}] //some code bases can use the path and elements of the below routes as an array format for more optimizations

  return (
    <div>
      {/* we can use these LINKs which are much better than a href as no fetching occurs only inside the Browser Router Component */}
      <BrowserRouter>
        <Routes>
          {/* as we are declaring 2 different elements for the same path /, we need to nest everything else inside layout */}
          <Route path="/" element={<Layout />} > 
            <Route path="/" element={<Landing />} />
            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />
            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />
            {/* use when none of the above routes are given */}
            <Route path="*" element={<div>yo this is an error page</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const Class11Program = () => {
  return <div>
    NEET Programs for Class 11th
  </div>
}

const Class12Program = () => {
  // if you want the user to manually go through different sections of the pages use LINKs
  // if you want to navigate the user automatically ona particular condition then useNavigate Hook 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    //cleanup function when component unmounts on the main page or wherever
    return () => clearTimeout(timer);
  }, [navigate]); //here navigate in dependency array to ensure whenever the navigate changes even this function inside knows it


  return <div>NEET Programs for Class 12th</div>;
};

const Landing = () => {
  return <div>
    Welcome to King's Landing
  </div>
}

const Layout = () => {
  return (
    <div>
      {/* the below part above Outlet is the header available on all pages */}
      <Link to="/">Allen</Link>|
      <Link to="/neet/online-coaching-class-11">Class 11</Link>|
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
      {/* //the above top bar will be visible on all the pages */}
      <div style={{height: "90vh", background: "blue"}}>
        <Outlet />
      </div>
      {/* only this outlet will change from page to page rest all will remain the same  */}
      footer
    </div>
  );
}

export default App
