"use client";
import Image from "next/image";
import { useState } from "react";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { Text } from "../atoms/text";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const getDisplayText = () => {
    if (!pathname) return "";
    const segments = pathname.split("/");
    const path = segments[2] || "";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="bg-white min-h-24 border-b border-outline-platinumGray flex flex-row items-center justify-between px-8 lg:px-16 ">
      <div className="text-base text-typography-lightGrey font-bold">
        <Text className="hidden md:flex">{getDisplayText()}</Text>
        <Image
          src={`/assets/images/logo.png`}
          width={24}
          height={24}
          alt="Skill Level"
          unoptimized
          className="w-6 h-6 cursor-pointer flex md:hidden"
          onClick={toggleSidebar}
        />
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed top-0 right-0 h-screen w-[25vw] bg-[#3D505C80] z-40"
            onClick={toggleSidebar}
          ></div>
          <div className="fixed top-0 left-0 h-screen w-[75vw] bg-white flex items-center justify-center z-50">
            <Sidebar expandOnly={true} closeSidebar={toggleSidebar} />
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;
