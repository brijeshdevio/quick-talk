import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { login } from "../services/auth.service";
import { errorHandler } from "@/utils";
import type { FormEvent } from "react";
import type { AxiosResponse } from "axios";
import type { LoginType } from "@/types";

export function useLogin() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth/login"],
    mutationFn: async (data: LoginType) => await login(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      window.location.href = "/c";
      toast.success(data.message);
    },
    onError: errorHandler,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as LoginType);
  };

  return { handleSubmit, isPending };
}
