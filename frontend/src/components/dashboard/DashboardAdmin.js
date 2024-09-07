import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookContext from "../../context/books/BookContext";
import { Table, Button } from "react-bootstrap";
import { FaSort } from "react-icons/fa";

const DashboardAdmin = () => {
  const { books, fetchBooks } = useContext(BookContext);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
  const [showAll, setShowAll] = useState(false);
  const [userNames, setUserNames] = useState({});
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBooks();
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSortedBooks(books);
  }, [books]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const userIdSet = new Set();
      books.forEach(book => {
        book.borrowedBy.forEach(borrower => userIdSet.add(borrower.userId));
      });

      console.log(userIdSet);
      const userNamesObj = {};
      for (const userId of userIdSet) {
        console.log(userId)
        try {
          const response = await fetch(`http://localhost:4000/api/user/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            userNamesObj[userId] = data.enrollmentNumber;
          } else {
            console.error(`Error fetching user with id ${userId}: ${response.statusText}`);
          }
        } catch (error) {
          console.error(`Error fetching user with id ${userId}`, error);
        }
      }

      setUserNames(userNamesObj);
    };

    fetchUserNames();
  }, [books]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedItems = [...books].sort((a, b) => {
      if (key === 'borrowedBy') {
        const aBorrowers = a.borrowedBy.map(borrower => userNames[borrower.userId] || '').join(',');
        const bBorrowers = b.borrowedBy.map(borrower => userNames[borrower.userId] || '').join(',');
        return direction === 'ascending' ? aBorrowers.localeCompare(bBorrowers) : bBorrowers.localeCompare(aBorrowers);
      }
      if (key === 'borrowedDate') {
        const aDates = a.borrowedBy.map(borrower => new Date(borrower.borrowedDate)).sort();
        const bDates = b.borrowedBy.map(borrower => new Date(borrower.borrowedDate)).sort();
        return direction === 'ascending' ? aDates[0] - bDates[0] : bDates[0] - aDates[0];
      }

      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedBooks(sortedItems);
    setSortConfig({ key, direction });
  };

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Borrowed Books</h1>
      {books.length === 0 ? (
        <p>No books have been borrowed yet.</p>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th onClick={() => requestSort('title')}>
                  Title <FaSort />
                </th>
                <th onClick={() => requestSort('author')}>
                  Author <FaSort />
                </th>
                <th onClick={() => requestSort('borrowedBy')}>
                  Borrowed By <FaSort />
                </th>
                <th onClick={() => requestSort('borrowedDate')}>
                  Borrowed Date <FaSort />
                </th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks
                .filter((_, index) => showAll || index < itemsPerPage)
                .map((book) =>
                  book.borrowedBy.length > 0 ? (
                    <tr key={book.isbn}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <ul className="list-unstyled">
                          {book.borrowedBy.map((borrower) => (
                            <li key={borrower._id}>
                              {userNames[borrower.userId] || 'Loading...'}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul className="list-unstyled">
                          {book.borrowedBy.map((borrower) => (
                            <li key={borrower._id}>
                              {new Date(borrower.borrowedDate).toLocaleDateString()}
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
                  ) : null
                )}
            </tbody>
          </Table>
          {books.length > itemsPerPage && (
            <Button
              variant="link"
              onClick={handleShowMore}
              className="d-block mx-auto mt-3"
            >
              {showAll ? "See Less" : "See More"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
