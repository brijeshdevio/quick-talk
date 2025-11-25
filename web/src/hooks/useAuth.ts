import { useMutation } from "@tanstack/react-query";
import { isAxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";
import { login, register } from "@/api/auth.api";
import type { LoginType, RegisterType } from "@/types";

function errorHandler(error: unknown) {
  if (isAxiosError(error)) {
    let message = error?.response?.data?.message || error?.message;
    if (Array.isArray(message)) {
      message = message?.join(" ");
    }
    toast.error(message);
  }
}

export function useRegister() {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => await register(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}

export function useLogin() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginType) => await login(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/c";
      toast.success(data.message);
    },
    onError: errorHandler,
  });
  return mutation;
}
