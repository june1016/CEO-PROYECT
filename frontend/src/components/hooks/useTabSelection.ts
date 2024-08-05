import { useState, useCallback } from "react";

export const useTabSelection = (initialTab: string) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const handleTabChange = useCallback((key: string | number) => {
    setSelectedTab(key as string);
  }, []);

  return {
    selectedTab,
    handleTabChange,
  };
};
