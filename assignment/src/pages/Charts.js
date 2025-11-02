import React, { useEffect, useState } from "react";
import api from "../api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

function Charts() {
  const [chartData, setChartData] = useState([]);
  const [form, setForm] = useState({ label: "", value: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const fetchChartData = async () => {
    try {
      const res = await api.get("/charts/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChartData(res.data);
    } catch (err) {
      console.error("Error fetching chart data:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchChartData();

    const timer = setTimeout(() => {
      alert("Session expired! Please log in again.");
      sessionStorage.removeItem("token");
      navigate("/login");
    }, 10 * 60 * 1000); 


    return () => clearTimeout(timer);
  }, [navigate, token]);

  const handleAddChart = async (e) => {
    e.preventDefault();
    if (!form.label || !form.value) return alert("Enter label and value");

    try {
      await api.post("/charts/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ label: "", value: "" });
      fetchChartData();
    } catch (err) {
      console.error("Add chart error:", err.response?.data || err);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Charts Overview</h2>

      {/* Add Data Form */}
      <form onSubmit={handleAddChart} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Label (e.g. Jan)"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Value (e.g. 50)"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add Data
        </button>
      </form>

      {/* Charts */}
      {loading ? (
        <p>Loading chart data...</p>
      ) : chartData.length > 0 ? (
        <div style={{ display: "grid", gap: "40px" }}>
          {/* Bar Chart */}
          <div style={{ width: "100%", height: "300px" }}>
            <h3>Performance Bar Chart</h3>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div style={{ width: "100%", height: "300px" }}>
            <h3>Growth Line Chart</h3>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#2196F3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p>No chart data yet. Add some!</p>
      )}
    </div>
  );
}

export default Charts;
