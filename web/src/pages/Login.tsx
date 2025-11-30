import { Link } from "react-router-dom";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { LoginForm } from "@/features/auth/forms/LoginForm";

export function Login() {
  return (
    <section className="w-full max-w-[350px]">
      <AuthHeader />
      <div className="w-full mt-4 card bg-base-100">
        <div className="card-body flex flex-col gap-5">
          <div>
            <h1 className="text-2xl text-center">Welcome back!</h1>
            <p className="opacity-70 text-sm text-center">
              Log in to continue to QuickTalk
            </p>
          </div>
          <LoginForm />
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
