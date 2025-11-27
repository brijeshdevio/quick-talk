import { contacts } from "@/data";
import type { ContactType } from "@/types";
import { Search, X } from "lucide-react";

function ContactItem({ email, name }: ContactType) {
  return (
    <div className="flex items-center gap-2 bg-base-200 p-2 hover:bg-base-300 border-b border-white/5">
      <div>
        <div className={`avatar avatar-placeholder`}>
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            <span>{name?.[0]}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-base">{name}</h3>
        <p className="text-sm opacity-70">{email}</p>
      </div>
      <div className="ml-auto">
        <button className="btn btn-primary btn-sm">Select</button>
      </div>
    </div>
  );
}

export function ContactModal() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-base-300/80 p-3">
      <div className="card w-full max-w-[400px] bg-base-100 border border-white/5">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Select Contact</h2>
            <button className="btn btn-sm btn-ghost btn-circle">
              <X size={20} />
            </button>
          </div>
          <div>
            <label className="input w-full">
              <Search className="opacity-60" />
              <input type="text" placeholder="Search name or email..." />
            </label>
          </div>
          <div className="mt-2 max-h-[400px] overflow-y-scroll">
            {contacts?.map((contact) => (
              <ContactItem {...contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
