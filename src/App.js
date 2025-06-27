import Navbar from "./Header.js";
import './App.css';
import ContentShow from "./ProductDIv.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOption from './CreateOption.js';
import Home from './Home.js';



function App() {

  


  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/CreateOption' element={<CreateOption />} />
      <Route path="/" element={<Home />} />
      <Route path="/ProductDiv" element={<ContentShow />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
