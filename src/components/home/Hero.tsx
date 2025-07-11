import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// components/Hero.jsx
export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden">
      {/* Left giant text */}
      <h1 className="absolute left-12 md:left-28 top-[77%] md:top-[90%] -translate-y-1/2 text-[10rem] md:text-[14rem] font-extrabold dark:text-white/10 text-black/10 select-none pointer-events-none rotate-[-90deg] origin-left">
        ALGO
      </h1>

      {/* Right giant text */}
      <h1 className="absolute right-12 md:right-28 top-10/12 md:top-[105%] -translate-y-1/2 text-[10rem] md:text-[14rem] font-extrabold dark:text-white/10 text-black/10 select-none pointer-events-none rotate-[90deg] origin-right">
        ARENA
      </h1>

      {/* Main content */}
      <div className="relative z-10 max-md:top-1/12  max-w-3xl mx-auto space-y-3 text-center px-4 pt-32 md:pt-48">
        <Badge
          className="rounded-full px-4 py-1.5 text-sm font-medium"
          variant="default"
        >
          Powered by Jugde0
        </Badge>
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Level Up Your Coding Skills
        </h2>
        <p className="text-lg md:text-xl dark:text-gray-300 text-gray-400  mb-8">
          Solve coding challenges, run your code instantly, and prepare for
          interviews – all in your browser.
        </p>
        <Button className=" font-semibold cursor-pointer py-4 px-8 rounded-lg shadow-md">
          Start Solving
        </Button>
      </div>
    </section>
  );
}
