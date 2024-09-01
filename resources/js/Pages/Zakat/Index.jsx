import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { AdvancedFilterModule } from "@ag-grid-enterprise/advanced-filter";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { SparklinesModule } from "@ag-grid-enterprise/sparklines";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import Alert from "@/Alert";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "@/Layouts/layout/layout.jsx";
import AppZakat from "@/Layouts/layout/AppZakat.jsx";
import { Head, Link, router } from "@inertiajs/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./../../../css/FinanceExample.module.css";
// import { TickerCellRenderer } from "./cell-renderers/TickerCellRenderer";
import { getData } from "./data";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  AdvancedFilterModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  GridChartsModule,
  MenuModule,
  RangeSelectionModule,
  RowGroupingModule,
  SetFilterModule,
  RichSelectModule,
  StatusBarModule,
  SparklinesModule,
]);

const numberFormatter = ({ value }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  });
  return value == null ? "" : formatter.format(value);
};

const FinanceExample = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode = false,
}) => {
  const [rowData, setRowData] = useState(getData());
  const gridRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRowData((rowData) =>
        rowData.map((item) =>
          Math.random() < 0.1
            ? {
                ...item,
                price:
                  item.price +
                  item.price *
                    ((Math.random() * 4 + 1) / 100) *
                    (Math.random() > 0.5 ? 1 : -1),
              }
            : item
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const colDefs = useMemo(
    () => [
      // {
      //   field: "ticker",
      //   cellRenderer: TickerCellRenderer,
      //   minWidth: 380,
      // },
      {
        field: "instrument",
        type: "rightAligned",
        maxWidth: 180,
      },
      {
        headerName: "P&L",
        type: "rightAligned",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueGetter: ({ data }) =>
          data && data.quantity * (data.price / data.purchasePrice),
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        headerName: "Total Value",
        type: "rightAligned",
        valueGetter: ({ data }) => data && data.quantity * data.price,
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        aggFunc: "sum",
      },
      {
        field: "quantity",
        type: "rightAligned",
        valueFormatter: numberFormatter,
        maxWidth: 150,
      },
      {
        headerName: "Price",
        field: "purchasePrice",
        type: "rightAligned",
        valueFormatter: numberFormatter,
        maxWidth: 150,
      },
      {
        field: "purchaseDate",
        type: "rightAligned",
        hide: true,
      },
      {
        headerName: "Last 24hrs",
        field: "last24",
        cellRenderer: "agSparklineCellRenderer",
        cellRendererParams: {
          sparklineOptions: {
            line: {
              strokeWidth: 2,
            },
          },
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      enableRowGroup: true,
      enableValue: true,
    }),
    []
  );

  const getRowId = useCallback(({ data: { ticker } }) => ticker, []);

  const statusBar = useMemo(
    () => ({
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent" },
        { statusPanel: "agTotalRowCountComponent" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    }),
    []
  );

  const themeClass = `${gridTheme}${isDarkMode ? "-dark" : ""}`;
  const items = [{ label: "Rekap Gabungan" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout>
      <Head title="Perhitungan Zakat" />
      <AppZakat>
        <BreadCrumb model={items} className="my-3" home={home} />
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className=" text-gray-900 dark:text-gray-100">
            <div className="mb-5 ">
              <div className={styles.wrapper}>
                <div className={styles.container}>
                  <div className={`${themeClass} ${styles.grid}`}>
                    <AgGridReact
                      ref={gridRef}
                      getRowId={getRowId}
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      enableRangeSelection
                      enableCharts
                      rowSelection="multiple"
                      rowGroupPanelShow="always"
                      suppressAggFuncInHeader
                      groupDefaultExpanded={-1}
                      statusBar={statusBar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppZakat>
    </Layout>
  );
};

export default FinanceExample;
