/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEventListener,
  useMountEffect,
  useUnmountEffect,
} from "primereact/hooks";
import React, { useContext, useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Head, Link, usePage, router } from "@inertiajs/react";
import axios from "axios";

const AppZakat = ({ children }) => {
  const [dataRT, setDataRT] = useState([]);

  useEffect(() => {
    axios
      .get("/api/getRtApi")
      .then((response) => {
        setDataRT(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const { url } = usePage();

  return (
    <React.Fragment>
      <div className="flex justify-end m-5 gap-2">
        <nav
          className="relative z-0 flex  gap-2 rounded-xl overflow-hidden dark:border-neutral-700"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          <Link
            href="#"
            className={`hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-2 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 ${
              url === "/zakat/atk" ? "active" : ""
            }`}
            id="bar-with-underline-item-1"
            aria-selected="true"
            data-hs-tab="#bar-with-underline-1"
            aria-controls="bar-with-underline-1"
            role="tab"
          >
            Atk
          </Link>
          <Link
            href="#"
            className={`hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-2 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 ${
              url === "/zakat/RekapGabungan" ? "active" : ""
            }`}
            id="bar-with-underline-item-1"
            aria-selected="true"
            data-hs-tab="#bar-with-underline-1"
            aria-controls="bar-with-underline-1"
            role="tab"
          >
            Rekap Gabungan
          </Link>
          <Link
            href="#"
            className={`hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-2 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 ${
              url === "/zakat/RekapPerHari" ? "active" : ""
            }`}
            id="bar-with-underline-item-1"
            aria-selected="true"
            data-hs-tab="#bar-with-underline-1"
            aria-controls="bar-with-underline-1"
            role="tab"
          >
            Rekap Per Hari
          </Link>
        </nav>
        {/* {dataRT.map((rt, index) => (
          <nav
            className="relative z-0 flex border rounded-xl overflow-hidden dark:border-neutral-700"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <Link
              href="#"
              className={`hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-2 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-400 ${
                url === "/zakat/RekapRt" + rt.id ? "active" : ""
              }`}
              id="bar-with-underline-item-1"
              aria-selected="true"
              data-hs-tab="#bar-with-underline-1"
              aria-controls="bar-with-underline-1"
              role="tab"
            >
              {rt.nama_rt}
            </Link>
          </nav>
          // <Link
          //   key={index}
          //   href={route("jadwalUstad.create", { rtId: rt.id })}
          //   className="bg-primary py-2 px-4 text-white rounded-xl shadow transition-all hover:bg-blue-600"
          // >
          //   {rt.nama_rt}
          // </Link>
        ))} */}
      </div>
      <div className="layout-main">{children}</div>
    </React.Fragment>
  );
};

export default AppZakat;
