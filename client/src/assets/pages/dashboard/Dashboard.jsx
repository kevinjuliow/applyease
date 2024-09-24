import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Layout from "../../components/layout/Layout";
import { cn } from "../../lib/utils/Utils";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  // Sidebar links with your paths
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard", // Update with your actual path
      icon: (
        <IconBrandTabler className="text-neutral-700  h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile", // Update with your actual path
      icon: (
        <IconUserBolt className="text-neutral-700  h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings", // Update with your actual path
      icon: (
        <IconSettings className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout", // Update with your actual path
      icon: (
        <IconArrowLeft className="text-neutral-700   h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const Dashboard2 = () => {
    return (
      <div className="flex flex-1 h-full"> {/* Ensure full height */}
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex gap-2">
            {[...new Array(1)].map((_, i) => (
              <div
                key={"first" + i}
                className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="flex gap-2 flex-1">
            {[...new Array(2)].map((_, i) => (
              <div
                key={"second" + i}
                className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 overflow-hidden",
          "h-[90vh] mt-20"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10 h-full"> {/* Full height for the Sidebar */}
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

          </SidebarBody>
        </Sidebar>

        {/* Fix height for Dashboard2 */}
        <div className="flex flex-1 h-full">
          <Dashboard2 />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;


