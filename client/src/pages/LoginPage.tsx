import { Link } from "react-router-dom";
import { ArrowRight, Slack } from "lucide-react";
import { InputField } from "@/components";
import { useLogin } from "@/queries/auth.queries";
import type { FormEvent } from "react";
import type { LoginForm } from "@/types";

const formFields = [
  {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "e.g. name@domain.com",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "••••••••",
  },
];

export function LoginPage() {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as LoginForm);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center p-3">
      <section className="flex flex-col gap-3 w-[350px]">
        <div className="w-fit p-2 flex items-center justify-center mx-auto bg-primary rounded-xl">
          <Slack size={25} className="text-white" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl mb-2">Welcome back!</h2>
          <p className="text-sm">Connect with your team and start chatting.</p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <InputField key={field.name} {...field} required />
          ))}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span>
              </>
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
        <div>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
