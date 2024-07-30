"use client";
import React, { useMemo } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../icons/General/searchIcon";
import { BalanceIcon } from "../../icons/General/balanceIcon";
import { ResultadosIcon } from "../../icons/General/resultsIcon";
import BalanceGeneral from "./balanceSheet";
import EstadoResultados from "./incomeStatement";
import { useTabSelection } from "@/components/hooks/useTabSelection";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import useFinancialStatementsTab from "@/components/hooks/financialManagement/financialStatements/useFinancialStatementsTab";

const MemoizedBalanceGeneral = React.memo(BalanceGeneral);
const MemoizedEstadoResultados = React.memo(EstadoResultados);

const EstadosFinancieros: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("balance");
  const { filterValue, handleFilterChange, clearFilter } =
    useFinancialStatementsTab();

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: "balance",
        title: (
          <div className="flex items-center space-x-2">
            <BalanceIcon />
            <span>Balance General</span>
          </div>
        ),
        content: <MemoizedBalanceGeneral filterValue={filterValue} />,
      },
      {
        key: "resultados",
        title: (
          <div className="flex items-center space-x-2">
            <ResultadosIcon />
            <span>Estado de Resultados</span>
          </div>
        ),
        content: <MemoizedEstadoResultados filterValue={filterValue} />,
      },
    ],
    [filterValue]
  );

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-4">Estados Financieros</h1>
      <div className="flex justify-between items-center">
        <div className="flex-grow">
          <ReusableTabs
            items={tabItems}
            selectedTab={selectedTab}
            onSelectionChange={handleTabChange}
            ariaLabel="Estados Financieros"
          />
        </div>
        <div className="ml-4">
          <Input
            isClearable
            className="w-full max-w-[250px]"
            placeholder="Buscar..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={clearFilter}
            onValueChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(EstadosFinancieros);
