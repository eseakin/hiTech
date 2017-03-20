import React, {Component} from 'react'
import RFQInputForm from './RFQInputForm';
import { Button, Header, Modal } from 'semantic-ui-react'

class ModalExample extends Component {
  constructor(props) {
    super(props);
  
    this.state = { open: false };
  }

  show() {
    console.log('show')
    this.setState({open: !this.state.open})
  }

  close() {
    console.log('close')
    this.setState({open: false})
  }

  render() {
    return(
      <div>
        <Button onClick={this.show.bind(this)} style={{margin: 150}}>Add New RFQ</Button>

        <Modal open={this.state.open} onClose={this.close.bind(this)} size={'small'}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <RFQInputForm />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }

};

export default ModalExample;