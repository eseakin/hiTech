import React, {Component} from 'react'
import RFQInputForm from './RFQInputForm';
import { Button, Header, Modal, Card, Label, Search } from 'semantic-ui-react'
import _ from 'lodash'
import Login from './Login'

const source = [
{
  title: 'apple',
  description: 'test',
  image: 'http://www.placehold.it/100x100',
  price: '$100'
}]

class ModalExample extends Component {
  constructor(props) {
    super(props);
  
    this.state = { open: false };
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
        results: _.filter(source, isMatch),
      })
    }, 500)
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
    const { isLoading, value, results } = this.state

    return(
      <div>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New RFQ</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New Customer</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New Part</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New Quote</Button>
        <Button onClick={this.show.bind(this)} style={{margin: 15}}>Add New PO</Button>

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