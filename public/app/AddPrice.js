import React, {Component} from 'react'
import { Form } from 'semantic-ui-react'

class AddPrice extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      quantity: '',
      price: ''
    };
  }

  handlePriceChange(e, partsCount, pricesIndex) {
    this.props.handlePriceChange(e.target, partsCount, pricesIndex)
  }

  render() {
    let partsCount = this.props.partsCount
    let pricesIndex = this.props.pricesIndex
    return(
      <Form.Group>
        <Form.Field width={4}>
          <label>Quantity</label>
          <input name='quantity' placeholder='Quantity' onChange={(e) => this.handlePriceChange(e, partsCount, pricesIndex)}/>
        </Form.Field>
        <Form.Field width={4}>
          <label>Price</label>
          <input name='price' placeholder='Price' onChange={(e) => this.handlePriceChange(e, partsCount, pricesIndex)}/>
        </Form.Field>
      </Form.Group>
    )
  }

};

export default AddPrice;
