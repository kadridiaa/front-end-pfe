// App.js
import "./App.css";
import React ,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
// import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Condition from "./pages/Condition";
import Profile from "./pages/Profile";
import WishList from "./component/WishList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("men");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    // <div className="App">
    //   <Router>
    //     <Navbar />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //
    //       <Route path="/blog" element={<Blog />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/contact" element={<Contact />} />
    //     </Routes>
    //   </Router>
    // </div>

    <Router>
      <div>
        <Navbar onCategoryClick={handleCategoryClick} />
        <Routes>
          <Route path="/" element={<Home selectedCategory={selectedCategory}/>} /> {/* Page Home par défaut */}
          {/* Ajoutez d'autres routes pour d'autres pages si nécessaire */}
          {/* <Route path="/shop" element={<Shop />} /> */}
          <Route path="/Condition" element={<Condition />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/wishList" element={<WishList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
