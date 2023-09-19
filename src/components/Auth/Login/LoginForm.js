import React, { useState } from "react";
import { signInUserWithEmailAndPassword } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required!");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required!");
      return;
    }

    // Check for correct credentials
    if (email !== "user@example.com" || password !== "1Password") {
      setError("Invalid credentials!");
      return;
    }

    const response = await signInUserWithEmailAndPassword(email, password);

    if (response.success) {
      navigate("/");
    } else {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h5 className="mb-3" style={{ color: "#007bff" }}>
          Image gallery Application
        </h5>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        {error && <p className={styles.p}>{error}</p>}
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
