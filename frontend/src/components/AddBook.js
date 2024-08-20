import React, { useState, useContext } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import BookContext from "../context/books/BookContext";
const AddBook = () => {
  const context = useContext(BookContext);
  const { addBook } = context;

  const [book, setBook] = useState({
    title: "addsfasdf",
    author: "adsfsa",
    isbn: "9780222033447",
    genre: "computer science",
    publicationYear: "",
    copiesAvailable: "",
    description: "dfgsdgsdfgsdfgdsfgdfgsdfgsdfgsdfgsdfgsdfgsdf",
  });
  const [coverImage, setCoverImage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    // setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook(book);
    setBook({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      publicationYear: "",
      copiesAvailable: "",
      description: "",
    })
    setCoverImage(null);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "100%", maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Add a New Book</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formTitle">
            <Form.Label column sm={4}>
              Title:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
                placeholder="Enter book title"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAuthor">
            <Form.Label column sm={4}>
              Author:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                isInvalid={!!errors.author}
                placeholder="Enter author name"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.author}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formIsbn">
            <Form.Label column sm={4}>
              ISBN:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                isInvalid={!!errors.isbn}
                placeholder="Enter ISBN number"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.isbn}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPublicationYear">
            <Form.Label column sm={4}>
              Published Date:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="date"
                name="publicationYear"
                value={book.publicationYear}
                onChange={handleChange}
                isInvalid={!!errors.publicationYear}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.publicationYear}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGenre">
            <Form.Label column sm={4}>
              Genre:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                isInvalid={!!errors.genre}
                placeholder="Enter book genre"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.genre}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formQuantity">
            <Form.Label column sm={4}>
              Copies Available:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                name="copiesAvailable"
                value={book.copiesAvailable}
                onChange={handleChange}
                isInvalid={!!errors.copiesAvailable}
                min="0"
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDescription">
            <Form.Label column sm={4}>
              Description:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                as="textarea"
                name="description"
                value={book.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
                placeholder="Enter book description"
                maxLength="500"
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCoverImage">
            <Form.Label column sm={4}>
              Cover Image:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
              />
              {coverImage && (
                <p className="mt-2">Selected file: {coverImage.name}</p>
              )}
            </Col>
          </Form.Group>

          <div className="text-center mt-4">
            <Button type="submit" variant="primary">
              Add Book
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddBook;
