import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import GetProduct from '../GetProduct/GetProduct.jsx';
import DeleteProduct from '../DeleteProduct/DeleteProduct.jsx';
import UpdateProduct from '../UpdatePage/Updatepage.jsx';
import InsertProduct from '../InsertPage/Insertpage.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home() {

  return (
    <Router>
      <div >
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/get-product" element={<GetProduct/>}/>
          <Route path="/delete-product" element={<DeleteProduct/>}/>
          <Route path="/update-product" element={<UpdateProduct/>}/>
          <Route path="/add-product" element={<InsertProduct/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default Home;
