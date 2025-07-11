import { Badge } from "../ui/badge";
import { Code, Brain, BarChart3,} from "lucide-react";
const features = [
  {
    title: "Run Code Instantly",
    description:
      "Execute code in 20+ programming languages with real-time output using the Judge0 API.",
    icon: <Code className="w-10 h-10" />,
  },
  {
    title: "Sharpen Problem Solving",
    description:
      "Solve algorithmic challenges to improve your logic and coding skills from beginner to advanced levels.",
    icon: <Brain className="w-10 h-10" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Get visual insights into your submissions, success rate, and problem-solving journey.",
    icon: <BarChart3 className="w-10 h-10" />,
  },
];
const Features = () => {
  return (
    <div className=" bg-gray-50 px-2 min-h-screen md:py-18 py-6 dark:bg-black/70 flex flex-col items-center space-y-4">
      <Badge
        className="rounded-full px-4 py-1.5 text-sm font-medium"
        variant={"default"}
      >
        Features
      </Badge>
      <h1 className=" md:text-7xl text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        Core Features at a Glance
      </h1>
      <p className=" text text-lg text-center md:text-xl dark:text-gray-300 text-gray-400  mb-8">
        Built for speed. Designed for growth. Loved by problem solvers.
      </p>
   <div className=" max-w-[100rem] mx-auto">
     <div className=" w-full grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-4">
  {features.map((feature, i) => (
    <div
      key={i}
      className="md:space-y-4 space-y-3 border rounded-xl px-6 py-3"
    >
      <div className="flex justify-center items-center">{feature.icon}</div>
      <h1 className="text-center md:text-xl text-base font-semibold">
        {feature.title}
      </h1>
      <p className="md:text-base text-center text-sm dark:text-gray-300 text-gray-400">
        {feature.description}
      </p>
    </div>
  ))}
</div>
   </div>

    </div>
  );
};

export default Features;
