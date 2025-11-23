import { Link2, LockKeyhole, MessageSquare } from "lucide-react";

export const features = [
  {
    Icon: MessageSquare,
    title: "Real-Time Messaging",
    description:
      "Communicate instantly with your team through direct messages and group channels.",
  },
  {
    Icon: LockKeyhole,
    title: "Secure & Private",
    description:
      "Your conversation are protected with end-to-end encryption, ensuring privacy and security.",
  },
  {
    Icon: Link2,
    title: "File Sharing",
    description:
      "Easily share documents, images and other files without leaving the app.",
  },
];

export const userProfile = {
  name: "Alex Doe",
  image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  email: "alex.doe@example.com",
};

export const chatList = [
  {
    _id: "1",
    name: "Alice Johnson",
    profileImage: "https://i.pravatar.cc/150?u=user_1",
    lastMessage: "Hey! How’s everything going?",
    lastSeen: "2025-11-22T14:35:00Z",
    isOnline: true,
  },
  {
    _id: "2",
    name: "Mark Rivera",
    profileImage: "https://i.pravatar.cc/150?u=user_2",
    lastMessage: "I'll send it in a minute.",
    lastSeen: "2025-11-23T08:12:00Z",
    isOnline: false,
  },
  {
    _id: "3",
    name: "Sophie Lee",
    profileImage: "https://i.pravatar.cc/150?u=user_3",
    lastMessage: "Thanks! That helps a lot.",
    lastSeen: "2025-11-23T09:50:00Z",
    isOnline: true,
  },
  {
    _id: "4",
    name: "Daniel Cooper",
    profileImage: "https://i.pravatar.cc/150?u=user_4",
    lastMessage: "Where should we meet?",
    lastSeen: "2025-11-22T20:10:00Z",
    isOnline: false,
  },
  {
    _id: "5",
    name: "Emily Carter",
    profileImage: "https://i.pravatar.cc/150?u=user_5",
    lastMessage: "Call me when you're free.",
    lastSeen: "2025-11-23T11:25:00Z",
    isOnline: true,
  },
  {
    _id: "6",
    name: "James Walker",
    profileImage: "https://i.pravatar.cc/150?u=user_6",
    lastMessage: "Got it, thanks!",
    lastSeen: "2025-11-21T18:40:00Z",
    isOnline: false,
  },
  {
    _id: "7",
    name: "Natalie Brooks",
    profileImage: "https://i.pravatar.cc/150?u=user_7",
    lastMessage: "See you tonight!",
    lastSeen: "2025-11-23T12:00:00Z",
    isOnline: true,
  },
  {
    _id: "8",
    name: "Chris Evans",
    profileImage: "https://i.pravatar.cc/150?u=user_8",
    lastMessage: "Let me check and get back to you.",
    lastSeen: "2025-11-22T23:30:00Z",
    isOnline: false,
  },
  {
    _id: "9",
    name: "Olivia Turner",
    profileImage: "https://i.pravatar.cc/150?u=user_9",
    lastMessage: "Sure, sounds great!",
    lastSeen: "2025-11-23T07:45:00Z",
    isOnline: true,
  },
  {
    _id: "10",
    name: "Henry Adams",
    profileImage: "https://i.pravatar.cc/150?u=user_10",
    lastMessage: "That works for me.",
    lastSeen: "2025-11-22T16:05:00Z",
    isOnline: false,
  },
];

export const messages = [
  {
    _id: "m1",
    senderId: "1",
    receiverId: "2",
    message: "Hey! Are you available right now?",
    createdAt: "2025-11-23T09:10:00Z",
  },
  {
    _id: "m2",
    senderId: "2",
    receiverId: "1",
    message: "Yes, what's up?",
    createdAt: "2025-11-23T09:11:12Z",
  },
  {
    _id: "m3",
    senderId: "1",
    receiverId: "2",
    message: "I wanted to discuss the project update.",
    createdAt: "2025-11-23T09:12:30Z",
  },
  {
    _id: "m4",
    senderId: "2",
    receiverId: "1",
    message: "Sure, I can talk now.",
    createdAt: "2025-11-23T09:13:00Z",
  },
  {
    _id: "m5",
    senderId: "1",
    receiverId: "2",
    message: "Great! Give me two minutes.",
    createdAt: "2025-11-23T09:14:25Z",
  },
  {
    _id: "m6",
    senderId: "2",
    receiverId: "1",
    message: "Alright, I'll wait.",
    createdAt: "2025-11-23T09:15:10Z",
  },
  {
    _id: "m7",
    senderId: "1",
    receiverId: "2",
    message: "Okay, I'm here.",
    createdAt: "2025-11-23T09:17:40Z",
  },
  {
    _id: "m8",
    senderId: "2",
    receiverId: "1",
    message: "Perfect, let's start.",
    createdAt: "2025-11-23T09:18:00Z",
  },
];
