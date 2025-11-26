import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "@/api/user.api";
import { useParams } from "react-router-dom";

export function useUser() {
  const { channelId } = useParams();

  const getUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });

  const getUserMutate = useMutation({
    mutationKey: ["users", channelId],
    mutationFn: async (id: string) => await getUser(id),
  });

  return { getUsersQuery, getUserMutate };
}
