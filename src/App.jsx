import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Admin from "./pages/Admin";
import MyBooking from "./pages/MyBooking";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Layout from "./components/Layout";
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

        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/book" element={<Layout><Book /></Layout>} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
        <Route path="/my-booking" element={<Layout><MyBooking /></Layout>} />
        


      </Routes>
    </BrowserRouter>
  );
}

export default App;
