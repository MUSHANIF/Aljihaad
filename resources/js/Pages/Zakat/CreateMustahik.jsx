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
export default function Create({ auth }) {
  const [dataRT, setDataRT] = useState([]);
  const [dataJenisZakat, setDataJenisZakat] = useState([]);
  const [getRT, setRt] = useState("");
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
  const [muzakkiData, setMuzakkiData] = useState([
    { nama_muzakki: "", jiwa: "", nik: "" },
  ]);

  const handleAddEntry = () => {
    setMuzakkiData([...muzakkiData, { nama_muzakki: "", jiwa: "", nik: "" }]);
    setData("muzakki", muzakkiData);
  };

  const handleRemoveEntry = (index) => {
    const newData = muzakkiData.filter((_, i) => i !== index);
    setMuzakkiData(newData);
    setData("muzakki", newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...muzakkiData];
    newData[index][field] = value;
    setMuzakkiData(newData);
    setData("muzakki", muzakkiData);
  };

  const setSelectedRt = (value) => {
    setData("id_rt", value.id);
    setRt(value);
  };
  const setSelectedWaktuZakat = (value) => {
    setData("waktu_berzakat", value);
  };
  const { data, setData, post, errors, reset } = useForm({
    tanggal: "",
    muzakki: muzakkiData,
    id_rt: "",
    updated_by: auth.user.id,
    created_by: auth.user.id,
  });
  const onSubmit = (e) => {
    e.preventDefault();

    console.log(data);
    post(route("zakat.PostMustahik"));
  };
  const items = [{ label: "Zakat" }, { label: "Create Data Mustahik" }];
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
              <div>
                {muzakkiData.map((entry, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 border-separate p-5 mb-4"
                  >
                    <div className="mb-5">
                      <span className="font-semibold">
                        Data Muzakki ke-{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor={`username-${index}`}>
                        Nama perwakilan Keluarga Muzakki
                      </label>
                      <InputText
                        value={entry.nama_muzakki}
                        aria-describedby={`username-help-${index}`}
                        placeholder="Masukan Nama Muzakki"
                        onChange={(e) =>
                          handleChange(index, "nama_muzakki", e.target.value)
                        }
                      />
                      <small
                        id={`username-help-${index}`}
                        className="justify-end ml-auto"
                      >
                        Mohon perhatikan nama Muzakki yang akan digunakan
                      </small>
                      {errors.nama_muzakki && (
                        <small className="p-error">{errors.nama_muzakki}</small>
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

                    {muzakkiData.length > 1 && (
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
