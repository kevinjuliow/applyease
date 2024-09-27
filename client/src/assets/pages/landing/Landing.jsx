// import Layout from "../../components/layout/Layout";
import About from "./About";
import GlobeLanding from "./GlobeLanding";
import Welcome from "./Welcome";
import { TracingBeam } from "../../components/ui/Tracing-beam";
import { GridLanding } from "./GridLanding";

const Landing = () => {
  return (
    <div className="w-full bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
      <TracingBeam className="px-0 md:px-6">
        <div className="flex items-center justify-center relative max-w-screen-lg mx-auto flex-col w-full">
          <Welcome />
          <GlobeLanding />
          <GridLanding/>
          <About />
        </div>
      </TracingBeam>
    </div>
  );
};

export default Landing;
