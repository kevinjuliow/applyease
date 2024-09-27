import { MacbookScroll } from "../../components/ui/Macbook-scroll";
import Image from "../../images/dashboardScreen.png"

const MacbookLanding = () => {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] w-full ">
      <MacbookScroll
        title={
          <span>
            Apply Job Easily Online<br /> <p className="text-gray-400 text-lg font-medium">ApplyEase</p>
          </span>
        }
        src={Image}
        showGradient={false}
      />
    </div>
  );
}

export default MacbookLanding