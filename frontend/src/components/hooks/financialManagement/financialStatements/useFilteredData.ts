import { useMemo } from "react";

export const useFilteredData = <T extends Record<string, any>>(
  data: T[],
  filterValue: string,
  filterKey: keyof T
) => {
  return useMemo(() => {
    return data.filter((item) =>
      item[filterKey]
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
  }, [data, filterValue, filterKey]);
};
