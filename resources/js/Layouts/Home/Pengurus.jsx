import React, { useState, useEffect } from 'react';
export default function Pengurus() {        
    return (
      <div className="container-fluid team py-5">
      <div className="container py-5">
        <div
          className="text-center mx-auto mb-5 wow fadeIn"
          data-wow-delay="0.1s"
          style={{ maxWidth: '700px' }}
        >
          <p className="fs-5 text-uppercase text-primary">Our Team</p>
          <h1 className="display-3">Meet Our Organizer</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 col-xl-5">
            <div className="team-img wow zoomIn" data-wow-delay="0.1s">
              <img
                src="/assets/img/team-1.jpg"
                className="img-fluid"
                alt="Anamul Hasan"
              />
            </div>
          </div>
          <div className="col-lg-8 col-xl-7">
            <div className="team-item wow fadeIn" data-wow-delay="0.1s">
              <h1>Anamul Hasan</h1>
              <h5 className="fw-normal fst-italic text-primary mb-4">
                President
              </h5>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. aliquip ex ea commodo consequat.
              </p>
              <div className="team-icon d-flex pb-4 mb-4 border-bottom border-primary">
                <a
                  className="btn btn-primary btn-lg-square me-2"
                  href="#"
                >
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
            <div className="row g-4">
              <div className="col-md-4">
                <div className="team-item wow zoomIn" data-wow-delay="0.2s">
                  <img
                    src="/assets/img/team-2.jpg"
                    className="img-fluid w-100"
                    alt="Mustafa Kamal"
                  />
                  <div className="team-content text-dark text-center py-3">
                    <div className="team-content-inner">
                      <h5 className="mb-0">Mustafa Kamal</h5>
                      <p className="text-dark">Imam</p>
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
                        <a href="#" className="btn btn-primary btn-sm-square me-2">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="btn btn-primary btn-sm-square">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-item wow zoomIn" data-wow-delay="0.4s">
                  <img
                    src="/assets/img/team-3.jpg"
                    className="img-fluid w-100"
                    alt="Nahiyan Momen"
                  />
                  <div className="team-content text-dark text-center py-3">
                    <div className="team-content-inner">
                      <h5 className="mb-0">Nahiyan Momen</h5>
                      <p className="text-dark">Teacher</p>
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
                        <a href="#" className="btn btn-primary btn-sm-square me-2">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="btn btn-primary btn-sm-square">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-item wow zoomIn" data-wow-delay="0.6s">
                  <img
                    src="/assets/img/team-4.jpg"
                    className="img-fluid w-100"
                    alt="Asfaque Ali"
                  />
                  <div className="team-content text-dark text-center py-3">
                    <div className="team-content-inner">
                      <h5 className="mb-0">Asfaque Ali</h5>
                      <p className="text-dark">Volunteer</p>
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
                        <a href="#" className="btn btn-primary btn-sm-square me-2">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="btn btn-primary btn-sm-square">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    );
}
