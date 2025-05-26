"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { Text } from "../atoms/text";
import { LogOut } from "lucide-react";

interface SidebarProps {
  isExpanded?: boolean;
  toggleSidebar?: () => void;
  setIsExpanded?: (expanded: boolean) => void;
  expandOnly?: boolean;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  expandOnly = false,
  closeSidebar,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  const toggleSidebar = () => setSidebarExpanded(!isSidebarExpanded);

  const handleLogout = () => {
    console.log("User logged out"); // Debugging (Remove in production)
    router.push("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "/assets/images/logo.png",
      activeIcon: "/assets/images/menuActive.png",
      path: "/dashboard",
    },
    {
      name: "Parcel For",
      icon: "/assets/images/usersInactive.png",
      activeIcon: "/assets/images/usersActive.png",
      path: "/dataTable",
    },
  ];

  useEffect(() => {
    if (expandOnly) {
      setSidebarExpanded(true);
      return;
    }
    const handleResize = () => setSidebarExpanded(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [expandOnly]);

  return (
    <div
      className={`transition-all duration-300 ${
        !expandOnly &&
        (isSidebarExpanded
          ? "w-1/5 min-w-[300px] max-w-[310px]"
          : "w-[8%] min-w-[88px] max-w-[88px]")
      } ${expandOnly ? "block w-screen" : "hidden md:block"} h-screen`}
    >
      <aside className="w-full bg-white h-full shadow-md p-4 flex flex-col">
        <div
          className={`w-full flex justify-between items-center ${
            isSidebarExpanded ? "p-4" : "p-2"
          }`}
        >
          <div className="flex justify-center items-center self-center">
            {expandOnly || isSidebarExpanded ? (
              <Image
                src="/assets/images/OyaverseLogo.png"
                width={65}
                height={40}
                alt="Logo"
                unoptimized
                className="w-16 h-16"
              />
            ) : (
              <div
                onClick={toggleSidebar}
                className="relative w-12 h-12 cursor-pointer group -ml-1"
              >
                <Image
                  src="/assets/images/OyaverseLogo.png"
                  width={48}
                  height={48}
                  alt="Logo"
                  unoptimized
                  className="w-12 h-12 transition-opacity duration-300 group-hover:opacity-0"
                />
                <div className="w-12 h-12 bg-background-aliceBlue rounded-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Image
                    src="/assets/images/OyaverseLogo.png"
                    width={24}
                    height={24}
                    alt="Logo"
                    unoptimized
                    className="w-6 h-6"
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="cursor-pointer flex"
            onClick={expandOnly ? closeSidebar : toggleSidebar}
          >
            <AiOutlineClose
              className="w-10 h-5 text-gray-500 "
              aria-label="Close Icon"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-grow pt-10">
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <div
                    onClick={() => router.push(item.path)}
                    className={`flex items-center space-x-3 px-5 py-3 rounded-[16px] cursor-pointer w-full hover:bg-background-aliceBlue ${
                      pathname === item.path
                        ? "bg-background-aliceBlue"
                        : "bg-transparent"
                    } ${
                      isSidebarExpanded ? "justify-start" : "justify-center"
                    }`}
                  >
                    <Image
                      src={pathname === item.path ? item.activeIcon : item.icon}
                      width={24}
                      height={24}
                      alt={item.name}
                      className="w-6 h-6"
                      unoptimized
                    />
                    {isSidebarExpanded && (
                      <Text className="font-bold text-lg text-typography-darkBlue">
                        {item.name}
                      </Text>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-auto">
          <div
            onClick={handleLogout}
            className="flex items-center space-x-3 px-5 py-3 rounded-[16px] cursor-pointer w-full hover:bg-background-aliceBlue"
          >
            <LogOut className="h-5 w-5 text-red-500" />
            {isSidebarExpanded && (
              <Text className="font-bold text-lg text-red-500">Logout</Text>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
