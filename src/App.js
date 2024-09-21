import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner'

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to demonstrate the loader
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  return (
    <BrowserRouter>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <MutatingDots color="#f7d2ac" secondaryColor="#f7d2ac" size={50} />
        </div>
      ) : (
        <div >
          <nav className="bg-gradient-to-br from-[#FFC499] to-[#FFA07A] px-5 py-2 h-35 text-center ml-50 flex items-center ">
            <h1 className="m-0  text-3xl font-primary text-white mb-5">☕CREW BREW</h1>
            <div className="ml-auto mr-0">
              <Link to="/" className="ml-10 mr-0 inline-block  font-primary  text-white">HOME</Link>
              <Link to="/create" className="ml-5 inline-block font-primary text-white">CREATE NEW COFFEE</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App