import { useState } from "react";
import axios from "axios";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  departmentId: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (
    payload: RegisterPayload,
  ): Promise<RegisterResponse | undefined> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await axios.post<RegisterResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_REGISTER}`,
        payload,
      );

      setSuccess(true);
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
    success,
  };
};
