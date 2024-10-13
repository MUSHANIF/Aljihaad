import React, { useContext, useState, useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectInput from "@/Components/SelectInput";
import { BreadCrumb } from "primereact/breadcrumb";
import TextInput from "@/Components/TextInput";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import Layout from "@/Layouts/layout/layout.jsx";
export default function Create({ auth }) {
  const [dataPengurus, setDataPengurus] = useState([]);
  const [dataJenisZakat, setDataJenisZakat] = useState([]);
  const [getRT, setRt] = useState("");
  const [getIdJenisZakat, setIdJenisZakat] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setData("tanggal_pembelian", formattedDate);
  }, []);
  useEffect(() => {
    axios
      .get("/api/PengurusZakat")
      .then((response) => {
        setDataPengurus(response.data.data);
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
  const [atkData, setatkData] = useState([
    { nama_barang: "", harga_barang: "", total_barang: "", foto_struk: "" },
  ]);

  const handleAddEntry = () => {
    setatkData([
      ...atkData,
      { nama_barang: "", harga_barang: "", total_barang: "", foto_struk: "" },
    ]);
    setData("atkData", atkData);
  };

  const handleRemoveEntry = (index) => {
    const newData = atkData.filter((_, i) => i !== index);
    setatkData(newData);
    setData("atkData", newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...atkData];
    newData[index][field] = value;
    setatkData(newData);
    setData("atkData", atkData);
  };

  const setSelectedAmil = (value) => {
    setData("id_amil", value.id);
    setRt(value);
  };
  const setSelectedWaktuZakat = (value) => {
    setData("waktu_berzakat", value);
  };
  const { data, setData, post, errors, reset } = useForm({
    tanggal_pembelian: "",
    atkData: atkData,
    id_amil: "",
    updated_by: auth.user.id,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route("zakat.PostDataAtk"));
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
                  onChange={(e) => setData("tanggal_pembelian", e.target.value)}
                  value={data.tanggal_pembelian}
                  type="date"
                  aria-describedby="username-help"
                />
                <small id="username-help">
                  Tanggal akan otomatis terisi dengan tanggal hari ini dan bisa
                  diubah
                </small>
                {errors.tanggal_pembelian && (
                  <small className="p-error">{errors.tanggal_pembelian}</small>
                )}
              </div>
              <div className="flex flex-column gap-2 my-4 ">
                <label htmlFor="username">Nama Amil yang mengisi </label>
                <Dropdown
                  value={getRT}
                  onChange={(e) => setSelectedAmil(e.value)}
                  options={dataPengurus}
                  optionLabel="name"
                  placeholder="Select a Status Zakat"
                  className="w-full "
                />
                {errors.id_amil && (
                  <small className="p-error">{errors.id_amil}</small>
                )}
              </div>
              <div>
                {atkData.map((entry, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 border-separate p-5 mb-4"
                  >
                    <div className="mb-5">
                      <span className="font-semibold">
                        Data Barang ke-{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor={`username-${index}`}>Nama barang</label>
                      <InputText
                        value={entry.nama_barang}
                        aria-describedby={`username-help-${index}`}
                        placeholder="Masukan Nama nama barang"
                        onChange={(e) =>
                          handleChange(index, "nama_barang", e.target.value)
                        }
                      />
                      <small
                        id={`username-help-${index}`}
                        className="justify-end ml-auto"
                      >
                        Mohon perhatikan nama Barang
                      </small>
                      {errors.nama_barang && (
                        <small className="p-error">{errors.nama_barang}</small>
                      )}
                    </div>
                    <div className="flex flex-column gap-2">
                      <label htmlFor={`nik-${index}`}>Total Harga Barang</label>
                      <InputNumber
                        value={entry.harga_barang}
                        keyfilter="int"
                        aria-describedby={`nik-help-${index}`}
                        placeholder="Masukan Total Harga Barang"
                        onChange={(e) =>
                          handleChange(index, "harga_barang", e.value)
                        }
                      />
                      {errors.harga_barang && (
                        <small className="p-error">{errors.harga_barang}</small>
                      )}
                    </div>

                    <div className="flex flex-column gap-2 my-4">
                      <label htmlFor={`jiwa-${index}`}>Total Barang</label>

                      <InputNumber
                        min={0}
                        max={100}
                        placeholder="Masukan Total Barang"
                        value={entry.total_barang}
                        onChange={(e) =>
                          handleChange(index, "total_barang", e.value)
                        }
                      />
                      {errors.total_barang && (
                        <small className="p-error">{errors.total_barang}</small>
                      )}
                    </div>
                    <div className="flex flex-column gap-2 my-4">
                      <label htmlFor={`jiwa-${index}`}>
                        Foto Struk Pembelian
                      </label>

                      <TextInput
                        id="project_image_path"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                          handleChange(index, "foto_struk", e.target.files[0])
                        }
                      />
                      {errors.foto_struk && (
                        <small className="p-error">{errors.foto_struk}</small>
                      )}
                    </div>

                    {atkData.length > 1 && (
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
