import logo from "../assets/chatbot_logo.png";
import "./nav_style.css";

import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const nav = useNavigate();

  const location = useLocation(); // 2. Get the current URL
  const isDashboard = location.pathname.includes("/dashbored");
  return (
    <div className="nav_container">
      <div className="logo_container">
        <img className="logo_img" src={logo} alt="logo" />
      </div>
      <div className="queue">
        <div className="divider"></div>
        <div className="indicator">
          {!isDashboard && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-messages-square-icon lucide-messages-square"
            >
              <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
            </svg>
          )}

          {isDashboard && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"
            >
              <circle cx="12" cy="16" r="1" />
              <rect x="3" y="10" width="18" height="12" rx="2" />
              <path d="M7 10V7a5 5 0 0 1 10 0v3" />
            </svg>
          )}
        </div>
      </div>
      <div
        className="animation_div_holder"
        onClick={() => {
          nav("/");
        }}
      ></div>
      <div
        className="logo_container2"
        onClick={() => {
          nav("/dashbored");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user-round-cog-icon lucide-user-round-cog"
        >
          <path d="m14.305 19.53.923-.382" />
          <path d="m15.228 16.852-.923-.383" />
          <path d="m16.852 15.228-.383-.923" />
          <path d="m16.852 20.772-.383.924" />
          <path d="m19.148 15.228.383-.923" />
          <path d="m19.53 21.696-.382-.924" />
          <path d="M2 21a8 8 0 0 1 10.434-7.62" />
          <path d="m20.772 16.852.924-.383" />
          <path d="m20.772 19.148.924.383" />
          <circle cx="10" cy="8" r="5" />
          <circle cx="18" cy="18" r="3" />
        </svg>
      </div>
    </div>
  );
}
export default Navbar;
