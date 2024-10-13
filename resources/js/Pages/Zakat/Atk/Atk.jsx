import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
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
import styles from "./../../../../css/HRExample.module.css";
import { Dropdown } from "primereact/dropdown";
import Swal from "sweetalert2";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import Alert from "@/Alert";
import { BreadCrumb } from "primereact/breadcrumb";
import { Head, Link, router } from "@inertiajs/react";
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
const setSelectedStatusZakat = (event) => {
  const updatedData = {
    id: event.data.id,
    status: event.newValue,
    waktu_hadir: event.data.get_data_amil_zakat.waktu_hadir,
  };
  if (!updatedData.waktu_hadir) {
    alert("Waktu Kehadiran belum terisi. Tidak boleh submit!");
    return;
  }
};
const updateStatusInDatabase = async (data) => {
  try {
    const response = await axios.post("/api/amilZakatAbsen", data);
    console.log("Status updated:", response.data);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
const RekapMustahik = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode = false,
  success,
  AtkData,
  dataJenisZakat,
  dataRT,
  amil,
}) => {
  const gridRef = useRef(null);

  const [getDataMustahik, setRekapGabungan] = useState(AtkData.data);

  const [colDefs] = useState([
    {
      field: "nama_barang",
      headerName: "Nama Barang",
      pinned: "left",
      sort: "asc",
      minWidth: 300,
    },
    {
      field: "foto_struk",
      headerName: "Foto Struk",
      pinned: "left",
      sort: "asc",
      cellRenderer: FotoStruk,
      minWidth: 300,
    },
    {
      field: "harga_barang",
      headerName: "Total Harga Barang",
      valueFormatter: (params) => {
        return `Rp ${numberFormatter(params)}`;
      },
      minWidth: 300,
    },
    {
      field: "total_barang",
      headerName: "Total Barang",
      minWidth: 300,
    },
    {
      field: "tanggal_pembelian",
      headerName: "Tanggal Pembelian",
      minWidth: 300,
    },
    {
      field: "id_amil",
      headerName: "Nama Amil yang mendata",
      valueFormatter: (params) => {
        const item = amil.find((item) => item.id == params.value);
        return item ? item.name : "no name";
      },
      minWidth: 300,
    },
    {
      field: "actions",
      cellRenderer: ActionButtons,
      minWidth: 200,
    },
  ]);

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
  const items = [{ label: "Rekap Atk" }];
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
            href={route("zakat.CreateAtk")}
            className="bg-primary p-2 rounded-lg hover:opacity-95"
          >
            Create Data Atk
          </Link>
        </div>
        <div className="flex justify-end"></div>
        <BreadCrumb model={items} className="my-3" home={home} />

        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={`${themeClass} ${styles.grid}`}>
              <AgGridReact
                ref={gridRef}
                columnDefs={colDefs}
                rowData={getDataMustahik}
                groupDefaultExpanded={-1}
                // getDataPath={getDataPath}
                onCellValueChanged={setSelectedStatusZakat}
                // treeData
                autoGroupColumnDef={autoGroupColumnDef}
              />
            </div>
          </div>
        </div>
      </AppZakat>
    </Layout>
  );
};

const FotoStruk = ({ data }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="my-auto flex">
      <button onClick={() => setVisible(true)}>
        <img src={`/storage/${data.foto_struk}`} alt="Foto Struk" />
      </button>
      <Dialog
        header="Detail Foto Struk"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <img
          src={`/storage/${data.foto_struk}`}
          className="w-full"
          alt="Foto Struk"
        />
      </Dialog>
    </div>
  );
};
const ActionButtons = ({ data }) => {
  const handleEdit = () => {
    console.log("Editing", data);
    // Implement edit logic
  };

  const handleDelete = (data) => {
    Swal.fire({
      title: "Apakah Anda yakin untuk menghapus data ini?",
      showDenyButton: true,
      confirmButtonText: "Ya",
      icon: "question",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil Dihapus , Tolong refresh halaman", "", "success");
        router.delete(route("zakat.DeleteAtk", data));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="flex space-x-2 my-auto mb-5">
      <button
        onClick={(e) => handleDelete(data)}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
export default RekapMustahik;
