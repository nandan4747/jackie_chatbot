import React, { useState } from "react";
import styles from "./Login.module.css"; // Reuse your stylish shadows!
import { register } from "../api/user_operation";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ani from "../assets/animation/ai_animation.json";
import cat from "../assets/animation/cat.json";
import { OptimizedAnimation } from "../animation_optimizer/OptimizedAnimation";
import { Failure } from "../Notification_com/Failure";
import { SuccessPop } from "../Notification_com/SuccessPop";
const Register = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showfailedMessage, setShowFailedMessage] = useState(false);
  const [showSuccess, setShowSeccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);

    if (result) {
      setShowFailedMessage(false);
      setShowSeccess(true);

      //nav("/login");

      // Logic to redirect to login would go here
    } else {
      setShowSeccess(false);
      setShowFailedMessage(true);
    
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          <p
            style={{
              textAlign: "center",
              color: "#17004d",
              fontWeight: "600",
              fontSize: "x-small",
              cursor: "pointer",
            }}
            onClick={() => {
              nav("/login");
            }}
          >
            Login
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className={styles.reg_ani}>
          <OptimizedAnimation data={ani} />
        </div>

        <div className={styles.cat}>
          <OptimizedAnimation data={cat} />
        </div>
      </div>
      {showfailedMessage && (
        <div
          style={{
            position: "fixed",
            top: "15px",
            width: "250px",
          }}
          onClick={() => {
            setShowFailedMessage(false);
          }}
        >
          <Failure message="Try another Email"></Failure>
        </div>
      )}

      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "15px",
            width:"50vw",
            maxWidth: "70vw",
          }}
       onClick={()=>{
        nav("/login");
       }} >
          <SuccessPop message="User Registered Sucessfully , now click here to continue"></SuccessPop>
        </div>
      )}
    </div>
  );
};

export default Register;
