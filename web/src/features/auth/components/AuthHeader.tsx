import { Link } from "react-router-dom";
import { MessagesSquare } from "lucide-react";

export function AuthHeader() {
  return (
    <div>
      <div className="p-3 rounded-2xl bg-base-100 w-fit mx-auto">
        <Link to={"/"}>
          <MessagesSquare size={30} className="text-primary" />
        </Link>
      </div>
      <h2 className="mt-2 text-center text-2xl text-primary">QuickTalk</h2>
    </div>
  );
}
