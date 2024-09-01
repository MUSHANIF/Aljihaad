import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "@/Layouts/layout/layout.jsx";
export default function Edit({ auth, jadwalUstad }) {
  const { data, setData, post, errors, reset } = useForm({
    name: jadwalUstad.name || "",
    description: jadwalUstad.description || "",
    tanggal_kajian: jadwalUstad.tanggal_kajian,
    status: jadwalUstad.status,
    _method: "PUT",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [swalShown, setSwalShown] = useState(false);

  const showSwal = () => {
    Swal.fire({
      didOpen: () => setSwalShown(true),
      didClose: () => setSwalShown(false),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    post(route("jadwalUstad.update", jadwalUstad.id));
  };
  const items = [{ label: "Jadwal Ustadz" }, { label: "Edit Jadwal Ustadz" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit event "{jadwalUstad.name}"
          </h2>
        </div>
      }
    >
      <Head title="Event" />

      <div className="">
        <div className="mx-auto ">
          <BreadCrumb model={items} className="my-3" home={home} />
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="event_description" value="description" />

                <TextAreaInput
                  id="event_description"
                  type="text"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="tanggal_kajian" value="Tanggal Kajian" />

                <TextInput
                  id="tanggal_kajian"
                  type="date"
                  name="tanggal_kajian"
                  value={data.tanggal_kajian}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("tanggal_kajian", e.target.value)}
                />

                <InputError message={errors.tanggal_kajian} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="Status" value="Status" />

                <SelectInput
                  className="w-full"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>
              {jadwalUstad.image_path && !imagePreview && (
                <div className="my-5">
                  <span className="font-bold text-black">Old Picture:</span>
                  <img src={jadwalUstad.image_path} className="w-64 " />
                </div>
              )}
              {imagePreview && (
                <div className="my-5">
                  <span className="font-bold text-black">New Picture:</span>
                  <img src={imagePreview} alt="Preview" className="w-64 " />
                </div>
              )}
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_image_path"
                  value="Event New Image"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={handleImageChange}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("jadwalUstad.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-blue-500 py-2 px-3 text-white  rounded-xl shadow transition-all hover:bg-blue-600">
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
