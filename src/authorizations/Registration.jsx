import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setShowLoginButton(false);
        setMessage("Registration successful! Redirecting...");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setIsError(true);
        setMessage(data.message || "Registration failed");

        // 👇 If user already exists → show login button
        if (data.message?.toLowerCase().includes("exist")) {
          setShowLoginButton(true);
        } else {
          setShowLoginButton(false);
        }
      }
    } catch (error) {
      setIsError(true);
      setMessage("Error connecting to server");
      setShowLoginButton(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Create Account</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        {message && (
          <p
            style={{
              ...styles.message,
              color: isError ? "#e74a3b" : "#1cc88a",
            }}
          >
            {message}
          </p>
        )}

        {/* 👇 Show Login button if already registered */}
        {showLoginButton && (
          <button
            type="button"
            style={styles.loginButton}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4e73df, #224abe)",
  },
  form: {
    background: "white",
    padding: "35px",
    borderRadius: "12px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#1cc88a",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  loginButton: {
    padding: "10px",
    backgroundColor: "#4e73df",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    fontSize: "14px",
  },
};
