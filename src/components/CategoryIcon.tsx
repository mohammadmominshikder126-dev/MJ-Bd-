import React from "react";
import { LayoutGrid } from "lucide-react";
import { CategoryName } from "../types/store";

interface CategoryIconProps {
  category: CategoryName;
  className?: string;
}

const CATEGORY_IMAGE_MAP: Record<Exclude<CategoryName, "All">, string> = {
  Mobiles: "/assets/design/cat_mobiles.png",
  Laptops: "/assets/design/cat_laptops.png",
  Accessories: "/assets/design/cat_accessories.png",
  Fashion: "/assets/design/cat_fashion.png",
  "Home & Living": "/assets/design/cat_home.png",
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = "w-10 h-10",
}) => {
  if (category === "All") {
    return <LayoutGrid className={className} strokeWidth={1.9} />;
  }

  return (
    <img
      src={CATEGORY_IMAGE_MAP[category]}
      alt={category}
      className={`${className} object-contain mix-blend-multiply select-none`}
      draggable={false}
    />
  );
};
