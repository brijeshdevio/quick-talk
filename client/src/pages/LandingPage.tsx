import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import clsx from "clsx";
import { features, steps } from "@/data";

function Wrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("py-10 sm:py-20", className, "")}>
      <div className={"w-full sm:w-[90%] md:w-[85%] p-3 mx-auto"}>
        {children}
      </div>
    </section>
  );
}

function Header() {
  return (
    <Wrapper className="bg-base-200 !w-full">
      <header className="w-full flex flex-col gap-y-10 lg:flex-row items-center justify-between lg:gap-5">
        <div className="w-full flex flex-col gap-5 leading-normal">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Simple. Fast. <br />
              <strong className="text-primary">Real-time Chat.</strong>
            </h1>
          </div>
          <div>
            <p className="max-w-[600px]">
              Connect with friends and colleagues instantly without the clutter.
              Experience messaging the way it was meant to be.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to={"/signup"} className="btn btn-primary">
              Get started
            </Link>
            <Link to={"#demo"} className="btn btn-ghost">
              View Demo
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig size={20} className="text-success" />
            <span className="text-sm">No credit card required</span>
          </div>
        </div>
        <div className="w-full h-96 lg:h-80 overflow-hidden rounded-2xl">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX2ekyrz0JrGcWbheNLL9OL41X8zO5As6At5wKi4ll74jgMZq4g3PsB2xE5HAaRSDZnh1FlLDj1HBZhAzHsXiHIvPKXyb2xgJnKSnFeCh9hEtxGGj5gvMc4D6JjuqY6I5K2_NCPy3McVBEV38SSkJiBWBS9bU3YRHHGg4_c8RInFhOYfuagGpIQWUPFYRWBRwC_dSC0r47PkNFWHm2oQ5Mpyj8W38EDAr8jdPHi4dGjaYNFJ4XVSTEdGoVf6LWv_NdC6I_x_U9bs8"
            className="w-full  h-96 lg:h-80 object-cover"
            alt="hero"
          />
        </div>
      </header>
    </Wrapper>
  );
}

function Features() {
  return (
    <Wrapper>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-primary">WHY QUICKTALK?</h3>
        <h2 className="text-3xl">Key Features</h2>
        <p>
          Everything you need to communicate effectively, nothing you don't.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {features?.map((feature) => (
          <div
            key={feature.title}
            className="card bg-base-200 border border-primary/10 shadow hover:shadow-2xl"
          >
            <div className="card-body">
              <div className="w-fit p-3 bg-base-300 rounded-2xl">
                {<feature.Icon className="text-primary w-6 h-6" />}
              </div>
              <h2 className="card-title">{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

function Steps() {
  return (
    <Wrapper className="bg-base-200">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl">How It Works</h2>
        <p>
          Get up and running in less than 2 minutes. No complicated setup
          required.
        </p>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 gap-y-5 mt-10">
        <div className="absolute hidden md:block top-7 w-[70%] left-1/2 -translate-x-1/2 border-2 border-primary/10"></div>
        {steps?.map((step) => (
          <div key={step.title} className="flex flex-col gap-1 text-center z-2">
            <div className="w-14 h-14 bg-base-100 rounded-full flex items-center justify-center mx-auto border border-primary/10">
              <step.Icon className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-xl mt-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

function CTA() {
  return (
    <Wrapper>
      <div className="p-10 md:py-20 w-full rounded-2xl text-white bg-blue-600">
        <div className="flex flex-col gap-5 text-center">
          <h2 className="text-3xl sm:text-4xl">
            Ready to start <br />
            your conversation?
          </h2>
          <p className="max-w-[500px] mx-auto">
            Join thousands of users today and experience the difference. Simple,
            fast, and secure messaging for everyone.
          </p>
          <div>
            <Link to={"/signup"} className="btn btn-primary">
              <span>Create Free Account</span>
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 mx-auto">
            <div className="flex items-center gap-2">
              <CircleCheckBig size={20} className="text-success" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheckBig size={20} className="text-success" />
              <span className="text-sm">14-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export function LandingPage() {
  return (
    <>
      <Header />
      <Features />
      <Steps />
      <CTA />
    </>
  );
}
