import Layout from "../../components/layout/Layout";
import About from "./About";
import GlobeLanding from "./GlobeLanding";
import Welcome from "./Welcome";
import { TracingBeam } from "../../components/ui/Tracing-beam";

const Landing = () => {
  return (
    <div className="w-full bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
      <TracingBeam className="px-6">
        <Layout>
          <Welcome />
          <GlobeLanding />
          <About />
        </Layout>
      </TracingBeam>
    </div>
  );
};

export default Landing;
