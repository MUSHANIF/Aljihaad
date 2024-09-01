import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "@/Layouts/layout/layout.jsx";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    description: "",
    date: "",
    image: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("blog.store"));
  };
  const handleDescriptionChange = (value) => {
    setData("description", value);
  };
  const items = [{ label: "Blog" }, { label: "Create Blog" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout>
      <Head title="Users" />

      <div className="">
        <div className="mx-auto ">
          <BreadCrumb model={items} className="my-3" home={home} />
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
                <InputLabel htmlFor="event_date" value="date" />

                <TextInput
                  id="event_date"
                  type="date"
                  name="date"
                  value={data.date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("date", e.target.value)}
                />

                <InputError message={errors.date} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="Blog_image_path" value="Blog Image" />
                <TextInput
                  id="Blog_image_path"
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
