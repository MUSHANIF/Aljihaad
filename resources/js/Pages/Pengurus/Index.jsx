import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Alert from "@/Alert";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "@/Layouts/layout/layout.jsx";
import { Message } from "primereact/message";
export default function Index({ auth, pengurus, queryParams = null, success }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("Pengurus.index"), queryParams);
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
    router.get(route("Pengurus.index"), queryParams);
  };

  const deletePengurus = (pengurus) => {
    if (!window.confirm("Are you sure you want to delete the Pengurus?")) {
      return;
    }
    router.delete(route("Pengurus.destroy", pengurus.id));
  };
  const items = [{ label: "Pengurus" }];
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
                  href={route("Pengurus.create")}
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="py-3">Image</th>
                      <th className="py-3">Image Tanda Tangan</th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name Pengurus
                      </TableHeading>

                      <TableHeading
                        name="description"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        No telepon
                      </TableHeading>

                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>

                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Pengurus Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        {" "}
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.description}
                          placeholder="Pengurus description"
                          onBlur={(e) =>
                            searchFieldChanged("description", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("description", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pengurus.data.map((key) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={key.id}
                      >
                        <td className="px-3 py-2 text-black">{key.id}</td>
                        <td className="max-[576px]:min-w-64">
                          <div className="flex justify-center items-center">
                            <img
                              src={key.image_path}
                              className="w-full h-auto max-w-[576px]:w-96"
                            />
                          </div>
                        </td>
                        <td className="max-[576px]:min-w-64">
                          <div className="flex justify-center items-center">
                            <img
                              src={key.imageTandaTangan}
                              className="w-full h-auto max-w-[576px]:w-96"
                            />
                          </div>
                        </td>

                        <th className="px-3 py-2 text-black text-nowrap hover:underline ">
                          <Link
                            className="hover:text-blue-700"
                            href={route("Pengurus.show", key.id)}
                          >
                            {key.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2 text-black"> {key.status} </td>
                        <td className="px-3 py-2 text-black text-nowrap">
                          <div className="whitespace-pre-wrap break-words">
                            {key.no_telp}
                          </div>
                        </td>

                        <td className="px-3 py-2 text-black text-nowrap">
                          <Link
                            href={route("Pengurus.edit", key.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deletePengurus(key)}
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
              <Pagination links={pengurus.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
