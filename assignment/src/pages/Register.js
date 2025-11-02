import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    age: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" | "success"
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMessageType("success");
      setMessage(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2279CC 0%, #349DA0 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevents scrolling
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          boxShadow: 6,
          bgcolor: "background.paper",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "#2279CC", mb: 3 }}
          >
            Create Your Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              value={form.phone}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              fullWidth
              value={form.age}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={form.address}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                backgroundColor: "#2279CC",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1b63a7" },
              }}
            >
              Register
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            Already have an account?{" "}
            <Link to="/" style={{ color: "#2279CC", fontWeight: 600 }}>
              Login
            </Link>
          </Typography>

          {message && (
            <Alert
              severity={messageType}
              sx={{
                mt: 3,
                borderRadius: 2,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
