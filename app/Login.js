import React, {Component} from 'react'
import RFQInputForm from './RFQInputForm';
import { Button, Header, Form } from 'semantic-ui-react'

class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = { username: '', password: '' };
  }

  handleChange({target: {name, value}}) {
    this.setState({[name]: value})
  }

  handleSubmit(e) {
    this.props.loginSubmit(e, this.state)
  }

  render() {
    return(
      <Form success={this.props.loggedIn}>
        <Form.Field>
          <label>Username</label>
          <input placeholder='Username' name='username' value={this.state.username} onChange={this.handleChange.bind(this)}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)}/>
        </Form.Field>
        <Button type='button' onClick={(e) => this.handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    )
  }

};

export default Login;