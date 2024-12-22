// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
// import { Head, Link } from "@inertiajs/react";

// export default function Dashboard({
//   auth,
//   totalPendingTasks,
//   myPendingTasks,
//   totalProgressTasks,
//   myProgressTasks,
//   totalCompletedTasks,
//   myCompletedTasks,
//   activeTasks,
// }) {
//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={
//         <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
//           Dashboard
//         </h2>
//       }
//     >
//       <Head title="Dashboard" />

//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               <h3 className="text-amber-500 text-2xl font-semibold">
//                 Jumlah Pengurus
//               </h3>
//               <p className="text-xl mt-4">
//                 <span className="mr-2">{myPendingTasks}</span>/
//                 <span className="ml-2">{totalPendingTasks}</span>
//               </p>
//             </div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               <h3 className="text-blue-500 text-2xl font-semibold">
//                 Blog Aktif
//               </h3>
//               <p className="text-xl mt-4">
//                 <span className="mr-2">{myProgressTasks}</span>/
//                 <span className="ml-2">{totalProgressTasks}</span>
//               </p>
//             </div>
//           </div>
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               <h3 className="text-green-500 text-2xl font-semibold">
//                 Event yang akan datang
//               </h3>
//               <p className="text-xl mt-4">
//                 <span className="mr-2">{myCompletedTasks}</span>/
//                 <span className="ml-2">{totalCompletedTasks}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               <h3 className="text-gray-200 text-xl font-semibold">
//                 My Active Tasks
//               </h3>

//               <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
//                   <tr>
//                     <th className="px-3 py-3">ID</th>
//                     <th className="px-3 py-3">Project Name</th>
//                     <th className="px-3 py-3">Name</th>
//                     <th className="px-3 py-3">Status</th>
//                     <th className="px-3 py-3">Due Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {activeTasks.data.map((task) => (
//                     <tr key={task.id}>
//                       <td className="px-3 py-2">{task.id}</td>
//                       <td className="px-3 py-2 text-white hover:underline">
//                         <Link href={route("project.show", task.project.id)}>
//                           {task.project.name}
//                         </Link>
//                       </td>
//                       <td className="px-3 py-2 text-white hover:underline">
//                         <Link href={route("task.show", task.id)}>
//                           {task.name}
//                         </Link>
//                       </td>
//                       <td className="px-3 py-2">
//                         <span
//                           className={
//                             "px-2 py-1 rounded text-nowrap text-white " +
//                             TASK_STATUS_CLASS_MAP[task.status]
//                           }
//                         >
//                           {TASK_STATUS_TEXT_MAP[task.status]}
//                         </span>
//                       </td>
//                       <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </AuthenticatedLayout>
//   );
// }
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "@/Layouts/layout/context/layoutcontext";
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "#2f4860",
      borderColor: "#2f4860",
      tension: 0.4,
    },
    {
      label: "Second Dataset",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: "#00bb7e",
      borderColor: "#00bb7e",
      tension: 0.4,
    },
  ],
};

const Dashboard = ({
  totalZakatAll,
  PersentaseKenaikanTotalZakat,
  PersentaseKenaikanFitrah,
  PersentaseKenaikanMal,
  PersentaseKenaikanFidyah,
  totalAkumulasiFormatted,
  AkumulasiMal,
  AkumulasiFitrah,
  AkumulasiZakat,
  AkumulasiFidyah,
  AkumulasiInfaq,
}) => {
  const [products, setProducts] = useState([]);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [lineOptions, setLineOptions] = useState({});
  const { layoutConfig } = useContext(LayoutContext);

  const applyLightTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  const applyDarkTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  useEffect(() => {
    if (layoutConfig.colorScheme === "light") {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }, [layoutConfig.colorScheme]);

  return (
    <Layout>
      <div className="grid">
        <DashboardInfoCard
          title="Total Zakat tahun ini"
          value={totalZakatAll + " zakat"}
          icon="map-marker"
          iconColor="blue"
          descriptionValue={PersentaseKenaikanTotalZakat + " %"}
          descriptionText="since last year"
        ></DashboardInfoCard>
        <DashboardInfoCard
          title="Pendapatan zakat fitrah ditahun ini"
          value={"Rp " + AkumulasiFitrah}
          icon="map-marker"
          iconColor="orange"
          descriptionValue={PersentaseKenaikanFitrah + " %"}
          descriptionText="since last year"
        ></DashboardInfoCard>
        <DashboardInfoCard
          title="Pendapatan zakat mal ditahun ini"
          value={"Rp " + AkumulasiMal}
          icon="inbox"
          iconColor="cyan"
          descriptionValue={PersentaseKenaikanMal + " %"}
          descriptionText="since last year"
        ></DashboardInfoCard>

        <DashboardInfoCard
          title="Pendapatan Fidyah"
          icon="comment"
          value={"Rp " + AkumulasiFidyah}
          iconColor="purple"
          descriptionValue={PersentaseKenaikanFidyah + " %"}
          descriptionText="since last year"
        ></DashboardInfoCard>

        <DashboardInfoCard
          title="Total infaq dan pemasukan amil zakat"
          value={"Rp " + totalAkumulasiFormatted}
          icon="sort-numeric-up"
          col={4}
          iconColor="blue"
          descriptionValue=""
          descriptionText="Pemasukan Total untuk amil zakat + infaq"
        ></DashboardInfoCard>
        <DashboardInfoCard
          title="Pemasukan Utama Total untuk amil dan fisabilillah"
          value={"Rp " + AkumulasiZakat}
          icon="sort-numeric-up"
          col={4}
          iconColor="blue"
          descriptionValue=""
          descriptionText="25% x Zakat Fitrah + Zakat Maal + Fidyah pada tahun ini"
        ></DashboardInfoCard>
        <DashboardInfoCard
          title="Pemasukan Infaq"
          value={"Rp " + AkumulasiInfaq}
          icon="sort-numeric-up"
          col={4}
          iconColor="blue"
          descriptionValue=""
          descriptionText="*Diambil dari keseluruhan data pada tahun ini"
        ></DashboardInfoCard>

        <div className="col-12 xl:col-12">
          <div className="card">
            <h5>Sales Overview</h5>
            <Chart type="line" data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className="col-12 xl:col-6">
          <div className="card">
            <div className="flex justify-content-between align-items-center mb-5">
              <h5>Amil Zakat paling Rajin</h5>
              <div>
                <Button
                  type="button"
                  icon="pi pi-ellipsis-v"
                  rounded
                  text
                  className="p-button-plain"
                  onClick={(event) => menu1.current?.toggle(event)}
                />
                <Menu
                  ref={menu1}
                  popup
                  model={[
                    { label: "Add New", icon: "pi pi-fw pi-plus" },
                    { label: "Remove", icon: "pi pi-fw pi-minus" },
                  ]}
                />
              </div>
            </div>
            <ul className="list-none p-0 m-0">
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Space T-Shirt
                  </span>
                  <div className="mt-1 text-600">Clothing</div>
                </div>
                <div className="mt-2 md:mt-0 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-orange-500 h-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                  <span className="text-orange-500 ml-3 font-medium">%50</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Portal Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-cyan-500 h-full"
                      style={{ width: "16%" }}
                    />
                  </div>
                  <span className="text-cyan-500 ml-3 font-medium">%16</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Supernova Sticker
                  </span>
                  <div className="mt-1 text-600">Accessories</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-pink-500 h-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <span className="text-pink-500 ml-3 font-medium">%67</span>
                </div>
              </li>
              <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div>
                  <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                    Wonders Notebook
                  </span>
                  <div className="mt-1 text-600">Office</div>
                </div>
                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                  <div
                    className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <span className="text-green-500 ml-3 font-medium">%35</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
