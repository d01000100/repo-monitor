import { IconProps } from "./utils";

const CommitIcon : React.FC<IconProps> = ({size}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "inline-block"
      }}
    >
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="1.05" y1="12" x2="7" y2="12"></line>
      <line x1="17.01" y1="12" x2="22.96" y2="12"></line>
    </svg>
  );
};

export default CommitIcon;
