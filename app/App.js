import React, { Component } from 'react';
import ModalExample from './ModalExample';
import firebase from 'firebase'
import config from '../config/config'

class App extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(config);

    this.state = { loggedIn: true, db: firebase.database(), status: '' };
  }

  handleSubmit(data, cb) {
    //clean up form data for database
    delete data.failureMsg
    delete data.submitFailure
    delete data.submitSuccess
    data.partsCount++
    data.dateEntered = this.formattedDate()
    data.date = this.formattedDate(new Date(data.date))
    data.expDate = this.formattedDate(new Date(data.expDate))

    this.state.db.ref('rfq/').push(data)
      .then((err) => cb(err), (err) => cb(err));
  }

  loginSubmit(e, data) {
    //send username and pw for verification
    let email = data.username
    let password = data.password

    firebase.auth().signInWithEmailAndPassword(email, password).then((response)=>{this.setState({loggedIn: true})}, (error) => {
      this.setState({status: error.message})
    });




    // this.setState({loggedIn: true})
  }

  formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear().toString().substr(2,2));

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${month}/${day}/${year}`;
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