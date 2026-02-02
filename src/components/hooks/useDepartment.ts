import { useEffect, useState } from "react";
import axios from "axios";

export interface Department {
  _id: string;
  name: string;
}

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
        );
        console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

        setDepartments(res.data.departments);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load departments",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return { departments, loading, error };
};
