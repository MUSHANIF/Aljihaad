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
import Swal from "sweetalert2";
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

const Index = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode = false,
  success,
}) => {
  const [rowData, setRowData] = useState(getData());
  const gridRef = useRef(null);
  const [getRekapGabungan, setRekapGabungan] = useState("");
  useEffect(() => {
    axios
      .get("/api/getRekapGabungan")
      .then((response) => {
        setRekapGabungan(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRowData((rowData) =>
  //       rowData.map((item) =>
  //         Math.random() < 0.1
  //           ? {
  //               ...item,
  //               price:
  //                 item.price +
  //                 item.price *
  //                   ((Math.random() * 4 + 1) / 100) *
  //                   (Math.random() > 0.5 ? 1 : -1),
  //             }
  //           : item
  //       )
  //     );
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);
  const colDefs = useMemo(
    () => [
      {
        field: "nama_muzakki",
        headerName: "Nama Muzakki",
        minWidth: 200,
      },
      {
        field: "jumlah_beras",
        headerName: "Jumlah Beras (Liter)",

        valueFormatter: (params) => {
          return params.value ? `${numberFormatter(params)} liter` : "0 liter";
        },
        minWidth: 100,
      },
      {
        field: "jumlah_uang",
        headerName: "Jumlah Uang",

        valueFormatter: (params) => {
          return `Rp ${numberFormatter(params)}`;
        },
        minWidth: 200,
        aggFunc: "sum",
      },
      {
        field: "status_zakat",
        headerName: "Status Zakat",
        cellClass: "ag-center-cell",
        minWidth: 150,
      },
      {
        field: "waktu_berzakat",
        headerName: "Waktu Berzakat",
        minWidth: 100,
      },
      {
        field: "tanggal",
        headerName: "Tanggal",
        minWidth: 120,
      },
      {
        field: "created_at",
        headerName: "Created At",
        minWidth: 100,
        valueFormatter: (params) => {
          const date = new Date(params.value);
          return date.toLocaleDateString();
        },
      },
      {
        field: "actions",
        cellRenderer: ActionButtons,
        minWidth: 200,
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
      {success && (
        <div className="">
          <Alert status={true} pesan={success} />
        </div>
      )}
      <AppZakat>
        <div className="flex justify-end">
          <Link
            href={route("zakat.CreateZakat")}
            className="bg-primary p-2 rounded-lg hover:opacity-95"
          >
            Create Data Muzzakki
          </Link>
        </div>
        <BreadCrumb model={items} className="my-3" home={home} />
        <div className="bg-white dark:bg-gray-800 overflow-x-auto shadow-sm sm:rounded-lg">
          <div className=" text-gray-900 dark:text-gray-100">
            <div className="mb-5 ">
              <div className={styles.wrapper}>
                <div className={styles.container}>
                  <div className={`${themeClass} ${styles.grid} `}>
                    <AgGridReact
                      ref={gridRef}
                      getRowId={getRowId}
                      rowData={getRekapGabungan}
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
const ActionButtons = ({ data }) => {
  const handleEdit = () => {
    console.log("Editing", data);
    // Implement edit logic
  };

  const handleDelete = (data) => {
    // router.delete(route("zakat.DeleteZakat", data.id));
    // console.log("Deleting", data.id);
    Swal.fire({
      title: "Apakah Anda yakin untuk menghapus data ini?",
      showDenyButton: true,
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        console.log("Deleting", data.id);
        router.delete(route("zakat.DeleteZakat", data));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="flex space-x-2 my-auto mb-5">
      <Link
        href={route("zakat.EditZakat", data)}
        className="bg-blue-500 rounded-md text-white px-3 py-1 "
      >
        Edit
      </Link>
      <button
        onClick={(e) => handleDelete(data)}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
export default Index;
