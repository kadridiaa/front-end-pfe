// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    // <div className="App">
    //   <Router>
    //     <Navbar />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/shop" element={<Shop />} />
    //       <Route path="/blog" element={<Blog />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/contact" element={<Contact />} />
    //     </Routes>
    //   </Router>
    // </div>

    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Page Home par défaut */}
        {/* Ajoutez d'autres routes pour d'autres pages si nécessaire */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
