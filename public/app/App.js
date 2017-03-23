import React, { Component } from 'react';
import ModalForm from './ModalForm';
import SearchContainer from './SearchContainer';
import { Menu, Segment, Input } from 'semantic-ui-react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loggedIn: true, 
      admin: 2,
      activeItem: 'customers',
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
    const context = this;
    axios.get('/api')
      .then((response) => {
        let { users, customers, parts, rfqs, quotes, pos } = response.data
        context.setState({ users, customers, parts, rfqs, quotes, pos });
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

    let obj = {
      api: name,
      payload: data
    }
    console.log('submit form', obj)

    axios.post('/api', obj)
      .then((response) => {
        cb(response);
        context.refreshDb();
      })
      .catch((error) => cb(error));
  }

  loginSubmit(e, data) {
    //send username and pw for verification
    let email = data.username
    let password = data.password

    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(
    //     (response) => {
    //       this.setState({loggedIn: true, admin: this.state.users[response.uid].admin})          
    //     }, 
    //     (error) => {
    //       this.setState({status: error.message})
    //     }
    // );
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

    return (
      <div>
        <ModalForm
          handleSubmit={this.handleSubmit.bind(this)} 
          loggedIn={loggedIn} 
          loginSubmit={this.loginSubmit.bind(this)} 
          admin={admin} 
          status={status}
        />

        <Menu attached='top' tabular>
          <Menu.Item name='customers' active={activeItem === 'customers'} onClick={this.handleItemClick} />
          <Menu.Item name='parts' active={activeItem === 'parts'} onClick={this.handleItemClick} />
          <Menu.Item name='pos' active={activeItem === 'pos'} onClick={this.handleItemClick} />
          <Menu.Item name='quotes' active={activeItem === 'quotes'} onClick={this.handleItemClick} />
          <Menu.Item name='rfqs' active={activeItem === 'rfqs'} onClick={this.handleItemClick} />
          <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} style={{display: admin > 0 ? 'flex' : 'none'}} />
          <SearchContainer source={this.state[activeItem]} />
        </Menu>

        <Segment attached='bottom'>
          <div style={{display: activeItem === 'customers' ? 'block' : 'none'}}>{}</div>
          <div style={{display: activeItem === 'parts' ? 'block' : 'none'}}>{'PARTS: ' + JSON.stringify(this.state.parts)}</div>
          <div style={{display: activeItem === 'pos' ? 'block' : 'none'}}>{'POS: ' + JSON.stringify(this.state.pos)}</div>
          <div style={{display: activeItem === 'quotes' ? 'block' : 'none'}}>{'QUOTES: ' + JSON.stringify(this.state.quotes)}</div>
          <div style={{display: activeItem === 'rfqs' ? 'block' : 'none'}}>{'RFQS: ' + JSON.stringify(this.state.rfqs)}</div>
          <div style={{display: activeItem === 'users' && admin > 0 ? 'block' : 'none'}}>{'USERS: ' + JSON.stringify(this.state.users)}</div>
        </Segment>

      </div>
    );
  }
}

export default App;
