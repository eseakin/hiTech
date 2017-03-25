import React, { Component } from 'react';
import ModalForm from './ModalForm';
import SearchContainer from './SearchContainer';
import DisplayItemsContainer from './DisplayItemsContainer';
import { Menu, Segment, Input } from 'semantic-ui-react';
import axios from 'axios';
import firebase from 'firebase';
import lodash from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loggedIn: false, 
      admin: 2,
      userId: '',
      activeItem: 'customers',
      status: '', 
      users: {},
      customers: {},
      parts: {},
      rfqs: {},
      quotes: {},
      pos: {}
    };

    this.getConfig();
    
  }

  refreshDb() {
    const context = this;
    this.state.db.ref('/').once('value')
      .then((snapshot) => {
        let data = snapshot.val();  
        data = _.pickBy(data, (val, key) => {return val !== undefined})
        data.admin = data.users[this.state.userId].admin
        context.setState(data);
      })
      .catch((error) => console.log(error));
  }

  getConfig() {
    const context = this;
    axios.get('/config')
      .then((response) => {
        firebase.initializeApp(response.data);
        context.setState({db: firebase.database()});
      })
      .catch((error) => {console.log(error)});
  }

  handleSubmit(e, data, cb) {
    let context = this;
    let name = e.target.name
    //clean up form data for database
    delete data.failureMsg
    delete data.submitFailure
    delete data.submitSuccess

    if(name === 'rfqs') {
      data.partsCount++
      data.dateEntered = this.formattedDate()
      data.date = this.formattedDate(new Date(data.date))
      data.expDate = this.formattedDate(new Date(data.expDate))

    } else if(name === 'quotes') {

    } else if(name === 'pos') {

    } else if(name === 'parts') {

    } else if(name === 'users' && this.state.admin === 2) {
      data.dob = this.formattedDate(new Date(data.dob))

    } else if(name === 'customers') {

    }

    console.log('submit form', data)

    if(name === 'users') {
      this.state.db.ref(name + '/').child(data.userId).set(data)
        .then((response) => {
          cb(response);
          context.refreshDb();
        })
        .catch((err) => cb(error));
    } else {
      this.state.db.ref(name + '/').push(data)
        .then((response) => {
          cb(response);
          context.refreshDb();
        })
        .catch((err) => cb(error));
    }
  }

  loginSubmit(e, data) {
    //send username and pw for verification
    const context = this;
    let { username, password } = data
    username = 'e@e.com'
    password = '123456'

    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(
        (response) => {
          context.setState({loggedIn: true, userId: response.uid}) 
          context.refreshDb();
        }, 
        (error) => {
          context.setState({status: error.message})
        }
    );
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
    const { loggedIn, activeItem, admin, status } = this.state
    const source = this.state[activeItem];

    return (
      <div>
        <ModalForm
          handleSubmit={this.handleSubmit.bind(this)} 
          loggedIn={loggedIn} 
          loginSubmit={this.loginSubmit.bind(this)} 
          admin={admin} 
          status={status}
        />

        <Menu attached='top' stackable color='blue' inverted>
          <Menu.Item name='customers' active={activeItem === 'customers'} onClick={this.handleItemClick} />
          <Menu.Item name='parts' active={activeItem === 'parts'} onClick={this.handleItemClick} />
          <Menu.Item name='rfqs' active={activeItem === 'rfqs'} onClick={this.handleItemClick} />
          <Menu.Item name='quotes' active={activeItem === 'quotes'} onClick={this.handleItemClick} />
          <Menu.Item name='pos' active={activeItem === 'pos'} onClick={this.handleItemClick} />
          <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} style={{display: admin > 0 ? 'flex' : 'none'}} />
          <SearchContainer source={source} placeholder={activeItem} />
        </Menu>

        <DisplayItemsContainer source={source} type={activeItem} />

      </div>
    );
  }
}

export default App;
