import { useEffect, useState } from "react";
import axios from "axios";

type Department = {
  id: string;
  name: string;
};

export default function useDepartment() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`);
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
        {
          withCredentials: true,
        },
      );
      console.log(res);

      setDepartments(res.data?.departments ?? []);
    } catch (err: unknown) {
      const error =
        err instanceof axios.AxiosError ? err : new Error(String(err));
      console.error(
        "Department fetch error:",
        error instanceof axios.AxiosError
          ? error.response?.data
          : error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    loading,
  };
}
