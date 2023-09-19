import React, { useState } from "react";
import { signInUserWithEmailAndPassword } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== "user@example.com" || password !== "1Password") {
      setError("Invalid credentials!");
      return;
    }
    if (!email.includes("@") || password === "") {
      setError("Invalid credentials!");
      return;
    }

    const response = await signInUserWithEmailAndPassword(email, password);

    if (response.success) {
      navigate("/"); 
    } else {
      setError("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
