import React, { useRef } from "react";
import { Panel } from "primereact/panel";
import { Avatar } from "primereact/avatar";

import { Menu } from "primereact/menu";

import { Button } from "primereact/button";

export default function PanelZakat() {
  const configMenu = useRef(null);
  const items = [
    {
      label: "Refresh",
      icon: "pi pi-refresh",
    },
    {
      label: "Search",
      icon: "pi pi-search",
    },
    {
      separator: true,
    },
    {
      label: "Delete",
      icon: "pi pi-times",
    },
  ];

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex align-items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            size="large"
            shape="circle"
          />
          <span className="font-bold">Musthafa Hanif</span>
        </div>
        <div>
          <Menu model={items} popup ref={configMenu} id="config_menu" />
          {options.togglerElement}
        </div>
      </div>
    );
  };

  const footerTemplate = (options) => {
    const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

    return (
      <div className={className}>
        <span className="p-text-secondary">Updated 2 hours ago</span>
      </div>
    );
  };

  return (
    <Panel
      headerTemplate={headerTemplate}
      footerTemplate={footerTemplate}
      toggleable
    >
      <p className="m-0">
        Pastikan Kebenaran dalam pengisian absensi amil zakat.
      </p>
    </Panel>
  );
}
