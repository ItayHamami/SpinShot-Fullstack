import React, { useContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import PageNotFound from './components/PageNotFound';

import Products from './components/Products';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import OrderDetails from './components/OrderDetails';







function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { userEmail: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );

  return (
    <div className="App">
      <ToastContainer/>
<Router>
  <Navbar userInfo={userInfo} setUserInfo={setUserInfo}/>

  <Routes>
    <Route path='/' element={<Home userInfo={userInfo}/>} />
    <Route path='/login' element={<Login setUserInfo={setUserInfo}/>} />
    <Route path="/register" element={<Register setUserInfo={setUserInfo} />}/>
    <Route path='/products' element={<Products userInfo={userInfo}/>}/>
<Route path='/addproduct' element={<AddProduct/>} />
<Route path='/updateproduct/:id' element={<UpdateProduct/>} />
<Route path='/about' element={<About/>} />
<Route path='/cart' element={<CartPage userInfo={userInfo}/>} />
<Route path='/checkout' element={<Checkout userInfo={userInfo}/>} />
<Route path='/order-details' element={<OrderDetails userInfo={userInfo}/>} />

<Route path='*' element={<PageNotFound/>} />
  </Routes>
</Router>
    </div>
  );
}

export default App;
