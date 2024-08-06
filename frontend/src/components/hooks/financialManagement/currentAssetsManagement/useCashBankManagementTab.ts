import { useState, useCallback } from "react";

const useCashBankManagementTab = () => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const clearFilter = useCallback(() => {
    setFilterValue("");
  }, []);

  return {
    filterValue,
    handleFilterChange,
    clearFilter,
  };
};

export default useCashBankManagementTab;
