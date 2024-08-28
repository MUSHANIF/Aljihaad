/* eslint-disable @next/next/no-img-element */

import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "./context/layoutcontext";
import { Link } from "@inertiajs/react";

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 128 128"
        >
          <path
            fill="#eebf72"
            d="m10.43 124.25l.15-44.32l1.71-1.34h102.89l2.1.96l-.08 44.7z"
          />
          <path
            fill="#cf701d"
            d="M10.72 75.91c-.42.14-.16 4.45-.16 4.45l106.75-.21s.73-4.21.17-4.77c-.56-.55-106.76.53-106.76.53"
          />
          <path
            fill="#fbdaa6"
            d="m94.66 21.59l.06 13.12l-4.95.05s-.07 5.72.1 5.78c.37.12 11.56 2.65 11.56 2.65l14.25-2.52l.17-5.62l-5.03-.05l.11-14.19l-11.3-.79zm-.82 23.61l-.14 78.98h17.03l.86-79.98zM42.52 66.3s-1.63 3.14-1.63 3.37s.35 54.7.35 54.7h45.39s1.16-54.46.81-54.93c-.35-.46-44.92-3.14-44.92-3.14M17.23 21.36l-.03 13.46l-4.88-.01s-.23 5.62.12 5.93c.52.46 14.94 2.69 14.94 2.69s10.57-2.14 10.81-2.71c.15-.36.19-5.54.19-5.54l-5.2-.05l.08-14.33l-9.66-.89zm-.56 24.4l.6 78.49h16.98l-.05-79.16z"
          />
          <path
            fill="#eebf72"
            d="M12.41 40.71H38.2l-4 5.49l-17.53.11zm4.41 26.75l17.31-.13l.07 5.62l-17.32.06zm6.42 51.31h4.91V82.91l-2.19-2.9l-2.39 2.84zm76.78 1.01l4.59-.06l.25-37.08l-2.39-3.23l-2.32 3.23zM93.95 66.1l-.07 5.75h17.25l.07-5.81zm-.13-19.64l17.76-.06l4.1-5.73l-25.87-.15z"
          />
          <path
            fill="#cf701d"
            d="m40.97 85.06l-.06-5.45l46.53-.09l-.07 5.58z"
          />
          <path
            fill="#b7885a"
            d="m97.79 24.07l3.79.01l-.03 10.02l-3.79.03zm6.59.03H108l-.03 10.03l-3.65.03zm-84.34-.04h3.68l-.03 10.02l-3.68.04zm6.58.03h3.63l-.03 10.03l-3.66.03zm21.17 46.29c-4.96 0-4.55 5.77-4.55 5.77l8.82-.06c-.01 0 .45-5.71-4.27-5.71m6.34 5.77s-.52-5.65 4.55-5.77c4.73-.11 4.27 5.71 4.27 5.71zm31.6-.24s.98-5.59-4.44-5.7c-5.2-.11-4.6 5.76-4.6 5.76zm-11.36.06s.98-5.82-4.44-5.7c-5.14.12-4.6 5.76-4.6 5.76zm4.68 48.4l.13-14.7l2.52-3.08s-2.63-1.2-2.64-4.15c-.02-3.98 4.1-6.61 4.1-6.61s4 2.35 3.93 6.75c-.04 2.6-2.65 4.06-2.65 4.06l2.49 3.2s-.22 14.49-.3 14.55c-.09.05-7.58-.02-7.58-.02m-37.98 0c-.1-.03.05-14.93.05-14.93l2.6-2.79s-2.5-1.7-2.58-4.01c-.2-5.4 3.99-6.82 3.99-6.82s4.18 2.3 3.83 6.75c-.21 2.72-2.55 4.05-2.55 4.05l2.52 3l-.13 14.78s-7.63 0-7.73-.03"
          />
          <path
            fill="#966737"
            d="M64.32 88.06s-11.29 3.52-10.84 12.74c.2 4.04 3.13 5.81 3.13 5.81l-2.9 3.05l-.11 14.7l20.73.02l.06-14.76l-2.79-2.96s2.79-1.73 2.91-6.15c.21-8.76-10.19-12.45-10.19-12.45"
          />
          <path
            fill="#ffa828"
            d="m40.89 69.68l46.55-.23s2.48-2.96 2-10.18c-.45-6.73-4.79-10.84-4.79-10.84l-28.64.49l-13-.11s-3.61 3.97-3.93 10.66c-.27 5.96 1.81 10.21 1.81 10.21"
          />
          <path
            fill="#fcc11a"
            d="M64.11 34.26s-8.47 3.1-15.1 8.49c-5.04 4.11-6.46 6.67-6.46 6.67s-1.73 17.83 21.61 18.29c20.63.41 20.51-19.28 20.51-19.28s-4.23-5.03-8.71-7.78c-5.95-3.64-11.85-6.39-11.85-6.39"
          />
          <path
            fill="#ffa828"
            d="M67.26 33.53c0-1.73-1.4-3.13-3.12-3.13s-3.17 1.07-3.28 2.79c-.15 2.18 1.21 3.55 3.21 3.54c1.72.01 3.19-1.47 3.19-3.2"
          />
          <path
            fill="#ffa828"
            d="m54.43 15.99l-2.38 3.36s-.74 12.86 12.25 12.86c11.72 0 12.57-11.27 11.78-11.78c-.39-.26-5.49 5.84-5.72 5.9s-9.18-.63-9.41-.92c-.22-.3-6.52-9.42-6.52-9.42"
          />
          <path
            fill="#fcc11a"
            d="M64.19 12.65c-.37.32.9 4.12.9 4.12s-1.99 2.97-1.7 3.44s3.23.23 3.23.23s2.37 2.42 3 2.31c.63-.12 1.33-3.17 1.33-3.17s3.41-.92 3.46-1.5c.06-.58-2.99-2.64-2.99-2.64s.22-3.42-.07-3.65c-.29-.24-3.35 1.72-3.35 1.72s-3.35-1.27-3.81-.86"
          />
          <path
            fill="#fcc11a"
            d="M67.19 8.66c.04.46-6.06 1.56-7.16 6.93c-1.12 5.49 1.96 9.18 7.68 9.52c5.71.35 6.75-5.48 8.37-4.73c.54.25-1.67 9.18-11.72 8.95c-8.9-.2-12.2-6.74-12.29-9.35c-.23-6.35 3.58-10.22 7.45-11.66c3.51-1.31 7.55-1.04 7.67.34"
          />
          <path
            fill="#ffa828"
            d="M94.38 21.82c.41.25 16.54.25 16.78.06s.49-2.67.52-3.75c.1-3.39-.74-4.95-.74-4.95s-15.83-.33-16.21.06c-.39.39-.76 2.17-.81 4.45c-.04 2.5.22 3.98.46 4.13m-77.29-.35c.32.27 16.16.25 16.31.06s.72-2.63.66-4.23c-.08-2.23-.49-3.08-.79-3.66c-.62-1.21-15.36-1.62-15.8-.79s-1.03 2.59-1.05 4.7c-.02 1.62.33 3.63.67 3.92"
          />
          <path
            fill="#fcc11a"
            d="M27.95 4.12c0 1.45-1.35 2.81-2.81 2.81s-2.62-1.32-2.62-2.76s1.26-2.81 2.72-2.81s2.71 1.31 2.71 2.76m77.65-.01c0 1.46-1.19 2.6-2.68 2.6s-2.66-1.18-2.66-2.64s1.18-2.64 2.66-2.64s2.68 1.22 2.68 2.68"
          />
          <path
            fill="#fcc11a"
            d="M94.47 13.69s1.04 4.73 8.06 4.98c7.56.27 8.48-5.39 8.48-5.39s-1.09-2.23-2.73-4.02c-1.74-1.91-4.4-3.67-5.43-3.67c-.95 0-3.69 1.5-5.49 3.48c-1.98 2.17-2.89 4.4-2.89 4.62M25.23 5.36c-.45 0-3.67 2.27-4.99 3.75c-1.92 2.17-2.77 3.73-2.77 3.73s.51 5.63 7.53 5.78c7.55.16 8.28-4.97 8.28-4.97s-1.24-2.39-3.23-4.56c-2.1-2.29-4.82-3.73-4.82-3.73"
          />
        </svg>
        <span className="mx-2 font-extrabold">AlJihaadKu</span>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-user" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}
      >
        <Link
          href={route("profile.edit")}
          className="p-link layout-topbar-button"
        >
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </Link>
        <Link
          href={route("logout")}
          method="post"
          as="button"
          className="p-link layout-topbar-button"
        >
          <i className="pi pi-lock"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;