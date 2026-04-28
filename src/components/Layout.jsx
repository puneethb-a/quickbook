import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}