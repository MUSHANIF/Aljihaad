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
import Layout from "@/Layouts/layout/layout.jsx";
export default function Edit({ auth, penerimaan_zakat }) {
  const { data, setData, post, errors, reset } = useForm({
    nama_muzakki: penerimaan_zakat.nama_muzakki,
    // tanggal: penerimaan_zakat.tanggal,
    jiwa: penerimaan_zakat.jiwa,
    jumlah_uang: penerimaan_zakat.jumlah_uang,
    jumlah_beras: penerimaan_zakat.jumlah_beras,
    status_zakat: penerimaan_zakat.status_zakat,
    waktu_berzakat: penerimaan_zakat.waktu_berzakat,
    metode_pembayaran: penerimaan_zakat.metode_pembayaran,
    id_jenis_zakat: penerimaan_zakat.id_jenis_zakat,
    id_rt: penerimaan_zakat.id_rt,
    updated_by: penerimaan_zakat.updated_by,
    _method: "PUT",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("zakat.PutZakat", penerimaan_zakat.id));
  };
  const [dataRT, setDataRT] = useState([]);
  const [dataJenisZakat, setDataJenisZakat] = useState([]);

  const [getRT, setRt] = useState("");
  const [getIdJenisZakat, setIdJenisZakat] = useState("");

  // useEffect(() => {
  //   const today = new Date();
  //   const formattedDate = today.toISOString().split("T")[0];
  //   setData("tanggal", formattedDate);
  // }, []);
  useEffect(() => {
    axios
      .get("/api/getRtApi")
      .then((response) => {
        const data = response.data.data;
        setDataRT(response.data.data);
        data.map((item) => {
          if (item.id === penerimaan_zakat.id_rt) {
            setRt(item);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/getTypeOfZakat")
      .then((response) => {
        const data = response.data.data;
        setDataJenisZakat(response.data.data);
        data.map((item) => {
          if (item.id == penerimaan_zakat.id_jenis_zakat) {
            setIdJenisZakat(item);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const statusZakat = ["Uang", "Beras", "Beras + Uang"];
  const waktuZakat = ["Sore", "Malam"];
  const metode_pembayaran = ["Tunai", "Transfer"];

  const setSelectedStatusZakat = (value) => {
    setData("status_zakat", value);
  };
  const setSelectedJenisZakat = (value) => {
    setData("id_jenis_zakat", value.id);
    setIdJenisZakat(value);
  };
  const setSelectedRt = (value) => {
    setData("id_rt", value.id);
    setRt(value);
  };
  const setSelectedWaktuZakat = (value) => {
    setData("waktu_berzakat", value);
  };
  const setSelectedMetodePembayaranZakat = (value) => {
    setData("metode_pembayaran", value);
  };
  const items = [{ label: "Zakat" }, { label: "Edit Data Zakat" }];
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

              {/* <div className="flex flex-column gap-2 my-4 " >
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
              </div> */}
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
                <label htmlFor="username">Jenis Zakat </label>
                <Dropdown
                  value={getIdJenisZakat}
                  onChange={(e) => setSelectedJenisZakat(e.value)}
                  options={dataJenisZakat}
                  optionLabel="nama_zakat"
                  placeholder="Select a Status Zakat"
                  className="w-full "
                />
                {errors.id_jenis_zakat && (
                  <small className="p-error">{errors.id_jenis_zakat}</small>
                )}
              </div>
              <div className="flex flex-column gap-2 my-4 ">
                <label htmlFor="username">Status Zakat </label>

                <Dropdown
                  value={data.status_zakat}
                  onChange={(e) => setSelectedStatusZakat(e.value)}
                  options={statusZakat}
                  optionLabel="name"
                  placeholder="Select a Status Zakat"
                  className="w-full "
                />
                {errors.status_zakat && (
                  <small className="p-error">{errors.status_zakat}</small>
                )}
              </div>
              {["Uang"].includes(data.status_zakat) ? (
                <div className="flex flex-column gap-2 my-4 ">
                  <label htmlFor="username">Uang</label>

                  <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">Rp</span>
                    <InputNumber
                      placeholder="Masukan Nominal Uang Zakat"
                      value={data.jumlah_uang}
                      onChange={(e) => setData("jumlah_uang", e.value)}
                    />
                    <span className="p-inputgroup-addon">.00</span>
                  </div>
                  {errors.jumlah_uang && (
                    <small className="p-error">{errors.jumlah_uang}</small>
                  )}
                </div>
              ) : null}
              {["Beras", "Beras + Uang"].includes(data.status_zakat) ? (
                <div className="flex flex-column gap-2 my-4">
                  <label htmlFor="username">Beras</label>

                  <div className="p-inputgroup flex-1">
                    <InputNumber
                      placeholder="Masukan Nominal Beras Zakat"
                      value={data.jumlah_beras}
                      onChange={(e) => setData("jumlah_beras", e.value)}
                    />
                    <span className="p-inputgroup-addon">.Liter</span>
                  </div>
                  {errors.jumlah_beras && (
                    <small className="p-error">{errors.jumlah_beras}</small>
                  )}
                </div>
              ) : null}
              <div className="flex flex-column gap-2 my-4 ">
                <label htmlFor="username">Waktu Berzakat </label>
                <Dropdown
                  value={data.waktu_berzakat}
                  onChange={(e) => setSelectedWaktuZakat(e.value)}
                  options={waktuZakat}
                  placeholder="Select a Waktu Zakat"
                  className="w-full "
                />
                {errors.waktu_berzakat && (
                  <small className="p-error">{errors.waktu_berzakat}</small>
                )}
              </div>
              <div className="flex flex-column gap-2 my-4 ">
                <label htmlFor="username">Metode Pembayaran </label>
                <Dropdown
                  value={data.metode_pembayaran}
                  onChange={(e) => setSelectedMetodePembayaranZakat(e.value)}
                  options={metode_pembayaran}
                  placeholder="Select a Metode Pembayaran"
                  className="w-full "
                />
                {errors.metode_pembayaran && (
                  <small className="p-error">{errors.metode_pembayaran}</small>
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
