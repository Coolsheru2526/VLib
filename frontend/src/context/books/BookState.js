import React, { useState } from "react";
import BookContext from "./BookContext";
import { useFlashMessage } from "../FlashMessageContext";

const BookState = (props) => {
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);
  const { setMessage } = useFlashMessage();

  const addBook = async (bookDetails, bookCover) => {
    const {
      title,
      author,
      isbn,
      publishedDate,
      genre,
      copiesAvailable,
      description,
    } = bookDetails;
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(bookDetails);
    // console.log(bookCover);
    // console.log(bookCover.mimetype);
    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);
    formData.append("publishedDate", publishedDate);
    formData.append("genre", JSON.stringify(genre)); // Convert genre array to string
    formData.append("copiesAvailable", copiesAvailable);
    formData.append("description", description);

    // Append the book cover image to the form data, or use default URL if no image is provided
    if (bookCover) {
      formData.append("coverImage", bookCover);
    }

    const response = await fetch(`http://localhost:4000/api/books/addBook`, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      credentials: "include",
      body: formData, // Use FormData as the body
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      setBooks([...books, json.book]);
      setMessage(json.message, 'success');
    } else {
      setMessage(json.message, 'error');
    }
  };
  return (
    <BookContext.Provider value={{ books, addBook }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
