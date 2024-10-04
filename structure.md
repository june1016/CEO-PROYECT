```
└── .git
├── backend
│   ├── app_ceo
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   │   ├── __init__.py
│   │   │   └── __pycache__
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   ├── db.sqlite3
│   ├── manage.py
│   ├── project_ceo
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── __init__.py
│   │   └── __pycache__
│   ├── requirements.txt
│   └── venv
├── frontend
│   ├── .eslintrc.json
│   ├── .gitignore
│   └── .next
│   ├── LICENSE
│   ├── middleware.ts
│   ├── next-env.d.ts
│   ├── next.config.js
│   └── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── dark.png
│   │   ├── favicon.ico
│   │   ├── light.png
│   │   └── vercel.svg
│   ├── README.md
│   ├── src
│   │   ├── actions
│   │   │   └── auth.action.ts
│   │   ├── app
│   │   │   ├── (app)
│   │   │   │   ├── financialManagement
│   │   │   │   │   ├── assetLiabilityManagement
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── BankCreditSystem
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── cashFlowProjections
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── financialStatements
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── humanResources
│   │   │   │   │   ├── payrollManagement
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── recruitmentAndDismissal
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── market
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── (auth)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── login
│   │   │   │   │   └── page.tsx
│   │   │   │   └── register
│   │   │   │       └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── providers.tsx
│   │   ├── components
│   │   │   ├── auth
│   │   │   │   ├── authLayout.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   └── register.tsx
│   │   │   ├── context
│   │   │   │   └── test.tsx
│   │   │   ├── financialManagement
│   │   │   │   ├── assetLiabilityManagement
│   │   │   │   │   ├── accountsReceivablePayable
│   │   │   │   │   │   ├── AccountsDistributionChart.tsx
│   │   │   │   │   │   ├── accountsManagementPanel.tsx
│   │   │   │   │   │   ├── accountsTable.tsx
│   │   │   │   │   │   ├── FinancialSummary.tsx
│   │   │   │   │   │   └── PaymentRecordForm.tsx
│   │   │   │   │   ├── assetLiabilityManagementPanel.tsx
│   │   │   │   │   └── currentAssetsManagement
│   │   │   │   │       ├── cashBankChart.tsx
│   │   │   │   │       ├── cashBankManagementTabs.tsx
│   │   │   │   │       ├── cashBankTable.tsx
│   │   │   │   │       └── transferForm.tsx
│   │   │   │   ├── bankCreditSystem
│   │   │   │   │   ├── bankCreditPanel.tsx
│   │   │   │   │   ├── loanApplication
│   │   │   │   │   │   ├── LoanApplicationForm.tsx
│   │   │   │   │   │   ├── LoanApplicationPanel.tsx
│   │   │   │   │   │   ├── LoanCalculator.tsx
│   │   │   │   │   │   └── LoanProjectionChart.tsx
│   │   │   │   │   └── paymentInterestManagement
│   │   │   │   │       ├── ActiveLoansTable.tsx
│   │   │   │   │       ├── InterestRateChart.tsx
│   │   │   │   │       ├── PaymentInterestManagementPanel.tsx
│   │   │   │   │       ├── PaymentScheduleForm.tsx
│   │   │   │   │       └── UpcomingPaymentsAlert.tsx
│   │   │   │   ├── cashFlowProjections
│   │   │   │   │   ├── cashFlowProjectionsPanel.tsx
│   │   │   │   │   ├── LiquidityAnalysis
│   │   │   │   │   │   ├── CashFlowStatement.tsx
│   │   │   │   │   │   ├── LiquidityAnalysisPanel.tsx
│   │   │   │   │   │   ├── LiquidityRatiosChart.tsx
│   │   │   │   │   │   └── LiquidityRatiosTable.tsx
│   │   │   │   │   └── MonthlyProjectionIE
│   │   │   │   │       ├── MonthlyProjectionIEPanel.tsx
│   │   │   │   │       ├── ProjectionChart.tsx
│   │   │   │   │       ├── ProjectionControlPanel.tsx
│   │   │   │   │       └── ProjectionTable.tsx
│   │   │   │   └── financialStatements
│   │   │   │       ├── balanceChart.tsx
│   │   │   │       ├── balanceSheet.tsx
│   │   │   │       ├── financialStatementsTabs.tsx
│   │   │   │       ├── incomeStatement.tsx
│   │   │   │       ├── resultsChart.tsx
│   │   │   │       └── summaryCard.tsx
│   │   │   ├── home
│   │   │   │   ├── cardAgents.tsx
│   │   │   │   ├── cardBalance1.tsx
│   │   │   │   ├── cardBalance2.tsx
│   │   │   │   ├── cardBalance3.tsx
│   │   │   │   ├── cardTransactions.tsx
│   │   │   │   ├── content.tsx
│   │   │   │   ├── renderCell.tsx
│   │   │   │   ├── steam.tsx
│   │   │   │   └── table.tsx
│   │   │   ├── humanResources
│   │   │   │   ├── payrollManagement
│   │   │   │   │   ├── employeeTable.tsx
│   │   │   │   │   ├── payrollDashboard.tsx
│   │   │   │   │   ├── payrollManagementTabs.tsx
│   │   │   │   │   └── salaryAdjustForm.tsx
│   │   │   │   └── recruitmentAndDismissal
│   │   │   │       ├── employeeTable.tsx
│   │   │   │       ├── hiringForm.tsx
│   │   │   │       ├── hrDashboard.tsx
│   │   │   │       └── recruitmentAndDismissalTabs.tsx
│   │   │   ├── icons
│   │   │   │   ├── accounts
│   │   │   │   │   ├── dotsIcon.tsx
│   │   │   │   │   ├── exportIcon.tsx
│   │   │   │   │   ├── infoIcon.tsx
│   │   │   │   │   └── trashIcon.tsx
│   │   │   │   ├── acmeIcon.tsx
│   │   │   │   ├── acmelogo.tsx
│   │   │   │   ├── breadcrumb
│   │   │   │   │   ├── houseIcon.tsx
│   │   │   │   │   └── usersIcon.tsx
│   │   │   │   ├── community.tsx
│   │   │   │   ├── General
│   │   │   │   │   ├── balanceIcon.tsx
│   │   │   │   │   ├── chartIcon.tsx
│   │   │   │   │   ├── debtIcon.tsx
│   │   │   │   │   ├── equityIcon.tsx
│   │   │   │   │   ├── expenseIcon.tsx
│   │   │   │   │   ├── homeIcon.tsx
│   │   │   │   │   ├── incomeIcon.tsx
│   │   │   │   │   ├── initialInventoryIcon.tsx
│   │   │   │   │   ├── moneyIcon.tsx
│   │   │   │   │   ├── percentIcon.tsx
│   │   │   │   │   ├── productIcon.tsx
│   │   │   │   │   ├── resultsIcon.tsx
│   │   │   │   │   ├── searchIcon.tsx
│   │   │   │   │   └── targetIcon.tsx
│   │   │   │   ├── navbar
│   │   │   │   │   ├── feedbackIcon.tsx
│   │   │   │   │   ├── notificationicon.tsx
│   │   │   │   │   └── supportIcon.tsx
│   │   │   │   ├── searchicon.tsx
│   │   │   │   ├── sidebar
│   │   │   │   │   ├── accountsIcon.tsx
│   │   │   │   │   ├── balanceIcon.tsx
│   │   │   │   │   ├── bottomIcon.tsx
│   │   │   │   │   ├── budgetIcon.tsx
│   │   │   │   │   ├── changelogIcon.tsx
│   │   │   │   │   ├── chevronUpIcon.tsx
│   │   │   │   │   ├── costIcon.tsx
│   │   │   │   │   ├── customersIcon.tsx
│   │   │   │   │   ├── devIcon.tsx
│   │   │   │   │   ├── filterIcon.tsx
│   │   │   │   │   ├── financeIcon.tsx
│   │   │   │   │   ├── homeIcon.tsx
│   │   │   │   │   ├── hrIcon.tsx
│   │   │   │   │   ├── inventoryIcon.tsx
│   │   │   │   │   ├── marketIcon.tsx
│   │   │   │   │   ├── objectivesIcon.tsx
│   │   │   │   │   ├── paymentsIcon.tsx
│   │   │   │   │   ├── productionIcon.tsx
│   │   │   │   │   ├── productsIcon.tsx
│   │   │   │   │   ├── reportsIcon.tsx
│   │   │   │   │   ├── salesIcon.tsx
│   │   │   │   │   ├── settingsIcon.tsx
│   │   │   │   │   └── viewIcon.tsx
│   │   │   │   └── table
│   │   │   │       ├── deleteIcon.tsx
│   │   │   │       ├── editIcon.tsx
│   │   │   │       └── eyeIcon.tsx
│   │   │   ├── layout
│   │   │   │   ├── layout.tsx
│   │   │   │   └── layoutContext.ts
│   │   │   ├── market
│   │   │   │   ├── initialInventory.tsx
│   │   │   │   ├── inventoryDisplay.tsx
│   │   │   │   ├── marketInfoTabs.tsx
│   │   │   │   └── productTable.tsx
│   │   │   ├── navbar
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── burgerButton.tsx
│   │   │   │   ├── darkmodeswitch.tsx
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── navbarStyles.ts
│   │   │   │   ├── notificationsDropdown.tsx
│   │   │   │   └── userDropdown.tsx
│   │   │   ├── shared
│   │   │   │   ├── responsiveTable.tsx
│   │   │   │   └── reusableTabs.tsx
│   │   │   └── sidebar
│   │   │       ├── collapseItems.tsx
│   │   │       ├── companyLogo.tsx
│   │   │       ├── sidebar copy.tsx
│   │   │       ├── sidebar.tsx
│   │   │       ├── sidebarItem.tsx
│   │   │       ├── sidebarMenu.tsx
│   │   │       └── sidebarStyles.ts
│   │   ├── config
│   │   │   ├── fonts.ts
│   │   │   └── routeConfig.ts
│   │   ├── data
│   │   │   ├── financialManagement
│   │   │   │   ├── assetLiabilityManagement
│   │   │   │   │   ├── accountsReceivablePayable.ts
│   │   │   │   │   └── cashBankManagement.ts
│   │   │   │   ├── BankCreditSystem
│   │   │   │   │   ├── loanApplication
│   │   │   │   │   └── paymentInterestManagement
│   │   │   │   │       └── mockData.ts
│   │   │   │   ├── CashFlowProjections
│   │   │   │   │   ├── LiquidityAnalysis
│   │   │   │   │   │   └── mockLiquidityData.ts
│   │   │   │   │   └── MonthlyProjectionIE
│   │   │   │   │       └── mockProjectionData.ts
│   │   │   │   └── financialStatements
│   │   │   │       ├── balanceGeneral.ts
│   │   │   │       └── incomeStatement.ts
│   │   │   ├── homeData
│   │   │   │   └── data.ts
│   │   │   ├── humanResources
│   │   │   │   ├── payrollManagement
│   │   │   │   │   └── employeeData.ts
│   │   │   │   └── recruitmentAndDismissal
│   │   │   └── market
│   │   │       ├── initialInventoryData.ts
│   │   │       ├── inventoryData.ts
│   │   │       └── productData.ts
│   │   ├── helpers
│   │   │   ├── schemas.ts
│   │   │   └── types.ts
│   │   ├── hooks
│   │   │   ├── financialManagement
│   │   │   │   ├── assetLiabilityManagement
│   │   │   │   │   ├── accountsReceivablePayable
│   │   │   │   │   │   ├── useAccountsManagement.ts
│   │   │   │   │   │   └── useAccountsTable.ts
│   │   │   │   │   └── currentAssetsManagement
│   │   │   │   │       ├── useCashBankManagementTab.ts
│   │   │   │   │       ├── useCashBankTable.ts
│   │   │   │   │       └── useTransferForm.ts
│   │   │   │   ├── bankCreditSystem
│   │   │   │   │   ├── loanApplication
│   │   │   │   │   │   └── useLoanApplication.ts
│   │   │   │   │   └── paymentInterestManagement
│   │   │   │   │       └── usePaymentInterestManagement.ts
│   │   │   │   ├── cashFlowProjections
│   │   │   │   │   ├── LiquidityAnalysis
│   │   │   │   │   │   └── useLiquidityAnalysis.ts
│   │   │   │   │   └── MonthlyProjectionIE
│   │   │   │   │       └── useMonthlyProjection.ts
│   │   │   │   └── financialStatements
│   │   │   │       ├── useBalanceChartData.ts
│   │   │   │       ├── useBalanceTotals.ts
│   │   │   │       ├── useFilteredData.ts
│   │   │   │       ├── useFinancialStatementsTab.ts
│   │   │   │       ├── useIncomeStatementCalculations.ts
│   │   │   │       └── useResultsChartData.ts
│   │   │   ├── humanResources
│   │   │   │   ├── payrollManagement
│   │   │   │   │   └── usePayrollManagement.ts
│   │   │   │   └── recruitmentAndDismissal
│   │   │   │       └── useRecruitmentAndDismissal.ts
│   │   │   ├── market
│   │   │   │   └── useMarketTab.ts
│   │   │   ├── useBodyLock.ts
│   │   │   ├── useBreadcrumbs.ts
│   │   │   ├── useIsomorphicLayoutEffect.ts
│   │   │   ├── useSidebar.ts
│   │   │   ├── useSidebarCollapse.ts
│   │   │   ├── useSidebarState.ts
│   │   │   └── useTabSelection.ts
│   │   ├── styles
│   │   │   └── globals.css
│   │   ├── types
│   │   │   ├── financialManagement.ts
│   │   │   ├── humanResources.ts
│   │   │   └── market.ts
│   │   └── utils
│   │       ├── financialManagement
│   │       │   ├── assetLiabilityManagement
│   │       │   │   ├── accountsReceivablePayable
│   │       │   │   │   ├── renderCells.tsx
│   │       │   │   │   └── reportGenerator.ts
│   │       │   │   └── currentAssetsManagement
│   │       │   │       └── renderCells.tsx
│   │       │   ├── bankCreditSystem
│   │       │   │   ├── loanApplication
│   │       │   │   │   └── loanCalculations.ts
│   │       │   │   ├── paymentInterestManagement
│   │       │   │   │   └── formatters.ts
│   │       │   │   └── validationSchemas.ts
│   │       │   ├── cashFlowProjections
│   │       │   │   ├── LiquidityAnalysis
│   │       │   │   │   └── liquidityUtils.ts
│   │       │   │   └── MonthlyProjectionIE
│   │       │   │       └── projectionUtils.ts
│   │       │   └── financialStatements
│   │       │       └── renderCells.tsx
│   │       ├── homeUtils
│   │       ├── humanResources
│   │       │   ├── payrollManagement
│   │       │   │   └── formatters.ts
│   │       │   └── recruitmentAndDismissal
│   │       └── market
│   ├── tailwind.config.js
│   └── tsconfig.json
├── generateTree.py
├── Otros
│   ├── generateTree.py
│   └── optimizePrompt.py
├── output.docx
├── README.md
└── structure.md
```
