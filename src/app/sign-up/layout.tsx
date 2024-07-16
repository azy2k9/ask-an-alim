import React from "react";
import LoadingOverlay from "../_components/LoadingOverlay";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      {false && <LoadingOverlay />}
      <main className="md:flex md:justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div
          className={"h-screen content-center w-full md:max-w-screen-md px-4"}
        >
          <h1 className="text-white text-2xl sm:text-[1.75rem] md:text-[2.5rem] font-bold text-center p-4">
            Sign Out
          </h1>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
