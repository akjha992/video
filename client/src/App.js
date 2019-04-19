import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.url = React.createRef();
  }
  handleClick(){
    console.log(this.url.current.value);
    axios.post('/setUrl',{url: this.url.current.value})
    .then(res => {
      console.log(res);
    }
    );
  }
  render() {
    return (
      <div>
        <input type='text' ref={this.url}/>
        <button onClick={this.handleClick}>Set</button>
      </div>
    );
  }
}

export default App;
