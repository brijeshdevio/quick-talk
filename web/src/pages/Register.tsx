import { Link } from "react-router-dom";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { RegisterForm } from "@/features/auth/forms/RegisterForm";

export function Register() {
  return (
    <section className="w-full max-w-[350px]">
      <AuthHeader />
      <div className="w-full mt-4 card bg-base-100">
        <div className="card-body flex flex-col gap-5">
          <div>
            <h1 className="text-2xl text-center">Create your account</h1>
            <p className="opacity-70 text-sm text-center">
              Start collaborating with your team
            </p>
          </div>
          <RegisterForm />
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
