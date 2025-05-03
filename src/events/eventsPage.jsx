import React, { useState, useEffect } from "react";
import axios from "axios";
import calendarIcon from "../assets/calender.png";
import recommendationsIcon from "../assets/time.png";
import totalIcon from "../assets/users.png";
import axiosInstance from "../api/axios";
export default function EventsPage() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("recommended");
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState({
    joined: 0,
    recommendations: 0,
    total: 0,
  });

  // Load current user profile
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/auth/profile");
        setUser(data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    })();
  }, []);

  // Load events whenever `view` changes
  useEffect(() => {
    (async () => {
      try {
        let res;
        if (view === "recommended") {
          res = await axiosInstance.get("/events");
          setSummary({
            joined: 0,
            recommendations: res.data.length,
            total: res.data.length,
          });
        } else {
          res = await axiosInstance.get("/events/enrolled");
          setSummary({
            joined: res.data.length,
            recommendations: 0,
            total: res.data.length,
          });
        }
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    })();
  }, [view]);

  // Toggle enrollment for an event
  const handleToggle = async (id) => {
    try {
      await axios.post(`/events/${id}/enroll`);
      // re-fetch current view
      const endpoint = view === "recommended" ? "/events" : "/events/enrolled";
      const res = await axios.get(endpoint);
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to toggle enrollment:", err);
    }
  };

  return (
    <div className="pt-[150px] px-4 sm:px-12 lg:px-24 pb-12 space-y-8 bg-gray-50 min-h-screen">
      {/* Greeting Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Hello {user ? user.fullName : "Student"}!
          </h2>
          <p className="mt-1 text-sm opacity-90">
            Discover events that match your interests and connect with fellow
            KFUPM students.
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
          Manage My Events
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center py-8">
        {[
          {
            icon: calendarIcon,
            label: "Events Joined",
            value: summary.joined,
          },
          {
            icon: recommendationsIcon,
            label: "Recommendations",
            value: summary.recommendations,
          },
          { icon: totalIcon, label: "Total Events", value: summary.total },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex items-center w-full max-w-[385px] h-[99px] bg-[#084B7A] rounded-[10px] shadow p-4"
          >
            <img src={icon} alt="" className="h-12 w-12 flex-shrink-0" />
            <div className="ml-4">
              <p className="text-sm text-white/80">{label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-4 bg-white rounded-full px-2 py-1 w-max">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            view === "recommended"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:text-blue-700"
          }`}
          onClick={() => setView("recommended")}
        >
          Recommended Events
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            view === "enrolled"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:text-blue-700"
          }`}
          onClick={() => setView("enrolled")}
        >
          Enrolled in Events
        </button>
      </div>

      {/* Section Heading */}
      <h2 className="text-2xl font-semibold text-gray-900">
        {view === "recommended"
          ? "Recommended For You!"
          : "Your Registered Events"}
      </h2>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((e) => (
          <div
            key={e._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <div className="relative">
              <img
                src={e.imageUrl}
                alt={e.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {e.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{e.title}</h3>
              <div className="space-y-1 text-sm text-gray-500">
                <p>📅 {e.date}</p>
                <p>⏰ {e.time}</p>
                <p>📍 {e.location}</p>
                <p>👥 {e.participants} participants</p>
              </div>
              <button
                onClick={() => handleToggle(e._id)}
                className={`mt-4 w-full py-2 rounded-lg transition ${
                  view === "recommended"
                    ? "bg-[#084B7A] text-white hover:bg-[#073B5E]"
                    : "bg-[#D9D9D9] text-[#084B7A] hover:bg-[#C0C0C0]"
                }`}
              >
                {view === "recommended" ? "Register Event" : "Remove Event"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
