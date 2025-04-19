import React, { useState } from "react";
import calendarIcon from "../assets/calender.png";
import recommendationsIcon from "../assets/time.png";
import totalIcon from "../assets/users.png";
import techImg from "../assets/tech.png";
import designImg from "../assets/design.png";
import aiImg from "../assets/ai.png";

const recommendedEvents = [
  {
    id: 1,
    title: "Tech Meetup 2024",
    date: "Apr 20, 2025",
    time: "4:00 PM - 7:00 PM",
    location: "KFUPM Stadium",
    participants: 24,
    imageUrl: techImg,
    tags: ["Technology", "Networking", "Professional"],
  },
  {
    id: 2,
    title: "Design Thinking Workshop",
    date: "May 5, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Innovation Lab",
    participants: 15,
    imageUrl: designImg,
    tags: ["Professional", "Creative"],
  },
  {
    id: 3,
    title: "AI & Data Science",
    date: "May 12, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "CS Building Room 101",
    participants: 30,
    imageUrl: aiImg,
    tags: ["Technology", "Networking"],
  },
];

const enrolledEvents = [
  {
    ...recommendedEvents[0],
  },
];

export default function EventsPage() {
  const [view, setView] = useState("recommended");
  const summary = {
    joined: enrolledEvents.length,
    recommendations: recommendedEvents.length,
    total: recommendedEvents.length + enrolledEvents.length,
  };
  const events = view === "recommended" ? recommendedEvents : enrolledEvents;

  return (
    <div className="pt-[150px] px-4 sm:px-12 lg:px-24 pb-12 space-y-8 bg-gray-50 min-h-screen">
      {/* Greeting Banner */}
      <div className="bg-blue-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hello Ahmed&nbsp;!</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-50 py-8 justify-items-center">
        {[
          { icon: calendarIcon, label: "Events Joined", value: summary.joined },
          {
            icon: recommendationsIcon,
            label: "New Recommendations",
            value: summary.recommendations,
          },
          { icon: totalIcon, label: "Total Events", value: summary.total },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="
        flex items-center
        w-full max-w-[385px] h-[99px]
        bg-[#084B7A] rounded-[10px] shadow
        p-4
      "
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
            key={e.id}
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
              <div className="text-sm text-gray-500 space-y-1">
                <p>📅 {e.date}</p>
                <p>⏰ {e.time}</p>
                <p>📍 {e.location}</p>
                <p>👥 {e.participants} participants</p>
              </div>

              {/* Dynamic Buttons */}
              {view === "recommended" ? (
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-[#084B7A] text-white py-2 rounded-lg hover:bg-[#073B5E] transition">
                    Register Event
                  </button>
                  <button className="w-full bg-[#D9D9D9] text-[#084B7A] py-2 rounded-lg hover:bg-[#C0C0C0] transition">
                    Remove Event
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Accept Event
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                    Decline Event
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
