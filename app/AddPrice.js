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

  handlePriceChange(e, partsIndex, pricesIndex) {
    this.props.handlePriceChange(e.target, partsIndex, pricesIndex)
  }

  render() {
    let partsIndex = this.props.partsIndex
    let pricesIndex = this.props.pricesIndex
    return(
      <Form.Group>
        <Form.Field width={4}>
          <label>Quantity</label>
          <input name='quantity' placeholder='Quantity' onChange={(e) => this.handlePriceChange(e, partsIndex, pricesIndex)}/>
        </Form.Field>
        <Form.Field width={4}>
          <label>Price</label>
          <input name='price' placeholder='Price' onChange={(e) => this.handlePriceChange(e, partsIndex, pricesIndex)}/>
        </Form.Field>
      </Form.Group>
    )
  }

};

export default AddPrice;