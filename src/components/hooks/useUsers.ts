"use client";
import { useEffect, useState } from "react";
import axios from "axios";

/* ================= TYPES ================= */

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "AUDITOR" | "DEPARTMENT" | "SUPER_ADMIN";
  department_id: string | null;
};

type DepartmentUsers = Record<string, User[]>;

type ApiResponse = {
  success: boolean;
  users: User[];
};

/* ================= HOOK ================= */

export default function useCompanyUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [departmentUsers, setDepartmentUsers] = useState<DepartmentUsers>({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/company-users`,
        {
          withCredentials: true,
        },
      );

      const usersData = res.data.users;

      setUsers(usersData);

      // Group by department
      const grouped: DepartmentUsers = {};

      usersData.forEach((user) => {
        const dept = user.department_id || "NO_DEPT";

        if (!grouped[dept]) grouped[dept] = [];
        grouped[dept].push(user);
      });

      setDepartmentUsers(grouped);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    departmentUsers,
    loading,
  };
}
