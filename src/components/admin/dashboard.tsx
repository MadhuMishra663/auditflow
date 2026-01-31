"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuth } from "@/components/hooks/useAuth";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Auditor {
  id: number;
  name: string;
  department: string;
  email: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [auditors, setAuditors] = useState<Auditor[]>([
    {
      id: 1,
      name: "Alice Johnson",
      department: "HR",
      email: "alice@example.com",
    },
    { id: 2, name: "Bob Smith", department: "IT", email: "bob@example.com" },
    {
      id: 3,
      name: "Cathy Lee",
      department: "Finance",
      email: "cathy@example.com",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuditor, setNewAuditor] = useState({
    name: "",
    email: "",
    department: "",
  });
  // Only show if logged-in user is admin
  if (!user || user.role !== "admin") return null;

  // Example data
  const totalEmployees = 50;
  const completedAudits = 32;
  const departments = [
    { name: "HR", count: 12 },
    { name: "IT", count: 18 },
    { name: "Finance", count: 10 },
  ];

  const handleAddAuditor = () => {
    if (!newAuditor.name || !newAuditor.email || !newAuditor.department) return;
    setAuditors([...auditors, { id: auditors.length + 1, ...newAuditor }]);
    setNewAuditor({ name: "", email: "", department: "" });
    setShowAddModal(false);
  };

  const handleRemoveAuditor = (id: number) => {
    setAuditors(auditors.filter((a) => a.id !== id));
  };

  // Doughnut chart data
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedAudits, totalEmployees - completedAudits],
        backgroundColor: ["#6B9AC4", "#E8F1F8"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#E8F1F8] p-8">
      <h1 className="text-4xl font-extrabold text-[#6B9AC4] mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Circle graph */}
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Audit Completion
          </h2>
          <Doughnut data={data} />
          <p className="mt-4 text-gray-700 font-medium">
            {Math.round((completedAudits / totalEmployees) * 100)}% Completed
          </p>
        </div>

        {/* Total Employees */}
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Total Employees
          </h2>
          <p className="text-3xl font-bold text-[#6B9AC4]">{totalEmployees}</p>
        </div>

        {/* Department-wise */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Departments
          </h2>
          <ul className="space-y-2">
            {departments.map((d) => (
              <li
                key={d.name}
                className="flex justify-between bg-[#F0F7FB] px-4 py-2 rounded-lg"
              >
                <span className="font-medium text-gray-700">{d.name}</span>
                <span className="font-bold text-[#6B9AC4]">{d.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Auditors List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Auditors</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#6B9AC4] text-white rounded-lg hover:bg-[#5A89B0] transition"
          >
            Add Auditor
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-[#E8F1F8] text-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditors.map((auditor) => (
                <tr key={auditor.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{auditor.name}</td>
                  <td className="px-4 py-2">{auditor.email}</td>
                  <td className="px-4 py-2">{auditor.department}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveAuditor(auditor.id)}
                      className="px-2 py-1 bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Auditor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add Auditor
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
              value={newAuditor.name}
              onChange={(e) =>
                setNewAuditor({ ...newAuditor, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
              value={newAuditor.email}
              onChange={(e) =>
                setNewAuditor({ ...newAuditor, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Department"
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
              value={newAuditor.department}
              onChange={(e) =>
                setNewAuditor({ ...newAuditor, department: e.target.value })
              }
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAuditor}
                className="px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
