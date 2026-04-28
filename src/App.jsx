import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Admin from "./pages/Admin";
import MyBooking from "./pages/MyBooking";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import "./Styles/app.css";


function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/book" element={<Book />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/my-booking" element={<MyBooking />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;
