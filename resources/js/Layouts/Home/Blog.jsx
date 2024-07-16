import React, { useState, useEffect } from 'react';
export default function Event() {
  const blogs = [
    {
      date: '01 Jan 2045',
      title: 'Importance of “Piller” of Islam',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat.',
      image: '/assets/img/blog-1.jpg',
      author: 'Admin',
      comments: 12,
    },
    {
      date: '01 Jan 2045',
      title: 'How to get closer to Allah',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat.',
      image: '/assets/img/blog-2.jpg',
      author: 'Admin',
      comments: 12,
    },
    {
      date: '01 Jan 2045',
      title: 'Importance of Hajj in Islam',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat.',
      image: '/assets/img/blog-3.jpg',
      author: 'Admin',
      comments: 12,
    },
      ];
    return (
      <div className="container-fluid py-5">
      <div className="container py-5">
        <h1
          className="display-3 mb-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          Latest From <span className="text-primary">Our Blog</span>
        </h1>
        <div className="row g-4 justify-content-center">
          {blogs.map((blog, index) => (
            <div
              className="col-lg-6 col-xl-4"
              key={index}
            >
              <div
                className="blog-item wow fadeIn"
                data-wow-delay={`${0.1 + index * 0.2}s`}
              >
                <div className="blog-img position-relative overflow-hidden">
                  <img
                    src={blog.image}
                    className="img-fluid w-100"
                    alt={blog.title}
                  />
                  <div className="bg-primary d-inline px-3 py-2 text-center text-white position-absolute top-0 end-0">
                    {blog.date}
                  </div>
                </div>
                <div className="p-4">
                  <div className="blog-meta d-flex justify-content-between pb-2">
                    <div>
                      <small>
                        <i className="fas fa-user me-2 text-muted"></i>
                        <a href="#" className="text-muted me-2">
                          By {blog.author}
                        </a>
                      </small>
                      <small>
                        <i className="fa fa-comment-alt me-2 text-muted"></i>
                        <a href="#" className="text-muted me-2">
                          {blog.comments} Comments
                        </a>
                      </small>
                    </div>
                    <div>
                      <a href="#">
                        <i className="fas fa-bookmark text-muted"></i>
                      </a>
                    </div>
                  </div>
                  <a href="#" className="d-inline-block h4 lh-sm mb-3">
                    {blog.title}
                  </a>
                  <p className="mb-4">{blog.description}</p>
                  <a href="#" className="btn btn-primary px-3">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    );
}
