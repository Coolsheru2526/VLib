import React from 'react'
import BookContext from './BookContext'

const BookState = (props) => {
  const host = "http://localhost:4000";
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);

  const addBook = async () => {
    
  }

  return <BookContext.Provider value={books}>{props.children}</BookContext.Provider>;
};

export default BookState