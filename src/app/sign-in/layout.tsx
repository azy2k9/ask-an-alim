import React from "react";
import LoadingOverlay from "../_components/LoadingOverlay";

interface LayoutProps {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  className = "",
  loading,
}) => {
  return (
    <>
      {loading && <LoadingOverlay />}
      <main className="md:flex md:justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div
          className={
            "h-screen content-center w-full md:max-w-screen-md px-4 " +
            className
          }
        >
          <h1 className="text-white text-2xl sm:text-[1.75rem] md:text-[2.5rem] font-bold text-center p-4">
            Sign In
          </h1>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
