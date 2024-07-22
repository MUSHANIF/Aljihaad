import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    status: "",
    gender: "",
    no_telp: "",
    umur: "",
    description: "",
    image: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("Pengurus.store"));
  };
  const handleDescriptionChange = (value) => {
    setData("description", value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create New Pengurus
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="Name" />

                <TextInput
                  id="user_name"
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
                <InputLabel htmlFor="status" value="Status" />

                <SelectInput
                  name="status"
                  id="status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="ketua">Ketua Devisi</option>
                  <option value="wakil">Wakil Devisi</option>
                  <option value="sekretaris1">Sekretaris 1</option>
                  <option value="sekretaris2">Sekretaris 2</option>
                  <option value="bendahara1">Bendahara 1 </option>
                  <option value="bendahara2">Bendahara 2</option>
                  <option value="jamaah">Jamaah</option>
                </SelectInput>
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="gender" value="Gender" />

                <SelectInput
                  name="gender"
                  id="gender"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("gender", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Laki - laki">Laki - laki</option>
                  <option value="Perempuan">Perempuan</option>
                </SelectInput>
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="Umur" />

                <TextInput
                  id="user_name"
                  type="text"
                  name="umur"
                  value={data.umur}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("umur", e.target.value)}
                />

                <InputError message={errors.umur} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="No_telp" />

                <TextInput
                  id="user_name"
                  type="number"
                  name="no_telp"
                  value={data.no_telp}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("no_telp", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="event_description" value="description" />

                <ReactQuill
                  value={data.description}
                  onChange={handleDescriptionChange}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                  className="mt-1 block w-full"
                />

                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="project_image_path"
                  value="Image Pengurus"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("user.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
