import { useState, useCallback } from "react";

const useMarketTab = () => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("productos");

  const handleTabChange = useCallback((key: string | number) => {
    setSelectedTab(String(key));
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const clearFilter = useCallback(() => {
    setFilterValue("");
  }, []);

  return {
    filterValue,
    selectedTab,
    handleTabChange,
    handleFilterChange,
    clearFilter,
  };
};

export default useMarketTab;
