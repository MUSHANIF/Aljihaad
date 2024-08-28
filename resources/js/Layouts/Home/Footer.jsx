import React, { useState, useEffect } from "react";
import gambar from "../../../../public/assets/img/blog-mini-1.jpg";
export default function Footer() {
  return (
    <div
      className="container-fluid footer pt-5 wow fadeIn"
      data-wow-delay="0.1s"
    >
      <div className="container py-5">
        {/* <div className="row py-5">
          <div className="col-lg-7">
            <h1 className="text-light mb-0">Subscribe our newsletter</h1>
            <p className="text-secondary">Get the latest news and other tips</p>
          </div>
          <div className="col-lg-5">
            <div className="relative mx-auto">
              <input
                className="form-control border-0 w-full py-3 ps-4 pe-5"
                type="text"
                placeholder="Your email"
              />
              <button
                type="button"
                className="btn btn-primary py-2 absolute top-0 end-0 mt-2 me-2"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="col-12">
            <div className="border-top border-secondary"></div>
          </div>
        </div> */}
        <div className="row g-4 footer-inner">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item ">
              <h4 className="text-light mb-4">
                Al<span className="text-primary">Jihaad</span>
              </h4>
              <p className="mb-4 text-secondary">
                Aljihaad adalah musholla yang berada di Pondok Cipta Raya Blok C
                , yang memiliki visi dan misi untuk menjadi tempat ibadah yang
                nyaman dan tentram.
              </p>
              <a href="" className="btn btn-primary py-2 px-4">
                Donate Now
              </a>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item mt-5">
              <h4 className="text-light mb-4">Our Mosque</h4>
              <div className="flex flex-col">
                <h6 className="text-secondary mb-0">Our Address</h6>
                <div className="flex items-center border-b py-4">
                  <span className="flex-shrink-0 btn-square bg-primary me-3 p-4">
                    <i className="fa fa-map-marker-alt text-dark"></i>
                  </span>
                  <a href="" className="text-body">
                    Jl. Pondok Cipta Raya Blok C No 1
                  </a>
                </div>
                <h6 className="text-secondary mt-4 mb-0">Our Mobile</h6>
                <div className="flex items-center py-4">
                  <span className="flex-shrink-0 btn-square bg-primary me-3 p-4">
                    <i className="fa fa-phone-alt text-dark"></i>
                  </span>
                  <a href="" className="text-body">
                    +62 9856170 36426
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item mt-5">
              <h4 className="text-light mb-4">Explore Link</h4>
              <div className="flex flex-col items-start">
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Home
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>About Us
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Our Features
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Contact us
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Our Blog
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Our Events
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Donations
                </a>
                <a className="text-body mb-2" href="">
                  <i className="fa fa-check text-primary me-2"></i>Sermons
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item mt-5">
              <h4 className="text-light mb-4">Latest Post</h4>
              <div className="flex border-b border-secondary py-4">
                <img
                  src={gambar}
                  className="img-fluid  rounded-xl object-cover flex-shrink-0"
                  alt=""
                />
                <div className="ps-3">
                  <p className="mb-0 text-muted">24 July 2024</p>
                  <a href="" className="text-body font-italic">
                    "Barang siapa yang membaca surat Al-Kahfi pada hari Jum'at
                    maka dia akan disinari cahaya di antara dua Jum'at."
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="border-top border-secondary pb-4"></div>
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            &copy;All Right Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            Designed By{" "}
            <a className="border-b" href="https://htmlcodex.com">
              The MusCorp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
