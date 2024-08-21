import React, { useState } from 'react';
import BookContext from './BookContext';
import { useFlashMessage } from '../FlashMessageContext';

const BookState = (props) => {
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);
  const { setMessage } = useFlashMessage();

  const addBook = async (bookDetails, bookCover) => {
    const { title, author, isbn, genre, publicationYear, copiesAvailable, description } = bookDetails;
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('genre', JSON.stringify(genre.split(','))); // Convert genre to an array
    formData.append('publicationYear', publicationYear);
    formData.append('copiesAvailable', copiesAvailable);
    formData.append('description', description);
    if (bookCover) {
      formData.append('coverImage', bookCover); // Append cover image if available
    }

    const response = await fetch(`http://localhost:4000/api/books/addBook`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: formData
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
