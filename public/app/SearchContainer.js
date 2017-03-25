import React, {Component} from 'react'
import RFQInputForm from './RFQInputForm';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    };
  }

  componentWillMount = () => {
    this.resetComponent()
  }

  componentWillReceiveProps = () => {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => {
    this.setState({ value: result.title })
    console.log(result)
    //do something
  }

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.companyName) || re.test(result.name) || re.test(result.contactName)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch)
      })
    }, 500)
  }

  resultRenderer = ({ name, companyName, contactName, phone, email }) => {
    return (
      <div className='content'>
        {companyName && <div className='title'>{companyName}</div>}
        {name && <div className='title'>{name}</div>}
        {contactName && <div className='price'>{contactName}</div>}
        {phone && <div className='description'>{phone}</div>}
        {email && <div className='description'>{email}</div>}
      </div>
    )
  }

  render() {
    const { isLoading, value, results } = this.state

    return(
      <div style={{marginLeft: 20, marginTop: 2}}>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
          resultRenderer={this.resultRenderer}
          placeholder={'Search ' + this.props.placeholder}
        />
      </div>
    )
  }

};

export default SearchContainer;
