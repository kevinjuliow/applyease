import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
} from "@tabler/icons-react";
import Layout from "../../components/layout/Layout";
import { cn } from "../../lib/utils/Utils";
import { Outlet } from "react-router-dom";

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
      href: "/dashboard/profile", // Update with your actual path
      icon: (
        <IconUserBolt className="text-neutral-700  h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Applications",
      href: "/dashboard/applications", // Update with your actual path
      icon: <IconArrowLeft className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    }
  ];

  return (
    <Layout>
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 overflow-hidden overflow-y-hidden mt-20"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10 ">
            {" "}
            {/* Full height for the Sidebar */}
            <div className="flex flex-col flex- overflow-x-hidden overflow-y-hidden">
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
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-[90vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
