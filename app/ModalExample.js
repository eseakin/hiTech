import React, {Component} from 'react'
import { Button, Header, Modal, Card, Label, Search } from 'semantic-ui-react'
import _ from 'lodash'
import Login from './Login'
import RFQInputForm from './RFQInputForm';
import CustomerInputForm from './CustomerInputForm';
import PoInputForm from './PoInputForm';
import PartInputForm from './PartInputForm';
import QuoteInputForm from './QuoteInputForm';
import UserInputForm from './UserInputForm';

const SOURCE = [
{
  title: 'apple',
  description: 'test',
  image: 'http://www.placehold.it/100x100',
  price: '$100'
}]

class ModalExample extends Component {
  constructor(props) {
    super(props);
  
    this.state = { 
      rfqOpen: false,
      customerOpen: false,
      partOpen: false,
      quoteOpen: false,
      poOpen: false,
      userOpen: false,
    };
  }

  componentWillMount() {
    this.resetComponent()

  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => this.setState({ value: result.title })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title) || re.test(result.description)

      this.setState({
        isLoading: false,
        results: SOURCE.filter(isMatch)
      })
    }, 500)
  }

  show(e) {
    let name = e.target.name

    if(!this.props.admin && name === 'userOpen')
      return
    else
      this.setState({[name]: true})
  }

  close(e) {
    let name = e.target.name
    this.setState({[name]: false})
  }

  loggedIn() {
    if(this.props.loggedIn) {
      return (
        <div>
          <Modal open={this.state.rfqOpen} size={'small'}>
            <Modal.Content>
              <Modal.Description>
                <RFQInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Modal open={this.state.customerOpen} size={'small'}>
            <Modal.Content>
              <Modal.Description>
                <CustomerInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Modal open={this.state.partOpen} size={'small'}>
            <Modal.Content>
              <Modal.Description>
                <PartInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Modal open={this.state.quoteOpen} size={'small'}>
            <Modal.Content>
              <Modal.Description>
                <QuoteInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Modal open={this.state.poOpen} size={'small'}>
            <Modal.Content>
              <Modal.Description>
                <PoInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>

          <Modal open={this.state.userOpen} size={'small'}>
            <Modal.Content>
              <Modal.Description>
                <UserInputForm handleSubmit={this.props.handleSubmit} close={this.close.bind(this)}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      )
    } else {
      return (
        <Modal open={!this.props.loggedIn} style={{width: 500}}>

          <Modal.Header>Please Log In</Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <Card centered>
                <Card.Content>
                  <Login loggedIn={this.props.loggedIn} loginSubmit={this.props.loginSubmit} status={this.props.status} />
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>

        </Modal>
      )
    }
  }

  render() {
    const { isLoading, value, results } = this.state

    return(
      <div>
        <Button onClick={this.show.bind(this)} style={{margin: 15}} name='rfqOpen'>Add New RFQ</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}} name='customerOpen'>Add New Customer</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}} name='partOpen'>Add New Part</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}} name='quoteOpen'>Add New Quote</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}} name='poOpen'>Add New PO</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15, display: this.props.admin ? 'inline' : 'none'}} name='userOpen'>Add New User</Button>

        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
        />

        {this.loggedIn()}
      </div>
    )
  }

};

export default ModalExample;