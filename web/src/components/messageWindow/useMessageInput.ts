import { useRef, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { WS_EVENTS } from "@/constants";
import { useEmit } from "@/hooks/useEmit";

export function useMessageInput() {
  const { chatID } = useParams();
  const ref = useRef<ReturnType<typeof setTimeout>>(null);
  const emit = useEmit;

  const debounce = (delay = 2000) => {
    const payload = { chatID, isActive: true };
    if (ref.current) {
      clearTimeout(ref.current);
    } else {
      emit(WS_EVENTS.MSG_TYPING, payload);
      console.log("typing");
    }

    ref.current = setTimeout(() => {
      payload.isActive = false;
      emit(WS_EVENTS.MSG_TYPING, payload);
      console.log("not typing");
      ref.current = null;
    }, delay);
  };

  const onChange = () => {
    debounce();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get("message");
    const payload = { chatID, content: message };
    emit(WS_EVENTS.MSG_SEND, payload);
    e.currentTarget.reset();
  };

  return { handleSubmit, onChange };
}
