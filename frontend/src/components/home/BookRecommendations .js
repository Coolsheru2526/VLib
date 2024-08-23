import React from "react";

const BookRecommendations = () => {
  const recommendations = [
    {
      title: "Book 1",
      description: "A brief description of Book 1.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      title: "Book 2",
      description: "A brief description of Book 2.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      title: "Book 3",
      description: "A brief description of Book 3.",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="display-4 text-center mb-4">Recommended Books</h2>
      <div className="row">
        {recommendations.map((book, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={book.imageUrl}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;
