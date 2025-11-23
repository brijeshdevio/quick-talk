import { SendHorizontal } from "lucide-react";
import { MessageList } from "@/components";
import { userProfile } from "@/data";

export function Message() {
  return (
    <>
      <section className="w-full px-5 py-1 bg-base-100 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className={`avatar avatar-placeholder avatar-online`}>
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              {userProfile.image ? (
                <img src={userProfile.image} alt="" />
              ) : (
                <span>{userProfile.name?.[0]}</span>
              )}
            </div>
          </div>
          <div>
            <h3>{userProfile.name}</h3>
            <p className="text-xs text-primary">Online</p>
          </div>
        </div>
      </section>
      <section className="h-[calc(100vh-107px)] px-3 sm:px-5 md:px-10 py-10 overflow-y-scroll">
        <MessageList />
      </section>
      <section className="w-full px-3 sm:px-5 md:px-10 bg-base-100 border-t border-white/10">
        <div className="flex items-center gap-4 px-3 py-2 border-b border-white/5">
          <label className="input input-bordered w-full">
            <input type="text" placeholder="Type a message..." />
          </label>
          <button className="btn btn-primary">
            <SendHorizontal size={20} />
          </button>
        </div>
      </section>
    </>
  );
}
