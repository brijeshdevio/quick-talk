import { Link } from "react-router-dom";
import { ArrowRight, Slack } from "lucide-react";
import { InputField } from "@/components";

const formFields = [
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeholder: "e.g. John Doe",
  },
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

export function SignupPage() {
  return (
    <main className="w-full h-screen flex items-center justify-center p-3">
      <section className="flex flex-col gap-3 w-[350px]">
        <div className="w-fit p-2 flex items-center justify-center mx-auto bg-primary rounded-xl">
          <Slack size={25} className="text-white" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl mb-2">Join the Conversation</h2>
          <p className="text-sm">
            Create your account to start collaborating with your team instantly.
            No credit card required.
          </p>
        </div>
        <form className="flex flex-col gap-2">
          {formFields.map((field) => (
            <InputField key={field.name} {...field} />
          ))}
          <button type="submit" className="btn btn-primary">
            <span>Create Account</span>
            <ArrowRight size={20} />
          </button>
        </form>
        <div>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
