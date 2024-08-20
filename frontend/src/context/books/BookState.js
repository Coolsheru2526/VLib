import React, {useState} from 'react'
import BookContext from './BookContext'
import { useFlashMessage } from '../FlashMessageContext';

const BookState = (props) => {
  // const host = "http://localhost:4000";
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);
  const {setMessage} = useFlashMessage();

  const addBook = async (bookDetails, bookCover) => {
    const {title, author, isbn, genre, publicationYear, copiesAvailable, description} = bookDetails;
    const token = localStorage.getItem('token');
    console.log(bookDetails);
    console.log(token);
    

    const response = await fetch(`http://localhost:4000/api/books/addBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        title,
        author,
        isbn,
        genre,
        publicationYear,
        copiesAvailable,
        description,
      }),
    });

    const json = await response.json();
    console.log(json)

    if (json.success) {
      setBooks([...books, json.book]);
      setMessage(json.message, "success");
    } else {
      setMessage(json.message, "error");
    }
  }

  return <BookContext.Provider value={{books, addBook}}>{props.children}</BookContext.Provider>;
};

export default BookState