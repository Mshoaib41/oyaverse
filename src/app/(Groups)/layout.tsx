import Navbar from "@app/features/common/components/molecules/Navbar";
import Sidebar from "@app/features/common/components/molecules/Sidebar";
import React from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-full flex flex-row w-full">
      <Sidebar />
      <div className="flex-1 z-50 flex flex-col border-l border-outline-platinumGray h-screen w-full md:w-auto">
        <Navbar />
        <main className="flex-1 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}
