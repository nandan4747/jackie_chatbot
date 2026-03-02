import { useState } from "react";
import "./user_dashboard.css";
import { updatePassword, deleteAccount } from "../api/user_operation";
import { useNavigate } from "react-router-dom";
import { deleteUserChats } from "../db/db_operations";
import { logout } from "../api/user_operation";
import Navbar from "../NavBarComp/Navbar";
import { Failure } from "../Notification_com/Failure";
import { SuccessPop } from "../Notification_com/SuccessPop";
function UserDashboard() {
  const NameOfUser = localStorage.getItem("jackie_username");
  const EmailOfUser = localStorage.getItem("jackie_email");
  const [formData, setFormData] = useState({});
  const nav = useNavigate();
  const [showfailedMessage, setShowFailedMessage] = useState(false);
  const [showSuccess, setShowSeccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      <div className="navbar_holder">
        <Navbar />
      </div>

      <div className="dashboard_container">
        <div className="dashboard_card">
          {/* USER PROFILE SECTION */}
          <div className="profile_section">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Avatar"
              className="profile_avatar"
            />
            <h2 className="profile_name">{NameOfUser}</h2>
            <p className="profile_email">{EmailOfUser}</p>
          </div>

          {/* ACTIONS */}
          <div className="dashboard_actions">
            <button
              className="action_btn primary"
              onClick={() => setShowPasswordModal(true)}
            >
              Update Password
            </button>

            <button
              className="action_btn danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>

            <button
              className="action_btn logout"
              onClick={() => {
                logout();
                nav("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* PASSWORD MODAL */}
        {showPasswordModal && (
          <div className="modal_overlay">
            <div className="modal_box">
              <h3>Update Password</h3>

              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                onChange={handleChange}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
              />

              <div className="modal_buttons">
                <button
                  className="action_btn secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="action_btn primary"
                  onClick={async () => {
                    const res = await updatePassword(formData);
                    if (res.success) {
                      setShowFailedMessage(false);
                      setShowSeccess(true);
                      setShowPasswordModal(false);
                    } else {
                      setShowSeccess(false);
                      setShowFailedMessage(true);
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="modal_overlay">
            <div className="modal_box">
              <h3>Delete Account</h3>
              <p className="warning_text">
                This action is permanent. Your account cannot be recovered and
                Your chats will also be Deleted Permanently!!
              </p>

              <div className="modal_buttons">
                <button
                  className="action_btn secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="action_btn danger"
                  onClick={async () => {
                    const res = await deleteAccount();
                    if (res.success) {
                      deleteUserChats();
                      alert(res.message);
                      nav("/login");
                    }
                  }}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {(showSuccess || showfailedMessage) && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {showfailedMessage && (
            <div
              style={{
                position: "fixed",
                top: "15px",
                width: "25vw",
                alignSelf: "center",
              }}
              onClick={() => {
                setShowFailedMessage(false);
              }}
            >
              <Failure message="Wrong Old Password!!!"></Failure>
            </div>
          )}

          {showSuccess && (
            <div
              style={{
                position: "fixed",
                top: "15px",
                width: "50vw",
                maxWidth: "70vw",
              }}
              onClick={() => {
                setShowSeccess(false);
              }}
            >
              <SuccessPop message="Password Updated Successfully"></SuccessPop>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
