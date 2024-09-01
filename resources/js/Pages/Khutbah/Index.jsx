import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { Message } from "primereact/message";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Alert from "@/Alert";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "@/Layouts/layout/layout.jsx";
export default function Index({ auth, khutbah, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("jadwalUstad.index"), queryParams);
  };
  const editUrl = route("jadwalUstad.edit", { jadwalUstad: 2 });

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
    router.get(route("jadwalUstad.index"), queryParams);
  };

  const deleteblog = (khutbah) => {
    if (!window.confirm("Are you sure you want to delete the Blog?")) {
      return;
    }
    router.delete(route("jadwalUstad.destroy", khutbah.id));
  };
  const items = [{ label: "Jadwal Ustadz" }];
  const home = { icon: "pi pi-home", url: "" };
  return (
    <Layout>
      <Head title="KHutbah" />
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
                  href={route("jadwalUstad.create")}
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
                        No
                      </TableHeading>
                      <th className="py-3 border border-gray-300 dark:border-gray-700">
                        Image
                      </th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name Ustad
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
                      <TableHeading name="status">Status</TableHeading>

                      <th className="px-3 py-3 text-right border border-gray-300 dark:border-gray-700">
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
                          placeholder="Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700"></th>
                      <th className="px-3 py-3 border border-gray-300 dark:border-gray-700">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.description}
                          placeholder="Description"
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
                    {khutbah.data.map((key, index) => (
                      <tr
                        className="bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                        key={key.id}
                      >
                        <td className="px-3 py-2 text-black border border-gray-300 dark:border-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 border border-gray-300 dark:border-gray-700">
                          <img
                            src={key.image_path}
                            style={{ width: 250, height: "100%" }}
                          />
                        </td>
                        <th className="px-3 py-2 text-black text-nowrap border border-gray-300 dark:border-gray-700">
                          {key.name}
                        </th>
                        <td className="px-3 py-2 text-black border border-gray-300 dark:border-gray-700">
                          {key.tanggal_kajian}
                        </td>
                        <td className="px-3 py-2 text-black text-nowrap border border-gray-300 dark:border-gray-700">
                          <div
                            className="whitespace-pre-wrap break-words"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(key.description),
                            }}
                          ></div>
                        </td>
                        <td className="px-3 py-2 text-black text-nowrap border border-gray-300 dark:border-gray-700">
                          {key.status}
                        </td>
                        <td className="px-3 py-2 text-black text-nowrap border border-gray-300 dark:border-gray-700">
                          <Link
                            href={route("jadwalUstad.edit", {
                              jadwalUstad: key.id,
                            })}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteblog(key)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination links={khutbah.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
