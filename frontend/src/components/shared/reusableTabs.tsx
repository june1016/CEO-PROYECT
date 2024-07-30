"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export interface TabItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface ReusableTabsProps {
  items: TabItem[];
  selectedTab: string;
  onSelectionChange: (key: string) => void;
  ariaLabel: string;
}

export const ReusableTabs: React.FC<ReusableTabsProps> = ({
  items,
  selectedTab,
  onSelectionChange,
  ariaLabel,
}) => {
  return (
    <Tabs
      aria-label={ariaLabel}
      selectedKey={selectedTab}
      onSelectionChange={(key) => onSelectionChange(key as string)}
    >
      {items.map((item) => (
        <Tab key={item.key} title={item.title} />
      ))}
    </Tabs>
  );
};
