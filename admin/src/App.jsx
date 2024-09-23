import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
// import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import default styles



const App = () => {
  const url = 'https://yummyfooddelivery-backend.onrender.com';
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
      
    </div>
  )
}

export default App
