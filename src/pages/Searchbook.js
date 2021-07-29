import React, { useState } from "react";  
import axios from 'axios';  
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import background from '../images/background.jpg'
  
const SearchBook = () => {  
  const [book, setBook] = useState("");  
  const [result, setResult] = useState([]);  
  const apiKey = `${process.env.REACT_APP_API_KEY}`

  function handleChange(event) {  
      const book = event.target.value;  
      setBook(book);  
  }  
  function handleSubmit(event) {  
      event.preventDefault();  
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40")  
          .then(data => {  
              console.log(data.data.items);  
              setResult(data.data.items);  
          })  
  }  

  return (  
      <form onSubmit={handleSubmit}>  
          <div className="card-header main-search">  
          <h1>Book Search App</h1>
              <div className="row">  
                  <div className="col">  
                      <input onChange={handleChange} className="AutoFocus form-control" placeholder="Search a book..." type="text" />  
                  </div>  
                  <div className="col">  
                      <input type="submit" value="Search" className="btn btn-primary search-btn" />  
                  </div>  
              </div>  
          </div>  
          <div style={{backgroundImage: `url(${background})`, backgroundSize: "cover", height: "760px", width: "100%",  backgroundPosition: "center",backgroundRepeat: "no-repeat", display: "table", backgroundAttachment: "fixed" }}>
          <div className="container" >  
              <div className="row" >  
            
                  {result.map((book, index) => (  
                      <div className="col-sm-2" >  
                          <Card key={index} style={{ 'marginTop': '10px' }}>  
                              <Card.Img variant="top" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.title} />  
                              <Card.Body>  
                                  <h5 className="card-title">{book.volumeInfo.title}</h5>  
                                  <Link to={{
                                      pathname:`/book/${book.id}`,
                                      state: {bookId: book.id}}}>Show details</Link> 
                              </Card.Body>  
                          </Card>  
                      </div>  
                  ))}  
              </div>  
          </div>  
          </div>
      </form>  

  )  
}  
  
export default SearchBook;  