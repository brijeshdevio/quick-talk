import { useLogin } from "../hooks/useLogin";

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

export function LoginForm() {
  const { handleSubmit, isPending } = useLogin();

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
            required
            className="input input-bordered w-full"
          />
        </div>
      ))}
      <button type="submit" disabled={isPending} className="btn btn-primary">
        {isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
