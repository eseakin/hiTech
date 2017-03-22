import React, {Component} from 'react'
import { Button, Checkbox, Form, Card, Message, TextArea, Icon, Label } from 'semantic-ui-react'
import AddPart from './AddPart'

class PartInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitSuccess: false,
      submitFailure: false,
      failureMsg: 'Unknown failure',
      partsCount: 0,
      parts: [{ name: '', number: '', revision: '', description: '', prices: [{}] }],
      custName: '',
      custNum: '',
      date: '',
      expDate: ''
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
          Add New Part
          <Button style={{float:'right'}} size='tiny' name='partOpen' color='grey' compact inverted onClick={(e) => this.props.close(e)}>
            X
          </Button>
        </Label>

        <Form success={this.state.submitSuccess} error={this.state.submitFailure}>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <Form.Group>
                    <Form.Field width={8}>
                      <label size='huge'>Customer Name</label>
                      <input placeholder='Customer Name' name='custName' value={this.state.custName} onChange={this.handleChange.bind(this)}/>
                    </Form.Field>
                    <Form.Field width={8}>
                      <label>Customer Number</label>
                      <input readOnly placeholder='Customer Number' name='custNum' value={this.state.custNum} onChange={this.handleChange.bind(this)}/>
                    </Form.Field>
                  </Form.Group>
                </Card.Header>
              <Form.Group>
                <Form.Field width={4}>
                  <label>Date Received</label>
                  <input placeholder='Date Received' name='date' value={this.state.date} onChange={this.handleChange.bind(this)}/>
                </Form.Field>
                <Form.Field width={4}>
                  <label>Expiration Date</label>
                  <input placeholder='Exp Date' name='expDate' value={this.state.expDate} onChange={this.handleChange.bind(this)}/>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={16}>
                  <label>Notes</label>
                  <TextArea rows={3} name='notes' placeholder='Notes' onChange={this.handleChange.bind(this)}/>
                </Form.Field>
              </Form.Group>
            </Card.Content>
          </Card>

          {this.state.parts.map((part, i) => {
            return (
              <AddPart 
                key={i} 
                partsCount={i} 
                prices={part.prices}
                addPrice={this.addPrice.bind(this)}
                removePrice={this.removePrice.bind(this)}
                handleChange={this.handleChange.bind(this)} 
                handlePriceChange={this.handlePriceChange.bind(this)} 
              />
            )
          })}

          <Button type='button' name='parts' primary onClick={(e) => this.handleSubmit(e, this.state)}>Submit</Button>

          <Button onClick={this.removePart.bind(this)} type='button' floated='right'>
            Remove Last Part
          </Button>

          <Button onClick={this.addPart.bind(this)} type='button' floated='right'>
            Add Another Part
          </Button>

          <Message success>
            <Message.Header>
              Success
              <Button style={{float:'right'}} size='medium' name='partOpen' color='green' onClick={(e) => this.props.close(e)}>
                Close Form
              </Button>
            </Message.Header>
            <Message.Content>
              This part has been saved.
            </Message.Content>
          </Message>

          <Message error>
            <Message.Header>
              Failure, part was not saved.
              <Button style={{float:'right'}} size='medium' name='partOpen' color='red' onClick={(e) => this.props.close(e)}>
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

export default PartInputForm
