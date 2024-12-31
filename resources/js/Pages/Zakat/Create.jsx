import React, { useContext, useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectInput from "@/Components/SelectInput";
import { BreadCrumb } from "primereact/breadcrumb";

import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import Layout from "@/Layouts/layout/layout.jsx";
export default function Create({ auth }) {
  const [dataRT, setDataRT] = useState([]);
  const [dataJenisZakat, setDataJenisZakat] = useState([]);
  const [getRT, setRt] = useState("");

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

  const statusZakat = ["Uang", "Beras", "Beras + Uang"];
  const waktuZakat = ["Sore", "Malam"];
  const metode_pembayaran = ["Tunai", "Transfer"];

  const [NominalData, setDataZakatNominal] = useState([]);

  const handleChange = (index, field, value) => {
    console.log(index, field, value);

    // Salin data dari NominalData
    const newData = [...NominalData];

    // Pastikan semua indeks hingga index terisi
    while (newData.length <= index) {
      newData.push({
        id_jenis_zakat: "",
        status_zakat: "",
        jumlah_uang: "",
        jumlah_beras: "",
        waktu_berzakat: "",
        metode_pembayaran: "",
      });
    }

    // Perbarui field yang diberikan
    newData[index][field] = value;

    // Filter data untuk menghapus elemen tanpa id_jenis_zakat
    const filteredData = newData.filter((item) => item.id_jenis_zakat);

    // Perbarui state
    setDataZakatNominal(filteredData);
    console.log(filteredData);
    setData("dataJenisZakat", filteredData);
  };

  const handleCheckboxChange = (index, field, value) => {
    console.log(index, field, value);
    const newData = [...NominalData];
    if (!newData[index]) {
      newData[index] = {
        id_jenis_zakat: "",
        status_zakat: "",
        jumlah_uang: "",
        jumlah_beras: "",
        waktu_berzakat: "",
        metode_pembayaran: "",
      };
    }

    newData[index][field] = value;

    // Ambil item yang telah diubah
    const selectedItem = newData[index];

    // Hapus item yang telah diubah dari posisi semula
    newData.splice(index, 1);

    // Masukkan item yang dipilih ke posisi pertama
    newData.unshift(selectedItem);
    setDataZakatNominal(newData);
    console.log(newData);
    setData("dataJenisZakat", newData);
  };

  const handleRemoveEntry = (index) => {
    const newData = NominalData.filter((_, i) => i !== index);
    setDataZakatNominal(newData);
    setData("Mustahik", newData);
  };
  const setSelectedRt = (value) => {
    setData("id_rt", value.id);
    setRt(value);
  };
  const { data, setData, post, errors, reset } = useForm({
    nama_muzakki: "",
    tanggal: "",
    jiwa: "",
    jumlah_uang: "",
    jumlah_beras: "",
    status_zakat: "",
    waktu_berzakat: "",
    metode_pembayaran: "",
    dataJenisZakat: NominalData,
    id_rt: "",
    updated_by: auth.user.id,
    created_by: auth.user.id,
  });
  const onSubmit = (e) => {
    console.log(data);
    e.preventDefault();

    post(route("zakat.PostZakat"));
  };
  const items = [{ label: "Zakat" }, { label: "Create Data Zakat" }];
  const home = { icon: "pi pi-home", url: "" };
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
              <div className="flex flex-column gap-2">
                <label htmlFor="username">
                  Nama perwakilan Keluarga Muzakki
                </label>
                <InputText
                  value={data.nama_muzakki}
                  aria-describedby="username-help"
                  placeholder="Masukan Username"
                  onChange={(e) => setData("nama_muzakki", e.target.value)}
                />
                <small id="username-help">
                  Mohon perhatikan nama Muzakki yang akan digunakan
                </small>
                {errors.nama_muzakki && (
                  <small className="p-error">{errors.nama_muzakki}</small>
                )}
              </div>

              <div className="flex flex-column gap-2 my-4 ">
                <label htmlFor="username">Tanggal</label>
                <InputText
                  id="username"
                  onChange={(e) => setData("tanggal", e.target.value)}
                  value={data.tanggal}
                  type="date"
                  aria-describedby="username-help"
                />
                <small id="username-help">
                  Tanggal akan otomatis terisi dengan tanggal hari ini
                </small>
                {errors.tanggal && (
                  <small className="p-error">{errors.tanggal}</small>
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
                {errors.jiwa && (
                  <small className="p-error">{errors.jiwa}</small>
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
              <div className="card flex justify-content-start gap-3">
                {dataJenisZakat.map((key, index) => (
                  <div>
                    <div className="flex">
                      <input
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id={`hs-default-checkbox-${key.id}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleChange(index, "id_jenis_zakat", key.id);
                          } else {
                            handleRemoveEntry(index);
                          }
                        }}
                      />
                      <label
                        htmlFor={`hs-default-checkbox-${key.id}`}
                        className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
                      >
                        {key.nama_zakat}
                      </label>
                    </div>
                    {NominalData.map(
                      (entry, indexNominal) =>
                        entry.id_jenis_zakat == key.id && (
                          <div key={indexNominal}>
                            <div className="flex flex-column gap-2 my-4">
                              <label htmlFor="status_zakat">
                                Status Zakat{" "}
                              </label>
                              <Dropdown
                                value={entry.status_zakat}
                                onChange={(e) =>
                                  handleChange(
                                    indexNominal,
                                    "status_zakat",
                                    e.value
                                  )
                                }
                                options={statusZakat}
                                optionLabel="name"
                                placeholder="Select a Status Zakat"
                                className="w-full"
                              />
                              {errors.status_zakat && (
                                <small className="p-error">
                                  {errors.status_zakat}
                                </small>
                              )}
                            </div>

                            {/* Kondisional untuk status Zakat Uang */}
                            {["Uang", "Beras + Uang"].includes(
                              entry.status_zakat
                            ) && (
                              <div className="flex flex-column gap-2 my-4">
                                <label htmlFor="jumlah_uang">Uang</label>
                                <div className="p-inputgroup flex-1">
                                  <span className="p-inputgroup-addon">Rp</span>
                                  <InputNumber
                                    placeholder="Masukan Nominal Uang Zakat"
                                    value={entry.jumlah_uang}
                                    onChange={(e) =>
                                      handleChange(
                                        indexNominal,
                                        "jumlah_uang",
                                        e.value
                                      )
                                    }
                                  />
                                  <span className="p-inputgroup-addon">
                                    .00
                                  </span>
                                </div>
                                {errors.jumlah_uang && (
                                  <small className="p-error">
                                    {errors.jumlah_uang}
                                  </small>
                                )}
                              </div>
                            )}

                            {/* Kondisional untuk status Zakat Beras atau Beras + Uang */}
                            {["Beras", "Beras + Uang"].includes(
                              entry.status_zakat
                            ) && (
                              <div className="flex flex-column gap-2 my-4">
                                <label htmlFor="jumlah_beras">Beras</label>
                                <div className="p-inputgroup flex-1">
                                  <InputNumber
                                    placeholder="Masukan Nominal Beras Zakat"
                                    value={entry.jumlah_beras}
                                    onChange={(e) =>
                                      handleChange(
                                        indexNominal,
                                        "jumlah_beras",
                                        e.value
                                      )
                                    }
                                  />
                                  <span className="p-inputgroup-addon">
                                    .Liter
                                  </span>
                                </div>
                                {errors.jumlah_beras && (
                                  <small className="p-error">
                                    {errors.jumlah_beras}
                                  </small>
                                )}
                              </div>
                            )}

                            <div className="flex flex-column gap-2 my-4">
                              <label htmlFor="waktu_berzakat">
                                Waktu Berzakat{" "}
                              </label>
                              <Dropdown
                                value={entry.waktu_berzakat}
                                onChange={(e) =>
                                  handleChange(
                                    indexNominal,
                                    "waktu_berzakat",
                                    e.value
                                  )
                                }
                                options={waktuZakat}
                                placeholder="Select a Waktu Zakat"
                                className="w-full"
                              />
                              {errors.waktu_berzakat && (
                                <small className="p-error">
                                  {errors.waktu_berzakat}
                                </small>
                              )}
                            </div>

                            <div className="flex flex-column gap-2 my-4">
                              <label htmlFor="metode_pembayaran">
                                Metode Pembayaran{" "}
                              </label>
                              <Dropdown
                                value={entry.metode_pembayaran}
                                onChange={(e) =>
                                  handleChange(
                                    indexNominal,
                                    "metode_pembayaran",
                                    e.value
                                  )
                                }
                                options={metode_pembayaran}
                                placeholder="Select a Metode Pembayaran"
                                className="w-full"
                              />
                              {errors.metode_pembayaran && (
                                <small className="p-error">
                                  {errors.metode_pembayaran}
                                </small>
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("zakat.RekapGabungan")}
                  className="bg-gray-2  00  py-2 px-3 text-gray-800 rounded-xl shadow transition-all hover:bg-gray-300 mr-2"
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
