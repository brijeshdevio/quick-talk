import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/api/user.service";

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: UserService.users,
    enabled: false,
  });
}
