import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Profile.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: profile.username, password: newPassword }),
      });
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
      setIsEditing(false);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="p-container">
      <Sidebar />
      <header>
        <h1>Profile</h1>
      </header>
      <div className="profile-content">
        <div className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <p>{profile.username}</p> 
          </div>
          <div className="form-group">
            <label>Password:</label>
            {isEditing ? (
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            ) : (
              <p>********</p> 
            )}
          </div>
          {isEditing ? (
            <div className="button-group">
              <button onClick={updatePassword} className="save-button">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
