import { Link } from "react-router-dom";
import { features } from "@/data";

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="w-full min-h-[350px] h-[calc(100vh-260px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black font-bricolage-grotesque">
            Connect Instantly, <br /> Collaborate Seamlessly
          </h1>
          <p className="mt-3 opacity-70">
            The ultimate chat application designed to bring your <br /> team
            together, no matter where they are.
          </p>
          <div className="flex items-center justify-center gap-5 mt-5">
            <Link to={"/c"} className="btn btn-primary">
              Get Started
            </Link>
            <Link to={"/login"} className="btn btn-ghost">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full flex flex-col gap-10  py-20">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-2xl ">
            Everything You Need in a Modern Chat App
          </h2>
          <p className="opacity-70">
            Discover the powerful features that make our chat application the
            perfect choice for terms of all sizes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features?.map((feature, index) => (
            <div key={index} className="card bg-base-200">
              <div className="card-body flex flex-col gap-1">
                <feature.Icon size={25} className="text-primary" />
                <h2 className="card-title mt-2">{feature.title}</h2>
                <p className="opacity-70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits  Section */}
      <section className="w-full flex flex-col gap-10  py-20">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-2xl ">Bringing Your Team Together</h2>
          <p className="opacity-70">
            Our application is designed from the ground up to foster
            collaboration and streamline communication. <br /> With an intuitive
            interface and powerful tools, you can focus on what matters most:
            your work.
          </p>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="w-full flex flex-col gap-5 px-3 py-20 bg-blue-600 rounded-2xl">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-2xl ">Ready to Start the Conversation?</h2>
          <p className="opacity-70">
            Join thousands of teams who are already collaborating more
            effectively.
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link to={"/register"} className="btn btn-primary">
            Signup for Free
          </Link>
          <Link to={"/login"} className="btn btn-ghost">
            Login
          </Link>
        </div>
      </section>
    </>
  );
}
