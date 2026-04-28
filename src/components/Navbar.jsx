import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Navbar() {
  return (
    <div style={{
      background: "#2563eb",
      color: "white",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h3>QuickBook</h3>

      <div>
        <Link to="/" style={{ color: "white", marginRight: "10px" }}>Home</Link>
        <Link to="/book" style={{ color: "white", marginRight: "10px" }}>Book</Link>
        <Link to="/my-booking" style={{ color: "white", marginRight: "10px" }}>My Booking</Link>

        <button onClick={() => signOut(auth)}>
          Logout
        </button>
        
      </div>
    </div>
  );
}