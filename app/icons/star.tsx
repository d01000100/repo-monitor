import React from "react";
import { IconProps, DEFAULT_ICON_PROPS } from "./utils";

const StarIcon: React.FC<IconProps> = (props) => {
  const { color, size } = { ...DEFAULT_ICON_PROPS, ...props };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
};

export default StarIcon;