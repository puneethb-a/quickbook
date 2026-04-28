import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  // ✅ FIXED: function is properly defined
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logged in successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Login failed");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>

      <div className="qb-booking-card" style={{ cursor: "default", maxWidth: "400px", margin: "auto" }}>
        <div style={{ width: "100%" }}>

          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Login
          </h2>
          {error && <p style={{
            background: "#E1F5EE",
            padding: "10px",
            borderRadius: "8px",
            color: "#0F6E56",
            marginBottom: "10px"
          }}>{error}</p>}

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
            onClick={handleLogin}
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>
      </div>
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