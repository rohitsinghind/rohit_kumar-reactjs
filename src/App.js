import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/navbar';
import HomePage from './screens/homePage';
import DetailPage from "./screens/detailPage";
import CreatePage from "./screens/createPage";

function App() {

  const [productId, setProductId] = useState("")

  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage setProductId={setProductId}/>} 
        />
        <Route 
          path="/productDetails" 
          element={<DetailPage productId={productId}/>} 
        />
        <Route 
          path="/addProduct" 
          element={<CreatePage/>} 
        />
        </Routes>
    </Router>
      
    </>
  );
}

export default App;
