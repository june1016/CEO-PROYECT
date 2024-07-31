import React from "react";

interface IconProps {
  className?: string;
}

export const InitialInventoryIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-default-400"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19ZM6 7H18V9H6V7ZM6 11H18V13H6V11ZM6 15H12V17H6V15Z"
        fill="#969696"
      />
      <path
        className="fill-default-400"
        d="M19 17H15V13H19V17ZM17 14V16H18V14H17Z"
        fill="#969696"
      />
    </svg>
  );
};
