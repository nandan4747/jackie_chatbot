import "./App.css";
import Home from "./Home/Home";
import Login from "./Logoin_comp/Login";
import Register from "./Logoin_comp/Register";
import { Routes, Route } from "react-router-dom";
import ChatHistory from "./Home/ChatHistory";
import ThinkingAnimation from "./chat_comp/ThinkingAnimation";
import UserDashboard from "./userdashboredComp/UserDashboard";
import Navbar from "./NavBarComp/Navbar";
import { SuccessPop } from "./Notification_com/SuccessPop";
import { Failure } from "./Notification_com/Failure";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/temp" element={<Failure />}></Route>

        <Route path="/dashbored" element={<UserDashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
