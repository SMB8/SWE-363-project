// src/pages/Profile.jsx
import React, { useState } from "react";

import axiosInstance from "../api/axios"

const initialProfile = {
  name: localStorage.getItem("fullName") || "No Name",
  email: localStorage.getItem("email") || "No Email",
  studentId: localStorage.getItem("studentId") || "No Student ID",
};

const storageJson = localStorage.getItem("interestRatings");
const parsedInterestRatings = storageJson ? JSON.parse(storageJson) : null;
console.log("Parsed Interest Ratings:", parsedInterestRatings);
const initialInterestRatings = {
  social: parsedInterestRatings.social, // e.g., Enjoys social gatherings, parties
  outdoorsy: parsedInterestRatings.outdoorsy, // e.g., Likes hiking, nature, sports
  creative: parsedInterestRatings.creative, // e.g., Into arts, music, writing
  intellectual: parsedInterestRatings.intellectual, // e.g., Enjoys learning, reading, discussions
  relaxed: parsedInterestRatings.relaxed, // e.g., Prefers calm activities, staying in
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [interestRatings, setInterestRatings] = useState(initialInterestRatings);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestRatingChange = (e) => {
    const { name, value } = e.target;
    const rating = Math.max(1, Math.min(5, Number(value)));
    setInterestRatings((prev) => ({ ...prev, [name]: rating }));
  };


  const handleUpdateProfile = async () => {
    try {
      // Adjust the endpoint '/api/profile' if necessary
      // Include interestRatings in the payload if the backend supports it
      const payload = { ...profile, interestRatings  };
      const res = await axiosInstance.put('/profile/update', payload);
      console.log(res);
      console.log(res.data)

      if (res.status === 200) {
        // Update local storage with new profile data
        localStorage.setItem("fullName", res.data.fullName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("studentId", res.data.studentId);
        localStorage.setItem("interestRatings", JSON.stringify(interestRatings));

        alert("Profile updated successfully");
      } else {
        alert("Error, try again");
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. See console for details."); // Provide more feedback
    }
    
  }



  return (
    <div
      style={{
        // ...existing styles...
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
          // ...existing styles...
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
        {/* Removed the commented-out section for old interests display */}
        <button
          style={{
            // ...existing styles...
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
            // Clear other relevant local storage items on logout
            localStorage.removeItem("fullName");
            localStorage.removeItem("email");
            localStorage.removeItem("studentId");
            // localStorage.removeItem("interestRatings"); 
            window.location.href = "/sign-in";
          }}

        >
          Log out
        </button>
      </div>

      {/* Right Panel */}
      <div
        style={{
          // ...existing styles...
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
              // ...existing styles...
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
          {/* Updated Tab Button */}
          <button
            onClick={() => setActiveTab("interests")}
            style={{
              // ...existing styles...
              flex: 1,
              background: activeTab === "interests" ? "#e6ecf5" : "#f7faff", // Changed activeTab check
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Interests {/* Changed text */}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" ? (
          <form
            style={{ maxWidth: 400, margin: "0 auto" }}
            onSubmit={(e) => e.preventDefault()}
          >
            {/* ... existing profile form fields ... */}
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
                name="name" // Changed from fullName to name to match state
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

            <button
            onClick={handleUpdateProfile} // Keep using handleUpdateProfile for personal info
              type="submit"
              style={{
                // ...existing styles...
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
              Save Profile Changes
            </button>
          </form>
        ) : (
          // New Interests Form
          <form
            style={{ maxWidth: 500, margin: "0 auto" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>
              Personality & Interests Rating
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#888",
                marginBottom: 18,
              }}
            >
              Rate the following aspects from 1 (Not at all) to 5 (Very much).
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                marginBottom: 24,
              }}
            >
              {/* Map through the interest ratings state */}
              {Object.entries(interestRatings).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ textTransform: 'capitalize', fontWeight: 500 }}>
                    {key}:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>1</span>
                    <input
                      type="range" // Using range slider for better UX
                      name={key}
                      value={value}
                      onChange={handleInterestRatingChange}
                      min="1"
                      max="5"
                      step="1"
                      style={{ flexGrow: 1, cursor: 'pointer' }}
                    />
                     <span>5</span>
                     <input
                      type="number" // Number input for precise value setting/display
                      name={key}
                      value={value}
                      onChange={handleInterestRatingChange}
                      min="1"
                      max="5"
                      style={{ width: '50px', textAlign: 'center', marginLeft: '10px' }}
                     />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleUpdateProfile} // Use a dedicated handler for interests
              type="button" // Changed type to button to prevent form submission if needed elsewhere
              style={{
                // ...existing styles...
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
              Save Interest Ratings
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
