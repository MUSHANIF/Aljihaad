import React, { useState, useEffect } from 'react';
export default function Event() {
  const sermons = [
    {
      date: '13 Nov 2023',
      title: 'How to get closer to Allah',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat.',
      image: '/assets/img/sermon-1.jpg',
      author: 'Admin',
    },
    {
      date: '13 Nov 2023',
      title: 'Importance of Hajj in Islam',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat.',
      image: '/assets/img/sermon-2.jpg',
      author: 'Admin',
    },
    {
      date: '13 Nov 2023',
      title: 'Importance of “Piller” of Islam',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, aliquip ex ea commodo consequat.',
      image: '/assets/img/sermon-3.jpg',
      author: 'Admin',
    },
      ];
    return (
      <div className="container-fluid sermon py-5">
      <div className="container py-5">
        <div
          className="text-center mx-auto mb-5 wow fadeIn"
          data-wow-delay="0.1s"
          style={{ maxWidth: '700px' }}
        >
          <p className="fs-5 text-uppercase text-primary">Sermons</p>
          <h1 className="display-3">Join The Islamic Community</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {sermons.map((sermon, index) => (
            <div
              className="col-lg-6 col-xl-4"
              key={index}
            >
              <div
                className="sermon-item wow fadeIn"
                data-wow-delay={`${0.1 + index * 0.2}s`}
              >
                <div className="overflow-hidden p-4 pb-0">
                  <img
                    src={sermon.image}
                    className="img-fluid w-100"
                    alt={sermon.title}
                  />
                </div>
                <div className="p-4">
                  <div className="sermon-meta d-flex justify-content-between pb-2">
                    <div>
                      <small>
                        <i className="fa fa-calendar me-2 text-muted"></i>
                        <a href="#" className="text-muted me-2">
                          {sermon.date}
                        </a>
                      </small>
                      <small>
                        <i className="fas fa-user me-2 text-muted"></i>
                        <a href="#" className="text-muted">
                          {sermon.author}
                        </a>
                      </small>
                    </div>
                    <div>
                      <a href="#" className="me-1">
                        <i className="fas fa-video text-muted"></i>
                      </a>
                      <a href="#" className="me-1">
                        <i className="fas fa-headphones text-muted"></i>
                      </a>
                      <a href="#" className="me-1">
                        <i className="fas fa-file-alt text-muted"></i>
                      </a>
                      <a href="#">
                        <i className="fas fa-image text-muted"></i>
                      </a>
                    </div>
                  </div>
                  <a href="#" className="d-inline-block h4 lh-sm mb-3">
                    {sermon.title}
                  </a>
                  <p className="mb-0">{sermon.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    );
}
