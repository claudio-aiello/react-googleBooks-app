import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Image } from "react-bootstrap";

const DetailBook = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log(bookId);
    const apiKey = `${process.env.REACT_APP_API_KEY}`
    const FetchBook = async () => {
      try {
        const result = await axios.get(
          "https://www.googleapis.com/books/v1/volumes/" +
            bookId +
            "?key=" +
            apiKey
        );
        console.log(result.data);
        setBook(result.data);
      } catch (error) {}
    };
    // Call the API
    FetchBook();
  }, [bookId]);

  return (
    <Container fluid>
      <Link to={`/`}>Go back to search books</Link>
      {book && (
        <div className="row">
          <div className="col">
            <Image fluid style={{height: 600, width: 500}}
              alt={`${book.volumeInfo.title} book`}
              src={
                book.volumeInfo.imageLinks !== undefined
                  ? book.volumeInfo.imageLinks.thumbnail
                  : ""
              }
            />
          </div>
          <div className="col">
            <h3>
              <strong>Title:</strong> {book.volumeInfo.title}
            </h3>
            <p>
              <strong>Authors:</strong> {book.volumeInfo.authors}
            </p>
            <p>
              <strong>Published Date:</strong> {book.volumeInfo.publishedDate}
            </p>
            <p>
              <strong>Publisher:</strong> {book.volumeInfo.publisher}
            </p>
            <p>
              <strong>Page Count:</strong> {book.volumeInfo.pageCount}
            </p>
            <p>
              <strong>Description:</strong>
              {book.volumeInfo.description}
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DetailBook;
