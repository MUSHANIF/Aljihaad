import TextLoop from "react-text-loop";
import ustadadi from "../../../../public/assets/img/ustadadi.jpg";
export default function Hero({ handleScrollToTarget }) {
  return (
    <div className="container-fluid hero-header max-[576px]:mb-32 relative ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-7/12">
            <div className="hero-header-inner max-[576px]:mb-32 max-[576px]:flex max-[576px]:flex-col max-[576px]:items-center max-[576px]:text-center p-4">
              <p className="text-xl md:text-2xl text-dark mb-2 md:mb-4">
                Selamat Datang di Musholla Aljihaad
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-3 md:my-5 text-dark">
                <TextLoop>
                  <span className="relative inline-block p-2 text-black rounded-lg text-shadow-glow">
                    Purity Comes From Faith
                  </span>
                  <span className="relative inline-block p-2 text-black rounded-lg text-shadow-glow">
                    Faith Brings Purity
                  </span>
                  <span className="relative inline-block p-2 text-black rounded-lg text-shadow-glow">
                    Embrace Your Faith
                  </span>
                  <span className="relative inline-block p-2 text-black rounded-lg text-shadow-glow">
                    Faith is Our Strength
                  </span>
                </TextLoop>
              </h1>
              <a
                className="btn btn-primary py-2 px-4 mt-2 md:mt-4 inline-block"
                onClick={handleScrollToTarget}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 max-[576px]:left-1/2 max-[576px]:mx-5 max-[576px]:py-40  max-[576px]:w-full min-[576px]:left-1/2 transform -translate-x-1/2 translate-y-1/2 p-5 bg-white rounded-lg mx-auto shadow-lg">
        <div className="">
          <div className="flex items-center mb-2">
            <i className="fas fa-map-marker-alt text-primary mr-2"></i>
            <div className="font-bold">Pondok Cipta Raya Blok A No 1</div>
          </div>
          <div className="flex items-center mb-4">
            <i className="fas fa-calendar-alt text-primary mr-2"></i>
            <div className="font-medium">Khutbah Jumat, 3 Oktober 2024</div>
          </div>

          <div className="border flex max-[576px]:flex-wrap bg-white rounded-md p-3 items-center">
            <div className="mx-2">
              <img
                src={ustadadi}
                className="w-16 h-16 rounded-full object-cover"
                alt="Ustadz"
              />
            </div>
            <div className="ml-2">
              <h2 className="text-lg font-semibold">Ustadz Adi Hidayat</h2>
              <p className="text-gray-600">Founder Quantum Akhyar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
