import TextLoop from "react-text-loop";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import nodataimages from "../../../../public/assets/images/no-data-illustration-2.svg";
export default function Hero({ handleScrollToTarget, kajianUstad }) {
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

      <div>
        {kajianUstad ? (
          <div className="absolute bottom-0 max-[576px]:left-1/2 max-[576px]:mx-5 max-[576px]:py-40 max-[576px]:w-full min-[576px]:left-1/2 transform -translate-x-1/2 translate-y-1/2 p-5 bg-white rounded-lg mx-auto shadow-lg">
            <div>
              <div className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                <div className="font-bold">Pondok Cipta Raya Blok C No 1</div>
              </div>
              <div className="flex items-center mb-4">
                <i className="fas fa-calendar-alt text-primary mr-2"></i>
                <div className="font-medium">
                  Khutbah{" "}
                  {format(
                    new Date(kajianUstad.tanggal_kajian),
                    "EEEE, d MMMM yyyy",
                    { locale: id }
                  )}
                </div>
              </div>

              <div className="border flex max-[576px]:flex-wrap max-[576px]:justify-center max-[576px]:gap-y-3 bg-white rounded-md p-3 items-center">
                <div className="mx-2">
                  <img
                    src={`/storage/${kajianUstad.image_path}`}
                    className="w-16 h-16 rounded-full object-cover"
                    alt="Ustadz"
                  />
                </div>
                <div className="ml-2 max-[576px]:text-center">
                  <h2 className="text-lg font-semibold">{kajianUstad.name}</h2>
                  <p className="text-gray-600">{kajianUstad.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="absolute bottom-0 max-[576px]:left-1/2 max-[576px]:mx-5 max-[576px]:py-40 max-[576px]:w-full min-[576px]:left-1/2 transform -translate-x-1/2 translate-y-1/2 p-5 bg-white rounded-lg mx-auto shadow-lg">
              <div>
                <div className="border flex max-[576px]:flex-wrap max-[576px]:justify-center max-[576px]:gap-y-3 bg-white rounded-md p-3 items-center">
                  <div className="ml-2 max-[576px]:text-center">
                    <img
                      src={nodataimages}
                      className="w-25 h-25  justify-center mx-auto my-3 "
                      alt="Ustadz"
                    />
                    <p className="text-lg ">
                      Maaf, Tidak ada kajian dalam waktu dekat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
