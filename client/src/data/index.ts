import {
  Clock,
  LockKeyhole,
  MessageSquare,
  UserPlus,
  Users,
} from "lucide-react";

export const features = [
  {
    Icon: MessageSquare,
    title: "Real-Time Messaging",
    description:
      "Instant delivery with zero latency. Typing indicators and read receipts keep you in sync.",
  },
  {
    Icon: LockKeyhole,
    title: "Secure & Private",
    description:
      "End-to-end encryption for your peace of mind. Your conversations stay private.",
  },
  {
    Icon: Clock,
    title: "Message history",
    description:
      "Never lose a conversation with persistent archives and powerful search capabilities.",
  },
];

export const steps = [
  {
    Icon: UserPlus,
    title: "1. Create Account",
    description: "Sign up for free in seconds using email or social login.",
  },
  {
    Icon: Users,
    title: "2. Add Contacts",
    description: "Invite your friends or colleagues via link or email.",
  },
  {
    Icon: MessageSquare,
    title: "3. Start Chatting",
    description: "Connect instantly and start the conversation.",
  },
];

export const messages = [
  {
    _id: "m1",
    senderId: "1",
    receiverId: "2",
    content: "Hey! Are you available right now?",
    createdAt: "2025-11-23T09:10:00Z",
  },
  {
    _id: "m2",
    senderId: "2",
    receiverId: "1",
    content: "Yes, what's up?",
    createdAt: "2025-11-23T09:11:12Z",
  },
  {
    _id: "m3",
    senderId: "1",
    receiverId: "2",
    content: "I wanted to discuss the project update.",
    createdAt: "2025-11-23T09:12:30Z",
  },
  {
    _id: "m4",
    senderId: "2",
    receiverId: "1",
    content: "Sure, I can talk now.",
    createdAt: "2025-11-23T09:13:00Z",
  },
  {
    _id: "m5",
    senderId: "1",
    receiverId: "2",
    content: "Great! Give me two minutes.",
    createdAt: "2025-11-23T09:14:25Z",
  },
  {
    _id: "m6",
    senderId: "2",
    receiverId: "1",
    content: "Alright, I'll wait.",
    createdAt: "2025-11-23T09:15:10Z",
  },
  {
    _id: "m7",
    senderId: "1",
    receiverId: "2",
    content: "Okay, I'm here.",
    createdAt: "2025-11-23T09:17:40Z",
  },
  {
    _id: "m8",
    senderId: "2",
    receiverId: "1",
    content: "Perfect, let's start.",
    createdAt: "2025-11-23T09:18:00Z",
  },
];

export const chats = [
  {
    _id: "1",
    member: [
      {
        _id: "1",
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?u=user_1",
        isOnline: true,
        lastSeen: "2025-11-22T14:35:00Z",
      },
    ],
    lastMessage: {
      _id: "m1",
      content: "Hi! How's it going?",
    },
  },
  {
    _id: "2",
    member: [
      {
        _id: "2",
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?u=user_2",
        isOnline: false,
        lastSeen: "2025-11-22T13:10:45Z",
      },
    ],
    lastMessage: {
      _id: "m2",
      content: "Did you finish the task?",
    },
  },
  {
    _id: "3",
    member: [
      {
        _id: "3",
        name: "Sophia Lee",
        avatar: "https://i.pravatar.cc/150?u=user_3",
        isOnline: true,
        lastSeen: "2025-11-22T12:02:30Z",
      },
    ],
    lastMessage: {
      _id: "m3",
      content: "Let's catch up later today.",
    },
  },
  {
    _id: "4",
    member: [
      {
        _id: "4",
        name: "Daniel Martinez",
        avatar: "https://i.pravatar.cc/150?u=user_4",
        isOnline: false,
        lastSeen: "2025-11-21T20:45:10Z",
      },
    ],
    lastMessage: {
      _id: "m4",
      content: "Thanks for your help!",
    },
  },
  {
    _id: "5",
    member: [
      {
        _id: "5",
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?u=user_5",
        isOnline: true,
        lastSeen: "2025-11-21T18:15:55Z",
      },
    ],
    lastMessage: {
      _id: "m5",
      content: "Are we still on for tomorrow?",
    },
  },
];
