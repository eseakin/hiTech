import React, {Component} from 'react'
import { Button, Card, Form, TextArea, Icon } from 'semantic-ui-react'
import AddPrice from './AddPrice'

class AddPart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  addPrice(e, partsIndex) {
    this.props.addPrice(e, partsIndex);
  }

  removePrice(e, partsIndex) {
    this.props.removePrice(e, partsIndex);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    let partsIndex = this.props.partsIndex;
    return(
      <Card fluid key={partsIndex}>
        <Card.Content>
          <Card.Header>
          {'Part ' + (partsIndex + 1)}
          </Card.Header>
        </Card.Content>

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
            <TextArea rows={3} name={partsIndex + ' description'} placeholder='Description' onChange={this.handleChange.bind(this)}/>
          </Form.Field>

          {this.props.prices.map((price, i) => {
            return (<AddPrice pricesIndex={i} partsIndex={partsIndex} handlePriceChange={this.props.handlePriceChange}/>)
          })}

          <Button type='button' style={{height: 40, marginTop: 20}} onClick={(e) => this.addPrice(e, partsIndex)}>
            Add Pricing
          </Button>
          <Button type='button' style={{height: 40, marginTop: 20}} onClick={(e) => this.removePrice(e, partsIndex)}>
            Remove Last Price
          </Button>
        </Card.Content>
      </Card>
    )
  }

};

export default AddPart;