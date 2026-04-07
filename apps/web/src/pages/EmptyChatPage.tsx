import { MessageSquare } from "lucide-react";

export function EmptyChatPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full bg-surface text-center p-8">
      <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-8 shadow-sm">
         <MessageSquare className="w-8 h-8 text-tertiary-brand" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-primary-brand mb-3">Focus on the Conversation</h2>
      <p className="text-tertiary-brand max-w-sm text-sm leading-relaxed">
        Select a conversation from the sidebar or start a new one to begin collaborating.
      </p>
    </div>
  );
}
