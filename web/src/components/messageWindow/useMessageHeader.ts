import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMember } from "@/services/user.service";
import { WS_EVENTS, WS_LISTENERS } from "@/constants";
import { useEmit } from "@/hooks/useEmit";
import { useListener } from "@/hooks/useListener";
import { useCallback } from "react";

export function useMessageHeader() {
  const { chatID, memberID } = useParams();

  useEmit(WS_EVENTS.ROOM_JOIN, { chatID });

  const memberQuery = useQuery({
    queryKey: ["members", chatID, memberID],
    queryFn: async () => await getMember(memberID!),
    enabled: !!memberID, // Add enabled condition
  });

  const handleOnline = useCallback(
    (mID: string) => {
      if (memberID === mID) {
        // queryClient.invalidateQueries({
        //   queryKey: ["members", chatID, memberID],
        // });
      }
    },
    [memberID] // Remove refetch from dependencies
  );

  const handleOffline = useCallback(
    (mID: string) => {
      if (memberID === mID) {
        // queryClient.invalidateQueries({
        //   queryKey: ["members", chatID, memberID],
        // });
      }
    },
    [memberID] // Remove refetch from dependencies
  );

  useListener(WS_LISTENERS.USER_ONLINE, handleOnline);
  useListener(WS_LISTENERS.USER_OFFLINE, handleOffline);

  return memberQuery;
}
