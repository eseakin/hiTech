import React, {Component} from 'react'
import RFQInputForm from './RFQInputForm';
import { Button, Header, Modal, Card, Label } from 'semantic-ui-react'
import Login from './Login'

class ModalExample extends Component {
  constructor(props) {
    super(props);
  
    this.state = { open: false };
  }

  show(e) {
    this.setState({open: !this.state.open})
  }

  close(e) {
    this.setState({open: false})
  }

  loggedIn() {
    if(this.props.loggedIn) {
      return (
        <Modal open={this.state.open} size={'small'}>
          <Modal.Content>
            <Modal.Description>
              <RFQInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
            </Modal.Description>
          </Modal.Content>

        </Modal>
      )
    } else {
      return (
        <Modal open={!this.props.loggedIn} style={{width: 500}}>

          <Modal.Header>Please Log In</Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <Card centered>
                <Card.Content>
                  <Login loggedIn={this.props.loggedIn} loginSubmit={this.props.loginSubmit} />
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>

        </Modal>
      )
    }
  }

  render() {
    return(
      <div>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New RFQ</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New Customer</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New Part</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New Quote</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New PO</Button>

        {this.loggedIn()}
      </div>
    )
  }

};

export default ModalExample;