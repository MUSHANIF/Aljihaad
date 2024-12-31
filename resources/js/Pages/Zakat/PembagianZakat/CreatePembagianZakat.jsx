import React, { useContext, useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectInput from "@/Components/SelectInput";
import { BreadCrumb } from "primereact/breadcrumb";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import Layout from "@/Layouts/layout/layout.jsx";
export default function CreatePembagianZakat({
  auth,
  Total_beras,
  jumlah_zakat,
  jumlah_zakat_Amil_Fisabilillah,
}) {
  const [dataRT, setDataRT] = useState([]);
  const [DataPengambilan, setDataPengambilan] = useState([
    {
      nama: "PEMASUKAN TOTAL (ZF + FIDYAH - (25% FII SABILILAH DAN AMIL)",
      id: "1",
    },
    {
      nama: "PEMASUKAN TOTAL (25% (ZF+FIDYAH+MAAL)) + Total Infaq Shodaqoh",
      id: "2",
    },
  ]);
  const [dataJenisZakat, setDataJenisZakat] = useState([]);
  const [getRT, setRt] = useState("");
  const [JenisPengambilan, setJenisPengambilan] = useState("");
  const [getIdJenisZakat, setIdJenisZakat] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setData("tanggal", formattedDate);
  }, []);
  useEffect(() => {
    axios
      .get("/api/getRtApi")
      .then((response) => {
        setDataRT(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/getTypeOfZakat")
      .then((response) => {
        setDataJenisZakat(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const setSelectedStatusZakat = (value) => {
    setData("status_zakat", value);
  };
  const setSelectedJenisZakat = (value) => {
    setData("id_jenis_zakat", value.id);
    setIdJenisZakat(value);
  };
  const [MustahikData, setMustahikData] = useState([
    { nama_Mustahik: "", jiwa: "", nik: "" },
  ]);

  const handleAddEntry = () => {
    setMustahikData([
      ...MustahikData,
      { nama_Mustahik: "", jiwa: "", nik: "" },
    ]);
    setData("Mustahik", MustahikData);
  };

  const handleRemoveEntry = (index) => {
    const newData = MustahikData.filter((_, i) => i !== index);
    setMustahikData(newData);
    setData("Mustahik", newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...MustahikData];
    newData[index][field] = value;
    setMustahikData(newData);
    setData("Mustahik", MustahikData);
  };

  const setSelectedRt = (value) => {
    setData("id_rt", value.id);
    setRt(value);
  };
  const setSelectDataPilihan = (value) => {
    setData("nama_yayasan", "");
    setData("pilihan", value);
    setRt("");
  };

  const setSelectedWaktuZakat = (value) => {
    setData("waktu_berzakat", value);
  };
  const { data, setData, post, errors, reset } = useForm({
    alamat: "",
    telepon: "",
    pilihan: 1,
    jumlah_beras: "",
    uang: "",
    jenis_pengambilan: "",
    Mustahik: MustahikData,
    id_rt: "",
    updated_by: auth.user.id,
    created_by: auth.user.id,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", errors);
    post(route("zakat.PostPembagianZakat"));
  };
  const items = [{ label: "Zakat" }, { label: "Create Data Mustahik" }];
  const home = { icon: "pi pi-home", url: "" };
  const options = ["Yayasan", "Mustahik Dalam"];
  const [value, setValue] = useState(options[0]);
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      nama_yayasan: data.pilihan === "2" ? prevData.nama_yayasan : "",
      uang: "",
      jumlah_beras: "",
    }));

    setJenisPengambilan("");
  }, [data.pilihan]);
  return (
    <Layout>
      <Head title="Users" />

      <div className="">
        <div className="mx-auto">
          <BreadCrumb model={items} className="my-3" home={home} />
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mx-auto flex justify-center">
                <SelectButton
                  value={data.pilihan}
                  onChange={(e) => setSelectDataPilihan(e.value)}
                  options={[
                    { label: "Mustahik Rt Dalam/Luar", value: 1 },
                    { label: "Yayasan", value: 2 },
                    { label: "Fisabilillah", value: 3 },
                    { label: "Amil", value: 4 },
                  ]}
                />
              </div>

              {data.pilihan == 1 && (
                <div className="flex flex-column gap-2 my-4">
                  <label htmlFor="jenisRt">Jenis Rt</label>
                  <Dropdown
                    value={getRT}
                    onChange={(e) => setSelectedRt(e.value)}
                    options={dataRT}
                    optionLabel="nama_rt"
                    placeholder="Select a Status Zakat"
                    className="w-full"
                  />
                  {errors.id_rt && (
                    <small className="p-error">{errors.id_rt}</small>
                  )}
                </div>
              )}
              {data.pilihan == 2 && (
                <>
                  <div className="flex flex-column gap-2 my-4">
                    <label htmlFor="namaYayasan">Nama Yayasan</label>
                    <InputText
                      id="namaYayasan"
                      onChange={(e) => setData("nama_yayasan", e.target.value)}
                      value={data.nama_yayasan}
                      placeholder="Masukan Nama Yayasan"
                    />
                    {errors.nama_yayasan && (
                      <small className="p-error">{errors.nama_yayasan}</small>
                    )}
                  </div>
                  <div className="flex flex-column gap-2 my-4">
                    <label htmlFor="namaYayasan">Alamat</label>
                    <InputText
                      id="namaYayasan"
                      onChange={(e) => setData("alamat", e.target.value)}
                      value={data.alamat}
                      placeholder="Masukan Alamat"
                    />
                    {errors.alamat && (
                      <small className="p-error">{errors.alamat}</small>
                    )}
                  </div>
                  <div className="flex flex-column gap-2 my-4">
                    <label htmlFor="namaYayasan">No Telp</label>
                    <InputNumber
                      id="namaYayasan"
                      onChange={(e) => setData("telepon", e.value)}
                      value={data.telepon}
                      useGrouping={false}
                      placeholder="Masukan No Telp"
                    />
                    {errors.telepon && (
                      <small className="p-error">{errors.telepon}</small>
                    )}
                  </div>
                </>
              )}
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="jenisRt">Pengambilan uang total Zakat</label>
                <Dropdown
                  value={JenisPengambilan}
                  onChange={(e) => {
                    setJenisPengambilan(e.value);
                    setData("jenis_pengambilan", e.value.id);
                  }}
                  options={DataPengambilan}
                  optionLabel="nama"
                  placeholder="Select a Status Zakat"
                  className="w-full"
                />
                {errors.jenis_pengambilan && (
                  <small className="p-error">{errors.jenis_pengambilan}</small>
                )}
              </div>
              {JenisPengambilan.id == 1 && (
                <>
                  <div className="flex flex-column gap-2 my-4">
                    <span className="flex space-x-2">
                      <label htmlFor="jumlah_uang">Total Semua Zakat </label>
                      <Tooltip target=".custom-target-icon" />
                      <svg
                        data-pr-tooltip="PEMASUKAN TOTAL 
                          (ZF + FIDYAH - (25% FII SABILILAH DAN AMIL)"
                        className="custom-target-icon "
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1m1-8h-2V7h2z"
                        />
                      </svg>
                    </span>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">Rp</span>
                      <InputNumber
                        placeholder="Masukan Nominal Uang Zakat"
                        className="bg-gray-200"
                        value={jumlah_zakat}
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}
              {JenisPengambilan.id == 2 && (
                <>
                  <div className="flex flex-column gap-2 my-4">
                    <span className="flex space-x-2">
                      <label htmlFor="jumlah_uang">Total Semua Zakat </label>
                      <Tooltip target=".custom-target-icon" />
                      <svg
                        data-pr-tooltip="PEMASUKAN TOTAL (25% (ZF+FIDYAH+MAAL)) + Total Infaq Shodaqoh"
                        className="custom-target-icon "
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1m1-8h-2V7h2z"
                        />
                      </svg>
                    </span>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">Rp</span>
                      <InputNumber
                        placeholder="Masukan Nominal Uang Zakat"
                        className="bg-gray-200"
                        value={jumlah_zakat_Amil_Fisabilillah}
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-column gap-2 my-4">
                <label htmlFor="jumlah_uang">Total Semua Beras </label>
                <div className="p-inputgroup flex-1">
                  <InputNumber
                    placeholder="Masukan Nominal Uang Zakat"
                    className="bg-gray-200"
                    value={Total_beras}
                    disabled
                  />
                  <span className="p-inputgroup-addon">.Liter</span>
                </div>
              </div>
              <div className="border border-gray-400 border-separate p-5 mb-4">
                <div className="flex flex-column gap-2 my-4">
                  <label htmlFor="uang">Uang</label>
                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">Rp</span>
                    <InputNumber
                      value={data.uang}
                      placeholder="Masukan Nominal Uang Zakat"
                      max={
                        data.pilihan == 3
                          ? jumlah_zakat_Amil_Fisabilillah
                          : jumlah_zakat
                      }
                      onChange={(e) => setData("uang", e.value)}
                    />
                    <span className="p-inputgroup-addon">.00</span>
                  </div>
                  {errors.uang && (
                    <small className="p-error">{errors.uang}</small>
                  )}
                </div>
                <div className="flex flex-column gap-2 my-4">
                  <label htmlFor="jumlah_beras">Beras</label>
                  <div className="p-inputgroup flex-1">
                    <InputNumber
                      value={data.jumlah_beras}
                      placeholder="Masukan Nominal Beras Zakat"
                      max={Total_beras}
                      onChange={(e) => setData("jumlah_beras", e.value)}
                    />
                    <span className="p-inputgroup-addon">.Liter</span>
                  </div>
                  {errors.jumlah_beras && (
                    <small className="p-error">{errors.jumlah_beras}</small>
                  )}
                </div>
              </div>
              {/* <div>
                {MustahikData.map((entry, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 border-separate p-5 mb-4"
                  >
                    <div className="mb-5">
                      <span className="font-semibold">
                        Data Mustahik ke-{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor={`username-${index}`}>
                        Nama perwakilan Keluarga Mustahik
                      </label>
                      <InputText
                        value={entry.nama_Mustahik}
                        aria-describedby={`username-help-${index}`}
                        placeholder="Masukan Nama Mustahik"
                        onChange={(e) =>
                          handleChange(index, "nama_Mustahik", e.target.value)
                        }
                      />
                      <small
                        id={`username-help-${index}`}
                        className="justify-end ml-auto"
                      >
                        Mohon perhatikan nama Mustahik yang akan digunakan
                      </small>
                      {errors.nama_Mustahik && (
                        <small className="p-error">
                          {errors.nama_Mustahik}
                        </small>
                      )}
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor={`nik-${index}`}>Nik</label>
                      <InputText
                        value={entry.nik}
                        keyfilter="int"
                        aria-describedby={`nik-help-${index}`}
                        placeholder="Masukan Nik Mustahik"
                        onChange={(e) =>
                          handleChange(index, "nik", e.target.value)
                        }
                      />
                      <small
                        className="justify-end ml-auto"
                        id={`username-help-${index}`}
                      >
                        Nik bisa diisi bisa tidak
                      </small>
                      {errors.nik && (
                        <small className="p-error">{errors.nik}</small>
                      )}
                    </div>

                    <div className="flex flex-column gap-2 my-4">
                      <label htmlFor={`jiwa-${index}`}>
                        Jumlah anggota keluarga
                      </label>

                      <InputText
                        keyfilter="int"
                        placeholder="Masukan Jumlah Jiwa"
                        value={entry.jiwa}
                        onChange={(e) =>
                          handleChange(index, "jiwa", e.target.value)
                        }
                      />
                      {errors.jiwa && (
                        <small className="p-error">{errors.jiwa}</small>
                      )}
                    </div>

                    {MustahikData.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 rounded-lg py-1 px-2 text-white  shadow hover:bg-red-600"
                        onClick={() => handleRemoveEntry(index)}
                      >
                        Hapus Entri
                      </button>
                    )}
                  </div>
                ))}

                <div className="mt-3 flex justify-start">
                  <button
                    type="button"
                    className="bg-green-500 py-2 px-3 text-white rounded-xl shadow transition-all hover:bg-green-600"
                    onClick={handleAddEntry}
                  >
                    Tambah Data
                  </button>
                </div>
              </div> */}
              <div className="mt-4 text-right">
                <Link
                  href={route("zakat.RekapGabungan")}
                  className="bg-gray-2  00  py-2 px-3 text-gray-800 border rounded-xl shadow transition-all hover:bg-gray-300 mr-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="bg-blue-500 py-2 px-3 text-white  rounded-xl shadow transition-all hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
