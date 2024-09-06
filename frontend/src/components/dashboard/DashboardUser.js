import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/books/BookContext";

const DashboardUser = () => {
  const { books, fetchBooks } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    // Retrieve the borrowed books from localStorage when the component mounts
    const storedBooks = localStorage.getItem("borrowedBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const navigate = useNavigate();

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
    // eslint-disable-next-line
  },[]);
  

  // Function to handle adding books to the borrowed list and storing them in localStorage
  const handleAddBook = (isbn) => {
    const updatedBorrowedBooks = [...borrowedBooks];
    const bookIndex = updatedBorrowedBooks.findIndex((book) => book.isbn === isbn);

    if (bookIndex > -1) {
      updatedBorrowedBooks[bookIndex].quantity += 1;
    } else {
      updatedBorrowedBooks.push({ isbn, quantity: 1 });
    }

    setBorrowedBooks(updatedBorrowedBooks);
    // Store the updated borrowed books in localStorage
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

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
                    <strong>Genre:</strong> {book.genre.join(", ")}
                  </p>
                  <p className="card-text">
                    <strong>Copies Available:</strong> {book.copiesAvailable}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {book.description}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddBook(book.isbn)}
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/borrowBooks")}
      >
        See Borrowed Books
      </button>
    </div>
  );
};

export default DashboardUser;