import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
const API_BASE = process.env.REACT_APP_API_BASE || "";


function logout() {
    localStorage.removeItem('token');
}

export function useLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return handleLogout;
}


function getToken() {
    return localStorage.getItem("token");
}

export function getCurrentUserId() {
    const token = getToken();
    if (!token) return null;
  
    try {
      const decoded = jwt_decode(token);
      return decoded.id;
    } catch (err) {
      return null;
    }
}

  
function authHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchMadeEvents() {
    try{
        const res = await fetch(`${API_BASE}/api/events/`, {
            headers: {
              "Content-Type": "application/json",
              ...authHeaders(),
            },
        });
        if (!res.ok) throw new Error("Failed to made events");
        
        const userID = getCurrentUserId()
        const allEvents = await res.json();

        const userEvents = allEvents.filter(event=> event.CreatorID === userID);

        return userEvents;

    }catch (err) {
      console.error(err);
    }
    
}

export async function deleteEvent(id){
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(), // if your route requires auth
        },
      });
  
      if (!res.ok) throw new Error('Failed to delete event');
  
      // Optionally: refresh event list after deletion
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
};

export async function updateEvent(id){
    try {
        const res = await fetch(`${API_BASE}/api/events/${id}`, {
          method: 'PUT', // or PATCH depending on your API
          headers: {
            'Content-Type': 'application/json',
            ...authHeaders(),
          },
          body: JSON.stringify({
            StartTime: 'TBA',
            Location: 'TBA',
          }),
        });
    
        if (!res.ok) throw new Error('Failed to update event');
    
        const updated = await res.json();
    
        // Replace the event in the state
        setEvents(events.map(e => e.id === updated.id ? updated : e));
    } catch (err) {
        console.error('Error updating event:', err);
    }
}