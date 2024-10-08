import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import "react-quill/dist/quill.snow.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState } from "react";
import Layout from "@/Layouts/layout/layout.jsx";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    description: "",
    tanggal_kajian: "",
    status: "",
    image: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("jadwalUstad.store"));
  };
  const handleDescriptionChange = (value) => {
    setData("description", value);
  };
  const [imagePreview, setImagePreview] = useState(null);

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
  const items = [{ label: "Jadwal Ustadz" }, { label: "Create Jadwal Ustadz" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout>
      <Head title="Users" />

      <div className="">
        <div className=" mx-auto sm:px-6 ">
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
                <InputLabel
                  htmlFor="event_tanggal_kajian"
                  value="tanggal_kajian"
                />

                <TextInput
                  id="event_tanggal_kajian"
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
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  // onChange={(e) => setData("image", e.target.files[0])}
                  onChange={handleImageChange}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-4 w-64" />
              )}

              <div className="mt-4 text-right">
                <Link
                  href={route("user.index")}
                  className="bg-gray-200 py-2 rounded-xl px-3 text-gray-800  shadow transition-all hover:bg-gray-300 mr-2"
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
