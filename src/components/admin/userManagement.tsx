"use client";

const UserManagement = () => {
  const users = [
    {
      id: 1,
      name: "John",
      role: "Employee",
      department: "IT",
      joined: "2024-01-12",
    },
    {
      id: 2,
      name: "Alice",
      role: "Auditor",
      department: "HR",
      joined: "2023-10-03",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left bg-gray-100">
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td>{u.name}</td>
              <td>
                <select defaultValue={u.role} className="border rounded px-2">
                  <option>Employee</option>
                  <option>Auditor</option>
                  <option>Admin</option>
                </select>
              </td>
              <td>{u.department}</td>
              <td>{u.joined}</td>
              <td>
                <button className="text-red-500">Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
