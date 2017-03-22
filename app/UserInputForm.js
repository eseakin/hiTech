import React, {Component} from 'react'
import { Button, Checkbox, Form, Card, Message, TextArea, Icon, Label } from 'semantic-ui-react'
import AddPart from './AddPart'

class userInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitSuccess: false,
      submitFailure: false,
      failureMsg: 'Unknown failure',
      name: '',
      email: '',
      phone: '',
      dob: '',
      address: ''
    }
  }

  handleChange({target: {name, value}}) {

    if(isNaN(parseInt(name[0]))){
      this.setState({[name]: value});
    } else {
      name = name.split(' ');
      let i = name[0];
      let field = name[1];
      let parts = this.state.parts;

      parts[i][field] = value;

      this.setState({parts});    }
  }

  handleSubmitCB(err) {
    if(err.message) {
      this.setState({submitFailure: true, failureMsg: err.message})
    } else {
      this.setState({submitSuccess: true})
    }
  }

  handleSubmit(e, state) {
    this.props.handleSubmit(e, state, this.handleSubmitCB.bind(this));
  }

  render() {
    return(
      <div>
        <Label style={{width: '100%', borderRadius: '5px 5px 0 0'}} size='huge' color='blue'>
          Add New User
          <Button style={{float:'right'}} size='tiny' name='userOpen' color='grey' compact inverted onClick={(e) => this.props.close(e)}>
            X
          </Button>
        </Label>

        <Form success={this.state.submitSuccess} error={this.state.submitFailure}>
          <Card fluid>
            <Card.Content>
              <Form.Group>
                <Form.Field width={8}>
                  <label size='huge'>Name</label>
                  <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this)}/>
                </Form.Field>
                <Form.Field width={4}>
                  <label>Date of Birth</label>
                  <input placeholder='Date of Birth' name='dob' value={this.state.dob} onChange={this.handleChange.bind(this)}/>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={4}>
                  <label>Phone Number</label>
                  <input placeholder='Phone Number' name='phone' value={this.state.phone} onChange={this.handleChange.bind(this)}/>
                </Form.Field>
                <Form.Field width={8}>
                  <label>Email</label>
                  <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange.bind(this)}/>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={8}>
                  <label>Address</label>
                  <TextArea rows={3} name='address' placeholder='Address' onChange={this.handleChange.bind(this)}/>
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <label>Admin Privileges</label>
                <Form.Radio label='Read Only' checked={this.state.admin === '0'} onChange={() => this.handleChange({target: {name: 'admin', value: '0'}})} style={{marginLeft: 20}}/>
                <Form.Radio label='Limited' checked={this.state.admin === '1'} onChange={() => this.handleChange({target: {name: 'admin', value: '1'}})} style={{marginLeft: 20}} />
                <Form.Radio label='Admin' checked={this.state.admin === '2'} onChange={() => this.handleChange({target: {name: 'admin', value: '2'}})} style={{marginLeft: 20}} />
              </Form.Group>
            </Card.Content>
          </Card>

          <Button type='button' name='users' primary onClick={(e) => this.handleSubmit(e, this.state)}>Submit</Button>

          <Message success>
            <Message.Header>
              Success
              <Button style={{float:'right'}} size='medium' name='userOpen' color='green' onClick={(e) => this.props.close(e)}>
                Close Form
              </Button>
            </Message.Header>
            <Message.Content>
              This user has been saved.
            </Message.Content>
          </Message>

          <Message error>
            <Message.Header>
              Failure, user was not saved.
              <Button style={{float:'right'}} size='medium' name='userOpen' color='red' onClick={(e) => this.props.close(e)}>
                Close Form Without Saving
              </Button>
            </Message.Header>
            <Message.Content>
              {this.state.failureMsg}
            </Message.Content>
          </Message>

        </Form>
      </div>
    )
  }
}

export default userInputForm
