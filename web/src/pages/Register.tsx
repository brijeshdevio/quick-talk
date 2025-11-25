import { useRegister } from "@/hooks/useAuth";
import type { RegisterType } from "@/types";
import { MessagesSquare } from "lucide-react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const formFields = [
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeholder: "Enter your full name",
  },
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

export function Register() {
  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    mutate(data as unknown as RegisterType);
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
            <h1 className="text-2xl text-center">Create your account</h1>
            <p className="opacity-70 text-sm text-center">
              Start collaborating with your team
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
                  className="input input-bordered w-full"
                  required
                />
              </div>
            ))}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Create Account"}
            </button>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
