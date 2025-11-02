import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const logoutTimer = setTimeout(() => {
      sessionStorage.removeItem("token");
      alert("Session expired! Please log in again.");
      navigate("/login");
    }, 10 * 60 * 1000);

    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && !Array.isArray(res.data)) {
          setUsers([res.data]);
        } else if (Array.isArray(res.data)) {
          setUsers(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUser();

    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  const handleEdit = (user) => {
    setEditData(user);
    setEditing(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await api.put(`/auth/update/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([res.data]);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading user data...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Dashboard</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              margin: "20px auto",
              padding: "20px",
              maxWidth: "400px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
          >
            {editing && editData._id === user._id ? (
              <>
                <h3>Edit Profile ✏️</h3>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  style={{ width: "90%", margin: "5px", padding: "8px" }}
                />
                <input
                  type="text"
                  name="phone"
                  value={editData.phone || ""}
                  onChange={handleChange}
                  placeholder="Phone"
                  style={{ width: "90%", margin: "5px", padding: "8px" }}
                />
                <input
                  type="number"
                  name="age"
                  value={editData.age || ""}
                  onChange={handleChange}
                  placeholder="Age"
                  style={{ width: "90%", margin: "5px", padding: "8px" }}
                />
                <input
                  type="text"
                  name="address"
                  value={editData.address || ""}
                  onChange={handleChange}
                  placeholder="Address"
                  style={{ width: "90%", margin: "5px", padding: "8px" }}
                />
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={handleSave}
                    style={{
                      background: "#4CAF50",
                      color: "#fff",
                      padding: "8px 16px",
                      marginRight: "10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      background: "#f44336",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Welcome, {user.name} 👋</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>Age:</strong> {user.age || "N/A"}</p>
                <p><strong>Address:</strong> {user.address || "N/A"}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      background: "#2196F3",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <Link
                    to="/charts"
                    style={{
                      background: "#4CAF50",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    View Charts
                  </Link>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default Dashboard;
