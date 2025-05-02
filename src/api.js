const API_BASE = process.env.REACT_APP_API_BASE || "";
// Read the stored JWT (adjust if you keep it somewhere else)
function getToken() {
  return localStorage.getItem("token");
}

// Helper to attach auth header
function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 1. Fetch all events
export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/api/events/`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}

// 2. Fetch enrolled events
export async function fetchEnrolledEvents() {
  const res = await fetch(`${API_BASE}/api/events/enrolled`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load enrolled events");
  return res.json();
}

// 3. Toggle enrollment for a single event
export async function toggleEventEnrollment(eventId) {
  const res = await fetch(`${API_BASE}/api/events/${eventId}/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to enroll/unenroll");
  return res.json(); // { enrolled: true/false }
}
