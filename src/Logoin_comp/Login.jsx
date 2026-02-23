import React, { useState } from "react";
import styles from "./Login.module.css"; // Importing as 'styles' object
import { login } from "../api/user_operation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res !== null) {
      nav("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div className={styles.loginContainer}>
        <h2 className={styles.welcome_text}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
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
              placeholder="password"
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Jump In :)
          </button>

          <p style={{
            textAlign:"center",
            color:"#17004d",
            fontWeight:"600",
            fontSize:"x-small",
            cursor:"pointer"
          }}
          onClick={()=>{
            nav("/register")
          }}>No account ?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
