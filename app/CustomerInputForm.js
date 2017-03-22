import React, {Component} from 'react'
import { Button, Checkbox, Form, Card, Message, TextArea, Icon, Label } from 'semantic-ui-react'
import AddPart from './AddPart'

class CustomerInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitSuccess: false,
      submitFailure: false,
      failureMsg: 'Unknown failure',
      parts: {},
      rfqs: {},
      quotes: {},
      pos: {},
      compName: '',
      contactName: '',
      phone: '',
      email: '',
      date: '',
      address: '',
      notes: ''
    }
  }

  addPart(e) {
    let partsForm = this.state.partsForm;
    let partsCount = this.state.partsCount + 1;

    let parts = this.state.parts;
    parts.push({ name: '', number: '', revision: '', description: '', prices: [{}] });

    this.setState({partsCount, parts});
  }

  removePart(e) {
    let partsForm = this.state.partsForm;
    let partsCount = this.state.partsCount + 1;

    let parts = this.state.parts;
    parts.pop();

    this.setState({partsCount, parts});
  }

  addPrice(e, partsCount) {
    let parts = this.state.parts
    parts[partsCount].prices.push({})

    this.setState({parts})
  }

  removePrice(e, partsCount) {
    let parts = this.state.parts
    parts[partsCount].prices.pop()

    this.setState({parts})
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

  handlePriceChange({name, value}, partsCount, pricesIndex) {
    let parts = this.state.parts;
    let price = parts[partsCount].prices[pricesIndex]

    price[name] = value

    this.setState({parts})
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
          Add New Customer
          <Button style={{float:'right'}} size='tiny' name='customerOpen' color='grey' compact inverted onClick={(e) => this.props.close(e)}>
            X
          </Button>
        </Label>

        <Form success={this.state.submitSuccess} error={this.state.submitFailure}>
            <Card fluid>
              <Card.Content>
                <Form.Group>
                  <Form.Field width={8}>
                    <label size='huge'>Company Name</label>
                    <input placeholder='Company Name' name='compName' value={this.state.custName} onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>Date Received</label>
                    <input placeholder='Date Received' name='date' value={this.state.date} onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={5}>
                    <label>Contact Name</label>
                    <input placeholder='Contact Name' name='contactName' value={this.state.dob} onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                  <Form.Field width={5}>
                    <label>Phone Number</label>
                    <input placeholder='Phone Number' name='phone' value={this.state.phone} onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                  <Form.Field width={6}>
                    <label>Email</label>
                    <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={8}>
                    <label>Address</label>
                    <TextArea rows={3} name='address' placeholder='Address' onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                  <Form.Field width={8}>
                    <label>Notes</label>
                    <TextArea rows={3} name='notes' placeholder='Notes' onChange={this.handleChange.bind(this)}/>
                  </Form.Field>
                </Form.Group>
            </Card.Content>
          </Card>

          <Button type='button' name='customers' primary onClick={(e) => this.handleSubmit(e, this.state)}>Submit</Button>

          <Message success>
            <Message.Header>
              Success
              <Button style={{float:'right'}} size='medium' name='customerOpen' color='green' onClick={(e) => this.props.close(e)}>
                Close Form
              </Button>
            </Message.Header>
            <Message.Content>
              This customer has been saved.
            </Message.Content>
          </Message>

          <Message error>
            <Message.Header>
              Failure, customer was not saved.
              <Button style={{float:'right'}} size='medium' name='customerOpen' color='red' onClick={(e) => this.props.close(e)}>
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

export default CustomerInputForm
