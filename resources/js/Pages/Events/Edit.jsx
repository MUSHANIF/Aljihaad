import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, event }) {
  const { data, setData, post, errors, reset } = useForm({
    name: event.name || "",
    description: event.description || "",
    date: event.date,

    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("event.update", event.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit event "{event.name}"
          </h2>
        </div>
      }
    >
      <Head title="Event" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="event_name" value="Name" />

                <TextInput
                  id="event_name"
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
              {event.image_path && (
                <div className="my-5">
                  <img src={event.image_path} className="w-64" />
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
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("event.index")}
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
    </AuthenticatedLayout>
  );
}
