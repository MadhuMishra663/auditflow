// import { useEffect, useState } from "react";
// import axios from "axios";

// export interface Department {
//   _id: string;
//   name: string;
// }

// export const useDepartments = () => {
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
//         );
//         console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

//         setDepartments(res.data.departments);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to load departments",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   return { departments, loading, error };
// };

import { useEffect, useState } from "react";
import axios from "axios";

type Department = {
  id: string;
  name: string;
};

export default function useDepartment() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
        {
          withCredentials: true,
        },
      );

      console.log("Departments API:", res.data);

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
