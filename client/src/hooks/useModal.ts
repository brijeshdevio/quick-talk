import { useSearchParams } from "react-router-dom";
import { modals } from "@/constants";

export function useModal() {
  const [_, setSearchParams] = useSearchParams();

  function modal(name: keyof typeof modals) {
    return () => {
      setSearchParams({ modal: modals[name] });
    };
  }

  return { modal };
}
