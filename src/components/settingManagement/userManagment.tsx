"use client";

import { useState } from "react";
import Button from "../common/button";
import Pagination from "../common/pagination";

type Role =
  | "Organization Administrator"
  | "GRC Manager"
  | "Department Manager"
  | "GRC Auditor"
  | "Viewer";

type Department = "All" | "IT & Security" | "Finance" | "HR" | "Legal";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
}

const ROLE_STYLES: Record<Role, string> = {
  "Organization Administrator": "bg-violet-100 text-black",
  "GRC Manager": "bg-violet-100 text-black",
  "Department Manager": "bg-violet-100 text-black",
  "GRC Auditor": "bg-violet-100 text-black",
  Viewer: "text-black",
};

const INITIAL_USERS: User[] = [
  { id: 1, name: "John Admin", email: "john.admin@acme.com", role: "Organization Administrator", department: "All" },
  { id: 2, name: "Sarah GRC", email: "sarah.grc@acme.com", role: "GRC Manager", department: "All" },
  { id: 3, name: "Mike IT", email: "mike.it@acme.com", role: "Department Manager", department: "IT & Security" },
  { id: 4, name: "Jane Auditor", email: "jane.auditor@acme.com", role: "GRC Auditor", department: "All" },
  { id: 5, name: "Bob Viewer", email: "bob.viewer@acme.com", role: "Viewer", department: "Finance" },
];

const ALL_ROLES: Role[] = [
  "Organization Administrator", "GRC Manager", "Department Manager", "GRC Auditor", "Viewer",
];

const ALL_DEPARTMENTS: Department[] = ["All", "IT & Security", "Finance", "HR", "Legal"];

// ── Icons ──────────────────────────────────────────────────────────────────

function UserIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

function SwitchUserIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 12h12M10 17h4" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: (data: Omit<User, "id">) => void;
  initial?: Omit<User, "id">;
}

function UserModal({ title, onClose, onSave, initial }: ModalProps) {
  const [form, setForm] = useState<Omit<User, "id">>(
    initial ?? { name: "", email: "", role: "Viewer", department: "All" }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XIcon />
          </button>
        </div>

        <div className="space-y-4">
          {(["name", "email"] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder={field === "name" ? "Full name" : "email@acme.com"}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {ALL_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value as Department })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {ALL_DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-2 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7B61FF 0%, #A78BFA 100%)" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [activeUser, setActiveUser] = useState<User>(INITIAL_USERS[0]);
  const [modal, setModal] = useState<{ type: "add" } | { type: "edit"; user: User } | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("Name");
  

  const sortOptions = ["Name", "Email", "Role", "Department"];

  const handleDelete = (id: number) => {
    setUsers((prev) => {
      const next = prev.filter((u) => u.id !== id);
      const newTotal = Math.ceil(next.length / ROWS_PER_PAGE);
      if (currentPage > newTotal) setCurrentPage(Math.max(1, newTotal));
      return next;
    });
  };

  const handleSave = (data: Omit<User, "id">) => {
    if (modal?.type === "add") {
      setUsers((prev) => [...prev, { id: Date.now(), ...data }]);
    } else if (modal?.type === "edit") {
      setUsers((prev) => prev.map((u) => (u.id === modal.user.id ? { ...u, ...data } : u)));
    }
    setModal(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 3;

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    if (sortBy === "Email") return a.email.localeCompare(b.email);
    if (sortBy === "Role") return a.role.localeCompare(b.role);
    if (sortBy === "Department") return a.department.localeCompare(b.department);
    return 0;
  });

  

  const totalPages = Math.ceil(sortedUsers.length / ROWS_PER_PAGE);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">

      <div className="bg-white rounded-2xl shadow-sm border border-[#CCC2FF] p-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

          {/* Left: icon + title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-[#8934E2]">
              <UserIcon className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">User Management</h1>
          </div>

          {/* Right: Sort + Option + Add User */}
          <div className="flex items-center gap-2">

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((p) => !p)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <SortIcon />
                <span>sort</span>
                <ChevronDownIcon />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt
                          ? "bg-violet-50 text-violet-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Option button */}
            <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Option
            </button>

            {/* + Add User — gradient */}
            <div className="w-full sm:w-auto">
                <Button
                  text="+ Add Risk"
                  onClick={() => console.log("Add Risk clicked")}
                  className="w-full sm:w-auto"
                />
              </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="rounded-xl border border-[#CCC2FF] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F6FA] text-black uppercase tracking-wider border-y border-y-[#CCC2FF]">
                <th className="text-left px-7 py-3 font-medium">User</th>
                <th className="text-left px-5 py-3 font-medium">Email</th>
                <th className="text-left px-5 py-3 font-medium">Role</th>
                <th className="text-center px-5 py-3 font-medium">Department</th>
                <th className="text-center px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CCC2FF]">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4 font-medium text-black">{user.name}</td>
                  <td className="px-5 py-4 text-left text-black">{user.email}</td>
                  <td className="px-5 py-4 text-left">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${ROLE_STYLES[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-black">{user.department}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setModal({ type: "edit", user })}
                        className="p-1.5 rounded-lg text-black hover:text-violet-500 hover:bg-violet-50 transition-colors"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 rounded-lg text-black hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                      <button
                        onClick={() => setActiveUser(user)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          activeUser.id === user.id
                            ? "text-violet-500 bg-violet-50"
                            : "text-black hover:text-violet-500 hover:bg-violet-50"
                        }`}
                        title="Switch to this user"
                      >
                        <SwitchUserIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Demo banner ── */}
        <div className="mt-5 flex items-start gap-3 bg-[#ECE8FF] rounded-xl px-5 py-4 border border-[#CCC2FF]">
          <div className="mt-0.5 text-violet-600">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Demo: Test Different Roles</p>
            <p className="text-xs text-black mt-0.5">
              Click the icon to switch between users and see how their role affects navigation access and permissions. Currently logged in as:{" "}
              <strong>{activeUser.name} ({activeUser.role})</strong>
            </p>
          </div>
        </div>


        {/* ── Pagination ── */}
              <Pagination
                currentPage={currentPage}
                totalItems={sortedUsers.length}
                itemsPerPage={ROWS_PER_PAGE}
                onPageChange={(page) => setCurrentPage(page)}
              />

      </div>

      {/* ── Modal ── */}
      {modal && (
        <UserModal
          title={modal.type === "add" ? "Add New User" : "Edit User"}
          initial={modal.type === "edit" ? modal.user : undefined}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}