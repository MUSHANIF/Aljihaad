import about1 from "../../../../public/assets/img/about-1.jpg";
import about2 from "../../../../public/assets/img/about-2.jpg";
import about3 from "../../../../public/assets/img/about-3.jpg";

import aboutChild from "../../../../public/assets/img/about-child.jpg";
export default function About({}) {
  return (
    <div className="container-fluid py-5 ">
      <div className="container py-5">
        <div className="flex max-[768px]:flex-wrap mb-5 gap-5">
          <div className="w-full xl:w-1/2">
            <div className="flex max-[768px]:flex-wrap gap-4">
              <div className="min-[768px]:w-1/2">
                <img
                  src={about1}
                  className="w-full h-full object-cover animate-zoomIn"
                  alt="About 1"
                />
              </div>
              <div className="min-[768px]:w-1/2">
                <img
                  src={about2}
                  className="w-full pb-3 animate-zoomIn"
                  alt="About 2"
                />
                <img
                  src={about3}
                  className="w-full pt-3 animate-zoomIn"
                  alt="About 3"
                />
              </div>
            </div>
          </div>
          <div className="w-full xl:w-1/2 animate-fadeIn delay-500">
            <p className="text-lg uppercase text-primary">About AlJihaad</p>
            <h1 className="text-4xl font-bold pb-4 m-0">
              Allah Helps Those Who Help Themselves
            </h1>
            <p className="pb-4">
              Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
              mattis aliquam. Etiam quis mauris justo. Vivamus purus nulla,
              rutrum ac risus in.
            </p>
            <div className="flex flex-wrap mb-4 gap-4">
              <div className="w-full md:w-1/2 flex max-[576px]:flex-wrap  max-[576px]:text-center items-center">
                <div className="relative  flex-initial  flex  max-[576px]:mx-auto  max-[576px]:mb-5 justify-center items-center">
                  <svg
                    className="fill-tq-color2 w-48 transition duration-300 ease-in-out hover:opacity-15"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 571 568"
                    width="100%"
                    height="100%"
                  >
                    <g>
                      <path
                        fill="#D9A132"
                        d="M0,285c0-0.67,0-1.33,0-2c8.61-5.65,15.18-13.46,21.86-21.08c12.95-14.78,24.65-30.67,38.92-44.27
        c12.39-11.81,26.05-21.27,43.81-23.07c5.21-0.53,7.8-3.85,8.14-9.17c0.14-2.32,0-4.67,0.07-7c0.61-20.09,8.49-36.79,23.69-49.91
        c13.47-11.63,29.32-16.72,47-16.55c8.94,0.08,11.26-1.9,12.49-10.58c1.22-8.56,4.35-16.37,9-23.63
        c10.24-15.99,24.68-27.83,38.95-39.88C258.17,25.84,273.4,14.89,285,0c0.33,0,0.67,0,1,0c6.55,8.74,14.71,15.85,22.97,22.88
        c15.09,12.85,31.11,24.65,44.7,39.18c10.15,10.85,18.56,22.71,21.11,37.84c1.86,11.03,3.11,11.91,14.23,12.05
        c22.71,0.29,41.49,8.96,55.43,27.06c10.02,13.02,14.41,27.95,13.81,44.42c-0.26,7.06,2.42,10.55,8.64,11.21
        c13.63,1.46,25.04,7.58,35.44,16.05c16.03,13.05,28.27,29.59,41.62,45.12c8.35,9.71,16.32,19.82,27.04,27.18c0,0.67,0,1.33,0,2
        c-3.95,2-6.83,5.29-9.91,8.32c-14.07,13.8-25.61,29.82-38.79,44.4c-15.6,17.24-31.93,33.31-56.87,35.93
        c-4.4,0.46-6.9,3.84-7.16,8.41c-0.14,2.49,0.01,5-0.07,7.5c-0.6,20.1-8.54,36.79-23.69,49.92c-13.73,11.91-29.96,16.89-48,16.59
        c-7.18-0.12-10.55,2.32-11.23,8.56c-1.41,12.92-7.15,23.81-15.07,33.76c-9.61,12.09-21.44,21.85-33.15,31.75
        c-14.23,12.03-29.54,22.9-41.07,37.86c-0.33,0-0.67,0-1,0c-6.7-8.83-14.98-16.06-23.36-23.19c-15.09-12.85-31.09-24.66-44.67-39.22
        c-10.99-11.78-19.64-24.78-21.33-41.43c-0.53-5.23-3.87-7.84-9.15-8.09c-1.83-0.09-3.67,0.06-5.5-0.01
        c-27.59-1.15-48.35-13.34-61.23-38.08c-5.52-10.6-7.38-21.98-7.04-33.87c0.19-6.69-2.56-10.1-8.63-10.75
        c-13.62-1.47-25.03-7.59-35.44-16.06c-16.04-13.04-28.3-29.56-41.61-45.12C18.72,302.43,10.67,292.41,0,285z"
                      ></path>
                    </g>
                  </svg>
                  <div className="absolute flex justify-center items-center w-full h-full z-10">
                    <i className="fa fa-eye fa-4x text-white"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h5>Our Vision</h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt asperiores esse quisquam eligendi assumenda
                    molestias, quaerat amet omnis? Expedita, qui et voluptas
                    ipsa quia saepe ex facilis sed voluptatem, rerum vitae aut
                    quasi tempora modi mollitia architecto eum voluptates iste
                    doloribus perferendis! Dolorum odit quod corrupti nam
                    exercitationem sapiente blanditiis.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex max-[576px]:flex-wrap  max-[576px]:text-center items-center">
                <div className="relative hover:bg flex-initial  flex  max-[576px]:mx-auto  max-[576px]:mb-5 justify-center items-center">
                  <svg
                    className="fill-tq-color2 w-48"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 571 568"
                    width="100%"
                    height="100%"
                  >
                    <g>
                      <path
                        fill="#D9A132"
                        d="M0,285c0-0.67,0-1.33,0-2c8.61-5.65,15.18-13.46,21.86-21.08c12.95-14.78,24.65-30.67,38.92-44.27
        c12.39-11.81,26.05-21.27,43.81-23.07c5.21-0.53,7.8-3.85,8.14-9.17c0.14-2.32,0-4.67,0.07-7c0.61-20.09,8.49-36.79,23.69-49.91
        c13.47-11.63,29.32-16.72,47-16.55c8.94,0.08,11.26-1.9,12.49-10.58c1.22-8.56,4.35-16.37,9-23.63
        c10.24-15.99,24.68-27.83,38.95-39.88C258.17,25.84,273.4,14.89,285,0c0.33,0,0.67,0,1,0c6.55,8.74,14.71,15.85,22.97,22.88
        c15.09,12.85,31.11,24.65,44.7,39.18c10.15,10.85,18.56,22.71,21.11,37.84c1.86,11.03,3.11,11.91,14.23,12.05
        c22.71,0.29,41.49,8.96,55.43,27.06c10.02,13.02,14.41,27.95,13.81,44.42c-0.26,7.06,2.42,10.55,8.64,11.21
        c13.63,1.46,25.04,7.58,35.44,16.05c16.03,13.05,28.27,29.59,41.62,45.12c8.35,9.71,16.32,19.82,27.04,27.18c0,0.67,0,1.33,0,2
        c-3.95,2-6.83,5.29-9.91,8.32c-14.07,13.8-25.61,29.82-38.79,44.4c-15.6,17.24-31.93,33.31-56.87,35.93
        c-4.4,0.46-6.9,3.84-7.16,8.41c-0.14,2.49,0.01,5-0.07,7.5c-0.6,20.1-8.54,36.79-23.69,49.92c-13.73,11.91-29.96,16.89-48,16.59
        c-7.18-0.12-10.55,2.32-11.23,8.56c-1.41,12.92-7.15,23.81-15.07,33.76c-9.61,12.09-21.44,21.85-33.15,31.75
        c-14.23,12.03-29.54,22.9-41.07,37.86c-0.33,0-0.67,0-1,0c-6.7-8.83-14.98-16.06-23.36-23.19c-15.09-12.85-31.09-24.66-44.67-39.22
        c-10.99-11.78-19.64-24.78-21.33-41.43c-0.53-5.23-3.87-7.84-9.15-8.09c-1.83-0.09-3.67,0.06-5.5-0.01
        c-27.59-1.15-48.35-13.34-61.23-38.08c-5.52-10.6-7.38-21.98-7.04-33.87c0.19-6.69-2.56-10.1-8.63-10.75
        c-13.62-1.47-25.03-7.59-35.44-16.06c-16.04-13.04-28.3-29.56-41.61-45.12C18.72,302.43,10.67,292.41,0,285z"
                      ></path>
                    </g>
                  </svg>
                  <div className="absolute flex justify-center items-center w-full h-full z-10">
                    <i className="fa fa-flag fa-4x text-white"></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h5>Our Vision</h5>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt asperiores esse quisquam eligendi assumenda
                    molestias, quaerat amet omnis? Expedita, qui et voluptas
                    ipsa quia saepe ex facilis sed voluptatem, rerum vitae aut
                    quasi tempora modi mollitia architecto eum voluptates iste
                    doloribus perferendis! Dolorum odit quod corrupti nam
                    exercitationem sapiente blanditiis.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-3 mb-4">
              <div className="flex max-[768px]:flex-wrap items-center justify-center gap-4">
                <div className="w-1/4">
                  <img
                    src={aboutChild}
                    className="w-full rounded-full"
                    alt="About Child"
                  />
                </div>
                <div className="min-[768px]:w-1/2">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor
                    mattis aliquam. Etiam quis mauris justo.
                  </p>
                </div>
                <div className="min-[768px]:w-1/4 text-center">
                  <h2 className="mb-0 text-primary">$20,46</h2>
                  <h5 className="mb-0">Raised</h5>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-1/2">
                <p className="mb-2">
                  <i className="fa fa-check text-primary mr-3"></i>Charity &
                  Donation
                </p>
                <p className="mb-0">
                  <i className="fa fa-check text-primary mr-3"></i>Parent
                  Education
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p className="mb-2">
                  <i className="fa fa-check text-primary mr-3"></i>Hadith &
                  Sunnah
                </p>
                <p className="mb-0">
                  <i className="fa fa-check text-primary mr-3"></i>Mosque
                  Development
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center bg-primary py-5 animate-fadeIn delay-100">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <div className="w-full lg:w-1/6">
              <i className="fa fa-mosque fa-5x text-white"></i>
            </div>
            <div className="w-full lg:w-7/12 text-center lg:text-left">
              <h1 className="mb-0 text-white text-center text-3xl">
                Every Muslim Needs To Realize The Importance Of The "Pillar" Of
                Islam
              </h1>
            </div>
            <div className="w-full lg:w-1/6">
              <a href="#" className="btn btn-light py-2 px-4">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
