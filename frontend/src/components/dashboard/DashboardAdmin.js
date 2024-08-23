import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BookContext from "../../context/books/BookContext";

const DashboardAdmin = () => {
  const { books, fetchBooks } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Borrowed Books</h1>
      {books.length === 0 ? (
        <p>No books have been borrowed yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Borrowed By</th>
                <th>Borrowed Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {books.map(
                (book) =>
                  book.borrowedBy.length > 0 && (
                    <tr key={book.isbn}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <ul className="list-unstyled">
                          {book.borrowedBy.map((borrower) => (
                            <li key={borrower.userId}>
                              {borrower.username} {/* Display username */}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul className="list-unstyled">
                          {book.borrowedBy.map((borrower) => (
                            <li key={borrower.userId}>
                              {new Date(
                                borrower.borrowedDate
                              ).toLocaleDateString()}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <Link
                          to={`/book/${book.isbn}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
