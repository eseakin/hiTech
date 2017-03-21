import React, {Component} from 'react'
import { Button, Checkbox, Form, Card, Message } from 'semantic-ui-react'

class RFQInputForm extends Component {
  constructor(props) {
    super(props);

    let newPart = this.newPart(0);

    this.state = {
      submitSuccess: false,
      partsForm: [newPart],
      partsIndex: 0,
      custName: '',
      date: '',
      parts: [{name: '', number: '', revision: '', description: '', quantity: 0, price: 0}]
    };
  }

  handleClick(e) {
    let partsForm = this.state.partsForm;
    let partsIndex = this.state.partsIndex + 1;
    partsForm.push(this.newPart(partsIndex));

    let parts = this.state.parts;
    parts.push({name: '', number: '', revision: '', description: '', quantity: 0, price: 0});

    this.setState({partsForm, partsIndex, parts});
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

  handleSubmit(state) {
    this.props.handleSubmit(state);
    this.setState({submitSuccess: true});
  }

  newPart(partsIndex) {
    return (
      <Card fluid key={partsIndex}>
        <Card.Content header={'Part ' + (partsIndex + 1)} />
        <Card.Content>
          <Form.Group width={16}>
            <Form.Field width={6}>
              <label>Part Number</label>
              <input name={partsIndex + ' number'} placeholder='Part Number' onChange={this.handleChange.bind(this)} />
            </Form.Field>
            <Form.Field width={4}>
              <label>Revision</label>
              <input name={partsIndex + ' revision'} placeholder='Revision' onChange={this.handleChange.bind(this)}/>
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Part Name</label>
            <input name={partsIndex + ' name'} placeholder='Part Name' onChange={this.handleChange.bind(this)}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input name={partsIndex + ' description'} placeholder='Description' onChange={this.handleChange.bind(this)}/>
          </Form.Field>
          <Form.Group>
            <Form.Field width={4}>
              <label>Quantity</label>
              <input name={partsIndex + ' quantity'} placeholder='Quantity' onChange={this.handleChange.bind(this)}/>
            </Form.Field>
            <Form.Field width={4}>
              <label>Price</label>
              <input name={partsIndex + ' price'} placeholder='Price' onChange={this.handleChange.bind(this)}/>
            </Form.Field>
          </Form.Group>
        </Card.Content>
      </Card>
    )
  }

  render() {
    return(
      <Form success={this.state.submitSuccess}>
        <Form.Field>
          <label>Customer Name</label>
          <input placeholder='Customer Name' name='custName' value={this.state.custName} onChange={this.handleChange.bind(this)}/>
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange.bind(this)}/>
        </Form.Field>

        {this.state.partsForm.map((part) => {
          return part
        })}

        <Button onClick={this.handleClick.bind(this)} type='button'>
          Add Another Part
        </Button>

        <Button type='button' onClick={() => this.handleSubmit(this.state)}>Submit</Button>

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
