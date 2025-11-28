import { useLocalStore } from "@/hooks/useLocalStore";
import { MessagesSquare, Plus } from "lucide-react";

export function Chat() {
  const { setIsContactModal } = useLocalStore();

  const handleOpenContactModal = () => setIsContactModal(true);

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-1 text-center">
        <MessagesSquare size={50} className="mx-auto text-primary mb-2" />
        <h2 className="text-2xl">Select a conversation</h2>
        <p className="text-sm opacity-70">
          Choose from your existing conversation, or start new one.
        </p>
        <div className="mt-3">
          <button
            className="btn btn-sm btn-primary"
            onClick={handleOpenContactModal}
          >
            <Plus size={20} />
            <span>New Message</span>
          </button>
        </div>
      </div>
    </section>
  );
}
