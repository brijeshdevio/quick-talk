import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="flex flex-col items-center pt-20 px-6 max-w-5xl mx-auto w-full">
      {/* Beta Pill */}
      <div className="bg-surface-container-high text-tertiary-brand text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full uppercase mb-8">
        Now in Beta
      </div>

      {/* Hero Text */}
      <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-center leading-tight text-primary-brand mb-6">
        Focus on the <br />
        <span className="text-secondary-brand opacity-90">Conversation.</span>
      </h1>
      
      <p className="text-tertiary-brand text-lg md:text-xl text-center max-w-2xl mx-auto font-light leading-[1.6] mb-12">
        A space where the interface recedes and the dialogue becomes the focus. Designed for clarity, speed, and absolute minimalism.
      </p>

      {/* Hero Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-32">
        <Link to="/register">
        <Button size={"lg"} >
          Register Now
        </Button>
        </Link>
        <Link to="/login">
        <Button variant="outline" size={"lg"} >
          Sign In to Account
        </Button>
        </Link>
      </div>

      {/* Features Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full border-t border-surface-container-high pt-16 mb-24 text-left">
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-widest text-primary-brand uppercase">Purposeful Space</h3>
          <p className="text-tertiary-brand text-sm leading-[1.6]">
            We replaced rigid grid lines with atmospheric depth. A UI that breathes.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-widest text-primary-brand uppercase">Milled Texture</h3>
          <p className="text-tertiary-brand text-sm leading-[1.6]">
            Surfaces respond with tactile softness. Designed like premium stationery.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-widest text-primary-brand uppercase">Silent Architecture</h3>
          <p className="text-tertiary-brand text-sm leading-[1.6]">
            The interface recedes, ensuring your content is the only hero.
          </p>
        </div>
      </div>

      {/* Mockup Showcase */}
      <div className="w-full bg-gradient-to-b from-surface-container-low to-surface rounded-[2rem] md:rounded-[3rem] h-[500px] flex items-end justify-center overflow-hidden mb-16 px-4 md:px-12 pt-16 shadow-[0_20px_40px_-10px_rgba(45,52,53,0.05)] relative group transition-all duration-700">
        <div className="w-[120%] md:w-full max-w-4xl h-[400px] bg-white rounded-t-[1rem] shadow-[0_0px_50px_rgba(0,0,0,0.05)] translate-y-8 group-hover:translate-y-4 transition-transform duration-700 ease-out flex overflow-hidden">
            {/* Left Sidebar Mock */}
            <div className="w-64 bg-surface-container-low h-full border-none hidden md:block">
              <div className="p-6 flex flex-col gap-4 opacity-40">
                <div className="h-4 w-24 bg-tertiary-brand rounded"></div>
                <div className="h-8 w-full bg-surface-container-high rounded-md"></div>
                <div className="h-8 w-full bg-transparent rounded-md"></div>
              </div>
            </div>
            {/* Main Chat Mock */}
            <div className="flex-1 bg-surface h-full relative">
                {/* Header mock */}
                <div className="h-16 w-full bg-surface/80 backdrop-blur-[12px] border-b border-surface-container-high/50 absolute top-0 z-10 flex items-center px-6">
                    <div className="w-32 h-4 bg-tertiary-brand/30 rounded-full"></div>
                </div>
                {/* Content mock */}
                <div className="pt-24 px-8 flex flex-col gap-6">
                     <div className="max-w-md w-full ml-auto h-20 bg-primary-brand rounded-2xl rounded-tr-sm shadow-sm opacity-90 relative">
                      <div className="absolute top-4 left-4 h-3 w-3/4 bg-white/20 rounded"></div>
                      <div className="absolute top-10 left-4 h-3 w-1/2 bg-white/20 rounded"></div>
                     </div>
                     <div className="max-w-md w-full mr-auto h-32 bg-surface-container-lowest rounded-2xl rounded-tl-sm shadow-sm relative">
                      <div className="absolute top-4 left-4 h-3 w-3/4 bg-surface-container-high rounded"></div>
                      <div className="absolute top-10 left-4 h-3 w-5/6 bg-surface-container-high rounded"></div>
                      <div className="absolute top-16 left-4 h-3 w-1/2 bg-surface-container-high rounded"></div>
                     </div>
                     <div className="max-w-md w-full ml-auto h-16 bg-primary-brand rounded-2xl rounded-tr-sm shadow-sm opacity-90 relative">
                      <div className="absolute top-4 left-4 h-3 w-2/3 bg-white/20 rounded"></div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
