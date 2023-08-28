interface IconProps {
  size?: number,
  color?: string,
}

const DEFAULT_ICON_PROPS = {
  size: 24
}

const SearchIcon: React.FC<IconProps> = (props) => {
  const {size, color} = {...DEFAULT_ICON_PROPS, ...props};
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color ?? "currentColor"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
};

export default SearchIcon;
