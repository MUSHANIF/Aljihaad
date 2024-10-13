// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// import { ModuleRegistry } from "@ag-grid-community/core";
// import { AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/styles/ag-grid.css";
// import "@ag-grid-community/styles/ag-theme-quartz.css";
// import { AdvancedFilterModule } from "@ag-grid-enterprise/advanced-filter";
// import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
// import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
// import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
// import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
// import { MenuModule } from "@ag-grid-enterprise/menu";
// import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
// import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
// import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
// import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
// import { SparklinesModule } from "@ag-grid-enterprise/sparklines";
// import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
// import Alert from "@/Alert";
// import Swal from "sweetalert2";
// import { Dropdown } from "primereact/dropdown";
// import { BreadCrumb } from "primereact/breadcrumb";
// import Layout from "@/Layouts/layout/layout.jsx";
// import AppZakat from "@/Layouts/layout/AppZakat.jsx";
// import { Head, Link, router } from "@inertiajs/react";
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import styles from "./../../../css/FinanceExample.module.css";
// // import { TickerCellRenderer } from "./cell-renderers/TickerCellRenderer";

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   AdvancedFilterModule,
//   ColumnsToolPanelModule,
//   ExcelExportModule,
//   FiltersToolPanelModule,
//   GridChartsModule,
//   MenuModule,
//   RangeSelectionModule,
//   RowGroupingModule,
//   SetFilterModule,
//   RichSelectModule,
//   StatusBarModule,
//   SparklinesModule,
// ]);

// const numberFormatter = ({ value }) => {
//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "decimal",
//     maximumFractionDigits: 2,
//   });
//   return value == null ? "" : formatter.format(value);
// };

// const AbsensiZakat = ({
//   gridTheme = "ag-theme-quartz",
//   isDarkMode = false,
//   success,
//   pengurus,
//   dataJenisZakat,
//   dataRT,
// }) => {
//   const gridRef = useRef(null);

//   const [getRekapGabungan, setRekapGabungan] = useState(pengurus.data);

//   const colDefs = useMemo(
//     () => [
//       {
//         field: "name",
//         headerName: "Nama Amil Zakat",
//         minWidth: 200,
//       },
//       {
//         field: "umur",
//         headerName: "Umur",

//         valueFormatter: (params) => {
//           return params.value ? `${numberFormatter(params)} Tahun` : "0 Tahun";
//         },
//         minWidth: 100,
//       },
//       {
//         field: "no_telp",
//         headerName: "No Telepon",
//         minWidth: 100,
//       },
//       {
//         field: "status",
//         headerName: "Role",
//         minWidth: 100,
//       },
//       {
//         field: "tanggal",
//         headerName: "Total Hadir",
//         minWidth: 120,
//       },
//       {
//         field: "tanggal",
//         headerName: "Total Tidak Hadir",
//         minWidth: 120,
//       },
//       {
//         field: "tanggal",
//         headerName: "Persentase Kehadiran",
//         minWidth: 120,
//       },

//       {
//         field: "actions",
//         cellRenderer: ActionButtons,
//         minWidth: 200,
//         minHeight: 100,
//       },
//     ],
//     []
//   );

//   const defaultColDef = useMemo(
//     () => ({
//       flex: 1,
//       filter: true,
//       enableRowGroup: true,
//       enableValue: true,
//     }),
//     []
//   );

//   const getRowId = useCallback(({ data: { ticker } }) => ticker, []);

//   const statusBar = useMemo(
//     () => ({
//       statusPanels: [
//         { statusPanel: "agTotalAndFilteredRowCountComponent" },
//         { statusPanel: "agTotalRowCountComponent" },
//         { statusPanel: "agFilteredRowCountComponent" },
//         { statusPanel: "agSelectedRowCountComponent" },
//         { statusPanel: "agAggregationComponent" },
//       ],
//     }),
//     []
//   );

//   const themeClass = `${gridTheme}${isDarkMode ? "-dark" : ""}`;
//   const items = [{ label: "Rekap Gabungan" }];

//   const home = { icon: "pi pi-home", url: "" };
//   return (
//     <Layout>
//       <Head title="Perhitungan Zakat" />
//       {success && (
//         <div className="">
//           <Alert status={true} pesan={success} />
//         </div>
//       )}

//       {/* <div className="flex justify-end">
//           <Link
//             href={route("zakat.CreateZakat")}
//             className="bg-primary p-2 rounded-lg hover:opacity-95"
//           >
//             Create Data Muzzakki
//           </Link>
//         </div> */}
//       <BreadCrumb model={items} className="my-3" home={home} />
//       <div className="bg-white dark:bg-gray-800 overflow-x-auto shadow-sm sm:rounded-lg">
//         <div className=" text-gray-900 dark:text-gray-100">
//           <div className="mb-5 ">
//             <div className={styles.wrapper}>
//               <div className={styles.container}>
//                 <div className={`${themeClass} ${styles.grid} `}>
//                   <AgGridReact
//                     ref={gridRef}
//                     getRowId={getRowId}
//                     rowData={getRekapGabungan}
//                     columnDefs={colDefs}
//                     defaultColDef={defaultColDef}
//                     enableRangeSelection
//                     enableCharts
//                     rowSelection="multiple"
//                     rowGroupPanelShow="always"
//                     suppressAggFuncInHeader
//                     groupDefaultExpanded={-1}
//                     statusBar={statusBar}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };
// const ActionButtons = ({ data }) => {
//   const StatusKehadiran = ["Hadir", "Tidak Hadir", "Izin"];
//   return (
//     <div className="flex my-auto mb-5">
//       <Dropdown
//         // value={data.status_zakat}
//         // onChange={(e) => setSelectedStatusZakat(e.value)}
//         options={StatusKehadiran}
//         optionLabel="name"
//         placeholder="Select a Status Zakat"
//         className="w-full "
//       />
//     </div>
//   );
// };
// export default AbsensiZakat;

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { MeterGroup } from "primereact/metergroup";
import { Panel } from "primereact/panel";
import PanelZakat from "@/Components/PanelZakat";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { Badge } from "primereact/badge";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import styles from "./../../../css/HRExample.module.css";
import { ContactCellRenderer } from "../../cell-renderers/ContactCellRenderer";
import { EmployeeCellRenderer } from "../../cell-renderers/EmployeeCellRenderer";
import { FlagCellRenderer } from "../../cell-renderers/FlagCellRenderer";
import { StatusCellRenderer } from "../../cell-renderers/StatusCellRenderer";
import { TagCellRenderer } from "../../cell-renderers/TagCellRenderer";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import Swal from "sweetalert2";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import { BreadCrumb } from "primereact/breadcrumb";
import { Head, Link, useForm } from "@inertiajs/react";
import { Chip } from "primereact/chip";
import Layout from "@/Layouts/layout/layout.jsx";
import GaugeChart from "react-gauge-chart";
import { Chart } from "primereact/chart";
import AppZakat from "@/Layouts/layout/AppZakat.jsx";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MasterDetailModule,
  RowGroupingModule,
  RichSelectModule,
  SetFilterModule,
  StatusBarModule,
]);
const numberFormatter = ({ value }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  });
  return value == null ? "" : formatter.format(value);
};

const employmentTypeOptions = ["Permanent", "Contract"];
const paymentMethodOptions = ["Cash", "Check", "Bank Transfer"];
const paymentStatusOptions = ["Paid", "Pending"];
const StatusKehadiran = ["Hadir", "Tidak Hadir", "Izin"];
const WaktuKehadiran = ["Sore", "Malam"];
const departments = {
  executiveManagement: "Executive Management",
  legal: "Legal",
  design: "Design",
  engineering: "Engineering",
  product: "Product",
  customerSupport: "Customer Support",
};

const departmentFormatter = ({ value }) => departments[value] ?? "";
const setSelectedStatusZakat = (event) => {
  const updatedData = {
    id: event.data.id,
    status: event.newValue,
    waktu_hadir: event.data.get_data_amil_zakat.waktu_hadir,
  };
  if (!updatedData.waktu_hadir) {
    alert("Waktu Kehadiran belum terisi. Tidak boleh submit!");
    return; // Hentikan eksekusi jika belum terisi
  }

  console.log(updatedData);
  // updateStatusInDatabase(updatedData);
};
const updateStatusInDatabase = async (data) => {
  try {
    const response = await axios.post("/api/amilZakatAbsen", data);
    console.log("Status updated:", response.data);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
const AbsensiZakat = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode = false,
  success,
  pengurus,
  dataJenisZakat,
  dataRT,
}) => {
  const gridRef = useRef(null);

  const [getRekapGabungan, setRekapGabungan] = useState(pengurus.data);

  const [colDefs] = useState([
    {
      field: "name",
      headerName: "Nama Amil Zakat",
      pinned: "left",
      sort: "asc",
      cellRenderer: NamaAmil,
      minWidth: 220,
    },
    {
      field: "umur",
      headerName: "Umur",

      valueFormatter: (params) => {
        return params.value ? `${numberFormatter(params)} Tahun` : "0 Tahun";
      },
      minWidth: 220,
    },
    {
      field: "no_telp",
      headerName: "No Telepon",
      minWidth: 220,
    },
    {
      field: "status",
      headerName: "Role",
      minWidth: 220,
    },
    {
      cellRenderer: TotalHadir,
      headerName: "Total Hadir",
      minWidth: 220,
    },
    {
      cellRenderer: TotalTidakHadir,
      headerName: "Total Tidak Hadir",
      minWidth: 220,
    },
    {
      cellRenderer: Persentase,
      field: "persentase_kehadiran",
      headerName: "Persentase Kehadiran",
      minWidth: 100,
    },
    {
      cellRenderer: ModalAbsen,
      field: "absen",
      headerName: "Isi Absen",
    },
    // {
    //   headerName: "Status",
    //   field: "get_data_amil_zakat.status",
    //   editable: true,
    //   width: 220,
    //   cellRenderer: StatusCellRenderer,
    //   cellEditor: "agRichSelectCellEditor",
    //   cellEditorParams: {
    //     values: StatusKehadiran,
    //   },
    // },
    // {
    //   field: "actions",
    //   cellRenderer: ActionButtons,
    //   minWidth: 200,
    //   minHeight: 100,
    // },
  ]);

  const getDataPath = useCallback((data) => data.name);

  const themeClass = isDarkMode ? `${gridTheme}-dark` : gridTheme;

  const autoGroupColumnDef = useMemo(
    () => ({
      headerName: "currency",
      width: 330,
      pinned: "left",
      sort: "asc",
      // cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        suppressCount: true,
        // innerRenderer: EmployeeCellRenderer,
      },
    }),
    []
  );
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

      <div className="flex justify-end"></div>
      <BreadCrumb model={items} className="my-3" home={home} />
      <PanelZakat />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={`${themeClass} ${styles.grid}`}>
            <AgGridReact
              ref={gridRef}
              columnDefs={colDefs}
              rowData={getRekapGabungan}
              groupDefaultExpanded={-1}
              // getDataPath={getDataPath}
              onCellValueChanged={setSelectedStatusZakat}
              // treeData
              autoGroupColumnDef={autoGroupColumnDef}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
const ModalAbsen = ({ data, auth }) => {
  const [visible, setVisible] = useState(false);
  const [datas, setDatas] = useState({
    id_pengurus: data.id,
    tanggal: "",
    waktu_berzakat: "",
    status: "",
  });
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDatas((prev) => ({ ...prev, tanggal: formattedDate }));
  }, []);
  const setSelectedWaktuZakat = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .post("/api/amilZakatAbsen", datas, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === 400) {
            Swal.fire(response.data.message, "", "error");
          } else {
            Swal.fire(response.data.message, "", "success");
          }
          setVisible(false);
          // setDatas({
          //   id_pengurus: data.id,
          //   waktu_berzakat: "",
          //   status: "",
          // });
        })
        .catch((error) => {
          if (error.response.status === 429) {
            this.$swal(
              "Error!",
              "Terlalu banyak permintaan. Silakan coba lagi nanti.",
              "error"
            );
          } else {
            Swal.fire(error.response.message, "", "error");
          }
        });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const waktuZakat = ["Sore", "Malam"];
  const status_kehadiran = ["Hadir", "Tidak Hadir", "Izin"];
  return (
    <div className="">
      <Button
        label="Isi Absen"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header={`Absen ${data.name}`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form onSubmit={onSubmit} className="p-4 ">
          <div className="flex flex-column gap-2 my-4 ">
            <label htmlFor="username">Tanggal</label>
            <InputText
              id="username"
              onChange={(e) => setData("tanggal", e.target.value)}
              value={datas.tanggal}
              type="date"
              aria-describedby="username-help"
              readOnly
            />
            <small id="username-help">
              Tanggal akan otomatis terisi dengan tanggal hari ini
            </small>
          </div>

          <div className="flex flex-column gap-2 my-4 ">
            <label htmlFor="username">Waktu Absen </label>
            <Dropdown
              value={datas.waktu_berzakat}
              name="waktu_berzakat"
              id="waktu_berzakat"
              onChange={setSelectedWaktuZakat}
              options={waktuZakat}
              placeholder="Select a Waktu Zakat"
              className="w-full "
              required
            />
          </div>
          <div className="flex flex-column gap-2 my-4 ">
            <label htmlFor="username">Keterangan Hadir </label>
            <Dropdown
              value={datas.status}
              name="status"
              id="status"
              onChange={setSelectedWaktuZakat}
              options={status_kehadiran}
              placeholder="Select a Status Kehadiran"
              className="w-full "
              required
            />
          </div>

          <div className="mt-4 text-right">
            <button
              type="submit"
              className="bg-blue-500 py-2 px-3 text-white  rounded-xl shadow transition-all hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
const Persentase = ({ data }) => {
  const values = [{ label: "Space used", value: 90 }];
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [visible, setVisible] = useState(false);
  const tidakHadirCount = data.get_data_amil_zakat.filter(
    (item) => item.status === "Tidak Hadir"
  ).length;
  const HadirCount = data.get_data_amil_zakat.filter(
    (item) => item.status === "Hadir"
  ).length;
  const IzinCount = data.get_data_amil_zakat.filter(
    (item) => item.status === "Izin"
  ).length;
  const AllCount =
    data.get_data_amil_zakat.filter((item) => item.status === "Hadir").length /
    22;
  console.log(AllCount);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: ["Tidak Hadir", "Hadir", "Izin"],
      datasets: [
        {
          data: [tidakHadirCount, HadirCount, IzinCount],
          backgroundColor: [
            "#f56565", // Merah (Red)
            "#4299e1", // Biru (Blue)
            "#48bb78", // Hijau (Green)
          ],
          hoverBackgroundColor: [
            "#fc8181", // Merah (hover)
            "#63b3ed", // Biru (hover)
            "#68d391", // Hijau (hover)
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex">
      <div className="">
        <Button
          label="Show"
          icon="pi pi-external-link "
          text
          size="small"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header={`Absen ${data.name}`}
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="flex">
            <div className="">
              <Chart
                type="pie"
                data={chartData}
                options={chartOptions}
                className="w-full md:w-30rem"
              />
            </div>
            <div className="flex flex-col">
              <div className="">
                {" "}
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={20}
                  style={{ width: "650px" }}
                  percent={AllCount}
                  colors={["#FF0000", "#FFFF00", "#00FF00"]}
                  textColor="#000"
                />
              </div>
              <div className="w-50 mt-5">
                {" "}
                <ScrollPanel style={{ width: "200%", height: "200px" }}>
                  <p>Jika Amil Zakat tidak hadir, maka akan diberikan sanksi</p>
                </ScrollPanel>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
const TotalHadir = ({ data }) => {
  const values = [{ label: "Space used", value: 90 }];

  return (
    <div className="flex">
      <div className="">
        <Badge
          value={
            data.get_data_amil_zakat.filter((item) => item.status === "Hadir")
              .length
          }
        ></Badge>
      </div>
    </div>
  );
};
const TotalTidakHadir = ({ data }) => {
  return (
    <div className="flex">
      <div className="">
        <Badge
          severity="danger"
          value={
            data.get_data_amil_zakat.filter(
              (item) => item.status === "Tidak Hadir"
            ).length
          }
        ></Badge>
      </div>
      {/* <div className="">
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={20}
          style={{ width: "150px", height: "60px" }}
          percent={0.9}
          colors={["#FF0000", "#FFFF00", "#00FF00"]}
          textColor="#000"
        />
      </div> */}
    </div>
  );
};
const NamaAmil = ({ data }) => {
  const values = [{ label: "Space used", value: 90 }];

  return (
    <div className="my-auto flex">
      <Chip label={data.name} image={`/storage/${data.image_path}`} />
    </div>
  );
};

export default AbsensiZakat;
