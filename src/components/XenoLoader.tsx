import React from "react";

const XenoLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#F2F8FF]">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#0F62FE]/30 border-t-[#0F62FE] rounded-full animate-spin"></div>

        <p className="mt-6 text-xl font-semibold tracking-wide text-[#0F62FE] animate-pulse">
          Loading Xeno...
        </p>
      </div>
    </div>
  );
};

export default XenoLoader;
