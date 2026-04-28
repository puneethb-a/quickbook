import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function AppLayout({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        try {
          const docRef = doc(db, "users", u.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          } else {
            setRole("user");
          }
        } catch (err) {
          console.log(err);
          setRole("user");
        }
      } else {
        setRole(null);
      }
    });

    return () => unsub();
  }, []);

  const initials = user?.email?.slice(0, 2).toUpperCase() || "US";

  return (
    <div className="qb-page">
      {/* NAV */}
      <nav className="qb-nav">
        <Link to="/" className="qb-logo">
          <div className="qb-logo-icon">QB</div>
          <span className="qb-logo-text">QuickBook</span>
        </Link>

        <div className="qb-nav-right">
          {user && (
            <div className="qb-user-pill">
              <div className="qb-avatar">{initials}</div>
              <span className="qb-user-email">{user.email}</span>
            </div>
          )}

          {!user && <Link to="/login" className="qb-btn-ghost">Login</Link>}
          {!user && <Link to="/signup" className="qb-btn-ghost">Signup</Link>}

          {user && (
            <button className="qb-btn-logout" onClick={() => signOut(auth)}>
              Logout
            </button>
          )}
        </div>
        {role === "admin" && (
          <Link to="/admin" className="qb-btn-primary">
            Admin
          </Link>
        )}
      </nav>

      {/* CONTENT */}
      <div style={{ padding: "0 40px 40px", maxWidth: "1100px", margin: "auto" }}>
        {children}
      </div>
    </div>
  );
}