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
  AppBar,
  Toolbar,
} from "@mui/material";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" | "success"
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      sessionStorage.setItem("token", res.data.token);
      setMessageType("success");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #2279CC 0%, #349DA0 100%)",
      }}
    >
      {/* ✅ Fixed Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffffee",
          color: "#2279CC",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              color: "#2279CC",
            }}
          >
            Globcyber Technologies
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ✅ Centered Login Card */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: 6,
            bgcolor: "background.paper",
            position: "relative",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600, color: "#2279CC", mb: 3 }}
            >
              Login to Your Account
            </Typography>

            <form onSubmit={handleSubmit}>
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
                Login
              </Button>
            </form>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#2279CC", fontWeight: 600 }}
              >
                Register
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
    </Box>
  );
}

export default Login;
