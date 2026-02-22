import "./App.css";
import Home from "./Home/Home";
import Login from "./Logoin_comp/Login";
import Register from "./Logoin_comp/Register";
import { Routes, Route } from "react-router-dom";
import ChatHistory from "./Home/ChatHistory";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/temp" element={<ChatHistory />}></Route>
      </Routes>
    </>
  );
}

export default App;
