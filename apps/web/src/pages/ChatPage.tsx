import { Video, Phone, MoreVertical, Plus, Send } from "lucide-react";

const MESSAGES = [
  { id: 1, sender: "Julian Vane", text: "The revised blueprints for the Oslo project are nearly complete. I've focused on the atrium's light filtration as we discussed.", incoming: true },
  { id: 2, sender: "Me", text: 'Excellent. Make sure we maintain that editorial "Silent Architect" feel. High contrast, sharp edges, no unnecessary noise.', incoming: false },
  { id: 3, sender: "Julian Vane", text: "Exactly. I'm using neutral tones only. The transition between the glass and the stone is now seamless, no visible frames.", incoming: true },
  { id: 4, sender: "Me", text: "That's the spirit. Send over the renders when you're ready. I want to see how the morning sun hits that central pillar.", incoming: false },
  { id: 5, sender: "Julian Vane", text: "Will do. Should be in your inbox within the hour.", incoming: true },
];

export function ChatPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface">
      {/* Top Header */}
      <header className="h-20 flex items-center justify-between px-8 shrink-0 bg-surface/80 backdrop-blur-md z-10 border-b border-surface-container-high/50">
         <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-md bg-secondary-brand flex items-center justify-center">
                 <div className="w-5 h-5 bg-tertiary-brand/50 rounded-full mt-1"></div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#4ade80] border-2 border-surface rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-primary-brand">Julian Vane</h2>
              <span className="text-[10px] font-bold tracking-widest text-[#4ade80] uppercase">Online</span>
            </div>
         </div>

         <div className="flex items-center gap-5 text-tertiary-brand">
           <button className="hover:text-primary-brand transition-colors"><Video className="w-5 h-5 fill-current" /></button>
           <button className="hover:text-primary-brand transition-colors"><Phone className="w-5 h-5 fill-current rotate-90" /></button>
           <button className="hover:text-primary-brand transition-colors"><MoreVertical className="w-5 h-5" /></button>
         </div>
      </header>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
        {MESSAGES.map((msg, index) => {
          const isNextSame = MESSAGES[index + 1]?.sender === msg.sender;
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-2xl py-4 px-6 rounded-[0.5rem] shadow-sm ${msg.incoming ? 'bg-surface-container-high self-start text-primary-brand' : 'bg-tertiary-brand self-end text-white'}`}
              style={{
                marginBottom: isNextSame ? '-0.5rem' : '0'
              }}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-8 pt-4 shrink-0 bg-surface">
         <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white h-14 pl-4 pr-2 rounded-[0.5rem] shadow-[0_10px_30px_-10px_rgba(45,52,53,0.08)]">
           <button className="text-tertiary-brand hover:text-primary-brand transition-colors p-2 cursor-pointer">
             <Plus className="w-5 h-5" />
           </button>
           <input 
             type="text" 
             placeholder="Type your message..." 
             className="flex-1 h-full bg-transparent border-none outline-none text-sm placeholder:text-tertiary-brand/60"
           />
           <button className="w-10 h-10 bg-primary-brand rounded flex items-center justify-center text-white hover:bg-primary-brand/90 transition-colors cursor-pointer">
             <Send className="w-4 h-4" />
           </button>
         </div>
      </div>
    </div>
  );
}
