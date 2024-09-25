import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
  collapsed?: boolean;
}

export const SidebarMenu = ({ title, children, collapsed }: Props) => {
  if (collapsed) return <>{children}</>;

  return (
    <div className="flex flex-col">
      <span className="text-xs font-normal text-foreground/70 mb-2">
        {title}
      </span>
      {children}
    </div>
  );
};
