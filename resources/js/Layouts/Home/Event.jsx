import React, { forwardRef } from "react";
import DOMPurify from "dompurify";

const Event = forwardRef(({ event }, ref) => {
  return (
    <div className="container-fluid event py-5" ref={ref}>
      <div className="container py-5">
        <h1 className="display-3 mb-5 wow fadeIn" data-wow-delay="0.1s">
          Upcoming <span className="text-primary">Events</span>
        </h1>
        {event.map((key, index) => (
          <div
            className="row g-4 event-item wow fadeIn"
            data-wow-delay={`${0.1 + index * 0.2}s`}
            key={index}
          >
            <div className="col-3 col-lg-2 pe-0">
              <div className="text-center border-b border-dark py-3 px-2">
                <h6>{key.date}</h6>
                {/* <p className="mb-0">{key.time}</p> */}
              </div>
            </div>
            <div className="col-9 col-lg-6 border-l border-dark pb-5">
              <div className="ms-3">
                <h4 className="mb-3">{key.name}</h4>
                <p className="mb-4">
                  <div
                    className="whitespace-pre-wrap break-words"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(key.description),
                    }}
                  ></div>
                </p>
                <a href="#" className="btn btn-primary px-3">
                  Join Now
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="overflow-hidden mb-5">
                <img
                  src={`/storage/${key.image_path}`}
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Event;
