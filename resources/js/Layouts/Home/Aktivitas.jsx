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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
                <div className="w-1/2 my-auto">
                  <i className={`fa ${activity.icon} text-7xl text-dark`}></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{activity.title}</h4>
                  <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                    mattis aliquam.
                  </p>
                  <button
                    type="button"
                    onClick={() => openModal(activity)}
                    className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div
            className={`bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto relative animate-${modalAnimation}`}
          >
            <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
            <p className="text-gray-700">{modalContent.content}</p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
