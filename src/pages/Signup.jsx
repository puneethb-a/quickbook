import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Signup successful!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      navigate("/");
    } catch (err) {
      console.log(err);
      setMessage("Signup failed");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>

      <div
        className="qb-booking-card"
        style={{ cursor: "default", maxWidth: "400px", margin: "auto" }}
      >
        <div style={{ width: "100%" }}>

          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Signup
          </h2>
          {message && (
            <p style={{
              background: "#E1F5EE",
              padding: "10px",
              borderRadius: "8px",
              color: "#0F6E56",
              marginBottom: "10px"
            }}>
              {message}
            </p>
          )}

          {/* EMAIL */}
          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {/* BUTTON */}
          <button
            className="qb-btn-primary"
            onClick={handleSignup}
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

        </div>
      </div>
    </AppLayout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};