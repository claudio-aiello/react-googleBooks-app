import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchBook from "./pages/Searchbook.js";
import DetailBook from "./pages/Detailbook.js";

const NoMatchRoute = () => <div>404 Page</div>;

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={SearchBook} />
          <Route path="/book/:bookId" exact component={DetailBook} />
          <Route component={NoMatchRoute} />
        </Switch>
      </Router>

  );
};

export default App; 
