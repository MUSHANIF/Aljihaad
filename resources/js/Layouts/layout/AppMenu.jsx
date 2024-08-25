import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link } from "@inertiajs/react";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
          to: route("dashboard"),
        },

        {
          label: "Jadwal Ustadz",
          icon: "pi pi-users",
          to: route("jadwalUstad.index"),
        },
        {
          label: "Events",
          icon: "pi pi-th-large",
          to: route("event.index"),
        },
        { label: "Blog", icon: "pi pi-building", to: route("blog.index") },
        {
          label: "Pengurus",
          icon: "pi pi-user",
          to: route("Pengurus.index"),
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
