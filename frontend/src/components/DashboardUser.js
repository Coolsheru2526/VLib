import React, { useContext, useEffect, useState } from "react";
import BookContext from "../context/books/BookContext";
import Book from "./Book";

const DashboardUser = () => {
  const { books, fetchBooks } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books when the component mounts
  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Books List</h2>
      <button onClick={fetchBooks} className="btn btn-primary mb-3">
        Refresh Books
      </button>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : books.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No books available.
        </div>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mb-4" key={book.isbn}>
              <div className="card h-100">
                <img
                  src={book.coverImage || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={`${book.title} cover`}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Author: {book.author}
                  </h6>
                  <p className="card-text">
                    <strong>ISBN:</strong> {book.isbn}
                  </p>
                  <p className="card-text">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    <strong>Published Date:</strong> {book.publishedDate}
                  </p>
                  <p className="card-text">
                    <strong>Copies Available:</strong> {book.copiesAvailable}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {book.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
