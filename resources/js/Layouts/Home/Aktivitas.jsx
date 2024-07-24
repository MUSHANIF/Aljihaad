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
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="hs-large-modal"
                  data-hs-overlay="#hs-large-modal"
                  className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-primary-dark"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          <div
            id="hs-large-modal"
            class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
            role="dialog"
            tabindex="-1"
            aria-labelledby="hs-large-modal-label"
          >
            <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
              <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                  <h3
                    id="hs-large-modal-label"
                    class="font-bold text-gray-800 dark:text-white"
                  >
                    Modal title
                  </h3>
                  <button
                    type="button"
                    class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                    aria-label="Close"
                    data-hs-overlay="#hs-large-modal"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                <div class="p-4 overflow-y-auto">
                  <p class="mt-1 text-gray-800 dark:text-neutral-400">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                </div>
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    data-hs-overlay="#hs-large-modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Save changes
                  </button>
                </div>
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
