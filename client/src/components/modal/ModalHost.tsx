import { useSearchParams } from "react-router-dom";
import { SearchUserModal } from "./SearchUserModal";
import { modals } from "@/constants";

export function ModalHost() {
  const [query, setSearchParams] = useSearchParams();

  if (!Object.values(modals).includes(query.get("modal") || "")) return null;

  const handleCloseModal = () => {
    setSearchParams({});
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center p-3 bg-base-300/80 z-[9999]"
      onClick={handleCloseModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {query.get("modal") === modals.SearchUser && <SearchUserModal />}
      </div>
    </div>
  );
}
