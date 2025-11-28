import { isAxiosError } from "axios";
import { toast } from "sonner";

export function errorHandler(error: unknown) {
  if (isAxiosError(error)) {
    let message = error?.response?.data?.message || error?.message;
    if (Array.isArray(message)) {
      message = message?.join(" ");
    }
    toast.error(message);
  }
}
