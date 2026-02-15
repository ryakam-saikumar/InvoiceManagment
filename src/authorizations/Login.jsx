import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowRegister(false);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        if (data.message) {
          setMessage(data.message);
          if (data.message.toLowerCase().includes("does not exist")) {
            setShowRegister(true);
          }
        } else if (response.status === 401) {
          setMessage("Invalid credentials. Please try again.");
        } else if (response.status === 404) {
          setMessage("User does not exist. Please sign up.");
          setShowRegister(true);
        } else {
          setMessage("Login failed. Please try again.");
        }
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
      console.error("Login error:", error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // ✅ lowercase
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">
          Login
        </button>

        {message && <p className="login-message">{message}</p>}

        {showRegister && (
          <button
            type="button"
            className="register-link"
            onClick={handleRegisterRedirect}
          >
            Go to Register
          </button>
        )}
      </form>

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #1e293b;
          color: #fff;
        }
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #1e293b;
        }
        .login-form {
          background-color: #334155;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .login-form h2 {
          margin-bottom: 24px;
          font-size: 28px;
          color: #f1f5f9;
        }
        .login-input {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 16px;
          border: none;
          border-radius: 8px;
          background-color: #1e293b;
          color: #f1f5f9;
          font-size: 16px;
        }
        .login-input::placeholder {
          color: #94a3b8;
        }
        .login-input:focus {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }
        .login-button {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          background-color: #8b5cf6;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .login-button:hover {
          background-color: #7c3aed;
        }
        .login-message {
          margin-top: 16px;
          font-size: 14px;
          color: #f87171;
        }
        .register-link {
          margin-top: 12px;
          background: none;
          border: none;
          color: #8b5cf6;
          cursor: pointer;
          text-decoration: underline;
          font-size: 14px;
        }
        .register-link:hover {
          color: #7c3aed;
        }
        @media (max-width: 480px) {
          .login-form {
            padding: 24px;
            border-radius: 8px;
          }
          .login-form h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
