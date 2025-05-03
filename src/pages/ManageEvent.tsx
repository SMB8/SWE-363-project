import React, { useState, useEffect } from "react";
import axios from 'axios'; // Assuming axios is used for API calls
import axiosInstance from "../api/axios";

// Define a type for the user data received from the API
interface User {
  _id: string;
  studentId: string;
  fullName: string;
  email: string;
  accountType: 'student' | 'staff';
}

// TODO: Replace with actual logic to get user role (e.g., from context or auth state)
const getCurrentUserRole = (): 'student' | 'staff' | null => {
  // Placeholder: Assume 'staff' for now. Implement actual role retrieval.
  // Example: const { user } = useAuth(); return user?.accountType;
  return 'staff';
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserRole = getCurrentUserRole();

  useEffect(() => {
    const fetchUsers = async () => {
      // Only fetch if the user is staff
      if (currentUserRole !== 'staff') {
        setError("Access Denied: You do not have permission to view this page.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/users', )
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        if (err.response?.status === 403) {
            setError("Access Denied: You do not have permission to view users.");
        } else {
            setError("Failed to fetch users. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserRole]); // Re-run effect if role changes

  if (currentUserRole !== 'staff') {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-20 text-center">
        <h1 className="text-2xl font-semibold text-red-600">{error || "Access Denied"}</h1>
        <p className="text-gray-600">You must be staff to manage users.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <h1 className="text-3xl font-semibold mb-1">User Management</h1>
      <p className="text-gray-600 mb-4">
        Manage and oversee all users in the system
      </p>

      {/* Remove search and filter UI elements */}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {/* Update table headers */}
              <th className="py-3 px-4 text-left text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-gray-600">ID</th>
              <th className="py-3 px-4 text-left text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-gray-600">Role</th>
              {/* Remove unnecessary headers */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">Loading users...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-red-500">{error}</td>
              </tr>
            ) : users.length === 0 ? (
               <tr>
                 <td colSpan={4} className="py-4 px-4 text-center text-gray-500">No users found.</td>
               </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  {/* Update table data cells */}
                  <td className="py-3 px-4">
                     <div>
                       <div className="font-medium">{user.fullName}</div>
                     </div>
                  </td>
                  <td className="py-3 px-4">{user.studentId}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {/* Display role - capitalize first letter */}
                    {user.accountType && user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                  </td>
                  {/* Remove unnecessary cells */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; // Export the renamed component


