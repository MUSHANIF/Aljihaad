import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Pengurus({ pengurus }) {
  return (
    <div className="container-fluid team py-5">
      <div className="container py-5">
        <div
          className="text-center mx-auto mb-5 wow fadeIn"
          data-wow-delay="0.1s"
          style={{ maxWidth: "700px" }}
        >
          <p className="fs-5 text-uppercase text-primary">Our Team</p>
          <h1 className="display-3">Meet Our Organizer</h1>
        </div>
        <div className="row g-5">
          {pengurus
            .filter((key) => key.status.toLowerCase() == "ketua")
            .map((key, index) => (
              <div className="col-lg-4 col-xl-5">
                <div className="team-img wow zoomIn" data-wow-delay="0.1s">
                  <img
                    src={`/storage/${key.image_path}`}
                    className="img-fluid"
                    alt="Anamul Hasan"
                  />
                </div>
              </div>
            ))}
          <div className="col-lg-8 col-xl-7">
            {pengurus
              .filter((key) => key.status.toLowerCase() == "ketua")
              .map((key, index) => (
                <div className="team-item wow fadeIn" data-wow-delay="0.1s">
                  <h1>{key.name}</h1>
                  <h5 className="fw-normal fst-italic text-primary mb-4">
                    {key.status}
                  </h5>
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: key.description }}
                  ></p>
                  <div className="team-icon d-flex pb-4 mb-4 border-bottom border-primary">
                    <a className="btn btn-primary btn-lg-square me-2" href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-primary btn-lg-square me-2" href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="btn btn-primary btn-lg-square me-2">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="btn btn-primary btn-lg-square">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              ))}
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={30}
              slidesPerView={3}
              navigation
              pagination={{ clickable: false }}
              scrollbar={{ draggable: false }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {pengurus
                .filter((key) => key.status.toLowerCase() != "ketua")
                .map((key, index) => (
                  <div className="row g-4">
                    <SwiperSlide>
                      <div className="col">
                        <div
                          className="team-item wow zoomIn"
                          data-wow-delay="0.2s"
                        >
                          <img
                            src={`/storage/${key.image_path}`}
                            className="img-fluid w-100"
                            alt="Mustafa Kamal"
                          />
                          <div className="team-content text-dark text-center py-3">
                            <div className="team-content-inner">
                              <h5 className="mb-0">{key.name}</h5>
                              <p className="text-dark">{key.status}</p>
                              <div className="team-icon d-flex align-items-center justify-content-center">
                                <a
                                  className="btn btn-primary btn-sm-square me-2"
                                  href="#"
                                >
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                  className="btn btn-primary btn-sm-square me-2"
                                  href="#"
                                >
                                  <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-primary btn-sm-square me-2"
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-primary btn-sm-square"
                                >
                                  <i className="fab fa-linkedin-in"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
