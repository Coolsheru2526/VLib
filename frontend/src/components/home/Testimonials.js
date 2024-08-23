import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      text: "VLib has transformed the way I read and manage books. Highly recommended!",
    },
    {
      name: "Jane Smith",
      text: "A fantastic platform with a vast collection. The user experience is top-notch.",
    },
    {
      name: "Alice Johnson",
      text: "I love the community features. It's great to connect with fellow book lovers.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="display-4 text-center mb-4">What Our Users Say</h2>
      <div className="row">
        {testimonials.map((testimonial, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <p className="card-text">"{testimonial.text}"</p>
                <h5 className="card-title text-end">- {testimonial.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
