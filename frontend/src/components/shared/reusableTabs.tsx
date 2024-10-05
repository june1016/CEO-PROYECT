// src/components/shared/reusableTabs.tsx
"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div>
      <Tabs
        aria-label={ariaLabel}
        selectedKey={selectedTab}
        onSelectionChange={(key) => onSelectionChange(key as string)}
        color="primary"
        variant="underlined"
      >
        {items.map((item) => (
          <Tab key={item.key} title={item.title} />
        ))}
      </Tabs>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {items.find((item) => item.key === selectedTab)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
