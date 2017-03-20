import React, { Component } from 'react';
import ModalExample from './ModalExample';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div style={{height: 700}}>
        <ModalExample />
      </div>
    );
  }
}

export default App;