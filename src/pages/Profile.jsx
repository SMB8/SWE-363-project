// src/pages/Profile.jsx
import React, { useState } from "react";

const initialProfile = {
  name: "Ahmed Qahtani",
  email: "Ahmad@gmail.com",
  password: "123@abc",
  studentId: "202155989",
  major: "Software Engineering",
  interests: ["Technical", "Chess", "Technical"],
};

const initialPreferences = {
  notifications: true,
  emailNotifications: false,
  eventReminder: true,
  connectionRequest: true,
  showDeletedEvents: false,
  autoDeleteFinishedEvents: true,
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [preferences, setPreferences] = useState(initialPreferences);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInterestRemove = (idx) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div
      style={{

        marginTop: 100,
        maxWidth: 900,
        margin: "40px auto",
        background: "#f7faff",
        borderRadius: 16,
        boxShadow: "0 2px 12px #0001",
        padding: 32,
        display: "flex",
        gap: 32,
      }}
    >
     
      <div
        style={{
          width: 240,
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 1px 4px #0001",
        }}
      >
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>
            Welcome Ahmed
          </div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
            Software Engineering Student
          </div>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 6 }}>
            Interests
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {profile.interests.map((interest, idx) => (
              <span
                key={idx}
                style={{
                  background: "#e6ecf5",
                  borderRadius: 8,
                  padding: "2px 10px",
                  fontSize: 12,
                  marginBottom: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {interest}
                <button
                  onClick={() => handleInterestRemove(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                  title="Remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          style={{
            marginTop: "auto",
            background: "#f77",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 32px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/sign-in";
          }}

        >
          Log out
        </button>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          minHeight: 400,
          boxShadow: "0 1px 4px #0001",
        }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              flex: 1,
              background: activeTab === "profile" ? "#e6ecf5" : "#f7faff",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            style={{
              flex: 1,
              background: activeTab === "preferences" ? "#e6ecf5" : "#f7faff",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Preferences
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" ? (
          <form
            style={{ maxWidth: 400, margin: "0 auto" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>
              Personal Information
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                marginBottom: 18,
              }}
            >
              Update your personal details
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 6,
                  border: "1px solid #d0d7e2",
                  marginTop: 4,
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 6,
                  border: "1px solid #d0d7e2",
                  marginTop: 4,
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 6,
                  border: "1px solid #d0d7e2",
                  marginTop: 4,
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={profile.studentId}
                onChange={handleProfileChange}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 6,
                  border: "1px solid #d0d7e2",
                  marginTop: 4,
                }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 14, fontWeight: 500 }}>Major</label>
              <input
                type="text"
                name="major"
                value={profile.major}
                onChange={handleProfileChange}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  borderRadius: 6,
                  border: "1px solid #d0d7e2",
                  marginTop: 4,
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                marginTop: 18,
                background: "#174c7f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 32px",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <form
            style={{ maxWidth: 500, margin: "0 auto" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>
              Notification & Privacy Settings
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                marginBottom: 18,
              }}
            >
              Manage your personal information and preferences
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                marginBottom: 24,
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={preferences.notifications}
                  onChange={handlePreferencesChange}
                />
                Notifications
                <span style={{ marginLeft: 24, fontSize: 13, color: "#555" }}>
                  Show Deleted Events
                </span>
                <input
                  type="checkbox"
                  name="showDeletedEvents"
                  checked={preferences.showDeletedEvents}
                  onChange={handlePreferencesChange}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferencesChange}
                />
                Email Notifications
                <span style={{ marginLeft: 24, fontSize: 13, color: "#555" }}>
                  Auto Delete Finished Events
                </span>
                <input
                  type="checkbox"
                  name="autoDeleteFinishedEvents"
                  checked={preferences.autoDeleteFinishedEvents}
                  onChange={handlePreferencesChange}
                  style={{ marginLeft: 8 }}
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  name="eventReminder"
                  checked={preferences.eventReminder}
                  onChange={handlePreferencesChange}
                />
                Event Reminder
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox"
                  name="connectionRequest"
                  checked={preferences.connectionRequest}
                  onChange={handlePreferencesChange}
                />
                Connection Request
              </label>
            </div>
            <button
              type="submit"
              style={{
                background: "#174c7f",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 32px",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
