import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import AppLayout from "../components/AppLayout";

export default function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  // 🔐 Role-based access
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      // 🔍 check role in Firestore
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("No role assigned");
        navigate("/");
        return;
      }

      const userData = snapshot.docs[0].data();

      if (userData.role !== "admin") {
        alert("Access denied");
        navigate("/");
        return;
      }

      setChecking(false); // ✅ allow access
    });

    return () => unsub();
  }, [navigate]);

  // 📥 Fetch bookings
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAppointments(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "appointments", id), { status: newStatus });
    fetchData();
  };

  const deleteBooking = async (id) => {
    await deleteDoc(doc(db, "appointments", id));
    fetchData();
  };

  // ⏳ wait until role checked
  if (checking) {
    return <p style={{ textAlign: "center" }}>Checking access...</p>;
  }

  const filteredAppointments = appointments.filter((item) => {
  if (filter === "all") return true;
  return item.status === filter;
});

  return (
    <AppLayout>
      <div className="qb-filter-bar">
  {["all", "pending", "approved", "completed"].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`qb-filter-btn ${filter === type ? "active" : ""}`}
    >
      {type.toUpperCase()}
    </button>
  ))}
</div>
      <div className="qb-admin-card">
        <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>
        <h4 style={{ marginBottom: "10px" }}>Appointment</h4>
        <div className="qb-grid">
          { filteredAppointments.map((item) => (
            <div
              key={item.id}
              className={`qb-booking-card ${item.status === "completed" ? "qb-completed" : ""}`}
              style={{ display: "block" }}
            >


              <p><b>Name:</b> {item.name}</p>
              <p><b>Email:</b> {item.email}</p>
              <p><b>Doctor:</b> {item.doctor}</p>
              <p><b>Date:</b> {item.date}</p>
              <p><b>Time:</b> {item.time}</p>

              <div style={{ marginTop: "10px" }}>
                <span style={getStatusStyle(item.status)}>
                  {item.status}
                </span>
              </div>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>

                  {/* APPROVE */}
                  <button
                    className="qb-btn-primary"
                    disabled={item.status !== "pending"}
                    style={{
                      opacity: item.status !== "pending" ? 0.5 : 1,
                      cursor: item.status !== "pending" ? "not-allowed" : "pointer"
                    }}
                    onClick={() => updateStatus(item.id, "approved")}
                  >
                    Approve
                  </button>

                  {/* COMPLETE */}
                  <button
                    className="qb-btn-secondary"
                    disabled={item.status !== "approved"}
                    style={{
                      opacity: item.status !== "approved" ? 0.5 : 1,
                      cursor: item.status !== "approved" ? "not-allowed" : "pointer"
                    }}
                    onClick={() => updateStatus(item.id, "completed")}
                  >
                    Complete
                  </button>

                  {/* DELETE */}
                  <button
                    className="qb-btn-ghost"
                    onClick={() => deleteBooking(item.id)}
                  >
                    Delete
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}

const getStatusStyle = (status) => ({
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
  background:
    status === "approved"
      ? "#E1F5EE"
      : status === "completed"
        ? "#E6F1FB"
        : "#FEF3C7",
});