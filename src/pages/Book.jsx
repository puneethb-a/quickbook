import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function Book() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
  });

  // 🔒 Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setMessage("Please login first");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        navigate("/login");
      } else {
        setForm((prev) => ({
          ...prev,
          email: user.email,
        }));
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.name || !form.email || !form.doctor || !form.date || !form.time) {
      setMessage("⚠️ Please fill all fields");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "appointments"), {
        ...form,
        status: "pending",
      });

      setMessage("✅ Appointment booked successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);

      setForm({
        name: "",
        email: auth.currentUser?.email || "",
        doctor: "",
        date: "",
        time: "",
      });

    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    setLoading(false);
  };

  return (

    <AppLayout>
      <div
        className="qb-booking-card"
        style={{
          maxWidth: "500px",
          margin: "auto",
          cursor: "default",
        }}
      >
        <div style={{ width: "100%" }}>

          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            Book Appointment
          </h2>
          {message && (
            <p style={{
              background: "#E1F5EE",
              padding: "10px",
              borderRadius: "8px",
              color: "#0F6E56",
              marginBottom: "10px",
              textAlign: "center"
            }}>
              {message}
            </p>
          )}
          {/* NAME */}
          <input
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          {/* EMAIL */}
          <input
            name="email"
            value={form.email}
            readOnly
            style={{ ...inputStyle, background: "#f5f5f5" }}
          />

          {/* DOCTOR */}
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Select Doctor</option>
            <option>Dr. Smith</option>
            <option>Dr. John</option>
          </select>

          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          {/* TIME */}
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="qb-btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}   // 👈 ONLY loading
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

          {/* BACK BUTTON */}
          <Link to="/" style={{ display: "block", marginTop: "15px", textAlign: "center" }}>
            <span className="qb-btn-secondary">← Back to Home</span>
          </Link>

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
  fontSize: "14px",
};
