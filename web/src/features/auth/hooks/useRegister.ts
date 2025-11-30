import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { register } from "../services/auth.service";
import { errorHandler } from "@/utils";
import type { FormEvent } from "react";
import type { AxiosResponse } from "axios";
import type { RegisterType } from "@/types";

export function useRegister() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth/register"],
    mutationFn: async (data: RegisterType) => await register(data),
    onSuccess: (data: AxiosResponse["data"]) => {
      toast.success(data.message);
    },
    onError: errorHandler,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as RegisterType);
  };

  return { handleSubmit, isPending };
}
