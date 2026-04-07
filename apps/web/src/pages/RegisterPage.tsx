import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4 text-primary-brand">
      {/* Top Branding */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">QuickTalk</h1>
        <p className="text-tertiary-brand text-sm">Design your digital ecosystem</p>
      </div>

      {/* Card */}
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(45,52,53,0.08)] mb-8 border border-surface-container-low/50">
        <h2 className="text-xl font-bold mb-2">Create an account</h2>
        <p className="text-tertiary-brand text-sm mb-8">Enter your details to get started</p>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-tertiary-brand/80">Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-surface-container-low h-12 px-4 rounded-lg outline-none text-sm placeholder:text-tertiary-brand/50 transition-all focus:bg-surface-container-high" 
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-tertiary-brand/80">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full bg-surface-container-low h-12 px-4 rounded-lg outline-none text-sm placeholder:text-tertiary-brand/50 transition-all focus:bg-surface-container-high" 
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-widest uppercase text-tertiary-brand/80">Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-surface-container-low h-12 pl-4 pr-12 rounded-lg outline-none text-sm placeholder:text-tertiary-brand tracking-widest transition-all focus:bg-surface-container-high" 
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary-brand hover:text-primary-brand transition-colors cursor-pointer">
                <Eye size={18} strokeWidth={2.5} />
              </button>
            </div>
            <p className="text-[10px] text-tertiary-brand mt-1">Must be at least 8 characters long.</p>
          </div>

          {/* Register Submit */}
          <Button type="submit" className="w-full bg-primary-brand text-white border-none rounded-lg h-12 font-medium hover:bg-primary-brand/90 mt-2 shadow-sm text-sm">
            Register
          </Button>

          {/* Separator */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-x-0 h-[1px] bg-surface-container-high"></div>
            <span className="relative bg-surface-container-lowest px-4 text-[9px] text-tertiary-brand font-bold uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          {/* Social Auth */}
          <div className="flex gap-4">
            <Button variant="outline" type="button" className="flex-1 bg-surface-container-low border-none h-11 hover:bg-surface-container-high text-primary-brand font-semibold text-xs gap-2 rounded-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
           
          </div>

          <div className="text-center mt-2 text-xs text-tertiary-brand">
            Already have an account? <Link to="/login" className="font-bold text-primary-brand hover:underline">Login</Link>
          </div>
        </form>
      </div>

      <div className="text-center text-[11px] text-tertiary-brand font-medium">
        By clicking Register, you agree to our <Link to="/terms" className="underline hover:text-primary-brand">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-primary-brand">Privacy Policy</Link>.
      </div>
    </div>
  );
}
