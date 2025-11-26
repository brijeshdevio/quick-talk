import { useLogin } from "@/hooks/useAuth";
import type { LoginType } from "@/types";
import { MessagesSquare } from "lucide-react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const formFields = [
  {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "Enter your email address",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "***********",
  },
];

export function Login() {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as LoginType);
  };

  return (
    <section className="w-full max-w-[350px]">
      <div>
        <div className="p-3 rounded-2xl bg-base-100 w-fit mx-auto">
          <MessagesSquare size={30} className="text-primary" />
        </div>
        <h2 className="mt-2 text-center text-2xl text-primary">QuickTalk</h2>
      </div>
      <div className="w-full mt-4 card bg-base-100">
        <div className="card-body flex flex-col gap-5">
          <div>
            <h1 className="text-2xl text-center">Welcome back!</h1>
            <p className="opacity-70 text-sm text-center">
              Log in to continue to QuickTalk
            </p>
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {formFields?.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  required
                  className="input input-bordered w-full"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary"
            >
              {isPending ? "Loading..." : " Log In"}
            </button>
          </form>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
