import React from "react";

interface BrandMarkProps {
  showSubtitle?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ showSubtitle = true }) => {
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <img
        src="/assets/design/logo_bag.png"
        alt="MJ BD LAB Logo"
        className="w-11 h-11 object-contain shrink-0"
      />

      <div className="flex flex-col leading-none">
        <span className="font-display font-extrabold text-[22px] sm:text-2xl tracking-tight text-white">
          MJ <span className="text-[#ffdf18]">BD LAB</span>
        </span>
        {showSubtitle && (
          <span className="text-[11px] sm:text-xs text-purple-100/90 font-medium mt-1 tracking-normal">
            Shop Smart, Live Better
          </span>
        )}
      </div>
    </div>
  );
};
