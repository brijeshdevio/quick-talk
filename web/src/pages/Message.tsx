import { SendHorizontal } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useRef, type FormEvent } from "react";
import { MessageList } from "@/components";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/auth";
import { socket } from "@/lib/socket";

export function Message() {
  const { channelId } = useParams();
  const { user } = useAuth();
  const {
    getUserMutate: { mutate, data },
  } = useUser();
  const typingRef = useRef<boolean>(false);

  /** ───────────────────────────
   *  Send message
   * ───────────────────────────*/
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message");

    if (!user?._id || !channelId || !message) return;

    socket.emit("send_message", {
      message,
      sender: user._id,
      receiver: channelId,
    });

    form.reset();
  };

  /** ───────────────────────────
   *  Connect socket only ONCE
   * ───────────────────────────*/
  useEffect(() => {
    if (!socket.connected) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  /** ───────────────────────────
   *  Join room whenever channel changes
   * ───────────────────────────*/
  useEffect(() => {
    if (!user?._id || !channelId) return;

    mutate(channelId);
  }, [channelId, user?._id]);

  /** ───────────────────────────
   *  Typing event
   * ───────────────────────────*/
  const handleTyping = () => {
    if (!typingRef.current) {
      typingRef.current = true;
      socket.emit("typing_message", {
        typing: true,
        sender: user?._id,
        receiver: channelId,
      });
      setTimeout(() => {
        socket.emit("typing_message", {
          typing: false,
          sender: user?._id,
          receiver: channelId,
        });
        typingRef.current = false;
      }, 1000);
    }
  };

  return (
    <>
      {/* HEADER */}
      <section className="w-full px-5 py-1 bg-base-100 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="avatar avatar-online avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              {data?.user?.image ? (
                <img src={data.user.image} alt={data?.user?.name} />
              ) : (
                <span>{data?.user?.name?.[0]}</span>
              )}
            </div>
          </div>
          <div>
            <h3>{data?.user?.name}</h3>
            <p className="text-xs text-primary">Online</p>
          </div>
        </div>
      </section>

      {/* MESSAGE LIST */}
      <section className="h-[calc(100vh-107px)] px-3 sm:px-5 md:px-10 py-10 overflow-y-scroll">
        <MessageList />
      </section>

      {/* INPUT */}
      <section className="w-full px-3 sm:px-5 md:px-10 bg-base-100 border-t border-white/10">
        <form
          className="flex items-center gap-4 px-3 py-2 border-b border-white/5"
          onSubmit={handleSendMessage}
        >
          <label className="input input-bordered w-full">
            <input
              type="text"
              placeholder="Type a message..."
              name="message"
              required
              onChange={handleTyping}
            />
          </label>
          <button className="btn btn-primary">
            <SendHorizontal size={20} />
          </button>
        </form>
      </section>
    </>
  );
}
