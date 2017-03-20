import React, {Component} from 'react'
import { Button, Checkbox, Form, Card } from 'semantic-ui-react'

class RFQInputForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      parts: [this.newPart(1)],
      i: 1
    };
  }

  handleClick(e) {
    let parts = this.state.parts
    parts.push(this.newPart())
    this.setState({parts})
  }

  newPart() {
    return (
      <Card fluid>
        <Card.Content header={'Part'} />
        <Card.Content>
          <Form.Field>
            <label>Part Number</label>
            <input placeholder='Part Number' />
          </Form.Field>
          <Form.Field>
            <label>Part Name</label>
            <input placeholder='Part Name' />
          </Form.Field>
        </Card.Content>
      </Card>
    )
  }

  render() {
    return(
      <Form>
        <Form.Field>
          <label>Customer Name</label>
          <input placeholder='Customer Name' />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input placeholder='Date' />
        </Form.Field>


        {this.state.parts.map((part) => {
          return part
        })}


        <Button onClick={this.handleClick.bind(this)} type='button'>
          Add Another Part
        </Button>

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}


export default RFQInputForm