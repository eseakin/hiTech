import React, {Component} from 'react'
import { Button, Checkbox, Form, Card, Message, TextArea } from 'semantic-ui-react'
import AddPart from './AddPart'

class RFQInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitSuccess: false,
      partsCount: 0,
      parts: [{name: '', number: '', revision: '', description: '', prices: [[]]}],
      custName: '',
      custNum: '',
      date: '',
      expDate: ''
    }
  }

  addPart(e) {
    let partsForm = this.state.partsForm;
    let partsIndex = this.state.partsIndex + 1;

    let parts = this.state.parts;
    parts.push({name: '', number: '', revision: '', description: '', prices: [[]]});

    this.setState({partsIndex, parts});
  }

  removePart(e) {
    let partsForm = this.state.partsForm;
    let partsIndex = this.state.partsIndex + 1;

    let parts = this.state.parts;
    parts.pop();

    this.setState({partsIndex, parts});
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

  handlePriceChange({name, value}, partsIndex, pricesIndex) {
    let parts = this.state.parts;
    let price = parts[partsIndex].prices[pricesIndex]

    if(name==='quantity') {
      price[0] = value
    } else {
      price[1] = value
    }

    console.log(price)
  }

  handleSubmit(state) {
    this.props.handleSubmit(state);
    this.setState({submitSuccess: true});
  }

  render() {
    return(
      <Form success={this.state.submitSuccess}>
        <Form.Group>
          <Form.Field width={8}>
            <label>Customer Name</label>
            <input placeholder='Customer Name' name='custName' value={this.state.custName} onChange={this.handleChange.bind(this)}/>
          </Form.Field>
          <Form.Field width={8}>
            <label>Customer Number</label>
            <input readOnly placeholder='Customer Number' name='custNum' value={this.state.custNum} onChange={this.handleChange.bind(this)}/>
          </Form.Field>
        </Form.Group>
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

        {this.state.parts.map((part, i) => {
          return (<AddPart key={i} partsIndex={i} handleChange={this.handleChange.bind(this)} handlePriceChange={this.handlePriceChange.bind(this)} />)
        })}

        <Button type='button' primary onClick={() => this.handleSubmit(this.state)}>Submit</Button>

        <Button onClick={this.removePart.bind(this)} type='button' floated='right'>
          Remove Last Part
        </Button>

        <Button onClick={this.addPart.bind(this)} type='button' floated='right'>
          Add Another Part
        </Button>

        <Message
          success
          header='Success'
          content="This RFQ has been saved."
        />
      </Form>
    )
  }
}

export default RFQInputForm
