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
import styles from "./../../../css/HRExample.module.css";
import { Dropdown } from "primereact/dropdown";
import Swal from "sweetalert2";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import Alert from "@/Alert";
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
  Mustahik,
  dataJenisZakat,
  dataRT,
}) => {
  const gridRef = useRef(null);

  const [getDataMustahik, setRekapGabungan] = useState(Mustahik.data);

  const [colDefs] = useState([
    {
      field: "nama_kepala_keluarga",
      headerName: "Nama Mustahik",
      pinned: "left",
      sort: "asc",
      cellRenderer: NamaMustahik,
      minWidth: 300,
    },
    {
      field: "nik",
      headerName: "Nik",
      valueFormatter: (params) => {
        return params.value ? `${params.value}` : "Tidak ada";
      },
      minWidth: 300,
    },
    {
      field: "jumlah_anggota_keluarga",
      headerName: "Jumlah Anggota Keluarga",
      minWidth: 300,
    },
    {
      field: "tahun_mustahik",
      headerName: "Tahun Mustahik",
      minWidth: 300,
    },
    {
      field: "id_rt",
      headerName: "Rt",
      valueFormatter: (params) => {
        const item = dataRT.find((item) => item.id == params.value);
        return item ? item.nama_rt : "din";
      },
      minWidth: 300,
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
  const items = [{ label: "Rekap Mustahik" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout>
      <Head title="Perhitungan Zakat" />
      {success && (
        <div className="">
          <Alert status={true} pesan={success} />
        </div>
      )}
      <div className="flex justify-end">
        <Link
          href={route("zakat.CreateMustahik")}
          className="bg-primary p-2 rounded-lg hover:opacity-95"
        >
          Create Data Mustahik
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
    </Layout>
  );
};
const ModalAbsen = ({ data, auth }) => {
  const [visible, setVisible] = useState(false);
  const [datas, setDatas] = useState({
    id_Mustahik: data.id,
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
          //   id_Mustahik: data.id,
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
        label="Show"
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
const NamaMustahik = ({ data }) => {
  return (
    <div className="my-auto flex">
      <Chip label={data.nama_kepala_keluarga} />
    </div>
  );
};

export default RekapMustahik;
