import React, { useState,useContext } from "react";
import BookContext from "../../context/books/BookContext";

const BorrowBook = () => {
  const { borrowBook } = useContext(BookContext);
  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    // Retrieve borrowed books from localStorage when component mounts
    const storedBooks = localStorage.getItem("borrowedBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  // Function to increase the quantity of a borrowed book
  const increaseQuantity = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks.map((book) =>
      book.isbn === isbn ? { ...book, quantity: book.quantity + 1 } : book
    );
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  // Function to decrease the quantity of a borrowed book
  const decreaseQuantity = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks
      .map((book) =>
        book.isbn === isbn && book.quantity > 1
          ? { ...book, quantity: book.quantity - 1 }
          : book
      )
      .filter((book) => book.quantity > 0);

    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  // Function to remove a book from the borrowed list
  const removeBook = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks.filter((book) => book.isbn !== isbn);
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  // Function to handle borrowing books
  const handleBorrowBooks = async () => {
    try {
      await borrowBook(borrowedBooks); // Borrow the books using the context
      setBorrowedBooks([]); // Clear local state
      localStorage.removeItem("borrowedBooks"); // Clear localStorage
    } catch (error) {
      console.error("Failed to borrow books:", error);
    }
  };

  return (
    <div className="mt-4">
      <h4>Borrowed Books</h4>
      {borrowedBooks.length === 0 ? (
        <p>No books selected for borrowing.</p>
      ) : (
        <ul>
          {borrowedBooks.map((book) => (
            <li key={book.isbn}>
              ISBN: {book.isbn} - Quantity: {book.quantity}
              <div>
                <button
                  className="btn btn-sm btn-secondary mx-2"
                  onClick={() => decreaseQuantity(book.isbn)}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-secondary mx-2"
                  onClick={() => increaseQuantity(book.isbn)}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeBook(book.isbn)}
                >
                  Remove
                </button>
              </div>
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
  );
};

export default BorrowBook;
