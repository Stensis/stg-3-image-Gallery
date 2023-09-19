import { useState, useEffect } from "react";
import {  Routes, Route } from "react-router-dom";
import LoginForm from "./components/Auth/Login/LoginForm";
import HomePage from "./components/Homepage/Homepage";
import { authStateListener } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authStateListener(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={!user ? <LoginForm /> : <HomePage />} />
        <Route path="/" element={user ? <HomePage /> : <LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
