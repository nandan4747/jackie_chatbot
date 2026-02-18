import React, { useState } from "react";
import styles from "./Login.module.css"; // Reuse your stylish shadows!
import { register } from "../api/user_operation";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);

    if (result) {
      alert("Account created! Now go try to remember that password.");
      nav("/login");

      // Logic to redirect to login would go here
    } else {
      alert("Registration failed. Maybe that username is already taken?");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
      <div className={styles.loginContainer}>
        <h2 className={styles.welcome_text}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Cool Username "
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="ur unbreakable password"
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Join the Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
