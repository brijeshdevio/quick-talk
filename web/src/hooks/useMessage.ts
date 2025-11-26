import { getMessages } from "@/api/message.api";
import { useMutation } from "@tanstack/react-query";

export function useMessage() {
  const messagesMutate = useMutation({
    mutationKey: ["messages"],
    mutationFn: async (id: string) => await getMessages(id),
  });

  return { messagesMutate };
}
