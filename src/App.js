import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Order from './components/Order';
import Products from './components/Products';
import Users from './components/Users';
import Login from './components/Login';

function App() {
  
  const user = JSON.parse(localStorage.getItem("userName"));
  return (

    <Routes>
      {user ? (
        <Route path="/" element={<Navbar />}>
          
          <Route path="/orders" element={<Order />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Route>
      ) : (
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
