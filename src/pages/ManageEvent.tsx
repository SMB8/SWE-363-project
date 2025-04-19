import React, { useState } from "react";


const initialUsers = [
  {
    id: "S12345678",
    name: "Ahmed Al‑Shehri",
    email: "ahmed.alshehri@kfupm.edu.sa",
    role: "Student",
    status: "Active",
    joinDate: "2024-02-15",
    events: 8,
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "S23456789",
    name: "Mohammed Khan",
    email: "mohammed.khan@kfupm.edu.sa",
    role: "Event Creator",
    status: "Active",
    joinDate: "2024-01-20",
    events: 12,
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "S34567890",
    name: "Abdullah Al‑Ghamdi",
    email: "abdullah.ghamdi@kfupm.edu.sa",
    role: "Student",
    status: "Inactive",
    joinDate: "2024-03-05",
    events: 2,
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "S45678901",
    name: "Khaled Al‑Otaibi",
    email: "khaled.otaibi@kfupm.edu.sa",
    role: "Admin",
    status: "Active",
    joinDate: "2023-12-10",
    events: 15,
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "S56789012",
    name: "Saad Al‑Dossari",
    email: "saad.dossari@kfupm.edu.sa",
    role: "Student",
    status: "Active",
    joinDate: "2024-02-28",
    events: 5,
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "S67890123",
    name: "Omar Al‑Zahrani",
    email: "omar.zahrani@kfupm.edu.sa",
    role: "Event Creator",
    status: "Active",
    joinDate: "2024-01-15",
    events: 10,
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: "S78901234",
    name: "Ali Al‑Qahtani",
    email: "ali.qahtani@kfupm.edu.sa",
    role: "Student",
    status: "Pending",
    joinDate: "2024-03-10",
    events: 0,
    avatar: "https://i.pravatar.cc/40?img=7",
  },
  {
    id: "S89012345",
    name: "Hassan Al‑Malki",
    email: "hassan.malki@kfupm.edu.sa",
    role: "Student",
    status: "Active",
    joinDate: "2024-02-10",
    events: 6,
    avatar: "https://i.pravatar.cc/40?img=8",
  },
];

const roleClasses = {
  Student: "bg-green-100 text-green-700",
  "Event Creator": "bg-blue-100 text-blue-700",
  Admin: "bg-red-100 text-red-700",
};

const statusClasses= {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-600",
};

const MangeEvent: React.FC = () => {
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = initialUsers.filter(
    (u) =>
      (filterRole === "All" || u.role === filterRole) &&
      (filterStatus === "All" || u.status === filterStatus) &&
      u.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetFilters = () => {
    setFilterRole("All");
    setFilterStatus("All");
    setSearch("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">


      <h1 className="text-3xl font-semibold mb-1">User Management</h1>
      <p className="text-gray-600 mb-4">
        Manage and oversee all users in the system
      </p>

      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 flex-1">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value )}
          className="bg-white rounded-lg shadow px-3 py-2"
        >
          <option>All Roles</option>
          <option>Student</option>
          <option>Event Creator</option>
          <option>Admin</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value )}
          className="bg-white rounded-lg shadow px-3 py-2"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">User</th>
              <th className="py-3 px-4 text-left text-gray-600">ID</th>
              <th className="py-3 px-4 text-left text-gray-600">Role</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
              <th className="py-3 px-4 text-left text-gray-600">Join Date</th>
              <th className="py-3 px-4 text-left text-gray-600">Events</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img
                    src={u.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-gray-500 text-sm">{u.email}</div>
                  </div>
                </td>
                <td className="py-3 px-4">{u.id}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      roleClasses[u.role]
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      statusClasses[u.status]
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-4">{u.joinDate}</td>
                <td className="py-3 px-4">{u.events}</td>
                <td className="py-3 px-4 text-center">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeEvent;


