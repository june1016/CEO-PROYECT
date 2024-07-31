import React from "react";

interface IconProps {
  className?: string;
}

export const ProductIcon: React.FC<IconProps> = ({ className }) => {
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
        d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM6 9H18V11H6V9ZM6 13H12V15H6V13Z"
        fill="#969696"
      />
    </svg>
  );
};
