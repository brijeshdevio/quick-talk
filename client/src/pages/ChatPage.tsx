import { MessageCirclePlus } from "lucide-react";

export function ChatPage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="max-w-[350px] flex flex-col gap-2 text-center">
        <h2 className="text-2xl">Welcome back, John!</h2>
        <p className="opacity-70">
          Select a conversation from the list or search for a colleague to start
          chatting.
        </p>
        <button className="btn btn-primary w-fit mx-auto mt-2">
          <MessageCirclePlus size={20} />
          <span>Start New Chat</span>
        </button>
      </div>
    </section>
  );
}
