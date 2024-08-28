import { useState, useEffect } from "react";

export default function Aktivitas() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const [modalAnimation, setModalAnimation] = useState("");

  const activities = [
    {
      icon: "fa-mosque",
      title: "Mosque Development",
      content: "Detailed content about Mosque Development...",
    },
    {
      icon: "fa-donate",
      title: "Charity & Donation",
      content: "Detailed content about Charity & Donation...",
    },
    {
      icon: "fa-quran",
      title: "Quran Learning",
      content: "Detailed content about Quran Learning...",
    },
    {
      icon: "fa-book",
      title: "Hadith & Sunnah",
      content: "Detailed content about Hadith & Sunnah...",
    },
    {
      icon: "fa-book-open",
      title: "Parent Education",
      content: "Detailed content about Parent Education...",
    },
    {
      icon: "fa-hands",
      title: "Help Orphans",
      content: "Detailed content about Helping Orphans...",
    },
  ];

  const openModal = (activity) => {
    setModalContent(activity);
    setShowModal(true);
    setModalAnimation("fade-in");
  };

  const closeModal = () => {
    setModalAnimation("fade-out");
    setTimeout(() => setShowModal(false), 300);
  };

  return (
    <div className="container-fluid activities py-5">
      <div className="container py-5">
        <div className="mx-auto text-center mb-5">
          <p className="text-xl text-primary">Activities</p>
          <h1 className="text-5xl">Here Are Our Activities</h1>
        </div>
        <div className="flex items-center justify-center ">
          <div className="flex flex-col justify-center max-w-6xl mx-auto">
            {/* Quran Learning */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-yellow-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-book text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">QURAN LEARNING</h3>
              <p className="text-gray-600 max-w-xs">
                Provide rehab facility dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor inci...
              </p>
            </div>

            {/* Main Image */}

            {/* Mosque Renovation */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-yellow-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-mosque text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">MOSQUE RENOVATION</h3>
              <p className="text-gray-600 max-w-xs">
                Provide rehab facility dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor inci...
              </p>
            </div>
          </div>

          {/* Funeral Service */}
          <div className="">
            <div className="relative p-4">
              <div className="">
                <img
                  src="https://nauthemes.com/demo/muezzin/wp-content/uploads/2023/12/tq-feat-img2.png"
                  alt="Main Service"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-yellow-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-praying-hands text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">FUNERAL SERVICE</h3>
              <p className="text-gray-600 max-w-xs">
                Provide rehab facility dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor inci...
              </p>
            </div>

            {/* Help Poor */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-yellow-600 text-white rounded-full p-4 mb-4">
                <i className="fas fa-hand-holding-heart text-2xl"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">HELP POOR</h3>
              <p className="text-gray-600 max-w-xs">
                Provide rehab facility dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor inci...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="container-fluid activities py-5">
    //   <div className="container py-5">
    //     <div className="mx-auto text-center mb-5">
    //       <p className="text-xl text-primary">Activities</p>
    //       <h1 className="text-5xl">Here Are Our Activities</h1>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {activities.map((activity, index) => (
    //         <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
    //           <div className="flex  max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
    //             <div className="w-1/4 my-auto mx-auto">
    //               <i className={`fa ${activity.icon} text-7xl text-dark`}></i>
    //             </div>
    //             <div className="max-w-fit">
    //               <h4 className="text-xl font-semibold">{activity.title}</h4>
    //               <p className="mt-2 text-gray-600 text-wrap">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                 Mollitia assumenda natus aliquid aspernatur recusandae
    //                 nesciunt dolorem, cum cupiditate, quod laudantium blanditiis
    //                 delectus molestiae fuga ut saepe fugiat! Explicabo, enim
    //                 assumenda repudiandae, officiis eum molestiae consequuntur
    //                 sequi magni obcaecati quis cumque harum iure quidem omnis
    //                 quae ex nostrum fugit odit aperiam!
    //               </p>
    //               <button
    //                 type="button"
    //                 onClick={() => openModal(activity)}
    //                 className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
    //               >
    //                 Read More
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center z-50">
    //       <div
    //         className="fixed inset-0 bg-black opacity-50"
    //         onClick={closeModal}
    //       ></div>
    //       <div
    //         className={`bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto relative animate-${modalAnimation}`}
    //       >
    //         <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
    //         <p className="text-gray-700">{modalContent.content}</p>
    //         <button
    //           type="button"
    //           onClick={closeModal}
    //           className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
