import { useState } from "react";
import axios from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const loginUser = async (
    payload: LoginPayload,
  ): Promise<LoginResponse | undefined> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_LOGIN}`,
        payload,
      );

      setSuccess(true);

      // Optional: store token
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
    error,
    success,
  };
};
