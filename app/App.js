import React, { Component } from 'react';
import ModalExample from './ModalExample';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div>
        <ModalExample />
      </div>
    );
  }
}

export default App;