import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";


export default function Home() {
  return (
    <AppLayout>
      <div className="qb-hero">
        

        {/* HERO */}
        <div className="qb-hero">
          <div className="qb-badge">
            <span className="qb-badge-dot"></span>
            Simple & Fast Booking System
          </div>
          <h1>Book Your Doctor<br /><span>Appointments</span> Easily</h1>
          <p>Fast, simple, and reliable. Schedule your visit with top-rated specialists in minutes.</p>
          <div className="qb-cta-group">
            <Link to="/book" className="qb-btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Now
            </Link>
            <Link to="/my-booking" className="qb-btn-secondary">View My Bookings</Link>
          </div>
        </div>

        {/* STATS */}
        <div className="qb-stats">
          <div className="qb-stat">
            <div className="qb-stat-num">50+</div>
            <div className="qb-stat-label">Specialists</div>
          </div>
          <div className="qb-stat-divider"></div>
          <div className="qb-stat">
            <div className="qb-stat-num">1000+</div>
            <div className="qb-stat-label">Appointments</div>
          </div>
          <div className="qb-stat-divider"></div>
          <div className="qb-stat">
            {/* <div className="qb-stat-num">4.9★</div> */}
            {/* <div className="qb-stat-label">Patient Rating</div> */}
          </div>
        </div>

        {/* SERVICES */}
        <div className="qb-section">
          <div className="qb-section-label">Our Services</div>

          <div className="qb-services-grid">
            <div className="qb-service-card">
              <div className="qb-service-icon qb-icon-teal">🩺</div>
              <div className="qb-service-name">General Checkup</div>
              <div className="qb-service-desc">Routine health assessments & wellness exams</div>
            </div>
            <div className="qb-service-card">
              <div className="qb-service-icon qb-icon-blue">🦷</div>
              <div className="qb-service-name">Dental Care</div>
              <div className="qb-service-desc">Cleanings, fillings & cosmetic dentistry</div>
            </div>
            <div className="qb-service-card">
              <div className="qb-service-icon qb-icon-purple">❤️</div>
              <div className="qb-service-name">Heart Specialist</div>
              <div className="qb-service-desc">Cardiology consultations & diagnostics</div>
            </div>
          </div>

          {/* MY BOOKINGS */}
          <div className="qb-section-label" style={{ marginTop: "36px" }}>Quick Access</div>
          <Link to="/my-booking" className="qb-booking-card">
            <div className="qb-booking-left">
              <div className="qb-booking-icon">📋</div>
              <div>
                <h3>My Bookings</h3>
                <p>Check your upcoming & past appointment status</p>
              </div>
            </div>
            <div className="qb-booking-arrow">→</div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
