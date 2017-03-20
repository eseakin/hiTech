import React from 'react';
import { Button } from 'semantic-ui-react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div>
        <Button primary>+</Button>
      </div>
    );
  }
}
