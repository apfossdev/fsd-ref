App.txt;

import "./App.css";

function App() {
  return (
    <div className="bg-[#00274C] min-h-screen min-w-full flex flex-col justify-center items-center">
      <div className="flex mb-20 gap-2">
        <img
          src="../public/logo.png"
          alt="company-logo"
          className="max-w-10 max-h-10"
        />
        <div className="flex">
          <p className="text-cyan-500 text-4xl">Webinar</p>
          <p className="text-white text-4xl">.gg</p>
        </div>
      </div>
      <p className="text-white text-3xl font-semibold ">Verify your Age</p>
      <p className="text-gray-400 mt-20">
        Please confirm your birth year. This data will not be stored.
      </p>
      <label htmlFor="birthYear"></label>
      <input
        id="birthYear"
        className="rounded-lg bg-[#18395c] placeholder-gray-500 min-w-72 min-h-10 mt-2 p-2"
        type="text"
        placeholder="Your Birth Year"
      />
      <button className="rounded-lg min-w-72 min-h-8 text-white font-semibold bg-[#738a9f] mt-8">
        Continue
      </button>
    </div>
  );
}

export default App;
