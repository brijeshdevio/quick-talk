import { useEffect } from "react";
import { Search } from "lucide-react";
// import { contacts } from "@/data";
import { useGetUsers } from "@/queries/user.queries";
import { useCreateChat } from "@/queries/chat.queries";

interface UserItemProps {
  _id: string;
  avatar: string;
  name: string;
}

function UserItem({ _id, name, avatar }: UserItemProps) {
  const { mutate, isPending } = useCreateChat();

  const handleClick = () => {
    mutate({ member: _id });
  };

  return (
    <li>
      <button
        className="btn w-full justify-start btn-lg"
        disabled={isPending}
        onClick={handleClick}
      >
        <div className="avatar avatar-placeholder py-2">
          <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full">
            {avatar ? <img src={avatar} alt="" /> : <span>{name?.[0]}</span>}
          </div>
        </div>
        <div>
          <h3 className="text-sm">{name}</h3>
        </div>
      </button>
    </li>
  );
}

function Users({ users = [] }: { users: UserItemProps[] }) {
  return (
    <div>
      <ul className="max-h-[400px] overflow-y-scroll">
        {users?.map((user) => (
          <>
            <UserItem key={"user_" + user._id} {...user} />
          </>
        ))}
      </ul>
    </div>
  );
}

export function SearchUserModal() {
  const { data, refetch, isPending } = useGetUsers();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="card w-96 min-h-40 bg-base-100 border border-primary/10 shadow-2xl">
      <div className="card-body">
        <form>
          <label className="input w-full">
            <Search size={20} />
            <input type="search" placeholder="Search email or username" />
          </label>
        </form>
        {isPending && (
          <>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <span className="loading loading-spinner"></span>
                <p className="opacity-70 mt-2">Fetching users...</p>
              </div>
            </div>
          </>
        )}

        {!isPending && <Users users={data?.users} />}
      </div>
    </div>
  );
}
