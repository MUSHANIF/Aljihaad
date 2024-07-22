import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
export default function Event({blog}) {

    
  
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
          {blog.map((key, index) => (
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
                       src={`/storage/${key.image_path}`}
                    className="img-fluid w-100"
                    alt={key.title}
                  />
                <div className="bg-primary d-inline px-3 py-2 text-center text-white position-absolute top-0 end-0">
                  { format(new Date(key.created_at), 'dd MMM yyyy, HH:mm')}
                </div>
                </div>
                <div className="p-4">
                  <div className="blog-meta d-flex justify-content-between pb-2">
                    <div>
                      <small>
                        <i className="fas fa-user me-2 text-muted"></i>
                        <a href="#" className="text-muted me-2">
                          
                          By {key.created_by_user.name}
                        </a>
                      </small>
                      <small>
                        <i className="fa fa-comment-alt me-2 text-muted"></i>
                        <a href="#" className="text-muted me-2">
                          {key.comments} Comments
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
                    {key.title}
                  </a>
                  <p className="mb-4"> <div
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{ __html: key.description}}
                  ></div></p>
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
