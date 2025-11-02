import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ background: "#222", color: "#fff", padding: "10px" }}>
      <Link to="/dashboard" style={{ color: "#fff", marginRight: "15px" }}>Dashboard</Link>
      <Link to="/charts" style={{ color: "#fff", marginRight: "15px" }}>Charts</Link>
      {token ? (
        <button
          onClick={handleLogout}
          style={{
            color: "#fff",
            background: "red",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/" style={{ color: "#fff" }}>Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
