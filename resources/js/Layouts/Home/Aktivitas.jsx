export default function Aktivitas({}) {
  return (
    <div className="container-fluid activities py-5">
      <div className="container py-5">
        <div className="mx-auto text-center mb-5">
          <p className="text-xl text-primary">Activities</p>
          <h1 className="text-5xl">Here Are Our Activities</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
              <div className="w-1/2 my-auto">
                <i className="fa fa-mosque text-7xl  text-dark"></i>
              </div>
              <div className="">
                <h4 className="text-xl font-semibold">Mosque Development</h4>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                  mattis aliquam.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
              <div className="w-1/2 my-auto">
                <i className="fa fa-donate text-7xl text-dark"></i>
              </div>
              <div className="">
                <h4 className="text-xl font-semibold">Charity & Donation</h4>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                  mattis aliquam.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
              <div className="w-1/2 my-auto">
                <i className="fa fa-quran text-7xl text-dark"></i>
              </div>
              <div className="">
                <h4 className="text-xl font-semibold">Quran Learning</h4>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                  mattis aliquam.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
              <div className="w-1/2 my-auto">
                <i className="fa fa-book text-7xl text-dark"></i>
              </div>
              <div className="">
                <h4 className="text-xl font-semibold">Hadith & Sunnah</h4>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                  mattis aliquam.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
              <div className="w-1/2 my-auto">
                <i className="fa fa-book-open text-7xl text-dark"></i>
              </div>
              <div className="">
                <h4 className="text-xl font-semibold">Parent Education</h4>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                  mattis aliquam.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex max-[576px]:flex-wrap max-[576px]:text-center max-[576px]:items-center max-[576px]:justify-center mt-4 gap-5">
              <div className="w-1/2 my-auto">
                <i className="fa fa-hands text-7xl text-dark"></i>
              </div>
              <div className="">
                <h4 className="text-xl font-semibold">Help Orphans</h4>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                  mattis aliquam.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
