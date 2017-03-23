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
    //do something
  }

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.compName) || re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch)
      })
    }, 500)
  }

  resultRenderer = (props) => {
    return (
      <div key={props.name} className='content'>
        {props.compName && <div className='title'>{props.compName}</div>}
        {props.name && <div className='title'>{props.name}</div>}
        {props.contactName && <div className='price'>{props.contactName}</div>}
        {props.phone && <div className='description'>{props.phone}</div>}
      </div>
    )
  }

  render() {
    const { isLoading, value, results } = this.state

    return(
      <div style={{marginLeft: 180}}>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
          resultRenderer={this.resultRenderer}
        />
      </div>
    )
  }

};

export default SearchContainer;
