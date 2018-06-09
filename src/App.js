import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Posting,Home} from './components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/posting" component={Posting} />
        </div>
  </Router>
    );
  }
}

export default App;
