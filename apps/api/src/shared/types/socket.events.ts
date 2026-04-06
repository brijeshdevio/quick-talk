export const SOCKET_EVENTS = {
  // Rooms
  ROOM_JOIN: "room:join",
  ROOM_LEAVE: "room:leave",

  // Presence
  PRESENCE_GET_ONLINE: "presence:get_online",
  PRESENCE_ONLINE_LIST: "presence:online_list",
  USER_ONLINE: "user:online",
  USER_OFFLINE: "user:offline",

  // Typing
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",
  TYPING_STARTED: "typing:started",
  TYPING_STOPPED: "typing:stopped",

  // Messages
  MESSAGE_SEND: "message:send",
  MESSAGE_NEW: "message:new",
  MESSAGE_READ: "message:read",
  MESSAGE_READ_ACK: "message:read_ack",
  MESSAGE_DELETE: "message:delete",
  MESSAGE_DELETED: "message:deleted",

  // Chats
  CHAT_NEW: "chat:new",
  CHAT_UPDATED: "chat:updated",
  CHAT_UPDATED_LAST_MSG: "chat:updated_last_message",
} as const;
