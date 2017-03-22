import React, { Component } from 'react';
import ModalExample from './ModalExample';
import { Menu, Segment, Input } from 'semantic-ui-react'
import firebase from 'firebase'
import config from '../config/config'

class App extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(config);

    this.state = { 
      loggedIn: true, 
      admin: true,
      activeItem: 'customers',
      db: firebase.database(), 
      status: '', 
      users: {},
      customers: {},
      parts: {},
      rfqs: {},
      quotes: {},
      pos: {}
    };
  }

  componentWillMount() {
    this.refreshDb()
  }

  refreshDb() {
    this.state.db.ref('/').once('value').then((snapshot) => {
      let data = snapshot.val();
      
      let { users, customers, parts, rfqs, quotes, pos } = data

      this.setState({ users, customers, parts, rfqs, quotes, pos })
    });
  }

  handleSubmit(e, data, cb) {
    let name = e.target.name
    console.log('submit form', this.state)
    //clean up form data for database
    delete data.failureMsg
    delete data.submitFailure
    delete data.submitSuccess
    data.partsCount++
    data.dateEntered = this.formattedDate()
    data.date = this.formattedDate(new Date(data.date))
    data.expDate = this.formattedDate(new Date(data.expDate))

    this.state.db.ref(name + '/').push(data)
      .then((err) => {cb(err); this.refreshDb()}, (err) => cb(err));
  }

  loginSubmit(e, data) {
    //send username and pw for verification
    let email = data.username
    let password = data.password

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          if(this.state.users[response.uid] === 'admin')
            this.setState({loggedIn: true, admin: true})          
          else
            this.setState({loggedIn: true})
        }, 
        (error) => {
          this.setState({status: error.message})
        }
    );

    console.log('submit login')
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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { loggedIn, activeItem, admin } = this.state

    return (
      <div>
        <ModalExample handleSubmit={this.handleSubmit.bind(this)} loggedIn={loggedIn} loginSubmit={this.loginSubmit.bind(this)} admin={this.state.admin} />

        <Menu attached='top' tabular>
          <Menu.Item name='customers' active={activeItem === 'customers'} onClick={this.handleItemClick} />
          <Menu.Item name='parts' active={activeItem === 'parts'} onClick={this.handleItemClick} />
          <Menu.Item name='pos' active={activeItem === 'pos'} onClick={this.handleItemClick} />
          <Menu.Item name='quotes' active={activeItem === 'quotes'} onClick={this.handleItemClick} />
          <Menu.Item name='rfqs' active={activeItem === 'rfqs'} onClick={this.handleItemClick} />
          <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input transparent icon={{ name: 'search', link: true }} placeholder={'Search ' + activeItem} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          <div style={{display: activeItem === 'customers' ? 'block' : 'none'}}>{'CUSTOMERS: ' + JSON.stringify(this.state.customers)}</div>
          <div style={{display: activeItem === 'parts' ? 'block' : 'none'}}>{'PARTS: ' + JSON.stringify(this.state.parts)}</div>
          <div style={{display: activeItem === 'pos' ? 'block' : 'none'}}>{'POS: ' + JSON.stringify(this.state.pos)}</div>
          <div style={{display: activeItem === 'quotes' ? 'block' : 'none'}}>{'QUOTES: ' + JSON.stringify(this.state.quotes)}</div>
          <div style={{display: activeItem === 'rfqs' ? 'block' : 'none'}}>{'RFQS: ' + JSON.stringify(this.state.rfqs)}</div>
          <div style={{display: activeItem === 'users' ? 'block' : 'none'}}>{'USERS: ' + JSON.stringify(this.state.users)}</div>
        </Segment>

      </div>
    );
  }
}

export default App;