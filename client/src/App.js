import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.url = React.createRef();
    this.state = {
      url: ''
    }
  }
  componentDidMount(){
    axios.get('/url')
    .then(res => {
      console.log(res);
      this.setState({
        url: res.data.url
      });
    });
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
        Url:  {this.state.url}<br/>
        <input type='text' ref={this.url}/>
        <button onClick={this.handleClick}>Set</button>
      </div>
    );
  }
}

export default App;
