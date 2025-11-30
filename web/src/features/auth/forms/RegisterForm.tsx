import { useRegister } from "../hooks/useRegister";

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

export function RegisterForm() {
  const { handleSubmit, isPending } = useRegister();

  return (
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
      <button type="submit" disabled={isPending} className="btn btn-primary">
        {isPending ? "Loading..." : "Register"}
      </button>
    </form>
  );
}
