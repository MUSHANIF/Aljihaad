import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useForm } from "@inertiajs/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import ButtonSubmit from "@/Components/ButtonSubmit";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { AdvancedFilterModule } from "@ag-grid-enterprise/advanced-filter";
import { GridChartsModule } from "@ag-grid-enterprise/charts-enterprise";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { InputText } from "primereact/inputtext";
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
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";
import AppZakat from "@/Layouts/layout/AppZakat.jsx";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./../../../css/FinanceExample.module.css";
// import { TickerCellRenderer } from "./cell-renderers/TickerCellRenderer";

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

const RekapGabungan = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode = false,
  success,
  dataJenisZakat,
  dataRT,
  TotalHariIni,
  PersentaseKenaikan,
  TotalUangZakatToday,
  PersentaseKenaikanUang,
  getDataMuzakki,
}) => {
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
  const calculateTotalUang = (relationMuzakki) => {
    if (!Array.isArray(relationMuzakki.data.relation_muzzaki)) {
      console.error("relation_muzakki harus berupa array");
      return 0;
    }

    const total = relationMuzakki.data.relation_muzzaki.reduce(
      (total, item) => {
        const jumlahUang = Number(item.jumlah_uang);
        return total + (isNaN(jumlahUang) ? 0 : jumlahUang);
      },
      0
    );

    // Format hasil ke mata uang Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };
  const calculateTotalBeras = (relationMuzakki) => {
    if (!Array.isArray(relationMuzakki.data.relation_muzzaki)) {
      console.error("relation_muzakki harus berupa array");
      return 0;
    }

    const total = relationMuzakki.data.relation_muzzaki.reduce(
      (total, item) => {
        const jumlahBeras = Number(item.jumlah_beras);
        return total + (isNaN(jumlahBeras) ? 0 : jumlahBeras);
      },
      0
    );

    return total;
  };
  const colDefs = useMemo(
    () => [
      {
        field: "download",
        cellRenderer: DownloadData,
        minWidth: 200,
      },
      {
        field: "nama_muzakki",
        headerName: "Nama Muzakki",
        minWidth: 200,
      },
      // {
      //   field: "relation_muzakki.jumlah_beras",
      //   headerName: "Jumlah Beras (Liter)",

      //   valueFormatter: (params) => {
      //     return params.value ? `${numberFormatter(params)} liter` : "0 liter";
      //   },
      //   minWidth: 100,
      // },
      {
        field: "relation_muzakki",
        headerName: "Total Uang",

        valueFormatter: (params) => {
          return `${calculateTotalUang(params)}`;
        },
        minWidth: 200,
        aggFunc: "sum",
      },
      {
        field: "jumlah_uang",
        headerName: "Total Beras",

        valueFormatter: (params) => {
          return `${calculateTotalBeras(params)} liter`;
        },
        minWidth: 200,
        aggFunc: "sum",
      },
      {
        field: "id_rt",
        headerName: "Rt",
        valueFormatter: (params) => {
          const item = dataRT.find((item) => item.id == params.value);
          return item ? item.nama_rt : "din";
        },
        minWidth: 200,
        aggFunc: "sum",
      },
      {
        field: "created_at",
        headerName: "Tanggal",
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
        minWidth: 120,
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
        <div className="flex mb-5 justify-end">
          <Link
            href={route("zakat.CreateZakat")}
            className="bg-primary p-2 rounded-lg hover:opacity-95"
          >
            Create Data Muzzakki
          </Link>
        </div>
        <div className="grid">
          <DashboardInfoCard
            title="Total Zakat Hari ini"
            value={TotalHariIni}
            icon="sort-numeric-up"
            col={6}
            iconColor="blue"
            descriptionValue={PersentaseKenaikan + "%"}
            descriptionText="since yesterday"
          ></DashboardInfoCard>
          <DashboardInfoCard
            title="Total Penerimaan Zakat Hari ini (All Zakat)"
            value={"Rp" + TotalUangZakatToday}
            icon="money-bill"
            col={6}
            iconColor="orange"
            descriptionValue={PersentaseKenaikanUang + "%"}
            descriptionText="since yesterday from all zakat"
          ></DashboardInfoCard>
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
                      rowData={getDataMuzakki}
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
const DownloadData = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const calculateTotalUang = (data) => {
    if (!Array.isArray(data.relation_muzzaki)) {
      console.error("relation_muzakki harus berupa array");
      return 0;
    }

    const total = data.relation_muzzaki.reduce((total, item) => {
      const jumlahUang = Number(item.jumlah_uang);
      return total + (isNaN(jumlahUang) ? 0 : jumlahUang);
    }, 0);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(total);
  };
  const currencyFormatter = (data) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(data);
  };
  const calculateTotalBeras = (data) => {
    if (!Array.isArray(data.relation_muzzaki)) {
      console.error("relation_muzakki harus berupa array");
      return 0;
    }

    const total = data.relation_muzzaki.reduce((total, item) => {
      const jumlahBeras = Number(item.jumlah_beras);
      return total + (isNaN(jumlahBeras) ? 0 : jumlahBeras);
    }, 0);

    return total;
  };
  return (
    <>
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header={`Zakat atas nama: ${data.nama_muzakki} (${data.relation_rt.nama_rt})`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="space-y-5 my-5">
          <div className="flex justify-center">
            <a
              href={`/invoice/${data.id}/download`}
              target="_blank"
              className="bg-red-600 hover:bg-red-700 transition text-white font-medium rounded-md px-4 py-2 shadow-md"
            >
              Download Invoice
            </a>
          </div>

          <div className="border border-gray-300 rounded-lg shadow-sm p-5 bg-gray-50">
            <ul className="space-y-4">
              <li className="flex justify-start items-center">
                <span className="font-bold text-gray-700">Jumlah Jiwa:</span>
                <span className="mx-2 text-gray-900">{data.jiwa}</span>
              </li>

              {data.relation_muzzaki.map((muzakki, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">Jenis Zakat</span>
                    <span className="text-gray-900">
                      {muzakki.relation_jenis_zakat.nama_zakat}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">Jumlah Uang</span>
                    <span className="text-gray-900">
                      {currencyFormatter(muzakki.jumlah_uang)}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-bold text-gray-700">
                      Jumlah Beras:
                    </span>
                    <span className="text-gray-900">
                      {muzakki.jumlah_beras ? muzakki.jumlah_beras : 0} Liter
                    </span>
                  </div>
                </li>
              ))}

              <li className="flex justify-start items-center">
                <span className="font-bold text-gray-700">
                  Jumlah Total Uang:
                </span>
                <span className="mx-2 text-gray-900">
                  {calculateTotalUang(data)}
                </span>
              </li>
              <li className="flex justify-start items-center">
                <span className="font-bold text-gray-700">
                  Jumlah Total Beras:
                </span>
                <span className="mx-2 text-gray-900">
                  {calculateTotalBeras(data)} Liter
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  );
};
const ActionButtons = ({ data }) => {
  const handleEdit = () => {};

  const handleDelete = (data) => {
    Swal.fire({
      title: "Apakah Anda yakin untuk menghapus data ini?",
      showDenyButton: true,
      confirmButtonText: "Ya",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");

        router.delete(route("zakat.DeleteZakat", data));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="flex space-x-2 my-auto mb-5">
      {editModal({ dataMuzakki: data })}
      {/* <Link
        href={route("zakat.EditZakat", data.id)}
        className="bg-blue-500 rounded-md text-white px-3 py-1 "
      >
        Edit
      </Link> */}
      <button
        onClick={(e) => handleDelete(data)}
        className="bg-red-500 text-white px-3 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
const editModal = ({ dataMuzakki }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const { data, setData, post, errors, reset } = useForm({
    nama_muzakki: dataMuzakki.nama_muzakki,
    jiwa: dataMuzakki.jiwa,
    id_rt: dataMuzakki.id_rt,

    _method: "PUT",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("zakat.PutZakatMuzakki", dataMuzakki.id));
  };
  const [dataRT, setDataRT] = useState([]);
  const [getRT, setRt] = useState("");
  useEffect(() => {
    axios
      .get("/api/getRtApi")
      .then((response) => {
        setDataRT(response.data.data);

        response.data.data.map((item) => {
          if (item.id == dataMuzakki.id_rt) {
            setRt(item);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const setSelectedRt = (value) => {
    setData("id_rt", value.id);
    setRt(value);
  };
  const currencyFormatter = (data) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(data);
  };
  return (
    <>
      <Button
        label="Edit"
        onClick={() => show("top-right")}
        className="bg-blue-500 rounded-md text-white px-3 py-1 "
      />

      <Dialog
        header={`Edit Data Muzakki ${dataMuzakki.nama_muzakki}`}
        visible={visible}
        position={position}
        // style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <div className="">
          <form
            onSubmit={onSubmit}
            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
          >
            <div className="flex flex-column gap-2">
              <label htmlFor="username">Nama perwakilan Keluarga Muzakki</label>
              <InputText
                value={data.nama_muzakki}
                aria-describedby="username-help"
                placeholder="Masukan Username"
                onChange={(e) => setData("nama_muzakki", e.target.value)}
              />

              {errors.nama_muzakki && (
                <small className="p-error">{errors.nama_muzakki}</small>
              )}
            </div>
            <div className="flex flex-column gap-2 my-4 ">
              <label htmlFor="username">Jenis Rt </label>
              <Dropdown
                value={getRT}
                onChange={(e) => setSelectedRt(e.value)}
                options={dataRT}
                optionLabel="nama_rt"
                placeholder="Select a Status Zakat"
                className="w-full "
              />
              {errors.id_rt && (
                <small className="p-error">{errors.id_rt}</small>
              )}
            </div>
            <div className="flex flex-column gap-2 my-4 ">
              <label htmlFor="username">Jumlah jiwa</label>

              <InputText
                keyfilter="int"
                placeholder="Masukan Jumlah Jiwa"
                value={data.jiwa}
                onChange={(e) => setData("jiwa", e.target.value)}
              />
              {errors.jiwa && <small className="p-error">{errors.jiwa}</small>}
            </div>
            <ButtonSubmit />
          </form>
          {dataMuzakki.relation_muzzaki.map((key, index) => (
            <div
              key={index}
              className="border rounded-md p-4 w-full my-3 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Jenis Zakat:</span>{" "}
                  {key.relation_jenis_zakat.nama_zakat}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Jumlah Uang:</span>{" "}
                  {currencyFormatter(key.jumlah_uang)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Jumlah Beras:</span>{" "}
                  {key.jumlah_beras ?? 0} Liter
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-4">
                <Link
                  href={route("zakat.EditZakat", key.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm text-center block sm:inline-block"
                >
                  Edit Data
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
};
export default RekapGabungan;
