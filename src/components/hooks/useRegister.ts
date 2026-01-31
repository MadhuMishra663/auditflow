import { useState } from "react";
import axios from "axios";

type RegisterPayload =
  | {
      name: string;
      email: string;
      password: string;
      role: "admin";
    }
  | {
      name: string;
      email: string;
      password: string;
      role: "department" | "auditor";
      departmentId: string;
    };

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (payload: RegisterPayload) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_REGISTER}`,
        payload,
      );

      return response.data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
  };
};
