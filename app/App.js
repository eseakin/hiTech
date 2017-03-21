import React, { Component } from 'react';
import ModalExample from './ModalExample';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [
        {
          name: '',
          number: ''
        }
      ]
    };
  }

  handleSubmit(data) {
    console.log(data)
  }

  render() {
    return (
      <div style={{height: 700}}>
        <ModalExample handleSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

export default App;