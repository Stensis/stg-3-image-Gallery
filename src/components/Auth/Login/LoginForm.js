import React, { useState } from "react";
import { signInUserWithEmailAndPassword } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ start loading

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false); // ✅ stop loading on early exit
      return;
    }

    if (!password) {
      setError("Password is required.");
      setLoading(false); // ✅ stop loading
      return;
    }

    try {
      const response = await signInUserWithEmailAndPassword(email, password);

      if (response?.success) {
        navigate("/");
      } else {
        setError("Invalid credentials or user not found.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // ✅ stop loading after request
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>🎨 Welcome Back</h2>
        <p className={styles.subtitle}>Login to your Image Gallery</p>
        <p>Email: <strong>user@example.com</strong></p>
        <p>Password: <strong>1Password</strong></p>

        <input
          type="email"
          placeholder="📧 Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          disabled={loading}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "🚀 Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
