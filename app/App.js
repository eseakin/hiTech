import React, { Component } from 'react';
import ModalExample from './ModalExample';
import firebase from 'firebase'
import config from '../config/config'

class App extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(config);

    this.state = { loggedIn: false, db: firebase.database(), status: '' };
  }

  handleSubmit(data, cb) {
    //send form data to database
    console.log(data)
    this.state.db.ref('rfq/').push(data)
      .then((err) => cb(err), (err) => cb(err));
  }

  loginSubmit(e, obj) {
    //send username and pw for verification
    this.setState({loggedIn: true})
  }

  render() {
    return (
      <div>
        <ModalExample handleSubmit={this.handleSubmit.bind(this)} loggedIn={this.state.loggedIn} loginSubmit={this.loginSubmit.bind(this)}/>
        <div>{this.state.status}</div>
      </div>
    );
  }
}

export default App;