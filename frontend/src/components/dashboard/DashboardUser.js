import React, { useContext, useEffect, useState } from "react";
import BookContext from "../../context/books/BookContext";

const DashboardUser = () => {
  const { books, fetchBooks, borrowBook } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);

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
    // eslint-disable-next-line
  }, []);

  // Function to handle adding books to the borrowed list
  const handleAddBook = (isbn) => {
    setBorrowedBooks((prev) => {
      const bookIndex = prev.findIndex((book) => book.isbn === isbn);
      if (bookIndex > -1) {
        // Increase the quantity of the book if it's already in the borrowed list
        const updatedBooks = [...prev];
        updatedBooks[bookIndex].quantity += 1;
        return updatedBooks;
      } else {
        // Add the book to the borrowed list with quantity 1
        return [...prev, { isbn, quantity: 1 }];
      }
    });
  };

  // Function to handle borrowing the books
  const handleBorrowBooks = () => {
    if (borrowedBooks.length > 0) {
      borrowBook(borrowedBooks);
      setBorrowedBooks([]); // Clear the borrowed list after borrowing
    } else {
      alert("Please add at least one book to borrow.");
    }
  };
  console.log(typeof(borrowedBooks));
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
                    <strong>Published Date:</strong> {book.publishedDate}
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
      <div className="mt-4">
        <h4>Borrowed Books</h4>
        {borrowedBooks.length === 0 ? (
          <p>No books selected for borrowing.</p>
        ) : (
          <ul>
            {borrowedBooks.map((book) => (
              <li key={book.isbn}>
                ISBN: {book.isbn} - Quantity: {book.quantity}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-block my-3"
          onClick={handleBorrowBooks}
        >
          Borrow Books
        </button>
      </div>
    </div>
  );
};

export default DashboardUser;
