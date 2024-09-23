import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { useState } from "react";
import Verify from "./pages/Verify/Verify";
import MyCartOrder from "./pages/MyCartOrder/MyCartOrder";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

const App = () => { 

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {
      showLogin ? <LoginPopup  setShowLogin={setShowLogin}/> : <></>
    }
      <div className="app">
      <ToastContainer position="top-center" autoClose={900}/>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/mycartorder" element={<MyCartOrder />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App