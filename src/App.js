import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";           // Import your Home component
import Artists from "./Artist/Artists";     // Import the Artists component
import Listeners from "./Listeners/Listeners"; // Import the Listeners component
import About from "./About/About"; // Import the Listeners component
import Login from "./Login/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/listeners" element={<Listeners />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;