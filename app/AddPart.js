import React, {Component} from 'react'
import { Button, Card, Form, TextArea, Icon, Label } from 'semantic-ui-react'
import AddPrice from './AddPrice'

class AddPart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  addPrice(e, partsCount) {
    this.props.addPrice(e, partsCount);
  }

  removePrice(e, partsCount) {
    this.props.removePrice(e, partsCount);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    let partsCount = this.props.partsCount;
    return(
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Label as='span' color='blue' size='large' ribbon>{partsCount + 1}</Label>
            <Form.Field width={15} style={{float: 'right'}}>
              <label>Part Name</label>
              <input name={partsCount + ' name'} placeholder='Part Name' onChange={this.handleChange.bind(this)}/>
            </Form.Field>
          </Card.Header>
        </Card.Content>

        <Card.Content>
          <Form.Group width={16}>
            <Form.Field width={6}>
              <label>Part Number</label>
              <input name={partsCount + ' number'} placeholder='Part Number' onChange={this.handleChange.bind(this)} />
            </Form.Field>
            <Form.Field width={4}>
              <label>Revision</label>
              <input name={partsCount + ' revision'} placeholder='Revision' onChange={this.handleChange.bind(this)}/>
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <label>Description</label>
            <TextArea rows={3} name={partsCount + ' description'} placeholder='Description' onChange={this.handleChange.bind(this)}/>
          </Form.Field>

          {this.props.prices.map((price, i) => {
            return (<AddPrice key={i} pricesIndex={i} partsCount={partsCount} handlePriceChange={this.props.handlePriceChange}/>)
          })}

          <Button type='button' style={{height: 40, marginTop: 20}} onClick={(e) => this.addPrice(e, partsCount)}>
            Add Pricing
          </Button>
          <Button type='button' style={{height: 40, marginTop: 20}} onClick={(e) => this.removePrice(e, partsCount)}>
            Remove Last Price
          </Button>
        </Card.Content>
      </Card>
    )
  }

};

export default AddPart;