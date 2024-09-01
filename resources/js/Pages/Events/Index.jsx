import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import DOMPurify from "dompurify";
import { BreadCrumb } from "primereact/breadcrumb";
import Alert from "@/Alert";
import Layout from "@/Layouts/layout/layout.jsx";
import { Message } from "primereact/message";

export default function Index({ auth, events, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("event.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("event.index"), queryParams);
  };

  const deleteevent = (event) => {
    if (!window.confirm("Are you sure you want to delete the event?")) {
      return;
    }
    router.delete(route("event.destroy", event.id));
  };
  const items = [{ label: "Events" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout>
      <Head title="Events" />
      <div className="">
        <div className=" mx-auto sm:px-6 lg:px-3">
          {success && (
            <div className="">
              <Alert status={true} pesan={success} />
            </div>
          )}
          <BreadCrumb model={items} className="my-3" home={home} />

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="mb-5 flex justify-end">
                <Link
                  href={route("event.create")}
                  className="bg-blue-500 py-2 px-3 text-white  rounded-xl shadow transition-all hover:bg-blue-600"
                >
                  Add new
                </Link>
              </div>
              <Message
                severity="info"
                className="my-4"
                text="Anda hanya bisa mencari Nama dan description setelah itu tekan Enter"
              />
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-gray-300 dark:border-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap text-center">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="py-3">Image</th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name Event
                      </TableHeading>

                      <TableHeading
                        name="description"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Detail Waktu
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Keterangan
                      </TableHeading>

                      <th className="py-3 border border-gray-300 dark:border-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700"></th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700"></th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="event Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700"></th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700">
                        {" "}
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.description}
                          placeholder="event description"
                          onBlur={(e) =>
                            searchFieldChanged("description", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("description", e)}
                        />
                      </th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.data.length > 0 ? (
                      events.data.map((event, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={event.id}
                        >
                          <td className="px-3 py-2 text-black">{index + 1}</td>
                          <td className="max-[576px]:min-w-64">
                            <div className="flex justify-center items-center">
                              <img
                                src={event.image_path}
                                className="w-full h-auto max-w-[576px]:w-96"
                              />
                            </div>
                          </td>

                          <th className="px-3 py-2 text-black text-nowrap">
                            {event.name}
                          </th>
                          <td className="px-3 py-2 text-black">{event.date}</td>
                          <td className="px-3 py-2 text-black text-nowrap">
                            <div
                              className="whitespace-pre-wrap break-words"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(event.description),
                              }}
                            ></div>
                          </td>
                          <td className="px-3 py-2 text-black text-nowrap">
                            <Link
                              href={route("event.edit", event.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => deleteevent(event)}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-3 py-2 text-center text-black"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination links={events.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
