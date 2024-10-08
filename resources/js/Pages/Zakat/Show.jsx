import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { BreadCrumb } from "primereact/breadcrumb";
import ReactQuill from "react-quill";
import Layout from "@/Layouts/layout/layout.jsx";
const items = [{ label: "Pengurus" }, { label: "Detail Pengurus" }];
const home = { icon: "pi pi-home", url: "" };
export default function Show({ auth, Pengurus }) {
  return (
    <Layout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Task "${Pengurus.name}"`}
          </h2>
          <Link
            href={route("Pengurus.edit", Pengurus.id)}
            className="bg-blue-500 py-2 px-3 text-white  rounded-xl shadow transition-all hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Task "${Pengurus.name}"`} />
      <div className="">
        <div className="mx-auto">
          <BreadCrumb model={items} className="my-3" home={home} />
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={Pengurus.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg">Id Pengurus</label>
                    <p className="mt-1">{Pengurus.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Name</label>
                    <p className="mt-1">{Pengurus.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Status</label>
                    <p className="mt-1">
                      <span className="px-2 py-1 rounded ">
                        {Pengurus.status}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">No telepon</label>
                    <p className="mt-1">
                      <span className="px-2 py-1 rounded  ">
                        {Pengurus.no_telp}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{Pengurus.name}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Gender</label>
                    <p className="mt-1">{Pengurus.gender}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Umur</label>
                    <p className="mt-1">{Pengurus.umur} tahun</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Role</label>
                    <p className="mt-1">{Pengurus.role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg">Task Description</label>
                <p
                  className="mt-1"
                  dangerouslySetInnerHTML={{ __html: Pengurus.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
