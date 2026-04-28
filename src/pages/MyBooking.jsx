import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AppLayout from "../components/AppLayout";
import { query, where } from "firebase/firestore";
import { Link } from "react-router-dom";


export default function MyBooking() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Track user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // 🔹 Fetch bookings
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("email", "==", user.email)
        );

        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((doc) => doc.data());

        setData(results);
      } catch (error) {
        console.error(error);
        alert("Error loading bookings");
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <AppLayout>
        <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h2>Please login to view your bookings</h2>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: "700px", margin: "auto" }}>

        <h2 style={{ marginBottom: "20px" }}>My Bookings</h2>

        {data.length === 0 ? (
          <div className="qb-booking-card" style={{ textAlign: "center" }}>
            <p>No bookings yet</p>
            <Link to="/book" className="qb-btn-primary" style={{ marginTop: "10px" }}>
              Book Now
            </Link>
          </div>
        ) : (
          data.map((item, i) => (
            <div
              key={i}
              className="qb-booking-card"
              style={{ marginBottom: "15px", cursor: "default" }}
            >
              <div style={{ width: "100%" }}>

                <p><b>Name:</b> {item.name}</p>
                <p><b>Doctor:</b> {item.doctor || "—"}</p>
                <p><b>Date:</b> {item.date}</p>
                <p><b>Time:</b> {item.time}</p>

                {/* STATUS BADGE */}
                <div style={{ marginTop: "10px" }}>
                  <span style={getStatusStyle(item.status)}>
                    {item.status}
                  </span>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}

// 🎨 Status styles
const getStatusStyle = (status) => {
  return {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    display: "inline-block",
    background:
      status === "approved"
        ? "#E1F5EE"
        : status === "completed"
          ? "#E6F1FB"
          : "#FEF3C7",
    color:
      status === "approved"
        ? "#0F6E56"
        : status === "completed"
          ? "#1D4ED8"
          : "#92400E",
  };
};  